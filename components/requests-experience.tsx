"use client";

import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  demoRequests,
  type BloodType,
  type RequestUrgency,
} from "@/lib/demo-data";
import { HemovaLogo } from "./hemova-logo";
import { ScrollReveal, StaggerReveal } from "./scroll-reveal";

const bloodTypes: (BloodType | "All")[] = [
  "All",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];
const urgencyLabel: Record<RequestUrgency, string> = {
  critical: "Critical",
  high: "High priority",
  standard: "Standard",
};

export function RequestsExperience() {
  const [type, setType] = useState<BloodType | "All">("All");
  const [selected, setSelected] = useState<string | null>(null);
  const visible = demoRequests.filter(
    (request) => type === "All" || request.bloodType === type,
  );
  const active = demoRequests.find((request) => request.id === selected);
  return (
    <ScrollReveal as="main" className="requests-page">
      <header className="requests-header">
        <HemovaLogo />
        <div className="requests-header-links">
          <a href="/dashboard">Dashboard</a>
          <a className="active" href="/requests">
            Blood requests
          </a>
          <a href="#campaigns">Campaigns</a>
        </div>
        <div>
          <a href="/dashboard" className="back-dashboard">
            My dashboard
          </a>
        </div>
      </header>
      <div className="requests-layout">
        <section>
          <a className="back-link" href="/dashboard">
            <ArrowLeft size={16} /> Back to dashboard
          </a>
          <p className="dashboard-kicker">Verified donation opportunities</p>
          <h1>Requests near you</h1>
          <p className="requests-intro">
            Only verified facilities can post here. Your response is private and
            you can withdraw it at any time.
          </p>
          <div className="request-search">
            <Search size={18} />
            <input
              aria-label="Search requests"
              placeholder="Search facility or location"
            />
            <button aria-label="Open filters">
              <SlidersHorizontal size={18} />
            </button>
          </div>
          <div className="filter-label">
            <Filter size={15} /> Blood type
          </div>
          <div
            className="blood-filters"
            role="group"
            aria-label="Filter by blood type"
          >
            {bloodTypes.map((blood) => (
              <button
                className={type === blood ? "selected" : ""}
                onClick={() => setType(blood)}
                key={blood}
              >
                {blood}
              </button>
            ))}
          </div>
          <p className="results-count">
            {visible.length} verified requests in Greater Accra
          </p>
          <StaggerReveal className="public-request-list">
            {visible.map((request) => (
              <article className="public-request" key={request.id}>
                <span
                  className={`public-blood ${request.urgency === "critical" ? "public-blood-critical" : ""}`}
                >
                  {request.bloodType}
                </span>
                <div className="public-request-content">
                  <div>
                    <span className={`urgency-tag ${request.urgency}`}>
                      {urgencyLabel[request.urgency]}
                    </span>
                    {request.verified && (
                      <span className="facility-verified">
                        <BadgeCheck size={14} /> Verified facility
                      </span>
                    )}
                  </div>
                  <h2>{request.facility}</h2>
                  <p>
                    <MapPin size={14} />
                    {request.region} <i>·</i> {request.distance}
                  </p>
                  <div className="request-meta">
                    <span>{request.units} units requested</span>
                    <span>{request.neededBy}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(request.id)}
                  className="request-action"
                >
                  View request <ChevronRight size={16} />
                </button>
              </article>
            ))}
          </StaggerReveal>
        </section>
        <aside className="requests-aside">
          <div className="request-map">
            <span className="map-pin map-pin-one" />
            <span className="map-pin map-pin-two" />
            <span className="map-pin map-pin-three" />
            <div>
              <MapPin size={17} />
              <strong>Greater Accra</strong>
              <small>Approximate locations only</small>
            </div>
          </div>
          <div className="safety-callout">
            <ShieldCheck size={19} />
            <div>
              <strong>Your safety comes first</strong>
              <p>
                Hemova helps coordinate donation. Final eligibility is
                determined by trained healthcare professionals.
              </p>
            </div>
          </div>
        </aside>
      </div>
      {active && (
        <div
          className="request-modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelected(null)}
        >
          <section
            className="request-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close request"
            >
              <X />
            </button>
            <span className="modal-blood">{active.bloodType}</span>
            <span className={`urgency-tag ${active.urgency}`}>
              {urgencyLabel[active.urgency]} request
            </span>
            <h2 id="request-modal-title">{active.facility}</h2>
            <p className="modal-location">
              <MapPin size={16} /> {active.region} · {active.distance}
            </p>
            <div className="modal-details">
              <div>
                <span>Required</span>
                <strong>{active.units} units</strong>
              </div>
              <div>
                <span>Deadline</span>
                <strong>{active.neededBy}</strong>
              </div>
              <div>
                <span>Facility status</span>
                <strong>
                  <BadgeCheck size={15} /> Verified
                </strong>
              </div>
            </div>
            <p className="modal-note">
              No patient details are shared. If you respond, Hemova will show
              the next steps and facility instructions.
            </p>
            <button
              className="button modal-primary"
              onClick={() => setSelected(null)}
            >
              I can donate <ChevronRight size={18} />
            </button>
            <button className="not-available" onClick={() => setSelected(null)}>
              I’m not available
            </button>
          </section>
        </div>
      )}
    </ScrollReveal>
  );
}
