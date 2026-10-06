# Thomas Anatomy Atlas

أطلس تشريح تفاعلي بالعربية والإنجليزية، يعمل كموقع ثابت على GitHub Pages، بدون خادم أو مفاتيح سرية.

## التشغيل الآن

1. فك ضغط حزمة المشروع.
2. افتح الطرفية داخل مجلد `thomas-anatomy-atlas` وشغّل `python3 -m http.server 8000`.
3. افتح `http://localhost:8000/` في متصفح حديث يدعم WebGL.

لا تفتح `index.html` مباشرة عبر `file://`؛ وحدات JavaScript وتحميل النماذج تحتاج HTTP/HTTPS.

## النشر على GitHub Pages — الطريقة الأبسط

1. أنشئ مستودعًا مستقلًا باسم `thomas-anatomy-atlas` على GitHub. إن كان حسابك مجانيًا وتستخدم Pages العامة، اختر مستودعًا عامًا.
2. ارفع **محتويات** مجلد المشروع إلى جذر المستودع، بحيث يظهر `index.html` في الجذر، وليس داخل مجلد إضافي. حافظ على مجلدات `assets` و`shoulder` و`vendor` و`licenses` و`icons`.
3. افتح `Settings → Pages → Build and deployment`.
4. اختر `Deploy from a branch`، ثم الفرع `main` والمجلد `/ (root)`، واضغط Save.
5. افتح رابط الموقع الذي يظهر في صفحة Pages بعد اكتمال النشر.

كل المسارات نسبية؛ يعمل الموقع سواء كان على جذر النطاق أو على `/thomas-anatomy-atlas/`.

### بديل: GitHub Actions

المشروع يحتوي `.github/workflows/pages.yml` لفحص الملفات ونشرها تلقائيًا. إذا أردت هذا البديل، اختر `GitHub Actions` كمصدر في Settings → Pages، واحتفظ بمجلد `.github` عند رفع المشروع. لا تستخدم الخيارين معًا. إعداد Actions يفترض أن فرع المصدر اسمه `main`.

## Atlas 02 — وضوح العرض والتوافق

- أوف وايت للعظام، إضاءة محايدة وخلفية تبرز تفاصيل السطح.
- فتح لوح الكتف الأيمن معزولًا، وعزل العظمة المختارة تلقائيًا من قائمة الأجزاء.
- تقسيم الهيكل إلى الرأس، العمود الفقري، القفص الصدري، الطرف العلوي، والحوض والطرف السفلي.
- قوائم الموبايل في لوحات تُفتح عند الحاجة، مع مساحة مستقلة للعارض.
- سبعة مواضع تعليمية تقديرية على نماذج اليمين: خمسة للوح الكتف واثنان للترقوة، مع أرقام وقائمة ونطق وزوايا عرض. ليست مواضع اعتمدها متخصص؛ لا توجد علامات مدققة لكل معالم السطح بعد.
- إعادة المحاولة ورسالة خطأ مفصلة ومهلة زمنية للتحميل وفك النماذج.
- عند غياب WebGL2، عارض Canvas يحسب إسقاط النماذج ثلاثية الأبعاد نفسها على المعالج. يدعم الدوران والاختيار؛ أبطأ من WebGL، وترتيب الأسطح الشفافة تقريبي. الدوران التلقائي معطّل في هذا الوضع.

## إضافة Foundation I

زر Foundation I يفتح ٢١ بطاقة للترقوة ولوح الكتف، مع كشف المعنى والمكان، نطق الاسم، فلتر للعظمة والبطاقات التي لم تُراجع، وفتح العظمة المعزولة في عارض 3D. يوجد اختبار من ١٠ أسئلة مع تفسير ومصدر لكل إجابة. ترتيب الأسئلة والاختيارات يتغير في كل اختبار. تقدم البطاقات يدخل في النسخة الاحتياطية؛ ملفات المذاكرة القديمة متوافقة. العلامات المذكورة لا تُحدد تلقائيًا على سطح النموذج.

إذا فشل النشر في Configure Pages برسالة Not Found، افتح Settings → Pages واختر GitHub Actions، ثم أعد تشغيل workflow من Actions. هذا إعداد للمستودع ولا تصلحه ملفات الموقع وحدها.

## الوظائف المنفذة

- هيكل عظمي كامل من المصدر المتاح، مع توليد الأجزاء اليسرى المقابلة بالانعكاس.
- أعضاء داخلية وسطح جسم، وقسم للكتف والذراع الأيمن بعظام وعضلات وأوعية.
- بحث بالعربية والإنجليزية، دوران وتكبير، زوايا عرض، عزل، إخفاء، شفافية وتباعد.
- قص سطح النموذج على ثلاثة محاور؛ ليس مقاطع أشعة أو نسيجية مكتملة.
- أسماء ونطق يعتمد على صوت الإنجليزية في الجهاز، وشرح مختصر لأجزاء مختارة.
- تدريب عملي على اختيار العظمة مع حفظ النتيجة الإجمالية.
- ملاحظات شخصية، مفضلة، علامات شخصية على السطح، وحفظ مشاهد الكاميرا والأجزاء الظاهرة.
- تصدير واستيراد المذاكرة بملف JSON، مع التحقق من صيغة الملف قبل دمجه.
- تنزيل الملفات والنماذج للعمل دون اتصال عبر Service Worker، وإمكانية إضافة التطبيق للجهاز في المتصفحات الداعمة.

