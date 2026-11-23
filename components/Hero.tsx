"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:order-2 space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand text-terracotta text-xs font-bold tracking-wider uppercase">
              New — Ship Free Across India
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight">
              The battery-free way to keep your dog calm
            </h1>
            <p className="text-lg sm:text-xl text-charcoal/80 leading-relaxed max-w-lg">
              90 minutes of calm and battery-free play while you are away.
            </p>
            <p className="text-sm sm:text-base text-charcoal/60 leading-relaxed max-w-lg">
              A 10-chamber time-descend carousel unlocks every 9 minutes, with an
              8-paddle mechanical pop-paw center hub — zero electronics, zero
              screens, just pure wind-up enrichment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="#shop"
                className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-terracotta text-white font-semibold text-sm shadow-lg hover:bg-[#a85238] transition-colors"
              >
                Configure Yours
              </Link>
              <Link
                href="#mechanics"
                className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-sand bg-white text-charcoal font-semibold text-sm hover:bg-terracotta hover:text-white transition-colors"
              >
                See the Mechanics
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: "Zero batteries or screens", icon: "🔋" },
                { label: "Weighted anti-tip base", icon: "⚖️" },
                { label: "Dishwasher-safe tray", icon: "🧼" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-sand bg-white/80 text-sm text-charcoal"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:order-1 relative h-[400px] lg:h-[520px] flex items-center justify-center">
            <div className="relative z-10">
              <Image
                src="/assets/SnifTrail_1.png"
                alt="SnifTrail mechanical dog toy studio shot"
                width={700}
                height={700}
                className="drop-shadow-2xl rounded-full bg-white border-4 border-sand"
                priority
              />
            </div>
            <div className="absolute -inset-2 rounded-full bg-terracotta/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
