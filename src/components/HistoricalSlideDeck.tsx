"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Droplet, 
  TreePine, 
  Activity, 
  Waves, 
  ShieldAlert, 
  CheckCircle2, 
  Compass, 
  Layers,
  ArrowRight
} from "lucide-react";

export interface HistoricalEra {
  period: string;
  yearStart: number;
  yearEnd: number;
  syncYear: number; // Milestone year in the map timeline
  titleEn: string;
  titlePt: string;
  climateBadgeEn: string;
  climateBadgePt: string;
  rainfallAnomalyPct: number; // e.g. +24% or -45%
  castanhaoStoragePct: number;
  castanhaoAreaKm2: number;
  caatingaBiomassIndex: number; // 0 to 100
  salinityIntrusionKm: number;
  aquaculturePondAreaHa: number;
  narrativeEn: string;
  narrativePt: string;
  ecologicalImpactEn: string;
  ecologicalImpactPt: string;
  mitigationEn: string;
  mitigationPt: string;
  sarContextEn: string;
  sarContextPt: string;
}

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    period: "1985–1990",
    yearStart: 1985,
    yearEnd: 1990,
    syncYear: 1985,
    titleEn: "Pre-Dam Natural Flow & Pristine Estuary",
    titlePt: "Regime Natural Pré-Barragem & Estuário Primitivo",
    climateBadgeEn: "Balanced Tropical Semi-Arid",
    climateBadgePt: "Semiárido Tropical Equilibrado",
    rainfallAnomalyPct: +8,
    castanhaoStoragePct: 88,
    castanhaoAreaKm2: 310,
    caatingaBiomassIndex: 92,
    salinityIntrusionKm: 4.5,
    aquaculturePondAreaHa: 120,
    narrativeEn: "Before the Castanhão dam was built, the Jaguaribe pulsed seasonally as 'the world's largest dry river'. High summer monsoon floods flushed sediments straight into the Atlantic Ocean, keeping estuarine salinity low and sustaining extensive artisanal crab gathering in Aracati.",
    narrativePt: "Antes da construção do Açude Castanhão, o Jaguaribe operava em pulsos naturais como 'o maior rio seco do mundo'. As cheias de verão lavavam a bacia e desaguavam livremente no Atlântico, mantendo a salinidade baixa e sustentando a pesca artesanal de caranguejo em Aracati.",
    ecologicalImpactEn: "Natural seasonal flood disturbance scoured sandbars and sustained healthy mangrove propagation. Hypersaline apicum flats remained largely pristine with minimal human footprint.",
    ecologicalImpactPt: "As cheias anuais limpavam a calha e renovavam os manguezais. Os apicuns hipersalinos permaneciam preservados, com mínima ocupação humana.",
    mitigationEn: "Maintenance of riparian forest corridors and respect for natural floodway margins.",
    mitigationPt: "Preservação das matas ciliares nativas e respeito aos limites naturais de cheia do rio.",
    sarContextEn: "Historical Landsat/ERS-1 active radar baseline: High seasonal backscatter contrast between wet flood inundation and dry-season deciduous bare ground.",
    sarContextPt: "Marco zero ERS-1/Landsat: Forte contraste sazonal entre inundação de cheia e solo exposto no estio."
  },
  {
    period: "1991–1995",
    yearStart: 1991,
    yearEnd: 1995,
    syncYear: 1995,
    titleEn: "High Flood Pulses & Early Aquaculture Expansion",
    titlePt: "Ciclo de Grandes Cheias & Início da Carcinicultura",
    climateBadgeEn: "Wet Pulse Years (1994–1995)",
    climateBadgePt: "Anos Chuvosos (1994–1995)",
    rainfallAnomalyPct: +26,
    castanhaoStoragePct: 89,
    castanhaoAreaKm2: 315,
    caatingaBiomassIndex: 94,
    salinityIntrusionKm: 4.0,
    aquaculturePondAreaHa: 480,
    narrativeEn: "Intense rainfall years flushed the entire Jaguaribe basin with heavy sediment loads. Concurrently, pioneering shrimp aquaculture ventures began converting high-salinity apicum mudflats in Aracati and Fortim into production ponds.",
    narrativePt: "Anos chuvosos provocaram grandes enchentes no Jaguaribe, com intenso transporte de sedimentos. Ao mesmo tempo, pioneiros da carcinicultura começaram a converter apicuns hipersalinos em Aracati e Fortim em viveiros de cultivo.",
    ecologicalImpactEn: "Heavy alluvial sedimentation covered lower floodplains. Initial pond dikes altered tidal flow in secondary estuary creeks.",
    ecologicalImpactPt: "Forte assoreamento em meandros baixos. Primeiros diques de viveiros alteraram a circulação de maré em gamboas secundárias.",
    mitigationEn: "Early licensing requiring containment dikes to prevent sediment runoff into main navigation channels.",
    mitigationPt: "Licenciamento inicial exigindo diques de contenção para evitar carreamento de terra para os canais de navegação.",
    sarContextEn: "C-band radar detects specular water reflection expanding over floodplains; emergent earthen pond dikes exhibit sharp dihedral backscatter.",
    sarContextPt: "Radar em banda C detecta expansão de lâmina d'água; diques elevados de terra geram forte reflexão em diedro."
  },
  {
    period: "1996–2000",
    yearStart: 1996,
    yearEnd: 2000,
    syncYear: 2000,
    titleEn: "Castanhão Mega-Dam Engineering & River Reconfiguration",
    titlePt: "Construção do Açude Castanhão & Transformação Hidráulica",
    climateBadgeEn: "Moderate Fluctuations & Construction Phase",
    climateBadgePt: "Oscilações Hídricas & Obras de Engenharia",
    rainfallAnomalyPct: -12,
    castanhaoStoragePct: 74,
    castanhaoAreaKm2: 270,
    caatingaBiomassIndex: 86,
    salinityIntrusionKm: 8.5,
    aquaculturePondAreaHa: 890,
    narrativeEn: "The construction of Latin America's largest earthen dam (Castanhão, 6.7 billion m³) mobilized massive earthworks. The dam was designed to permanently eradicate the threat of drought in Fortaleza and secure agricultural irrigation in the Médio Jaguaribe.",
    narrativePt: "A construção da maior barragem de terra da América Latina (Castanhão, 6,7 bi m³) mobilizou obras gigantescas. O açude foi projetado para garantir o abastecimento humano de Fortaleza e perenizar o vale agrícola.",
    ecologicalImpactEn: "River diversion works altered downstream sediment equilibrium. Old Jaguaribara town was relocated. Estuarine shrimp pond area expanded to 890 ha.",
    ecologicalImpactPt: "Desvio do leito fluvial alterou o transporte de sedimentos. A antiga cidade de Jaguaribara foi submersa e reconstruída. A carcinicultura saltou para 890 ha.",
    mitigationEn: "Comprehensive resettlement of Jaguaribara urban population; biological salvage programs for Caatinga fauna.",
    mitigationPt: "Reassentamento urbano planejado de Nova Jaguaribara; programas de resgate de fauna e flora da Caatinga.",
    sarContextEn: "Repeat-pass radar interferometry used to establish geological baseline stability for the 30 km earthen dam footprint.",
    sarContextPt: "Interferometria de radar multitemporal estabelece linha de base geodésica para os 30 km de enrocamento da barragem."
  },
  {
    period: "2001–2005",
    yearStart: 2001,
    yearEnd: 2005,
    syncYear: 2004,
    titleEn: "First Full Reservoir Spillway (2004) & Flow Regulation",
    titlePt: "Sangria Histórica (2004) & Perenização Definitiva",
    climateBadgeEn: "Super Wet Pulse (2004 Spillway)",
    climateBadgePt: "Super Pulso Úmido (Sangria de 2004)",
    rainfallAnomalyPct: +42,
    castanhaoStoragePct: 100,
    castanhaoAreaKm2: 325,
    caatingaBiomassIndex: 95,
    salinityIntrusionKm: 3.5,
    aquaculturePondAreaHa: 1350,
    narrativeEn: "In 2004, historic rainfall completely filled Castanhão, triggering its massive spillway discharge. The downstream river was transformed from an intermittent ephemeral stream into a permanently regulated river, boosting irrigation in Limoeiro and Russas.",
    narrativePt: "Em 2004, chuvas torrenciais históricas encheram 100% do Castanhão, provocando sangria espetacular. O Jaguaribe deixou de ser intermitente e passou a ter vazão perenizada e controlada por comportas.",
    ecologicalImpactEn: "Massive freshwater pulse flushed Aracati estuary, driving ocean salinity kilometers offshore. Downstream floodplains flourished.",
    ecologicalImpactPt: "O gigantesco pulso de água doce empurrou a salinidade marinha para fora do estuário, lavando todo o sistema de manguezais.",
    mitigationEn: "Floodgate discharge protocols formulated to avoid inundating vulnerable informal settlements built along floodplains.",
    mitigationPt: "Protocolos de abertura gradual de comportas para evitar inundação de comunidades instaladas nas várzeas ribeirinhas.",
    sarContextEn: "Specular SAR backscatter accurately maps the 325 km² maximum water mirror under dense torrential storm cloud cover.",
    sarContextPt: "O radar SAR delimita com perfeição o espelho d'água máximo de 325 km² através da pesada cobertura de nuvens de chuva."
  },
  {
    period: "2006–2010",
    yearStart: 2006,
    yearEnd: 2010,
    syncYear: 2008,
    titleEn: "Carciniculture Boom & Abundant Water Reserves",
    titlePt: "Boom da Carcinicultura & Fartura Hídrica Plurianual",
    climateBadgeEn: "Consecutive Surplus Rain Years (2008–2009)",
    climateBadgePt: "Anos Fartos Consecutivos (2008–2009)",
    rainfallAnomalyPct: +28,
    castanhaoStoragePct: 100,
    castanhaoAreaKm2: 325,
    caatingaBiomassIndex: 92,
    salinityIntrusionKm: 3.8,
    aquaculturePondAreaHa: 1850,
    narrativeEn: "Castanhão spilled again in 2008 and 2009. Stable water supply spurred exponential growth in shrimp aquaculture, making Ceará Brazil's leading producer. Continuous regulated freshwater discharge diluted pond effluents naturally.",
    narrativePt: "O Castanhão sangrou novamente em 2008 e 2009. A segurança hídrica provocou expansão vertiginosa dos viveiros de camarão em Aracati, tornando o Ceará líder nacional. A vazão contínua garantia diluição natural dos efluentes.",
    ecologicalImpactEn: "Rapid conversion of estuarine margins into dikes and ponds. Nutrient loads increased, but abundant freshwater river discharge prevented estuarine hypoxia (oxygen collapse).",
    ecologicalImpactPt: "Rápida conversão de margens estuarinas em diques e viveiros. A carga de nutrientes aumentou, porém a abundante vazão doce do rio impediu a hipóxia estuarina (colapso de oxigênio).",
    mitigationEn: "Implementation of basin water committees (Comitê de Bacia do Baixo Jaguaribe) for participatory water allocation.",
    mitigationPt: "Consolidação dos Comitês de Bacia Hidrográfica para gestão participativa e alocação negociada de água.",
    sarContextEn: "Dual-polarization SAR backscatter confirms 1,850 ha of geometrically squared shrimp ponds with intense perimeter dike returns.",
    sarContextPt: "Radar polarimétrico delimita 1.850 ha de viveiros com geometria retangular perfeita e alta reflexão nos taludes."
  },
  {
    period: "2011–2015",
    yearStart: 2011,
    yearEnd: 2015,
    syncYear: 2014,
    titleEn: "Onset of the Historic Caatinga Megadrought",
    titlePt: "Eclosão da Pior Megaseca Moderna & Retenção Hídrica",
    climateBadgeEn: "Severe Plurianual Drought (El Niño Super-Cycle)",
    climateBadgePt: "Seca Severa Prolongada (Super El Niño)",
    rainfallAnomalyPct: -38,
    castanhaoStoragePct: 32,
    castanhaoAreaKm2: 140,
    caatingaBiomassIndex: 52,
    salinityIntrusionKm: 22.0,
    aquaculturePondAreaHa: 2750,
    narrativeEn: "Beginning in 2012, Ceará entered a catastrophic multi-year drought. Reservoir levels plummeted. COGERH was forced to curtail downstream river discharge to preserve drinking water for the 4 million residents of metropolitan Fortaleza via the Eixão das Águas canal.",
    narrativePt: "A partir de 2012, o Ceará mergulhou em uma seca histórica plurianual. Os níveis dos açudes despencaram. A COGERH foi obrigada a fechar as comportas a jusante para salvar o abastecimento de 4 milhões de pessoas em Fortaleza.",
    ecologicalImpactEn: "With zero river discharge, oceanic tides pushed hypersaline water 22 km upstream. Shrimp pond effluents concentrated in stagnant estuarine canals.",
    ecologicalImpactPt: "Com a vazão fluvial zerada, a cunha salina avançou 22 km rio acima. Efluentes aquícolas concentraram-se nos canais sem diluição doce.",
    mitigationEn: "Emergency water rationing; drilling of deep emergency groundwater wells; negotiation of emergency flushing discharge slots.",
    mitigationPt: "Racionamento severo; perfuração emergencial de poços profundos no Aquífero Jandaíra; tentativa de descargas ecológicas pontuais.",
    sarContextEn: "L-band and C-band SAR reveal severe soil dielectric depletion (ε dropping from 16 to 5) as taproot moisture dries up across Inhamuns.",
    sarContextPt: "O radar SAR detecta colapso da permissividade dielétrica (ε caindo de 16 para 5) com exaustão da umidade radicular nos Inhamuns."
  },
  {
    period: "2016–2020",
    yearStart: 2016,
    yearEnd: 2020,
    syncYear: 2016,
    titleEn: "The 5.2% Apex Crisis, 32 km Salinity Wedge & Dead Volume",
    titlePt: "O Ápice da Crise (5,2%), Cunha Salina a 32 km & Volume Morto",
    climateBadgeEn: "Record Megadrought Apex (Castanhão at 5.2%)",
    climateBadgePt: "Ápice Histórico da Seca (Castanhão a 5,2%)",
    rainfallAnomalyPct: -48,
    castanhaoStoragePct: 5.2,
    castanhaoAreaKm2: 38,
    caatingaBiomassIndex: 34,
    salinityIntrusionKm: 32.0,
    aquaculturePondAreaHa: 3100,
    narrativeEn: "In late 2016, Castanhão hit its absolute catastrophic low of 5.2% storage (38 km² water mirror). Floating pumping stations pumped from the dead volume. Marine tides penetrated 32 km inland to Jaguaruana, salinizing municipal water intakes and causing mass fish mortality.",
    narrativePt: "No fim de 2016, o Castanhão atingiu o fundo do poço: apenas 5,2% de volume (38 km² de lâmina d'água). Balsas flutuantes bombeavam do volume morto. A cunha salina marítima avançou 32 km até Jaguaruana, salinizando poços de água potável.",
    ecologicalImpactEn: "Extreme estuarine eutrophication; severe mortality of freshwater riparian flora; intense riverbank collapse during unseasonal flash storms.",
    ecologicalImpactPt: "Eutrofização estuarina crítica; mortandade da vegetação ciliar de água doce; colapso de barrancos ressequidos nas chuvas isoladas.",
    mitigationEn: "Floating pumps deployed in reservoir dead volume; emergency trucking of potable water; coordinated pulse releases from Trussu/Orós.",
    mitigationPt: "Instalação de bombas flutuantes no volume morto; comboios de caminhões-pipa; descargas de socorro a partir do Açude Trussu e Orós.",
    sarContextEn: "InSAR phase coherence reveals centimeter-scale subsidence in dried lakebed muds; specular radar waterline confirms 88% reduction in reservoir area.",
    sarContextPt: "Interferometria InSAR mede subsidência no solo seco do açude; radar especular comprova retração de 88% do espelho d'água."
  },
  {
    period: "2021–2026",
    yearStart: 2021,
    yearEnd: 2026,
    syncYear: 2026,
    titleEn: "PISF Transposition, Dual-Band NISAR Era & Resilient Future",
    titlePt: "Transposição do São Francisco, Era NISAR & Co-Gestão Resiliente",
    climateBadgeEn: "Recovery & Active Dual-Band Microwave Monitoring",
    climateBadgePt: "Recuperação Hídrica & Monitoramento Ativo NISAR",
    rainfallAnomalyPct: +14,
    castanhaoStoragePct: 34.2,
    castanhaoAreaKm2: 178,
    caatingaBiomassIndex: 79,
    salinityIntrusionKm: 11.0,
    aquaculturePondAreaHa: 3720,
    narrativeEn: "Waters from the São Francisco Transposition Project (PISF) entered Castanhão via the Cinturão das Águas, providing an external hydrological safety valve. Combined with normal rainy seasons, storage rebounded to ~34%. The launch of NISAR inaugurates operational 12-day L+S band microwave monitoring.",
    narrativePt: "As águas da Transposição do Rio São Francisco (PISF) chegaram ao Castanhão pelo Cinturão das Águas, criando um colchão hídrico externo. Com chuvas regulares, o volume recuperou-se para 34%. O lançamento do NISAR inaugura o rastreamento quinzenal em banda L+S.",
    ecologicalImpactEn: "Salinity wedge pushed back to 11 km. Caatinga woody biomass rebounded strongly. Aquaculture adopting recirculating sedimentation basins.",
    ecologicalImpactPt: "Cunha salina recuou para 11 km. Biomassa da Caatinga recuperada. Carcinicultura moderniza-se com bacias de recirculação e biofiltros.",
    mitigationEn: "Institutionalized seasonal ecological flushing pulses synchronized with spring tides; InSAR structural dam monitoring; riparian reforestation.",
    mitigationPt: "Vazões ecológicas de lavagem institucionalizadas no Comitê de Bacia; monitoramento InSAR contínuo da crista da barragem; bioengenharia ciliar.",
    sarContextEn: "NISAR 24 cm L-band penetrates Caatinga canopy to map sub-canopy root moisture, while S-band monitors estuarine vegetation and aquaculture dikes.",
    sarContextPt: "A banda L (24 cm) do NISAR penetra o solo da Caatinga medindo umidade profunda, enquanto a banda S monitora mangues e diques aquícolas."
  }
];

