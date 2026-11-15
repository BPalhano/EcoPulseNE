"use client";

import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
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
  return (
    <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100">
      <Header />
      <div className="flex-1 w-full">
        <InteractiveBasinMap />
      </div>
      <Footer />
    </main>
  );
}
