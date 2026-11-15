"use client";

import React from "react";
import Header from "@/components/Header";
import SwipeComparator from "@/components/SwipeComparator";
import Footer from "@/components/Footer";

export default function ComparatorPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100">
      <Header />
      <div className="flex-1 w-full">
        <SwipeComparator />
      </div>
      <Footer />
    </main>
  );
}
