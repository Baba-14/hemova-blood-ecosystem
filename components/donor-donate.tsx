"use client";

import { CalendarDays, Check, List, MapPin, Navigation, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";

const centres = [
  ["Korle Bu Teaching Hospital", "4.2 km away", "Closes 6:00 PM"],
  ["Ridge Hospital", "5.6 km away", "Closes 7:00 PM"],
  ["37 Military Hospital", "7.3 km away", "Closes 5:00 PM"],
] as const;

export function DonorDonate() { return <DonateHub />; }

export function DonateHub() {
  const [booked, setBooked] = useState<string | null>(null);
  return <section className="donate-workspace">
    <div className="donate-tabs" role="tablist" aria-label="Donation options">
      <button className="active" role="tab" aria-selected="true"><MapPin size={15} /> Donation centres</button>
      <button role="tab" aria-selected="false"><Search size={15} /> Blood requests</button>
      <button role="tab" aria-selected="false"><CalendarDays size={15} /> Blood drives</button>
    </div>
    <div className="donate-toolbar">
      <label className="toolbar-search"><Search size={15} /><input defaultValue="Accra, Ghana" aria-label="Search location" /></label>
      <button className="toolbar-select">Within 20 km <span>⌄</span></button><button className="toolbar-filter">Filters</button>
      <button className="toolbar-view"><List size={14} /> List view</button><button className="toolbar-view active"><MapPin size={14} /> Map view</button>
    </div>
    <div className="donate-layout">
      <div className="centre-list-card">
        <div className="workspace-card-heading"><div><p className="dashboard-kicker">Verified nearby</p><h2>Donation centres</h2></div><button className="text-link">View all</button></div>
        {centres.map(([name, distance, closing], index) => <article className="centre-result" key={name}>
          <span className={`centre-thumb centre-thumb-${index}`} aria-hidden="true" />
          <div className="centre-result-copy"><div className="verified-line"><strong>{name}</strong><small><ShieldCheck size={11} /> Verified</small></div><p>{distance} <i>·</i> Accra</p><b className={index === 2 ? "closing" : "open"}>Open now <i>·</i> {closing}</b></div>
          <div className="centre-result-actions"><button className="button" onClick={() => setBooked(name)}>{booked === name ? <><Check size={14} /> Booked</> : <><CalendarDays size={14} /> Book appointment</>}</button><button className="button button-secondary">View details</button></div>
        </article>)}
        <button className="view-more-link">View more centres <span>⌄</span></button>
      </div>
      <div className="donate-map-panel">
        <div className="map-placeholder" aria-label="Map showing donation centres near Accra"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-water" /><span className="map-city">Accra</span><span className="map-pin user-pin"><Navigation size={14} /></span><span className="map-pin centre-pin pin-one"><MapPin size={16} /></span><span className="map-pin centre-pin pin-two"><MapPin size={16} /></span><span className="map-pin centre-pin pin-three"><MapPin size={16} /></span><div className="map-zoom"><button>+</button><button>−</button></div></div>
        <div className="book-donation-card"><div><p className="dashboard-kicker">Next step</p><h2>Book your donation</h2><p>Select a centre and choose a date and time that works for you.</p></div><button className="button button-secondary">How it works</button></div>
      </div>
    </div>
    <div className="donate-safety"><ShieldCheck size={16} /><span>Centre locations are verified. Final eligibility is determined by the healthcare team at your appointment.</span></div>
  </section>;
}
