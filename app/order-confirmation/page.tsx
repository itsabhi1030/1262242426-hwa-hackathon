"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface StoredOrder {
  orderId: string;
  status: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    lineTotal: number;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const [order] = useState<StoredOrder | null>(() => {
    try {
      const raw = localStorage.getItem("snift_last_order");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const router = useRouter();

  useEffect(() => {
    if (!order) {
      router.push("/");
    }
  }, [order, router]);

  if (!order) {
    return null;
  }

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-white mx-auto mb-4">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-charcoal mb-2">Order Confirmed</h2>
          <p className="text-charcoal/60">Thank you for your order!</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-sand/40 shadow-lg mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-charcoal text-lg">Order ID</h3>
              <p className="font-mono text-terracotta font-bold">
                {order.orderId}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-sand text-terracotta text-xs font-bold">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="border border-sand/30 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-charcoal mb-4">Shipping Address</h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              {order.customer.name}<br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} -
              {order.shippingAddress.pincode}<br />
              {order.customer.phone}
            </p>
          </div>

          <h3 className="font-bold text-charcoal mb-4">Itemized Receipt</h3>
          <div className="space-y-3 mb-6">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b border-sand/30 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">
                    {item.name}
                  </p>
                  <p className="text-xs text-charcoal/50">
                    {item.quantity} x {INR.format(item.price)}
                  </p>
                </div>
                <span className="text-sm font-bold text-charcoal">
                  {INR.format(item.lineTotal)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-base font-bold text-charcoal pt-4 border-t border-sand/40">
            <span>Total</span>
            <span>{INR.format(order.total)}</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={() => router.push("/")}
            className="flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-terracotta text-white font-semibold text-sm shadow-lg hover:bg-[#a85238] transition-colors"
          >
            Back to Store
          </button>
          <Link
            href="/"
            className="text-sm text-charcoal/60 hover:text-terracotta transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
