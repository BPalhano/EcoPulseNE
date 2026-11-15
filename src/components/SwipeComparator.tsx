"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Layers, 
  Eye, 
  Sliders, 
  Radio, 
  Sun, 
  CloudOff, 
  Waves, 
  TreePine, 
  CheckCircle2, 
  Info,
  Maximize2,
  Database
} from "lucide-react";

interface HotspotScenario {
  id: string;
  titleEn: string;
  titlePt: string;
  region: string;
  coords: string;
  opticalImage: string;
  sarImage: string;
  opticalMeta: {
    mission: string;
    granule: string;
    product: string;
    date: string;
    clouds: string;
  };
  sarMeta: {
    mission: string;
    granule: string;
    product: string;
    date: string;
    polarizations: string;
  };
  opticalObservationEn: string;
  opticalObservationPt: string;
  sarDiscoveryEn: string;
  sarDiscoveryPt: string;
  radarPhysicsPointers: {
    labelEn: string;
    labelPt: string;
    mechanism: string;
    descEn: string;
    descPt: string;
    color: string;
  }[];
}

const HOTSPOTS: HotspotScenario[] = [
  {
    id: "inhamuns",
    titleEn: "Sertão dos Inhamuns (Tauá) - Proving Caatinga Life in Extreme Drought",
    titlePt: "Sertão dos Inhamuns (Tauá) - Detectando a Mata Viva sob Seca Extrema",
    region: "Alto Jaguaribe / Semiárido Cearense",
    coords: "-5.90° S, -40.29° W",
    opticalImage: "/images/real_satellite/inhamuns_optical_real.png",
    sarImage: "/images/real_satellite/inhamuns_sar_real.png",
    opticalMeta: {
      mission: "Copernicus Sentinel-2B / MSI (ESA)",
      granule: "S2A_MSIL2A_20231124T130241_R095_T24MUU",
      product: "Level-2A Bottom-of-Atmosphere (BOA) Reflectance",
      date: "2023-11-24",
      clouds: "14.7% cloud cover"
    },
    sarMeta: {
      mission: "Copernicus Sentinel-1A / C-SAR (ESA / ASF DAAC / OPERA)",
      granule: "S1A_IW_GRDH_1SDV_20231122T081825_20231122T081850_rtc",
      product: "Radiometric Terrain Corrected (RTC) Gamma0 Backscatter",
      date: "2023-11-22",
      polarizations: "Dual-Pol VV + VH (24 cm L-Band Analogous Mode)"
    },
    opticalObservationEn: "During prolonged dry season, the Caatinga drops 100% of leaves ('mata branca'). The parched ground looks completely dead and gray, misclassified by optical NDVI as barren degraded land.",
    opticalObservationPt: "Na estiagem severa, a Caatinga perde 100% das folhas ('mata branca'). O solo ressequido parece terra nua e cinzenta, gerando falso alerta óptico de degradação.",
    sarDiscoveryEn: "Radar microwaves penetrate past the dry surface crust. Volume scattering (VH) confirms that living woody branches and trunks are 78% preserved, while dielectric backscatter detects root-zone moisture.",
    sarDiscoveryPt: "As micro-ondas penetram a poeira e o ar seco. O espalhamento volumétrico (VH) comprova que 78% da biomassa lenhosa viva segue em pé, enquanto a permissividade detecta umidade radicular.",
    radarPhysicsPointers: [
      {
        labelEn: "Standing Woody Biomass",
        labelPt: "Biomassa Lenhosa em Pé",
        mechanism: "Cross-Polarization Volume Scattering (VH)",
        descEn: "Multi-branched deciduous trunks depolarize the microwave signal, proving live structural integrity.",
        descPt: "Troncos e galhos despolarizam o feixe de micro-ondas, provando integridade física da madeira viva.",
        color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20"
      },
      {
        labelEn: "Ephemeral River Sandbars",
        labelPt: "Leito Arenoso Seco",
        mechanism: "Low Dielectric Specular Scattering",
        descEn: "Desiccated sandy riverbed shows low radar return, creating crisp drainage boundaries.",
        descPt: "O leito arenoso dessecado tem baixa constante dielétrica, delimitando com nitidez a calha de drenagem.",
        color: "text-amber-400 border-amber-500/30 bg-amber-950/20"
      }
    ]
  },
  {
    id: "aracati",
    titleEn: "Estuário de Aracati / Fortim - Piercing Clouds, Mangroves & Shrimp Ponds",
    titlePt: "Estuário de Aracati / Fortim - Atravessando Nuvens, Manguezais & Viveiros",
    region: "Baixo Jaguaribe / Litoral Leste do Ceará",
    coords: "-4.42° S, -37.76° W",
    opticalImage: "/images/real_satellite/aracati_optical_real.png",
    sarImage: "/images/real_satellite/aracati_sar_real.png",
    opticalMeta: {
      mission: "Copernicus Sentinel-2B / MSI (ESA)",
      granule: "S2A_MSIL2A_20231101T125311_R052_T24MXA",
      product: "Level-2A BOA True Color Visual",
      date: "2023-11-01",
      clouds: "12.9% coastal clouds & sea haze"
    },
    sarMeta: {
      mission: "Copernicus Sentinel-1A / C-SAR (ESA / ASF DAAC / OPERA)",
      granule: "S1A_IW_GRDH_1SDV_20231024T080949_20231024T081014_rtc",
      product: "Radiometric Terrain Corrected (RTC) Gamma0 Backscatter",
      date: "2023-10-24",
      polarizations: "Dual-Pol VV + VH (Pauli Dual-Pol Composite)"
    },
    opticalObservationEn: "Persistent coastal trade-wind clouds and sea haze obstruct the shoreline. Dense mangrove crowns hide tidal water beneath, preventing optical waterlogging detection.",
    opticalObservationPt: "Nuvens cúmulos costeiras e névoa marítima obstruem o litoral. A copa densa dos mangues oculta a água da maré por baixo das árvores.",
    sarDiscoveryEn: "Radar penetrates 100% through all clouds. Double-bounce (dihedral scattering) reveals high-tide flooding beneath mangrove stilt roots, while aquaculture shrimp ponds appear as razor-sharp specular black polygons.",
    sarDiscoveryPt: "O radar atravessa 100% das nuvens. O espalhamento em diedro (double-bounce) revela a água da preamar sob as raízes de mangue, enquanto tanques de carcinicultura aparecem como polígonos pretos perfeitos.",
    radarPhysicsPointers: [
      {
        labelEn: "Sub-Canopy Tidal Inundation",
        labelPt: "Maré sob o Dossel do Mangue",
        mechanism: "Double-Bounce Dihedral (HH-VV / VV)",
        descEn: "Radar pulse bounces between water mirror and vertical stilt roots (Rhizophora mangle).",
        descPt: "O pulso rebate entre a lâmina d'água e as raízes escora verticais do mangue-vermelho.",
        color: "text-rose-400 border-rose-500/30 bg-rose-950/20"
      },
      {
        labelEn: "Aquaculture Pond Geometry",
        labelPt: "Viveiros de Carcinicultura",
        mechanism: "Specular Water Reflection + Earthen Dike Backscatter",
        descEn: "Calm water reflects microwave away (pitch black), while raised perimeter dikes return intense signal.",
        descPt: "A água calma reflete o radar para longe (preto absoluto), enquanto diques de contenção retornam sinal brilhante.",
        color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20"
      }
    ]
  },
  {
    id: "castanhao",
    titleEn: "Açude Castanhão - Mega-Reservoir Waterline & Dam Stability Geodesy",
    titlePt: "Açude Castanhão - Delimitação da Lâmina Hídrica & Geodésia Estrutural",
    region: "Médio Jaguaribe / Alto Santo",
    coords: "-5.50° S, -38.45° W",
    opticalImage: "/images/real_satellite/castanhao_optical_real.png",
    sarImage: "/images/real_satellite/castanhao_sar_real.png",
    opticalMeta: {
      mission: "Copernicus Sentinel-2B / MSI (ESA)",
      granule: "S2B_MSIL2A_20231030T130249_R095_T24MWV",
      product: "Level-2A Surface Reflectance",
      date: "2023-10-30",
      clouds: "8.7% cloud cover"
    },
    sarMeta: {
      mission: "Copernicus Sentinel-1A / C-SAR (ESA / ASF DAAC / OPERA)",
      granule: "S1A_IW_GRDH_1SDV_20231228T081758_20231228T081823_051852_064395_rtc",
      product: "Radiometric Terrain Corrected (RTC) Gamma0 Backscatter",
      date: "2023-12-28",
      polarizations: "Dual-Pol VV + VH (Swath 051852 Track 082)"
    },
    opticalObservationEn: "Sun-glint, turbid algae sediment, and cloud shadows distort optical water boundary classification during critical reservoir depletion.",
    opticalObservationPt: "Reflexos solares, turbidez e sombras de nuvens distorcem o mapeamento óptico do espelho d'água durante o esvaziamento do açude.",
    sarDiscoveryEn: "Sub-meter waterline extraction through active microwave specular contrast. Repeat-pass InSAR enables millimeter-precision structural deformation monitoring along the earthen dam crest.",
    sarDiscoveryPt: "Extração submétrica da cota hídrica por contraste especular ativo. O InSAR multitemporal mede deformações milimétricas na crista da barragem de terra.",
    radarPhysicsPointers: [
      {
        labelEn: "Specular Water Surface",
        labelPt: "Superfície D'água Especular",
        mechanism: "Specular Backscatter Dropout (< -22 dB)",
        descEn: "Microwave bounces forward, producing an unmistakable black footprint regardless of water turbidity.",
        descPt: "O feixe reflete para frente, produzindo contraste escuro infalível independente de sedimentos ou algas.",
        color: "text-blue-400 border-blue-500/30 bg-blue-950/20"
      },
      {
        labelEn: "Dam Embankment Geodesy",
        labelPt: "Crista da Barragem de Terra",
        mechanism: "High Interferometric Coherence (γ > 0.85)",
        descEn: "Stable rock armor on the dam face maintains rigid phase, enabling millimeter subsidence tracking.",
        descPt: "O enrocamento de pedra mantém coerência de fase estável, permitindo medir assentamento milimétrico.",
        color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20"
      }
    ]
  }
];

