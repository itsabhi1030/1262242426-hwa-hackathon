"use client";

import { useState } from "react";

const REVIEWS = [
  {
    name: "Arjun M.",
    location: "Mumbai, Maharashtra",
    dog: "Labrador Retriever, 28 kg",
    rating: 5,
    text:
      "Our Labrador used to chew the sofa the moment we left for work. SnifTrail keeps him occupied for the full 90 minutes. The terracotta base doesn&rsquo;t tip even when he goes full force. Worth every rupee.",
  },
  {
    name: "Priya S.",
    location: "Delhi, NCR",
    dog: "Beagle, 12 kg",
    rating: 5,
    text:
      "The scent pods are a genius touch. My beagle follows the aroma from room to room. No batteries to charge, no screens &mdash; just pure mechanical fun. Dishwasher-safe tray is a lifesaver.",
  },
  {
    name: "Rohit K.",
    location: "Bangalore, Karnataka",
    dog: "Indie / Desi mix, 16 kg",
    rating: 4,
    text:
      "Sturdy build and the pop-paw paddles keep our indie mix engaged. The cobalt blue and yellow are easy for him to spot. Free shipping across India made the order a no-brainer.",
  },
];

const FAQS = [
  {
    q: "Does it really work with no batteries? How reliable is the clockwork?",
    a:
      "Yes. SnifTrail is 100% wind-up mechanical. A sealed coil steel main spring powers the carousel and pop-paw ring &mdash; no electronics to fail, no charging, and nothing to break down over time.",
  },
  {
    q: "What happens during the 9-minute gaps between chambers?",
    a:
      "Each chamber unlocks every 9 minutes. During the gap, the dog can lick, sniff, and forage at the current chamber. The carousel keeps turning on its own schedule even if your dog rests.",
  },
  {
    q: "Is it safe if it gets caught in a heavy shower or rain?",
    a:
      "The polymer body and sealed silicone seals are water-resistant, but we recommend keeping it under cover. The tray is dishwasher-safe for regular cleaning.",
  },
  {
    q: "Can I wash the tray in the dishwasher?",
    a:
      "Yes. The carousel tray and silicone cup are quarter-turn removable and top-rack dishwasher-safe for easy cleanup.",
  },
  {
    q: "Can I use treats or paste with it?",
    a:
      "Absolutely. Each chamber has a grooved slow-forage silicone cup that works with kibble, treats, or dog-safe paste.",
  },
  {
    q: "How long does one scent pod last, and how many come in the box?",
    a:
      "Each starter box includes 10 scent pods &mdash; one per chamber. A single pod lasts multiple sessions depending on use, and the 20-pod refill pack covers two full 10-chamber cycles across all four scents.",
  },
];

export function ReviewsFAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-sand py-16 lg:py-24 border-y border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-6">
              What pet parents say
            </h2>
            <div className="space-y-8">
              {REVIEWS.map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-sand/40">
                  <div className="flex items-center gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="text-[14px]"
                        aria-hidden="true"
                      >
                        {star <= review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                    <p className="text-charcoal/80 leading-relaxed mb-4">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="font-bold text-charcoal">{review.name}</p>
                      <p className="text-xs text-charcoal/50">
                        {review.dog}
                      </p>
                    </div>
                    <p className="text-xs text-terracotta font-medium">
                      {review.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-8">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-sand/40 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between px-6 py-4 text-left bg-transparent transition-colors hover:bg-terracotta/5"
                    >
                      <span className="text-sm font-medium text-charcoal">
                        {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 text-terracotta transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-sm text-charcoal/70 leading-relaxed border-t border-sand/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
