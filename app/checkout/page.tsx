"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "UPI" | "card" | "cod";
}

interface FieldErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const { items, subtotal, itemCount, clear } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "UPI",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (pathname === "/checkout" && itemCount === 0) {
      router.push("/");
    }
  }, [pathname, itemCount, router]);

  const validate = (): boolean => {
    const e: FieldErrors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    else if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) e.email = "Email is required.";
    else if (!emailRe.test(form.email)) e.email = "Enter a valid email address.";

    const digits = form.phone.replace(/\D/g, "");
    if (!form.phone) e.phone = "Phone number is required.";
    else if (digits.length !== 10) e.phone = "Phone number must be 10 digits.";

    if (!form.street.trim()) e.street = "Street address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.state.trim()) e.state = "State is required.";
    const pinDigits = form.pincode.replace(/\D/g, "");
    if (!form.pincode) e.pincode = "PIN code is required.";
    else if (pinDigits.length !== 6) e.pincode = "PIN code must be 6 digits.";

    if (!["UPI", "card", "cod"].includes(form.paymentMethod)) {
      e.paymentMethod = "Select a payment method.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((it) => ({ id: it.id, quantity: it.quantity })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fields) {
          setErrors(data.fields);
        } else {
          setServerError(data.error || "Something went wrong.");
        }
        setSubmitting(false);
        return;
      }

      localStorage.setItem(
        "snift_last_order",
        JSON.stringify({
          ...data,
          customer: form,
          shippingAddress: {
            street: form.street,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
        })
      );
      clear();
      router.push("/order-confirmation");
    } catch {
      setServerError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  const fieldError = (name: keyof FormData) => errors[name];

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-charcoal mb-2">Checkout</h2>
          <p className="text-charcoal/60">
            Review your order and enter delivery details.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order summary */}
          <div className="bg-white p-6 rounded-2xl border border-sand/40">
            <h3 className="font-bold text-charcoal mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-sand/30 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-charcoal">{item.name}</p>
                    <p className="text-xs text-charcoal/50">
                      {item.quantity} x {INR.format(item.price)}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-charcoal">
                    {INR.format(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-bold text-charcoal mb-2">
              <span>Subtotal</span>
              <span>{INR.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-terracotta font-medium mb-4">
              <span>Shipping</span>
              <span className="font-bold">Free</span>
            </div>
            <div className="flex justify-between text-base font-bold text-charcoal pt-4 border-t border-sand/40">
              <span>Total</span>
              <span>{INR.format(subtotal)}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal block">
                  Full Name
                </label>
                <input
                  type="text"
                  className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta ${
                    fieldError("name") ? "border-red-500" : "border-sand"
                  }`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rahul Sharma"
                />
                {fieldError("name") && (
                  <p className="text-xs text-red-600">{fieldError("name")}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal block">
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta ${
                    fieldError("email") ? "border-red-500" : "border-sand"
                  }`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="rahul@example.com"
                />
                {fieldError("email") && (
                  <p className="text-xs text-red-600">{fieldError("email")}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal block">
                Phone Number
              </label>
              <input
                type="tel"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta ${
                  fieldError("phone") ? "border-red-500" : "border-sand"
                }`}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="9876543210"
                maxLength={10}
              />
              {fieldError("phone") && (
                <p className="text-xs text-red-600">{fieldError("phone")}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal block">
                Street Address
              </label>
              <input
                type="text"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta ${
                  fieldError("street") ? "border-red-500" : "border-sand"
                }`}
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                placeholder="123 MG Road"
              />
              {fieldError("street") && (
                <p className="text-xs text-red-600">{fieldError("street")}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal block">
                  City
                </label>
                <input
                  type="text"
                  className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta ${
                    fieldError("city") ? "border-red-500" : "border-sand"
                  }`}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Mumbai"
                />
                {fieldError("city") && (
                  <p className="text-xs text-red-600">{fieldError("city")}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-charcoal block">
                  State
                </label>
                <input
                  type="text"
                  className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta ${
                    fieldError("state") ? "border-red-500" : "border-sand"
                  }`}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="Maharashtra"
                />
                {fieldError("state") && (
                  <p className="text-xs text-red-600">{fieldError("state")}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal block">
                PIN Code
              </label>
              <input
                type="text"
                className={`w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta ${
                  fieldError("pincode") ? "border-red-500" : "border-sand"
                }`}
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                placeholder="400001"
                maxLength={6}
              />
              {fieldError("pincode") && (
                <p className="text-xs text-red-600">{fieldError("pincode")}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-charcoal block">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["UPI", "card", "cod"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() =>
                      setForm({ ...form, paymentMethod: method as "UPI" | "card" | "cod" })
                    }
                    className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl border transition-all ${
                      form.paymentMethod === method
                        ? "bg-terracotta text-white border-terracotta shadow-sm"
                        : "bg-white text-charcoal border-sand hover:border-terracotta"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase">
                      {method === "UPI" ? "UPI" : method === "card" ? "Card" : "COD"}
                    </span>
                    <span className="text-[10px] opacity-70">
                      {method === "cod" ? "Cash on Delivery" : method}
                    </span>
                  </button>
                ))}
              </div>
              {fieldError("paymentMethod") && (
                <p className="text-xs text-red-600">
                  {fieldError("paymentMethod")}
                </p>
              )}
            </div>

            {serverError && (
              <div className="p-4 rounded-lg border border-red-500/30 bg-red-50/20 text-red-700 text-sm">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex h-12 items-center justify-center rounded-full bg-terracotta text-white font-semibold text-sm shadow-lg hover:bg-[#a85238] disabled:opacity-70 transition-colors"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
