import {useEffect,useRef,useState,FormEvent} from 'react';import {motion,useScroll,useTransform,useMotionValueEvent} from 'framer-motion';
import {useLang} from './i18n';import {useDraft} from './draft';import {C,IMG,SERVICES,SPACES} from './config';import {submitAppointment} from './api';import {X} from './copy';
const Dial=({className=''}:{className?:string})=><svg viewBox="-100 -100 200 200" className={`dial ${className}`} aria-hidden="true">{Array.from({length:72},(_,i)=><line key={i} y1={-96} y2={i%6===0?-82:-90} transform={`rotate(${i*5})`} stroke="currentColor" strokeWidth={i%6===0?.8:.4}/>)}<circle r="70" fill="none" stroke="currentColor" strokeWidth=".3"/></svg>;
const Tag=({n,x}:{n:string;x:string})=><p className="mono text-moss">{n} — {x}</p>;
export function Hero(){const {t,lang}=useLang();const x=X[lang];const r=useRef<HTMLElement>(null);const {scrollYProgress}=useScroll({target:r,offset:['start start','end start']});
 const y=useTransform(scrollYProgress,[0,1],['0%','16%']);const ty=useTransform(scrollYProgress,[0,1],['0%','-35%']);const fade=useTransform(scrollYProgress,[0,.55],[1,0]);
 return <section ref={r} className="relative h-[100svh] min-h-[640px] overflow-hidden">
  <motion.img style={{y}} src={IMG.hero} alt={C.name} initial={{scale:1.15,opacity:0}} animate={{scale:1,opacity:.7}} transition={{duration:2}} className="absolute inset-0 h-[116%] w-full object-cover"/>
  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/60"/><div className="scan"/>
  <Dial className="absolute -end-[20vw] top-[6vh] h-[75vh] w-[75vh] text-moss/50"/>
  <motion.div style={{y:ty,opacity:fade}} className="absolute inset-0 flex flex-col justify-end px-6 pb-[11vh] pt-28 md:px-16 md:ps-28">
   <p className="mono mb-6 text-moss">{t.tag}</p>
   <h1 className="disp text-[clamp(3.5rem,min(17vw,24vh),16rem)]">{x.h[0]}<br/><span className="ms-[8vw] italic text-copper">{x.h[1]}</span></h1>
   <div className="mt-10 flex flex-wrap items-end justify-between gap-6"><p className="max-w-sm text-sm opacity-80">{x.lead}</p><a href="#book" className="cta">{t.cta1} <span className="inline-block rtl:rotate-180">→</span></a></div></motion.div>
  <p className="mono absolute bottom-4 start-6 opacity-50 md:start-16">{x.scroll} ↓</p></section>}
