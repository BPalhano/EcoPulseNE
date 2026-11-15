"use client";

import React from "react";
import Header from "@/components/Header";
import SARBiophysicalDashboard from "@/components/SARBiophysicalDashboard";
import Footer from "@/components/Footer";

export default function TelemetryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100">
      <Header />
      <div className="flex-1 w-full">
        <SARBiophysicalDashboard />
      </div>
      <Footer />
    </main>
  );
}
