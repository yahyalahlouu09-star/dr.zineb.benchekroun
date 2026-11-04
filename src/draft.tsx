import {createContext,useContext,useState,ReactNode} from 'react';
// In-memory only: patient data is never written to localStorage.
export type Draft={exam:string;caseText:string};
const Ctx=createContext<{draft:Draft;setDraft:(d:Draft)=>void}>({draft:{exam:'',caseText:''},setDraft:()=>{}});
export const DraftProvider=({children}:{children:ReactNode})=>{const [draft,setDraft]=useState<Draft>({exam:'',caseText:''});return <Ctx.Provider value={{draft,setDraft}}>{children}</Ctx.Provider>};
export const useDraft=()=>useContext(Ctx);
