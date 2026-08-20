"use client";

import { ArrowRight, BadgeCheck, BellRing, CalendarDays, Check, ChevronRight, Clock3, Database, Gift, HeartHandshake, MapPin, Network, ShieldCheck, Smartphone, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { PublicNavbar } from "./public-navbar";
import { HemovaLogo } from "./hemova-logo";
import { ScrollReveal, StaggerReveal, WordReveal, type Word } from "./scroll-reveal";

const metrics = [["2,480+", "Registered donors"], ["186+", "Donations supported"], ["32", "Healthcare partners"], ["8", "Regions reached"]];
const audiences = [
  { icon: HeartHandshake, title: "Donors", body: "Find opportunities, book a visit, and keep your donation journey close." },
  { icon: ShieldCheck, title: "Hospitals", body: "Reach suitable nearby donors through verified, coordinated requests." },
  { icon: CalendarDays, title: "Blood centres", body: "Manage appointments and nurture a community of returning donors." },
  { icon: UsersRound, title: "Organizations", body: "Bring your community together around meaningful blood drives." },
];
const steps = ["Create your profile", "See a verified opportunity", "Donate at an authorized centre", "Follow your contribution"];
const heroStates: { title: Word[]; body: string[] }[] = [
  { title: ["Blood,", "when", { text: "it", accent: true }, { text: "matters.", accent: true }], body: ["Hemova", "connects", "donors,", "hospitals", "and", "blood", "centres", "so", "lifesaving", "blood", "can", "reach", "the", "people", "who", "need", "it."] },
  { title: ["Give", "blood.", { text: "Earn", accent: true }, { text: "recognition.", accent: true }], body: ["Every", "verified", "donation", "contributes", "to", "your", "Hemova", "journey,", "with", "points,", "milestones,", "rewards", "and", "donation", "certificates."] },
  { title: ["Access", "beyond", { text: "smartphones.", accent: true }], body: ["With", "USSD", "support,", "Hemova", "can", "help", "people", "discover", "donation", "opportunities", "and", "respond", "even", "without", "a", "smartphone", "or", "mobile", "data."] },
  { title: ["Finding", "the", "right", { text: "donor,", accent: true }, { text: "faster.", accent: true }], body: ["Smart", "matching", "connects", "verified", "blood", "requests", "with", "suitable", "potential", "donors", "based", "on", "blood", "group,", "location,", "availability", "and", "other", "relevant", "factors."] },
  { title: ["Healthcare", "systems", { text: "that", accent: true }, { text: "connect.", accent: true }], body: ["Hemova", "is", "designed", "around", "HL7", "FHIR", "interoperability,", "enabling", "future", "integration", "with", "hospitals,", "blood", "banks", "and", "digital", "health", "systems."] },
  { title: ["One", "donation", { text: "ecosystem.", accent: true }], body: ["Donors,", "hospitals,", "blood", "banks", "and", "blood", "drives", "work", "through", "one", "connected", "platform,", "from", "blood", "request", "to", "donation", "and", "recognition."] },
];
const heroImages = [
  "/images/hero/ghana-donation.png",
  "/images/hero/ghana-recognition.png",
  "/images/hero/ghana-ussd.png",
  "/images/hero/ghana-matching.png",
  "/images/hero/ghana-fhir.png",
  "/images/hero/ghana-ecosystem.png",
];

function RequestCard() {
  return <article className="request-card">
    <div className="request-top"><span className="eyebrow urgent"><span /> Urgent blood request</span><span className="verified"><BadgeCheck size={15} /> Verified</span></div>
    <div className="request-main"><div className="blood-type">O−</div><div><h3>O Negative needed</h3><p>Korle Bu Teaching Hospital</p></div></div>
    <div className="request-details"><span><MapPin size={15} /> 4.8 km away</span><span><UsersRound size={15} /> 18 donors nearby</span></div>
    <div className="request-footer"><span>2 units required</span><a href="#blood-requests">View request <ChevronRight size={16} /></a></div>
  </article>;
}

function useHeroState() {
  const [state, setState] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setState((current) => (current + 1) % heroStates.length), 5000);
    return () => window.clearInterval(timer);
  }, []);
  return [state, setState] as const;
}

function DynamicHeroCopy({ state }: { state: number }) {
  const current = heroStates[state];
  return <div className="hero-dynamic-copy" aria-live="polite"><WordReveal key={`title-${state}`} as="h1" words={current.title} delay={90} /><WordReveal key={`body-${state}`} as="p" className="hero-description" words={current.body} delay={220} /></div>;
}

function HeroVisual({ state }: { state: number }) {
  return null;
}

