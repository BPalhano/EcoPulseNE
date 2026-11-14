"use client";

import React, { useState } from "react";
import { Eye, Layers, Sparkles, AlertTriangle, CheckCircle2, Sliders } from "lucide-react";

interface Scenario {
  id: string;
  title: string;
  location: string;
  opticalDesc: string;
  sarDesc: string;
  opticalImage: string;
  sarImage: string;
  radarPhenomenon: string;
  decisionImpact: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "mangrove",
    title: "Estuário de Aracati (CE) — Maré sob Manguezal & Carcinicultura",
    location: "Foz do Rio Jaguaribe (-4.42°, -37.76°)",
    opticalDesc: "Imagem Óptica (Sentinel-2 RGB): Enxerga apenas um tapete verde contínuo de folhas e nuvens costeiras dispersas. Não detecta se a maré está alta sob a copa e confunde tanques rasos de camarão com várzeas comuns.",
    sarDesc: "Radar NISAR / SAR (Composição Polarimétrica): O feixe de micro-ondas atravessa o dossel. A polarização HH acende em vermelho vivo onde a maré bate nas raízes de mangue (Double-Bounce), e os viveiros de carcinicultura surgem como polígonos pretos milimétricos (Reflexão Especular).",
    opticalImage: "bg-gradient-to-tr from-emerald-950 via-emerald-800 to-teal-900",
    sarImage: "bg-gradient-to-tr from-[#050B14] via-rose-950/80 to-cyan-950",
    radarPhenomenon: "Double-Bounce (diedro) nas raízes + Reflexão Especular nos tanques",
    decisionImpact: "Permite quantificar a área exata de berçário marinho inundado pela maré e monitorar o avanço de viveiros ilegais de camarão mesmo com céu 100% nublado."
  },
  {
    id: "caatinga",
    title: "Sertão dos Inhamuns (CE) — Seca Extrema na Caatinga",
    location: "Cabeceira do Rio Jaguaribe (-5.90°, -40.29°)",
    opticalDesc: "Imagem Óptica (Sentinel-2 RGB / NDVI): Devido à perda total de folhas das plantas (caducifólia), o sensor óptico vê apenas uma terra cinzenta e estéril. O índice de vegetação despenca a zero, gerando falso alarme de morte total.",
    sarDesc: "Radar NISAR Banda L (Polarização Cruzada HV/VH): As micro-ondas de 24 cm ignoram a ausência de folhas e medem a densidade da madeira viva dos troncos e galhos (Espalhamento Volumétrico). A mata em dormência continua brilhando em verde-esmeralda no radar.",
    opticalImage: "bg-gradient-to-tr from-stone-900 via-amber-950/80 to-stone-800",
    sarImage: "bg-gradient-to-tr from-[#050B14] via-emerald-950 to-emerald-900/90",
    radarPhenomenon: "Volume Scattering (Espalhamento Volumétrico em madeira lenhosa)",
    decisionImpact: "Diferencia dormência sazonal da Caatinga de desmatamento ilegal para carvoejamento, orientando ajuda forrageira de emergência para agricultores familiares."
  }
];

