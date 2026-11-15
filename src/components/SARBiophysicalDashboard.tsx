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
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Compass,
  Mountain,
  Fish,
  Eye,
  Sliders,
  ShieldCheck,
  Zap
} from "lucide-react";

// DAMS SPECIFICATION FOR DAM SELECTOR & RIGIDITY VS DECORRELATION
const DAMS_DATA = {
  castanhao: {
    id: "castanhao",
    name: "Açude Castanhão (Padre Cícero)",
    river: "Rio Jaguaribe",
    location: "Alto Santo / Jaguaribara (Médio Jaguaribe)",
    capacityMm3: 6700,
    crestLengthM: 30000,
    crestHeightM: 60,
    damTypeEn: "Zoned earthfill dam with concrete gated spillway",
    damTypePt: "Barragem de terra zoneada com vertedouro de concreto e comportas",
    insarCoherence: 0.92,
    deformationMmYr: -2.4,
    rigidityScore: "Rigid Armor (γ = 0.92)",
    rigidityScorePt: "Enrocamento Rígido (γ = 0,92)",
    geologyEn: "Precambrian gneiss bedrock with weathered granite abutments",
    geologyPt: "Embasamento gnáissico pré-cambriano com ombreiras de granito alterado",
    physicsEn: "Riprap rock armor on the upstream face preserves stable microwave phase between 12-day repeat passes. InSAR captures millimeter crest settlement under drought decompression.",
    physicsPt: "O enrocamento de pedras na face de montante preserva a fase de micro-ondas entre passagens orbitais de 12 dias. O InSAR mede assentamento milimétrico por descompressão hidrostática."
  },
  oros: {
    id: "oros",
    name: "Açude Orós (Pres. Juscelino Kubitschek)",
    river: "Rio Jaguaribe",
    location: "Orós / Iguatu (Alto/Médio Jaguaribe)",
    capacityMm3: 1940,
    crestLengthM: 1980,
    crestHeightM: 54,
    damTypeEn: "Curved rockfill embankment with masonry core",
    damTypePt: "Aterro de enrocamento curvo com núcleo de alvenaria de pedra",
    insarCoherence: 0.95,
    deformationMmYr: -0.6,
    rigidityScore: "Ultra-Rigid Bedrock (γ = 0.95)",
    rigidityScorePt: "Rocha Maciça Ultrarrígida (γ = 0,95)",
    geologyEn: "Massive crystalline quartz-diorite canyon gorge",
    geologyPt: "Boqueirão cristalino de quartzo-diorito maciço",
    physicsEn: "Anchored directly into a steep crystalline canyon gorge. Extremely high temporal coherence makes Orós an exceptional geodetic ground calibration target for SAR satellites.",
    physicsPt: "Ancorado diretamente no boqueirão de rocha cristalina. A altíssima coerência temporal torna o Orós um alvo de calibração geodésica perfeito para satélites SAR."
  },
  banabuiu: {
    id: "banabuiu",
    name: "Açude Banabuiú (Arrojado Lisboa)",
    river: "Rio Banabuiú",
    location: "Banabuiú (Sertão Central)",
    capacityMm3: 1600,
    crestLengthM: 1040,
    crestHeightM: 48,
    damTypeEn: "Rockfill with central clay core and side spillway",
    damTypePt: "Enrocamento com núcleo central de argila e vertedouro lateral",
    insarCoherence: 0.88,
    deformationMmYr: -1.2,
    rigidityScore: "Stable Embankment (γ = 0.88)",
    rigidityScorePt: "Aterro Estável (γ = 0,88)",
    geologyEn: "Biotite-gneiss crystalline basement",
    geologyPt: "Embasamento cristalino biotita-gnaisse",
    physicsEn: "Coherence remains well above 0.85 along the rock crest, allowing clear separation between rigid structural movement and surrounding decorrelated water.",
    physicsPt: "A coerência se mantém bem acima de 0,85 ao longo da crista de pedras, permitindo separar movimentos estruturais da água adjacente que se descorrela."
  },
  arneiroz: {
    id: "arneiroz",
    name: "Açude Arneiroz II",
    river: "Alto Jaguaribe",
    location: "Arneiroz / Tauá (Sertão dos Inhamuns)",
    capacityMm3: 197,
    crestLengthM: 1420,
    crestHeightM: 32,
    damTypeEn: "Homogeneous earthfill dam with riprap protection",
    damTypePt: "Barragem de terra homogênea com enrocamento de proteção",
    insarCoherence: 0.86,
    deformationMmYr: -0.9,
    rigidityScore: "Headwater Retention (γ = 0.86)",
    rigidityScorePt: "Retenção de Cabeceira (γ = 0,86)",
    geologyEn: "Schistose and migmatitic bedrock",
    geologyPt: "Embasamento xistoso e migmatítico",
    physicsEn: "Controls flash flood surges from the dry Inhamuns uplands. Phase stability on the crest confirms embankment integrity during heavy seasonal flash fills.",
    physicsPt: "Controla enxurradas torrenciais dos Inhamuns. A estabilidade de fase na crista confirma a integridade do aterro durante recargas bruscas."
  },
  trussu: {
    id: "trussu",
    name: "Açude Roberto Costa (Trussu)",
    river: "Rio Trussu (Afluente do Jaguaribe)",
    location: "Iguatu (Centro-Sul Cearense)",
    capacityMm3: 300,
    crestLengthM: 1100,
    crestHeightM: 38,
    damTypeEn: "Zoned earthfill dam with morning-glory shaft spillway",
    damTypePt: "Barragem de terra zoneada com vertedouro tipo tulipa",
    insarCoherence: 0.89,
    deformationMmYr: -0.7,
    rigidityScore: "Rigid Structural Crest (γ = 0.89)",
    rigidityScorePt: "Crista Estrutural Rígida (γ = 0,89)",
    geologyEn: "Metasedimentary crystalline basement",
    geologyPt: "Embasamento metassedimentar cristalino",
    physicsEn: "Critical regulatory dam for the Iguatu agricultural floodplain. Constant high InSAR coherence enables precise structural monitoring of the morning-glory shaft.",
    physicsPt: "Açude regulador vital para a várzea agrícola de Iguatu. Alta coerência contínua permite monitorar a integridade estrutural do vertedouro tipo tulipa."
  }
};

