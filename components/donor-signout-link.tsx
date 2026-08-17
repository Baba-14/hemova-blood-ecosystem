import { LogOut } from "lucide-react";

export function DonorSignoutLink({ footer = false }: { footer?: boolean }) {
  return <a className={`donor-sign-out${footer ? " donor-sign-out-footer" : " text-link"}`} href="/"><LogOut size={footer ? 19 : 17} /> <span>Signout</span></a>;
}
