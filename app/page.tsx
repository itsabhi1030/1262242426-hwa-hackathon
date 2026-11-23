"use client";

import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MechanicsSection } from "@/components/MechanicsSection";
import { LifestyleSection } from "@/components/LifestyleSection";
import { InsideBoxSection } from "@/components/InsideBoxSection";
import { ConfiguratorSection } from "@/components/ConfiguratorSection";
import { ReviewsFAQSection } from "@/components/ReviewsFAQSection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-cream">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <section id="how-it-works" className="bg-sand py-16 lg:py-24 border-y border-sand/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              How It Works
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              Wind it up. Place it down. Your dog gets 90 minutes of scent-led,
              battery-free enrichment while you&rsquo;re away.
            </p>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "1. Wind the spring",
                  body:
                    "Quarter-turn the top rack to tension the sealed coil steel main spring.",
                },
                {
                  title: "2. Load the chambers",
                  body:
                    "Fill the 10-chamber carousel with scent pods and kibble through the rear loading insert.",
                },
                {
                  title: "3. Set it free",
                  body:
                    "The carousel unlocks one chamber every 9 minutes for 90 minutes of play.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-sand/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-white font-bold text-xl mx-auto mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-charcoal mb-2">{item.title}</h3>
                  <p className="text-sm text-charcoal/70">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <MechanicsSection />
        <LifestyleSection />
        <InsideBoxSection />
        <ConfiguratorSection />
        <ReviewsFAQSection />
        <Footer />
      </main>
      <CartDrawer />
    </div>
  );
}