interface HistoricalSlideDeckProps {
  onSyncWithMap?: (year: number) => void;
  currentYear?: number;
}

export default function HistoricalSlideDeck({ onSyncWithMap, currentYear }: HistoricalSlideDeckProps) {
  const { t } = useLanguage();
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(HISTORICAL_ERAS.length - 1); // Default to current era

  const era = HISTORICAL_ERAS[currentSlideIdx];

  const handlePrev = () => {
    setCurrentSlideIdx((prev) => (prev > 0 ? prev - 1 : HISTORICAL_ERAS.length - 1));
  };

  const handleNext = () => {
    setCurrentSlideIdx((prev) => (prev < HISTORICAL_ERAS.length - 1 ? prev + 1 : 0));
  };

  const handleSync = () => {
    if (onSyncWithMap) {
      onSyncWithMap(era.syncYear);
    }
    // Also smoothly scroll up to the map
    const mapElement = document.getElementById("interactive-map");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="historical-slide-deck" className="py-12 border-t border-slate-800 bg-[#070D18]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
              <Calendar className="h-3.5 w-3.5 text-cyan-400" />
              <span>{t("Multi-Decadal Evolution Deck (1985–2026)", "Slide Deck Histórico Multidecadal (1985–2026)")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t("5-Year Increments: From Natural Pulses to Megadrought & NISAR", "Ciclos de 5 Anos: Dos Pulsos Naturais à Megaseca e Era NISAR")}
            </h2>
            <p className="mt-1 text-slate-300 text-xs sm:text-sm">
              {t(
                "Explore the 40-year climate, hydraulic, and environmental transformation of the Jaguaribe Basin in 5-year chronological eras.",
                "Explore os 40 anos de transformação climática, hidráulica e ecológica da Bacia do Jaguaribe em períodos cronológicos de 5 anos."
              )}
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-cyan-500/50 transition-all shadow-md"
              aria-label="Previous Era"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-xs font-mono text-cyan-400 font-bold px-2">
              {currentSlideIdx + 1} / {HISTORICAL_ERAS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-cyan-500/50 transition-all shadow-md"
              aria-label="Next Era"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 5-Year Era Selector Chips */}
        <div className="flex overflow-x-auto pb-3 gap-2 mb-6 scrollbar-thin scrollbar-thumb-slate-700">
          {HISTORICAL_ERAS.map((item, idx) => (
            <button
              key={item.period}
              onClick={() => setCurrentSlideIdx(idx)}
              className={`flex-shrink-0 rounded-xl px-3.5 py-2 text-xs font-mono font-bold transition-all ${
                currentSlideIdx === idx
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-950/50 scale-105"
                  : "bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {item.period}
            </button>
          ))}
        </div>

        {/* ACTIVE ERA CARD */}
        <div className="rounded-3xl border border-slate-800 bg-[#0A1220] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Era Meta Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30">
                  {era.period}
                </span>
                <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-sans text-xs">
                  {t(era.climateBadgeEn, era.climateBadgePt)}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t(era.titleEn, era.titlePt)}
              </h3>
            </div>

            {/* Sync With Map Button */}
            <button
              onClick={handleSync}
              className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-950/50 hover:brightness-110 transition-all self-start md:self-auto"
            >
              <Compass className="h-4 w-4" />
              <span>{t("Sync Map Timeline to this Era", "Sincronizar Mapa com esta Era")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 4 Quantitative Telemetry Gauges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            
            {/* Gauge 1: Castanhão Storage */}
            <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center space-x-1.5">
                <Droplet className="h-3.5 w-3.5 text-cyan-400" />
                <span>{t("Castanhão Storage", "Volume Castanhão")}</span>
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-mono font-extrabold text-white">{era.castanhaoStoragePct}%</span>
                <span className="text-xs font-mono text-cyan-300">({era.castanhaoAreaKm2} km²)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${Math.min(100, era.castanhaoStoragePct)}%` }}
                />
              </div>
            </div>

            {/* Gauge 2: Caatinga Standing Biomass */}
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center space-x-1.5">
                <TreePine className="h-3.5 w-3.5 text-emerald-400" />
                <span>{t("Caatinga Standing Biomass", "Biomassa Caatinga")}</span>
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-mono font-extrabold text-white">{era.caatingaBiomassIndex}</span>
                <span className="text-xs text-slate-400">/ 100 (HV Vol)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${era.caatingaBiomassIndex}%` }}
                />
              </div>
            </div>

            {/* Gauge 3: Salinity Wedge Intrusion */}
            <div className="rounded-2xl border border-rose-500/30 bg-slate-900/60 p-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center space-x-1.5">
                <Waves className="h-3.5 w-3.5 text-rose-400" />
                <span>{t("Salinity Intrusion Wedge", "Cunha Salina a Montante")}</span>
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-mono font-extrabold text-white">{era.salinityIntrusionKm}</span>
                <span className="text-xs font-mono text-rose-300">km</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-rose-400 rounded-full"
                  style={{ width: `${Math.min(100, (era.salinityIntrusionKm / 35) * 100)}%` }}
                />
              </div>
            </div>

            {/* Gauge 4: Aquaculture Footprint */}
            <div className="rounded-2xl border border-amber-500/30 bg-slate-900/60 p-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center space-x-1.5">
                <Activity className="h-3.5 w-3.5 text-amber-400" />
                <span>{t("Aquaculture Ponds", "Viveiros de Camarão")}</span>
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-mono font-extrabold text-white">{era.aquaculturePondAreaHa}</span>
                <span className="text-xs font-mono text-amber-300">ha</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${Math.min(100, (era.aquaculturePondAreaHa / 4000) * 100)}%` }}
                />
              </div>
            </div>

          </div>

          {/* Detailed Narrative & Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            
            {/* Col 1: Climate & Basin Narrative */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <h4 className="text-xs uppercase font-bold text-cyan-400 tracking-wider mb-2">
                  {t("Hydrological & Climatic Dynamic:", "Dinâmica Hidrológica & Climática:")}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(era.narrativeEn, era.narrativePt)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider mb-2 flex items-center space-x-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{t("Ecological Consequence (Sertão & Mangrove):", "Consequência Ecológica (Sertão & Mangue):")}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(era.ecologicalImpactEn, era.ecologicalImpactPt)}
                </p>
              </div>
            </div>

            {/* Col 2: Solutions & SAR Remote Sensing Physics */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5">
                <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider mb-2 flex items-center space-x-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{t("Corrective Measures & Water Management:", "Medidas Corretivas & Gestão de Recursos:")}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(era.mitigationEn, era.mitigationPt)}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-5">
                <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2 flex items-center space-x-1.5">
                  <Layers className="h-3.5 w-3.5 text-amber-400" />
                  <span>{t("Radar SAR Physics & Sensor Footprint:", "Assinatura Física SAR & Satélites:")}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono text-[11px]">
                  {t(era.sarContextEn, era.sarContextPt)}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
