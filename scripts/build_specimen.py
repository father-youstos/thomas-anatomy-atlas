"""Convert the attributed Eric Bauer femur scan without adding surface detail."""
import hashlib,json,urllib.request
from pathlib import Path
from build_detailed_bones import convert
URL='https://upload.wikimedia.org/wikipedia/commons/6/6d/Human_femur.stl'
SHA='f09081bb5b281d1f6a08d93686cfdb57b1f067fde1847f078fde119f3e44707b'
def main():
 import sys
 if len(sys.argv)>1:raw=Path(sys.argv[1]).read_bytes()
 else:
  req=urllib.request.Request(URL,headers={'User-Agent':'ThomasAnatomy/1.0 (educational CC-BY model reuse)'})
  with urllib.request.urlopen(req,timeout=120) as response:raw=response.read()
 if hashlib.sha256(raw).hexdigest()!=SHA:raise ValueError('Specimen source changed; review required')
 glb,meta=convert(raw,'femur_specimen');meta.update(source=URL,source_revision=SHA,license='CC BY 4.0',author='Eric Bauer and the donor-based undergraduate human anatomy lab at Elon University',texture_resolution=None)
 out=Path('specimens');out.mkdir(exist_ok=True);(out/'femur.glb').write_bytes(glb);(out/'femur.json').write_text(json.dumps(meta,indent=2));print('Specimen:',meta['triangles'],'triangles')
if __name__=='__main__':main()
