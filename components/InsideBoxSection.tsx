"use client";

import Image from "next/image";

const CALLOUTS = [
  "10-chamber twist carousel tray",
  "8-paddle POP-PAW Ring",
  "Center bonus kibble hub",
  "KIBBLEHOPPER",
  "Rear recessed loading insert",
  "Sealed coil steel main spring base",
  "10 starter scent pods",
  "Wooden cleaning brush",
  "Quick start card",
  "Quarter turn top-rack dishwasher cleanup",
];

export function InsideBoxSection() {
  return (
    <section className="bg-sand py-16 lg:py-24 border-y border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Everything inside the box
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Pure mechanical engineering — every piece built to last, no
            batteries required.
          </p>
        </div>

        <div className="relative h-[560px] lg:h-[700px] flex items-center justify-center mb-16">
          <div className="relative z-10 w-full max-w-[700px]">
            <Image
              src="/assets/SnifTrail_3.png"
              alt="Exploded component display of SnifTrail"
              width={1400}
              height={900}
              className="w-full h-auto rounded-2xl shadow-2xl border-4 border-sand"
              priority
              unoptimized
            />
          </div>
          <div className="absolute -inset-2 rounded-2xl bg-terracotta/20 blur-3xl"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CALLOUTS.map((callout, idx) => (
            <div
              key={idx}
              className="px-4 py-3 rounded-xl border border-sand/40 bg-white/70 text-sm text-charcoal text-center font-medium"
            >
              {callout}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
