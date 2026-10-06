import * as THREE from './vendor/build/three.module.js';
// Find a camera direction with an unobstructed view of the actual marker point.
// No marker coordinate is changed to make the test pass.
export function visibleLandmarkDirection(meshes,point,box,distance,preferred){
 const center=box.getCenter(new THREE.Vector3()),tolerance=box.getSize(new THREE.Vector3()).length()*.009;
 const candidates=[preferred.clone().normalize()];
 for(const y of [0,.6,-.6])for(let k=0;k<16;k++){const a=k*Math.PI/8;candidates.push(new THREE.Vector3(Math.sin(a),y,Math.cos(a)).normalize());}
 candidates.sort((a,b)=>b.dot(preferred)-a.dot(preferred));
 for(const direction of candidates){const origin=center.clone().addScaledVector(direction,distance);const ray=point.clone().sub(origin),length=ray.length();const hit=new THREE.Raycaster(origin,ray.normalize(),0,length).intersectObjects(meshes,false)[0];if(!hit||hit.distance>=length-tolerance)return direction;}
 return preferred.clone().normalize();
}