export function Center(){const {t,lang}=useLang();const x=X[lang];const r=useRef<HTMLElement>(null);const [i,setI]=useState(0);const [wide,setWide]=useState<Record<string,boolean>>({});const N=SPACES.length;
 const {scrollYProgress}=useScroll({target:r,offset:['start start','end end']});useMotionValueEvent(scrollYProgress,'change',v=>setI(Math.min(N-1,Math.floor(v*N))));
 const s=SPACES[i];
 return <section id="center" ref={r} style={{height:`${N*100}vh`}} className="relative">
  <div className="sticky top-0 h-screen overflow-hidden bg-ink">
   {SPACES.map((p,n)=>{const w=wide[p.id];const on=n===i;return <div key={p.id} aria-hidden={!on} className="absolute inset-0 transition-opacity duration-1000" style={{opacity:on?1:0}}>
    <img src={p.img} alt="" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-25 blur-2xl"/>
    <img src={p.img} alt={p.t[lang]} onLoad={e=>{const el=e.currentTarget;setWide(m=>({...m,[p.id]:el.naturalWidth>el.naturalHeight}))}} className={`absolute inset-y-0 end-0 h-full object-cover transition-transform duration-[3000ms] ${w?'w-full':'w-full md:w-1/2'} ${on?'scale-100':'scale-110'}`}/>
    <div className="absolute inset-0 bg-ink/50"/>
    {!w&&<div className="absolute inset-y-0 end-0 hidden w-1/2 bg-gradient-to-r from-ink via-ink/25 to-transparent md:block rtl:bg-gradient-to-l"/>}
   </div>})}
   <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/10 to-transparent rtl:bg-gradient-to-l"/>
   <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/50"/>
   <div className="absolute top-[14vh] start-6 md:start-28"><Tag n="I" x={t.nav[1]}/></div>
   <div className="absolute bottom-[9vh] start-6 max-w-[80vw] md:start-28 md:max-w-[46vw]">
    <p className="mono mb-4">0{i+1} / 0{N}</p>
    <motion.h2 key={s.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="disp text-[clamp(2.8rem,8vw,8rem)]">{s.t[lang]}</motion.h2>
    <p className="mt-4 max-w-sm text-sm opacity-80">{s.d[lang]}</p>{s.ai&&<p className="mono mt-3 text-amber-300">[{x.ai}]</p>}</div></div></section>}
export function Doctor(){const {t,lang}=useLang();const x=X[lang];
 return <section id="doctor" className="relative px-6 py-[18vh] md:px-16 md:ps-28"><Tag n="II" x={t.nav[2]}/>
  <h2 className="disp mt-6 text-[clamp(3rem,11vw,11rem)]">{t.docT}</h2>
  <div className="mt-16 grid gap-10 md:grid-cols-12"><div className="relative aspect-[4/5] overflow-hidden border border-bone/20 md:col-span-5"><img src={IMG.doctor} alt={t.docT} loading="lazy" className="h-full w-full object-cover object-[60%_35%]"/><div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"/><Dial className="absolute -bottom-1/4 -end-1/4 h-3/4 w-3/4 text-bone/30"/></div>
   <p className="font-display text-2xl text-amber-200/90 md:col-span-5 md:col-start-8 md:self-end">{t.docP}</p></div></section>}
export function Exams(){const {t,lang}=useLang();
 return <section id="exams" className="py-[14vh]"><div className="px-6 md:px-16 md:ps-28"><Tag n="III" x={t.nav[3]}/></div>
  <div tabIndex={0} aria-label={t.srvT} className="mt-8 flex snap-x snap-mandatory gap-[3vw] overflow-x-auto px-6 pb-8 md:px-16 md:ps-28">
   {SERVICES.map((s,n)=><article key={s.id} className="relative flex h-[70vh] w-[84vw] shrink-0 snap-center overflow-hidden border border-bone/15 md:w-[62vw]">
    {s.img?<img src={s.img} alt="" loading="lazy" className="absolute inset-y-0 end-0 h-full w-3/5 object-cover"/>:<Dial className="absolute -end-20 top-10 h-[60vh] w-[60vh] text-bone/15"/>}
    <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent rtl:bg-gradient-to-l"/>
    <div className="relative mt-auto max-w-[70%] p-6 md:p-10"><span className="mono">0{n+1}</span><h3 className="disp mt-3 text-[clamp(2.6rem,7vw,7rem)]">{s.name[lang]}</h3>{!s.confirmed&&<span className="mono text-amber-300">{t.soon}</span>}<p className="mt-3 text-sm text-amber-200/80">{t.srvP}</p></div></article>)}</div></section>}
export function Book(){const {t,lang}=useLang();const {draft}=useDraft();const [s,setS]=useState(0);const [err,setErr]=useState<string[]>([]);const [busy,setBusy]=useState(false);const [done,setDone]=useState<Awaited<ReturnType<typeof submitAppointment>>|null>(null);const [fail,setFail]=useState(false);const [file,setFile]=useState<File|null>(null);
 const [f,setF]=useState({name:'',phone:'',email:'',contactLang:lang,exam:'',caseText:'',hasPrescription:false,hadBefore:false,date:'',time:'',comments:'',consent:false});
 const set=(k:string,v:unknown)=>setF(o=>({...o,[k]:v}));
 useEffect(()=>{if(draft.caseText)setF(o=>({...o,exam:SERVICES.some(v=>v.id===draft.exam)?draft.exam:'other',caseText:draft.caseText}))},[draft]);
 const need=[['name','phone'],['exam'],['caseText'],[],['consent']][s];
 const next=()=>{const e=need.filter(k=>!(f as Record<string,unknown>)[k]||(k==='phone'&&!/^[+\d\s().-]{8,}$/.test(f.phone)));setErr(e);if(!e.length)setS(s+1)};
 const submit=async(e:FormEvent)=>{e.preventDefault();if(!f.consent){setErr(['consent']);return}setBusy(true);setFail(false);try{setDone(await submitAppointment(f,file))}catch{setFail(true)}setBusy(false)};
 const E=(k:string)=>err.includes(k)?<p role="alert" className="mono mt-1 text-red-300">{t.req}</p>:null;
 const examName=SERVICES.find(v=>v.id===f.exam)?.name[lang]||(f.exam?t.other:'');
 return <section id="book" className="relative px-6 py-[16vh] md:px-16 md:ps-28"><Tag n="IV" x={t.nav[4]}/>
  <div className="mt-6 grid gap-12 md:grid-cols-12"><div className="md:col-span-5"><h2 className="disp text-[clamp(3.2rem,8.5vw,9rem)]">{t.bookT}</h2>
   {!done&&<><p aria-hidden className="disp mt-8 text-[clamp(6rem,15vw,14rem)] text-copper/70">0{s+1}</p><p className="mono">{t.steps[s]}</p></>}</div>
  <div className="md:col-span-6 md:col-start-7 md:self-end">{done?<div><p className="disp text-5xl">{t.sentT}</p><p className="mt-6 text-lg">{t.sentS}</p>{done.demo&&<p className="mono mt-4 text-amber-300">{t.demo}</p>}{done.ref&&<p className="mono mt-4">Réf. {done.ref}</p>}</div>:
  <form onSubmit={submit}><div className="mb-6 flex gap-1" aria-hidden>{t.steps.map((_,i)=><span key={i} className={`h-px flex-1 ${i<=s?'bg-moss':'bg-bone/20'}`}/>)}</div>
   {s===0&&<><label className="mono lbl">{t.name}<input className="field" value={f.name} onChange={e=>set('name',e.target.value)}/></label>{E('name')}<label className="mono lbl">{t.phone}<input className="field" type="tel" value={f.phone} onChange={e=>set('phone',e.target.value)}/></label>{E('phone')}<label className="mono lbl">{t.email}<input className="field" type="email" value={f.email} onChange={e=>set('email',e.target.value)}/></label><label className="mono lbl">{t.lang}<select className="field" value={f.contactLang} onChange={e=>set('contactLang',e.target.value)}><option value="fr">Français</option><option value="ar">العربية</option><option value="en">English</option></select></label></>}
   {s===1&&<><label className="mono lbl">{t.exam}<select className="field" value={f.exam} onChange={e=>set('exam',e.target.value)}><option value=""/>{SERVICES.map(v=><option key={v.id} value={v.id}>{v.name[lang]}</option>)}<option value="other">{t.other}</option></select></label>{E('exam')}</>}
   {s===2&&<><label className="mono lbl">{t.caseL}<textarea rows={6} className="field" value={f.caseText} onChange={e=>set('caseText',e.target.value)}/></label>{E('caseText')}<label className="mono lbl flex items-center gap-3"><input type="checkbox" className="h-4 w-4 accent-[#7fb08a]" checked={f.hasPrescription} onChange={e=>set('hasPrescription',e.target.checked)}/>{t.presc}</label><label className="mono lbl flex items-center gap-3"><input type="checkbox" className="h-4 w-4 accent-[#7fb08a]" checked={f.hadBefore} onChange={e=>set('hadBefore',e.target.checked)}/>{t.prev}</label><label className="mono lbl">{t.file}<input className="mt-2 block text-sm" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e=>setFile(e.target.files?.[0]||null)}/></label></>}
   {s===3&&<><label className="mono lbl">{t.date}<input className="field" type="date" value={f.date} onChange={e=>set('date',e.target.value)}/></label><label className="mono lbl">{t.time}<input className="field" type="time" value={f.time} onChange={e=>set('time',e.target.value)}/></label><label className="mono lbl">{t.comm}<textarea className="field" value={f.comments} onChange={e=>set('comments',e.target.value)}/></label></>}
   {s===4&&<><dl className="space-y-3">{[[t.name,f.name],[t.phone,f.phone],[t.exam,examName],[t.caseL,f.caseText],[t.date,`${f.date} ${f.time}`]].map(([a,b])=><div key={a}><dt className="mono opacity-60">{a}</dt><dd className="whitespace-pre-wrap font-display text-xl">{b}</dd></div>)}</dl><label className="mono lbl flex items-start gap-3 normal-case"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#7fb08a]" checked={f.consent} onChange={e=>set('consent',e.target.checked)}/>{t.consent}</label>{E('consent')}</>}
   {fail&&<p role="alert" className="mono mt-4 text-red-300">Error — retry.</p>}
   <div className="mt-10 flex items-center justify-between">{s>0?<button type="button" className="cta opacity-70" onClick={()=>setS(s-1)}>{t.back}</button>:<span/>}{s<4?<button type="button" className="cta" onClick={next}>{t.next}</button>:<button className="cta text-moss" disabled={busy}>{busy?'…':t.send}</button>}</div></form>}</div></div></section>}
export function Contact(){const {t}=useLang();const q=encodeURIComponent(C.mapsQuery||C.city);
 return <section id="contact" className="px-6 py-[14vh] md:px-16 md:ps-28"><Tag n="V" x={t.nav[5]}/><h2 className="disp mt-6 text-[clamp(3rem,10vw,10rem)]">{t.contT}</h2>
  <div className="mt-14 grid gap-10 md:grid-cols-12"><div className="space-y-6 md:col-span-5"><p><span className="mono block opacity-60">{t.addr}</span><span className="font-display text-2xl">{C.address}</span></p><p><span className="mono block opacity-60">{t.phone}</span><span className="font-display text-2xl">{C.phone}</span></p><p><span className="mono block opacity-60">{t.hours}</span><span className="font-display text-2xl">{C.hours}</span></p>
   <div className="flex gap-6"><a className="cta" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}>{t.itin}</a>{C.whatsapp&&<a className="cta" target="_blank" rel="noreferrer" href={`https://wa.me/${C.whatsapp}`}>WhatsApp</a>}</div>
   <form onSubmit={e=>e.preventDefault()}><label className="mono lbl">{t.msg}<textarea rows={3} className="field"/></label><p className="mono mt-3 text-amber-300">{t.demo}</p></form></div>
  {import.meta.env.VITE_PROTOTYPE==='1'?<div className="mono relative grid h-[60vh] place-items-center overflow-hidden border border-bone/20 md:col-span-7"><Dial className="absolute inset-0 m-auto h-3/4 text-bone/20"/><span className="relative">Google Maps — {C.address}</span></div>:<iframe title="map" loading="lazy" style={{filter:'grayscale(1) invert(.9) contrast(.85)'}} className="h-[60vh] w-full md:col-span-7" src={`https://maps.google.com/maps?q=${q}&output=embed`}/>}</div></section>}
