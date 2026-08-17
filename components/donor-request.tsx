"use client";

import { Check, ChevronRight, Clock3, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { DonorMatchMap } from "./donor-match-map";

export function DonorRequest() {
  return (
    <main className="app-shell">
      <section className="dashboard-main">
        <RequestHub />
      </section>
    </main>
  );
}
export function RequestHub() {
  const [sent, setSent] = useState(false);
  return (
    <section className="request-hub">
      <div>
        <p className="dashboard-kicker">Request blood</p>
        <h2>Get connected with a verified healthcare facility.</h2>
        <p>
          Hemova helps coordinate requests. Do not include patient-identifiable
          medical details here.
        </p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <label>
          Your name
          <input required defaultValue="Yusif Abdul-Rahman" />
        </label>
        <label>
          Relationship to patient
          <select defaultValue="">
            <option value="">For myself</option>
            <option>Family member</option>
            <option>Friend</option>
            <option>Caregiver</option>
          </select>
        </label>
        <label>
          Facility or donation centre
          <select required defaultValue="">
            <option value="" disabled>
              Select a verified facility
            </option>
            <option>Korle Bu Teaching Hospital</option>
            <option>Ridge Hospital</option>
            <option>National Blood Service</option>
          </select>
        </label>
        <label>
          Blood group needed
          <select required defaultValue="">
            <option value="" disabled>
              Select blood group
            </option>
            <option>O−</option>
            <option>O+</option>
            <option>A+</option>
            <option>B+</option>
            <option>AB+</option>
            <option>Unknown / not sure</option>
          </select>
        </label>
        <label>
          Units required
          <input type="number" min="1" placeholder="If known" />
        </label>
        <label>
          How soon is support needed?
          <select required defaultValue="">
            <option value="" disabled>
              Select timeframe
            </option>
            <option>Today</option>
            <option>Within 24 hours</option>
            <option>This week</option>
          </select>
        </label>
        <label>
          Contact phone
          <input type="tel" required placeholder="+233 24 000 0000" />
        </label>
        <label className="request-notes">
          Coordination notes (optional)
          <textarea placeholder="Share only information needed to coordinate safely. Do not include patient names or diagnoses." />
        </label>
        <button className="button" type="submit">
          Send coordination request <ChevronRight size={16} />
        </button>
      </form>
      {sent && (
        <div className="feature-success">
          <Check size={18} />
          <span>
            <strong>Request sent.</strong> A verified facility team will review
            the coordination details.
          </span>
        </div>
      )}
      <section className="request-tracking">
        <div><p className="dashboard-kicker">My blood requests</p><h3>Recent requests</h3></div>
        <article><span>REQ-2026-0842</span><div><strong>Korle Bu Teaching Hospital</strong><p>O− · 2 units · Needed today</p></div><b>Active</b></article>
        {sent && <article><span>REQ-2026-0843</span><div><strong>New coordination request</strong><p><Clock3 size={13}/> Submitted just now · Pending verification</p></div><b className="pending">Pending</b></article>}
      </section>
      <DonorMatchMap compact />
      <div className="request-safety">
        <ShieldCheck size={18} />
        <span>
          For emergencies, contact your healthcare facility or local emergency
          services directly. Hemova does not replace urgent medical care.
        </span>
      </div>
    </section>
  );
}