export default function SwipeComparator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  return (
    <section id="comparator" className="py-16 lg:py-24 border-b border-slate-800/60 bg-[#070E1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300 mb-4">
            <Sliders className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ferramenta Interativa de Comparação</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            O Slider "Raio-X": <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400">Óptico vs. Radar SAR</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Arraste a barra central para a esquerda e para a direita e descubra como o radar de micro-ondas (NISAR) 
            penetra nuvens, folhas e escuridão para revelar dados invisíveis aos satélites comuns.
          </p>

          {/* Scenario Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenario(s);
                  setSliderPosition(50);
                }}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                  selectedScenario.id === s.id
                    ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    : "border border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Slider Box */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden">
          
          {/* Top Bar with coordinates */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-cyan-400">{selectedScenario.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="text-amber-400 font-semibold">ESQUERDA: Satélite Óptico (Sentinel-2)</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-400 font-semibold">DIREITA: Radar NISAR / SAR</span>
            </div>
          </div>

          {/* Comparison Container */}
          <div
            className="relative h-[380px] sm:h-[460px] w-full select-none cursor-ew-resize overflow-hidden"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* UNDER LAYER: SAR (Right visible part) */}
            <div className={`absolute inset-0 flex flex-col justify-between p-6 ${selectedScenario.sarImage}`}>
              {/* Simulated SAR Texture / Overlays */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Top info badge on the SAR side */}
              <div className="relative z-10 flex justify-end">
                <div className="rounded-lg bg-black/80 border border-cyan-500/50 px-3 py-1.5 text-right backdrop-blur-md">
                  <div className="text-[11px] font-bold text-cyan-300">NISAR Banda L / Sentinel-1</div>
                  <div className="text-[10px] text-slate-300">Composição Polarimétrica RGB Cidadã</div>
                </div>
              </div>

              {/* Graphic highlights inside SAR simulation */}
              <div className="relative z-10 grid grid-cols-2 gap-3 max-w-md ml-auto mt-auto">
                <div className="rounded-lg bg-black/70 border border-rose-500/40 p-2.5 backdrop-blur-sm">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-rose-300">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Double-Bounce (Maré)</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">Maré detectada sob as copas das árvores de mangue.</div>
                </div>

                <div className="rounded-lg bg-black/70 border border-cyan-500/40 p-2.5 backdrop-blur-sm">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-cyan-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    <span>Viveiros / Açudes</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">Reflexão especular pura (lâmina de água delimitada).</div>
                </div>
              </div>
            </div>

            {/* OVER LAYER: OPTICAL (Left clipped part) */}
            <div
              className={`absolute inset-0 flex flex-col justify-between p-6 ${selectedScenario.opticalImage}`}
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              {/* Simulated Optical Clouds / Textures */}
              <div className="absolute top-10 left-10 w-48 h-24 bg-white/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-16 left-32 w-64 h-32 bg-white/20 rounded-full blur-3xl pointer-events-none" />

              {/* Top info badge on the Optical side */}
              <div className="relative z-10 flex justify-start">
                <div className="rounded-lg bg-black/80 border border-amber-500/50 px-3 py-1.5 backdrop-blur-md">
                  <div className="text-[11px] font-bold text-amber-300">Satélite Óptico (Câmera Comum)</div>
                  <div className="text-[10px] text-slate-300">Sentinel-2 RGB / Falso-cor</div>
                </div>
              </div>

              {/* Graphic highlights inside Optical simulation */}
              <div className="relative z-10 max-w-xs mt-auto">
                <div className="rounded-lg bg-black/70 border border-amber-500/40 p-2.5 backdrop-blur-sm">
                  <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-300">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span>Limitação Óptica</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1">
                    Nuvens e copa opaca bloqueiam a visão da água e do solo.
                  </div>
                </div>
              </div>
            </div>

            {/* The Draggable Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.8)] z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-black shadow-lg font-bold text-xs border-2 border-white">
                ↔
              </div>
            </div>
          </div>

          {/* Quick preset control buttons */}
          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-4 py-2 text-xs">
            <span className="text-slate-400">Ajuste rápido de visualização:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSliderPosition(10)}
                className="rounded px-2.5 py-1 text-[11px] bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                100% SAR
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className="rounded px-2.5 py-1 text-[11px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
              >
                50 / 50
              </button>
              <button
                onClick={() => setSliderPosition(90)}
                className="rounded px-2.5 py-1 text-[11px] bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                100% Óptico
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Explanation Cards Below Slider */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-xl border border-amber-500/20 bg-slate-900/60 p-5">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span>O que a Câmera Óptica Esconde</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedScenario.opticalDesc}
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/60 p-5">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>O que o Radar SAR Revela</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedScenario.sarDesc}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-cyan-300/90 font-mono">
              Física: {selectedScenario.radarPhenomenon}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
