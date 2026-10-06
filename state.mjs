export const VERSION=1;
export function emptyState(){return {version:VERSION,notes:{},bookmarks:[],pins:[],snapshots:[],foundation:{known:[]},quiz:{correct:0,total:0}};}
const text=(v,n=5000)=>typeof v==='string'&&v.length<=n;
const vector=v=>Array.isArray(v)&&v.length===3&&v.every(n=>typeof n==='number'&&Number.isFinite(n)&&Math.abs(n)<1e6);
export function validateState(value){
 if(!value||value.version!==VERSION||typeof value.notes!=='object'||Array.isArray(value.notes)||value.notes===null)throw Error('صيغة ملف المذاكرة غير مدعومة.');
 if(Object.keys(value.notes).length>3000||Object.entries(value.notes).some(([k,v])=>!text(k,300)||!text(v)))throw Error('الملاحظات غير صالحة.');
 for(const list of ['bookmarks','pins','snapshots'])if(!Array.isArray(value[list]))throw Error('قائمة مفقودة: '+list);
 if(value.bookmarks.length>3000||value.bookmarks.some(k=>!text(k,300)))throw Error('المفضلة غير صالحة.');
 if(value.pins.length>100||value.pins.some(p=>!p||!text(p.id,100)||!text(p.key,300)||!text(p.label,100)||!vector(p.position)))throw Error('العلامات غير صالحة أو تجاوزت ١٠٠ علامة.');
 if(value.snapshots.length>50||value.snapshots.some(s=>!s||!text(s.id,100)||!text(s.name,100)||!['body','arm','leg'].includes(s.mode)||!vector(s.camera)||!vector(s.target)||!Array.isArray(s.enabled)||s.enabled.some(k=>!['bone','organ','skin','muscle','vessel'].includes(k))||!Array.isArray(s.hidden)||s.hidden.some(k=>!text(k,300))||(s.selected!==null&&!text(s.selected,300))))throw Error('المشاهد غير صالحة.');
 if(!value.quiz||!Number.isInteger(value.quiz.total)||!Number.isInteger(value.quiz.correct)||value.quiz.correct<0||value.quiz.total<value.quiz.correct||value.quiz.total>1e8)throw Error('نتائج التدريب غير صالحة.');
 const known=value.foundation?.known??[];if(!Array.isArray(known)||known.length>200||known.some(k=>!text(k,100)))throw Error('بطاقات المراجعة غير صالحة.');
 const result=emptyState();result.foundation={known:[...new Set(known)]};result.notes=Object.fromEntries(Object.entries(value.notes));result.bookmarks=[...new Set(value.bookmarks)];result.pins=value.pins.map(p=>({id:p.id,key:p.key,label:p.label,position:[...p.position]}));result.snapshots=value.snapshots.map(s=>({id:s.id,name:s.name,mode:s.mode,camera:[...s.camera],target:[...s.target],enabled:[...s.enabled],hidden:[...s.hidden],selected:s.selected}));result.quiz={...value.quiz};return result;
}
export function loadState(storage,key){try{const raw=storage.getItem(key);return {state:raw?validateState(JSON.parse(raw)):emptyState(),error:null};}catch(e){return {state:emptyState(),error:e.message};}}
export function saveState(storage,key,state){const valid=validateState(state);storage.setItem(key,JSON.stringify(valid));return valid;}
