"use client";

import React, { useState } from "react";
import { Radar, Waves, Activity, Menu, X, Globe, Layers, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#050B14]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-emerald-500/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Radar className="h-5 w-5 text-cyan-400 animate-spin" style={{ animationDuration: "14s" }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-white">EcoPulse</span>
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/40">NE</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase">
              {t("NASA Space Apps Challenge 2026", "NASA Space Apps Challenge 2026")}
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-medium text-slate-300">
          <a href="#interactive-map" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <Waves className="h-4 w-4 text-cyan-400" />
            <span>{t("Basin Map & Time Slider", "Mapa da Bacia & Linha do Tempo")}</span>
          </a>
          <a href="#xray-comparator" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <Layers className="h-4 w-4 text-amber-400" />
            <span>{t("SAR X-Ray Slider", "Slider Raio-X SAR")}</span>
          </a>
          <a href="#biophysical-dashboard" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <Activity className="h-4 w-4 text-rose-400" />
            <span>{t("SAR Biophysical Telemetry", "Telemetria Biofísica SAR")}</span>
          </a>
          <a href="#project-details" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <span>{t("Scientific Framework", "Estrutura Científica")}</span>
          </a>
        </nav>

        {/* Controls: Language Toggle & Github */}
        <div className="flex items-center space-x-3">
          
          {/* Language Toggle Button */}
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900/90 p-1 text-xs font-bold shadow-inner">
            <button
              onClick={() => setLang("en")}
              className={`rounded px-2 py-1 transition-all ${
                lang === "en"
                  ? "bg-cyan-500 text-black shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("pt")}
              className={`rounded px-2 py-1 transition-all ${
                lang === "pt"
                  ? "bg-cyan-500 text-black shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              PT
            </button>
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/BPalhano/EcoPulseNE"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
          >
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span>GitHub</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-[#050B14]/98 px-4 py-3 md:hidden">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#interactive-map"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              {t("Basin Map & Time Slider", "Mapa da Bacia & Linha do Tempo")}
            </a>
            <a
              href="#xray-comparator"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              {t("SAR X-Ray Slider", "Slider Raio-X SAR")}
            </a>
            <a
              href="#biophysical-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              {t("SAR Biophysical Telemetry", "Telemetria Biofísica SAR")}
            </a>
            <a
              href="#project-details"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              {t("Scientific Framework", "Estrutura Científica")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
