from pathlib import Path
import json,re,struct
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text(); app=(root/'app.js').read_text()+(root/'foundation.mjs').read_text()
ids=re.findall(r'\bid="([^"]+)"',html)
assert len(ids)==len(set(ids)), 'Duplicate element IDs'
missing=set(re.findall(r"\$\('([^']+)'\)",app))-set(ids)
assert not missing, f'Missing UI elements: {missing}'
for path in re.findall(r'(?:src|href)="([^"#]+)"',html):
 if not path.startswith(('http','data:')):assert (root/path.split("?")[0]).exists(),f'Missing local file: {path}'
paths=json.loads((root/'offline-assets.json').read_text())
assert isinstance(paths,list) and len(paths)==len(set(paths))
for path in paths:assert (root/path.split("?")[0]).is_file(),f'Missing offline file: {path}'
for path in root.rglob('*.glb'):
 raw=path.read_bytes();assert raw[:4]==b'glTF';assert struct.unpack_from('<I',raw,8)[0]==len(raw)
 size=struct.unpack_from('<I',raw,12)[0];model=json.loads(raw[20:20+size]);assert model.get('meshes'),f'No geometry: {path}'
for file in [root/'app.js',root/'index.html']:
 assert not re.search(r'["\']/(?:assets|vendor|shoulder|app\.|style\.)',file.read_text()),'Root-relative path breaks project Pages hosting'
print(f'Static checks passed: {len(ids)} UI elements; {len(paths)} offline files; relative project paths valid.')
