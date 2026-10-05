const girdle='https://openstax.org/books/anatomy-and-physiology-2e/pages/8-1-the-pectoral-girdle';
const clavicleSource='https://www.ncbi.nlm.nih.gov/books/NBK525990/';
const scapulaSource='https://www.ncbi.nlm.nih.gov/books/NBK538319/';
const card=(id,bone,en,ar,hint,group='أساسيات',source=girdle)=>({id,bone,en,ar,hint,group,source});
export const cards=[
 card('sternal','clavicle','Sternal end','الطرف القصّي','إنسي؛ يتمفصل مع قبضة القص.'),
 card('acromial','clavicle','Acromial end','الطرف الأخرمي','وحشي؛ يتمفصل مع الأخرم.'),
 card('shaft','clavicle','Shaft','الجسم','الجزء الممتد بين الطرفين؛ شكل الترقوة يشبه S.'),
 card('subclavian','clavicle','Subclavian groove','الأخدود تحت الترقوة','سطح سفلي؛ موضع ارتباط العضلة تحت الترقوة.','علامات إضافية',clavicleSource),
 card('conoid','clavicle','Conoid tubercle','الحديبة المخروطية','سطح سفلي قرب الطرف الوحشي؛ ارتباط الرباط المخروطي.','علامات إضافية',clavicleSource),
 card('trapezoid','clavicle','Trapezoid line','الخط شبه المنحرف','سطح سفلي؛ ارتباط الرباط شبه المنحرف.','علامات إضافية',clavicleSource),
 card('spine','scapula','Spine of scapula','شوكة لوح الكتف','بروز خلفي يفصل الحفرتين الخلفيتين.','بروزات'),
 card('acromion','scapula','Acromion','الأخرم','امتداد وحشي للشوكة؛ يتصل بالترقوة.','بروزات'),
 card('coracoid','scapula','Coracoid process','الناتئ الغرابي','بروز أمامي يشبه منقار الغراب.','بروزات'),
 card('glenoid','scapula','Glenoid cavity','التجويف الحقاني','وحشي؛ يتمفصل مع رأس العضد.'),
 card('supraspinous','scapula','Supraspinous fossa','الحفرة فوق الشوكة','خلفية؛ فوق شوكة لوح الكتف.','حفر'),
 card('infraspinous','scapula','Infraspinous fossa','الحفرة تحت الشوكة','خلفية؛ تحت شوكة لوح الكتف.','حفر'),
 card('subscapular','scapula','Subscapular fossa','الحفرة تحت لوح الكتف','أمامية؛ تواجه القفص الصدري.','حفر'),
 card('superior-border','scapula','Superior border','الحافة العلوية','الحافة العليا؛ تحمل الثلمة فوق الكتف.','حواف'),
 card('medial-border','scapula','Medial border','الحافة الإنسية','ناحية العمود الفقري.','حواف'),
 card('lateral-border','scapula','Lateral border','الحافة الوحشية','ناحية الإبط؛ تُسمى أيضًا Axillary border.','حواف'),
 card('superior-angle','scapula','Superior angle','الزاوية العلوية','التقاء الحافتين العلوية والإنسية.','زوايا'),
 card('inferior-angle','scapula','Inferior angle','الزاوية السفلية','التقاء الحافتين الإنسية والوحشية.','زوايا'),
 card('lateral-angle','scapula','Lateral angle','الزاوية الوحشية','الناحية التي تحمل التجويف الحقاني.','زوايا',scapulaSource),
 card('notch','scapula','Suprascapular notch','الثلمة فوق الكتف','قطع بالحافة العلوية قرب قاعدة الناتئ الغرابي.','علامات إضافية'),
 card('clavicular-facet','scapula','Clavicular facet','الوجه المفصلي للترقوة','على الأخرم؛ يقابل الطرف الأخرمي للترقوة.','علامات إضافية')
];
export const questions=[
 {id:'q1',prompt:'أي طرف من الترقوة يتصل بالقص؟',options:['Sternal end','Acromial end','Shaft','Conoid tubercle'],answer:0,explanation:'الطرف القصّي إنسي؛ والطرف الأخرمي وحشي.',source:girdle},
 {id:'q2',prompt:'أي حفرة تقع على السطح الأمامي للوح الكتف؟',options:['Infraspinous fossa','Supraspinous fossa','Subscapular fossa','Glenoid cavity'],answer:2,explanation:'الحفرة تحت لوح الكتف تواجه القفص الصدري.',source:girdle},
 {id:'q3',prompt:'بماذا يتمفصل التجويف الحقاني؟',options:['الترقوة','رأس العضد','القص','الضلع الأول'],answer:1,explanation:'التجويف الحقاني يستقبل رأس العضد.',source:girdle},
 {id:'q4',prompt:'أي بروز يمتد وحشيًا من شوكة لوح الكتف؟',options:['Coracoid process','Conoid tubercle','Acromion','Sternal end'],answer:2,explanation:'الأخرم امتداد الشوكة ويتصل بالترقوة.',source:girdle},
 {id:'q5',prompt:'الحافة الإنسية للوح الكتف ناحية…',options:['الإبط','العمود الفقري','العضد','الأخرم'],answer:1,explanation:'الحافة الوحشية ناحية الإبط؛ الإنسية ناحية العمود الفقري.',source:girdle},
 {id:'q6',prompt:'أي علامة ترتبط بالرباط شبه المنحرف؟',options:['Trapezoid line','Glenoid cavity','Subscapular fossa','Suprascapular notch'],answer:0,explanation:'الخط شبه المنحرف على السطح السفلي للترقوة.',source:clavicleSource},
 {id:'q7',prompt:'كم حفرة أساسية نراجع في لوح الكتف؟',options:['واحدة','اثنتان','ثلاث','أربع'],answer:2,explanation:'حفرتان خلفيتان وحفرة أمامية.',source:girdle},
 {id:'q8',prompt:'أين تقع الحفرة فوق الشوكة؟',options:['أمام لوح الكتف','خلفه فوق الشوكة','خلفه تحت الشوكة','على الترقوة'],answer:1,explanation:'Supraspinous: فوق الشوكة على السطح الخلفي.',source:girdle},
 {id:'q9',prompt:'الترقوة ولوح الكتف ينتميان إلى…',options:['الهيكل المحوري','الهيكل الطرفي','الجمجمة','العمود الفقري'],answer:1,explanation:'الحزام الكتفي جزء من الهيكل الطرفي.',source:girdle},
 {id:'q10',prompt:'الزاوية السفلية بين أي حافتين؟',options:['علوية وإنسية','علوية ووحشية','إنسية ووحشية','الأخرم والشوكة'],answer:2,explanation:'الحافتان الإنسية والوحشية تلتقيان في الأسفل.',source:girdle}
];
export function shuffled(items,random=Math.random){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}

