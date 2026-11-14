"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sliders, Eye, AlertTriangle, CheckCircle2, Sparkles, Layers, Info } from "lucide-react";

interface Scenario {
  id: string;
  titleEn: string;
  titlePt: string;
  location: string;
  coords: string;
  opticalDescEn: string;
  opticalDescPt: string;
  sarDescEn: string;
  sarDescPt: string;
  radarPhysicsEn: string;
  radarPhysicsPt: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "aracati",
    titleEn: "Aracati Estuary — Sub-canopy Tidal Flooding & Aquaculture",
    titlePt: "Estuário de Aracati — Maré sob Manguezal & Viveiros de Aquicultura",
    location: "Aracati / Fortim, Ceará",
    coords: "-4.42° S, -37.76° W",
    opticalDescEn: "Sentinel-2 True Color (RGB 4-3-2): Displays a uniform green forest canopy and coastal clouds. It is optically impossible to tell whether the tide is submerged beneath the trees, and shallow aquaculture ponds are visually confused with natural mudflats.",
    opticalDescPt: "Sentinel-2 Cor Natural (RGB 4-3-2): Exibe apenas uma copa florestal verde uniforme e nuvens costeiras. É opticamente impossível saber se a maré está submersa sob as árvores, e tanques rasos de camarão se confundem com várzeas naturais.",
    sarDescEn: "NISAR L-band Polarimetric (Pauli RGB): Microwaves penetrate the leafy canopy. HH polarization lights up in vibrant Red/Magenta where tidal water meets mangrove trunks (Double-Bounce). Calm aquaculture ponds appear as pitch-black polygons (Specular Reflection) framed by bright earthen dykes.",
    sarDescPt: "NISAR Banda L Polarimétrica (RGB Pauli): O feixe penetra a folhagem. A polarização HH acende em Vermelho/Magenta onde a maré atinge os troncos de mangue (Double-Bounce). Tanques calmos surgem como polígonos pretos (Reflexão Especular) contornados por diques brilhantes.",
    radarPhysicsEn: "Double-Bounce (HH-VV) on flooded roots + Specular Reflection on still ponds",
    radarPhysicsPt: "Double-Bounce (diedro) em raízes alagadas + Reflexão Especular nos tanques"
  },
  {
    id: "caatinga",
    titleEn: "Sertão dos Inhamuns — Caatinga Severe Drought vs. Dormancy",
    titlePt: "Sertão dos Inhamuns — Caatinga em Seca Severa vs. Dormência",
    location: "Tauá, Ceará (Headwaters)",
    coords: "-5.90° S, -40.29° W",
    opticalDescEn: "Sentinel-2 NDVI & Optical: The landscape appears completely dead and grey due to deciduous leaf-loss. Conventional satellite algorithms frequently misclassify this seasonal adaptation as complete forest death or illegal clear-cutting.",
    opticalDescPt: "Sentinel-2 NDVI & Óptico: A paisagem parece morta e cinzenta devido à perda de folhas (caducifólia). Algoritmos ópticos convencionais frequentemente confundem essa dormência com desmatamento ou morte total da mata.",
    sarDescEn: "NISAR L-band HV Cross-Polarization: The 24 cm wavelength passes through the bare air and directly interacts with the solid woody stems and branches (Volume Scattering). Living standing biomass glows in emerald green, separating dormant forest from actual cleared ground.",
    sarDescPt: "NISAR Banda L em Polarização Cruzada HV: O comprimento de onda de 24 cm interage diretamente com os troncos e galhos lenhosos (Espalhamento Volumétrico). A madeira viva brilha em verde-esmeralda, provando que a floresta está em dormência segura.",
    radarPhysicsEn: "Volume Scattering (HV/VH) on rigid standing woody architecture",
    radarPhysicsPt: "Espalhamento Volumétrico (HV/VH) na arquitetura lenhosa em pé"
  }
];

