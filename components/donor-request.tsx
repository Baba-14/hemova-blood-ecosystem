"use client";

import { Check, ChevronRight, Clock3, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function DonorRequest() { return <RequestHub />; }

export function RequestHub() {
  const [sent, setSent] = useState(false);
  return <section className="request-workspace"><div className="request-layout">
    <form className="request-form-card" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      <div className="workspace-card-heading"><div><p className="dashboard-kicker">Request blood</p><h2>Submit a blood request</h2></div><span className="form-step">1 of 1</span></div>
      <h3>Requester details</h3><div className="form-grid three"><label>Full name<input defaultValue="Yusif Abubakar" required /></label><label>Phone number<input defaultValue="+233 24 123 4567" required /></label><label>Relationship to patient<select defaultValue="Self"><option>Self</option><option>Family member</option><option>Friend</option><option>Caregiver</option></select></label></div>
      <h3>Hospital / Facility</h3><label>Search and select hospital<select defaultValue="Korle Bu Teaching Hospital"><option>Korle Bu Teaching Hospital</option><option>Ridge Hospital</option><option>37 Military Hospital</option><option>National Blood Service</option></select></label>
      <h3>Blood requirement</h3><div className="form-grid three"><label>Blood group<select defaultValue="O-"><option>O-</option><option>O+</option><option>A-</option><option>A+</option><option>B-</option><option>B+</option><option>AB+</option><option>Unknown</option></select></label><label>Units required<select defaultValue="2 units"><option>1 unit</option><option>2 units</option><option>3 units</option><option>4 units</option></select></label><label>Urgency<select defaultValue="Urgent"><option>Urgent</option><option>Within 24 hours</option><option>This week</option></select></label></div>
      <div className="form-grid two"><label>Needed by<input type="date" defaultValue="2026-08-22" /></label><label>Preferred time<input type="time" defaultValue="10:00" /></label></div>
      <label>Additional information <span className="optional">(optional)</span><textarea placeholder="Add information that may help (e.g. patient condition, notes for hospital)..." /></label>
      <button className="button request-submit" type="submit">{sent ? <><Check size={15} /> Request submitted</> : <>Review request <ChevronRight size={15} /></>}</button>{sent && <p className="inline-confirmation"><Check size={14} /> Request sent for verification. You can track its status on the right.</p>}
    </form>
    <aside className="request-side-column"><div className="important-card"><h3><ShieldCheck size={15} /> Important</h3><ul><li>Your request will be reviewed before it goes live.</li><li>Do not share patient personal data.</li><li>The hospital will contact you for more details.</li><li>Hemova protects your information.</li></ul></div>
      <div className="recent-requests-card"><div className="workspace-card-heading"><h2>Recent requests</h2><button className="text-link">View all</button></div>{[["REQ-2024-0021","Korle Bu Teaching Hospital","Active","10 Aug 2026"],["REQ-2024-0014","Ridge Hospital","Fulfilled","21 Apr 2026"],["REQ-2024-0007","37 Military Hospital","Closed","05 Apr 2026"]].map(([id,hospital,status,date]) => <article key={id}><div><strong>{id}</strong><p>{hospital}</p></div><div><b className={`request-status ${status.toLowerCase()}`}>{status}</b><small>{date}</small></div></article>)}{sent && <article className="new-request"><div><strong>REQ-2026-0043</strong><p>Korle Bu Teaching Hospital</p></div><div><b className="request-status pending">Pending</b><small><Clock3 size={11} /> Just now</small></div></article>}</div>
    </aside></div><div className="request-safety"><ShieldCheck size={17} /><span>For emergencies, contact your healthcare facility or local emergency services directly. Hemova does not replace urgent medical care.</span></div>
  </section>;
}
