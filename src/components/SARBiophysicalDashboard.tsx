"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Activity, 
  Droplet, 
  ShieldAlert, 
  Radio, 
  Layers, 
  ChevronRight, 
  Info, 
  TrendingUp, 
  Waves, 
  Flame,
  CheckCircle2
} from "lucide-react";

export default function SARBiophysicalDashboard() {
  const { t } = useLanguage();

  // Active analysis preset: Drought Peak (2016) vs Wet Recovery (2024) vs Pre-Dam Baseline (1985)
  const [selectedScenario, setSelectedScenario] = useState<"drought" | "recovery" | "baseline">("drought");
  const [activeTab, setActiveTab] = useState<"polarimetry" | "dielectric" | "insar" | "estuary">("polarimetry");

  const scenarios = {
    baseline: {
      year: "1985",
      titleEn: "Pre-Regulation Natural Flow (1985)",
      titlePt: "Regime Natural Pré-Regulação (1985)",
      dielectric: 14.5,
      penetrationCm: 8,
      moistureVolPct: 28,
      insarCoherence: 0.88,
      damDeformationMm: 0.2,
      surfaceScattering: 25,
      doubleBounce: 45,
      volumeScattering: 30,
      salinityKm: 4.5,
      effluentLoad: "Minimal",
      effluentLoadPt: "Mínima",
      riverDischargeM3s: 280,
      descriptionEn: "Unregulated river pulses flushed coastal estuaries with continuous nutrient transport and low salinity intrusion.",
      descriptionPt: "Pulsos naturais lavavam o estuário com transporte contínuo de nutrientes e baixa intrusão salina."
    },
    drought: {
      year: "2016",
      titleEn: "Peak Megadrought (2012–2017)",
      titlePt: "Ápice da Megaseca (2012–2017)",
      dielectric: 3.4,
      penetrationCm: 28,
      moistureVolPct: 4,
      insarCoherence: 0.94, // High coherence on bare dehydrated ground & dam
      damDeformationMm: -4.8, // Settlement under low hydrostatic pressure
      surfaceScattering: 48, // Specular dry flats & pond beds
      doubleBounce: 14, // Root-water contact drastically decreased
      volumeScattering: 38, // Dormant leafless Caatinga branches
      salinityKm: 32.0,
      effluentLoad: "Elevated Biological Load",
      effluentLoadPt: "Carga Biológica Elevada",
      riverDischargeM3s: 2.1,
      descriptionEn: "Castanhão reservoir depleted to 5.2%. Zero freshwater flushing allowed tidal sea wedge to penetrate 32 km upstream to Jaguaruana, concentrating estuarine effluents.",
      descriptionPt: "Açude Castanhão atingiu 5,2%. Sem vazão doce, a cunha salina avançou 32 km até Jaguaruana, concentrando efluentes na foz de Aracati."
    },
    recovery: {
      year: "2024",
      titleEn: "Recharge & Modern NISAR Baseline (2024–2026)",
      titlePt: "Recarga & Marco Operacional NISAR (2024–2026)",
      dielectric: 11.8,
      penetrationCm: 12,
      moistureVolPct: 22,
      insarCoherence: 0.79,
      damDeformationMm: +1.1,
      surfaceScattering: 32,
      doubleBounce: 36,
      volumeScattering: 32,
      salinityKm: 12.5,
      effluentLoad: "Moderate Buffered",
      effluentLoadPt: "Moderada Amortecida",
      riverDischargeM3s: 65,
      descriptionEn: "Partial reservoir replenishment restored minimum ecological flows, stabilising coastal fringe mangroves while NISAR L+S band dual-polarimetry operational monitoring commences.",
      descriptionPt: "Recarga parcial dos reservatórios garantiu vazão ecológica mínima, estabilizando a franja de mangue enquanto monitoramento operacional NISAR L+S se inicia."
    }
  };

  const curr = scenarios[selectedScenario];

  return (
    <section id="biophysical-dashboard" className="py-16 lg:py-24 border-b border-slate-800 bg-[#060D19]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full border border-rose-500/30 bg-rose-950/30 px-3.5 py-1 text-xs font-semibold text-rose-300 mb-3">
              <Activity className="h-3.5 w-3.5 text-rose-400" />
              <span>{t("Active Microwave Biophysical Metrics", "Métricas Biofísicas de Micro-ondas Ativas")}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              {t("SAR Biophysical Telemetry Dashboard", "Painel de Telemetria Biofísica SAR")}
            </h2>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              {t(
                "Synthetic Aperture Radar quantifies structural biophysics through phase, coherence, polarization, and dielectric properties — unveiling dynamics completely invisible to optical cameras.",
                "O Radar de Abertura Sintética quantifica a biofísica estrutural por fase, coerência, polarização e propriedades dielétricas — revelando dinâmicas invisíveis a câmeras ópticas."
              )}
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900/90 p-1.5 shadow-lg">
            {(["baseline", "drought", "recovery"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedScenario(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  selectedScenario === s
                    ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-950/50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t(scenarios[s].titleEn.split(" ")[0] + " " + scenarios[s].year, scenarios[s].titlePt.split(" ")[0] + " " + scenarios[s].year)}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Interactive KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          
          {/* Card 1: Soil Dielectric Constant */}
          <div 
            onClick={() => setActiveTab("dielectric")}
            className={`cursor-pointer rounded-2xl border p-5 transition-all ${
              activeTab === "dielectric"
                ? "border-cyan-500/80 bg-cyan-950/20 shadow-[0_0_20px_rgba(0,229,255,0.15)] ring-1 ring-cyan-500"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-cyan-400 flex items-center space-x-1">
                <Droplet className="h-3.5 w-3.5" />
                <span>{t("Soil Dielectric Constant", "Constante Dielétrica")}</span>
              </span>
              <span className="font-mono text-[10px] bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded">ε (real)</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white">{curr.dielectric}</span>
              <span className="text-xs text-slate-400">/ 80</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 via-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${(curr.dielectric / 30) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
              <span>{t("Dry (3.0)", "Seco (3,0)")}</span>
              <span className="text-cyan-300 font-bold">{curr.moistureVolPct}% {t("Moisture", "Umidade")}</span>
              <span>{t("Wet (30+)", "Saturado (30+)")}</span>
            </div>
          </div>

          {/* Card 2: InSAR Coherence & Stability */}
          <div 
            onClick={() => setActiveTab("insar")}
            className={`cursor-pointer rounded-2xl border p-5 transition-all ${
              activeTab === "insar"
                ? "border-emerald-500/80 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-emerald-400 flex items-center space-x-1">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>{t("InSAR Dam Stability", "Estabilidade InSAR Açude")}</span>
              </span>
              <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded">γ Coherence</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white">{curr.insarCoherence}</span>
              <span className="text-xs text-emerald-400 font-mono">{curr.damDeformationMm > 0 ? `+${curr.damDeformationMm}` : curr.damDeformationMm} mm/yr</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rose-500 to-emerald-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${curr.insarCoherence * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
              <span>{t("Decorrelated (0)", "Decorrência (0)")}</span>
              <span className="text-emerald-300 font-bold">{t("Stable Dam Structure", "Estrutura Estável")}</span>
              <span>{t("Rigid (1.0)", "Rígido (1.0)")}</span>
            </div>
          </div>

          {/* Card 3: Pauli Double-Bounce */}
          <div 
            onClick={() => setActiveTab("polarimetry")}
            className={`cursor-pointer rounded-2xl border p-5 transition-all ${
              activeTab === "polarimetry"
                ? "border-rose-500/80 bg-rose-950/20 shadow-[0_0_20px_rgba(244,63,94,0.15)] ring-1 ring-rose-500"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-rose-400 flex items-center space-x-1">
                <Layers className="h-3.5 w-3.5" />
                <span>{t("Double-Bounce (Pd)", "Reflexão Dupla (Pd)")}</span>
              </span>
              <span className="font-mono text-[10px] bg-rose-500/10 text-rose-300 px-1.5 py-0.5 rounded">HH-VV</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white">{curr.doubleBounce}%</span>
              <span className="text-xs text-slate-400">{t("of total power", "da potência")}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 via-emerald-400 to-rose-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${curr.doubleBounce}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
              <span>{t("Tidal Flooding", "Inundação Maré")}</span>
              <span className="text-rose-300 font-bold">{t("Mangrove Roots", "Raízes de Mangue")}</span>
            </div>
          </div>

          {/* Card 4: Estuarine Salinity Wedge */}
          <div 
            onClick={() => setActiveTab("estuary")}
            className={`cursor-pointer rounded-2xl border p-5 transition-all ${
              activeTab === "estuary"
                ? "border-amber-500/80 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-amber-400 flex items-center space-x-1">
                <Waves className="h-3.5 w-3.5" />
                <span>{t("Salinity Intrusion Wedge", "Cunha Salina a Montante")}</span>
              </span>
              <span className="font-mono text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded">Estuary km</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white">{curr.salinityKm}</span>
              <span className="text-xs text-amber-400">km {t("upstream", "rio acima")}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${(curr.salinityKm / 35) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-2">
              <span>{t("Coast (0 km)", "Litoral (0 km)")}</span>
              <span className="text-amber-300 font-bold">{curr.effluentLoad}</span>
              <span>{t("Max (35 km)", "Máx (35 km)")}</span>
            </div>
          </div>

        </div>

        {/* Detailed Interactive Inspector Panel */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#0A1220] p-6 lg:p-8 backdrop-blur-md shadow-2xl">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => setActiveTab("polarimetry")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all ${
                  activeTab === "polarimetry"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("1. Pauli Polarimetric Decomposition", "1. Decomposição Polarimétrica de Pauli")}
              </button>
              <button
                onClick={() => setActiveTab("dielectric")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all ${
                  activeTab === "dielectric"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("2. Dielectric Moisture & Penetration", "2. Umidade Dielétrica & Penetração")}
              </button>
              <button
                onClick={() => setActiveTab("insar")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all ${
                  activeTab === "insar"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("3. InSAR Coherence & Dam Geodesy", "3. Coerência InSAR & Geodésia de Barragens")}
              </button>
              <button
                onClick={() => setActiveTab("estuary")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all ${
                  activeTab === "estuary"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("4. Estuarine Dilution & Aquaculture", "4. Diluição Estuarina & Carcinicultura")}
              </button>
            </div>

            <span className="text-xs font-mono text-slate-400">
              {t("Active Scenario:", "Cenário Ativo:")} <strong className="text-white">{t(curr.titleEn, curr.titlePt)}</strong>
            </span>
          </div>

          {/* TAB 1: POLARIMETRY */}
          {activeTab === "polarimetry" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <Radio className="h-4 w-4" />
                  <span>{t("Full-Polarimetric SAR (Quad-Pol L-Band)", "SAR Totalmente Polarimétrico (Quad-Pol Banda L)")}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t(
                    "Pauli RGB Decomposition: Unraveling Structural Canopy Geometry",
                    "Decomposição Pauli RGB: Revelando a Geometria Estrutural da Vegetação"
                  )}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(
                    "Optical sensors see leaf greenness (NDVI), which plummets to near zero during Caatinga dry dormancy. NISAR L-band penetrates through foliage, interacting with the actual trunk and root architectures via 3 orthogonal scattering mechanisms:",
                    "Sensores ópticos enxergam a clorofila foliar (NDVI), que zera na dormência seca da Caatinga. A banda L do NISAR penetra a folhagem e mede a estrutura real dos troncos e raízes através de 3 mecanismos ortogonais de espalhamento:"
                  )}
                </p>

                {/* Pauli RGB Explanatory Bars */}
                <div className="space-y-3 pt-2">
                  <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                        <span className="font-bold text-rose-300 text-sm">
                          {t("Red Channel: Double-Bounce |HH - VV|²", "Canal Vermelho: Reflexão Dupla |HH - VV|²")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {t(
                          "Interactions between flooded water surface and vertical tree trunks/stilt roots (e.g. Rhizophora mangle in high tide).",
                          "Interação entre espelho d'água inundado e troncos/raízes escora verticais (ex: Rhizophora mangle na preamar)."
                        )}
                      </p>
                    </div>
                    <span className="text-xl font-mono font-extrabold text-rose-400 ml-4">{curr.doubleBounce}%</span>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="font-bold text-emerald-300 text-sm">
                          {t("Green Channel: Volume Scattering 4|HV|²", "Canal Verde: Espalhamento Volumétrico 4|HV|²")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {t(
                          "Cross-polarized returns from randomly oriented dry branches and dense mangrove crowns.",
                          "Retorno cruzado despolarizado de galhos secos ramificados e copas densas de manguezal."
                        )}
                      </p>
                    </div>
                    <span className="text-xl font-mono font-extrabold text-emerald-400 ml-4">{curr.volumeScattering}%</span>
                  </div>

                  <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        <span className="font-bold text-blue-300 text-sm">
                          {t("Blue Channel: Surface Scattering |HH + VV|²", "Canal Azul: Espalhamento Superficial |HH + VV|²")}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        {t(
                          "Single-bounce reflections on smooth open water, mudflats, and empty aquaculture basins.",
                          "Reflexão simples em águas calmas abertas, planícies lodosas e tanques de carcinicultura vazios."
                        )}
                      </p>
                    </div>
                    <span className="text-xl font-mono font-extrabold text-blue-400 ml-4">{curr.surfaceScattering}%</span>
                  </div>
                </div>
              </div>

              {/* Visual Polarimetric Triangle Synthesizer */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/60 border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-4 uppercase tracking-widest text-center">
                  {t("Pauli RGB Polarization Signature", "Assinatura Polarimétrica Pauli RGB")}
                </div>
                
                {/* Simulated Pauli RGB Disk */}
                <div className="relative w-48 h-48 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-2xl overflow-hidden"
                  style={{
                    background: `radial-gradient(circle, rgb(${Math.round(curr.doubleBounce * 2.5)}, ${Math.round(curr.volumeScattering * 2.5)}, ${Math.round(curr.surfaceScattering * 2.5)}) 0%, #03070E 100%)`
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
                  <div className="relative text-center p-4 bg-black/70 backdrop-blur-md rounded-xl border border-white/10">
                    <span className="text-xs text-slate-400 block">{t("Composite Color", "Cor Composta")}</span>
                    <span className="font-mono text-sm font-bold text-white">
                      R:{curr.doubleBounce}% G:{curr.volumeScattering}% B:{curr.surfaceScattering}%
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center mt-4 max-w-xs leading-relaxed">
                  {t(
                    "In 2016 drought, volume and double-bounce dropped 60% in dry riverbed fringes, exposing bare ground with strong surface backscatter.",
                    "Na seca de 2016, volume e dupla reflexão caíram 60% nas margens secas, expondo solo nu com espalhamento de superfície."
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DIELECTRIC MOISTURE */}
          {activeTab === "dielectric" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Droplet className="h-4 w-4" />
                  <span>{t("Permittivity & Soil Hydrology", "Permissividade & Hidrologia do Solo")}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t(
                    "L-Band Microwave Dielectric Constant (ε): Root-Zone Moisture",
                    "Constante Dielétrica de Micro-ondas Banda L (ε): Umidade Subsuperficial"
                  )}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(
                    "Liquid water has an extraordinarily high dielectric constant (ε ≈ 80) compared to dry minerals (ε ≈ 3.5). By emitting 24-cm wavelength pulses, NISAR measures true subsurface root-zone moisture up to 30 cm deep — revealing whether Caatinga scrub is in drought-induced dormancy or permanent mortality.",
                    "A água líquida possui uma constante dielétrica extremamente alta (ε ≈ 80) frente a minerais secos (ε ≈ 3,5). Ao emitir pulsos de 24 cm de comprimento de onda, o NISAR mede a umidade subsuperficial até 30 cm de profundidade — revelando se a Caatinga está apenas dormente ou se sofreu mortalidade permanente."
                  )}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                    <span className="text-xs text-slate-400 block">{t("Radar Penetration Depth", "Profundidade de Penetração")}</span>
                    <span className="text-2xl font-mono font-bold text-cyan-300">{curr.penetrationCm} cm</span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {curr.penetrationCm > 20 
                        ? t("High penetration: Desiccated soil profile", "Alta penetração: Perfil de solo dessecado")
                        : t("Attenuated: High water content in root layer", "Atenuado: Alto teor de água nas raízes")}
                    </span>
                  </div>
                  <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                    <span className="text-xs text-slate-400 block">{t("Volumetric Soil Moisture", "Umidade Volumétrica")}</span>
                    <span className="text-2xl font-mono font-bold text-white">{curr.moistureVolPct}% m³/m³</span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {curr.moistureVolPct < 8 
                        ? t("Wilting point exceeded (severe drought)", "Ponto de murcha ultrapassado (seca severa)")
                        : t("Adequate for physiological activity", "Adequado para atividade fisiológica")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subsurface Depth Cross Section */}
              <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-slate-800 p-6 flex flex-col justify-between">
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest text-center mb-4">
                  {t("Soil Profile Penetration Profile", "Perfil de Penetração no Perfil de Solo")}
                </div>

                <div className="relative h-48 w-full border border-slate-700 rounded-xl overflow-hidden flex flex-col">
                  {/* Surface layer (0 - 5 cm) */}
                  <div className="h-1/4 bg-amber-900/40 border-b border-amber-600/30 flex items-center justify-between px-3 text-[10px] text-amber-200">
                    <span>0–5 cm (Optical & C-Band limit)</span>
                    <span>ε ≈ {curr.dielectric.toFixed(1)}</span>
                  </div>
                  {/* Root zone layer (5 - 30 cm) */}
                  <div 
                    className="flex-1 transition-all duration-700 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(to bottom, rgba(8, 145, 178, ${curr.dielectric / 25}), #050B14)`
                    }}
                  >
                    <div className="text-center px-4">
                      <span className="text-cyan-400 block font-mono text-sm">NISAR L-Band Active Zone</span>
                      <span className="text-[10px] text-slate-300">{t("Probing Taproot Hydrology", "Sondando Hidrologia de Raízes Pivotantes")}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center mt-3">
                  {t(
                    "While Sentinel-2 sees dead gray brushwood, NISAR detects subsurface moisture reserves sustaining survival.",
                    "Enquanto o Sentinel-2 vê galhos cinzentos mortos, o NISAR detecta reservas hídricas profundas mantendo a sobrevivência."
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: INSAR COHERENCE */}
          {activeTab === "insar" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="h-4 w-4" />
                  <span>{t("Interferometric SAR Geodesy (DInSAR)", "Geodésia por Interferometria SAR (DInSAR)")}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t(
                    "Millimeter Structural Stability Monitoring: Castanhão & Orós Mega-Dams",
                    "Monitoramento de Estabilidade Estrutural Milimétrica: Açudes Castanhão e Orós"
                  )}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(
                    "Castanhão (6.7 billion m³) is Latin America's largest earthen dam. During multi-year droughts, hydrostatic unloading causes micro-subsidence in the crest; subsequent rapid refills create hydraulic thrust. Repeat-pass InSAR interferometry measures phase difference (Δφ) to millimeter accuracy:",
                    "O Castanhão (6,7 bilhões de m³) é o maior reservatório público de terra da América Latina. Em megassecas, o esvaziamento gera descompressão hidrostática com micro-assentamento; a recarga brusca gera empuxo. A interferometria InSAR mede a diferença de fase (Δφ) com precisão milimétrica:"
                  )}
                </p>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 font-mono text-xs text-emerald-300 space-y-2">
                  <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                    <span>{t("Interferometric Phase Shift Equation:", "Equação da Mudança de Fase:")}</span>
                    <span className="text-white font-bold">Δφ = (4π / λ) · ΔR</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-400 block">{t("Radar Wavelength (λ):", "Comprimento de Onda (λ):")}</span>
                      <span className="text-white">24.2 cm (NISAR L-Band)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">{t("Displacement Precision:", "Precisão do Deslocamento:")}</span>
                      <span className="text-white">±1.8 mm / year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dam Coherence Radar Card */}
              <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-slate-800 p-6 flex flex-col justify-between">
                <div className="text-xs font-mono text-emerald-300 uppercase tracking-widest text-center mb-4">
                  {t("Castanhão Dam Crest Coherence", "Coerência na Crista do Açude Castanhão")}
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{t("Interferometric Coherence (γ)", "Coerência Interferométrica (γ)")}</span>
                      <span className="text-xl font-bold text-white">{curr.insarCoherence}</span>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/40">
                      {t("High Phase Quality", "Alta Qualidade de Fase")}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{t("Deformation Velocity", "Velocidade de Deformação")}</span>
                      <span className="text-xl font-bold text-emerald-400 font-mono">
                        {curr.damDeformationMm > 0 ? `+${curr.damDeformationMm}` : curr.damDeformationMm} mm/yr
                      </span>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded">
                      {curr.damDeformationMm < -3 ? t("Settlement Warning", "Atenção Assentamento") : t("Nominal Geodesy", "Geodésia Nominal")}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center mt-4">
                  {t(
                    "Enables proactive civil defense monitoring of structural integrity without costly ground station arrays.",
                    "Permite monitoramento preventivo pela Defesa Civil sem custos de sensores piezométricos em terra."
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: ESTUARY & AQUACULTURE */}
          {activeTab === "estuary" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Waves className="h-4 w-4" />
                  <span>{t("Estuarine Hydrodynamics & Economic Coexistence", "Hidrodinâmica Estuarina & Coexistência Econômica")}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t(
                    "Balancing Productive Carciniculture & Mangrove Health Under Extreme Drought",
                    "Equilibrando a Carcinicultura Produtiva e a Saúde do Manguezal Sob Seca Extrema"
                  )}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(
                    "Shrimp farming (carcinicultura) is a vital regional economic engine and food production sector in Aracati and Fortim, supporting thousands of families. However, when upstream reservoir retention reduces Jaguaribe river discharge from hundreds of m³/s to near zero, the natural tidal flushing mechanism collapses:",
                    "A carcinicultura é um motor econômico vital e setor produtivo de alimentos em Aracati e Fortim, sustentando milhares de famílias. Contudo, quando o represamento a montante reduz a vazão do Jaguaribe de centenas de m³/s para quase zero, o mecanismo de lavagem estuarina colapsa:"
                  )}
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-start space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-white text-xs">{t("Tidal Salinity Wedge Penetration", "Avanço da Cunha Salina Marinha")}</span>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {t(
                          "Without freshwater counter-current, marine seawater penetrated 32 km upstream to Jaguaruana in 2016, salinizing municipal intake wells and apicum flats.",
                          "Sem contra-vazão doce, a água marinha penetrou 32 km rio acima até Jaguaruana em 2016, salinizando poços de captação e apicuns."
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 flex items-start space-x-3">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-white text-xs">{t("Effluent Dilution Capacity & Biological Load", "Capacidade de Diluição de Efluentes & Carga Biológica")}</span>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {t(
                          "Aquaculture ponds release organic nutrients and nitrogen compounds during drainage. In drought, low flushing concentrates biological load, triggering algal blooms detected by SAR surface roughness dampening.",
                          "Tanques de cultivo descarregam nutrientes orgânicos. Na seca, a baixa renovação concentra a carga biológica, gerando floração de microalgas detectada por amortecimento de rugosidade no SAR."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hydrodynamic Indicator Box */}
              <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-slate-800 p-6 flex flex-col justify-between">
                <div className="text-xs font-mono text-amber-300 uppercase tracking-widest text-center mb-4">
                  {t("Estuarine Hydraulic Coupling", "Acoplamento Hidráulico Estuarino")}
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{t("Upstream River Outflow", "Vazão do Rio a Montante")}</span>
                      <span className="text-xl font-bold text-cyan-400 font-mono">{curr.riverDischargeM3s} m³/s</span>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">
                      {curr.riverDischargeM3s < 10 ? t("Drought Cutoff", "Vazão Residual") : t("Flushing Flow", "Vazão Hidráulica")}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">{t("Biological Effluent Dilution", "Diluição de Efluentes Biológicos")}</span>
                      <span className="text-xl font-bold text-amber-400 font-mono">{curr.effluentLoad}</span>
                    </div>
                    <span className="text-xs font-mono px-2 py-1 bg-amber-500/20 text-amber-300 rounded">
                      NDTI / NDCI
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                  {t(
                    "Recommendation: Establish ecological discharge pulses from Castanhão synchronized with pond harvest cycles to safeguard both mangrove biodiversity and shrimp farm water intake quality.",
                    "Recomendação: Estabelecer pulsos de vazão ecológica do Castanhão sincronizados com as despescas para assegurar o manguezal e a qualidade da água dos próprios criatórios."
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
