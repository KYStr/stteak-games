// Interlock state is reconstructed from the saved operation prefix. No independent
// door flag can produce two open chambers after reload.
export function pressureState(sequence,out={isolated:false,vented:false,inspected:false,outerOpen:false,innerOpen:false},total=5){
 const n=sequence.length;out.isolated=n===1||n===2||n>=4;out.vented=n>=2;out.inspected=n>=3;out.outerOpen=n===3;out.innerOpen=n>=total;return out;
}
export function operatePressure(puzzle,sequence,index){
 const step=sequence.length;if(step>=puzzle.sequence.length||index!==puzzle.sequence[step])return {ok:false,reason:'interlock'};
 // A remote open/inspection never bypasses the prior isolation + vent cycle.
 const state=pressureState(sequence,{},puzzle.sequence.length);if(step===1&&!state.isolated||step===2&&!state.vented||step===3&&!state.outerOpen||step===4&&(!state.isolated||!state.inspected||state.outerOpen))return {ok:false,reason:'pressure'};
 sequence.push(index);return {ok:true,complete:sequence.length===puzzle.sequence.length};
}
