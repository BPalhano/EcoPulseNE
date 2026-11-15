"use client";

import React from "react";
import Header from "@/components/Header";
import ProjectDescription from "@/components/ProjectDescription";
import EcologicalProblematization from "@/components/EcologicalProblematization";
import EducationalGuide from "@/components/EducationalGuide";
import AuthorshipSection from "@/components/AuthorshipSection";
import Footer from "@/components/Footer";

export default function StoryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100">
      <Header />
      <div className="flex-1 w-full">
        <ProjectDescription />
        <EcologicalProblematization />
        <EducationalGuide />
        <AuthorshipSection />
      </div>
      <Footer />
    </main>
  );
}
