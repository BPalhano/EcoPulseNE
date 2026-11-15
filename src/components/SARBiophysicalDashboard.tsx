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
  Calendar,
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
  Zap,
  Calculator,
  BookOpen,
  X,
  Code2,
  Target
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  ReferenceLine
} from "recharts";
import BiomassCorrelationSection from "@/components/BiomassCorrelationSection";

// MULTI-METRIC TIME-SERIES (1985-2026) ACROSS 4 CORE SAR BIOPHYSICAL INDICATORS
const MULTI_METRIC_TIME_SERIES = [
  {
    year: 1985,
    labelEn: "1985 - Pre-Castanhão Pristine Baseline",
    labelPt: "1985 - Linha de Base Pré-Castanhão",
    dielectricEpsilon: 14.5,
    insarDeformationMm: 0.0,
    doubleBouncePct: 45,
    salinityWedgeKm: 4.5,
    climateContextEn: "Unregulated river pulses; low salinity wedge (4.5 km).",
    climateContextPt: "Regime natural sem represamento; cunha salina contida em 4,5 km."
  },
  {
    year: 1990,
    labelEn: "1990 - Seasonal Drought Cycle",
    labelPt: "1990 - Estiagem Sazonal da Caatinga",
    dielectricEpsilon: 9.8,
    insarDeformationMm: -0.4,
    doubleBouncePct: 36,
    salinityWedgeKm: 7.2,
    climateContextEn: "Seasonal drying reduces soil dielectric permittivity to 9.8.",
    climateContextPt: "Estiagem sazonal reduz permissividade dielétrica para 9,8."
  },
  {
    year: 1995,
    labelEn: "1995 - Super Wet Monsoon Pulse",
    labelPt: "1995 - Super Pulso Úmido de Inundação",
    dielectricEpsilon: 18.2,
    insarDeformationMm: +0.6,
    doubleBouncePct: 48,
    salinityWedgeKm: 3.8,
    climateContextEn: "Torrential basin-wide recharge pushes salinity wedge to the sea.",
    climateContextPt: "Recarga torrencial empurra cunha salina para a foz."
  },
  {
    year: 2000,
    labelEn: "2000 - Castanhão Construction Earthworks",
    labelPt: "2000 - Obras de Barramento do Castanhão",
    dielectricEpsilon: 12.0,
    insarDeformationMm: -0.8,
    doubleBouncePct: 38,
    salinityWedgeKm: 5.5,
    climateContextEn: "Initial crest compaction and foundation settlement.",
    climateContextPt: "Adensamento primário da crista e assentamento de fundação."
  },
  {
    year: 2004,
    labelEn: "2004 - Reservoir Filling & Historic Spillway Sangria",
    labelPt: "2004 - Sangria Histórica do Castanhão (100%)",
    dielectricEpsilon: 21.0,
    insarDeformationMm: -1.2,
    doubleBouncePct: 52,
    salinityWedgeKm: 3.5,
    climateContextEn: "Castanhão reaches 100% capacity; massive flood pulse flushes estuary.",
    climateContextPt: "Castanhão atinge 100% de sangria; super pulso lava o estuário."
  },
  {
    year: 2008,
    labelEn: "2008 - Second Spillway Discharge Era",
    labelPt: "2008 - Segunda Sangria Plena & Equilíbrio",
    dielectricEpsilon: 19.5,
    insarDeformationMm: -1.4,
    doubleBouncePct: 50,
    salinityWedgeKm: 3.8,
    climateContextEn: "Abundant water maintains high dielectric moisture across basin.",
    climateContextPt: "Chuvas abundantes mantêm alta umidade dielétrica na bacia."
  },
  {
    year: 2012,
    labelEn: "2012 - Inception of Decade Megadrought",
    labelPt: "2012 - Início da Megaseca Decenal",
    dielectricEpsilon: 8.4,
    insarDeformationMm: -2.8,
    doubleBouncePct: 28,
    salinityWedgeKm: 14.5,
    climateContextEn: "Beginning of multi-year drought; dam hydrostatic decompression begins.",
    climateContextPt: "Início da megaseca; descompressão hidrostática inicia na barragem."
  },
  {
    year: 2014,
    labelEn: "2014 - Deepening Drought & Downstream Flow Closed",
    labelPt: "2014 - Agravamento da Seca & Fechamento de Comportas",
    dielectricEpsilon: 5.6,
    insarDeformationMm: -3.9,
    doubleBouncePct: 20,
    salinityWedgeKm: 22.0,
    climateContextEn: "Riverbed flow shut down; salinity wedge penetrates 22 km upstream.",
    climateContextPt: "Comportas fechadas; cunha salina avança 22 km a montante."
  },
  {
    year: 2016,
    labelEn: "2016 - Apex Drought: Castanhão at 5.2% Storage",
    labelPt: "2016 - Ápice da Megaseca (Castanhão a 5,2%)",
    dielectricEpsilon: 3.4,
    insarDeformationMm: -4.8,
    doubleBouncePct: 14,
    salinityWedgeKm: 32.0,
    climateContextEn: "Extreme desiccation: ε drops to 3.4; salinity reaches Jaguaruana (32 km).",
    climateContextPt: "Dessecação extrema: ε desce a 3,4; salinidade atinge Jaguaruana (32 km)."
  },
  {
    year: 2018,
    labelEn: "2018 - Critical Dead Volume Persistence",
    labelPt: "2018 - Persistência do Volume Morto",
    dielectricEpsilon: 4.8,
    insarDeformationMm: -4.2,
    doubleBouncePct: 18,
    salinityWedgeKm: 28.5,
    climateContextEn: "Prolonged low storage; high InSAR coherence on dry exposed crest.",
    climateContextPt: "Armazenamento residual crítico; alta coerência InSAR no aterro seco."
  },
  {
    year: 2020,
    labelEn: "2020 - Initial Monsoon Wet Pulses",
    labelPt: "2020 - Primeiros Pulsos Úmidos de Recarga",
    dielectricEpsilon: 7.9,
    insarDeformationMm: -2.1,
    doubleBouncePct: 27,
    salinityWedgeKm: 18.0,
    climateContextEn: "Incipient wet pulses initiate recharge and salinity wedge retreat.",
    climateContextPt: "Pulsos de chuva iniciam recarga e recuo da cunha salina."
  },
  {
    year: 2022,
    labelEn: "2022 - PISF São Francisco Transposition Inflow",
    labelPt: "2022 - Chegada das Águas da Transposição (PISF)",
    dielectricEpsilon: 9.6,
    insarDeformationMm: -1.0,
    doubleBouncePct: 33,
    salinityWedgeKm: 16.0,
    climateContextEn: "São Francisco transfer bolsters river discharge and groundwater buffer.",
    climateContextPt: "Águas do São Francisco garantem perenização e recarga de lençol."
  },
  {
    year: 2024,
    labelEn: "2024 - Operational Baseline Recovery",
    labelPt: "2024 - Marco de Recuperação & Linha de Base",
    dielectricEpsilon: 11.8,
    insarDeformationMm: +1.1,
    doubleBouncePct: 36,
    salinityWedgeKm: 12.5,
    climateContextEn: "Storage recovers to 32%; dam crest exhibits elastic rebound (+1.1 mm).",
    climateContextPt: "Volume sobe a 32%; crista da barragem apresenta recarga elástica (+1,1 mm)."
  },
  {
    year: 2026,
    labelEn: "2026 - Present: NISAR Dual-Band L+S Era",
    labelPt: "2026 - Presente: Era Operacional NISAR L+S",
    dielectricEpsilon: 12.4,
    insarDeformationMm: +0.8,
    doubleBouncePct: 39,
    salinityWedgeKm: 11.0,
    climateContextEn: "Operational NISAR L+S orbit tracks root-zone dielectric and estuarine health.",
    climateContextPt: "NISAR L+S operacional monitora umidade radicular e saúde estuarina."
  }
];

