"use client";

import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Download,
  Droplets,
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
import { DonateHub } from "./donor-donate";
import { RequestHub } from "./donor-request";
import { ScrollReveal } from "./scroll-reveal";

type Feature =
  | "donate"
  | "request"
  | "campaigns"
  | "appointments"
  | "rewards"
  | "notifications"
  | "profile"
  | "settings"
  | "history";
const titles: Record<Feature, [string, string]> = {
  donate: ["Donate", "Plan, prepare, and book your donation in one place."],
  request: ["Request blood", "Connect with a verified healthcare facility."],
  campaigns: ["Campaigns", "Find a welcoming blood drive near you."],
  appointments: [
    "Appointments",
    "Plan your next visit with a verified donation centre.",
  ],
  rewards: [
    "Hemova Points & rewards",
    "Recognition for showing up for your community.",
  ],
  notifications: [
    "Notifications",
    "Updates that help you plan and respond with confidence.",
  ],
  profile: ["Your profile", "Keep your donor details accurate and up to date."],
  settings: [
    "Settings",
    "Control notifications, support, and feature preferences.",
  ],
  history: [
    "Donation history",
    "A private record of your confirmed donations.",
  ],
};
const nav = [
  ["/donor", "Overview", Home],
  ["/donor/donate", "Donate", HeartHandshake],
  ["/donor/request", "Request", Droplets],
  ["/donor/rewards", "Rewards", Medal],
] as const;

