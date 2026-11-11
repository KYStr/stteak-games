/** Cost based hysteresis, independent of GPU frame wall time. */
export function createAutoQuality(){
  let tier=0,bad=0,good=0;
  return {reset(){tier=bad=good=0;},get tier(){return tier;},window(p95,calls,triangles){
    if(p95>6||calls>250||triangles>1500000){bad++;good=0;}else if(p95<3&&calls<200&&triangles<1200000){good++;bad=0;}else bad=good=0;
    if(bad>=2&&tier<2){tier++;bad=good=0;}else if(good>=5&&tier>0){tier--;bad=good=0;}return tier;
  }};
}
