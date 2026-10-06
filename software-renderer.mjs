import * as THREE from './vendor/build/three.module.js';
// CPU projection of the same anatomical meshes when WebGL2 is unavailable.
// Painter sorting is less accurate for overlapping translucent surfaces.
export class SoftwareRenderer {
 constructor(){this.domElement=document.createElement('canvas');this.ctx=this.domElement.getContext('2d',{alpha:true});if(!this.ctx)throw Error('Canvas unavailable');this.isSoftwareRenderer=true;this.ratio=1;this.signature='';}
 setPixelRatio(value){this.ratio=Math.min(value,2);this.signature="";}
 setSize(w,h){this.width=w;this.height=h;this.domElement.width=Math.round(w*this.ratio);this.domElement.height=Math.round(h*this.ratio);this.domElement.style.width=w+"px";this.domElement.style.height=h+"px";this.signature='';}
 render(scene,camera){
  scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);
  const meshes=[];scene.traverseVisible(o=>{if(o.isMesh&&o.geometry?.attributes.position)meshes.push(o);});
  const sig=[this.width,this.height,...camera.matrixWorld.elements,...camera.projectionMatrix.elements,...meshes.flatMap(m=>[m.id,...m.matrixWorld.elements,m.material.color.getHex(),m.material.opacity,...(m.material.clippingPlanes||[]).flatMap(p=>[...p.normal.toArray(),p.constant])])].join(',');if(sig===this.signature)return;this.signature=sig;
  const vp=new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse),triangles=[],W=this.width*.5,H=this.height*.5;
  for(const mesh of meshes){const geo=mesh.geometry,pos=geo.attributes.position,norm=geo.attributes.normal,indices=geo.index?.array,material=mesh.material;if(material.opacity<=0)continue;const count=pos.count,screen=new Float32Array(count*3),world=new Float32Array(count*3),m=mesh.matrixWorld.elements,p=vp.elements,nmat=new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld).elements;
   for(let i=0;i<count;i++){const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i),a=m[0]*x+m[4]*y+m[8]*z+m[12],b=m[1]*x+m[5]*y+m[9]*z+m[13],c=m[2]*x+m[6]*y+m[10]*z+m[14],d=p[3]*a+p[7]*b+p[11]*c+p[15],k=i*3;world[k]=a;world[k+1]=b;world[k+2]=c;screen[k]=(p[0]*a+p[4]*b+p[8]*c+p[12])/d*W+W;screen[k+1]=H-(p[1]*a+p[5]*b+p[9]*c+p[13])/d*H;screen[k+2]=(p[2]*a+p[6]*b+p[10]*c+p[14])/d;}
   const total=indices?indices.length:count;const color=material.color.clone().convertLinearToSRGB();
   for(let i=0;i<total;i+=3){const a=indices?indices[i]:i,b=indices?indices[i+1]:i+1,c=indices?indices[i+2]:i+2,A=a*3,B=b*3,C=c*3;if(screen[A+2]<-1||screen[A+2]>1||screen[B+2]<-1||screen[C+2]<-1)continue;
    if((screen[A]<0&&screen[B]<0&&screen[C]<0)||(screen[A]>this.width&&screen[B]>this.width&&screen[C]>this.width)||(screen[A+1]<0&&screen[B+1]<0&&screen[C+1]<0)||(screen[A+1]>this.height&&screen[B+1]>this.height&&screen[C+1]>this.height))continue;
    if((material.clippingPlanes||[]).some(p=>p.normal.x*(world[A]+world[B]+world[C])/3+p.normal.y*(world[A+1]+world[B+1]+world[C+1])/3+p.normal.z*(world[A+2]+world[B+2]+world[C+2])/3+p.constant<0))continue;
    let light=.8;if(norm){const x=(norm.getX(a)+norm.getX(b)+norm.getX(c))/3,y=(norm.getY(a)+norm.getY(b)+norm.getY(c))/3,z=(norm.getZ(a)+norm.getZ(b)+norm.getZ(c))/3,nx=nmat[0]*x+nmat[3]*y+nmat[6]*z,ny=nmat[1]*x+nmat[4]*y+nmat[7]*z,nz=nmat[2]*x+nmat[5]*y+nmat[8]*z;light=.44+.56*Math.abs((nx*.35+ny*.65+nz*.68)/Math.max(.01,Math.hypot(nx,ny,nz)));}
    triangles.push([screen[A],screen[A+1],screen[B],screen[B+1],screen[C],screen[C+1],(screen[A+2]+screen[B+2]+screen[C+2])/3,`rgb(${Math.round(color.r*255*light)},${Math.round(color.g*255*light)},${Math.round(color.b*255*light)})`,material.opacity]);
   }
  }
  triangles.sort((a,b)=>b[6]-a[6]);const ctx=this.ctx;ctx.setTransform(this.ratio,0,0,this.ratio,0,0);ctx.clearRect(0,0,this.width,this.height);ctx.lineWidth=.45;
  for(const t of triangles){ctx.globalAlpha=t[8];ctx.fillStyle=t[7];ctx.strokeStyle=t[7];ctx.beginPath();ctx.moveTo(t[0],t[1]);ctx.lineTo(t[2],t[3]);ctx.lineTo(t[4],t[5]);ctx.closePath();ctx.fill();if(t[8]===1)ctx.stroke();}ctx.globalAlpha=1;
 }
}
