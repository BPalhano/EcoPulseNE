"use client";

import React, { useState } from "react";
import { Radar, Waves, TreePine, Activity, Menu, X, Globe, ExternalLink } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#050B14]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-emerald-500/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            <Radar className="h-5 w-5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight text-white">EcoPulse</span>
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/40">NE</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase">NASA Space Apps Challenge 2026</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-slate-300">
          <a href="#hero" className="rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            A Valsa
          </a>
          <a href="#comparator" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <Radar className="h-4 w-4 text-cyan-400" />
            <span>Raio-X (Óptico vs SAR)</span>
          </a>
          <a href="#basin-map" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <Waves className="h-4 w-4 text-blue-400" />
            <span>Bacia do Jaguaribe</span>
          </a>
          <a href="#metrics" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <Activity className="h-4 w-4 text-rose-400" />
            <span>Indicadores & Dados</span>
          </a>
          <a href="#education" className="flex items-center space-x-1.5 rounded-lg px-3 py-1.5 transition-colors hover:text-white hover:bg-slate-800/60">
            <TreePine className="h-4 w-4 text-emerald-400" />
            <span>Como o Radar Funciona</span>
          </a>
        </nav>

        {/* Action button */}
        <div className="hidden lg:flex items-center space-x-3">
          <a
            href="https://github.com/BPalhano/EcoPulseNE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
          >
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span>Open Source</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-[#050B14]/95 px-4 py-3 md:hidden">
          <nav className="flex flex-col space-y-2 text-sm font-medium">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              A Valsa dos Extremos
            </a>
            <a
              href="#comparator"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              Slider Raio-X (Óptico vs SAR)
            </a>
            <a
              href="#basin-map"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              Mapa da Bacia do Jaguaribe
            </a>
            <a
              href="#metrics"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              Painel de Indicadores Cidadãos
            </a>
            <a
              href="#education"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800/70 hover:text-white"
            >
              Guia: Como o Radar Vê o Mundo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
