import { InstitutionDashboard } from "@/components/institution-dashboard";
export default async function Page({params}:{params:Promise<{tab:string}>}){const {tab}=await params; return <InstitutionDashboard role="requester" initialTab={tab}/>}
