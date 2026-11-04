import {useEffect,useState} from 'react';import {motion,useScroll} from 'framer-motion';
import {useLang} from './i18n';import Assistant from './Assistant';import {Hero,Center,Doctor,Exams,Book,Contact} from './pages';import {C,Lang} from './config';
const IDS=['center','doctor','exams','book','contact'];const ROM=['I','II','III','IV','V'];
export default function App(){const {t,lang,setLang}=useLang();const {scrollYProgress}=useScroll();const [act,setAct]=useState('');
 useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setAct(e.target.id)),{rootMargin:'-45% 0px -45% 0px'});IDS.forEach(id=>{const el=document.getElementById(id);if(el)o.observe(el)});return()=>o.disconnect()},[]);
 return <div>
 <motion.div style={{scaleX:scrollYProgress}} className="fixed inset-x-0 top-0 z-[80] h-px origin-left bg-moss"/>
 <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 mix-blend-difference md:px-16">
  <a href="#top" className="font-display text-lg">{C.name}</a>
  <div className="flex items-center gap-5"><div className="mono flex gap-3" role="group" aria-label="Language">{(['fr','ar','en'] as Lang[]).map(l=><button key={l} onClick={()=>setLang(l)} aria-pressed={lang===l} className={lang===l?'border-b border-bone':'opacity-50'}>{l}</button>)}</div><a href="#book" className="cta hidden sm:block">{t.cta1}</a></div>
 </header>
 <nav aria-label="Chapters" className="mono fixed start-6 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference md:block"><ol className="space-y-4">{IDS.map((id,i)=><li key={id}><a href={`#${id}`} className={`flex items-center gap-3 transition-opacity ${act===id?'opacity-100':'opacity-40 hover:opacity-80'}`}><span className={`h-px bg-bone transition-all ${act===id?'w-8':'w-3'}`}/>{ROM[i]}</a></li>)}</ol></nav>
 <main id="top"><Hero/><Center/><Doctor/><Exams/><Book/><Contact/></main>
 <footer className="mono px-6 py-10 opacity-50 md:px-16">© {C.name} — {C.sub} — {C.city}</footer>
 {import.meta.env.VITE_PROTOTYPE==='1'&&<p className="mono fixed bottom-3 start-3 z-[80] border border-bone/30 bg-ink/80 px-3 py-2 backdrop-blur" style={{fontSize:'.6rem'}}>Prototype — contenu à valider avec le Dr Benchekroun</p>}
 <Assistant/></div>}
