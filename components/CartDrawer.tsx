"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function CartDrawer() {
  const { items, subtotal, increment, decrement, removeItem, closeCart } =
    useCart();
  const router = useRouter();

  const proceedToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand/40">
          <h2 className="text-lg font-bold text-charcoal">Your Cart</h2>
          <button
            onClick={closeCart}
            className="h-8 w-8 rounded-full border border-sand flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b border-sand/30 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex-shrink-0 h-12 w-12 rounded bg-sand flex items-center justify-center overflow-hidden">
                <span className="text-[10px] font-bold text-terracotta">{item.quantity}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
                <p className="text-xs text-terracotta font-medium">
                  {INR.format(item.price)} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrement(item.id)}
                  className="h-8 w-8 rounded border border-sand flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors"
                  aria-label={`Decrement ${item.name}`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button
                  onClick={() => increment(item.id)}
                  className="h-8 w-8 rounded border border-sand flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors"
                  aria-label={`Increment ${item.name}`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16M8 12h8" />
                  </svg>
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="h-8 w-8 rounded border border-sand/40 flex items-center justify-center text-charcoal hover:bg-terracotta hover:text-white transition-colors"
                  aria-label={`Remove ${item.name}`}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-sand/40 bg-sand/30">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-charcoal">Subtotal</span>
            <span className="text-sm font-bold text-charcoal">{INR.format(subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs text-terracotta font-medium mb-4">
            <span>Shipping</span>
            <span className="text-terracotta font-bold">Free</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-charcoal mb-4">
            <span>Total</span>
            <span>{INR.format(subtotal)}</span>
          </div>
          <button
            onClick={proceedToCheckout}
            className="w-full flex h-12 items-center justify-center rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-[#a85238] transition-colors shadow-lg hover:shadow-terracotta/30"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
