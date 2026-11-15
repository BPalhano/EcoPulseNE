"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  AlertTriangle, 
  Mountain, 
  Home, 
  Fish, 
  ShieldCheck, 
  Radio, 
  CheckCircle2, 
  Layers, 
  TrendingDown,
  ArrowRight,
  Droplet
} from "lucide-react";

interface EcologicalTopic {
  id: string;
  category: "erosion" | "siltation" | "settlements" | "aquaculture";
  titleEn: string;
  titlePt: string;
  subtitleEn: string;
  subtitlePt: string;
  icon: any;
  color: string;
  borderColor: string;
  bgGlow: string;
  coords: string;
  problemSummaryEn: string;
  problemSummaryPt: string;
  driverEn: string;
  driverPt: string;
  consequencesEn: string[];
  consequencesPt: string[];
  sarEvidenceEn: string;
  sarEvidencePt: string;
  mitigationMeasuresEn: {
    measure: string;
    description: string;
  }[];
  mitigationMeasuresPt: {
    measure: string;
    description: string;
  }[];
}

const TOPICS: EcologicalTopic[] = [
  {
    id: "erosion",
    category: "erosion",
    titleEn: "Riverbank Erosion & Slope Landslides",
    titlePt: "Erosão de Margens & Desmoronamento de Taludes",
    subtitleEn: "Severe bank failure and gully ravines during drought-to-flood whiplash",
    subtitlePt: "Desbarrancamento de barrancos e voçorocas no choque de seca para cheia",
    icon: Mountain,
    color: "text-amber-400",
    borderColor: "border-amber-500/40",
    bgGlow: "bg-amber-500/10",
    coords: "Alto/Médio Jaguaribe (-6.54° S, -39.90° W: Saboeiro / Jucás)",
    problemSummaryEn: "Historical clearing of riparian Caatinga trees for cattle grazing strips the cohesion of alluvium riverbanks. When torrential flash floods arrive following prolonged droughts, parched riverbanks crumble en masse (desbarrancamento), swallowing hectares of productive riparian soil.",
    problemSummaryPt: "O desmatamento histórico da mata ciliar para pasto retirou a coesão mecânica dos barrancos aluvionares. Quando enxurradas repentinas chegam após anos de estiagem, taludes ressequidos desmoronam em blocos gigantescos, engolindo hectares de terras produtivas.",
    driverEn: "Overgrazing, unmonitored sand extraction, and total absence of vegetative root armor along banks.",
    driverPt: "Pisoteio de gado, extração clandestina de areia e ausência de raízes estruturantes nas margens.",
    consequencesEn: [
      "Loss of agricultural topsoil and accelerated gully progression (voçorocamento)",
      "Destruction of rural access roads and collapse of riverside fences",
      "Immediate release of millions of tons of mud into the main channel"
    ],
    consequencesPt: [
      "Perda de solo arável fértil e avanço descontrolado de voçorocas",
      "Destruição de estradas vicinais e colapso de infraestruturas rurais",
      "Carreamento imediato de milhões de toneladas de sedimentos para a calha"
    ],
    sarEvidenceEn: "Repeat-pass InSAR interferometric coherence drops sharply (γ < 0.25) across failing banks. Differential phase shifts quantify active millimeter-scale slope creep before catastrophic collapse.",
    sarEvidencePt: "A coerência interferométrica InSAR desaba (γ < 0,25) sobre taludes em instabilidade. O deslocamento de fase diferencial mede a deformação milimétrica prévia ao colapso.",
    mitigationMeasuresEn: [
      {
        measure: "Riparian Bioengineering (Bioengenharia de Taludes)",
        description: "Stabilize bank toes with live wooden crib walls, rock riprap armoring, and deep-root vetiver grass along slopes."
      },
      {
        measure: "Native Caatinga Revegetation Corridors",
        description: "Replant native pioneer species (Juazeiro, Aroeira, Jurema-preta) within 30-meter legal protection strips (APPs)."
      },
      {
        measure: "Continuous InSAR Slope Displacement Monitoring",
        description: "Operational NISAR and Sentinel-1 interferometry to generate early-warning maps of unstable river sections."
      }
    ],
    mitigationMeasuresPt: [
      {
        measure: "Bioengenharia de Solos em Taludes Fluviais",
        description: "Estabilização mecânica do pé do barranco com enrocamento de pedras, paliçadas vivas e capim vetiver de raiz profunda."
      },
      {
        measure: "Reflorestamento de Matas Ciliares da Caatinga",
        description: "Replantio de espécies nativas estruturantes (Juazeiro, Aroeira-do-sertão, Jurema-preta) na faixa de 30 metros de APP."
      },
      {
        measure: "Monitoramento InSAR Contínuo de Deslocamento",
        description: "Uso operacional do NISAR e Sentinel-1 para mapear deformação do terreno e emitir alertas preventivos à Defesa Civil."
      }
    ]
  },
  {
    id: "siltation",
    category: "siltation",
    titleEn: "Riverbed Siltation & Reservoir Storage Loss",
    titlePt: "Assoreamento da Calha & Perda de Armazenamento",
    subtitleEn: "Sediment choking river conveyance and silting up Castanhão & Orós inlets",
    subtitlePt: "Sedimentos sufocam a drenagem e assoreiam as entradas do Castanhão e Orós",
    icon: Droplet,
    color: "text-orange-400",
    borderColor: "border-orange-500/40",
    bgGlow: "bg-orange-500/10",
    coords: "Entrada do Castanhão / Jaguaribara (-5.58° S, -38.58° W)",
    problemSummaryEn: "Coarse sand and fine silt eroded from the upper watershed travel downstream and deposit into shallow river reaches and reservoir deltas. River depth decreases by up to 3 meters, reducing hydraulic discharge capacity and choking the dead-volume intake of Castanhão.",
    problemSummaryPt: "Areia grossa e silte erodidos da bacia alta depositam-se nos remansos e deltas de açudes. A profundidade da calha cai até 3 metros, estrangulando o escoamento, elevando o nível de cheias locais e consumindo o volume morto do Castanhão.",
    driverEn: "Upstream slope deforestation, unpaved dirt roads lacking drainage ditches, and reduced sediment flushing flows.",
    driverPt: "Desmatamento das cabeceiras, estradas de terra sem caixas de retenção e ausência de pulsos de vazão para lavagem.",
    consequencesEn: [
      "Reduction of effective reservoir operational lifespan and water storage volume",
      "Formation of emergent sandbars that foster excessive aquatic weed proliferation",
      "Increased flooding frequency in upstream towns due to reduced river carrying capacity"
    ],
    consequencesPt: [
      "Redução da vida útil operacional e da capacidade de retenção dos grandes açudes",
      "Formação de bancos de areia e ilhas de sedimentos que favorecem infestações de macrófitas",
      "Enchentes mais frequentes em áreas ribeirinhas por perda da seção de escoamento do rio"
    ],
    sarEvidenceEn: "Specular SAR backscatter drop distinguishes water from emergent silt islands. Dual-pol VH/VV ratio maps colonizing pioneer vegetation across sediment bars with 10-meter spatial resolution.",
    sarEvidencePt: "O radar SAR diferencia lâmina d'água de ilhas de areia assoreadas; a razão VH/VV identifica macrófitas e vegetação pioneira colonizando bancos de lodo.",
    mitigationMeasuresEn: [
      {
        measure: "Check-Dams & Sediment Retention Basins",
        description: "Construct stepped masonry check-dams in steep headwater gullies to trap sand before reaching the mainstem."
      },
      {
        measure: "Contour Farming & Runoff Infiltration Trenches",
        description: "Incentivize agricultural contour plowing and swales across Inhamuns and Médio Jaguaribe crop fields."
      },
      {
        measure: "Targeted Hydraulic Desiltation",
        description: "Strategic mechanical dredging of riverbed choke points to restore natural flow conveyance."
      }
    ],
    mitigationMeasuresPt: [
      {
        measure: "Bacias e Barragens Sucessivas de Retenção",
        description: "Instalação de barramentos de pedra em gargalos tributários para decantar a areia grossa antes da calha principal."
      },
      {
        measure: "Curvas de Nível e Bacias de Infiltração",
        description: "Adoção de terraceamento e caixas de retenção de enxurrada ao longo de estradas rurais e lavouras."
      },
      {
        measure: "Desassoreamento Mecânico Cirúrgico",
        description: "Dragagem controlada dos gargalos hidráulicos para restaurar a cota de escoamento natural do rio."
      }
    ]
  },
  {
    id: "settlements",
    category: "settlements",
    titleEn: "Vulnerable Riparian Floodplain Settlements",
    titlePt: "Moradias em Várzeas Vulneráveis & Risco Hidrológico",
    subtitleEn: "Informal human occupation in dry floodways facing severe flood/drought cycles",
    subtitlePt: "Ocupações ribeirinhas na calha de cheia expostas a enchentes e secas severas",
    icon: Home,
    color: "text-rose-400",
    borderColor: "border-rose-500/40",
    bgGlow: "bg-rose-500/10",
    coords: "Iguatu Baixada & Limoeiro do Norte (-6.36° S, -39.30° W)",
    problemSummaryEn: "During multi-year droughts lasting 5 to 7 years, dry riverbanks and ephemeral várzeas seem safe, encouraging informal housing expansion. When extreme rainfall cycles return or emergency dam spillways discharge, hundreds of low-income families are inundated and displaced.",
    problemSummaryPt: "Durante secas de 5 a 7 anos, o leito seco do rio parece terra firme, atraindo ocupações irregulares e loteamentos de baixa renda. Quando o ciclo úmido retorna ou os açudes vertem, bairros inteiros são submersos, gerando tragédias humanitárias.",
    driverEn: "Urban housing deficits, land speculation in dry river margins, and lack of radar-verified floodway zoning laws.",
    driverPt: "Déficit habitacional urbano, especulação imobiliária nas várzeas e ausência de zoneamento baseado em cotas históricas.",
    consequencesEn: [
      "Repeated destruction of homes, schools, and essential infrastructure during flash floods",
      "Contamination of residential drinking wells with sewage overflow and agricultural runoff",
      "High municipal costs for emergency relocation, shelters, and structural repair"
    ],
    consequencesPt: [
      "Destruição recorrente de casas, pontes e vias públicas durante pulsos de cheia",
      "Contaminação de poços e fossas sépticas por transbordamento de águas fluviais",
      "Altos custos públicos com abrigos emergenciais, resgates e reconstrução"
    ],
    sarEvidenceEn: "SAR penetrates storm clouds and rain to map urban inundation boundaries in real time. Double-bounce radar returns from water-wall junctions pinpoint submerged buildings.",
    sarEvidencePt: "O radar SAR atravessa nuvens de tempestade e chuva, mapeando a mancha de inundação em tempo real. O reflexo diedro parede-água identifica casas atingidas.",
    mitigationMeasuresEn: [
      {
        measure: "SAR-Based Hydrological Risk Zoning",
        description: "Establish binding municipal floodway boundaries derived from 40-year multi-satellite inundation records."
      },
      {
        measure: "Planned Resettlement & Social Housing",
        description: "Relocate vulnerable families from extreme-risk floodways to planned urbanization on high-elevation topography."
      },
      {
        measure: "Real-Time Telemetry & Early Warning Sirens",
        description: "Link FUNCEME/COGERH hydrometric sensors with automated civil defense evacuation alerts."
      }
    ],
    mitigationMeasuresPt: [
      {
        measure: "Zoneamento de Risco por Imagens de Radar",
        description: "Definição de cotas 'non aedificandi' baseadas no histórico de 40 anos de cheias mapeadas por satélite."
      },
      {
        measure: "Reassentamento Habitacional Digno",
        description: "Transferência voluntária e assistida das famílias das cotas críticas para conjuntos habitacionais em cotas seguras."
      },
      {
        measure: "Sirenes de Alerta Precoce & Telemetria",
        description: "Integração das réguas telemétricas da COGERH/FUNCEME com sistemas de sirenes da Defesa Civil."
      }
    ]
  },
  {
    id: "aquaculture",
    category: "aquaculture",
    titleEn: "Carciniculture, Fishing & Water Quality Impacts",
    titlePt: "Carcinicultura, Pesca & Qualidade da Água",
    subtitleEn: "Balancing economic shrimp farming with estuarine ecological pulse dilution",
    subtitlePt: "Equilibrando a produção de camarão com a diluição por pulsos ecológicos",
    icon: Fish,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    bgGlow: "bg-cyan-500/10",
    coords: "Estuário de Aracati / Fortim (-4.44° S, -37.78° W)",
    problemSummaryEn: "Aracati hosts over 3,700 ha of shrimp ponds (carcinicultura), generating thousands of local jobs. However, during droughts when Castanhão stops discharging freshwater, tidal canals lose flushing capacity. Concentrated nutrient effluent (nitrogen, phosphorus) causes periodic eutrophication and oxygen drops.",
    problemSummaryPt: "Aracati concentra mais de 3.700 ha de viveiros de camarão, motor econômico que gera milhares de empregos. Contudo, na seca, quando o Castanhão fecha as comportas, cessa a diluição fluvial. Efluentes ricos em nitrogênio e fósforo causam hipóxia periódica e estresse no manguezal.",
    driverEn: "Upstream freshwater retention, intense feed loading, and lack of biological sediment settling basins.",
    driverPt: "Retenção de água doce a montante, alta densidade de ração e escassez de bacias de decantação nos viveiros.",
    consequencesEn: [
      "Stagnation in estuarine tidal creeks leading to localized dissolved oxygen depletion (< 2.0 mg/L)",
      "Vulnerability of artisanal crab gatherers (catadores de caranguejo) to habitat alteration",
      "Risk of pathogenic disease transmission between shrimp ponds during low-flow periods"
    ],
    consequencesPt: [
      "Estagnação em gamboas com quedas severas de oxigênio dissolvido (< 2,0 mg/L)",
      "Impacto na atividade tradicional dos catadores de caranguejo por alteração de substrato",
      "Aumento do risco de proliferação de enfermidades nos próprios viveiros por recirculação de água estagnada"
    ],
    sarEvidenceEn: "Specular SAR backscatter accurately categorizes active production ponds vs. drained beds. Multi-frequency SAR monitors earthen perimeter dike integrity against coastal storm surge erosion.",
    sarEvidencePt: "O radar SAR especular quantifica a área exata de tanques em lâmina d'água vs. tanques em despesca. O radar multifrequência inspeciona a estabilidade dos diques de terra.",
    mitigationMeasuresEn: [
      {
        measure: "Synchronized Ecological Discharge Pulses",
        description: "Negotiated seasonal freshwater release pulses from Castanhão timed precisely with spring ebb tides to flush the estuary."
      },
      {
        measure: "Recirculating Aquaculture Systems (RAS) & Mangrove Biofilters",
        description: "Require settling sedimentation ponds and constructed mangrove wetland buffers to absorb nutrients prior to canal release."
      },
      {
        measure: "Co-Management Committee Integration",
        description: "Joint water allocation governance uniting shrimp farmers, artisanal fishermen, COGERH, and environmental authorities."
      }
    ],
    mitigationMeasuresPt: [
      {
        measure: "Descargas Ecológicas Sincronizadas do Castanhão",
        description: "Pulsos de vazão de água doce negociados no Comitê de Bacia, liberados em marés de sizígia para lavar o estuário."
      },
      {
        measure: "Sistemas de Recirculação (RAS) & Filtros Biológicos",
        description: "Obrigatoriedade de bacias de decantação e uso de bosques de manguezal como filtros naturais de fósforo e nitrogênio."
      },
      {
        measure: "Pacto de Co-Gestão Participativa",
        description: "Fórum permanente unindo carcinicultores, pescadores tradicionais, COGERH, SEMACE e universidades."
      }
    ]
  }
];

