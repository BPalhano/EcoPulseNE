"use client";

import React, { useState } from "react";
import { BASIN_POINTS, BasinPoint } from "@/data/mockData";
import { MapPin, Waves, TreePine, Droplets, Info, Compass, ShieldAlert } from "lucide-react";

export default function BasinMap() {
  const [selectedPoint, setSelectedPoint] = useState<BasinPoint>(BASIN_POINTS[2]); // Default Aracati
  const [activeLayer, setActiveLayer] = useState<string>("all");

  return (
    <section id="basin-map" className="py-16 lg:py-24 border-b border-slate-800/60 bg-[#050B14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title & Context */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1 text-xs font-semibold text-blue-300 mb-4">
            <Compass className="h-3.5 w-3.5 text-blue-400" />
            <span>Área Geográfica Piloto: A Rota Jaguaribe</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            A Bacia do Rio Jaguaribe: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-blue-400 to-cyan-400">Do Sertão ao Litoral</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Com mais de 75.000 km² (50% do território do Ceará), a bacia do Rio Jaguaribe conecta a Caatinga hiper-seca 
            aos maiores reservatórios do semiárido e deságua no maior polo de carcinicultura do Brasil.
          </p>
        </div>

        {/* Main Grid: Interactive Map Schematic on Left + Live Sensor Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Visualizer (Left Column - 7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 shadow-2xl relative overflow-hidden">
            
            {/* Layer controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4 text-xs">
              <span className="text-slate-400 font-semibold flex items-center space-x-1.5">
                <Waves className="h-3.5 w-3.5 text-cyan-400" />
                <span>Camadas Temáticas:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Visão Completa" },
                  { id: "caatinga", label: "Biomassa Caatinga" },
                  { id: "water", label: "Açudes (ANA/SAR)" },
                  { id: "mangrove", label: "Mangue & Viveiros" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveLayer(l.id)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                      activeLayer === l.id
                        ? "bg-cyan-500 text-black font-bold"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Schematic Basin Canvas */}
            <div className="relative h-[420px] w-full rounded-xl bg-gradient-to-b from-[#091528] via-[#050D1A] to-[#040812] border border-slate-800 overflow-hidden flex items-center justify-center">
              
              {/* Background grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:30px_30px]" />
              
              {/* SVG Basin River Vector */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 600 420">
                <defs>
                  <linearGradient id="riverGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0284C7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* River Flow Path: From SW (Inhamuns) to NE (Aracati) */}
                <path
                  d="M 120 340 Q 200 300 260 250 T 360 170 Q 440 120 510 70"
                  fill="none"
                  stroke="url(#riverGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                />

                {/* Tributaries */}
                <path
                  d="M 90 280 Q 180 290 260 250"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
                <path
                  d="M 330 260 Q 360 210 360 170"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />

                {/* Ocean Coastline at top right */}
                <path
                  d="M 440 30 Q 520 70 590 120"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="3"
                  opacity="0.5"
                />
                <text x="500" y="45" fill="#38BDF8" fontSize="10" fontWeight="bold">OCEANO ATLÂNTICO</text>
                <text x="60" y="380" fill="#F59E0B" fontSize="10" fontWeight="bold">SERTÃO DOS INHAMUNS</text>
              </svg>

              {/* Hotspot 1: Inhamuns */}
              <button
                onClick={() => setSelectedPoint(BASIN_POINTS[0])}
                className={`group absolute left-[18%] bottom-[16%] flex flex-col items-center transition-all ${
                  selectedPoint.id === "inhamuns" ? "scale-125 z-30" : "opacity-80 hover:opacity-100 hover:scale-110"
                }`}
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-black font-extrabold text-xs shadow-[0_0_15px_rgba(245,158,11,0.8)] border-2 border-white">
                  1
                </div>
                <span className="mt-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30 whitespace-nowrap">
                  Inhamuns (Tauá)
                </span>
              </button>

              {/* Hotspot 2: Castanhao */}
              <button
                onClick={() => setSelectedPoint(BASIN_POINTS[1])}
                className={`group absolute left-[55%] top-[38%] flex flex-col items-center transition-all ${
                  selectedPoint.id === "castanhao" ? "scale-125 z-30" : "opacity-80 hover:opacity-100 hover:scale-110"
                }`}
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white font-extrabold text-xs shadow-[0_0_15px_rgba(59,130,246,0.8)] border-2 border-white">
                  2
                </div>
                <span className="mt-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-500/30 whitespace-nowrap">
                  Açude Castanhão
                </span>
              </button>

              {/* Hotspot 3: Aracati */}
              <button
                onClick={() => setSelectedPoint(BASIN_POINTS[2])}
                className={`group absolute right-[12%] top-[12%] flex flex-col items-center transition-all ${
                  selectedPoint.id === "aracati" ? "scale-125 z-30" : "opacity-80 hover:opacity-100 hover:scale-110"
                }`}
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(0,229,255,1)] border-2 border-white animate-pulse">
                  3
                </div>
                <span className="mt-1 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-500/50 whitespace-nowrap">
                  Foz Aracati (Mangues)
                </span>
              </button>

              {/* Dynamic legend */}
              <div className="absolute bottom-3 right-3 rounded-lg bg-black/80 border border-slate-800 p-2 text-[10px] text-slate-300 space-y-1 backdrop-blur-md">
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>1. Caatinga & Seca</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span>2. Barramento Central</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span>3. Estuário & Carcinicultura</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 text-center">
              💡 Clique nos pontos numerados (1, 2, 3) ao longo do rio para inspecionar os diagnósticos do radar.
            </p>
          </div>

          {/* Point Inspector Card (Right Column - 5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm">
            
            {/* Header of selected point */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="inline-block rounded bg-cyan-500/20 px-2 py-0.5 text-[11px] font-bold text-cyan-300 border border-cyan-500/30 mb-1">
                  {selectedPoint.role}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedPoint.name}</h3>
                <p className="text-xs text-amber-400 font-medium">{selectedPoint.biome}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-400 border border-slate-700">
                <MapPin className="h-5 w-5" />
              </div>
            </div>

            {/* Point Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {selectedPoint.description}
            </p>

            {/* Metrics List */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Métricas de Sensoriamento Atual
              </span>
              {selectedPoint.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-slate-950/70 border border-slate-800/80 px-3.5 py-2.5 text-xs"
                >
                  <span className="text-slate-300">{m.label}</span>
                  <span className={`font-mono font-bold text-sm ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>

            {/* Radar Science Insight Box */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-4">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1.5">
                <Info className="h-4 w-4" />
                <span>Diagnóstico por Radar SAR</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedPoint.sarInsight}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
