"use client";

import Image from "next/image";

export function LifestyleSection() {
  return (
    <section className="bg-cream py-16 lg:py-24 border-y border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="lg:order-2 relative h-[420px] flex items-center justify-center">
            <div className="relative z-10">
              <Image
                src="/assets/SnifTrail_2.png"
                alt="Golden retriever playing with SnifTrail in a living room"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl border-4 border-sand"
                priority
              />
            </div>
            <div className="absolute -inset-2 rounded-2xl bg-cobalt/20 blur-3xl"></div>
          </div>

          <div className="lg:order-1 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal">
              Designed for how dogs actually see
            </h2>
            <p className="text-lg text-charcoal/70 leading-relaxed">
              Dogs are dichromatic — they see blues and yellows most clearly.
              That&rsquo;s why SnifTrail&rsquo;s pop-paw paddles alternate cobalt
              blue and sunshine yellow, making every pop unmistakable to your
              dog&rsquo;s eyes.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Weighted terracotta base",
                  body:
                    "A heavy, weighted terracotta base with non-slip rubber feet keeps the toy planted — no tipping, no sliding, even for enthusiastic pawing.",
                },
                {
                  title: "Chew-resistant edges",
                  body:
                    "Smooth, chew-resistant BPA-free polymer edges that are gentle on gums but tough enough for daily play.",
                },
                {
                  title: "Safe, unsupervised use",
                  body:
                    "Zero electronics, zero batteries, zero screens. Completely safe for unsupervised play while you&rsquo;re away.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sand text-terracotta font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{item.title}</p>
                    <p className="text-sm text-charcoal/70">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
