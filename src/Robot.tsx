// Mascotte de l'assistante : robot féminin en blouse de médecin (SVG inline, aucune dépendance).
export default function Robot({className='',crop=false}:{className?:string;crop?:boolean}){
 return <svg viewBox={crop?'20 4 80 84':'0 0 120 170'} className={className} aria-hidden="true" focusable="false">
  <path d="M34 40C16 44 12 70 24 86C22 66 28 54 36 50Z" fill="#b98b5a"/>
  <circle cx="60" cy="15" r="9" fill="#b98b5a"/>
  <rect x="53" y="72" width="14" height="14" fill="#cfc8b8"/>
  <path d="M20 170V112C20 94 34 86 52 84L60 100L68 84C86 86 100 94 100 112V170Z" fill="#f6f2ea" stroke="#cfc8b8"/>
  <polygon points="52,84 68,84 60,132" fill="#1f3a2c"/>
  <path d="M52 84L45 110L58 124L60 132Z" fill="#e6dfd0" stroke="#cfc8b8"/>
  <path d="M68 84L75 110L62 124L60 132Z" fill="#e6dfd0" stroke="#cfc8b8"/>
  <path d="M60 134V170" stroke="#cfc8b8"/>
  <circle cx="60" cy="144" r="1.6" fill="#b98b5a"/><circle cx="60" cy="158" r="1.6" fill="#b98b5a"/>
  <rect x="29" y="128" width="19" height="17" fill="none" stroke="#cfc8b8"/>
  <circle cx="38.5" cy="137" r="4" fill="none" stroke="#7fb08a" strokeWidth="1.2"/><path d="M38.5 134.5v5M36 137h5" stroke="#7fb08a" strokeWidth="1.2"/>
  <rect x="43" y="122" width="2" height="9" fill="#7fb08a"/>
  <path d="M48 86C42 118 78 118 72 86" fill="none" stroke="#2a2f2c" strokeWidth="2"/><circle cx="60" cy="110" r="3.5" fill="#b98b5a" stroke="#2a2f2c"/>
  <rect x="32" y="22" width="56" height="50" rx="24" fill="#f4f1ea" stroke="#cfc8b8"/>
  <path d="M32 46C32 20 88 20 88 46C80 34 40 34 32 46Z" fill="#b98b5a"/>
  <circle cx="30" cy="48" r="5" fill="#7fb08a"/><circle cx="90" cy="48" r="5" fill="#7fb08a"/>
  <rect x="39" y="38" width="42" height="28" rx="14" fill="#0b0f0d"/>
  <g className="blink"><ellipse cx="51" cy="52" rx="4.2" ry="5" fill="#7fb08a"/><ellipse cx="69" cy="52" rx="4.2" ry="5" fill="#7fb08a"/></g>
  <path d="M46 47l-3-3M48.5 45.5l-1.5-3.5M74 47l3-3M71.5 45.5l1.5-3.5" stroke="#7fb08a" strokeWidth="1.2" strokeLinecap="round"/>
  <path d="M54 61Q60 65 66 61" fill="none" stroke="#7fb08a" strokeWidth="1.4" strokeLinecap="round"/>
  <circle cx="44" cy="59" r="2.5" fill="#b98b5a" opacity=".5"/><circle cx="76" cy="59" r="2.5" fill="#b98b5a" opacity=".5"/>
  <g className="wave"><path d="M98 108C112 104 114 88 108 74" fill="none" stroke="#cfc8b8" strokeWidth="14" strokeLinecap="round"/><path d="M98 108C112 104 114 88 108 74" fill="none" stroke="#f6f2ea" strokeWidth="11" strokeLinecap="round"/><circle cx="108" cy="67" r="6.5" fill="#f4f1ea" stroke="#cfc8b8"/><path d="M116 60q4 6 0 12" fill="none" stroke="#7fb08a" strokeLinecap="round"/></g>
 </svg>}
