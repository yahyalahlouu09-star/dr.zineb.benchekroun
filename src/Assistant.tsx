import Robot from './Robot';
const HELP:Record<string,string>={fr:'Comment je peux t’aider ?',ar:'كيف يمكنني مساعدتك؟',en:'How can I help you?'};
import {useState} from 'react';import {MessageCircle,X,Send} from 'lucide-react';import {useNavigate} from 'react-router-dom';import {useLang} from './i18n';import {useDraft} from './draft';import {C} from './config';
type AL='fr'|'en'|'ar'|'dz';type M='mri'|'us'|'ct'|'mammo'|'other';
const T:Record<AL,{n:string;hi:string;ex:Record<M,string>;q:string[];x:Record<M,string>;done:string;urgent:string}>={
fr:{n:'Français',hi:'Bonjour, je prépare votre demande de rendez-vous. Quel examen ?',ex:{mri:'IRM',us:'Échographie',ct:'Scanner',mammo:'Mammographie',other:'Autre'},q:['Quelle zone du corps est concernée ?','Avez-vous une ordonnance ?','Avez-vous déjà fait cet examen ?','Avez-vous des comptes rendus ou examens antérieurs ?'],x:{mri:'Y a-t-il des informations (implants, etc.) qu’on vous a demandé de signaler à l’équipe ?',us:'Votre ordonnance précise-t-elle un type d’échographie ? Avez-vous reçu des consignes de préparation ?',ct:'L’ordonnance mentionne-t-elle une injection de produit de contraste ? Avez-vous reçu des consignes de préparation ?',mammo:'Votre ordonnance précise-t-elle le motif de l’examen ?',other:'Décrivez brièvement votre besoin.'},done:'Merci. Voici le résumé : vérifiez-le puis transférez-le au formulaire. Je ne donne ni diagnostic ni conseil médical.',urgent:`Ceci peut être une urgence : appelez immédiatement les urgences (${C.emergency}). Je ne peux pas poursuivre une demande de routine.`},
en:{n:'English',hi:'Hello, I help prepare your appointment request. Which exam?',ex:{mri:'MRI',us:'Ultrasound',ct:'CT scan',mammo:'Mammography',other:'Other'},q:['Which body area is concerned?','Do you have a prescription?','Have you had this exam before?','Do you have previous reports or exams?'],x:{mri:'Is there anything (e.g. implants) you were asked to tell the radiology team?',us:'Does your prescription name a type of ultrasound? Were you given preparation instructions?',ct:'Does the prescription mention contrast injection? Were you given preparation instructions?',mammo:'Does your prescription state the reason for the exam?',other:'Briefly describe your need.'},done:'Thanks. Here is the summary: check it, then send it to the form. I give no diagnosis or medical advice.',urgent:`This may be an emergency: call emergency services now (${C.emergency}). I cannot continue a routine request.`},
ar:{n:'العربية',hi:'مرحبا، أساعدك في تحضير طلب الموعد. ما هو الفحص؟',ex:{mri:'الرنين المغناطيسي',us:'الفحص بالصدى',ct:'السكانير',mammo:'تصوير الثدي',other:'آخر'},q:['ما هي المنطقة المعنية من الجسم؟','هل لديك وصفة طبية؟','هل أجريت هذا الفحص من قبل؟','هل لديك تقارير أو فحوصات سابقة؟'],x:{mri:'هل هناك معلومات (مثل الغرسات) طُلب منك إبلاغ الفريق بها؟',us:'هل تحدد الوصفة نوع الفحص بالصدى؟ هل تلقيت تعليمات التحضير؟',ct:'هل تذكر الوصفة حقن مادة التباين؟ هل تلقيت تعليمات التحضير؟',mammo:'هل تذكر الوصفة سبب الفحص؟',other:'صف حاجتك باختصار.'},done:'شكرا. هذا هو الملخص: راجعه ثم انقله إلى الاستمارة. لا أقدم تشخيصا ولا نصيحة طبية.',urgent:`قد تكون حالة طارئة: اتصل فورا بالإسعاف (${C.emergency}). لا يمكنني متابعة طلب عادي.`},
dz:{n:'الدارجة',hi:'مرحبا، غادي نعاونك تحضر طلب الموعد. شنو هو الفحص؟',ex:{mri:'IRM',us:'إيكوغرافي',ct:'سكانير',mammo:'ماموغرافي',other:'شي حاجة أخرى'},q:['أشمن جهة من الجسم؟','واش عندك الوصفة (ordonnance)؟','واش سبق ديتي هاد الفحص؟','واش عندك شي تقارير ولا فحوصات قديمة؟'],x:{mri:'واش كاين شي حاجة (بحال implants) طلبو منك تعلم بيها الفريق؟',us:'واش الوصفة كاتحدد نوع الإيكوغرافي؟ واش عطاوك شي تعليمات قبل الفحص؟',ct:'واش الوصفة كاتذكر الحقن بالـ produit de contraste؟ واش عطاوك تعليمات؟',mammo:'واش الوصفة كاتذكر سبب الفحص؟',other:'وصف لينا بإيجاز شنو محتاج.'},done:'شكرا. هاهو الملخص: شوفو وصيفطو للاستمارة. ما كنعطيش تشخيص ولا نصيحة طبية.',urgent:`هادي ممكن تكون حالة مستعجلة: عيط دغيا للإسعاف (${C.emergency}).`}};
const URG=/urgen|emergency|chest pain|douleur thorac|ألم في الصدر|طوارئ|مستعجل|ما قادرش نتنفس|difficulté à respirer|can.?t breathe/i;
export default function Assistant(){
 const {t,lang}=useLang();const nav=useNavigate();const {setDraft}=useDraft();
 const [open,setOpen]=useState(false);const [al,setAl]=useState<AL>(lang==='ar'?'ar':lang==='en'?'en':'fr');
 const [m,setM]=useState<M|null>(null);const [ans,setAns]=useState<string[]>([]);const [msgs,setMsgs]=useState<{me:boolean;x:string}[]>([]);const [v,setV]=useState('');const [typing,setTyping]=useState(false);const [stop,setStop]=useState(false);
 const L=T[al];const qs=m?[...L.q,L.x[m]]:[];const done=m!==null&&ans.length>=qs.length;
 const bot=(x:string)=>{setTyping(true);setTimeout(()=>{setMsgs(a=>[...a,{me:false,x}]);setTyping(false)},600)};
 const reset=(a:AL)=>{setAl(a);setM(null);setAns([]);setMsgs([]);setStop(false)};
 const pick=(k:M)=>{setM(k);setMsgs(a=>[...a,{me:true,x:L.ex[k]}]);bot([...L.q,L.x[k]][0])};
 const send=()=>{const x=v.trim();if(!x||!m||done)return;setV('');setMsgs(a=>[...a,{me:true,x}]);
  if(URG.test(x)){setStop(true);bot(L.urgent);return}
  const na=[...ans,x];setAns(na);bot(na.length>=qs.length?L.done:qs[na.length])};
 const summary=m?`${L.ex[m]}\n`+qs.map((q,i)=>ans[i]?`- ${q} ${ans[i]}`:'').filter(Boolean).join('\n'):'';
 return <>
 {!open&&<button aria-label={t.aT} onClick={()=>setOpen(true)} className="fixed bottom-0 end-3 z-[95] flex items-end gap-1 md:end-6">
  <span className="pop relative mb-24 max-w-[170px] bg-bone px-4 py-3 text-start text-sm font-medium leading-snug text-ink shadow-xl md:max-w-[260px] md:text-base">{HELP[lang]}<span className="absolute -end-1 bottom-5 h-3 w-3 rotate-45 bg-bone"/></span>
  <span className="bob robot-mask block"><Robot className="h-36 w-auto md:h-40"/></span></button>}
 {open&&<button aria-label="close" onClick={()=>setOpen(false)} className="fixed bottom-6 end-6 z-[95] grid h-10 w-10 place-items-center border border-bone/40 bg-ink/80 text-bone"><X size={14}/></button>}
 {open&&<section role="dialog" aria-label={t.aT} className="fixed inset-y-0 end-0 z-[94] flex w-[min(100vw,420px)] flex-col border-s border-bone/20 bg-ink/95 pb-16 backdrop-blur-xl">
  <header className="p-3 border-b border-white/10"><div className="flex items-center gap-3"><Robot crop className="h-12 w-12"/><b>{t.aT}</b></div><p className="text-xs text-amber-300">{t.aDemo}</p><p className="text-xs opacity-60">{t.aDisc}</p>
   <div className="mt-2 flex gap-1 text-xs">{(Object.keys(T) as AL[]).map(k=><button key={k} onClick={()=>reset(k)} className={`rounded-full px-2 py-1 ${al===k?'bg-brand text-ink':'glass'}`}>{T[k].n}</button>)}</div></header>
  <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm" aria-live="polite">
   <p className="border-s border-moss/60 ps-3">{L.hi}</p>
   {!m&&<div className="flex flex-wrap gap-1">{(Object.keys(L.ex) as M[]).map(k=><button key={k} onClick={()=>pick(k)} className="btn2 !py-1 !px-3 text-xs">{L.ex[k]}</button>)}</div>}
   {msgs.map((g,i)=><p key={i} className={`border-s ps-3 ${g.me?'border-bone/40 ms-8 opacity-70':'border-moss/60 me-8'}`}>{g.x}</p>)}
   {typing&&<p className="opacity-60">…</p>}
   {done&&!stop&&<div className="glass whitespace-pre-wrap p-3 text-xs"><b>{t.summary}</b>{'\n'}{summary}<button className="btn mt-2 w-full !py-1" onClick={()=>{setDraft({exam:m||'',caseText:summary});setOpen(false);document.getElementById('book')?.scrollIntoView({behavior:'smooth'})}}>{t.use}</button></div>}
  </div>
  {m&&!done&&!stop&&<div className="flex gap-2 border-t border-white/10 p-2"><input aria-label="message" value={v} onChange={e=>setV(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}/><button aria-label="send" onClick={send} className="btn !p-2"><Send size={16}/></button></div>}
 </section>}</>}
