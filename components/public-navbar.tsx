"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { HemovaLogo } from "./hemova-logo";

const links = ["How it works", "Donate", "Blood requests", "Campaigns", "For hospitals"];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setHidden(currentScrollPosition > 96 && currentScrollPosition > previousScrollPosition);
      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav-wrap${hidden ? " nav-hidden" : ""}`}>
      <nav className="nav container" aria-label="Main navigation">
        <HemovaLogo />
        <div className="nav-links">{links.map((link) => <a href={`#${link.toLowerCase().replaceAll(" ", "-")}`} key={link}>{link}</a>)}</div>
        <div className="nav-actions"><a className="text-link" href="/login">Sign in</a><a className="button button-small" href="/signup">Become a donor</a></div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <div className="mobile-menu"><div className="container">{links.map((link) => <a onClick={() => setOpen(false)} href={`#${link.toLowerCase().replaceAll(" ", "-")}`} key={link}>{link}</a>)}<div className="mobile-menu-actions"><a className="button" href="/signup">Become a donor</a></div></div></div>}
    </header>
  );
}
