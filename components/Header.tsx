"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/platforms", label: "Platforms" },
  { href: "/process", label: "Process" },
  { href: "/ai", label: "AI" },
  { href: "/partners", label: "Partners" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header>
      <nav className="nav">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <img
            className="brand-logo-dark"
            src="/brand/logo-full-white.svg"
            alt="CoreNovaIT"
            width={158}
            height={28}
          />
          <img
            className="brand-logo-light"
            src="/brand/logo-full-black.svg"
            alt="CoreNovaIT"
            width={158}
            height={28}
          />
        </Link>

        <div className="navlinks">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link className="btn nav-cta" href="/contact">
            Start a Project
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </nav>

      <div id="mobileNav" className={open ? "open" : ""}>
        <div className="wrap">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}>
            Start a Project
          </Link>
        </div>
      </div>
    </header>
  );
}