export function setupFoundation({getKnown,setKnown,onAnswer,showBone}){
 const $=id=>document.getElementById(id);let activeBone='all',onlyUnknown=false,index=0,revealed=false,deck=[],test=[],testIndex=0,correct=0,answered=false;
 function speak(text){if(!('speechSynthesis' in window)){$('foundationSpeechStatus').textContent='الصوت غير متاح في هذا المتصفح.';return;}speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang='en-US';utter.rate=.8;const voice=speechSynthesis.getVoices().find(v=>v.lang.startsWith('en'));if(voice)utter.voice=voice;utter.onstart=()=>$('foundationSpeechStatus').textContent='جاري النطق…';utter.onend=()=>$('foundationSpeechStatus').textContent='';utter.onerror=()=>$('foundationSpeechStatus').textContent='تحقق من أصوات الإنجليزية في جهازك.';speechSynthesis.speak(utter);}
 function source(el,url){el.href=url;el.target='_blank';el.rel='noreferrer';}
 function rebuild(){deck=cards.filter(c=>(activeBone==='all'||c.bone===activeBone)&&(!onlyUnknown||!getKnown().includes(c.id)));index=0;revealed=false;render();}
 function render(){const c=deck[index],known=getKnown();$('foundationProgress').textContent=`راجعت ${known.length} / ${cards.length} بطاقة`;$('foundationCard').hidden=!c;$('foundationEmpty').hidden=!!c;for(const id of ['foundationReveal','foundationKnown','foundationSpeak','foundationShowBone','foundationPrev','foundationNext'])$(id).disabled=!c;
 if(!c){$('foundationPosition').textContent='لا توجد بطاقات في هذا الاختيار.';return;}
 $('foundationPosition').textContent=`${index+1} / ${deck.length} · ${c.bone==='clavicle'?'الترقوة':'لوح الكتف'} · ${c.group}`;$('foundationTerm').textContent=c.en;$('foundationArabic').textContent=c.ar;$('foundationHint').textContent=c.hint;$('foundationAnswer').hidden=!revealed;$('foundationReveal').textContent=revealed?'إخفاء الشرح':'اكشف المعنى والمكان';$('foundationKnown').textContent=known.includes(c.id)?'↺ أحتاج أراجعها':'✓ راجعتها';$('foundationKnown').disabled=!revealed;source($('foundationSource'),c.source);$('foundationPrev').disabled=index===0;$('foundationNext').disabled=index===deck.length-1;}
 $('foundationButton').onclick=()=>{rebuild();$('foundation').showModal();};$('closeFoundation').onclick=()=>$('foundation').close();$('foundation').addEventListener('close',()=>{if('speechSynthesis' in window)speechSynthesis.cancel();});
 $('foundationFilter').onchange=e=>{activeBone=e.target.value;rebuild();};$('foundationUnknown').onchange=e=>{onlyUnknown=e.target.checked;rebuild();};$('foundationReveal').onclick=()=>{revealed=!revealed;render();};$('foundationNext').onclick=()=>{if(index<deck.length-1){index++;revealed=false;render();}};$('foundationPrev').onclick=()=>{if(index>0){index--;revealed=false;render();}};
 $('foundationKnown').onclick=()=>{const id=deck[index]?.id;if(!id||!revealed)return;const known=getKnown();setKnown(known.includes(id)?known.filter(k=>k!==id):[...known,id]);if(onlyUnknown)rebuild();else render();};$('foundationSpeak').onclick=()=>{if(deck[index])speak(deck[index].en);};$('foundationShowBone').onclick=async()=>{const c=deck[index];if(!c)return;const b=$('foundationShowBone');b.disabled=true;try{await showBone(c.bone);$('foundation').close();}catch(e){$('foundationSpeechStatus').textContent=e.message;}finally{b.disabled=false;}};
 function renderQuestion(){const q=test[testIndex];answered=false;$('foundationQuizFeedback').textContent='';$('foundationQuizSource').hidden=true;$('foundationQuizNext').hidden=true;$('foundationQuizPrompt').textContent=q.prompt;$('foundationQuizCount').textContent=`السؤال ${testIndex+1} / ${test.length}`;$('foundationQuizOptions').replaceChildren();for(const option of shuffled(q.options.map((text,i)=>({text,i})))){const b=document.createElement('button');b.textContent=option.text;b.onclick=()=>{if(answered)return;answered=true;const ok=option.i===q.answer;if(ok)correct++;onAnswer(ok);for(const child of $('foundationQuizOptions').children)child.disabled=true;b.classList.add(ok?'correct':'incorrect');$('foundationQuizFeedback').textContent=(ok?'إجابة صحيحة. ':'الإجابة: '+q.options[q.answer]+'. ')+q.explanation;source($('foundationQuizSource'),q.source);$('foundationQuizSource').hidden=false;$('foundationQuizNext').textContent=testIndex===test.length-1?'عرض النتيجة':'السؤال التالي';$('foundationQuizNext').hidden=false;};$('foundationQuizOptions').append(b);}}
 function startTest(){test=shuffled(questions);testIndex=0;correct=0;$('foundationQuizPanel').hidden=false;$('foundationQuizResult').hidden=true;$('foundationQuizQuestion').hidden=false;renderQuestion();}
 $('foundationStartQuiz').onclick=startTest;$('foundationRestartQuiz').onclick=startTest;$('foundationQuizNext').onclick=()=>{if(!answered)return;if(testIndex<test.length-1){testIndex++;renderQuestion();}else{$('foundationQuizQuestion').hidden=true;$('foundationQuizResult').hidden=false;$('foundationQuizScore').textContent=`نتيجتك ${correct} / ${test.length}`;}};$('foundationCloseQuiz').onclick=()=>$('foundationQuizPanel').hidden=true;
}
