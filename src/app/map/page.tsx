"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HistoricalSlideDeck from "@/components/HistoricalSlideDeck";
import EcologicalProblematization from "@/components/EcologicalProblematization";
import Footer from "@/components/Footer";

const InteractiveBasinMap = dynamic(
  () => import("@/components/InteractiveBasinMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[750px] lg:h-[820px] w-full flex flex-col items-center justify-center bg-[#050B14] text-cyan-400 font-mono text-sm gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
        <span>Loading GIS Radar Observatory & Rio Jaguaribe Vector...</span>
      </div>
    )
  }
);

export default function MapPage() {
  const [activeYear, setActiveYear] = useState<number>(2026);

  return (
    <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100">
      <Header />
      <div className="flex-1 w-full">
        {/* Main Interactive Radar GIS Observatory */}
        <InteractiveBasinMap 
          externalSelectedYear={activeYear} 
          onYearChange={(year) => setActiveYear(year)} 
        />

        {/* 5-Year Historical Transformation Slide Deck with Map Sync */}
        <HistoricalSlideDeck 
          currentYear={activeYear}
          onSyncWithMap={(year) => setActiveYear(year)} 
        />

        {/* Ecological Problematization & Corrective Solutions Guide */}
        <EcologicalProblematization />
      </div>
      <Footer />
    </main>
  );
}
