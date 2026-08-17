"use client";

import { ChevronDown, Settings, UserRound } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { DonorSignoutLink } from "./donor-signout-link";

export function DonorAccountFooter() {
  const [open, setOpen] = useState(true);

  useLayoutEffect(() => {
    try {
      setOpen(localStorage.getItem("hemova-donor-account-footer") !== "closed");
    } catch {
      setOpen(true);
    }
  }, []);

  const toggle = () => {
    setOpen((current) => {
      try {
        localStorage.setItem("hemova-donor-account-footer", current ? "closed" : "open");
      } catch {
        // Keep the current page interaction working if storage is unavailable.
      }
      return !current;
    });
  };


  return (
    <div className="app-nav-bottom donor-account-footer">
      <button
        className="account-toggle"
        type="button"
        onClick={toggle}
        aria-expanded={open}
      >
        <span>Donor account</span>
        <ChevronDown size={15} />
      </button>
      <div className={`account-links${open ? "" : " account-links-collapsed"}`} aria-hidden={!open}>
          <a href="/donor/profile">
            <UserRound size={19} />
            <span>Profile</span>
          </a>
          <a href="/donor/settings">
            <Settings size={19} />
            <span>Settings</span>
          </a>
          <DonorSignoutLink footer />
      </div>
    </div>
  );
}