export function HemovaHome() {
 const [heroState, setHeroState] = useHeroState();
 const selectHeroState = (nextState: number) => setHeroState((nextState + heroStates.length) % heroStates.length);
 return <main id="top">
  <PublicNavbar />
  <section className="hero container"><div className="hero-background">{heroImages.map((image, index) => <img className={`hero-background-image${index === heroState ? " is-active" : ""}`} src={image} alt="" aria-hidden="true" key={image} />)}</div><div className="hero-copy"><DynamicHeroCopy state={heroState} /><div className="hero-buttons"><a className="button" href="/signup">Become a donor <ArrowRight size={18} /></a><a className="button button-secondary" href="/requests">Request blood</a></div><p className="quiet-note"><ShieldCheck size={16} /> Verified facilities. Your information stays protected.</p><div className="hero-state-controls" aria-label="Hero feature controls"><button type="button" onClick={() => selectHeroState(heroState - 1)} aria-label="Previous feature">‹</button><span>{String(heroState + 1).padStart(2, "0")} / {String(heroStates.length).padStart(2, "0")}</span><button type="button" onClick={() => selectHeroState(heroState + 1)} aria-label="Next feature">›</button></div></div><div className="hero-visual"><HeroVisual state={heroState} /></div></section>
  <ScrollReveal as="section" className="trust-strip"><StaggerReveal className="container metrics">{metrics.map(([number,label]) => <div key={label}><strong>{number}</strong><span>{label}</span></div>)}<p className="metrics-note">Illustrative platform data for demonstration purposes.</p></StaggerReveal></ScrollReveal>
  <ScrollReveal as="section" className="section process" id="how-it-works"><div className="container"><ScrollReveal as="div" className="section-heading centered" distance={48}><p className="eyebrow">How Hemova works</p><h2>A clearer path from <em>intention to impact.</em></h2><p>Simple, verified coordination for people who want to help and the teams making donation possible.</p></ScrollReveal><StaggerReveal className="steps">{steps.map((step,i) => <div className="step" key={step}><span className="step-number">0{i+1}</span><h3>{step}</h3><p>{["Share the details you are comfortable with.", "We’ll show relevant requests and blood drives.", "Your centre completes the clinical screening.", "See your history and when to plan ahead."][i]}</p></div>)}</StaggerReveal></div></ScrollReveal>
  <ScrollReveal as="section" className="section ecosystem" id="donate"><div className="container"><div className="section-heading"><p className="eyebrow">Built for the whole community</p><h2>One ecosystem.<br/><em>More lives reached.</em></h2></div><StaggerReveal className="audience-grid">{audiences.map(({icon:Icon,title,body}) => <article className="audience" key={title}><span className="audience-icon"><Icon size={23}/></span><h3>{title}</h3><p>{body}</p><a href="#learn">Explore <ArrowRight size={15}/></a></article>)}</StaggerReveal></div></ScrollReveal>
  <ScrollReveal as="section" className="section showcase" id="blood-requests"><div className="container showcase-grid"><ScrollReveal as="div" className="showcase-panel"><div className="panel-head"><span>Today</span><strong>Welcome back, Yusif</strong><span className="tiny-avatar">Y</span></div><div className="eligibility"><span className="eligibility-icon"><HeartHandshake size={22}/></span><div><span className="small-label">Donation status</span><h3>You may be eligible to donate.</h3><p>Final eligibility is determined at the donation centre.</p></div><ArrowRight size={19}/></div><div className="mini-request"><span className="blood-mini">A+</span><div><strong>Accra Community Blood Drive</strong><p>Saturday · 10:00 AM · 2.1 km away</p></div><span className="spots">12 spots</span></div></ScrollReveal><ScrollReveal as="div" className="showcase-copy" delay={120}><p className="eyebrow">Designed around real life</p><h2>Everything you need, <em>nothing you don’t.</em></h2><p>From a calm reminder to a nearby request, Hemova makes the next helpful action unmistakably clear.</p><ul><li><Check size={18}/> Donor-controlled communication preferences</li><li><Check size={18}/> Clear appointment preparation and directions</li><li><Check size={18}/> Private history and simple future planning</li></ul><a className="text-cta" href="#campaigns">Explore donation opportunities <ArrowRight size={17}/></a></ScrollReveal></div></ScrollReveal>
  <ScrollReveal as="section" className="section campaign-section" id="campaigns"><div className="container"><div className="campaign-heading"><div><p className="eyebrow">Upcoming opportunities</p><h2>Find a blood drive<br/><em>near you.</em></h2></div><a className="text-cta" href="#all-campaigns">See all campaigns <ArrowRight size={17}/></a></div><article className="campaign-card"><div className="campaign-photo" /><div className="campaign-content"><span className="verified"><BadgeCheck size={15}/> Verified organizer</span><h3>Accra Community Blood Drive</h3><p>Join a welcoming donation day hosted with local healthcare partners.</p><div className="campaign-info"><span><CalendarDays size={16}/> Saturday, 28 Sept</span><span><Clock3 size={16}/> 9:00 AM – 3:00 PM</span><span><MapPin size={16}/> Osu, Accra</span></div><a className="button button-secondary" href="#join">Join campaign <ArrowRight size={17}/></a></div></article></div></ScrollReveal>
  <ScrollReveal as="section" className="section safety" id="for-hospitals"><div className="container safety-grid"><div><p className="eyebrow light-eyebrow">Trust & safety</p><h2>Verified requests.<br/><em>Protected donors.</em></h2></div><StaggerReveal className="safety-points"><p><ShieldCheck /> Healthcare facilities are reviewed before they can reach donors.</p><p><HeartHandshake /> Blood is never sold through Hemova. Participation is always voluntary.</p><p><BadgeCheck /> Patient-identifiable information is never shown in donation opportunities.</p></StaggerReveal></div></ScrollReveal>
  <ScrollReveal as="section" className="final-cta"><div className="container"><p className="eyebrow">Your community needs you</p><h2>Someone’s tomorrow could start<br/>with your donation today.</h2><div className="hero-buttons"><a className="button" href="/signup">Become a donor <ArrowRight size={18}/></a><a className="button button-secondary" href="#campaigns">Find a blood drive</a></div></div></ScrollReveal>
  <ScrollReveal as="footer"><div className="container footer-inner"><div><HemovaLogo /><p>Helping communities coordinate voluntary blood donation, when it matters.</p></div><div className="footer-links"><a href="#donate">Donate</a><a href="#blood-requests">Blood requests</a><a href="#campaigns">Campaigns</a><a href="#for-hospitals">For hospitals</a><a href="#privacy">Privacy</a></div><span>© 2026 Hemova</span></div></ScrollReveal>
 </main>;
}