export default function SwipeComparator() {
  const { lang, t } = useLanguage();
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
    <section id="xray-comparator" className="py-16 lg:py-24 border-b border-slate-800/60 bg-[#070E1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-4">
            <Sliders className="h-3.5 w-3.5 text-amber-400" />
            <span>{t("Interactive Sensor Comparison", "Comparador Interativo de Sensores")}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            {t("The SAR X-Ray Slider: ", "O Slider Raio-X SAR: ")}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400">
              {t("Optical Satellite vs. Polarimetric Radar", "Satélite Óptico vs. Radar Polarimétrico")}
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              "Drag the central handle to experience how active radar penetrates the surface. Compare what passive optical cameras hide with what NISAR's microwave frequencies reveal.",
              "Arraste a barra central para experimentar como o radar ativo penetra a superfície. Compare o que as câmeras ópticas escondem com o que as micro-ondas do NISAR revelam."
            )}
          </p>

          {/* Scenario Selector Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedScenario(s);
                  setSliderPosition(50);
                }}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  selectedScenario.id === s.id
                    ? "bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                    : "border border-slate-700 bg-slate-900/80 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {lang === "en" ? s.titleEn : s.titlePt}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Comparator Stage */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-700 bg-slate-950 shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Top Bar with coordinates and sensors */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-cyan-300 font-bold">{selectedScenario.location} ({selectedScenario.coords})</span>
            </div>
            <div className="flex items-center space-x-4 text-[11px]">
              <span className="text-amber-300 font-bold">◄ {t("LEFT: Sentinel-2 Optical (RGB)", "ESQUERDA: Sentinel-2 Óptico (RGB)")}</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-400 font-bold">{t("RIGHT: NISAR L-band SAR (Pauli RGB)", "DIREITA: NISAR Banda L SAR (RGB Pauli)")} ►</span>
            </div>
          </div>

          {/* Slider Canvas Container */}
          <div
            className="relative h-[420px] sm:h-[500px] w-full select-none cursor-ew-resize overflow-hidden"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* UNDER LAYER: SAR RADAR SIMULATION (Right Side) */}
            <div className="absolute inset-0 bg-[#050D1A] overflow-hidden">
              
              {/* Detailed Simulated SAR Scene */}
              {selectedScenario.id === "aracati" ? (
                // Aracati SAR Scene (Mangroves + Shrimp Ponds)
                <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                  {/* Dark Ocean & River Background */}
                  <rect width="1000" height="500" fill="#040810" />

                  {/* Ocean & Estuary water with subtle radar capillary roughness (Blue/Cyan speckle) */}
                  <path d="M 0 0 L 1000 0 L 1000 120 Q 700 140 500 200 T 200 350 L 0 500 Z" fill="#061A2B" opacity="0.8" />
                  
                  {/* Terrestrial Vegetation (Green Volume Scattering Speckle) */}
                  <rect x="0" y="280" width="1000" height="220" fill="#0B2E1C" opacity="0.85" />
                  
                  {/* Aquaculture Shrimp Ponds (Totally Black Specular Reflection Rectangles) */}
                  <g fill="#020408" stroke="#00E5FF" strokeWidth="2.5" opacity="0.95">
                    <rect x="420" y="160" width="90" height="55" rx="3" />
                    <rect x="520" y="150" width="110" height="65" rx="3" />
                    <rect x="640" y="170" width="85" height="50" rx="3" />
                    <rect x="450" y="225" width="100" height="50" rx="3" />
                    <rect x="560" y="225" width="95" height="60" rx="3" />
                    <rect x="665" y="230" width="80" height="55" rx="3" />
                    <rect x="735" y="165" width="90" height="60" rx="3" />
                  </g>

                  {/* Mangrove Tidal Fringe with Intensely Glowing RED/MAGENTA Double-Bounce */}
                  <path
                    d="M 280 210 Q 380 180 500 210 T 750 150 Q 880 130 950 110"
                    fill="none"
                    stroke="#FF0055"
                    strokeWidth="18"
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_12px_rgba(255,0,85,0.9)]"
                    opacity="0.95"
                  />
                  <path
                    d="M 320 230 Q 420 200 520 220 T 780 170"
                    fill="none"
                    stroke="#FF3366"
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]"
                    opacity="0.9"
                  />

                  {/* Sand dunes (diffuse low backscatter - grey/blue) */}
                  <path d="M 800 0 L 1000 0 L 1000 200 Z" fill="#152636" opacity="0.7" />

                  {/* Radar Speckle Overlay Filter */}
                  <circle cx="500" cy="250" r="400" fill="none" stroke="#00E5FF" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" />
                </svg>
              ) : (
                // Caatinga SAR Scene (Woody Volume Scattering in Dry Season)
                <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                  {/* Dry Rocky Soil (Dark Blue/Grey Surface Scattering) */}
                  <rect width="1000" height="500" fill="#0A111E" />

                  {/* Persistent Woody Caatinga Forest Canopy (Vibrant Green HV Volume Scattering) */}
                  <g fill="#0D472B" stroke="#10B981" strokeWidth="0.8" opacity="0.9">
                    <circle cx="200" cy="180" r="140" fill="#0F5132" />
                    <circle cx="450" cy="220" r="170" fill="#13653F" />
                    <circle cx="750" cy="190" r="190" fill="#0F5132" />
                    <circle cx="300" cy="360" r="150" fill="#13653F" />
                    <circle cx="650" cy="380" r="160" fill="#0F5132" />
                  </g>

                  {/* Riverbed (Dry Sand = Specular Reflection, Black line) */}
                  <path d="M 50 450 Q 300 300 500 250 T 950 80" fill="none" stroke="#040810" strokeWidth="12" />

                  {/* Cleared Field / Charcoal deforestation scar (Bare Soil, Flat, No Green Volume = Dark Purple) */}
                  <rect x="520" y="270" width="130" height="90" fill="#1E162A" stroke="#7C3AED" strokeWidth="1.5" />
                  <text x="530" y="320" fill="#C4B5FD" fontSize="12" fontWeight="bold">CORTE RASO</text>
                </svg>
              )}

              {/* Top HUD Badge on SAR side */}
              <div className="absolute top-4 right-4 z-10 flex flex-col items-end">
                <div className="rounded-xl bg-black/85 border border-cyan-500/50 px-3.5 py-2 text-right backdrop-blur-md shadow-lg">
                  <div className="flex items-center space-x-1.5 justify-end">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs font-bold text-cyan-300">NISAR L-band SAR Polarimetric</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    {selectedScenario.id === "aracati" 
                      ? "Pauli RGB (Red: Double-Bounce | Green: Volume | Black: Specular)"
                      : "HV Cross-Pol (Green: Living Wood Biomass | Purple: Bare Cleared Soil)"}
                  </div>
                </div>
              </div>

              {/* Bottom Feature Markers on SAR side */}
              <div className="absolute bottom-4 right-4 z-10 flex flex-wrap gap-2 max-w-md justify-end">
                <div className="rounded-lg bg-black/80 border border-rose-500/60 px-3 py-1.5 backdrop-blur-md text-[11px] text-rose-300 font-bold flex items-center space-x-1.5 shadow">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span>{t("Double-Bounce: Sub-canopy Tide", "Double-Bounce: Maré sob Mangue")}</span>
                </div>
                <div className="rounded-lg bg-black/80 border border-cyan-500/60 px-3 py-1.5 backdrop-blur-md text-[11px] text-cyan-300 font-bold flex items-center space-x-1.5 shadow">
                  <span className="h-2 w-2 rounded-full bg-black border border-cyan-400" />
                  <span>{t("Specular: Aquaculture Ponds", "Especular: Viveiros de Camarão")}</span>
                </div>
              </div>

            </div>

            {/* OVER LAYER: OPTICAL SATELLITE (Left Side with Clip Path) */}
            <div
              className="absolute inset-0 bg-[#0E2018] overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              {/* Detailed Simulated Optical Scene */}
              {selectedScenario.id === "aracati" ? (
                // Aracati Optical Scene (Sentinel-2 Natural Color with Clouds)
                <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                  {/* Murky Greenish-Blue Estuary Water */}
                  <rect width="1000" height="500" fill="#1C3F3A" />
                  
                  {/* Ocean & Estuary water */}
                  <path d="M 0 0 L 1000 0 L 1000 120 Q 700 140 500 200 T 200 350 L 0 500 Z" fill="#205047" />

                  {/* Uniform Green Mangrove Canopy (Opaque, cannot see under trees!) */}
                  <rect x="0" y="220" width="1000" height="280" fill="#2D5A27" />

                  {/* Muddy Aquaculture Ponds (Hard to tell apart from shallow mud) */}
                  <g fill="#435E44" stroke="#7A9362" strokeWidth="1.5" opacity="0.8">
                    <rect x="420" y="160" width="90" height="55" rx="2" />
                    <rect x="520" y="150" width="110" height="65" rx="2" />
                    <rect x="640" y="170" width="85" height="50" rx="2" />
                    <rect x="450" y="225" width="100" height="50" rx="2" />
                    <rect x="560" y="225" width="95" height="60" rx="2" />
                    <rect x="665" y="230" width="80" height="55" rx="2" />
                  </g>

                  {/* White Coastal Clouds Obscuring Mangroves & Ponds */}
                  <ellipse cx="600" cy="190" rx="180" ry="70" fill="#FFFFFF" opacity="0.65" filter="blur(8px)" />
                  <ellipse cx="720" cy="220" rx="140" ry="60" fill="#FFFFFF" opacity="0.6" filter="blur(6px)" />
                  <ellipse cx="350" cy="280" rx="160" ry="65" fill="#FFFFFF" opacity="0.55" filter="blur(7px)" />

                  {/* Sand Dunes of Canoa Quebrada */}
                  <path d="M 800 0 L 1000 0 L 1000 200 Z" fill="#D4B483" />
                </svg>
              ) : (
                // Caatinga Optical Scene (Dry, Grey, Desiccated landscape)
                <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                  {/* Parched Dusty Earth (Dry Brown/Grey) */}
                  <rect width="1000" height="500" fill="#5A4738" />

                  {/* Dry Deciduous Leafless Scrub (Greyish Brown, looks completely dead in RGB) */}
                  <rect x="0" y="0" width="1000" height="500" fill="#6B5B4D" opacity="0.8" />
                  <circle cx="200" cy="180" r="140" fill="#58493D" opacity="0.6" />
                  <circle cx="450" cy="220" r="170" fill="#514237" opacity="0.6" />
                  <circle cx="750" cy="190" r="190" fill="#58493D" opacity="0.6" />

                  {/* Dry Sandy Riverbed */}
                  <path d="M 50 450 Q 300 300 500 250 T 950 80" fill="none" stroke="#8C7A6B" strokeWidth="12" />

                  {/* Haze / Smoke from burning */}
                  <ellipse cx="400" cy="200" rx="280" ry="90" fill="#B3A296" opacity="0.35" filter="blur(10px)" />
                </svg>
              )}

              {/* Top HUD Badge on Optical side */}
              <div className="absolute top-4 left-4 z-10 flex flex-col items-start">
                <div className="rounded-xl bg-black/85 border border-amber-500/50 px-3.5 py-2 backdrop-blur-md shadow-lg">
                  <div className="flex items-center space-x-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300">Sentinel-2 MSI Optical Camera</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-0.5">
                    {selectedScenario.id === "aracati" 
                      ? "Natural RGB (Blocked by coastal clouds; canopy opaque)"
                      : "Natural RGB (Confused by deciduous leaf-loss)"}
                  </div>
                </div>
              </div>

              {/* Bottom Feature Markers on Optical side */}
              <div className="absolute bottom-4 left-4 z-10 max-w-xs">
                <div className="rounded-lg bg-black/80 border border-amber-500/60 px-3 py-1.5 backdrop-blur-md text-[11px] text-amber-300 font-semibold shadow">
                  ⚠️ {t("Canopy & clouds blind water & soil", "Copas e nuvens cegam a água e o solo")}
                </div>
              </div>

            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-white to-cyan-400 shadow-[0_0_20px_rgba(0,229,255,1)] z-30 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-black shadow-[0_0_25px_rgba(0,229,255,0.8)] font-black text-sm border-2 border-white">
                ↔
              </div>
            </div>

          </div>

          {/* Quick preset buttons bar */}
          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs">
            <span className="text-slate-400 font-medium">
              {t("Slide handle or select preset:", "Arraste ou escolha um ajuste rápido:")}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSliderPosition(15)}
                className="rounded-lg px-3 py-1 text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
              >
                {t("Show SAR (85%)", "Ver SAR (85%)")}
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className="rounded-lg px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
              >
                50 / 50
              </button>
              <button
                onClick={() => setSliderPosition(85)}
                className="rounded-lg px-3 py-1 text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700"
              >
                {t("Show Optical (85%)", "Ver Óptico (85%)")}
              </button>
            </div>
          </div>
        </div>

        {/* Analytical Insight Breakdown Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          
          <div className="rounded-xl border border-amber-500/30 bg-slate-900/60 p-5">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{t("Optical Sensor Bottleneck", "Gargalo do Satélite Óptico")}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === "en" ? selectedScenario.opticalDescEn : selectedScenario.opticalDescPt}
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-slate-900/60 p-5">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm mb-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t("SAR Microwave Solution", "Solução por Micro-ondas SAR")}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lang === "en" ? selectedScenario.sarDescEn : selectedScenario.sarDescPt}
            </p>
            <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] font-mono text-cyan-300">
              <strong>{t("Physics: ", "Física: ")}</strong>
              {lang === "en" ? selectedScenario.radarPhysicsEn : selectedScenario.radarPhysicsPt}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
