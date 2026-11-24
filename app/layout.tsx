import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinit Studios | Every Moment. A Timeless Story.",
  description: "Wedding, event, portrait and commercial photography in Mumbai.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}