export function DonorFeaturePage({ page }: { page: Feature }) {
  const [success, setSuccess] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
  const [title, subtitle] = titles[page];
  const current =
    page === "donate"
      ? "Donate"
      : page === "request"
        ? "Request"
        : page === "history"
          ? "My donations"
          : page === "campaigns"
            ? "Blood drives"
            : page === "appointments"
              ? "Appointments"
              : page === "rewards"
                ? "Rewards"
                : page === "notifications"
                  ? "Notifications"
                  : page === "settings"
                    ? "Settings"
                    : "Profile";

  return (
    <main className="app-shell donor-unified">
      <aside className="app-sidebar">
        <HemovaLogo />
        <div className="app-nav-items donor-full-nav">
          {nav.map(([href, label, Icon]) => (
            <a
              href={href}
              key={label}
              className={label === current ? "active" : ""}
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
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </div>
        <div className="app-search">
          <MapPin size={17} />
          <input
            aria-label="Search donor workspace"
            placeholder="Search for hospitals, campaigns, blood drives..."
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
          <a className="profile-button" href="/donor/profile">
            <b>YA</b>
          </a>
        </div>
      </header>
      <section className={`dashboard-main donor-feature-main feature-page-${page}`}>
        <div className="feature-title">
          <div>
            <p className="dashboard-kicker">Hemova donor</p>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {page === "campaigns" && (
            <a className="button" href="#nearby">
              <MapPin size={16} /> Use my location
            </a>
          )}
          {page === "history" && (
            <button className="button button-secondary">
              <Download size={16} /> Export history
            </button>
          )}
        </div>
        {success && (
          <div className="feature-success">
            <Check size={18} />
            <span>
              <strong>You’re registered!</strong> Your appointment has been
              reserved. We’ll remind you before your visit.
            </span>
          </div>
        )}
        <ScrollReveal className="feature-content-reveal">
        {page === "donate" && <DonateHub />}
        {page === "request" && <RequestHub />}
        {page === "campaigns" && (
          <Campaigns onJoin={() => setSuccess(true)} />
        )}{" "}
        {page === "appointments" && (
          <Appointments
            selected={selectedSlot}
            select={setSelectedSlot}
            onBook={() => setSuccess(true)}
          />
        )}{" "}
        {page === "rewards" && <Rewards />}
        {page === "notifications" && <Notifications />}
        {page === "profile" && <Profile />}
        {page === "settings" && <SettingsPanel />}
        {page === "history" && <History />}
        </ScrollReveal>
      </section>
      <nav className="bottom-tabs">
        {nav.map(([href, label, Icon]) => (
          <a
            className={label === current ? "active" : ""}
            href={href}
            key={label}
          >
            <Icon size={18} />
            <span>{label.split(" ")[0]}</span>
          </a>
        ))}
      </nav>
    </main>
  );
}

function Campaigns({ onJoin }: { onJoin: () => void }) {
  return (
    <>
      <div className="feature-filter">
        <button className="active">Nearby</button>
        <button>This month</button>
        <button>Greater Accra</button>
      </div>
      <section className="campaign-grid" id="nearby">
        {[
          [
            "Accra Community Blood Drive",
            "Accra Rotary Club",
            "Saturday, 28 September",
            "Osu, Accra",
            "12 spots left",
          ],
          [
            "University of Ghana Donation Week",
            "UG SRC",
            "Wednesday, 2 October",
            "Legon, Accra",
            "24 spots left",
          ],
          [
            "Community Donation Day",
            "National Blood Service",
            "Saturday, 12 October",
            "Korle Bu, Accra",
            "8 spots left",
          ],
        ].map(([name, org, date, place, spots], i) => (
          <article className="donor-campaign" key={name}>
            <div className={`campaign-image image-${i}`} />
            <div className="campaign-card-copy">
              <span>
                <BadgeCheckIcon /> Verified organizer
              </span>
              <h2>{name}</h2>
              <p>{org}</p>
              <div>
                <small>
                  <CalendarDays size={14} />
                  {date}
                </small>
                <small>
                  <MapPin size={14} />
                  {place}
                </small>
              </div>
              <footer>
                <b>{spots}</b>
                <button className="button button-secondary" onClick={onJoin}>
                  Join campaign <ChevronRight size={15} />
                </button>
              </footer>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
function Appointments({
  selected,
  select,
  onBook,
}: {
  selected: string;
  select: (v: string) => void;
  onBook: () => void;
}) {
  return (
    <section className="appointment-flow">
      <article className="appointment-current">
        <p className="dashboard-kicker">Upcoming appointment</p>
        <h2>Donation appointment</h2>
        <p>
          <CalendarDays size={15} /> Tuesday, 24 September · 10:00 AM
        </p>
        <p>
          <MapPin size={15} /> National Blood Service, Korle Bu
        </p>
        <div>
          <button className="button button-secondary">Reschedule</button>
          <button className="text-quiet">Cancel appointment</button>
        </div>
      </article>
      <article className="appointment-book">
        <p className="dashboard-kicker">Book a visit</p>
        <h2>Choose a time that works for you.</h2>
        <p>National Blood Service · Korle Bu</p>
        <div className="slot-grid">
          {[
            "9:00 AM",
            "10:00 AM",
            "11:30 AM",
            "1:00 PM",
            "2:30 PM",
            "3:30 PM",
          ].map((slot) => (
            <button
              key={slot}
              className={selected === slot ? "selected" : ""}
              onClick={() => select(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
        <button className="button" onClick={onBook}>
          Reserve {selected} <ChevronRight size={16} />
        </button>
        <small>
          Final donation eligibility is determined at your appointment.
        </small>
      </article>
    </section>
  );
}
function Rewards() {
  const [view, setView] = useState<"rewards" | "certificates">("rewards");
  const [redeemed, setRedeemed] = useState<string | null>(null);
  return <>
    <section className="rewards-summary"><div className="points-balance"><p className="dashboard-kicker">Hemova Points Balance</p><strong>1,450</strong><span>Keep donating, keep saving lives.</span><button className="points-history">View points history</button></div><div className="points-stat-grid"><div><span>Lifetime points earned</span><strong>2,350</strong></div><div><span>Points redeemed</span><strong>900</strong></div><div><span>Available points</span><strong>1,450 <Medal size={18} /></strong></div></div></section>
    <div className="rewards-view-tabs" role="tablist" aria-label="Rewards view"><button className={view === "rewards" ? "active" : ""} onClick={() => setView("rewards")} role="tab" aria-selected={view === "rewards"}><Medal size={14} /> Rewards</button><button className={view === "certificates" ? "active" : ""} onClick={() => setView("certificates")} role="tab" aria-selected={view === "certificates"}><Ticket size={14} /> Certificates</button></div>
    {view === "rewards" ? <div className="rewards-content-grid"><section><div className="workspace-card-heading"><div><p className="dashboard-kicker">Redeem your points</p><h2>Available rewards</h2></div><button className="text-link">View all rewards</button></div><div className="rewards-catalog">{[["Ghana Gas", "GHS 50 Gas Voucher", "500 points"], ["YANGO", "Yango Ride Voucher", "800 points"], ["Uber", "Uber Ride Voucher", "800 points"], ["Melcom", "Melcom Voucher", "1,200 points"], ["Zeepay", "Zeepay Cash Voucher", "1,500 points"]].map(([partner, reward, cost]) => <article key={reward}><div className="reward-brand">{partner}</div><h3>{reward}</h3><b>{cost}</b><small><Clock3 size={11} /> Valid for 60 days</small><button className="button" onClick={() => setRedeemed(reward)}>{redeemed === reward ? <><Check size={13} /> Redeemed</> : "Redeem"}</button></article>)}</div></section><section className="redemptions-card"><div className="workspace-card-heading"><h2>Recent redemptions</h2><button className="text-link">View all</button></div>{[["YANGO","Yango Ride Voucher","800 points","Used","10 May 2026"],["Melcom","Melcom Voucher","1,200 points","Redeemed","02 Apr 2026"],["Uber","Uber Ride Voucher","800 points","Expired","15 Feb 2026"]].map(([brand,name,cost,status,date]) => <article key={name}><div className="mini-brand">{brand}</div><div><strong>{name}</strong><p>{cost}</p></div><div><b className={`redemption-status ${status.toLowerCase()}`}>{status}</b><small>{date}</small></div></article>)}</section></div> : <section className="certificate-list rewards-certificate-list">{[["24 March 2026", "National Blood Service, Korle Bu", "HMO-2026-0317"], ["09 December 2025", "Ridge Hospital", "HMO-2025-0904"]].map(([date, facility, id]) => <article key={id}><span><Ticket size={20}/></span><div><h2>Donation certificate</h2><p>{date} · {facility}</p><small>Verified · Certificate ID: {id}</small></div><button className="button button-secondary">View & download</button></article>)}</section>}
  </>;
}
function Notifications() {
  return (
    <section className="notification-list">
      {[
        [
          "Urgent O− blood request nearby",
          "Korle Bu Teaching Hospital has posted a verified request 4.8 km away.",
          "12 min ago",
          true,
        ],
        [
          "Appointment reminder",
          "Your donation appointment is tomorrow at 10:00 AM.",
          "2 hours ago",
          false,
        ],
        [
          "Campaign registration confirmed",
          "You’re registered for Accra Community Blood Drive.",
          "Yesterday",
          false,
        ],
        [
          "Your privacy settings",
          "You can update your notification preferences whenever you need.",
          "2 days ago",
          false,
        ],
      ].map(([title, copy, time, unread]) => (
        <article className={unread ? "unread" : ""} key={String(title)}>
          <span>
            <Bell size={18} />
          </span>
          <div>
            <h2>{title}</h2>
            <p>{copy}</p>
            <small>{time}</small>
          </div>
          <button>•••</button>
        </article>
      ))}
    </section>
  );
}
function Profile() {
  const [editing, setEditing] = useState(false);
  return (
    <section className="profile-layout profile-details-layout">
      <article>
        <div className="profile-card-heading"><h2>Donor details</h2><button className="button button-secondary" onClick={() => setEditing((current) => !current)}>{editing ? "Cancel" : "Edit details"}</button></div>
        <div className="profile-form">
          <label>
            Full name
            <input defaultValue="Yusif Abdul-Rahman" disabled={!editing} />
          </label>
          <label>
            Phone number
            <input defaultValue="+233 24 000 0000" disabled={!editing} />
          </label>
          <label>
            Date of birth
            <input type="date" defaultValue="1997-06-18" disabled={!editing} />
          </label>
          <label>
            Region
            <input defaultValue="Greater Accra" disabled={!editing} />
          </label>
          <label>
            City
            <input defaultValue="Accra" disabled={!editing} />
          </label>
          <label>
            Emergency contact
            <input defaultValue="Ama Abdul-Rahman · +233 24 111 2222" disabled={!editing} />
          </label>
        </div>
        {editing && <button className="button" onClick={() => setEditing(false)}>Update details</button>}
      </article>
      <aside className="donation-information">
          <h2>Donation information</h2>
          <dl>
            <div>
              <dt>Blood group</dt>
              <dd>O+ (Rh positive)</dd>
            </div>
            <div>
              <dt>Donor status</dt>
              <dd>Eligible to plan</dd>
            </div>
            <div>
              <dt>Last donation</dt>
              <dd>24 March 2026</dd>
            </div>
            <div>
              <dt>Next eligible date</dt>
              <dd>24 June 2026</dd>
            </div>
            <div>
              <dt>Preferred centre</dt>
              <dd>National Blood Service, Korle Bu</dd>
            </div>
          </dl>
      </aside>
    </section>
  );
}

function SettingsPanel() {
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  return (
    <section className="donor-settings settings-panel" id="preferences">
      <p className="dashboard-kicker">Settings</p>
      <h2>Preferences & support</h2>
      <p>Control the updates and donor tools that work best for you.</p>
      <div className="settings-options">
        <label>
          <span>
            <strong>Urgent blood requests</strong>
            <small>Nearby verified requests that may match your profile.</small>
          </span>
          <input type="checkbox" defaultChecked />
        </label>
        <label>
          <span>
            <strong>Appointment reminders</strong>
            <small>
              Preparation and timing reminders for booked donations.
            </small>
          </span>
          <input type="checkbox" defaultChecked />
        </label>
        <label>
          <span>
            <strong>Campaign updates</strong>
            <small>
              New blood drives and community opportunities near you.
            </small>
          </span>
          <input type="checkbox" defaultChecked />
        </label>
        <label>
          <span>
            <strong>Feature recommendations</strong>
            <small>Helpful suggestions based on your donation journey.</small>
          </span>
          <input type="checkbox" />
        </label>
      </div>
      <button className="button" onClick={() => setSettingsSaved(true)}>
        {settingsSaved ? (
          <>
            <Check size={16} /> Preferences saved
          </>
        ) : (
          "Save preferences"
        )}
      </button>
      <hr />
      <h2>Help & support</h2>
      <p>Need help with your account, appointments, or donation journey?</p>
      {supportOpen ? (
        <form
          className="support-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSupportOpen(false);
          }}
        >
          <textarea required placeholder="Tell us how we can help." />
          <button className="button" type="submit">
            Send support request
          </button>
        </form>
      ) : (
        <button
          className="button button-secondary"
          onClick={() => setSupportOpen(true)}
        >
          <CircleHelp size={16} /> Request support
        </button>
      )}
    </section>
  );
}
function History() {
  return (
    <section className="history-list">
      <div className="history-summary">
        <div>
          <strong>3</strong>
          <span>confirmed donations</span>
        </div>
        <div>
          <strong>24 Mar 2026</strong>
          <span>last confirmed donation</span>
        </div>
        <div>
          <strong>O+</strong>
          <span>recorded blood group</span>
        </div>
      </div>
      {[
        [
          "24 March 2026",
          "National Blood Service, Korle Bu",
          "Community Donation Day",
          "Confirmed",
        ],
        ["09 December 2025", "Ridge Hospital", "—", "Confirmed"],
        [
          "18 August 2025",
          "National Blood Service, Korle Bu",
          "—",
          "Confirmed",
        ],
      ].map(([date, facility, campaign, status]) => (
        <article key={date}>
          <span>
            <Check size={16} />
          </span>
          <div>
            <h2>{date}</h2>
            <p>
              {facility} <i>·</i> {campaign}
            </p>
          </div>
          <b>{status}</b>
          <button>
            Certificate <Download size={14} />
          </button>
        </article>
      ))}
    </section>
  );
}
function BadgeCheckIcon() {
  return <ShieldCheck size={13} />;
}
function GiftIcon() {
  return <Medal size={21} />;
}
