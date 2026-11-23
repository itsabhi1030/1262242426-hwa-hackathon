"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const SIZES = [
  {
    id: "size-small",
    name: "Small",
    weight: "Under 10 kg",
    tension: "Lighter paddle spring tension",
    chambers: "Compact chambers",
    price: 3499,
  },
  {
    id: "size-medium",
    name: "Medium",
    weight: "10 to 25 kg",
    tension: "Standard tension & chamber depth",
    chambers: "Most popular",
    price: 4299,
    popular: true,
  },
  {
    id: "size-large",
    name: "Large",
    weight: "25+ kg",
    tension: "Firmer paddles",
    chambers: "Deeper chambers, extra weighted base",
    price: 4999,
  },
];

export function ConfiguratorSection() {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(SIZES[1].id);
  const [quantity, setQuantity] = useState(1);
  const [addon, setAddon] = useState(false);

  const size = SIZES.find((s) => s.id === selectedSize)!;
  const addonPrice = addon ? 999 : 0;
  const lineTotal = (size.price + addonPrice) * quantity;

  const addToCart = () => {
    addItem({
      id: selectedSize,
      name: `SnifTrail ${size.name}`,
      price: size.price,
      image: "/assets/SnifTrail_1.png",
    });
    if (addon) {
      addItem({
        id: "addon-refill-pack",
        name: "20-Pod Scent Refill Pack",
        price: 999,
        image: "/assets/SnifTrail_3.png",
      });
    }
  };

  return (
    <section id="shop" className="bg-cream py-16 lg:py-24 border-y border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Configure Your SnifTrail
          </h2>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            Choose the right size for your dog, add a scent refill pack, and
            check out in Indian rupees.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Size cards */}
          <div className="lg:col-span-2 space-y-4">
            {SIZES.map((s) => {
              const isSelected = selectedSize === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSize(s.id)}
                  className={`flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-terracotta text-white border-terracotta shadow-lg shadow-terracotta/40"
                      : "bg-white border-sand/40 hover:border-terracotta hover:bg-terracotta/5 hover:text-terracotta"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-xl shrink-0 ${
                    isSelected ? "bg-white text-terracotta" : "bg-terracotta text-white"
                  }`}>
                    {s.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-bold">{s.name}</h3>
                      {s.popular && (
                        <span className="px-2 py-0.5 rounded bg-sunshine text-charcoal text-xs font-bold tracking-tight">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-charcoal/60 mb-2">
                      {s.weight} &bull; {s.tension}
                    </p>
                    <p className="text-xs text-charcoal/60">{s.chambers}</p>
                    <div className="mt-3 text-lg font-bold">
                      {INR.format(s.price)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Buy box */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-2xl border border-sand shadow-lg space-y-6">
                <div>
                  <h3 className="font-bold text-charcoal text-lg mb-1">Your Selection</h3>
                  <p className="text-sm text-charcoal/60">
                    {size.name} &bull; {size.weight}
                  </p>
                </div>

                <div className="border rounded-xl p-4 border-sand/40 bg-sand/30">
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={addon}
                        onChange={() => setAddon(!addon)}
                        className="rounded border-sand text-terracotta focus:ring-terracotta"
                      />
                      <span className="text-sm text-charcoal group-hover:text-terracotta transition-colors">
                        Add 20-Pod Scent Refill Pack
                      </span>
                    </label>
                    <span className="text-sm font-bold text-terracotta">
                      {INR.format(999)}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/50">
                    Covers 2 full 10-chamber cycles across all 4 natural scents.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-charcoal">Qty</label>
                  <div className="flex items-center gap-2 border border-sand rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="h-10 w-10 flex items-center justify-center bg-white hover:bg-terracotta/10 text-charcoal hover:text-terracotta transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="h-10 w-12 text-center border-x border-sand focus:outline-none"
                      readOnly
                    />
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="h-10 w-10 flex items-center justify-center bg-white hover:bg-terracotta/10 text-charcoal hover:text-terracotta transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-sand/40">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-charcoal">Subtotal</span>
                    <span className="text-sm font-bold text-charcoal">
                      {INR.format(lineTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-terracotta font-medium">
                    <span>Shipping</span>
                    <span className="font-bold">Free across India</span>
                  </div>
                </div>

                <button
                  onClick={addToCart}
                  className="w-full flex h-12 items-center justify-center rounded-full bg-terracotta text-white font-semibold text-sm shadow-lg hover:bg-[#a85238] hover:shadow-terracotta/30 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
