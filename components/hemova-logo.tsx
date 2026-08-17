import { HeartPulse } from "lucide-react";

export function HemovaLogo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`logo ${light ? "logo-light" : ""}`} aria-label="Hemova home">
      <span className="logo-mark"><HeartPulse size={18} strokeWidth={2.4} /></span>
      <span>hemova</span>
    </a>
  );
}
