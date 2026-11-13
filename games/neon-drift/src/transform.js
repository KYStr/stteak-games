// Write a unit-scale XYZ Euler rotation into an existing matrix. Translation
// stays in its retained slots. Buffer/index arguments avoid scalar boxing at
// the presentation boundary; Three.js still owns world-matrix propagation.
export function writeEulerRotation(out,angles,offset=0){
  const x=angles[offset],y=angles[offset+1],z=angles[offset+2];
  const a=Math.cos(x),b=Math.sin(x),c=Math.cos(y),d=Math.sin(y),e=Math.cos(z),f=Math.sin(z);
  out[0]=c*e;out[4]=-c*f;out[8]=d;
  out[1]=a*f+b*e*d;out[5]=a*e-b*f*d;out[9]=-b*c;
  out[2]=b*f-a*e*d;out[6]=b*e+a*f*d;out[10]=a*c;
}
