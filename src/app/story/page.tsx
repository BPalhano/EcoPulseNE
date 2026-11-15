"use client";

import React from "react";
import Header from "@/components/Header";
import ProjectDescription from "@/components/ProjectDescription";
import EducationalGuide from "@/components/EducationalGuide";
import Footer from "@/components/Footer";

export default function StoryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100">
      <Header />
      <div className="flex-1 w-full">
        <ProjectDescription />
        <EducationalGuide />
      </div>
      <Footer />
    </main>
  );
}
