"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Mechanics", href: "#mechanics" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Shipping & Returns", href: "#" },
  { label: "Contact Us", href: "mailto:hello@sniftrail.in" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16 lg:py-24 border-t border-terracotta/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-full bg-terracotta text-white text-sm font-bold flex items-center justify-center">
                ST
              </div>
              <span className="text-xl font-bold italic">SnifTRAIL</span>
            </div>
            <p className="text-terracotta/40 text-sm leading-relaxed max-w-xs">
              100% battery-free, wind-up mechanical enrichment for dogs left
              home alone. Designed in India, shipped free across India.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-3 text-terracotta/40 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3 text-terracotta/40 text-sm">
              <li>
                <a
                  href="mailto:hello@sniftrail.in"
                  className="transition-colors hover:text-white"
                >
                  hello@sniftrail.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-terracotta/20 flex items-center justify-center text-[10px]">
                  IN
                </span>
                <span>Free shipping across India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-terracotta/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-terracotta/40">
          <p>© 2026 SnifTrail. All rights reserved.</p>
          <p>Battery-free &bull; Screen-free &bull; Made for dogs</p>
        </div>
      </div>
    </footer>
  );
}
