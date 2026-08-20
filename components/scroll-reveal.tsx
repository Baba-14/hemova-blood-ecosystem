"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  as?: ElementType;
  id?: string;
};

type RevealStyle = CSSProperties & { "--reveal-delay"?: string; "--reveal-distance"?: string };
export type Word = string | { text: string; accent?: boolean };

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.unobserve(entry.target);
    }, { threshold: 0.12, rootMargin: "0px 0px -12% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function ScrollReveal({ children, className = "", delay = 0, distance = 38, as: Component = "div", id }: RevealProps) {
  const { ref, visible } = useReveal();
  const style: RevealStyle = { "--reveal-delay": `${delay}ms`, "--reveal-distance": `${distance}px` };
  return <Component ref={ref} id={id} className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`} style={style}>{children}</Component>;
}

export function StaggerReveal({ children, className = "", as: Component = "div" }: Omit<RevealProps, "delay" | "distance">) {
  const { ref, visible } = useReveal();
  return <Component ref={ref} className={`scroll-stagger ${visible ? "is-visible" : ""} ${className}`}>{children}</Component>;
}

export function WordReveal({ words, className = "", delay = 0, as: Component = "span" }: { words: Word[]; className?: string; delay?: number; as?: ElementType }) {
  const { ref, visible } = useReveal();
  const label = words.map((word) => typeof word === "string" ? word : word.text).join(" ");
  return <Component ref={ref} className={`word-reveal ${visible ? "is-visible" : ""} ${className}`} aria-label={label}>{words.map((word, index) => { const text = typeof word === "string" ? word : word.text; const accent = typeof word !== "string" && word.accent; return <span className="word-reveal-word" style={{ transitionDelay: `${delay + index * 55}ms` }} key={`${text}-${index}`}>{accent ? <em>{text}</em> : text}</span>; })}</Component>;
}
