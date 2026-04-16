"use client";

import Link from "next/link";
import { useState } from "react";

type ActivePage = "events" | "venues" | "artists" | "add-show" | "add-artist" | "contact";

const links: { href: string; label: string; page: ActivePage }[] = [
  { href: "/", label: "Events", page: "events" },
  { href: "/venues", label: "Venues", page: "venues" },
  { href: "/artists", label: "Artists", page: "artists" },
  { href: "/add-show", label: "Add a show", page: "add-show" },
  { href: "/add-artist", label: "Add an artist", page: "add-artist" },
  { href: "/contact", label: "Contact", page: "contact" },
];

function navClass(active: ActivePage | undefined, page: ActivePage) {
  const base = "text-sm md:text-base font-black transition-colors uppercase";
  return active === page ? `${base} text-black` : `${base} text-gray-400 hover:text-gray-600`;
}

export default function Header({ active }: { active?: ActivePage }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="px-4 md:px-8 py-3 md:py-6 max-w-[1400px] mx-auto flex items-center justify-between md:justify-between">
        <Link href="/" className="text-3xl font-black uppercase hover:underline" onClick={() => setOpen(false)}>
          Provo Music Scene
        </Link>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[6px] w-8 h-8"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[2px] bg-black transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-[2px] bg-black transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] bg-black transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map(({ href, label, page }) => (
            <Link key={page} href={href} className={navClass(active, page)}>
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#eeeeee] flex flex-col px-8 py-8 md:hidden">
          <div className="flex items-center justify-between mb-16">
            <Link href="/" className="text-3xl font-black uppercase" onClick={() => setOpen(false)}>
              Provo Music Scene
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-4xl leading-none"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col gap-10">
            {links.map(({ href, label, page }) => (
              <Link
                key={page}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-3xl font-bold transition-colors ${active === page ? "underline" : "hover:underline"}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
