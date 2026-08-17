"use client";

import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Download,
  HeartHandshake,
  Home,
  LogOut,
  MapPin,
  Medal,
  Settings,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { HemovaLogo } from "./hemova-logo";
import { DonorAccountFooter } from "./donor-account-footer";
import { DonorSignoutLink } from "./donor-signout-link";

type Tab = "pre-donation" | "matches" | "centres" | "certificates";
export function DonorOperationalTab({ tab }: { tab: Tab }) {
  const [done, setDone] = useState(false);
  const links = [
    ["/donor", "Overview", Home],
    ["/donor/history", "My donations", Ticket],
    ["/donor/pre-donation", "Pre-donation", ClipboardCheck],
    ["/donor/matches", "Matches", ShieldCheck],
    ["/donor/centres", "Donation centres", MapPin],
    ["/donor/campaigns", "Blood drives", HeartHandshake],
    ["/donor/appointments", "Appointments", CalendarDays],
    ["/donor/rewards", "Rewards", Medal],
    ["/donor/notifications", "Notifications", Bell],
    ["/donor/profile", "Profile", UserRound],
  ] as const;
  const active =
    tab === "pre-donation"
      ? "Pre-donation"
      : tab === "matches"
        ? "Matches"
        : tab === "centres"
          ? "Donation centres"
          : "Certificates";
  const heading =
    tab === "pre-donation"
      ? "Prepare for your donation"
      : tab === "matches"
        ? "Your verified matches"
        : tab === "centres"
          ? "Donation centres near you"
          : "Your certificates";
  return (
    <main className="app-shell donor-unified">
      <aside className="app-sidebar">
        <HemovaLogo />
        <div className="app-nav-items donor-full-nav">
          {links.map(([href, label, Icon]) => (
            <a
              href={href}
              className={label === active ? "active" : ""}
              key={label}
            >
              <Icon size={19} />
              <span>{label}</span>
            </a>
          ))}
        </div>
        <DonorAccountFooter />
      </aside>
      <header className="app-header">
        <div className="app-context">
          <strong>{heading}</strong>
          <span>Hemova donor workspace</span>
        </div>
        <div className="app-search">
          <MapPin size={17} />
          <input placeholder="Search campaigns, requests or centres" />
        </div>
        <div className="app-header-actions">
          <DonorSignoutLink />
          <a
            className="icon-button"
            href="/donor/notifications"
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span />
          </a>
          <a className="profile-button" href="/donor/profile">
            <b>YA</b>
          </a>
        </div>
      </header>
      <section className="dashboard-main donor-feature-main">
        <div className="operational-card">
          <p className="dashboard-kicker">Donor workspace</p>
          <h1>{heading}</h1>
          {tab === "pre-donation" ? (
            <>
              <p>
                This questionnaire helps prepare your visit. Final eligibility
                is determined by trained healthcare professionals at the
                donation centre.
              </p>
              <div className="question-list">
                {[
                  "Have you donated blood recently?",
                  "Have you felt unwell in the last 7 days?",
                  "Are you taking any medications you would like to mention?",
                  "Have you travelled recently?",
                ].map((question, i) => (
                  <label key={question}>
                    <span>{i + 1}</span>
                    {question}
                    <select defaultValue="">
                      <option value="" disabled>
                        Select an answer
                      </option>
                      <option>Yes</option>
                      <option>No</option>
                      <option>Prefer to discuss at the centre</option>
                    </select>
                  </label>
                ))}
              </div>
              <button className="button" onClick={() => setDone(true)}>
                {done ? (
                  <>
                    <Check size={17} /> Saved
                  </>
                ) : (
                  "Save questionnaire"
                )}
              </button>
            </>
          ) : tab === "matches" ? (
            <div className="centre-list">
              <article>
                <span>
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <h2>Urgent O− request</h2>
                  <p>Korle Bu Teaching Hospital · 4.8 km away</p>
                  <small>
                    2 units requested · Needed today · Verified facility
                  </small>
                </div>
                <button className="button" onClick={() => setDone(true)}>
                  I can donate <ChevronRight size={15} />
                </button>
              </article>
              <article>
                <span>
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <h2>O+ request</h2>
                  <p>Ridge Hospital · 6.1 km away</p>
                  <small>
                    3 units requested · Needed tomorrow · Verified facility
                  </small>
                </div>
                <button
                  className="button button-secondary"
                  onClick={() => setDone(true)}
                >
                  Not available
                </button>
              </article>
            </div>
          ) : tab === "centres" ? (
            <div className="centre-list">
              {[
                [
                  "National Blood Service",
                  "Korle Bu, Accra",
                  "Open today · 8:00 AM – 4:00 PM",
                  "2.1 km away",
                ],
                [
                  "37 Military Blood Centre",
                  "37 Military Hospital, Accra",
                  "Open tomorrow · 8:00 AM – 3:00 PM",
                  "5.4 km away",
                ],
                [
                  "Ridge Hospital Donation Centre",
                  "Ridge, Accra",
                  "Open today · 9:00 AM – 5:00 PM",
                  "6.1 km away",
                ],
              ].map(([name, address, hours, distance]) => (
                <article key={name}>
                  <span>
                    <MapPin size={19} />
                  </span>
                  <div>
                    <h2>{name}</h2>
                    <p>
                      {address} · {distance}
                    </p>
                    <small>{hours}</small>
                  </div>
                  <button
                    className="button button-secondary"
                    onClick={() => setDone(true)}
                  >
                    Book donation <ChevronRight size={15} />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="certificate-list">
              {[
                [
                  "HMO-2026-0317",
                  "24 March 2026",
                  "National Blood Service, Korle Bu",
                ],
                ["HMO-2025-0904", "09 December 2025", "Ridge Hospital"],
              ].map(([id, date, facility]) => (
                <article key={id}>
                  <span>
                    <ShieldCheck size={20} />
                  </span>
                  <div>
                    <h2>Donation certificate</h2>
                    <p>
                      {date} · {facility}
                    </p>
                    <small>Verification ID: {id}</small>
                  </div>
                  <button className="button button-secondary">
                    <Download size={15} /> Download
                  </button>
                </article>
              ))}
            </div>
          )}
          {done && (
            <div className="feature-success">
              <Check size={18} /> Your selection has been saved.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