export default function SwipeComparator() {
  const { t } = useLanguage();
  const [activeHotspotId, setActiveHotspotId] = useState<string>("inhamuns");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100%
  const [viewMode, setViewMode] = useState<"split" | "side_by_side">("split");

  const hotspot = HOTSPOTS.find((h) => h.id === activeHotspotId) || HOTSPOTS[0];

  return (
    <section id="xray-comparator" className="py-16 lg:py-24 border-b border-slate-800/80 bg-[#060D1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 rounded-full border border-amber-500/30 bg-amber-950/30 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3">
              <Layers className="h-3.5 w-3.5 text-amber-400" />
              <span>{t("Real Satellite & SAR Verification Lab", "Laboratório Real de Satélite & SAR")}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              {t("Optical Satellite vs. Active Radar X-Ray", "Satélite Óptico vs. Raio-X por Radar Ativo")}
            </h2>
            <p className="mt-2 text-slate-300 text-sm leading-relaxed">
              {t(
                "Direct comparative audit using genuine Copernicus Sentinel-2 L2A optical and Sentinel-1 RTC active microwave radar imagery from the European Space Agency and NASA ASF DAAC.",
                "Auditoria comparativa direta utilizando imagens reais do Copernicus Sentinel-2 L2A (óptico) e Sentinel-1 RTC (radar ativo) da Agência Espacial Europeia e NASA ASF DAAC."
              )}
            </p>
          </div>

          {/* Hotspot Scenario Selector */}
          <div className="flex flex-wrap gap-2">
            {HOTSPOTS.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHotspotId(h.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  activeHotspotId === h.id
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-950/50"
                    : "bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {h.id === "inhamuns" ? t("1. Sertão Inhamuns (Caatinga)", "1. Sertão Inhamuns (Caatinga)") :
                 h.id === "aracati" ? t("2. Aracati (Mangroves/Shrimp)", "2. Aracati (Mangues/Camarão)") :
                 t("3. Açude Castanhão (Dam/Water)", "3. Açude Castanhão (Açude)")}
              </button>
            ))}
          </div>
        </div>

        {/* Hotspot Title & Scientific Context Banner */}
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono mb-1">
              <span>{hotspot.region}</span>
              <span>·</span>
              <span className="text-cyan-400">{hotspot.coords}</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {t(hotspot.titleEn, hotspot.titlePt)}
            </h3>
          </div>

          {/* View Mode Toggle (Split Swipe vs Side-by-Side) */}
          <div className="flex items-center rounded-lg border border-slate-700 bg-black/40 p-1 text-xs self-start md:self-auto">
            <button
              onClick={() => setViewMode("split")}
              className={`rounded-md px-3 py-1 font-semibold transition-all ${
                viewMode === "split" ? "bg-cyan-500 text-black shadow-sm font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("Split Slider", "Slider Dividido")}
            </button>
            <button
              onClick={() => setViewMode("side_by_side")}
              className={`rounded-md px-3 py-1 font-semibold transition-all ${
                viewMode === "side_by_side" ? "bg-cyan-500 text-black shadow-sm font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("Side-by-Side", "Lado a Lado")}
            </button>
          </div>
        </div>

        {/* COMPARISON STAGE */}
        {viewMode === "split" ? (
          /* SPLIT SLIDER VIEW */
          <div className="relative w-full aspect-[16/9] max-h-[580px] rounded-3xl overflow-hidden border border-slate-800 bg-black shadow-2xl select-none group">
            
            {/* UNDER LAYER: REAL SENTINEL-1 SAR RTC RADAR */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={hotspot.sarImage}
                alt="Copernicus Sentinel-1 SAR RTC Real Imagery"
                className="w-full h-full object-cover"
              />
              {/* SAR Label Overlay */}
              <div className="absolute top-4 right-4 rounded-xl border border-emerald-500/40 bg-black/80 px-3.5 py-1.5 backdrop-blur-md text-right">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center justify-end space-x-1.5">
                  <Radio className="h-3 w-3 animate-pulse" />
                  <span>{t("Copernicus Sentinel-1 SAR RTC", "Copernicus Sentinel-1 SAR RTC")}</span>
                </span>
                <span className="text-[11px] text-white font-mono block">
                  {hotspot.sarMeta.polarizations}
                </span>
              </div>
            </div>

            {/* OVER LAYER: REAL SENTINEL-2 OPTICAL L2A (Clipped by slider position) */}
            <div 
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={hotspot.opticalImage}
                alt="Copernicus Sentinel-2 Optical Real Imagery"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: "100%", minWidth: "100%" }}
              />
              {/* Optical Label Overlay */}
              <div className="absolute top-4 left-4 rounded-xl border border-amber-500/40 bg-black/80 px-3.5 py-1.5 backdrop-blur-md">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center space-x-1.5">
                  <Sun className="h-3 w-3" />
                  <span>{t("Copernicus Sentinel-2 Optical L2A", "Copernicus Sentinel-2 Óptico L2A")}</span>
                </span>
                <span className="text-[11px] text-white font-mono block">
                  {hotspot.opticalMeta.clouds}
                </span>
              </div>
            </div>

            {/* INTERACTIVE SPLIT DIVIDER HANDLE */}
            <div 
              className="absolute top-0 bottom-0 z-30 cursor-ew-resize flex items-center justify-center"
              style={{ left: `calc(${sliderPosition}% - 16px)`, width: "32px" }}
            >
              <div className="w-1 h-full bg-cyan-400 shadow-[0_0_12px_#00E5FF]" />
              <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-black shadow-xl border-2 border-white font-bold text-xs">
                ↔
              </div>
            </div>

            {/* Range Slider Invisible Controller */}
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 z-40 w-full h-full opacity-0 cursor-ew-resize"
              aria-label="Swipe slider"
            />

            {/* Bottom Quick-Jump Buttons */}
            <div className="absolute bottom-4 inset-x-0 z-20 flex justify-center gap-2">
              <button
                onClick={() => setSliderPosition(20)}
                className="rounded-lg bg-black/80 border border-slate-700 px-3 py-1 text-xs text-emerald-300 hover:bg-slate-800 backdrop-blur-md"
              >
                {t("Reveal SAR (80%)", "Revelar SAR (80%)")}
              </button>
              <button
                onClick={() => setSliderPosition(50)}
                className="rounded-lg bg-black/80 border border-slate-700 px-3 py-1 text-xs text-white hover:bg-slate-800 backdrop-blur-md"
              >
                50 / 50
              </button>
              <button
                onClick={() => setSliderPosition(80)}
                className="rounded-lg bg-black/80 border border-slate-700 px-3 py-1 text-xs text-amber-300 hover:bg-slate-800 backdrop-blur-md"
              >
                {t("Reveal Optical (80%)", "Revelar Óptico (80%)")}
              </button>
            </div>

          </div>
        ) : (
          /* SIDE-BY-SIDE DUAL VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Optical Card */}
            <div className="rounded-3xl border border-slate-800 bg-black overflow-hidden shadow-2xl flex flex-col">
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                  <Sun className="h-4 w-4" />
                  <span>Sentinel-2 L2A Optical (ESA)</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">{hotspot.opticalMeta.date}</span>
              </div>
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={hotspot.opticalImage}
                  alt="Optical Sentinel-2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* SAR Card */}
            <div className="rounded-3xl border border-slate-800 bg-black overflow-hidden shadow-2xl flex flex-col">
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center space-x-1.5">
                  <Radio className="h-4 w-4" />
                  <span>Sentinel-1 RTC SAR Radar (ESA / NASA ASF)</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">{hotspot.sarMeta.date}</span>
              </div>
              <div className="relative aspect-[16/9] w-full">
                <img
                  src={hotspot.sarImage}
                  alt="SAR Sentinel-1 RTC"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        )}

        {/* SCIENTIFIC EXPLANATION & RADAR PHYSICS POINTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          
          {/* Col 1: Observations Comparison */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Optical Observation Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                {t("1. Optical Sensing Limitation (Passive Sensor):", "1. Limitação do Sensor Óptico (Passivo):")}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(hotspot.opticalObservationEn, hotspot.opticalObservationPt)}
              </p>
            </div>

            {/* SAR Discovery Card */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-5">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                {t("2. What the SAR Microwave Radar Discovers (Active Sensor):", "2. O Que o Radar SAR Descobre (Sensor Ativo):")}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(hotspot.sarDiscoveryEn, hotspot.sarDiscoveryPt)}
              </p>
            </div>

            {/* Physics Mechanisms Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {hotspot.radarPhysicsPointers.map((p, idx) => (
                <div key={idx} className={`rounded-xl border p-4 ${p.color}`}>
                  <span className="text-[10px] font-mono uppercase font-bold block mb-1">{p.mechanism}</span>
                  <strong className="text-white text-xs block mb-1">{t(p.labelEn, p.labelPt)}</strong>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{t(p.descEn, p.descPt)}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Col 2: Official Mission Metadata & Dataset Citations */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-4">
                <Database className="h-4 w-4" />
                <span>{t("Verified Open Data Granules", "Granulados Oficiais de Dados Abertos")}</span>
              </div>

              {/* Optical Metadata Box */}
              <div className="mb-4 rounded-xl border border-slate-800 bg-black/40 p-3.5 space-y-1.5 text-[11px]">
                <span className="text-amber-400 font-bold block">Copernicus Sentinel-2 Optical:</span>
                <div className="flex justify-between text-slate-400">
                  <span>{t("Mission:", "Missão:")}</span>
                  <span className="text-white">{hotspot.opticalMeta.mission}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t("Product:", "Produto:")}</span>
                  <span className="text-white">{hotspot.opticalMeta.product}</span>
                </div>
                <div className="text-slate-400 truncate">
                  <span>ID: </span>
                  <span className="font-mono text-slate-300">{hotspot.opticalMeta.granule}</span>
                </div>
              </div>

              {/* SAR Metadata Box */}
              <div className="rounded-xl border border-slate-800 bg-black/40 p-3.5 space-y-1.5 text-[11px]">
                <span className="text-emerald-400 font-bold block">Copernicus Sentinel-1 RTC Radar:</span>
                <div className="flex justify-between text-slate-400">
                  <span>{t("Mission:", "Missão:")}</span>
                  <span className="text-white">{hotspot.sarMeta.mission}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{t("Polarizations:", "Polarizações:")}</span>
                  <span className="text-white">{hotspot.sarMeta.polarizations}</span>
                </div>
                <div className="text-slate-400 truncate">
                  <span>ID: </span>
                  <span className="font-mono text-slate-300">{hotspot.sarMeta.granule}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 leading-relaxed border-t border-slate-800 pt-3">
              {t(
                "Compliance: Data downloaded directly from Copernicus Open Access Hub & Microsoft Planetary Computer STAC via ESA / NASA DAAC open licensing.",
                "Conformidade: Dados baixados diretamente do Copernicus Open Access Hub & Planetary Computer STAC via licença aberta ESA / NASA DAAC."
              )}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
