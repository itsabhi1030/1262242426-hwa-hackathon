"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#mechanics", label: "Mechanics" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const { itemCount, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="#"
            className="flex items-center gap-2"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-white text-sm font-bold shadow-sm">
              ST
            </div>
            <span className="text-xl font-bold text-charcoal tracking-tight italic">
              Sniff Trail
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-charcoal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:terracotta"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-sand text-charcoal hover:bg-terracotta hover:text-white transition-colors"
              aria-label="Shopping cart"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sunshine text-charcoal text-xs font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
