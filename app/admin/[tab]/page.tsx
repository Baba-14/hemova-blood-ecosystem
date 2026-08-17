import { AdminDashboard } from "@/components/admin-dashboard";
export default async function Page({params}:{params:Promise<{tab:string}>}){const {tab}=await params;return <AdminDashboard initialTab={tab}/>}
