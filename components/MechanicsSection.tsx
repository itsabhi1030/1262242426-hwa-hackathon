"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SCENTS = ["Savory Roast", "Forest Trail", "Applewood", "Calm Chamomile"];

const CHAMBER_STEPS = [
  "Airtight silicone seal breaks, releasing scent pod aroma",
  "Hinged nose-press flip lid opens",
  "Grooved slow-forage silicone cup revealed",
  "Deadtime Pop-Paw play until the next click",
];

export function MechanicsSection() {
  const [activeChamber, setActiveChamber] = useState(1);
  const [pressCount, setPressCount] = useState(0);
  const [bonusCount, setBonusCount] = useState(0);
  const [poppingPaddle, setPoppingPaddle] = useState(0);
  const [showBonus, setShowBonus] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPoppingPaddle(Math.floor(Math.random() * 8));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const scentForChamber = SCENTS[(activeChamber - 1) % SCENTS.length];

  const nextRandomPaddle = useCallback(() => {
    const p = Math.floor(Math.random() * 8);
    setPoppingPaddle(p);
  }, []);

  const handlePress = useCallback((paddleIdx: number) => {
    if (poppingPaddle !== paddleIdx) return;
    setPressCount((c) => {
      const next = c + 1;
      if (next % 5 === 0) {
        setBonusCount((b) => b + 1);
        setShowBonus(true);
        setTimeout(() => setShowBonus(false), 1200);
        return 0;
      }
      return next;
    });
    setPoppingPaddle(-1);
    setTimeout(nextRandomPaddle, 600);
  }, [poppingPaddle, nextRandomPaddle]);

  useEffect(() => {
    intervalRef.current = window.setInterval(nextRandomPaddle, 2200);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [nextRandomPaddle]);

  return (
    <section
      id="mechanics"
      className="bg-sand py-16 lg:py-24 border-y border-sand/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            How the 90-Minute Cycle Works
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            The carousel keeps turning even if your dog takes a rest. Each of
            the 10 chambers unlocks every 9 minutes, delivering a fresh scent
            and a slow-forage challenge.
          </p>
        </div>

        {/* Part A: Ten-chamber timeline */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-charcoal mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-terracotta"></span>
            Part A — The Ten-Chamber Carousel
          </h3>
          <p className="text-sm text-charcoal/60 mb-8 max-w-xl">
            Chambers 1 to 10 unlock every 9 minutes. Each slot runs the same
            four-step activity.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((chamber) => {
              const isActive = chamber === activeChamber;
              return (
                <button
                  key={chamber}
                  onClick={() => setActiveChamber(chamber)}
                  className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition-all duration-300 ${
                    isActive
                      ? "bg-terracotta text-white border-terracotta shadow-lg shadow-terracotta/40"
                      : "bg-white border-sand/40 text-charcoal/70 hover:border-terracotta hover:bg-terracotta/10"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-xl ${
                    isActive ? "bg-white text-terracotta" : "bg-terracotta text-white"
                  }`}>
                    {chamber}
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    Unlocks at {chamber * 9} min
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-6 rounded-xl border border-sand/40 bg-white/60">
            <div className="flex items-start gap-3">
              <span className="text-terracotta font-bold text-sm">
                Chamber {activeChamber}
              </span>
              <div className="text-sm text-charcoal/80">
                <p className="font-medium mb-1">{scentForChamber} scent pod released</p>
                <ul className="list-disc list-inside text-xs text-charcoal/60 space-y-1">
                  {CHAMBER_STEPS.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Part B: Pop-Paw interactive */}
        <div className="relative">
          <h3 className="text-xl font-bold text-charcoal mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cobalt"></span>
            Part B — Try Pop-Paw
          </h3>
          <p className="text-sm text-charcoal/60 mb-8 max-w-xl">
            Eight paddles arranged in a circle, alternating cobalt blue and
            sunshine yellow. One random paddle pops up at a time — tap it to
            score. Every 5 successful presses earns a +1 bonus kibble drop.
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-8 text-sm font-medium text-charcoal">
              <span>Presses: <span className="text-terracotta font-bold">{pressCount}</span></span>
              <span>Bonus kibbles: <span className="text-cobalt font-bold">{bonusCount}</span></span>
            </div>

            <div className="relative h-64 w-64 flex items-center justify-center">
              {Array.from({ length: 8 }).map((_, i) => {
                const isYellow = i % 2 === 0;
                const isPopped = poppingPaddle === i;

                return (
                  <button
                    key={i}
                    onClick={() => handlePress(i)}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-200 outline-none focus:ring-2 focus:ring-terracotta ${
                      isPopped
                        ? "scale-110 rotate-6"
                        : "scale-100 rotate-0"
                    } ${isYellow ? "bg-sunshine text-charcoal" : "bg-cobalt text-white"}`}
                    aria-label={`Paddle ${i + 1}`}
                  >
                    <span className={`text-xs font-bold transform ${
                      isPopped ? "-rotate-6" : "rotate-6"
                    }`}>
                      {isPopped ? "POP!" : i + 1}
                    </span>
                  </button>
                );
              })}
              <div className="absolute h-16 w-16 rounded-full bg-white border-4 border-sand shadow-inner flex items-center justify-center text-terracotta font-bold text-lg">
                SnifTrail
              </div>
            </div>

            {showBonus && (
              <div className="px-4 py-2 rounded-full bg-cobalt text-white text-xs font-bold animate-bounce">
                +1 Bonus Kibble Drop!
              </div>
            )}

            <p className="text-xs text-charcoal/50 mt-4 max-w-sm text-center">
              The 9-minute carousel keeps running even if your dog takes a rest
              — no electronics, no screens, just wind-up mechanics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
