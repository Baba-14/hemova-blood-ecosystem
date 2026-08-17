"use client";

import {
  CalendarDays,
  Check,
  ClipboardCheck,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import { DonorMatchMap } from "./donor-match-map";

export function DonorDonate() {
  return (
    <main className="app-shell">
      <section className="dashboard-main">
        <div className="feature-title">
          <div>
            <p className="dashboard-kicker">Donation journey</p>
            <h1>Donate</h1>
            <p>Plan, prepare, and book your donation in one place.</p>
          </div>
        </div>
        <DonateHub />
      </section>
    </main>
  );
}
const donationFeatures = [
  {
    id: "book",
    icon: CalendarDays,
    title: "Book a donation",
    description: "Choose an available time at a verified donation centre.",
    action: "Choose a time",
  },
  {
    id: "prepare",
    icon: ClipboardCheck,
    title: "Prepare for your visit",
    description: "Complete your pre-donation questionnaire before you travel.",
    action: "Start questionnaire",
  },
  {
    id: "matches",
    icon: ShieldCheck,
    title: "View verified matches",
    description: "Review nearby requests that may be relevant to you.",
    action: "Review matches",
  },
  {
    id: "centres",
    icon: MapPin,
    title: "Find a donation centre",
    description: "Explore approved centres and their opening times near you.",
    action: "View nearby centres",
  },
  {
    id: "campaigns",
    icon: HeartHandshake,
    title: "Join a blood drive",
    description: "Reserve a place at an upcoming community donation campaign.",
    action: "View blood drives",
  },
  {
    id: "history",
    icon: Ticket,
    title: "My donations",
    description: "Review your confirmed donation history and impact.",
    action: "View donation history",
  },
] as const;

export function DonateHub() {
  const [activeFeature, setActiveFeature] =
    useState<(typeof donationFeatures)[number]["id"]>("book");
  const [completed, setCompleted] = useState(false);
  const active = donationFeatures.find(
    (feature) => feature.id === activeFeature,
  )!;
  const ActiveIcon = active.icon;

  return (
    <section className="donate-hub">
      <div className="donate-intro">
        <div>
          <p className="dashboard-kicker">Donation journey</p>
          <h2>Choose your next helpful step.</h2>
          <p>
            Plan a safe visit, find a nearby opportunity, and keep your donation
            record in one place.
          </p>
        </div>
        <button
          className="button"
          type="button"
          onClick={() => setActiveFeature("book")}
        >
          <CalendarDays size={16} /> Book a donation
        </button>
      </div>
      <div className="donate-actions">
        {donationFeatures.map(({ id, icon: Icon, title, description }) => (
          <button
            type="button"
            className={activeFeature === id ? "active" : ""}
            onClick={() => {
              setActiveFeature(id);
              setCompleted(false);
            }}
            aria-pressed={activeFeature === id}
            key={id}
          >
            <Icon size={20} />
            <div>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          </button>
        ))}
      </div>
      <section className="donate-feature-detail">
        <span>
          <ActiveIcon size={24} />
        </span>
        <div>
          <p className="dashboard-kicker">{active.title}</p>
          <h3>{active.action}</h3>
          <p>{active.description}</p>
        </div>
        <button
          className="button"
          type="button"
          onClick={() => setCompleted(true)}
        >
          {completed ? (
            <>
              <Check size={16} /> Ready
            </>
          ) : (
            active.action
          )}
        </button>
        {completed && (
          <p className="donate-feature-confirmation">
            <Check size={15} /> Saved in your donation journey.
          </p>
        )}
      </section>
      <DonorMatchMap />
    </section>
  );
}