type DamKey = keyof typeof DAMS_DATA;

export default function SARBiophysicalDashboard() {
  const { t } = useLanguage();

  // Active analysis preset: Drought Peak (2016) vs Wet Recovery (2024) vs Pre-Dam Baseline (1985)
  const [selectedScenario, setSelectedScenario] = useState<"drought" | "recovery" | "baseline">("drought");
  const [activeTab, setActiveTab] = useState<"polarimetry" | "dielectric" | "insar" | "estuary">("polarimetry");

  // Tab 1 Sub-states: Tidal simulation (High vs Low)
  const [tidalState, setTidalState] = useState<"high" | "low">("high");

  // Tab 3 Sub-states: Selected Dam for InSAR analysis
  const [selectedDam, setSelectedDam] = useState<DamKey>("castanhao");

  // Tab 4 Sub-states: River Flow & Effluent Modes
  const [riverFlowMode, setRiverFlowMode] = useState<"drought" | "strong">("drought");
  const [effluentView, setEffluentView] = useState<"worst" | "best" | "comparison">("comparison");

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
      insarCoherence: 0.94,
      damDeformationMm: -4.8,
      surfaceScattering: 48,
      doubleBounce: 14,
      volumeScattering: 38,
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
  const activeDamData = DAMS_DATA[selectedDam];

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
            <div className="flex items-center space-x-2 text-sm overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setActiveTab("polarimetry")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 ${
                  activeTab === "polarimetry"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("1. Double-Bounce & Mangrove Roots", "1. Double-Bounce & Raízes de Mangue")}
              </button>
              <button
                onClick={() => setActiveTab("dielectric")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 ${
                  activeTab === "dielectric"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("2. Dielectric Moisture & Penetration", "2. Umidade Dielétrica & Penetração")}
              </button>
              <button
                onClick={() => setActiveTab("insar")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 ${
                  activeTab === "insar"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("3. InSAR Coherence: Rigid vs Decorrelated", "3. Coerência InSAR: Rígido vs Decorrelacionado")}
              </button>
              <button
                onClick={() => setActiveTab("estuary")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 ${
                  activeTab === "estuary"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("4. River Flow & Biological Effluents", "4. Vazão Fluvial & Efluentes Biológicos")}
              </button>
            </div>

            <span className="text-xs font-mono text-slate-400">
              {t("Active Scenario:", "Cenário Ativo:")} <strong className="text-white">{t(curr.titleEn, curr.titlePt)}</strong>
            </span>
          </div>

          {/* TAB 1: POLARIMETRY & CORRELATED DOUBLE-BOUNCE VS MANGROVE TIDAL FLOODING */}
          {activeTab === "polarimetry" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <Radio className="h-4 w-4" />
                    <span>{t("Full-Polarimetric Decomposition (NISAR L-Band / Sentinel-1 C-SAR)", "Decomposição Polarimétrica (NISAR Banda L / Sentinel-1 C-SAR)")}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">
                    {t(
                      "Double-Bounce Dihedral Physics: Correlating Tidal Flooding with Mangrove Stilt Roots",
                      "Física do Diedro (Double-Bounce): Correlacionando Inundação de Maré com Raízes Escora de Mangue"
                    )}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t(
                      "Double-bounce scattering requires an orthogonal 90° corner reflector (diedro). In coastal wetlands like Aracati, this geometric condition occurs when the horizontal specular water mirror meets the vertical stilt roots of Rhizophora mangle or pneumatophores of Avicennia germinans during high tide.",
                      "O espalhamento por reflexão dupla (double-bounce) exige um refletor de canto ortogonal de 90° (diedro). No estuário de Aracati, essa condição geométrica ocorre quando a lâmina d'água especular horizontal encontra as raízes-escora verticais do mangue-vermelho (Rhizophora mangle) ou pneumatóforos de Avicennia germinans na preamar."
                    )}
                  </p>

                  {/* Why Optical Satellites Fail vs SAR Penetration */}
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-3">
                    <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs">
                      <Zap className="h-4 w-4 text-rose-400" />
                      <span>{t("Why Optical Satellites Fail Beneath Canopies", "Por Que Sensores Ópticos Falham sob o Dossel")}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {t(
                        "Optical sensors (Sentinel-2, Landsat) cannot penetrate dense leafy canopies (LAI > 3.5). The green canopy umbrella reflects visible and NIR photons, reporting 'dry forest' even when the forest floor is submerged under 1.5 meters of water. In contrast, active microwaves (NISAR L-band λ = 24.2 cm and Sentinel-1 C-band λ = 5.6 cm) pierce canopy gaps, reflect off the flooded water sheet onto vertical roots, and return directly to the antenna.",
                        "Sensores ópticos (Sentinel-2, Landsat) não penetram o dossel foliar denso (IAF > 3,5). A copa funciona como um guarda-chuva que reflete luz visível e IVP, indicando 'floresta seca' mesmo com 1,5 metro de maré inundando o chão. Já as micro-ondas ativas (NISAR Banda L λ = 24,2 cm e Sentinel-1 Banda C λ = 5,6 cm) penetram as folhas, refletem na água contra as raízes verticais e retornam diretamente à antena."
                      )}
                    </p>
                  </div>

                  {/* Polarimetric Pauli Red Channel Formulation */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 font-mono text-xs text-slate-300 space-y-2">
                    <div className="flex justify-between items-center text-rose-300 font-bold border-b border-slate-800 pb-2">
                      <span>{t("Pauli Red Channel (Dihedral Reflection):", "Canal Vermelho de Pauli (Reflexão Diédrica):")}</span>
                      <span>Pd = ½ |S_HH - S_VV|²</span>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1">
                      {t(
                        "Two consecutive Fresnel reflections (water surface → tree trunk) produce a 180° (π radian) phase shift between horizontal (HH) and vertical (VV) electric field vectors. This destructive interference in HH+VV and constructive reinforcement in HH-VV concentrates double-bounce power strictly into the Pauli Red channel.",
                        "Duas reflexões consecutivas de Fresnel (lâmina d'água → tronco) geram uma mudança de fase de 180° (π radianos) entre os vetores de campo HH e VV. Esse reforço construtivo em HH-VV concentra a energia do diedro exclusivamente no canal Vermelho de Pauli."
                      )}
                    </p>
                  </div>
                </div>

                {/* Interactive Tidal Simulator Box */}
                <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-slate-800 p-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-rose-300 uppercase tracking-wider font-bold">
                        {t("Tidal Flooding Phase Switcher", "Simulador da Fase da Maré")}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Aracati Estuary
                      </span>
                    </div>

                    {/* High vs Low Tide Buttons */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800 mb-5">
                      <button
                        onClick={() => setTidalState("high")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                          tidalState === "high"
                            ? "bg-rose-600 text-white shadow-lg shadow-rose-900/50"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Waves className="h-3.5 w-3.5" />
                        <span>{t("Preamar / High Tide (+3.0 m)", "Preamar / Maré Alta (+3,0 m)")}</span>
                      </button>
                      <button
                        onClick={() => setTidalState("low")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                          tidalState === "low"
                            ? "bg-amber-600 text-white shadow-lg shadow-amber-900/50"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Droplet className="h-3.5 w-3.5" />
                        <span>{t("Baixa-mar / Low Tide (+0.2 m)", "Baixa-mar / Maré Baixa (+0,2 m)")}</span>
                      </button>
                    </div>

                    {/* Dynamic Diagram Representation */}
                    <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4 space-y-3">
                      {tidalState === "high" ? (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-rose-400 flex items-center space-x-1">
                              <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
                              <span>{t("Active Dihedral Resonance", "Ressonância Diédrica Ativa")}</span>
                            </span>
                            <span className="text-xs font-mono text-rose-300 font-bold">+8.4 dB Backscatter Spike</span>
                          </div>
                          
                          {/* Visual ASCII / SVG Representation of Corner Reflector */}
                          <div className="h-28 w-full rounded-lg bg-gradient-to-b from-slate-900 to-rose-950/30 border border-rose-500/20 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute top-2 left-4 text-[10px] font-mono text-cyan-300">
                              Radar Beam (λ = 24 cm) ↘
                            </div>
                            <div className="absolute bottom-2 left-0 right-0 h-4 bg-cyan-600/40 border-t border-cyan-400/60 flex items-center px-3">
                              <span className="text-[9px] font-mono text-cyan-200">
                                {t("Specular Water Sheet (ε ≈ 80)", "Lâmina D'água Especular (ε ≈ 80)")}
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-12 w-6 h-16 bg-amber-800/80 rounded-t border-l-2 border-rose-400 flex items-center justify-center">
                              <span className="text-[8px] font-mono text-white -rotate-90">Root / Tronco</span>
                            </div>
                            <div className="absolute bottom-4 right-16 text-rose-400 text-xs font-bold">
                              90° Diedro ↗
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-300 leading-relaxed">
                            <strong className="text-rose-300">{t("Sub-canopy flood detected:", "Inundação sob o dossel detectada:")}</strong>{" "}
                            {t(
                              "The water acts as a mirror with reflection coefficient R ≈ 0.85, directing the microwave into stilt roots and bouncing it directly back to the satellite. Pauli Red channel lights up intensely.",
                              "A água atua como espelho com coeficiente R ≈ 0,85, direcionando o feixe para as raízes escora e de volta ao satélite. O canal Vermelho de Pauli acende com intensidade máxima."
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-400 flex items-center space-x-1">
                              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                              <span>{t("Corner Reflector Collapsed", "Refletor de Canto Colapsado")}</span>
                            </span>
                            <span className="text-xs font-mono text-slate-400 font-bold">-7.2 dB Signal Loss</span>
                          </div>

                          {/* Visual ASCII / SVG Representation of Low Tide Mud */}
                          <div className="h-28 w-full rounded-lg bg-gradient-to-b from-slate-900 to-amber-950/20 border border-slate-700 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-400">
                              Radar Beam ↘ Diffuse Scatter
                            </div>
                            <div className="absolute bottom-2 left-0 right-0 h-4 bg-amber-950 border-t border-amber-800 flex items-center px-3">
                              <span className="text-[9px] font-mono text-amber-300">
                                {t("Rough Exposed Mudflat (No Specular Mirror)", "Lamaçais Rugosos Expostos (Sem Espelho)")}
                              </span>
                            </div>
                            <div className="absolute bottom-4 right-12 w-6 h-16 bg-amber-900/60 rounded-t flex items-center justify-center">
                              <span className="text-[8px] font-mono text-slate-400 -rotate-90">Root / Tronco</span>
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-300 leading-relaxed">
                            <strong className="text-amber-300">{t("Exposed tidal mudflats:", "Lamaçais de maré expostos:")}</strong>{" "}
                            {t(
                              "Tidal water receded. Substrate roughness causes diffuse single scattering and attenuation into saturated silts. Dihedral reflection vanishes, extinguishing the Pauli Red response.",
                              "A maré recuou. A rugosidade da lama gera espalhamento difuso simples e atenuação nos sedimentos. A reflexão diédrica cessa, extinguindo o sinal Vermelho de Pauli."
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 3 Polarimetric Pauli Channels Breakdown */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30">
                      <span className="text-rose-400 font-bold block">{t("Red Channel", "Canal Vermelho")}</span>
                      <span className="text-white text-xs">{tidalState === "high" ? "52%" : "14%"}</span>
                      <span className="text-slate-400 block mt-0.5">{t("Double Bounce", "Reflexão Dupla")}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                      <span className="text-emerald-400 font-bold block">{t("Green Channel", "Canal Verde")}</span>
                      <span className="text-white text-xs">34%</span>
                      <span className="text-slate-400 block mt-0.5">{t("Canopy Volume", "Volume Copa")}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/30">
                      <span className="text-blue-400 font-bold block">{t("Blue Channel", "Canal Azul")}</span>
                      <span className="text-white text-xs">{tidalState === "high" ? "14%" : "52%"}</span>
                      <span className="text-slate-400 block mt-0.5">{t("Surface Mud", "Lama Difusa")}</span>
                    </div>
                  </div>
                </div>
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

          {/* TAB 3: INSAR COHERENCE: RIGID VS DECORRELATED + INTERACTIVE DAM SELECTOR */}
          {activeTab === "insar" && (
            <div className="space-y-8">
              
              {/* Interactive Dam Selector Strip */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center space-x-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{t("Select Reservoir Dam for InSAR Geodesy:", "Selecione o Açude para Geodésia InSAR:")}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {t("5 Major Jaguaribe Basin Mega-Dams", "5 Grandes Açudes da Bacia do Jaguaribe")}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {(Object.keys(DAMS_DATA) as DamKey[]).map((key) => {
                    const dam = DAMS_DATA[key];
                    const isSelected = selectedDam === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedDam(key)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-500"
                            : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 font-mono truncate">{dam.river}</div>
                        <div className="text-xs font-bold text-white truncate mt-0.5">{dam.name.split(" ")[1]}</div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                          <span className="text-[10px] text-emerald-400 font-mono font-bold">γ = {dam.insarCoherence}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{dam.deformationMmYr} mm/a</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dam Detail & Physical Contrast */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Dam Profile & Rigidity Physics */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldAlert className="h-4 w-4" />
                    <span>{t("Interferometric Phase Coherence Formulation", "Formula da Coerência de Fase Interferométrica")}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {activeDamData.name}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t(activeDamData.physicsEn, activeDamData.physicsPt)}
                  </p>

                  {/* Mathematical Rigidity vs Decorrelation Physics */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 font-mono text-xs text-emerald-300 space-y-3">
                    <div className="flex justify-between items-center border-b border-emerald-500/20 pb-2">
                      <span>{t("Interferometric Coherence:", "Coerência Interferométrica:")}</span>
                      <span className="text-white font-bold">γ = |⟨s₁ s₂*⟩| / √(⟨|s₁|²⟩ ⟨|s₂|²⟩)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] pt-1">
                      <div>
                        <span className="text-slate-400 block">{t("Rigid Structure (Dam Crest / Rock):", "Estrutura Rígida (Crista / Rocha):")}</span>
                        <span className="text-white font-bold">γ &gt; 0.85 (Phase Preserved)</span>
                        <p className="text-[10px] text-slate-300 mt-1">
                          {t("Sub-wavelength scatterers remain fixed (< λ/4 = 6 cm). Yields millimeter displacement d_LOS = (λ/4π)Δφ.",
                             "Espalhadores sub-comprimento de onda fixos (< λ/4 = 6 cm). Gera medida milimétrica d_LOS = (λ/4π)Δφ.")}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400 block">{t("Decorrelated Medium (Water / Mud):", "Meio Decorrelacionado (Água / Lama):")}</span>
                        <span className="text-rose-400 font-bold">γ &lt; 0.25 (Phase White Noise)</span>
                        <p className="text-[10px] text-slate-300 mt-1">
                          {t("Wind waves and moving mud randomize phase entirely between passes. Coherence drops to zero, blocking DInSAR.",
                             "Ondas de vento e lodo em movimento aleatorizam a fase entre passagens. Coerência zera, inviabilizando DInSAR.")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dam Structural Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{t("Reservoir Capacity", "Capacidade")}</span>
                      <span className="text-base font-bold text-white font-mono">{activeDamData.capacityMm3.toLocaleString()} Mm³</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{t("Crest Length", "Comprimento da Crista")}</span>
                      <span className="text-base font-bold text-white font-mono">{activeDamData.crestLengthM.toLocaleString()} m</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{t("Crest Height", "Altura Máxima")}</span>
                      <span className="text-base font-bold text-white font-mono">{activeDamData.crestHeightM} m</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{t("Dam Type", "Tipo de Barragem")}</span>
                      <span className="text-xs font-bold text-emerald-400 truncate block mt-1">{t(activeDamData.rigidityScore, activeDamData.rigidityScorePt)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Comparative Rigidity vs Decorrelation Card */}
                <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-slate-800 p-6 flex flex-col justify-between space-y-5">
                  <div className="text-xs font-mono text-emerald-300 uppercase tracking-widest text-center mb-1">
                    {t("Rigid Structure vs Decorrelated Medium", "Estrutura Rígida vs Meio Decorrelacionado")}
                  </div>

                  {/* Side-by-Side Coherence Comparison Cards */}
                  <div className="space-y-3">
                    
                    {/* Rigid Embankment */}
                    <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-300 flex items-center space-x-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span>{t("Rigid Rock Armor / Concrete Crest", "Enrocamento Rígido / Crista de Concreto")}</span>
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          γ = {activeDamData.insarCoherence}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {t(
                          "Stationary boulders and bedrock outcrops maintain constant backscattering geometry over months. Coherence remains > 0.85, enabling millimeter subsidence tracking.",
                          "Blocos de rocha estacionários e afloramentos rochosos mantêm a geometria de retroespalhamento constante. A coerência segue > 0,85, permitindo medir assentamentos milimétricos."
                        )}
                      </div>
                    </div>

                    {/* Decorrelated Reservoir Water */}
                    <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-950/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-300 flex items-center space-x-1.5">
                          <XCircle className="h-4 w-4 text-rose-400" />
                          <span>{t("Reservoir Water & Saturated Mud", "Espelho D'água & Lamaçais Saturados")}</span>
                        </span>
                        <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                          γ &lt; 0.15
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300">
                        {t(
                          "Capillary wind ripples and fluctuating water level completely destroy phase correlation within seconds. The interferogram over the reservoir yields pure salt-and-pepper noise.",
                          "Marolas geradas pelo vento e a oscilação do nível destroem a correlação de fase em segundos. O interferograma sobre a lâmina d'água gera ruído puramente aleatório."
                        )}
                      </div>
                    </div>

                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <span className="text-[11px] text-slate-400 block">{t("12-Day Orbital Cycle InSAR Displacement Rate:", "Taxa de Deslocamento InSAR no Ciclo de 12 Dias:")}</span>
                    <span className="text-xl font-bold font-mono text-emerald-400">{activeDamData.deformationMmYr} mm/year</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{t("Within nominal engineering safety tolerance (< 5 mm/yr)", "Dentro da tolerância nominal de segurança da engenharia (< 5 mm/ano)")}</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: ESTUARINE HYDRODYNAMICS, FLOW REGIMES & BIOLOGICAL EFFLUENTS */}
          {activeTab === "estuary" && (
            <div className="space-y-8">
              
              {/* Header & Context */}
              <div className="max-w-3xl space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Waves className="h-4 w-4" />
                  <span>{t("Estuarine Dilution Dynamics & Carciniculture Effluent Quality", "Dinâmica de Diluição Estuarina & Qualidade de Efluentes da Carcinicultura")}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t(
                    "Strong vs Weak River Flow & The Biological Effluent Spectrum in Aracati",
                    "Vazão Fluvial Forte vs Fraca & O Espectro de Efluentes Biológicos em Aracati"
                  )}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t(
                    "Carciniculture (shrimp farming) is a foundational productive economic activity supporting over 12,000 direct and indirect jobs in Aracati, Fortim, and Jaguaruana. However, its environmental footprint is dictated by upstream river discharge from Castanhão. When the river ceases flowing, tidal flushing collapses, turning the estuary into a biological accumulation sink.",
                    "A carcinicultura é uma atividade econômica produtiva e legítima que sustenta mais de 12.000 empregos diretos e indiretos em Aracati, Fortim e Jaguaruana. No entanto, sua pegada ambiental é ditada pela vazão a montante liberada pelo Castanhão. Quando o rio para de correr, a renovação de maré colapsa, transformando o estuário em armadilha de acúmulo biológico."
                  )}
                </p>
              </div>

              {/* Module 1: Strong Flow vs Weak Flow Comparative Switcher */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center space-x-1.5">
                    <Sliders className="h-4 w-4" />
                    <span>{t("Compare Hydraulic Regimes:", "Comparar Regimes Hidráulicos:")}</span>
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setRiverFlowMode("drought")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        riverFlowMode === "drought"
                          ? "bg-amber-500 text-white shadow-md shadow-amber-950/50"
                          : "text-slate-400 hover:text-white bg-slate-800/60"
                      }`}
                    >
                      {t("Weak / Drought Flow (Q ≈ 0 - 5 m³/s)", "Vazão Fraca / Estiagem (Q ≈ 0 - 5 m³/s)")}
                    </button>
                    <button
                      onClick={() => setRiverFlowMode("strong")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        riverFlowMode === "strong"
                          ? "bg-cyan-500 text-white shadow-md shadow-cyan-950/50"
                          : "text-slate-400 hover:text-white bg-slate-800/60"
                      }`}
                    >
                      {t("Strong / Flood Pulse (Q > 500 m³/s)", "Vazão Forte / Cheia (Q > 500 m³/s)")}
                    </button>
                  </div>
                </div>

                {/* Flow Impact Analysis */}
                {riverFlowMode === "drought" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                      <span className="text-xs font-bold text-amber-400 block">{t("Tidal Salinity Intrusion (32 km)", "Intrusão da Cunha Salina (32 km)")}</span>
                      <p className="text-xs text-slate-300">
                        {t(
                          "Without hydraulic counter-pressure from upstream, dense marine seawater penetrates 32 km inland to Jaguaruana. Estuarine residence time exceeds 35 days, preventing nutrient dispersion.",
                          "Sem contrapressão fluvial a montante, a cunha salina avança 32 km até Jaguaruana. O tempo de residência ultrapassa 35 dias, impedindo a dispersão de nutrientes."
                        )}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                      <span className="text-xs font-bold text-rose-400 block">{t("Effluent Stagnation & Nocturnal Hypoxia", "Estagnação de Efluentes & Hipóxia Noturna")}</span>
                      <p className="text-xs text-slate-300">
                        {t(
                          "Pond drainage discharge accumulates in deep estuarine channels. Algal blooms cause nocturnal dissolved oxygen crashes (DO < 1.5 mg/L), triggering pathogen proliferation (Vibrio spp.).",
                          "A drenagem dos viveiros se acumula nas calhas fundas. Florações algais causam colapso noturno de oxigênio (OD < 1,5 mg/L), favorecendo patógenos (Vibrio spp.)."
                        )}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                      <span className="text-xs font-bold text-white block">{t("Impact on Aquaculture Productivity", "Impacto na Produtividade da Carcinicultura")}</span>
                      <p className="text-xs text-slate-300">
                        {t(
                          "Farms intake their own stagnant discharges on flood tides. Increased organic load causes gill fouling, slowing shrimp growth and increasing harvest mortality by up to 24%.",
                          "Os viveiros captam sua própria água de descarte na maré cheia. A carga orgânica gera incrustação branquial, retarda o crescimento e eleva mortalidade em até 24%."
                        )}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                      <span className="text-xs font-bold text-cyan-400 block">{t("Rapid Ocean Flushing (Tres < 48 h)", "Lavagem Oceânica Rápida (Tres < 48 h)")}</span>
                      <p className="text-xs text-slate-300">
                        {t(
                          "River discharge flushes the entire estuarine water volume into the open Atlantic in less than 48 hours. The marine salinity wedge is pushed completely seaward.",
                          "A vazão fluvial empurra todo o volume estuarino para o Atlântico aberto em menos de 48 horas. A cunha salina marinha é expulsa para fora da barra."
                        )}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 block">{t("Immediate Effluent Dilution", "Diluição Imediata de Efluentes")}</span>
                      <p className="text-xs text-slate-300">
                        {t(
                          "Organic matter and dissolved ammonia are diluted by more than 100-fold, completely neutralizing toxic concentrations and maintaining saturated dissolved oxygen (DO > 6.5 mg/L).",
                          "Matéria orgânica e amônia dissolvida são diluídas em mais de 100 vezes, neutralizando concentrações tóxicas e mantendo oxigênio saturado (OD > 6,5 mg/L)."
                        )}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                      <span className="text-xs font-bold text-white block">{t("Aquaculture Osmotic Precaution", "Cautela Osmótica para Carcinicultura")}</span>
                      <p className="text-xs text-slate-300">
                        {t(
                          "Rapid freshwater influx drops estuarine salinity below 5 PSU. Farms must close intake gates during peak discharge to prevent osmotic shock in Litopenaeus vannamei.",
                          "A queda rápida da salinidade abaixo de 5 PSU exige fechar comportas de captação durante o pico para evitar choque osmótico no camarão Litopenaeus vannamei."
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Module 2: Worst vs Best Biological Effluent Detailed Demonstration */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    <Flame className="h-4 w-4" />
                    <span>{t("Biological Effluent Benchmarking: Worst Case vs. Best Practice", "Comparativo de Efluente Biológico: Pior Caso vs. Melhor Prática")}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1.5 text-xs">
                    <button
                      onClick={() => setEffluentView("comparison")}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                        effluentView === "comparison" ? "bg-white/20 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t("Side-by-Side", "Lado a Lado")}
                    </button>
                    <button
                      onClick={() => setEffluentView("worst")}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                        effluentView === "worst" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t("Worst Effluent", "Pior Efluente")}
                    </button>
                    <button
                      onClick={() => setEffluentView("best")}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                        effluentView === "best" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {t("Best Effluent", "Melhor Efluente")}
                    </button>
                  </div>
                </div>

                {/* Side-by-Side Comparative Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* WORST BIOLOGICAL EFFLUENT CARD */}
                  {(effluentView === "comparison" || effluentView === "worst") && (
                    <div className="rounded-2xl border border-rose-500/40 bg-rose-950/20 p-5 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-rose-500/30 pb-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-rose-400" />
                          <h4 className="font-extrabold text-white text-base">
                            {t("Worst Biological Effluent Scenario", "Pior Cenário de Efluente Biológico")}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          {t("Untreated Sludge / Neap Tide", "Lodo Bruto / Maré Morta")}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t(
                          "Direct discharging of anaerobic bottom pond sludge during neap tide (minimal water exchange). Unconsumed feed pellets and shrimp feces ferment under anoxia, generating high toxic ammonia and hydrogen sulfide.",
                          "Descarte direto do lodo de fundo anaeróbio durante maré de quadratura (morta). Sobras de ração e fezes fermentam em anoxia, gerando amônia tóxica e sulfeto de hidrogênio (H₂S)."
                        )}
                      </p>

                      {/* Chemical Parameters Table */}
                      <div className="space-y-2 pt-1 font-mono text-xs">
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-rose-500/20">
                          <span className="text-slate-400">{t("Biochemical Oxygen Demand (BOD₅):", "Demanda Bioquímica (DBO₅):")}</span>
                          <span className="font-bold text-rose-400">&gt; 80 mg/L (Critical)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-rose-500/20">
                          <span className="text-slate-400">{t("Chemical Oxygen Demand (COD):", "Demanda Química (DQO):")}</span>
                          <span className="font-bold text-rose-400">&gt; 260 mg/L</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-rose-500/20">
                          <span className="text-slate-400">{t("Toxic Un-ionized Ammonia (NH₃):", "Amônia Tóxica Não-Ionizada (NH₃):")}</span>
                          <span className="font-bold text-rose-400">&gt; 0.8 mg/L (Lethal)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-rose-500/20">
                          <span className="text-slate-400">{t("Total Phosphorus (TP):", "Fósforo Total (PT):")}</span>
                          <span className="font-bold text-rose-400">&gt; 2.5 mg/L</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-rose-500/20">
                          <span className="text-slate-400">{t("Pathogenic Load (Vibrio spp.):", "Carga Patogênica (Vibrio spp.):")}</span>
                          <span className="font-bold text-rose-400">&gt; 10⁵ CFU/mL (High)</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-rose-300/90 bg-rose-950/40 p-3 rounded-xl border border-rose-500/30">
                        <strong>{t("Consequences:", "Consequências:")}</strong>{" "}
                        {t(
                          "Benthic suffocation, severe coastal red tides (dinoflagellates), self-contamination of intake water for downstream farms, and destruction of mangrove crab nurseries.",
                          "Sufocamento bentônico, marés vermelhas (dinoflagelados), auto-contaminação de captações de fazendas vizinhas e destruição de berçários de caranguejo."
                        )}
                      </div>
                    </div>
                  )}

                  {/* BEST BIOLOGICAL EFFLUENT CARD */}
                  {(effluentView === "comparison" || effluentView === "best") && (
                    <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5 space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          <h4 className="font-extrabold text-white text-base">
                            {t("Best Biological Effluent Practice", "Melhor Prática de Efluente Biológico")}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {t("RAS + Mangrove Biofilter / Spring Ebb", "RAS + Biofiltro de Mangue / Sizígia")}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {t(
                          "Recirculating Aquaculture System (RAS) with rotating drum micro-screening to separate solid feces for agricultural fertilizer, 48-hour settling basin, and biological polishing through constructed Rhizophora mangle wetlands released exclusively on spring ebb tide.",
                          "Sistema com recirculação (RAS), microfiltragem mecânica do lodo fecal para compostagem agrícola, bacia de sedimentação de 48h e polimento biológico em manguezal construído (Rhizophora mangle) com descarte na vazante de sizígia."
                        )}
                      </p>

                      {/* Chemical Parameters Table */}
                      <div className="space-y-2 pt-1 font-mono text-xs">
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-emerald-500/20">
                          <span className="text-slate-400">{t("Biochemical Oxygen Demand (BOD₅):", "Demanda Bioquímica (DBO₅):")}</span>
                          <span className="font-bold text-emerald-400">&lt; 12 mg/L (Pristine)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-emerald-500/20">
                          <span className="text-slate-400">{t("Chemical Oxygen Demand (COD):", "Demanda Química (DQO):")}</span>
                          <span className="font-bold text-emerald-400">&lt; 45 mg/L</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-emerald-500/20">
                          <span className="text-slate-400">{t("Toxic Un-ionized Ammonia (NH₃):", "Amônia Tóxica Não-Ionizada (NH₃):")}</span>
                          <span className="font-bold text-emerald-400">&lt; 0.03 mg/L (Safe)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-emerald-500/20">
                          <span className="text-slate-400">{t("Total Phosphorus (TP):", "Fósforo Total (PT):")}</span>
                          <span className="font-bold text-emerald-400">&lt; 0.3 mg/L (Absorbed)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-emerald-500/20">
                          <span className="text-slate-400">{t("Dissolved Oxygen (DO):", "Oxigênio Dissolvido (OD):")}</span>
                          <span className="font-bold text-emerald-400">&gt; 5.5 mg/L (Saturated)</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-emerald-300/90 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30">
                        <strong>{t("Outcomes:", "Resultados:")}</strong>{" "}
                        {t(
                          "Pristine estuary clarity, enhanced mangrove growth from nutrient bio-uptake, zero pathogen accumulation, sustained international export certifications, and robust shrimp yields.",
                          "Transparência da água preservada, bioassimilação de nutrientes pelos mangues, zero proliferação patogênica, certificações internacionais de exportação e colheitas vigorosas."
                        )}
                      </div>
                    </div>
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
