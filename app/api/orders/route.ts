import { NextResponse, type NextRequest } from "next/server";

interface CatalogItem {
  id: string;
  name: string;
  price: number;
}

const CATALOG: CatalogItem[] = [
  { id: "size-small", name: "SnifTrail Small", price: 3499 },
  { id: "size-medium", name: "SnifTrail Medium", price: 4299 },
  { id: "size-large", name: "SnifTrail Large", price: 4999 },
  { id: "addon-refill-pack", name: "20-Pod Scent Refill Pack", price: 999 },
  { id: "addon-20-pod-pack", name: "20 Pod Refill Pack", price: 999 },
];

function findPrice(id: string): number | null {
  const item = CATALOG.find((c) => c.id === id);
  return item ? item.price : null;
}

interface Order {
  orderId: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{ id: string; name: string; price: number; quantity: number; lineTotal: number }>;
  total: number;
  createdAt: string;
}

const ordersStore: Order[] = [];

function generateOrderId(): string {
  const seq = (ordersStore.length + 1).toString().padStart(4, "0");
  return `SNF-2026-${seq}`;
}

function validatePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 10) return "Phone number must be 10 digits.";
  return null;
}

function validatePincode(pincode: string): string | null {
  const digits = pincode.replace(/\D/g, "");
  if (digits.length !== 6) return "PIN code must be 6 digits.";
  return null;
}

function validateEmail(email: string): string | null {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Please enter a valid email address.";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      street,
      city,
      state,
      pincode,
      paymentMethod,
      items,
    } = body ?? {};

    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Full name is required.";
    }
    if (!email || typeof email !== "string") {
      errors.email = "Email is required.";
    } else {
      const e = validateEmail(email);
      if (e) errors.email = e;
    }
    if (!phone || typeof phone !== "string") {
      errors.phone = "Phone number is required.";
    } else {
      const e = validatePhone(phone);
      if (e) errors.phone = e;
    }
    if (!street || typeof street !== "string" || street.trim().length === 0) {
      errors.street = "Street address is required.";
    }
    if (!city || typeof city !== "string" || city.trim().length === 0) {
      errors.city = "City is required.";
    }
    if (!state || typeof state !== "string" || state.trim().length === 0) {
      errors.state = "State is required.";
    }
    if (!pincode || typeof pincode !== "string") {
      errors.pincode = "PIN code is required.";
    } else {
      const e = validatePincode(pincode);
      if (e) errors.pincode = e;
    }
    if (!paymentMethod || !["UPI", "card", "cod"].includes(paymentMethod)) {
      errors.paymentMethod = "Please select a payment method (UPI, Card, or Cash on Delivery).";
    }
    if (!Array.isArray(items) || items.length === 0) {
      errors.items = "Your cart must contain at least one item.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", fields: errors }, { status: 400 });
    }

    const resolvedItems: Order["items"] = [];
    let total = 0;

    for (const item of items) {
      const id = item.id;
      const qty = Number(item.quantity) || 1;
      if (qty < 1) {
        return NextResponse.json(
          { error: `Invalid quantity for item ${id}.` },
          { status: 400 }
        );
      }
      const price = findPrice(id);
      if (price === null) {
        return NextResponse.json(
          { error: `Item ${id} not found in catalog.` },
          { status: 400 }
        );
      }
      const lineTotal = price * qty;
      total += lineTotal;
      resolvedItems.push({
        id,
        name: CATALOG.find((c) => c.id === id)?.name || id,
        price,
        quantity: qty,
        lineTotal,
      });
    }

    const orderId = generateOrderId();
    const order: Order = {
      orderId,
      status: "confirmed",
      customer: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.replace(/\D/g, ""),
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.replace(/\D/g, ""),
      },
      items: resolvedItems,
      total,
      createdAt: new Date().toISOString(),
    };

    ordersStore.push(order);

    return NextResponse.json(
      {
        orderId: order.orderId,
        status: order.status,
        customer: order.customer,
        items: order.items,
        total: order.total,
        createdAt: order.createdAt,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const order = ordersStore.find((o) => o.orderId === id);
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json(order);
  }

  const sorted = [...ordersStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted);
}
