// Session-wide frame history. Appending never removes/moves earlier array items;
// callers materialize an ordered, detached Array only when requesting the data.
export const FRAME_HISTORY_CAPACITY=54000;

export function createFrameHistory(capacity=FRAME_HISTORY_CAPACITY){
  if(!Number.isSafeInteger(capacity)||capacity<1)throw new RangeError('Frame history capacity must be a positive safe integer.');
  const values=new Float64Array(capacity);
  let next=0,size=0;
  function push(value){
    if(!Number.isFinite(value))throw new TypeError('Frame history values must be finite numbers.');
    values[next]=value;next++;if(next===capacity)next=0;
    if(size<capacity)size++;
    return size;
  }
  function snapshot(){
    const result=new Array(size),oldest=size===capacity?next:0;
    for(let i=0;i<size;i++)result[i]=values[(oldest+i)%capacity];
    return result;
  }
  function summary(){return {omitted:true,retainedCount:size,note:'完整資料保留於診斷匯出檔'};}
  return Object.freeze({push,snapshot,summary,get length(){return size;}});
}
