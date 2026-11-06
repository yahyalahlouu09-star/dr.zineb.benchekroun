export type Lang='fr'|'ar'|'en'; export type L3={fr:string;ar:string;en:string};
const TBD='[À FOURNIR / TO PROVIDE]';
export const C={name:'Centre Benchekroun',sub:'Radiologie Diagnostique Interventionnelle',doctor:'Dr Zineb Benchekroun',city:'Fès, Maroc',
 address:TBD,phone:TBD,whatsapp:'' /* digits only e.g. 2126XXXXXXXX */,hours:TBD,mapsQuery:'' /* address for Google Maps */,emergency:'141' /* verify */};
export const IMG={hero:'/images/reception.webp',mri:'/images/mri.webp',mammo:'/images/mammo.webp',exterior:'/images/exterior.webp',logo:'/images/logo.webp',doctor:'/images/doctor.webp'};
// Edit freely: add/remove exams. confirmed=false shows a "to confirm" badge.
export const SERVICES:{id:string;name:L3;img?:string;confirmed:boolean}[]=[
 {id:'mri',name:{fr:'IRM',ar:'التصوير بالرنين المغناطيسي',en:'MRI'},img:IMG.mri,confirmed:true},
 {id:'mammo',name:{fr:'Mammographie',ar:'تصوير الثدي بالأشعة',en:'Mammography'},img:IMG.mammo,confirmed:true},
 {id:'tbd',name:{fr:'[Examen à définir]',ar:'لم يُحدّد الفحص بعد',en:'[Exam to define]'},confirmed:false}];
// Real photos only. exterior is flagged: the supplied file is labelled AI-generated.
export const SPACES:{id:string;img:string;t:L3;d:L3;ai?:boolean}[]=[
 {id:'exterior',img:IMG.exterior,ai:true,t:{fr:'Le bâtiment',ar:'مبنى المركز',en:'The building'},d:{fr:'Façade du centre (image à remplacer par une vraie photo).',ar:'واجهة المركز — ستُستبدل بصورة حقيقية.',en:'Center façade (replace with a real photo).'}},
 {id:'reception',img:IMG.hero,t:{fr:'Accueil',ar:'الاستقبال',en:'Reception'},d:{fr:'Espace d’accueil et salle d’attente.',ar:'فضاء الاستقبال وقاعة الانتظار.',en:'Reception and waiting area.'}},
 {id:'mri',img:IMG.mri,t:{fr:'Salle IRM',ar:'قاعة التصوير بالرنين المغناطيسي',en:'MRI room'},d:{fr:'Salle équipée d’un IRM GE SIGNA Prime.',ar:'قاعة مجهّزة بجهاز GE SIGNA Prime للتصوير بالرنين المغناطيسي.',en:'Room with a GE SIGNA Prime MRI.'}},
 {id:'mammo',img:IMG.mammo,t:{fr:'Salle de mammographie',ar:'قاعة تصوير الثدي',en:'Mammography room'},d:{fr:'Mammographe GE.',ar:'جهاز GE للتصوير الشعاعي للثدي.',en:'GE mammography unit.'}}];
