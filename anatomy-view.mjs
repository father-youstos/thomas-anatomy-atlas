export const regions=[['all','الجسم كاملًا'],['skull','الرأس'],['spine','العمود الفقري'],['thorax','القفص الصدري'],['upper','الطرف العلوي'],['lower','الحوض والطرف السفلي']];
export function regionOf(name){const n=name.toLowerCase();if(/vertebr|atlas|axis|sacrum|coccyx/.test(n))return 'spine';if(/rib|sternum|manubrium|costal/.test(n))return 'thorax';if(/femur|tibia|fibula|patella|hip bone|foot|metatars|calcane|talus|cuboid|cuneiform|navicular/.test(n))return 'lower';if(/clavicle|scapula|humerus|radius|ulna|finger|metacarp|hand|scaphoid|lunate|triquetr|pisiform|trapez|capitate|hamate/.test(n))return 'upper';return 'skull';}
// Positions are approximate teaching anchors calibrated against this right-side mesh.
export const landmarks={
 scapula_right:[
  {id:'acromion',name:'Acromion',ar:'الأخرم',position:[-.161,1.352,.039],view:[0,.2,-1],description:'الامتداد الوحشي لشوكة لوح الكتف.'},
  {id:'coracoid',name:'Coracoid process',ar:'الناتئ الغرابي',position:[-.139,1.337,.093],view:[0,.15,1],description:'البروز الأمامي المشابه لمنقار الغراب.'},
  {id:'glenoid',name:'Glenoid cavity',ar:'التجويف الحقاني',position:[-.159,1.317,.068],view:[-1,0,.5],description:'السطح المفصلي الذي يقابل رأس العضد.'},
  {id:'inferior-angle',name:'Inferior angle',ar:'الزاوية السفلية',position:[-.1,1.205,.013],view:[0,0,-1],description:'التقاء الحافتين الإنسية والوحشية في الأسفل.'},
  {id:'medial-border',name:'Medial border',ar:'الحافة الإنسية',position:[-.067,1.31,.013],view:[0,0,-1],description:'الحافة المواجهة للعمود الفقري.'}
 ],
 clavicle_right:[
  {id:'sternal',name:'Sternal end',ar:'الطرف القصّي',position:[-.015,1.35,.14],view:[0,0,1],description:'الطرف الإنسي ناحية القص.'},
  {id:'acromial',name:'Acromial end',ar:'الطرف الأخرمي',position:[-.144,1.341,.054],view:[0,.8,1],description:'الطرف الوحشي ناحية الأخرم.'}
 ]
};