export default function EcologicalProblematization() {
  const { t, lang } = useLanguage();
  const [activeTopicId, setActiveTopicId] = useState<string>("erosion");

  const topic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];
  const IconComponent = topic.icon;

  return (
    <section id="ecological-problematization" className="py-14 border-t border-slate-800 bg-[#050C18]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center space-x-2 rounded-full border border-rose-500/30 bg-rose-950/30 px-3.5 py-1 text-xs font-semibold text-rose-300 mb-2">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
            <span>{t("Ecological Problematization & Corrective Action", "Problematização Ecológica & Medidas de Correção")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t("Environmental Stress Points & Engineering Solutions Along the Basin", "Pontos de Tensão Ecológica & Soluções Técnicas ao Longo da Bacia")}
          </h2>
          <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
            {t(
              "An objective diagnostic of riverbank landslides, riverbed siltation, vulnerable floodway settlements, and aquaculture pressures along the Jaguaribe, paired with actionable corrective measures.",
              "Diagnóstico objetivo sobre desbarrancamentos de taludes, assoreamento, moradias em áreas de risco e impactos da carcinicultura ao longo do Jaguaribe, acompanhado de soluções corretivas práticas."
            )}
          </p>
        </div>

        {/* 4 Topic Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {TOPICS.map((item) => {
            const ItemIcon = item.icon;
            const isSelected = activeTopicId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTopicId(item.id)}
                className={`rounded-2xl p-4 text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? `${item.borderColor} ${item.bgGlow} shadow-xl scale-[1.02]`
                    : "border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className={`p-2 rounded-xl bg-black/40 border border-slate-800 ${item.color}`}>
                    <ItemIcon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {t(item.titleEn, item.titlePt)}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {t(item.subtitleEn, item.subtitlePt)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE TOPIC DEEP-DIVE CARD */}
        <div className={`rounded-3xl border ${topic.borderColor} bg-[#0A1324] p-6 lg:p-8 shadow-2xl relative overflow-hidden`}>
          
          {/* Top Topic Details */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
            <div className="flex items-start space-x-3.5">
              <div className={`p-3 rounded-2xl bg-black/60 border ${topic.borderColor} ${topic.color}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 block mb-1">
                  {topic.coords}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {t(topic.titleEn, topic.titlePt)}
                </h3>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                {t("Primary Human Driver:", "Vetor Humano Primário:")}
              </span>
              <span className="text-slate-200 font-medium">
                {t(topic.driverEn, topic.driverPt)}
              </span>
            </div>
          </div>

          {/* Diagnostic & Consequences Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
            
            {/* Col 1: Problem Summary & Consequences (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-2 flex items-center space-x-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                  <span>{t("Diagnostic & Root Causes:", "Diagnóstico & Causas Críticas:")}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t(topic.problemSummaryEn, topic.problemSummaryPt)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <h4 className="text-xs uppercase font-bold text-rose-400 tracking-wider mb-2.5">
                  {t("Ecological & Socio-Economic Impacts:", "Impactos Ecológicos & Socioeconômicos:")}
                </h4>
                <ul className="space-y-2">
                  {(lang === "en" ? topic.consequencesEn : topic.consequencesPt).map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Col 2: Satellite SAR Signature (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase mb-3">
                    <Radio className="h-3 w-3 animate-pulse" />
                    <span>{t("Space-Borne Microwave Detection", "Detecção por Radar Orbital")}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">
                    {t("How SAR Discovers & Measures This:", "Como o Radar SAR Revela Isso:")}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {t(topic.sarEvidenceEn, topic.sarEvidencePt)}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-cyan-500/20 text-[11px] text-cyan-200">
                  <strong>{t("Space Instruments:", "Sensores Utilizados:")}</strong> NASA-ISRO NISAR (L-band 24 cm), Copernicus Sentinel-1 RTC (C-band 5.6 cm), ALOS-2 PALSAR-2.
                </div>
              </div>

            </div>

          </div>

          {/* Actionable Corrective & Mitigation Solutions */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider mb-4 flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{t("Actionable Corrective Solutions & Mitigation Measures:", "Soluções Corretivas Aplicáveis & Medidas de Mitigação:")}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(lang === "en" ? topic.mitigationMeasuresEn : topic.mitigationMeasuresPt).map((m, idx) => (
                <div key={idx} className="rounded-2xl border border-emerald-500/30 bg-emerald-950/15 p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block mb-1">
                      {t(`Solution 0${idx + 1}`, `Solução 0${idx + 1}`)}
                    </span>
                    <strong className="text-sm font-bold text-white block mb-2">
                      {m.measure}
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
