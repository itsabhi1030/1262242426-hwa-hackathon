import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnifTrail — Battery-Free Mechanical Dog Enrichment Toy",
  description:
    "100% battery-free, wind-up mechanical enrichment toy for dogs left home alone. 90 minutes of calm play. Free shipping across India.",
  openGraph: {
    title: "SnifTrail — Battery-Free Mechanical Dog Enrichment Toy",
    description: "90 minutes of calm and battery-free play while you are away.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: React.PropsWithChildren<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
