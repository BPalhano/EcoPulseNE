"use client";

import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import InteractiveBasinMap from "@/components/InteractiveBasinMap";
import SwipeComparator from "@/components/SwipeComparator";
import SARBiophysicalDashboard from "@/components/SARBiophysicalDashboard";
import ProjectDescription from "@/components/ProjectDescription";
import EducationalGuide from "@/components/EducationalGuide";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100 selection:bg-cyan-500 selection:text-black">
        {/* Navigation Bar with EN | PT Toggle */}
        <Header />

        {/* Primary Opening Hero View: Interactive Basin Map & Multidecadal Time Slider */}
        <InteractiveBasinMap />

        {/* High-Fidelity Optical vs. NISAR L-Band Radar X-Ray Slider */}
        <SwipeComparator />

        {/* SAR Biophysical Telemetry Dashboard */}
        <SARBiophysicalDashboard />

        {/* Formal Technical Scientific Framework & Comparison Matrix */}
        <ProjectDescription />

        {/* Accessible 60-Second Educational Radar Guide */}
        <EducationalGuide />

        {/* Open Science Data Citations & Footer */}
        <Footer />
      </main>
    </LanguageProvider>
  );
}