## ما لم يُنفذ بعد

راجع `ROADMAP.md`؛ هذه النسخة **لا تحقق كل مواصفات الأطلس النهائي**. لا تتضمن أطلسًا كاملًا للعضلات والأعصاب والأوعية في كل الجسم، علامات تشريحية مراجعة، شرائح CT/MRI، أنسجة مجهرية، محاكاة حركة موثقة، حسابات ومزامنة، أو مساعد AI.

مواءمة الهيكل والأعضاء تقريبية؛ لا تستخدم القياسات أو المواضع لتخطيط إجراءات طبية. العلامات الشخصية غير مراجعة من متخصص. الأداة التعليمية تحتاج مراجعة تشريحية وبصرية قبل اعتمادها لتدريس رسمي.

## بياناتك والخصوصية

الملاحظات والمفضلة والعلامات والمشاهد محفوظة محليًا في هذا المتصفح فقط. مسح بيانات الموقع يحذفها، وقد يحذف المتصفح الملفات المحملة عندما تنقص المساحة. صدّر نسخة احتياطية دوريًا. لا توجد حسابات أو خدمات تحليلات أو مفاتيح API داخل البرنامج.

استيراد النسخة يدمج المفضلة والعلامات والمشاهد حسب المعرّفات؛ الملاحظة الواردة لنفس الجزء تستبدل الملاحظة الحالية. النتائج الإجمالية تستخدم الأكبر من النسختين لتجنب تكرار العد. تصدير النسخة الحالية أولًا يحفظ ملاحظاتك السابقة.

حفظ المشهد يشمل زاوية الكاميرا، الطبقات المعروضة، الأجزاء المخفية والجزء المحدد. الشفافية والتباعد والقص لا تُحفظ ضمن المشهد في هذه النسخة.

## الفحص

```sh
node --check app.js
node --check sw.js
node --test tests/*.test.mjs
python3 tests/check_static.py
```

الاختبارات تغطي سلامة حفظ/استيراد البيانات، عناصر الواجهة المطلوبة، مسارات الملفات، قائمة العمل دون اتصال، وبنية ملفات GLB. لم يُنفذ اختبار عرض بصري في المتصفح أو اختبار استجابة على هاتف فعلي لهذه النسخة.

## التحديث

عند تعديل ملفات التطبيق في نسخة لاحقة، غيّر اسم الكاش في `sw.js` وفي `app.js` إلى نفس رقم الإصدار الجديد، وجدّد `offline-assets.json` إذا أضفت ملفات. لا تغير مفتاح حفظ المذاكرة دون مسار ترحيل للبيانات.

## المصادر والتراخيص

اقرأ `ATTRIBUTION.md` و`assets/THIRD_PARTY_NOTICES.md` ومجلد `licenses`. تراخيص ShareAlike تخص النماذج ومشتقاتها؛ حافظ على الإسناد والتراخيص عند إعادة توزيع المشروع.

وثائق النشر الرسمية: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Atlas 03 — body regions and practical pins

Separate skull, trunk, thorax, abdomen, pelvis, shoulder girdle, upper limb, pelvic girdle, lower limb and spine views. Upper and lower limbs include subregions and a side selector. Abdomen opens the available organ layer; it does not claim a complete abdominal wall or pelvic viscera.

43 approximate surface markers across existing detailed upper-limb bones and overview femur, tibia, fibula and patella. Lower markers use the actual inspected overview mesh coordinates and work on mirrored counterparts. These positions are not professionally reviewed. The catalogue explicitly separates unplaced landmarks; no marker is manufactured for a missing feature. Pin recall hides names until revealed; pronunciation is available.

The lower-limb overview remains low polygon (right femur: 505 vertices). This update does not claim 16K textures or commercial-atlas anatomical fidelity. Replacing the models and reviewing marker locations remain necessary.

## Detailed lower-limb build
Pages now generates five higher-detail BodyParts3D bone assets from pinned, checksum-verified source STL files: femur, tibia, fibula, patella and hip bone. The source triangles are preserved; the converter changes only axes/units and shading normals. A separate detailed view keeps the coherent source anatomy together and mirrors the right bones for left-side study. Existing annotations are mapped provisionally to the new geometry and snapped to its actual surface; they remain approximate and need anatomical review. Selected pins rotate to an unobstructed camera view and retain the same number and name in the list. No 16K texture is claimed or generated.
