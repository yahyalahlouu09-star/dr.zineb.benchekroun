// Backend contract. With VITE_API_URL unset, everything runs in DEMO mode (nothing is sent).
const API=import.meta.env.VITE_API_URL as string|undefined;
export type Appointment={name:string;phone:string;email:string;contactLang:string;exam:string;caseText:string;hasPrescription:boolean;hadBefore:boolean;date:string;time:string;comments:string;consent:boolean};
export async function submitAppointment(a:Appointment,file?:File|null):Promise<{demo:boolean;ref?:string}>{
 if(!API){await new Promise(r=>setTimeout(r,900));return {demo:true}}
 const fd=new FormData();fd.append('data',JSON.stringify(a));if(file)fd.append('file',file);
 const r=await fetch(`${API}/appointments.php`,{method:'POST',body:fd});
 if(!r.ok)throw new Error('request failed');const j=await r.json();return {demo:false,ref:j.ref}}
// POST ${API}/assistant {lang,messages} -> {reply}. Needs consent + server-side key. Not wired: assistant runs predefined demo flow.
