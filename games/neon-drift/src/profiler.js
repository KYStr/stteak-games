/** Callback-boundary measurements, in milliseconds unless the column says otherwise.
 * record() copies into one fixed Float64Array and allocates nothing on the valid-input path.
 * The default 54,000 rows retain 15 minutes at 60 callbacks/second (5,616,000 data bytes).
 */
export const FRAME_COLUMNS=Object.freeze([
  'frameSeq','rafTimestamp','rafDeltaMs','callbackDelayMs','physicsMs','renderMs',
  'audioMs','hudMs','finishMs','totalCpuMs','outsideCallbackMs','elapsed','phase',
]);
export const FRAME_PHASE_NAMES=Object.freeze(['boot','menu','running','paused','result']);
export const FRAME_PHASE=Object.freeze({boot:0,menu:1,running:2,paused:3,result:4});
export const DEFAULT_FRAME_CAPACITY=54000;
const STRIDE=FRAME_COLUMNS.length;
const PHASE_INDEX=STRIDE-1;

/**
 * record(row): exactly FRAME_COLUMNS.length finite numbers; phase is a FRAME_PHASE value.
 * Negative timing observations are preserved, not clamped or silently discarded.
 * reset(metadata): starts a new capture and clones metadata before discarding the old capture.
 * summary(): returns counts and bounded metadata without reading retained rows.
 * snapshot(): exports retained rows in callback insertion order, oldest first, at full precision.
 * Metadata is cloned on reset and export; changing a caller-owned object cannot rewrite evidence.
 */
export function createFrameProfiler(capacity=DEFAULT_FRAME_CAPACITY) {
  if(!Number.isSafeInteger(capacity)||capacity<1||!Number.isSafeInteger(capacity*STRIDE)) {
    throw new RangeError('Frame profiler capacity must be a positive safe integer with a safe row allocation length.');
  }
  const data=new Float64Array(capacity*STRIDE);
  let next=0,size=0,totalCount=0,metadata={};

  function record(row) {
    if(row===null||row===undefined||row.length!==STRIDE) {
      throw new TypeError(`Frame profiler rows must contain exactly ${STRIDE} numbers.`);
    }
    // Validate the complete row first so an invalid row cannot partially overwrite valid evidence.
    for(let column=0;column<STRIDE;column++) {
      if(!Number.isFinite(row[column]))throw new TypeError(`Frame profiler column ${FRAME_COLUMNS[column]} must be finite.`);
    }
    const phase=row[PHASE_INDEX];
    if(!Number.isInteger(phase)||phase<0||phase>=FRAME_PHASE_NAMES.length) {
      throw new RangeError('Frame profiler phase must be an index into FRAME_PHASE_NAMES.');
    }
    if(totalCount===Number.MAX_SAFE_INTEGER)throw new RangeError('Frame profiler totalCount exhausted exact integer precision; start a new capture.');
    const offset=next*STRIDE;
    for(let column=0;column<STRIDE;column++)data[offset+column]=row[column];
    next++;if(next===capacity)next=0;
    if(size<capacity)size++;
    totalCount++;
  }

  function reset(nextMetadata={}) {
    const copiedMetadata=structuredClone(nextMetadata);
    next=0;size=0;totalCount=0;metadata=copiedMetadata;
  }

  function summary() {
    const truncation='…（摘要截短；完整值見匯出）';
    const scalar=value=>typeof value==='string'
      ?(value.length>320?value.slice(0,320-truncation.length)+truncation:value)
      :typeof value==='boolean'||Number.isFinite(value)?value:null;
    const boundedMetadata=Object.fromEntries(
      ['buildId','startedAt','performanceTimeOrigin','mode','trackId','carId','dpr','notes']
        .map(key=>[key,scalar(metadata?.[key])]),
    );
    boundedMetadata.viewport=[0,1].map(index=>Number.isFinite(metadata?.viewport?.[index])?metadata.viewport[index]:null);
    return {
      schemaVersion:1,
      capacity,
      totalCount,
      retainedCount:size,
      overwritten:totalCount-size,
      capturePartial:totalCount>size,
      metadata:boundedMetadata,
      rows:{omitted:true,retainedCount:size,note:'完整資料保留於診斷匯出檔'},
    };
  }

  function snapshot() {
    const rows=new Array(size);
    const oldest=size===capacity?next:0;
    for(let index=0;index<size;index++) {
      const offset=((oldest+index)%capacity)*STRIDE;
      const row=new Array(STRIDE);
      for(let column=0;column<STRIDE;column++)row[column]=data[offset+column];
      rows[index]=row;
    }
    return {
      schemaVersion:1,
      columns:[...FRAME_COLUMNS],
      phaseNames:[...FRAME_PHASE_NAMES],
      units:{frameSeq:'callback sequence number',rafTimestamp:'DOMHighResTimeStamp milliseconds',elapsed:'gameplay seconds',phase:'phaseNames index',otherColumns:'milliseconds'},
      measurementNotes:{
        rowOrder:'Callback insertion order, oldest retained callback first. No sampling, rounding, filtering, or timestamp sorting is applied.',
        callbackDelayMs:'performance.now() at callback entry minus the requestAnimationFrame timestamp; a boundary observation, not an isolated scheduling cost.',
        outsideCallbackMs:'Current callback start minus previous callback end. This interval can include waiting and unrelated work; it does not isolate GPU time or scheduler CPU time.',
        retention:'rows contains only the retained ring buffer. totalCount covers all accepted rows since reset; overwritten reports unavailable earlier rows and must not be treated as complete long-run evidence.',
      },
      metadata:structuredClone(metadata),
      capacity,
      totalCount,
      overwritten:totalCount-size,
      rows,
    };
  }

  return Object.freeze({record,reset,summary,snapshot});
}
