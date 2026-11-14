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
  ArrowRight
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
        <div className="max-w-3xl mb-16">
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
