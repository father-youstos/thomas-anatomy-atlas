import importlib.util,json,struct,unittest
s=importlib.util.spec_from_file_location('builder','scripts/build_detailed_bones.py');b=importlib.util.module_from_spec(s);s.loader.exec_module(b)
class Conversion(unittest.TestCase):
 def test_preserves_triangle_and_axis_units(self):
  raw=b'\0'*80+struct.pack('<I',1)+struct.pack('<12fH',0,0,1,0,0,0,1000,0,0,0,1000,0,0)
  glb,meta=b.convert(raw,'test');self.assertEqual(meta['triangles'],1);self.assertEqual(meta['bounds'],[[0,0,-1],[1,0,0]]);self.assertEqual(struct.unpack_from('<I',glb,8)[0],len(glb));n=struct.unpack_from('<I',glb,12)[0];doc=json.loads(glb[20:20+n]);self.assertEqual(doc['accessors'][0]['count'],3)
 def test_invalid_geometry_rejected(self):
  with self.assertRaises(ValueError):b.convert(b'\0'*80+struct.pack('<I',5),'bad')
if __name__=='__main__':unittest.main()
