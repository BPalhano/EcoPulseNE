import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "EcoPulse NE | The Drought & Tidal Waltz",
  description: "NASA Space Apps Challenge 2026 - Tracking extreme droughts in Caatinga and coastal mangrove transformation using NISAR SAR radar remote sensing.",
  keywords: ["NISAR", "SAR", "Caatinga", "Mangrove", "Space Apps Challenge", "NASA", "Remote Sensing", "Carcinicultura", "Jaguaribe"],
  authors: [{ name: "EcoPulse NE Team" }],
  openGraph: {
    title: "EcoPulse NE - The Drought & Tidal Waltz",
    description: "Multi-sensor radar observatory bridging Caatinga megadroughts and coastal mangrove crises.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#050B14] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
