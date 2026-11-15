"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  GitBranch, 
  Database, 
  Cpu, 
  Workflow, 
  Share2, 
  ShieldCheck, 
  Layers, 
  Radio, 
  Droplets, 
  TreePine, 
  Check, 
  X, 
  Sparkles,
  HelpCircle,
  ArrowRight,
  Users,
  History,
  Wheat,
  ShieldAlert,
  SunMedium,
  BookOpen,
  Compass
} from "lucide-react";

export default function ProjectDescription() {
  const { t } = useLanguage();

  const pipelineSteps = [
    {
      step: "01",
      titleEn: "Multi-Sensor Radar & Optical Ingestion",
      titlePt: "Ingestão Multi-Sensorial Radar & Óptica",
      source: "NASA-ISRO NISAR · Copernicus S1/S2 · ASF DAAC",
      descEn: "Continuous ingestion of L-band (NISAR 24.2 cm Quad-Pol) and C-band (Sentinel-1 5.6 cm Dual-Pol) SAR Level-1 Single Look Complex (SLC) products, combined with cloud-masked Sentinel-2 MSI multispectral reflectance.",
      descPt: "Ingestão contínua de produtos SAR Nível-1 SLC em banda L (NISAR 24,2 cm Quad-Pol) e banda C (Sentinel-1 5,6 cm Dual-Pol), combinados com refletância óptica Sentinel-2 MSI tratada para nuvens."
    },
    {
      step: "02",
      titleEn: "Radiometric Terrain Correction (RTC)",
      titlePt: "Correção Radiométrica de Terreno (RTC)",
      source: "Copernicus GLO-30 DEM · Gamma0 Calibration",
      descEn: "Correction for geometric distortion (foreshortening, layover, and shadowing) caused by radar side-looking geometry over rugged Caatinga terrain (Inhamuns plateau, Araripe borders) using 30-meter DEMs to generate true gamma-nought (γ⁰) backscatter.",
      descPt: "Correção de distorções geométricas (encurtamento, layover e sombras) causadas pela visada lateral do radar no relevo sertanejo (Inhamuns, chapadas) usando DEM de 30m para calibrar o retroespalhamento γ⁰ real."
    },
    {
      step: "03",
      titleEn: "Polarimetric Decomposition & Biophysical Inversion",
      titlePt: "Decomposição Polarimétrica & Inversão Biofísica",
      source: "Pauli 3-Component · Topp Dielectric Model",
      descEn: "Decomposing full-polarimetric covariance matrices into Surface (Ps), Double-Bounce (Pd), and Volume (Pv) scattering components. Inverting L-band phase and backscatter into soil dielectric permittivity (ε) to measure root-zone moisture up to 30 cm deep.",
      descPt: "Decomposição das matrizes de covariância em espalhamento Superficial (Ps), Dupla Reflexão (Pd) e Volumétrico (Pv). Inversão da fase e amplitude da banda L em permissividade dielétrica (ε) para sondar umidade radicular até 30 cm."
    },
    {
      step: "04",
      titleEn: "Interferometric Coherence (DInSAR) & Hydraulic Tracking",
      titlePt: "Coerência Interferométrica (DInSAR) & Rastreio Hidráulico",
      source: "Repeat-Pass InSAR (12-day orbit cycle) · ANA & COGERH",
      descEn: "Calculating interferometric coherence (γ) between consecutive orbits to detect millimeter-level subsidence and deformation on Castanhão and Orós earthen dam crests, coupled with surface water boundary polygon extraction.",
      descPt: "Cálculo da coerência interferométrica (γ) entre órbitas repetidas para detectar subsidência e deformações milimétricas nas cristas das barragens do Castanhão e Orós, associado à extração de polígonos de espelho d'água."
    },
    {
      step: "05",
      titleEn: "Accessible Open Information Delivery ('Out of the Bubble')",
      titlePt: "Disponibilização Acessível da Informação ('Fora da Bolha')",
      source: "EcoPulse Web Engine · Open GeoJSON API · Alerts",
      descEn: "Translating terabytes of raw complex radar phase mathematics into clear, color-coded environmental risk indexes, public water storage gauges, and actionable salinity alerts accessible to family farmers, artisanal fishers, and municipal managers.",
      descPt: "Tradução de terabytes de matemática complexa de fase de radar em índices visuais claros de risco ecológico, réguas públicas de volume de água e alertas de salinização úteis para agricultores familiares, pescadores e gestores."
    }
  ];

  return (
    <section id="project-details" className="py-16 lg:py-24 border-b border-slate-800 bg-[#050B14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4">
            <Workflow className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t("Scientific Framework & Architecture", "Estrutura Científica & Arquitetura")}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            {t("From Sertão to Mangroves: The Teleconnection Hypothesis", "Do Sertão ao Mangue: A Hipótese da Teleconexão")}
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            {t(
              "EcoPulse NE investigates the direct hydrological and ecological chain linking multi-year megadroughts in the semi-arid Caatinga to downstream coastal crises in estuarine mangroves, centered along the 610-km corridor of Ceará's Jaguaribe River Basin.",
              "O EcoPulse NE investiga o encadeamento hidrológico e ecológico direto que liga as megassecas plurianuais na Caatinga semiárida às crises a jusante nos manguezais costeiros, centrado ao longo do corredor de 610 km da Bacia do Rio Jaguaribe no Ceará."
            )}
          </p>
        </div>

        {/* 30-SECOND PITCH & STORYTELLING: CAATINGA, ENFORCEMENT RISKS & SAR RADAR */}
        <div className="mb-16 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-[#0A162B] to-slate-900 p-6 lg:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 text-xs font-semibold text-cyan-300 mb-2">
                <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                <span>{t("NASA Space Apps Official Pitch Storyboard", "Roteiro Oficial do Pitch de 30 Segundos")}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t(
                  "30-Second Conservation Narrative: The Caatinga & SAR Remote Sensing",
                  "Narrativa de Preservação em 30 Segundos: A Caatinga & a Tecnologia SAR"
                )}
              </h3>
            </div>
            <span className="rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 text-xs font-mono font-bold text-cyan-300">
              ⏱️ 30s Pitch Breakdown
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Act 1: 00-05s */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    00:00 – 00:05 (5s)
                  </span>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Ato 1</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  {t("The Caatinga Biome", "Apresentação da Caatinga")}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    "South America's only exclusively Brazilian biome: over 840,000 km² supporting 28 million people, characterized by high endemism, extreme seasonal adaptation, and deep cultural memory.",
                    "O único bioma 100% brasileiro: mais de 840 mil km² e lar de 28 milhões de pessoas, com biodiversidade única adaptada à semiaridez e profunda resistência cultural."
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] font-mono text-amber-300">
                🌿 {t("Vibrant, resilient, yet critically fragile", "Bioma vibrante, resiliente e frágil")}
              </div>
            </div>

            {/* Act 2: 05-18s */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                    00:05 – 00:18 (13s)
                  </span>
                  <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Ato 2</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  {t("Risks & Enforcement Dilemma", "Risco Atual & Desafio da Fiscalização")}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    "Desertification threatens 126,000 km². During the dry season, the Caatinga naturally sheds 100% of its leaves ('mata branca'). Illegal deforestation blends into the dry landscape, creating massive optical blind spots that make satellite policing nearly impossible.",
                    "A desertificação ameaça 126 mil km². Na seca, a mata perde todas as folhas ('mata branca'). O desmatamento ilegal se camufla na paisagem cinzenta, gerando pontos cegos que barram a fiscalização óptica tradicional."
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-500/20 text-[11px] font-mono text-rose-300">
                ⚠️ {t("Optical satellites are blinded by dry leaves & dust", "Satélites ópticos são cegados pela seca")}
              </div>
            </div>

            {/* Act 3: 18-30s */}
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/10 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                    00:18 – 00:30 (12s)
                  </span>
                  <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Ato 3</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  {t("The SAR Radar Solution", "Contribuição da Tecnologia SAR")}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    "SAR active microwaves pierce dust, darkness, and clouds. By measuring cross-polarized volume scattering and root dielectric moisture (0–30 cm), SAR instantly proves which trees are living wood versus illegal clear-cuts, powering rapid real-time environmental enforcement.",
                    "O radar SAR emite micro-ondas que atravessam nuvens, poeira e noite. Pelo espalhamento volumétrico e umidade dielétrica (0–30 cm), o SAR distingue imediatamente madeira viva de corte raso, viabilizando fiscalização em tempo real."
                  )}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cyan-500/20 text-[11px] font-mono text-cyan-300">
                🛰️ {t("24/7 all-weather environmental intelligence", "Inteligência ambiental 24/7 sem pontos cegos")}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column: The Caatinga Impact vs The Mangrove Teleconnection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Caatinga Impact */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-slate-900/60 p-7 lg:p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
            <div className="flex items-center space-x-3 text-amber-400 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/30">
                <TreePine className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
                  {t("Upstream Vulnerability", "Vulnerabilidade a Montante")}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {t("Extreme Megadroughts in the Caatinga", "Megassecas Extremas na Caatinga")}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {t(
                "The Caatinga is South America's only exclusively Brazilian biome, home to 28 million people. During protracted droughts (such as the 2012–2017 crisis, the harshest in recorded history), annual rainfall drops below 300 mm. The deciduous vegetation sheds 100% of its leaves to prevent cavitation, masquerading as dead biomass in traditional optical satellite imaging.",
                "A Caatinga é o único bioma exclusivamente brasileiro, lar de 28 milhões de pessoas. Em secas prolongadas (como a crise de 2012–2017, a mais severa já registrada), as chuvas caem abaixo de 300 mm. A vegetação caducifólia perde 100% das folhas para evitar cavitação hídrica, parecendo biomassa morta em imagens ópticas tradicionais."
              )}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="rounded-xl bg-black/40 p-3 border border-amber-500/20">
                <strong className="text-amber-300 block mb-0.5">{t("Dielectric Dehydration:", "Desidratação Dielétrica:")}</strong>
                {t(
                  "Soil dielectric permittivity drops from ε ≈ 16 to ε ≈ 3.2, indicating complete moisture exhaustion in the shallow 0-10 cm zone.",
                  "A permissividade do solo desaba de ε ≈ 16 para ε ≈ 3,2, indicando esgotamento hídrico na camada superficial de 0-10 cm."
                )}
              </div>
              <div className="rounded-xl bg-black/40 p-3 border border-amber-500/20">
                <strong className="text-amber-300 block mb-0.5">{t("Reservoir Retention Defense:", "Retenção Defensiva em Reservatórios:")}</strong>
                {t(
                  "With Castanhão reservoir falling to 5.2% in 2016, downstream environmental discharge was curtailed to zero to protect domestic supply for metropolitan Fortaleza.",
                  "Com o Castanhão caindo a 5,2% em 2016, a vazão ambiental a jusante foi cortada a zero para garantir o abastecimento da Grande Fortaleza."
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Mangrove Impact */}
          <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 to-slate-900/60 p-7 lg:p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            <div className="flex items-center space-x-3 text-cyan-400 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                <Droplets className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-cyan-300">
                  {t("Downstream Teleconnection", "Teleconexão a Jusante")}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {t("Hypersalinity & Crisis in Coastal Mangroves", "Hipersalinização & Crise nos Manguezais Costeiros")}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {t(
                "When upstream freshwater pulses are arrested at Castanhão, the downstream estuarine ecosystem in Aracati and Fortim experiences severe hydraulic starvation. Semidiurnal oceanic tides force seawater 32 km inland, turning brackish nurseries into hypersaline zones with salinities exceeding 45 PSU.",
                "Quando os pulsos de água doce são retidos no Castanhão, o ecossistema estuarino a jusante em Aracati e Fortim sofre inanição hidráulica. As marés oceânicas forçam a água do mar 32 km rio acima, convertendo berçários estuarinos em zonas hipersalinas com salinidade superior a 45 PSU."
              )}
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="rounded-xl bg-black/40 p-3 border border-cyan-500/20">
                <strong className="text-cyan-300 block mb-0.5">{t("Double-Bounce Attenuation:", "Atenuação da Dupla Reflexão:")}</strong>
                {t(
                  "Dieback of stilt roots (Rhizophora mangle) and expansion of hyper-saline salt flats (apicuns) causes dramatic loss in radar double-bounce (Pd) backscatter.",
                  "A mortalidade de raízes escora (Rhizophora mangle) e a expansão de apicuns hipersalinos geram perda acentuada no sinal de reflexão dupla (Pd)."
                )}
              </div>
              <div className="rounded-xl bg-black/40 p-3 border border-cyan-500/20">
                <strong className="text-cyan-300 block mb-0.5">{t("Aquaculture Nutrient Concentration:", "Concentração de Nutrientes na Carcinicultura:")}</strong>
                {t(
                  "With negligible flushing, intensive shrimp farm pond effluents accumulate in tidal channels, increasing biological turbidity and risk of eutrophication.",
                  "Sem vazão lavadora, efluentes de fazendas de camarão acumulam-se nos canais de maré, elevando a turbidez biológica e o risco de eutrofização."
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Geographic Justification: Why the Jaguaribe Basin? */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-[#0C1628] to-slate-900/90 p-6 lg:p-8 mb-16 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                {t("Geographic Selection Rationale", "Justificativa da Seleção Geográfica")}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {t("The Jaguaribe River Basin: Brazil's Primary Semi-Arid Hydro Corridor", "A Bacia do Rio Jaguaribe: O Principal Corredor Hidrológico Semiárido do Brasil")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(
                  "Covering over 75,000 km² (more than 50% of the State of Ceará), the Jaguaribe is the quintessential example of an ephemeral tropical river transformed by massive engineering (Castanhão, Orós, Banabuiú). It represents the single most critical nexus linking interior drought resilience with coastal economic productivity and mangrove conservation in South America.",
                  "Cobrindo mais de 75.000 km² (mais de 50% do território cearense), o Jaguaribe é o exemplo definitivo de rio intermitente transformado por grandes obras de engenharia (Castanhão, Orós, Banabuiú). Representa o nexo mais crítico entre resiliência à seca no interior, produtividade econômica litorânea e conservação de manguezais na América do Sul."
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <div className="bg-black/50 border border-slate-700/80 rounded-xl p-3 text-center min-w-[120px]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{t("Basin Area", "Área da Bacia")}</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">75,660 km²</span>
              </div>
              <div className="bg-black/50 border border-slate-700/80 rounded-xl p-3 text-center min-w-[120px]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{t("Mainstem Length", "Extensão do Rio")}</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">610 km</span>
              </div>
              <div className="bg-black/50 border border-slate-700/80 rounded-xl p-3 text-center min-w-[120px]">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">{t("Max Storage", "Armazenamento")}</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">6.7 Billion m³</span>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIO-HISTORICAL-CULTURAL CONTEXT & WATER ACCESS IN CEARÁ */}
        <div className="mb-20 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#0E1726] via-[#0A111E] to-[#060D18] p-7 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Heading */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center space-x-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3.5 py-1 text-xs font-semibold text-rose-300 mb-3">
              <History className="h-3.5 w-3.5 text-rose-400" />
              <span>{t("Socio-Historical & Human Geography", "Geografia Socio-Histórica & Humana")}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t(
                "Socio-Historical Context & The Geography of Water in Ceará's Semiarid",
                "Contexto Socio-Histórico-Cultural e a Geografia do Acesso à Água no Ceará"
              )}
            </h3>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {t(
                "Water access in Ceará is not merely a technical challenge of storage and conveyance — it is a foundational pillar of human survival, cultural resilience, and socio-spatial justice deeply etched into centuries of collective memory across the Caatinga.",
                "O acesso à água no Ceará não é apenas uma questão de engenharia hidráulica — é um pilar estruturante de sobrevivência, resistência cultural e justiça socioambiental forjado em séculos de memória coletiva no sertão da Caatinga."
              )}
            </p>
          </div>

          {/* 4 Thematic Deep-Dive Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            
            {/* Pillar 1: Crystalline Hydrogeology & The "Largest Dry River in the World" */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-cyan-400 block tracking-wider">
                    {t("Hydrogeological Basement", "Geologia & Hidrografia")}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {t("Crystalline Bedrock & 'The Largest Dry River'", "Embasamento Cristalino & 'O Maior Rio Seco'")}
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(
                  "Unlike southern Brazil or the Amazon with porous sedimentary aquifers (like the Guarani), more than 75% of Ceará rests over Precambrian impermeable crystalline rock with thin soils (Neossolos). Rainfall cannot infiltrate deep underground. Natural rivers are strictly intermittent: before dams, the Jaguaribe completely stopped flowing for 6 to 8 months every year, historically dubbed 'the largest dry river in the world'. Over 90% of rain is lost to violent torrents or evaporated under 3,000 hours of equatorial sunlight annually.",
                  "Diferente do Sul do Brasil ou da Amazônia, com bacias sedimentares permeáveis (Aquífero Guarani), mais de 75% do território cearense assenta-se sobre embasamento cristalino pré-cambriano com solos rasos (Neossolos e Luvissolos). Não há aquíferos profundos de recarga fácil. Os rios são naturalmente intermitentes: antes das barragens, o Jaguaribe secava totalmente de julho a janeiro, consagrado como 'o maior rio seco do mundo'. Até 90% das chuvas perdem-se em enxurradas bruscas ou evaporam sob 3.000 horas de insolação anual."
                )}
              </p>

              <div className="rounded-xl bg-black/40 p-3 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center justify-between">
                <span>{t("Crystalline Coverage:", "Área Cristalina:")} <strong>75.3%</strong></span>
                <span>{t("Natural Intermittency:", "Regime Natural:")} <strong>0 m³/s (6–8 mo/yr)</strong></span>
              </div>
            </div>

            {/* Pillar 2: Water Access Geography: From Açudagem to Decentralized Cisterns */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-amber-400 block tracking-wider">
                    {t("Water Infrastructure", "Infraestrutura de Sobrevivência")}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {t("From 'Açudagem' to Rainwater Cisterns & Tankers", "Da Açudagem às Cisternas de Placa & Carros-Pipa")}
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(
                  "To capture erratic runoff on solid rock, Ceará developed the engineering of 'açudagem' — building over 30,000 reservoirs of all sizes, crowned by giants like Açude Cedro (1890, ordered by Dom Pedro II), Orós (1961), and Castanhão (2002). In rural areas, water security was transformed by the 'Convivência com o Semiárido' movement: the P1MC program installed over 350,000 decentralized 16,000-liter rainwater harvesting cisterns ('cisternas de placa') connected to family house roofs, freeing women and children from walking hours to fetch brackish water. Yet in multiannual droughts, the Army's 'Operação Carro-Pipa' remains an essential lifeline.",
                  "Para reter as águas sobre a rocha impermeável, consolidou-se a política da açudagem — hoje com mais de 30 mil represas no Ceará, desde o Açude Cedro (1890, iniciado por D. Pedro II), passando por Orós (1961) até o Castanhão (2002). No meio rural, a segurança hídrica descentralizada nasceu com o paradigma da Convivência com o Semiárido: o Programa 1 Milhão de Cisternas (P1MC) instalou mais de 350 mil cisternas de placa (16.000 litros) captando água de chuva em telhados rurais, libertando mulheres e crianças de longas caminhadas. Em secas duradouras, a Operação Carro-Pipa do Exército ainda abastece emergencialmente centenas de comunidades."
                )}
              </p>

              <div className="rounded-xl bg-black/40 p-3 border border-slate-800 text-xs font-mono text-amber-300 flex items-center justify-between">
                <span>{t("Cisterns Installed:", "Cisternas no CE:")} <strong>&gt; 350,000</strong></span>
                <span>{t("Standard Capacity:", "Capacidade Padrão:")} <strong>16,000 L (Drinking)</strong></span>
              </div>
            </div>

            {/* Pillar 3: 5.4 Million People Impacted & Family Agriculture Struggles */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-rose-400 block tracking-wider">
                    {t("Human & Agricultural Impact", "Impacto Humano & Agrícola")}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {t("5.4 Million People & Rainfed Family Farming", "5,4 Milhões de Pessoas & Agricultura de Sequeiro")}
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(
                  "Over 5.4 million people in Ceará (and 28 million across Brazil's Semiarid) live directly under drought vulnerability. More than 80% of rural establishments are smallholder family farms practicing rainfed agriculture ('agricultura familiar de sequeiro'). Farmers plant staple crops (corn, cowpea beans / feijão-caupi, cassava) synchronized with the fleeting 3-month 'quadra chuvosa' (February to May). When mid-season dry spells ('veranicos') or multiannual droughts strike, crop collapse ranges from 80% to 100%, devastating family food security and wiping out livestock feed supplies.",
                  "Mais de 5,4 milhões de pessoas no Ceará (e 28 milhões em todo o Semiárido) vivem sob vulnerabilidade climática crônica. Mais de 80% dos estabelecimentos rurais pertencem à agricultura familiar de sequeiro. Os agricultores sincronizam o plantio de culturas de subsistência (milho, feijão-caupi e mandioca) com a curta quadra chuvosa (fevereiro a maio). Quando ocorrem veranicos prolongados ou anos de seca consecutiva, a quebra de safra atinge de 80% a 100%, dizimando a renda familiar, exaurindo forragem para caprinos e bovinos e exigindo o acionamento emergencial do Garantia-Safra."
                )}
              </p>

              <div className="rounded-xl bg-black/40 p-3 border border-slate-800 text-xs font-mono text-rose-300 flex items-center justify-between">
                <span>{t("Affected Population:", "População Atingida:")} <strong>5.4M (CE) / 28M (NE)</strong></span>
                <span>{t("Drought Crop Loss:", "Perda em Megaseca:")} <strong>80%–100%</strong></span>
              </div>
            </div>

            {/* Pillar 4: Historical Memory & The Teleconnection: Sertão ↔ Mangroves */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                  <TreePine className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 block tracking-wider">
                    {t("Culture & Ecological Continuum", "Memória Histórica & Teleconexão")}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {t("The Living Chain: From Sertão to Coastal Mangroves", "A Cadeia Viva: Do Sertão aos Manguezais")}
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(
                  "Ceará's culture carries the traumatic memory of catastrophic historical droughts: the Great Drought of 1877–1879, the 1915 drought immortalized by Rachel de Queiroz in 'O Quinze', the 1932 drought marked by concentration camps in Senador Pompeu, and the modern 2012–2017 megadrought. Yet the Jaguaribe Basin is a single living continuum: decisions made at Castanhão 300 km upstream directly govern coastal artisanal fishing and mangrove health in Aracati and Fortim. When gates close to save reservoir water, the marine salinity wedge surges 32 km upstream, salinizing municipal wells and choking mangrove crab nurseries upon which thousands of traditional fishing families depend.",
                  "A cultura cearense carrega a cicatriz das secas históricas: a Grande Seca de 1877–1879, a Seca de 1915 imortalizada por Rachel de Queiroz em 'O Quinze', a seca de 1932 marcada pelos campos de concentração de retirantes em Senador Pompeu e Quixadá, e a recente megaseca de 2012–2017. Essa bacia é um organismo único: o que acontece no Castanhão reverbera a 610 km de distância na foz de Aracati. Reter água na seca salva o sertanejo, mas paralisa a vazão doce para o estuário, empurrando a cunha salina marinha 32 km adentro, salinizando poços de várzea e ameaçando comunidades tradicionais de catadores de caranguejo e pescadores artesanais."
                )}
              </p>

              <div className="rounded-xl bg-black/40 p-3 border border-slate-800 text-xs font-mono text-emerald-300 flex items-center justify-between">
                <span>{t("Ecological Teleconnection:", "Eixo Teleconectado:")} <strong>610 km (Inhamuns → Foz)</strong></span>
                <span>{t("Salinity Surge:", "Avanço Salino:")} <strong>+32 km inland</strong></span>
              </div>
            </div>

          </div>

          {/* Cultural & Literary Quote Callout */}
          <div className="rounded-2xl border border-rose-500/20 bg-black/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-rose-400 shrink-0" />
              <p className="text-xs text-slate-300 italic">
                {t(
                  '"In the vastness of the Caatinga, the sertanejo does not fight against nature: he learns the rhythm of the stars, the signs of the Rain Prophets, and the resilience of roots that slumber until the return of water."',
                  '"Na imensidão da Caatinga, o sertanejo não luta contra a natureza: aprende o ritmo dos astros, os sinais dos Profetas da Chuva e a tenacidade das raízes que adormecem até o retorno das águas." — EcoPulse NE'
                )}
              </p>
            </div>
            <span className="text-[10px] font-mono text-rose-300 uppercase px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 whitespace-nowrap">
              {t("Cultural Heritage", "Patrimônio Sertanejo")}
            </span>
          </div>

        </div>

        {/* 5-Step Radar Data Architecture */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
              <Cpu className="h-4 w-4" />
              <span>{t("End-to-End Radar Processing Pipeline", "Pipeline Completo de Processamento Radar")}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              {t("Democratizing Complex Radar Physics for Society", "Democratizando a Física Complexa de Radar para a Sociedade")}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              {t(
                "How EcoPulse NE converts raw electromagnetic wave interactions into intuitive public environmental telemetry.",
                "Como o EcoPulse NE converte interações de ondas eletromagnéticas brutas em telemetria ambiental pública intuitiva."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {pipelineSteps.map((step, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-cyan-500/50 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-extrabold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                      STEP {step.step}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">L-Band SAR</span>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2 leading-snug">
                    {t(step.titleEn, step.titlePt)}
                  </h4>
                  <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                    {t(step.descEn, step.descPt)}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[10px] text-cyan-300 font-mono truncate">
                  {step.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Technical Comparison Table: Optical vs L-Band SAR vs EcoPulse NE */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 lg:p-8 overflow-hidden">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {t(
                "Sensor Comparison Matrix: Why Traditional Remote Sensing Misses the Crisis",
                "Matriz Comparativa de Sensores: Por Que o Sensoriamento Tradicional Falha na Crise"
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {t(
                "A structured technical comparison illustrating the necessity of multi-frequency active microwave radar.",
                "Uma comparação técnica estruturada ilustrando a necessidade do radar de micro-ondas ativas multifrequência."
              )}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4 font-semibold">{t("Biophysical Dimension", "Dimensão Biofísica")}</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">{t("Optical (Sentinel-2 / Landsat)", "Óptico (Sentinel-2 / Landsat)")}</th>
                  <th className="py-3 px-4 font-semibold text-blue-400">{t("Standard C-Band SAR (Sentinel-1)", "SAR Padrão Banda C (Sentinel-1)")}</th>
                  <th className="py-3 px-4 font-semibold text-cyan-400 bg-cyan-950/30 rounded-t-lg">{t("EcoPulse NE (NISAR L-Band + Pipeline)", "EcoPulse NE (NISAR Banda L + Pipeline)")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                
                <tr>
                  <td className="py-3 px-4 font-bold text-white">{t("Cloud & Smoke Penetration", "Penetração em Nuvens e Fumaça")}</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center space-x-1.5">
                    <X className="h-3.5 w-3.5 shrink-0" />
                    <span>{t("Zero (blocked during coastal rainy season)", "Zero (bloqueado na estação chuvosa litorânea)")}</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400">{t("Full all-weather imaging", "Total em qualquer clima")}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold bg-cyan-950/20">{t("100% all-weather Day/Night continuous", "100% dia/noite contínuo sob qualquer clima")}</td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-bold text-white">{t("Caatinga Drought Dormancy vs Death", "Dormência vs Morte na Caatinga")}</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center space-x-1.5">
                    <X className="h-3.5 w-3.5 shrink-0" />
                    <span>{t("Fails: Leafless canopy registered as bare soil", "Falha: Dossel sem folhas registrado como solo nu")}</span>
                  </td>
                  <td className="py-3 px-4 text-amber-300">{t("Partial: Scatters only in thin upper twigs", "Parcial: Espalha apenas nas pontas dos galhos")}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold bg-cyan-950/20">{t("Solves: L-band penetrates to trunk core & deep roots", "Resolve: Banda L penetra no cerne dos troncos e raízes")}</td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-bold text-white">{t("Subsurface Soil Moisture", "Umidade Subsuperficial do Solo")}</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center space-x-1.5">
                    <X className="h-3.5 w-3.5 shrink-0" />
                    <span>{t("Zero: Surface skin reflection only", "Zero: Mede apenas a película externa")}</span>
                  </td>
                  <td className="py-3 px-4 text-amber-300">{t("Limited: Top 1-2 cm only", "Limitado: Apenas 1 a 2 cm superficiais")}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold bg-cyan-950/20">{t("Probes 15–30 cm root-zone via dielectric ε", "Sonda 15–30 cm da zona radicular via ε dielétrico")}</td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-bold text-white">{t("Flooded Mangrove Roots Under Canopy", "Raízes de Mangue Inundadas sob Copa")}</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center space-x-1.5">
                    <X className="h-3.5 w-3.5 shrink-0" />
                    <span>{t("Blind: Canopy leaves hide tidal water underneath", "Cego: Folhas da copa ocultam a água da maré")}</span>
                  </td>
                  <td className="py-3 px-4 text-amber-300">{t("Moderate: High attenuation in dense crown", "Moderado: Forte atenuação na copa densa")}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold bg-cyan-950/20">{t("Pinpoint: High Double-Bounce (Pd) in HH-VV", "Exato: Forte Reflexão Dupla (Pd) em HH-VV")}</td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-bold text-white">{t("Dam Structural Geodesy", "Geodésia Estrutural de Barragens")}</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center space-x-1.5">
                    <X className="h-3.5 w-3.5 shrink-0" />
                    <span>{t("Not possible via optical radiometry", "Impossível via radiometria óptica")}</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400">{t("Good DInSAR deformation measurement", "Boa medição de deformação por DInSAR")}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold bg-cyan-950/20">{t("Millimeter deformation tracking + water volume", "Deformação milimétrica + volume de água em tempo real")}</td>
                </tr>

                <tr>
                  <td className="py-3 px-4 font-bold text-white">{t("Public Accessibility & Actionability", "Acessibilidade Pública & Ação")}</td>
                  <td className="py-3 px-4 text-slate-400">{t("Requires GIS software & specialized knowledge", "Exige software SIG e conhecimento especializado")}</td>
                  <td className="py-3 px-4 text-slate-400">{t("Complex radar phase data unreadable to non-experts", "Fase complexa ilegível para não especialistas")}</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold bg-cyan-950/20">{t("Interactive Web GIS + Intuitive Color Telemetry", "Web SIG Interativo + Telemetria em Cores Intuitivas")}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