// CLIMATE REALITY CROSS-VALIDATION MATRIX
const CLIMATE_CROSS_VALIDATION_MATRIX = [
  {
    era: "2004",
    driverEn: "Atlantic Dipole Wet Pulse & Historic Spillway Sangria",
    driverPt: "Dipolo Positivo do Atlântico & Sangria Plena",
    climatePhenomenon: "Favorable ITCZ position (Zona de Convergência Intertropical)",
    groundRealityEn: "Castanhão reaches 100% spillway discharge (6.7 billion m³). Basin-wide soil saturation and massive freshwater estuarine flushing.",
    groundRealityPt: "Castanhão atinge 100% de sangria (6,7 bilhões de m³). Saturação de solo na bacia e grande lavagem de água doce no estuário.",
    sarSignatureEn: "ENVISAT ASAR & ERS-2: Soil dielectric ε jumps to 21.0; open lake expands to 325 km² (specular drop σ⁰ < -22 dB); estuarine double-bounce Pd reaches 52%.",
    sarSignaturePt: "ENVISAT ASAR & ERS-2: Dielétrico ε sobe para 21,0; espelho d'água atinge 325 km² (espalhamento especular σ⁰ < -22 dB); diedro duplo Pd chega a 52%.",
    governanceActionEn: "Emergency spillway monitoring, flood defense warnings in downstream Limoeiro do Norte, and maximum shrimp pond dilution flushing.",
    governanceActionPt: "Monitoramento de vertedouro, alertas de cheia a jusante em Limoeiro do Norte e lavagem salina máxima dos viveiros de camarão.",
    band: "C-Band (5.3 GHz)"
  },
  {
    era: "2012–2017",
    driverEn: "Super El Niño & Prolonged Megadrought Apex",
    driverPt: "Super El Niño & Ápice da Megaseca Histórica",
    climatePhenomenon: "Pacific warming + Tropical Atlantic thermal barrier suppressing ITCZ descent",
    groundRealityEn: "6 consecutive dry years. Castanhão reservoir collapses to 5.2% (104 million m³). Riverbed discharge drops to 0 m³/s to protect Fortaleza drinking supply.",
    groundRealityPt: "6 anos secos seguidos. Açude Castanhão desaba para 5,2% (104 milhões de m³). Vazão de calha zerada para proteger abastecimento de Fortaleza.",
    sarSignatureEn: "ALOS-2 & Sentinel-1: Soil dielectric ε collapses to 3.4; InSAR dam crest deformation registers -4.8 mm/yr subsidence; coastal salinity intrusion wedge expands to 32 km.",
    sarSignaturePt: "ALOS-2 & Sentinel-1: Permissividade dielétrica ε colapsa para 3,4; InSAR mede subsidência de -4,8 mm/ano na crista; cunha salina atinge 32 km a montante.",
    governanceActionEn: "Water rationing, transfer of allocation priority to human metropolitan intake via Eixão das Águas canal, closure of river irrigation canals.",
    governanceActionPt: "Racionamento hídrico, prioridade total para consumo humano via canal Eixão das Águas e suspensão de perímetros irrigados na calha.",
    band: "L-Band & C-Band"
  },
  {
    era: "2021–2022",
    driverEn: "La Niña & PISF São Francisco River Transposition",
    driverPt: "La Niña & Chegada da Transposição do São Francisco (PISF)",
    climatePhenomenon: "Equatorial Pacific cooling + Artificial transboundary water transfer via Cinturão das Águas",
    groundRealityEn: "Transboundary transfer waters arrive via Rio Salgado into Castanhão, ending the multi-year structural drought cycle and securing minimum municipal storage.",
    groundRealityPt: "Águas da transposição entram pelo Rio Salgado no Castanhão, encerrando a megaseca estrutural e garantindo reserva hídrica mínima.",
    sarSignatureEn: "Sentinel-1 RTC & ALOS-2: InSAR crest deformation stabilizes (-1.0 mm/yr); lacustrine alluvium moistening expands perimeter dielectric permittivity (ε = 9.6).",
    sarSignaturePt: "Sentinel-1 RTC & ALOS-2: Deformação da crista estabiliza (-1,0 mm/ano); umedecimento do aluvião lacustre eleva permissividade dielétrica (ε = 9,6).",
    governanceActionEn: "Pumping optimization from São Francisco Northern Axis, controlled releases to replenish Middle Jaguaribe alluvial aquifer.",
    governanceActionPt: "Otimização de bombeamento do Eixo Norte do PISF e descargas controladas para recarga do aquífero aluvial do Médio Jaguaribe.",
    band: "C-Band & L-Band"
  },
  {
    era: "2024–2026",
    driverEn: "NISAR Operational Era & Tropical Atlantic Heatwaves",
    driverPt: "Marco Operacional NISAR & Ondas de Calor no Atlântico",
    climatePhenomenon: "Marine Heatwaves off Ceará coast + Active NASA-ISRO NISAR L+S 12-day orbit cycle",
    groundRealityEn: "Storage stabilizes at 34%. Higher coastal water temperatures accelerate estuarine oxygen depletion, requiring coordinated pulse releases.",
    groundRealityPt: "Volume estabilizado em 34%. Águas costeiras aquecidas aceleram consumo de oxigênio no estuário, exigindo pulsos ecológicos programados.",
    sarSignatureEn: "NISAR L+S Band & Sentinel-1 RTC: L-band penetration (0–30 cm) tracks root-zone hydration (ε = 12.4); S-band & C-band monitor canopy volume and tidal double-bounce.",
    sarSignaturePt: "NISAR Banda L+S & Sentinel-1 RTC: Penetração em banda L (0–30 cm) rastreia hidratação radicular (ε = 12,4); bandas S e C monitoram copa e diedro de maré.",
    governanceActionEn: "Dynamic environmental pulse releases from Castanhão timed to spring tides to flush aquaculture effluents and restore mangrove osmotic equilibrium.",
    governanceActionPt: "Descargas de pulsos ecológicos do Castanhão sincronizadas com marés de sizígia para lavar efluentes aquícolas e restabelecer equilíbrio osmótico.",
    band: "NISAR L+S (1.2 / 3.2 GHz)"
  }
];

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
  const [activeTab, setActiveTab] = useState<"dielectric" | "insar" | "polarimetry" | "estuary">("dielectric");
  const [probeDepthCm, setProbeDepthCm] = useState<number>(15);

  // Tab 1 Sub-states: Tidal simulation (High vs Low)
  const [tidalState, setTidalState] = useState<"high" | "low">("high");

  // Tab 3 Sub-states: Selected Dam for InSAR analysis
  const [selectedDam, setSelectedDam] = useState<DamKey>("castanhao");

  // Tab 4 Sub-states: River Flow & Effluent Modes
  const [riverFlowMode, setRiverFlowMode] = useState<"drought" | "strong">("drought");
  const [effluentView, setEffluentView] = useState<"worst" | "best" | "comparison">("comparison");

  // Continuous Time-Series Multi-Metric State
  const [selectedMetricMode, setSelectedMetricMode] = useState<"all" | "dielectric" | "insar" | "double_bounce" | "salinity">("all");
  const [activeEquationModal, setActiveEquationModal] = useState<"topp" | "dinsar" | "pauli" | "salinity" | null>(null);

  const normalizedTimeSeriesData = MULTI_METRIC_TIME_SERIES.map((pt) => ({
    year: pt.year,
    labelEn: pt.labelEn,
    labelPt: pt.labelPt,
    label: t(pt.labelEn, pt.labelPt),
    dielectricEpsilon: pt.dielectricEpsilon,
    insarDeformationMm: pt.insarDeformationMm,
    doubleBouncePct: pt.doubleBouncePct,
    salinityWedgeKm: pt.salinityWedgeKm,
    dielectricNorm: Math.round(((pt.dielectricEpsilon - 3.0) / (25.0 - 3.0)) * 100),
    insarNorm: Math.round(((pt.insarDeformationMm - (-5.0)) / (2.0 - (-5.0))) * 100),
    doubleBounceNorm: Math.round(((pt.doubleBouncePct - 10) / (55 - 10)) * 100),
    salinityNorm: Math.round((pt.salinityWedgeKm / 35.0) * 100),
    contextEn: pt.climateContextEn,
    contextPt: pt.climateContextPt
  }));

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

          {/* Active Sensor Constellation Badge */}
          <div className="flex items-center space-x-2.5 rounded-2xl border border-slate-700/80 bg-slate-900/90 px-4 py-2.5 shadow-lg">
            <Radio className="h-4 w-4 text-cyan-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold">{t("Radar Constellation", "Constelação SAR")}</span>
              <span className="text-white font-semibold font-mono">NISAR L+S · Sentinel-1 C · ALOS-2 L</span>
            </div>
          </div>
        </div>

        {/* CONTINUOUS MULTI-METRIC TIME-SERIES DASHBOARD (1985-2026) */}
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0A1322] to-[#060D19] p-6 lg:p-8 backdrop-blur-xl shadow-2xl mb-12">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[11px] font-bold uppercase mb-1">
                <TrendingUp className="h-4 w-4" />
                <span>{t("Continuous Decadal Radar Telemetry (1985–2026)", "Telemetria Decadal Contínua em Radar (1985–2026)")}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t("Biophysical Signal Trajectory across Droughts & Surges", "Trajetória dos Sinais Biofísicos entre Secas e Cheias")}
              </h3>
            </div>

            {/* Metric Mode Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 p-1 text-xs">
              <button
                onClick={() => setSelectedMetricMode("all")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                  selectedMetricMode === "all" ? "bg-cyan-500 text-black font-bold shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                {t("All 4 Metrics (Norm)", "4 Métricas (Norm)")}
              </button>
              <button
                onClick={() => setSelectedMetricMode("dielectric")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                  selectedMetricMode === "dielectric" ? "bg-cyan-500 text-black font-bold shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                💧 ε {t("Dielectric", "Dielétrico")}
              </button>
              <button
                onClick={() => setSelectedMetricMode("insar")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                  selectedMetricMode === "insar" ? "bg-emerald-500 text-black font-bold shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                🛡️ InSAR (mm/yr)
              </button>
              <button
                onClick={() => setSelectedMetricMode("double_bounce")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                  selectedMetricMode === "double_bounce" ? "bg-rose-500 text-white font-bold shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                🌿 {t("Double Bounce", "Diedro Duplo")}
              </button>
              <button
                onClick={() => setSelectedMetricMode("salinity")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                  selectedMetricMode === "salinity" ? "bg-amber-500 text-black font-bold shadow-sm" : "text-slate-400 hover:text-white"
                }`}
              >
                🌊 {t("Salinity Wedge", "Cunha Salina")}
              </button>
            </div>
          </div>

          {/* Quick-Jump Timeline Milestone Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold flex items-center space-x-1.5">
              <span>{t("Milestones:", "Marcos Históricos:")}</span>
            </span>
            <button
              onClick={() => setSelectedScenario("baseline")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                selectedScenario === "baseline"
                  ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400 shadow-md shadow-cyan-950/60"
                  : "bg-slate-900/80 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-950/40"
              }`}
            >
              <span>🌊</span>
              <span>2004 Sangria (100% {t("Spillway", "Vertedouro")})</span>
            </button>
            <button
              onClick={() => setSelectedScenario("drought")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                selectedScenario === "drought"
                  ? "bg-rose-500/30 text-rose-200 border border-rose-400 shadow-md shadow-rose-950/60"
                  : "bg-slate-900/80 text-rose-400 border border-rose-500/20 hover:bg-rose-950/40"
              }`}
            >
              <span>🔥</span>
              <span>2016 Megaseca (5.2% {t("Apex", "Ápice")})</span>
            </button>
            <button
              onClick={() => setSelectedScenario("recovery")}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                selectedScenario === "recovery"
                  ? "bg-blue-500/30 text-blue-200 border border-blue-400 shadow-md shadow-blue-950/60"
                  : "bg-slate-900/80 text-blue-400 border border-blue-500/20 hover:bg-blue-950/40"
              }`}
            >
              <span>💧</span>
              <span>2022 PISF ({t("Transposition", "Transposição")})</span>
            </button>
            <button
              onClick={() => setSelectedScenario("recovery")}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-900/80 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-950/40 transition-all flex items-center space-x-1.5"
            >
              <span>🛰️</span>
              <span>2024–2026 NISAR ({t("Dual L+S Orbit", "Órbita Dupla L+S")})</span>
            </button>
          </div>

          {/* Area Chart Container */}
          <div className="h-96 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={normalizedTimeSeriesData} margin={{ top: 52, right: 25, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaDielectric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="areaInsar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="areaDoubleBounce" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="areaSalinity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="year" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-slate-700 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md text-xs font-sans max-w-sm">
                          {/* Milestone Highlighting Badge */}
                          {data.year === 2004 && (
                            <div className="mb-2 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-400 text-cyan-200 text-xs font-bold">
                              <span>🌊</span>
                              <span>{t("2004 Historic Spillway Sangria", "2004 Sangria Histórica do Castanhão")}</span>
                            </div>
                          )}
                          {data.year === 2016 && (
                            <div className="mb-2 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-400 text-rose-200 text-xs font-bold">
                              <span>🔥</span>
                              <span>{t("2016 Peak Megadrought Apex (5.2% Storage)", "2016 Ápice da Megaseca (5,2% Volume)")}</span>
                            </div>
                          )}
                          {data.year === 2022 && (
                            <div className="mb-2 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-400 text-blue-200 text-xs font-bold">
                              <span>💧</span>
                              <span>{t("2022 PISF São Francisco Arrival", "2022 Chegada das Águas do PISF")}</span>
                            </div>
                          )}

                          <span className="font-mono text-cyan-400 font-bold block mb-1">
                            {t(data.labelEn, data.labelPt)}
                          </span>
                          <div className="space-y-1.5 font-mono text-[11px] mb-2">
                            <div className="flex justify-between text-cyan-300">
                              <span>{t("Soil Dielectric Permittivity (ε):", "Permissividade Dielétrica (ε):")}</span>
                              <strong>{data.dielectricEpsilon}</strong>
                            </div>
                            <div className="flex justify-between text-emerald-300">
                              <span>{t("InSAR Dam Crest Deformation:", "Deformação InSAR Crista:")}</span>
                              <strong>{data.insarDeformationMm > 0 ? `+${data.insarDeformationMm}` : data.insarDeformationMm} mm/{t("yr", "ano")}</strong>
                            </div>
                            <div className="flex justify-between text-rose-300">
                              <span>{t("Dihedral Double-Bounce (Pd):", "Reflexão Dupla Diedro (Pd):")}</span>
                              <strong>{data.doubleBouncePct}%</strong>
                            </div>
                            <div className="flex justify-between text-amber-300">
                              <span>{t("Upstream Saline Wedge:", "Cunha Salina a Montante:")}</span>
                              <strong>{data.salinityWedgeKm} km</strong>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-300 italic border-t border-slate-800 pt-1.5 leading-relaxed">
                            {t(data.contextEn, data.contextPt)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine 
                  x={2004} 
                  stroke="#00E5FF" 
                  strokeWidth={2}
                  strokeDasharray="4 4" 
                  label={(props: any) => {
                    const x = props.viewBox?.x ?? 0;
                    return (
                      <g transform={`translate(${x}, 14)`}>
                        <circle cx={0} cy={0} r={12} fill="#083344" stroke="#00E5FF" strokeWidth={1.5} />
                        <text x={0} y={4} fontSize={12} textAnchor="middle">🌊</text>
                      </g>
                    );
                  }} 
                />
                <ReferenceLine 
                  x={2016} 
                  stroke="#F43F5E" 
                  strokeWidth={2}
                  strokeDasharray="4 4" 
                  label={(props: any) => {
                    const x = props.viewBox?.x ?? 0;
                    return (
                      <g transform={`translate(${x}, 14)`}>
                        <circle cx={0} cy={0} r={12} fill="#4C0519" stroke="#F43F5E" strokeWidth={1.5} />
                        <text x={0} y={4} fontSize={12} textAnchor="middle">🔥</text>
                      </g>
                    );
                  }} 
                />
                <ReferenceLine 
                  x={2022} 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  strokeDasharray="4 4" 
                  label={(props: any) => {
                    const x = props.viewBox?.x ?? 0;
                    return (
                      <g transform={`translate(${x}, 14)`}>
                        <circle cx={0} cy={0} r={12} fill="#172554" stroke="#3B82F6" strokeWidth={1.5} />
                        <text x={0} y={4} fontSize={12} textAnchor="middle">💧</text>
                      </g>
                    );
                  }} 
                />

                {(selectedMetricMode === "all" || selectedMetricMode === "dielectric") && (
                  <Area
                    type="monotone"
                    dataKey={selectedMetricMode === "all" ? "dielectricNorm" : "dielectricEpsilon"}
                    stroke="#00E5FF"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#areaDielectric)"
                    name="Dielectric ε"
                    dot={{ r: 3.5, fill: "#083344", stroke: "#00E5FF", strokeWidth: 1.5 }}
                    activeDot={{ r: 6.5, fill: "#00E5FF", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                )}
                {(selectedMetricMode === "all" || selectedMetricMode === "insar") && (
                  <Area
                    type="monotone"
                    dataKey={selectedMetricMode === "all" ? "insarNorm" : "insarDeformationMm"}
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#areaInsar)"
                    name="InSAR Deformation"
                    dot={{ r: 3.5, fill: "#064E3B", stroke: "#10B981", strokeWidth: 1.5 }}
                    activeDot={{ r: 6.5, fill: "#10B981", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                )}
                {(selectedMetricMode === "all" || selectedMetricMode === "double_bounce") && (
                  <Area
                    type="monotone"
                    dataKey={selectedMetricMode === "all" ? "doubleBounceNorm" : "doubleBouncePct"}
                    stroke="#F43F5E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#areaDoubleBounce)"
                    name="Double-Bounce"
                    dot={{ r: 3.5, fill: "#4C0519", stroke: "#F43F5E", strokeWidth: 1.5 }}
                    activeDot={{ r: 6.5, fill: "#F43F5E", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                )}
                {(selectedMetricMode === "all" || selectedMetricMode === "salinity") && (
                  <Area
                    type="monotone"
                    dataKey={selectedMetricMode === "all" ? "salinityNorm" : "salinityWedgeKm"}
                    stroke="#F59E0B"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#areaSalinity)"
                    name="Salinity Wedge"
                    dot={{ r: 3.5, fill: "#451A03", stroke: "#F59E0B", strokeWidth: 1.5 }}
                    activeDot={{ r: 6.5, fill: "#F59E0B", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-800">
            <span className="text-[11px] font-mono">
              {t("Notice: 2012–2017 megadrought displays synchronous collapse across dielectric and double bounce alongside maximum salinity penetration.", "Observe: a megaseca de 2012–2017 exibe colapso síncrono no dielétrico e diedro duplo junto à máxima intrusão salina.")}
            </span>
            <button
              onClick={() => setActiveEquationModal("topp")}
              className="inline-flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline underline-offset-4"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>{t("Inspect Mathematical Equations & Physics", "Ver Equações & Física de Radar")}</span>
            </button>
          </div>

        </div>

        {/* BENCHMARK YEAR & HISTORICAL SCENARIO CONTROL BAR */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/95 via-[#0C1628] to-slate-900/95 mb-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{t("Benchmark Year & Calibrated Radar Scenario", "Ano de Referência & Cenário Radar Calibrado")}</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {curr.year}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              <span className="font-semibold text-white">{t(curr.titleEn, curr.titlePt)}:</span>{" "}
              {t(curr.descriptionEn, curr.descriptionPt)}
            </p>
          </div>

          {/* Scenario Selector Year Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-950/90 p-1.5 shadow-inner self-start md:self-auto flex-shrink-0">
            {(["baseline", "drought", "recovery"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedScenario(s)}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition-all flex items-center space-x-2 ${
                  selectedScenario === s
                    ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-950/50 scale-[1.02]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <span>{s === "baseline" ? "🌱" : s === "drought" ? "🔥" : "💧"}</span>
                <span className="font-mono">{scenarios[s].year}</span>
                <span className="text-[11px] font-normal opacity-90">({t(scenarios[s].titleEn.split(" ")[0], scenarios[s].titlePt.split(" ")[0])})</span>
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
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEquationModal("topp");
                  }}
                  className="px-1.5 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-mono flex items-center space-x-1 border border-cyan-500/30"
                  title="Ver Equação de Topp"
                >
                  <Calculator className="h-2.5 w-2.5" />
                  <span>Eq.</span>
                </button>
                <span className="font-mono text-[10px] bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded">ε (real)</span>
              </div>
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
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEquationModal("dinsar");
                  }}
                  className="px-1.5 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-mono flex items-center space-x-1 border border-emerald-500/30"
                  title="Ver Equação DInSAR"
                >
                  <Calculator className="h-2.5 w-2.5" />
                  <span>Eq.</span>
                </button>
                <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded">γ Coherence</span>
              </div>
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
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEquationModal("pauli");
                  }}
                  className="px-1.5 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px] font-mono flex items-center space-x-1 border border-rose-500/30"
                  title="Ver Decomposição de Pauli"
                >
                  <Calculator className="h-2.5 w-2.5" />
                  <span>Eq.</span>
                </button>
                <span className="font-mono text-[10px] bg-rose-500/10 text-rose-300 px-1.5 py-0.5 rounded">HH-VV</span>
              </div>
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
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveEquationModal("salinity");
                  }}
                  className="px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-mono flex items-center space-x-1 border border-amber-500/30"
                  title="Ver Modelo de Dispersão Estuarina"
                >
                  <Calculator className="h-2.5 w-2.5" />
                  <span>Eq.</span>
                </button>
                <span className="font-mono text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded">Estuary km</span>
              </div>
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
                onClick={() => setActiveTab("dielectric")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                  activeTab === "dielectric"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>💧</span>
                <span>{t("1. Dielectric Moisture (0–30 cm)", "1. Umidade Dielétrica (0–30 cm)")}</span>
              </button>
              <button
                onClick={() => setActiveTab("insar")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                  activeTab === "insar"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🛡️</span>
                <span>{t("2. InSAR Coherence: Dam Stability", "2. Coerência InSAR: Estabilidade de Açudes")}</span>
              </button>
              <button
                onClick={() => setActiveTab("polarimetry")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                  activeTab === "polarimetry"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🌿</span>
                <span>{t("3. Pauli Double-Bounce & Mangroves", "3. Diedro Duplo de Pauli & Manguezais")}</span>
              </button>
              <button
                onClick={() => setActiveTab("estuary")}
                className={`rounded-lg px-3.5 py-1.5 font-bold transition-all shrink-0 flex items-center space-x-1.5 ${
                  activeTab === "estuary"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🌊</span>
                <span>{t("4. River Flow & Biological Effluents", "4. Vazão Fluvial & Efluentes Biológicos")}</span>
              </button>
            </div>

            <span className="text-xs font-mono text-slate-400">
              {t("Active Scenario:", "Cenário Ativo:")} <strong className="text-white">{t(curr.titleEn, curr.titlePt)}</strong>
            </span>
          </div>

          {/* TAB 1: DIELECTRIC MOISTURE & SUBSURFACE PENETRATION (0–30 CM) */}
          {activeTab === "dielectric" && (
            <div className="space-y-6">
              {/* Pedagogical Callout Banner */}
              <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-cyan-950/30 p-5 shadow-lg flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0 mt-0.5">
                  <Target className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>{t("🎯 What this chart measures & Radar Physics:", "🎯 Para que serve este gráfico & Física de Radar:")}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">L-Band (λ = 24.2 cm)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      "Optical satellites (like Landsat or Sentinel-2) only record surface reflectance from dry leaves, registering dormant Caatinga as dead biomass. In contrast, 24.2 cm L-band microwaves penetrate through the dry canopy into the soil profile down to 30 cm. Because liquid water has a relative dielectric permittivity (ε ≈ 80) drastically higher than dry soil minerals (ε ≈ 3.2), radar phase shifts directly calculate true root-zone volumetric moisture (θ_v), revealing whether deep taproots are in viable drought dormancy or dead.",
                      "Satélites ópticos (Sentinel-2, Landsat) captam apenas a luz solar na copa ressecada e registram a Caatinga dormente como biomassa morta. Já as micro-ondas ativas de banda L (24,2 cm) atravessam o dossel seco e penetram até 30 cm no solo. Como a água líquida tem permissividade dielétrica (ε ≈ 80) muito superior à dos minerais secos (ε ≈ 3,2), a mudança de fase do radar calcula a umidade volumétrica profunda (θ_v), revelando se as raízes pivotantes continuam hidratadas e viáveis."
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

                  <div className="grid grid-cols-2 gap-4 pt-2">
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

                  {/* Interactive Probe Depth Slider */}
                  <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-cyan-300 flex items-center space-x-1.5">
                        <Sliders className="h-3.5 w-3.5" />
                        <span>{t("Virtual Microwave Radar Depth Sounder:", "Sonda Virtual de Profundidade de Radar:")}</span>
                      </span>
                      <span className="font-mono font-bold text-white bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded">
                        {probeDepthCm} cm {t("Depth", "Profundidade")}
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="2"
                      max="30"
                      step="1"
                      value={probeDepthCm}
                      onChange={(e) => setProbeDepthCm(parseInt(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block">{t("Estimated ε at", "ε Estimado a")} {probeDepthCm} cm:</span>
                        <strong className="text-cyan-300 text-xs">
                          {(curr.dielectric * (1 + 0.012 * probeDepthCm)).toFixed(1)}
                        </strong>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block">{t("Volumetric θ_v:", "θ_v Volumétrico:")}</span>
                        <strong className="text-emerald-300 text-xs">
                          {Math.min(42, Math.max(3, Math.round(curr.moistureVolPct * (1 + 0.015 * probeDepthCm))))}%
                        </strong>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400 block">{t("2-Way Attenuation:", "Atenuação de Ida e Volta:")}</span>
                        <strong className="text-amber-300 text-xs">
                          -{(0.45 * probeDepthCm * (curr.dielectric / 8)).toFixed(1)} dB
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subsurface Depth Cross Section (Larger & Expansive) */}
                <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-slate-800 p-6 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 uppercase tracking-widest">
                    <span>{t("Soil Profile Penetration Profile", "Perfil de Penetração no Perfil de Solo")}</span>
                    <span className="text-[10px] text-slate-400">0 to 30 cm</span>
                  </div>

                  <div className="relative h-64 w-full border border-slate-700 rounded-xl overflow-hidden flex flex-col">
                    {/* Surface layer (0 - 5 cm) */}
                    <div className="h-16 bg-amber-900/40 border-b border-amber-600/30 flex items-center justify-between px-3 text-[10px] text-amber-200">
                      <div>
                        <span className="font-bold block">0–5 cm: {t("Surface Crust", "Crosta Superficial")}</span>
                        <span className="text-[9px] text-slate-300">{t("Optical & C-Band Limit", "Limite Óptico & Banda C")}</span>
                      </div>
                      <span className="font-mono">ε ≈ {curr.dielectric.toFixed(1)}</span>
                    </div>

                    {/* Root zone layer (5 - 30 cm) */}
                    <div 
                      className="flex-1 transition-all duration-700 flex flex-col items-center justify-center text-xs font-bold text-white relative"
                      style={{
                        background: `linear-gradient(to bottom, rgba(8, 145, 178, ${curr.dielectric / 25}), #050B14)`
                      }}
                    >
                      {/* Interactive Probe Line Marker */}
                      <div 
                        className="absolute left-0 right-0 border-t-2 border-dashed border-cyan-400 flex items-center justify-between px-3 transition-all duration-200 pointer-events-none"
                        style={{ top: `${(probeDepthCm / 30) * 100}%` }}
                      >
                        <span className="bg-cyan-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                          Sonda: {probeDepthCm} cm
                        </span>
                        <span className="text-[9px] text-cyan-300 font-mono bg-black/70 px-1 rounded">
                          L-Band Peak
                        </span>
                      </div>

                      <div className="text-center px-4 z-10">
                        <span className="text-cyan-400 block font-mono text-sm">NISAR L-Band Active Zone (λ = 24.2 cm)</span>
                        <span className="text-[10px] text-slate-300">{t("Probing Taproot Hydrology (Caatinga Roots)", "Sondando Hidrologia de Raízes da Caatinga")}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    {t(
                      "While Sentinel-2 sees dead gray brushwood, NISAR detects subsurface moisture reserves sustaining survival.",
                      "Enquanto o Sentinel-2 vê galhos cinzentos mortos, o NISAR detecta reservas hídricas profundas mantendo a sobrevivência."
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INSAR COHERENCE: RIGID VS DECORRELATED + INTERACTIVE DAM SELECTOR */}
          {activeTab === "insar" && (
            <div className="space-y-6">
              {/* Pedagogical Callout Banner */}
              <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/30 p-5 shadow-lg flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0 mt-0.5">
                  <Target className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>{t("🎯 What this tool measures & Radar Physics:", "🎯 Para que serve este gráfico & Física de Radar:")}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">DInSAR Interferometry</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      "DInSAR (Differential Interferometric Synthetic Aperture Radar) tracks millimeter-level crest settlement and rebound on earthen and rockfill dams. Dam rock armor and concrete spillways act as stationary radar reflectors that preserve microwave phase (γ > 0.85) across 12-day repeat satellite passes. By contrast, moving reservoir water decorrelates completely (γ < 0.15). Subtracting phase pairs (Δφ) isolates hydrostatic deformation without requiring cost-prohibitive physical ground geodetic sensors.",
                      "A Interferometria DInSAR monitora deslocamentos milimétricos de crista em barragens de terra e enrocamento. O enrocamento de pedras e o vertedouro de concreto atuam como refletores estacionários, preservando a fase do radar (γ > 0,85) entre passagens orbitais repetidas de 12 dias. Já o espelho d'água oscilante se descorrela por completo (γ < 0,15). A subtração de fase (Δφ) isola assentamentos e recargas hidrostáticas com precisão milimétrica, dispensando sensores físicos caros no solo."
                    )}
                  </p>
                </div>
              </div>
              
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

          {/* TAB 3: PAULI DOUBLE-BOUNCE & CORRELATED MANGROVE TIDAL FLOODING */}
          {activeTab === "polarimetry" && (
            <div className="space-y-6">
              {/* Pedagogical Callout Banner */}
              <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 via-slate-900 to-rose-950/30 p-5 shadow-lg flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0 mt-0.5">
                  <Target className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>{t("🎯 What this tool measures & Radar Physics:", "🎯 Para que serve este gráfico & Física de Radar:")}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">Pauli Red Channel (Pd)</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      "Pauli polarimetric decomposition unmasks hidden tidal inundations beneath dense mangrove canopies. Optical sensors see only green leaves (LAI > 3.5) and cannot detect floodwater below. At high tide, the flat water surface forms an orthogonal 90° corner reflector (diedro) with the vertical stilt roots of Rhizophora mangle. The resulting double reflection causes a 180° phase flip between HH and VV polarizations, concentrating radar backscatter into the Pauli Red channel (Pd = ½|HH - VV|²) with an extraordinary +8.4 dB power spike.",
                      "A decomposição polarimétrica de Pauli desmascara inundações de maré ocultas sob copas densas de manguezais. Câmeras ópticas enxergam apenas folhas verdes (IAF > 3,5) e não detectam a água no chão da floresta. Na maré cheia, a lâmina d'água plana forma um refletor de canto ortogonal de 90° (diedro) com as raízes escora verticais do mangue-vermelho (Rhizophora mangle). As duas reflexões sucessivas geram inversão de fase de 180° entre polarizações HH e VV, concentrando a energia no canal Vermelho de Pauli (Pd = ½|HH - VV|²) com um pico de +8,4 dB."
                    )}
                  </p>
                </div>
              </div>

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

                {/* Interactive Tidal Simulator Box (Larger & Expansive) */}
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

                    {/* Dynamic Diagram Representation (Larger h-36) */}
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
                          
                          {/* Visual Representation of Corner Reflector */}
                          <div className="h-36 w-full rounded-lg bg-gradient-to-b from-slate-900 via-rose-950/20 to-rose-950/40 border border-rose-500/30 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute top-2 left-4 text-[10px] font-mono text-cyan-300 flex items-center space-x-1">
                              <span>Radar Beam (λ = 24 cm)</span>
                              <span className="text-rose-400">↘</span>
                            </div>
                            <div className="absolute bottom-2 left-0 right-0 h-6 bg-cyan-500/30 border-t-2 border-cyan-400/80 flex items-center px-3">
                              <span className="text-[10px] font-mono text-cyan-200 font-bold">
                                {t("Specular Water Sheet (ε ≈ 80, Reflection R ≈ 0.85)", "Lâmina D'água Especular (ε ≈ 80, R ≈ 0,85)")}
                              </span>
                            </div>
                            <div className="absolute bottom-6 right-16 w-8 h-24 bg-amber-800/90 rounded-t border-l-2 border-rose-400 flex items-center justify-center shadow-lg">
                              <span className="text-[9px] font-mono text-white -rotate-90 whitespace-nowrap font-bold">Stilt Root / Tronco</span>
                            </div>
                            <div className="absolute bottom-7 right-24 text-rose-400 text-xs font-bold bg-black/60 px-1.5 py-0.5 rounded border border-rose-500/40">
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

                          {/* Visual Representation of Low Tide Mud */}
                          <div className="h-36 w-full rounded-lg bg-gradient-to-b from-slate-900 to-amber-950/30 border border-slate-700 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-400">
                              Radar Beam ↘ Diffuse Scatter
                            </div>
                            <div className="absolute bottom-2 left-0 right-0 h-6 bg-amber-950 border-t-2 border-amber-700 flex items-center px-3">
                              <span className="text-[10px] font-mono text-amber-300 font-bold">
                                {t("Rough Exposed Mudflat (No Specular Mirror)", "Lamaçais Rugosos Expostos (Sem Espelho)")}
                              </span>
                            </div>
                            <div className="absolute bottom-6 right-16 w-8 h-24 bg-amber-900/60 rounded-t flex items-center justify-center">
                              <span className="text-[9px] font-mono text-slate-400 -rotate-90 whitespace-nowrap">Stilt Root / Tronco</span>
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
                      <span className="text-white text-xs font-bold">{tidalState === "high" ? "52%" : "14%"}</span>
                      <span className="text-slate-400 block mt-0.5">{t("Double Bounce", "Reflexão Dupla")}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                      <span className="text-emerald-400 font-bold block">{t("Green Channel", "Canal Verde")}</span>
                      <span className="text-white text-xs font-bold">34%</span>
                      <span className="text-slate-400 block mt-0.5">{t("Canopy Volume", "Volume Copa")}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/30">
                      <span className="text-blue-400 font-bold block">{t("Blue Channel", "Canal Azul")}</span>
                      <span className="text-white text-xs font-bold">{tidalState === "high" ? "14%" : "52%"}</span>
                      <span className="text-slate-400 block mt-0.5">{t("Surface Mud", "Lama Difusa")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ESTUARINE HYDRODYNAMICS, FLOW REGIMES & BIOLOGICAL EFFLUENTS */}
          {activeTab === "estuary" && (
            <div className="space-y-6">
              {/* Pedagogical Callout Banner */}
              <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 p-5 shadow-lg flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0 mt-0.5">
                  <Target className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>{t("🎯 What this tool measures & Radar Physics:", "🎯 Para que serve este gráfico & Física de Radar:")}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Estuarine Advection-Dispersion</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {t(
                      "Correlates upstream reservoir storage releases with coastal salinity intrusion and shrimp aquaculture effluent residence time. When Castanhão gates close during droughts, river discharge drops to 0–5 m³/s, allowing ocean saltwater (35 PSU) to advance 32 km upstream to Jaguaruana. Estuarine residence time jumps from < 48 hours to > 35 days, trapping aquaculture pond effluents and triggering nocturnal hypoxia. Releasing programmed flood pulses flushes the entire estuary into the Atlantic, diluting organic waste by over 100-fold.",
                      "Correlaciona as descargas das barragens a montante com a intrusão salina costeira e o tempo de residência dos efluentes da carcinicultura. Quando as comportas do Castanhão fecham na seca, a vazão cai para 0–5 m³/s, permitindo que a água salgada oceânica (35 PSU) avance 32 km até Jaguaruana. O tempo de renovação estuarina sobe de < 48 horas para > 35 dias, aprisionando efluentes aquícolas e gerando hipóxia noturna. A liberação de pulsos de cheia lava o estuário inteiro no Atlântico, diluindo a carga orgânica em mais de 100 vezes."
                    )}
                  </p>
                </div>
              </div>
              
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

        {/* CLIMATE REALITY CROSS-VALIDATION MATRIX */}
        <div className="mt-12 rounded-3xl border border-slate-800 bg-[#070E1C] p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
            <div>
              <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>{t("Multisensor Cross-Validation Suite", "Matriz de Validação Cruzada Multi-Sensor")}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {t("SAR Radar Signals vs Modern Climate Drivers", "Sinais de Radar SAR vs Eventos Climáticos Reais")}
              </h3>
              <p className="mt-2 text-slate-300 text-sm max-w-3xl leading-relaxed">
                {t(
                  "Empirical cross-matching of active microwave backscatter signatures against documented historical climate extremes across Northeast Brazil.",
                  "Cruzamento empírico das assinaturas de retroespalhamento de micro-ondas contra eventos climáticos extremos documentados no Nordeste."
                )}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              {t("4 Historical Benchmarks", "4 Marcos Históricos")}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CLIMATE_CROSS_VALIDATION_MATRIX.map((entry, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
                      {entry.era}
                    </span>
                    <strong className="text-white text-sm">
                      {t(entry.driverEn, entry.driverPt)}
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {entry.band}
                  </span>
                </div>

                <div className="text-xs space-y-2">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                      {t("Physical Climate Reality:", "Realidade Física do Clima:")}
                    </span>
                    <p className="text-slate-200">{t(entry.groundRealityEn, entry.groundRealityPt)}</p>
                  </div>

                  <div className="bg-cyan-950/30 p-2.5 rounded-xl border border-cyan-500/30">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">
                      {t("SAR Radar Polarimetric Signature:", "Assinatura Polarimétrica de Radar:")}
                    </span>
                    <p className="text-cyan-100 font-mono text-[11px]">{t(entry.sarSignatureEn, entry.sarSignaturePt)}</p>
                  </div>

                  <div className="bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/30">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
                      {t("Actionable Governance Decision:", "Decisão Governamental Acionável:")}
                    </span>
                    <p className="text-emerald-200">{t(entry.governanceActionEn, entry.governanceActionPt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTEGRATED BIOMASS TELECONNECTION SECTION */}
        <BiomassCorrelationSection />

        {/* EQUATIONS MODAL / DRAWER */}
        {activeEquationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/40 bg-[#0B1528] p-6 lg:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                  <Calculator className="h-4 w-4" />
                  <span>{t("Radar Physics & Analytical Formulations", "Física de Radar & Formulações Analíticas")}</span>
                </div>
                <button
                  onClick={() => setActiveEquationModal(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {activeEquationModal === "topp" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <h3 className="text-lg font-bold text-white">
                    {t("Topp's Universal Empirical Dielectric Equation", "Equação Empírica Universal de Topp (Permissividade)")}
                  </h3>
                  <div className="rounded-2xl border border-cyan-500/40 bg-slate-950 p-4 font-mono text-center text-cyan-300 text-sm overflow-x-auto">
                    θ_v = -0.053 + 0.0292·ε - 5.5×10⁻⁴·ε² + 4.3×10⁻⁶·ε³
                  </div>
                  <p>
                    {t(
                      "Topp's equation (1980) defines the mathematical relation between real relative dielectric permittivity (ε) and volumetric soil water content (θ_v, cm³/cm³). While dry mineral soil has ε ≈ 3.0 to 4.0, free water exhibits ε ≈ 80 at radar frequencies. In NISAR L-band (1.25 GHz), radiation penetrates 10–30 cm into dry semi-arid Caatinga crusts, directly measuring sub-surface moisture unavailable to optical sensors.",
                      "A equação de Topp (1980) estabelece a relação polinomial entre a permissividade dielétrica relativa real (ε) e o teor volumétrico de água no solo (θ_v). Enquanto o solo seco mineral tem ε ≈ 3,0 a 4,0, a água livre pura possui ε ≈ 80. Na banda L do NISAR (1,25 GHz), as micro-ondas penetram de 10 a 30 cm no solo ressecado da Caatinga, revelando umidade radicular oculta para sensores ópticos."
                    )}
                  </p>
                </div>
              )}

              {activeEquationModal === "dinsar" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <h3 className="text-lg font-bold text-white">
                    {t("DInSAR Differential Interferometric Phase Decomposition", "Fase Diferencial Interferométrica DInSAR")}
                  </h3>
                  <div className="rounded-2xl border border-emerald-500/40 bg-slate-950 p-4 font-mono text-center text-emerald-300 text-sm overflow-x-auto">
                    Δφ = φ_def + φ_topo + φ_atm + φ_noise
                    <br />
                    Δd = (λ / 4π) · φ_def
                  </div>
                  <p>
                    {t(
                      "Differential Synthetic Aperture Radar Interferometry (DInSAR) measures millimeter-scale displacement (Δd) along the satellite line-of-sight (LOS). By calculating the phase difference between two repeat passes separated by orbital wavelength (λ = 5.6 cm for C-band, λ = 24 cm for L-band), topography and atmospheric delay are removed to isolate embankment settlement under hydrostatic reservoir fluctuations.",
                      "A Interferometria Diferencial de Radar (DInSAR) mede deformações milimétricas (Δd) na linha de visada do satélite (LOS). A diferença de fase entre duas passagens orbitais separadas pelo comprimento de onda (λ = 5,6 cm na banda C; 24 cm na banda L) permite remover relevo e perturbações atmosféricas para isolar assentamentos na crista da barragem sob ciclos de carga e seca."
                    )}
                  </p>
                </div>
              )}

              {activeEquationModal === "pauli" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <h3 className="text-lg font-bold text-white">
                    {t("Pauli Polarimetric Target Vector Decomposition", "Decomposição Polarimétrica do Vetor de Pauli")}
                  </h3>
                  <div className="rounded-2xl border border-rose-500/40 bg-slate-950 p-4 font-mono text-center text-rose-300 text-xs overflow-x-auto">
                    k_Pauli = (1/√2) · [ (S_HH + S_VV),  (S_HH - S_VV),  2·S_HV ]ᵀ
                    <br />
                    Red (Double Bounce): P_d = ½ |S_HH - S_VV|²
                    <br />
                    Green (Volume): P_v = 2 |S_HV|²
                    <br />
                    Blue (Surface): P_s = ½ |S_HH + S_VV|²
                  </div>
                  <p>
                    {t(
                      "Pauli decomposition separates polarimetric scattering mechanisms into physical canonical targets. The Red channel (|HH-VV|²) highlights dihedral double-bounce reflections between flooded tidal water and vertical mangrove trunks (Rhizophora mangle). The Green channel (HV) isolates random dipole volume scattering in dense tree branches, while Blue (|HH+VV|²) highlights flat single-bounce surface reflections from bare soil and salt flats.",
                      "A decomposição de Pauli decompõe a matriz de espalhamento em três mecanismos canônicos. O canal Vermelho (|HH-VV|²) destaca a reflexão diédrica dupla entre o espelho d'água de maré e os troncos verticais dos manguezais (Rhizophora mangle). O canal Verde (HV) isola o espalhamento volumétrico em copas arbóreas, enquanto o Azul (|HH+VV|²) mapeia reflexão de superfície simples em solos expostos e apicuns."
                    )}
                  </p>
                </div>
              )}

              {activeEquationModal === "salinity" && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                  <h3 className="text-lg font-bold text-white">
                    {t("Estuarine Salinity Intrusion & Longitudinal Dispersion", "Intrusão Salina Estuarina & Dispersão Longitudinal")}
                  </h3>
                  <div className="rounded-2xl border border-amber-500/40 bg-slate-950 p-4 font-mono text-center text-amber-300 text-sm overflow-x-auto">
                    S(x) = S_ocean · exp( - (u · x) / K_x )
                    <br />
                    L_wedge = (K_x / u) · ln(S_ocean / S_fresh)
                  </div>
                  <p>
                    {t(
                      "The stationary one-dimensional estuarine advection-dispersion model correlates river discharge velocity (u) with salinity intrusion length (L_wedge). When upstream reservoir gates are closed during drought (u → 0), marine tidal dispersion dominates, pushing ocean salinity (35 PSU) 32 km inland and suffocating freshwater mangrove fringes.",
                      "O modelo unidimensional estacionário de advecção-dispersão estuarina correlaciona a velocidade da vazão fluvial (u) com o comprimento da cunha salina (L_wedge). Quando as comportas do Castanhão fecham na seca (u → 0), a dispersão de maré empurra a água salgada oceânica (35 PSU) 32 km rio acima, estressando raízes de mangue e salinizando poços aluviais."
                    )}
                  </p>
                </div>
              )}

              <button
                onClick={() => setActiveEquationModal(null)}
                className="w-full mt-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 text-xs transition-colors"
              >
                {t("Close Formulation Inspector", "Fechar Formulação")}
              </button>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
