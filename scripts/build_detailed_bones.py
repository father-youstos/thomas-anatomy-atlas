"""Build reproducible detailed limb assets for Pages from licensed, pinned STL data.
Geometry is preserved (unit/axis conversion only); normals are averaged at shared vertices.
"""
import hashlib,json,math,struct,time,urllib.request
from pathlib import Path
REV='f0eeb6e843380cfe6b83797cf8c3e1af74de5e61'
ASSETS={
 'femur':('24474','ded8f431bee150b6828c531f6014a280634dc47b'),
 'tibia':('24477','7a2fa6a0f11114aca91c81d6cb803a83166ff212'),
 'fibula':('24480','1b59a40b7e964041b7d268261cce8de167ec11b1'),
 'patella':('24486','5dd06c1728537fbcfc1dc73a8b7699d996d35343'),
 'hip':('16586','d4ca0b78c6ca6fbc54aafc1f3bb85085ed9bd62b')}

def convert(raw,name):
 count=struct.unpack_from('<I',raw,80)[0]
 if len(raw)!=84+count*50:raise ValueError('Unexpected STL layout')
 vertices=[];normals=[];index=[];lookup={}
 for face in range(count):
  values=struct.unpack_from('<12f',raw,84+50*face);ids=[]
  for k in (3,6,9):
   x,y,z=values[k:k+3];v=(x*.001,z*.001,-y*.001)
   if not all(math.isfinite(a) for a in v):raise ValueError('Invalid vertex')
   key=tuple(round(a,8) for a in v)
   if key not in lookup:lookup[key]=len(vertices);vertices.append(v);normals.append([0.,0.,0.])
   ids.append(lookup[key])
  a,b,c=[vertices[i] for i in ids];u=[b[i]-a[i] for i in range(3)];v=[c[i]-a[i] for i in range(3)]
  n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
  for j in ids:
   for k in range(3):normals[j][k]+=n[k]
  index.extend(ids)
 for n in normals:
  length=math.sqrt(sum(x*x for x in n)) or 1
  for i in range(3):n[i]/=length
 lo=[min(v[i] for v in vertices) for i in range(3)];hi=[max(v[i] for v in vertices) for i in range(3)]
 chunks=[struct.pack('<%sf'%(len(vertices)*3),*(x for v in vertices for x in v)),struct.pack('<%sf'%(len(normals)*3),*(x for v in normals for x in v)),struct.pack('<%sI'%len(index),*index)]
 offsets=[0,len(chunks[0]),len(chunks[0])+len(chunks[1])];binary=b''.join(chunks)
 doc={'asset':{'version':'2.0','generator':'Thomas Anatomy / BodyParts3D preserving converter'},'scene':0,'scenes':[{'nodes':[0]}],'nodes':[{'mesh':0,'name':name+'_right'}],'meshes':[{'primitives':[{'attributes':{'POSITION':0,'NORMAL':1},'indices':2,'mode':4}]}],'buffers':[{'byteLength':len(binary)}],'bufferViews':[{'buffer':0,'byteOffset':offsets[i],'byteLength':len(chunks[i]),'target':34963 if i==2 else 34962} for i in range(3)],'accessors':[{'bufferView':0,'componentType':5126,'count':len(vertices),'type':'VEC3','min':lo,'max':hi},{'bufferView':1,'componentType':5126,'count':len(vertices),'type':'VEC3'},{'bufferView':2,'componentType':5125,'count':len(index),'type':'SCALAR'}]}
 js=json.dumps(doc,separators=(',',':')).encode();js+=b' '*((-len(js))%4)
 glb=struct.pack('<III',0x46546C67,2,28+len(js)+len(binary))+struct.pack('<I4s',len(js),b'JSON')+js+struct.pack('<I4s',len(binary),b'BIN\0')+binary
 return glb,{'triangles':count,'vertices':len(vertices),'bounds':[lo,hi],'source_revision':REV,'texture_resolution':None}

def main():
 out=Path('detailed');out.mkdir(exist_ok=True);manifest={}
 for name,(fma,sha) in ASSETS.items():
  url=f'https://raw.githubusercontent.com/Kevin-Mattheus-Moerman/BodyParts3D/{REV}/assets/BodyParts3D_data/stl/FMA{fma}.stl'
  for attempt in range(3):
   try:
    with urllib.request.urlopen(url,timeout=45) as response:raw=response.read()
    break
   except Exception:
    if attempt==2:raise
    time.sleep(2)
  actual=hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
  if actual!=sha:raise ValueError('Source checksum mismatch: '+name)
  glb,meta=convert(raw,name);meta['source']=url;meta['source_blob']=sha
  (out/(name+'_right.glb')).write_bytes(glb);manifest[name]=meta
  print(name,meta['triangles'],'triangles;',meta['vertices'],'vertices')
 (out/'manifest.json').write_text(json.dumps(manifest,indent=2))
 # Generated models are included in the same deployment and offline manifest.
 p=Path('offline-assets.json');files=json.loads(p.read_text());files+=['./detailed/manifest.json']+['./detailed/'+name+'_right.glb' for name in ASSETS];p.write_text(json.dumps(list(dict.fromkeys(files)),indent=2))
if __name__=='__main__':main()
