"use client";

import {
  Bell,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Droplets,
  HeartHandshake,
  Home,
  LogOut,
  MapPin,
  Medal,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { HemovaLogo } from "./hemova-logo";
import { DonorAccountFooter } from "./donor-account-footer";
import { DonorMatchMap } from "./donor-match-map";
import { DonorSignoutLink } from "./donor-signout-link";

const nav = [
  [Home, "Overview"],
  [HeartHandshake, "Donate"],
  [Droplets, "Request"],
  [Medal, "Rewards"],
] as const;

const donorRoutes: Record<(typeof nav)[number][1], string> = {
  Overview: "/donor",
  Donate: "/donor/donate",
  Request: "/donor/request",
  Rewards: "/donor/rewards",
};

function AppNavigation({
  mobile = false,
  close,
}: {
  mobile?: boolean;
  close?: () => void;
}) {
  return (
    <nav
      className={mobile ? "app-mobile-nav" : "app-sidebar"}
      aria-label="Dashboard navigation"
    >
      {!mobile && <HemovaLogo />}
      <div className="app-nav-items">
        {nav.map(([Icon, label], index) => (
          <a
            onClick={close}
            className={index === 0 ? "active" : ""}
            href={donorRoutes[label]}
            key={label}
          >
            <Icon size={19} />
            <span>{label}</span>
          </a>
        ))}
      </div>
      {!mobile && <DonorAccountFooter />}
    </nav>
  );
}

function RequestListItem({
  blood,
  facility,
  place,
  urgent,
}: {
  blood: string;
  facility: string;
  place: string;
  urgent?: boolean;
}) {
  return (
    <article className="dash-request">
      <span className={`dash-blood ${urgent ? "urgent-blood" : ""}`}>
        {blood}
      </span>
      <div>
        <div className="dash-request-title">
          <strong>
            {urgent ? "Urgent " : ""}
            {blood} blood request
          </strong>
          {urgent && <span>Urgent</span>}
        </div>
        <p>
          {facility} <i>·</i> {place}
        </p>
      </div>
      <a href="/donor/matches" aria-label={`View ${blood} request`}>
        <ChevronRight size={19} />
      </a>
    </article>
  );
}

export function DonorDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app-shell donor-dashboard">
      <AppNavigation />
      <header className="app-header">
        <button
          className="app-menu"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation"
        >
          <Menu />
        </button>
        <div className="mobile-app-logo">
          <HemovaLogo />
        </div>
        <div className="app-context">
          <strong>Donor dashboard</strong>
          <span>Your donation overview</span>
        </div>
        <div className="app-search">
          <Search size={18} />
          <input
            aria-label="Search Hemova"
            placeholder="Search campaigns, requests or centres"
          />
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
          <a
            className="profile-button"
            href="/donor/profile"
            aria-label="Open profile"
          >
            <b>YA</b>
          </a>
        </div>
      </header>
      {menuOpen && (
        <div className="app-drawer">
          <div className="drawer-head">
            <HemovaLogo />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            >
              <X />
            </button>
          </div>
          <AppNavigation mobile close={() => setMenuOpen(false)} />
        </div>
      )}
      <main className="dashboard-main" id="overview">
        <div className="dashboard-title">
          <div>
            <p className="dashboard-kicker">Thursday, 12 September</p>
            <h1>Good afternoon, Yusif.</h1>
            <p>Here’s your donation overview and the next helpful action.</p>
          </div>
          <a className="button" href="/donor/centres">
            <MapPin size={17} /> Find a centre
          </a>
        </div>
        <div
          className="dashboard-switch"
          role="tablist"
          aria-label="Dashboard view"
        >
          <button role="tab" aria-selected="true">
            My donation view
          </button>
          <button role="tab" aria-selected="false">
            Saved opportunities
          </button>
        </div>
        <section className="dashboard-metrics">
          <article className="dashboard-metric metric-status">
            <div>
              <span className="metric-icon">
                <HeartHandshake size={21} />
              </span>
              <strong>Donation status</strong>
            </div>
            <b>Ready to plan</b>
            <p>Final screening happens at your donation centre.</p>
          </article>
          <article className="dashboard-metric metric-requests">
            <div>
              <span className="metric-icon">
                <Droplets size={21} />
              </span>
              <strong>Nearby requests</strong>
            </div>
            <b>03</b>
            <p>Verified opportunities around Greater Accra.</p>
          </article>
          <article className="dashboard-metric metric-points">
            <div>
              <span className="metric-icon">
                <ShieldCheck size={21} />
              </span>
              <strong>Hemova Points</strong>
            </div>
            <b>240</b>
            <p>Recognition for your donation journey.</p>
          </article>
        </section>
        <section className="dashboard-grid-top">
          <article className="eligibility-card">
            <div className="eligibility-card-head">
              <span>
                <HeartHandshake size={19} /> Donation status
              </span>
              <span className="status-available">Up to date</span>
            </div>
            <div className="eligibility-copy">
              <div className="status-mark">
                <Droplets size={29} />
              </div>
              <div>
                <h2>You may be eligible to donate.</h2>
                <p>
                  Based on your recorded history. Your donation centre will
                  complete the final screening.
                </p>
              </div>
            </div>
            <div className="eligibility-footer">
              <div>
                <span>Last donation</span>
                <strong>24 March 2026</strong>
              </div>
              <div>
                <span>Next planned visit</span>
                <strong>24 September 2026</strong>
              </div>
              <a href="/donor/donate">
                See donation details <ChevronRight size={16} />
              </a>
            </div>
          </article>
          <article className="impact-summary">
            <p className="dashboard-kicker">Your impact</p>
            <strong>03</strong>
            <span>donations completed</span>
            <div className="impact-line">
              <span />
              <span />
              <span />
              <i />
            </div>
            <p className="impact-note">
              Thank you for showing up for your community.
            </p>
            <a href="/donor/history">
              View history <ChevronRight size={15} />
            </a>
          </article>
        </section>
        <section className="dashboard-columns">
          <div>
            <div className="module-head">
              <div>
                <h2>Requests near you</h2>
                <p>
                  Verified opportunities based on your profile and preferences.
                </p>
              </div>
              <a href="/donor/matches">See all</a>
            </div>
            <div className="request-list">
              <RequestListItem
                blood="O−"
                facility="Korle Bu Teaching Hospital"
                place="4.8 km away"
                urgent
              />
              <RequestListItem
                blood="O+"
                facility="Ridge Hospital"
                place="6.1 km away"
              />
              <RequestListItem
                blood="A+"
                facility="37 Military Hospital"
                place="8.4 km away"
              />
            </div>
          </div>
          <aside className="upcoming-module" id="appointments">
            <div className="module-head">
              <div>
                <h2>Coming up</h2>
                <p>Your next appointment</p>
              </div>
              <button aria-label="More appointment options">•••</button>
            </div>
            <div className="appointment-date">
              <span>SEP</span>
              <strong>24</strong>
              <small>Tuesday</small>
            </div>
            <h3>Donation appointment</h3>
            <p className="appointment-location">
              <MapPin size={16} /> National Blood Service, Korle Bu
            </p>
            <p className="appointment-time">
              <Clock3 size={16} /> 10:00 AM – 10:30 AM
            </p>
            <a className="button button-secondary" href="/donor/appointments">
              View appointment
            </a>
          </aside>
        </section>
        <DonorMatchMap />
        <section className="dashboard-bottom">
          <article className="campaign-module" id="campaigns">
            <div className="campaign-tile-image" />
            <div>
              <p className="dashboard-kicker">Nearby campaign</p>
              <h2>Accra Community Blood Drive</h2>
              <p>Saturday, 28 September · Osu, Accra</p>
              <a href="/donor/campaigns">
                Reserve a spot <ChevronRight size={16} />
              </a>
            </div>
            <span className="spots-left">12 spots left</span>
          </article>
          <article className="notification-module">
            <div className="module-head">
              <div>
                <h2>Notifications</h2>
              </div>
              <a href="/donor/notifications">View all</a>
            </div>
            <div>
              <span className="notif-icon">
                <ShieldCheck size={17} />
              </span>
              <p>
                <strong>Your profile is protected.</strong>
                <br />
                You control which notifications Hemova sends.
              </p>
            </div>
          </article>
        </section>
      </main>
      <div className="bottom-tabs">
        {nav.slice(0, 5).map(([Icon, label], i) => (
          <a
            className={i === 0 ? "active" : ""}
            href={donorRoutes[label]}
            key={label}
          >
            <Icon size={19} />
            <span>{label.split(" ")[0]}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
