"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Play, 
  Pause, 
  Layers, 
  Waves, 
  TreePine, 
  Droplet, 
  Activity, 
  Eye, 
  Compass, 
  Calendar,
  Maximize2,
  Minimize2,
  X,
  TrendingDown,
  TrendingUp,
  Info,
  ShieldCheck,
  ChevronRight,
  Radio,
  AlertTriangle,
  Mountain,
  Home,
  Fish
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

export interface HistoricalMilestone {
  year: number;
  label: string;
  castanhaoStoragePct: number;
  castanhaoAreaKm2: number;
  caatingaBiomassIndex: number; // 0 to 100
  soilDielectricEpsilon: number; // 3 (bone dry) to 25 (saturated)
  aquaculturePondAreaHa: number;
  estuarineBiologicalLoad: "Low" | "Moderate" | "Critical" | "Elevated";
  salinityIntrusionKm: number;
  climateContextEn: string;
  climateContextPt: string;
}

// 15 Historical Milestones spanning 1985 to 2026
export const HISTORICAL_TIMELINE: HistoricalMilestone[] = [
  {
    year: 1985,
    label: "1985 - Pre-Dam Natural Regime",
    castanhaoStoragePct: 88,
    castanhaoAreaKm2: 310,
    caatingaBiomassIndex: 92,
    soilDielectricEpsilon: 15.4,
    aquaculturePondAreaHa: 120,
    estuarineBiologicalLoad: "Low",
    salinityIntrusionKm: 4.5,
    climateContextEn: "Pre-dam baseline: Natural seasonal flooding. Minimal estuarine biological load.",
    climateContextPt: "Marco zero pré-barramento: Pulso natural de cheias. Carga biológica mínima na foz."
  },
  {
    year: 1990,
    label: "1990 - Early Carciniculture Exploration",
    castanhaoStoragePct: 84,
    castanhaoAreaKm2: 295,
    caatingaBiomassIndex: 90,
    soilDielectricEpsilon: 14.8,
    aquaculturePondAreaHa: 280,
    estuarineBiologicalLoad: "Low",
    salinityIntrusionKm: 5.2,
    climateContextEn: "Initial artisanal pond conversions along apicum hypersaline flats in Aracati.",
    climateContextPt: "Início da conversão artesanal de apicuns hipersalinos em tanques de carcinicultura."
  },
  {
    year: 1995,
    label: "1995 - Mid-Decade Wet Pulse",
    castanhaoStoragePct: 89,
    castanhaoAreaKm2: 315,
    caatingaBiomassIndex: 94,
    soilDielectricEpsilon: 16.2,
    aquaculturePondAreaHa: 480,
    estuarineBiologicalLoad: "Low",
    salinityIntrusionKm: 4.0,
    climateContextEn: "High rainfall pulses flushed the Jaguaribe basin with heavy sediment transport.",
    climateContextPt: "Pulsos de cheia lavaram a bacia com intenso transporte de sedimentos."
  },
  {
    year: 2000,
    label: "2000 - Castanhão Construction Phase",
    castanhaoStoragePct: 74,
    castanhaoAreaKm2: 270,
    caatingaBiomassIndex: 86,
    soilDielectricEpsilon: 12.1,
    aquaculturePondAreaHa: 890,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 8.5,
    climateContextEn: "Construction of Latin America's largest earthen dam alters regional hydrology.",
    climateContextPt: "Obras do maior açude de terra da América Latina iniciam alteração do fluxo fluvial."
  },
  {
    year: 2004,
    label: "2004 - Reservoir Filling & Historic Inundation",
    castanhaoStoragePct: 100,
    castanhaoAreaKm2: 325,
    caatingaBiomassIndex: 95,
    soilDielectricEpsilon: 21.0,
    aquaculturePondAreaHa: 1350,
    estuarineBiologicalLoad: "Low",
    salinityIntrusionKm: 3.5,
    climateContextEn: "Castanhão reaches 100% spillway capacity. Immense freshwater discharge to the sea.",
    climateContextPt: "Castanhão atinge 100% de sangria. Grande aporte de água doce no estuário."
  },
  {
    year: 2008,
    label: "2008 - Second Spillway Discharge Pulse",
    castanhaoStoragePct: 100,
    castanhaoAreaKm2: 325,
    caatingaBiomassIndex: 92,
    soilDielectricEpsilon: 19.5,
    aquaculturePondAreaHa: 1850,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 3.8,
    climateContextEn: "Consecutive surplus wet years ensure abundant water across both Sertão and coast.",
    climateContextPt: "Anos consecutivos de chuvas fartas garantem água no sertão e no litoral."
  },
  {
    year: 2012,
    label: "2012 - Megadrought Onset (Historic 6-Year Dry)",
    castanhaoStoragePct: 58,
    castanhaoAreaKm2: 220,
    caatingaBiomassIndex: 68,
    soilDielectricEpsilon: 8.4,
    aquaculturePondAreaHa: 2300,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 14.5,
    climateContextEn: "Start of the harshest multi-year drought in modern recorded Brazilian history.",
    climateContextPt: "Início da pior megaseca plurianual documentada na história moderna do Brasil."
  },
  {
    year: 2014,
    label: "2014 - Deepening Drought & Flow Curtailment",
    castanhaoStoragePct: 32,
    castanhaoAreaKm2: 140,
    caatingaBiomassIndex: 52,
    soilDielectricEpsilon: 5.6,
    aquaculturePondAreaHa: 2750,
    estuarineBiologicalLoad: "Elevated",
    salinityIntrusionKm: 22.0,
    climateContextEn: "Gates restricted to safeguard Fortaleza urban intake. Downstream river goes dry.",
    climateContextPt: "Comportas fechadas para resguardar Fortaleza. Calha a jusante seca por meses."
  },
  {
    year: 2016,
    label: "2016 - Drought Apex: Castanhão at 5.2%",
    castanhaoStoragePct: 5.2,
    castanhaoAreaKm2: 38,
    caatingaBiomassIndex: 34,
    soilDielectricEpsilon: 3.2,
    aquaculturePondAreaHa: 3100,
    estuarineBiologicalLoad: "Critical",
    salinityIntrusionKm: 32.0,
    climateContextEn: "Catastrophic low: 5.2% storage. Salinity wedge reaches 32 km inland to Jaguaruana.",
    climateContextPt: "Mínimo histórico: 5,2% de volume. Cunha salina avança 32 km até Jaguaruana."
  },
  {
    year: 2018,
    label: "2018 - Gradual Easing & Dead Volume Defense",
    castanhaoStoragePct: 9.8,
    castanhaoAreaKm2: 55,
    caatingaBiomassIndex: 45,
    soilDielectricEpsilon: 4.8,
    aquaculturePondAreaHa: 3280,
    estuarineBiologicalLoad: "Elevated",
    salinityIntrusionKm: 26.5,
    climateContextEn: "Pumping from dead volume. Soil dielectric levels remain severely depleted.",
    climateContextPt: "Bombeamento do volume morto. Permissividade dielétrica do solo segue exaurida."
  },
  {
    year: 2020,
    label: "2020 - Modest Recharge & Pandemic Demand",
    castanhaoStoragePct: 18.5,
    castanhaoAreaKm2: 88,
    caatingaBiomassIndex: 58,
    soilDielectricEpsilon: 7.2,
    aquaculturePondAreaHa: 3420,
    estuarineBiologicalLoad: "Elevated",
    salinityIntrusionKm: 21.0,
    climateContextEn: "Partial recharge stabilizes urban reserves but ecological river discharge remains muted.",
    climateContextPt: "Recarga modesta estabiliza consumo urbano, mas vazão ecológica segue mínima."
  },
  {
    year: 2022,
    label: "2022 - Transposition Waters Arrive (PISF)",
    castanhaoStoragePct: 24.0,
    castanhaoAreaKm2: 120,
    caatingaBiomassIndex: 65,
    soilDielectricEpsilon: 9.6,
    aquaculturePondAreaHa: 3550,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 16.0,
    climateContextEn: "Integration with São Francisco River (PISF) water transfers bolsters basin security.",
    climateContextPt: "Chegada das águas da Transposição do São Francisco (PISF) alivia a bacia."
  },
  {
    year: 2024,
    label: "2024 - Recovery & Modern NISAR Baseline",
    castanhaoStoragePct: 32.4,
    castanhaoAreaKm2: 165,
    caatingaBiomassIndex: 76,
    soilDielectricEpsilon: 11.8,
    aquaculturePondAreaHa: 3640,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 12.5,
    climateContextEn: "Consistent rains recharge storage to 32%. Active NISAR monitoring operationalized.",
    climateContextPt: "Chuvas consistentes elevam açude a 32%. Monitoramento operacional NISAR ativo."
  },
  {
    year: 2026,
    label: "2026 - Present Day: NISAR Dual-Band Era",
    castanhaoStoragePct: 34.2,
    castanhaoAreaKm2: 178,
    caatingaBiomassIndex: 79,
    soilDielectricEpsilon: 12.4,
    aquaculturePondAreaHa: 3720,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 11.0,
    climateContextEn: "Continuous 12-day NISAR L+S orbit cycle tracks root moisture and estuarine dynamics.",
    climateContextPt: "Ciclo orbital de 12 dias do NISAR L+S rastreia umidade radicular e estuário."
  }
];

// 12 GENUINE SENTINEL-1 RTC GRANULES COVERING 100% OF CEARÁ
const CEARA_S1_RTC_GRANULES = [
  // Pass 1: East Ceará (Track 082) - Coast to South
  "S1A_IW_GRDH_1SDV_20231129T080854_20231129T080923_051429_0634EA_rtc",
  "S1A_IW_GRDH_1SDV_20231129T080923_20231129T080948_051429_0634EA_rtc",
  "S1A_IW_GRDH_1SDV_20231129T080948_20231129T081013_051429_0634EA_rtc",
  "S1A_IW_GRDH_1SDV_20231129T081013_20231129T081038_051429_0634EA_rtc",

  // Pass 2: Central Ceará (Track 010) - Sobral to Inhamuns
  "S1A_IW_GRDH_1SDV_20231122T081735_20231122T081800_051327_06316D_rtc",
  "S1A_IW_GRDH_1SDV_20231122T081800_20231122T081825_051327_06316D_rtc",
  "S1A_IW_GRDH_1SDV_20231122T081825_20231122T081850_051327_06316D_rtc",
  "S1A_IW_GRDH_1SDV_20231122T081850_20231122T081915_051327_06316D_rtc",

  // Pass 3: West Ceará (Track 155) - Camocim to Ibiapaba & Crateús
  "S1A_IW_GRDH_1SDV_20231127T082535_20231127T082604_051400_0633E3_rtc",
  "S1A_IW_GRDH_1SDV_20231127T082604_20231127T082629_051400_0633E3_rtc",
  "S1A_IW_GRDH_1SDV_20231127T082629_20231127T082654_051400_0633E3_rtc",
  "S1A_IW_GRDH_1SDV_20231127T082654_20231127T082719_051400_0633E3_rtc"
];

// APPROXIMATED WATER CONCENTRATION & ALLUVIAL MOISTURE POINTS (Replacing crude blue box)
interface WaterConcentrationPoint {
  id: string;
  name: string;
  category: "mega_reservoir" | "alluvial_corridor" | "groundwater_karst" | "estuarine_wetland";
  coords: [number, number];
  radiusMeters: number;
  epsilonBase: number;
  depthCm: string;
  volumeOrCapacity: string;
  descEn: string;
  descPt: string;
}

const WATER_CONCENTRATION_POINTS: WaterConcentrationPoint[] = [
  // 1. Perennial Reservoirs (Lâmina Hídrica & Sedimentos Saturados)
  {
    id: "castanhao",
    name: "Açude Castanhão (Alto Santo / Jaguaribara)",
    category: "mega_reservoir",
    coords: [-5.50, -38.45],
    radiusMeters: 16000,
    epsilonBase: 26.5,
    depthCm: "0–30 cm (Interface água-sedimento)",
    volumeOrCapacity: "6.700.000.000 m³ (Capacidade máxima)",
    descEn: "Latin America's largest earthen reservoir. Open water produces specular dropout; high dielectric permittivity (ε ≈ 26.5) saturates perimeter lacustrine alluvium.",
    descPt: "Maior reservatório de terra da América Latina. O espelho d'água reflete o radar para longe; a alta permissividade dielétrica (ε ≈ 26,5) satura o aluvião lacustre perimetral."
  },
  {
    id: "oros",
    name: "Açude Orós (Médio Jaguaribe)",
    category: "mega_reservoir",
    coords: [-6.10, -38.92],
    radiusMeters: 11000,
    epsilonBase: 25.0,
    depthCm: "0–30 cm",
    volumeOrCapacity: "1.940.000.000 m³",
    descEn: "Second largest reservoir in Ceará, key hydrological buffer between Upper and Middle Jaguaribe.",
    descPt: "Segundo maior açude do Ceará, regulador estratégico entre o Alto e o Médio Jaguaribe."
  },
  {
    id: "banabuiu",
    name: "Açude Banabuiú (Bacia do Banabuiú)",
    category: "mega_reservoir",
    coords: [-5.32, -38.92],
    radiusMeters: 8500,
    epsilonBase: 22.4,
    depthCm: "0–25 cm",
    volumeOrCapacity: "1.600.000.000 m³",
    descEn: "Third largest reservoir in Ceará. Crucial tributary water storage for Sertão Central.",
    descPt: "Terceiro maior açude cearense. Reservatório chave no Sertão Central."
  },
  {
    id: "arneiroz",
    name: "Açude Arneiroz II (Alto Jaguaribe)",
    category: "mega_reservoir",
    coords: [-6.32, -40.16],
    radiusMeters: 6000,
    epsilonBase: 20.5,
    depthCm: "0–25 cm",
    volumeOrCapacity: "197.000.000 m³",
    descEn: "Upper Jaguaribe headwater regulatory reservoir in the Inhamuns semi-arid zone.",
    descPt: "Açude de cabeceira do Alto Jaguaribe nos Inhamuns, retém vazões torrenciais."
  },
  {
    id: "trussu",
    name: "Açude Roberto Costa / Trussu (Iguatu)",
    category: "mega_reservoir",
    coords: [-6.28, -39.38],
    radiusMeters: 6500,
    epsilonBase: 21.0,
    depthCm: "0–25 cm",
    volumeOrCapacity: "300.000.000 m³",
    descEn: "Perennial tributary storage feeding the fertile Iguatu floodplain and Rio Salgado confluence.",
    descPt: "Armazenamento perene que irriga a várzea fértil de Iguatu e deságua no Salgado."
  },
  {
    id: "lima_campos",
    name: "Açude Lima Campos (Icó)",
    category: "mega_reservoir",
    coords: [-6.40, -38.95],
    radiusMeters: 5000,
    epsilonBase: 19.8,
    depthCm: "0–20 cm",
    volumeOrCapacity: "66.300.000 m³",
    descEn: "Historic irrigation reservoir supporting ancient riparian fruit orchards along Rio Salgado.",
    descPt: "Açude histórico que sustenta os perímetros irrigados tradicionais de Icó."
  },
  {
    id: "araras",
    name: "Açude Araras / Paulo Sarasate (Noroeste)",
    category: "mega_reservoir",
    coords: [-4.23, -40.67],
    radiusMeters: 9000,
    epsilonBase: 23.5,
    depthCm: "0–30 cm",
    volumeOrCapacity: "1.000.000.000 m³",
    descEn: "Fourth largest reservoir in Ceará, controlling the Rio Acaraú basin in the northwest.",
    descPt: "Quarto maior açude do estado, regulador central da Bacia do Acaraú no noroeste."
  },

  // 2. Alluvial Riparian Aquifers (Aquíferos Aluvionares Subterrâneos)
  {
    id: "alluvium_alto",
    name: "Aquífero Aluvionar do Alto Jaguaribe (Tauá - Arneiroz)",
    category: "alluvial_corridor",
    coords: [-6.05, -40.22],
    radiusMeters: 14000,
    epsilonBase: 16.5,
    depthCm: "15–30 cm (Sondagem Banda L)",
    volumeOrCapacity: "Reserva Aluvionar Subsuperficial",
    descEn: "Coarse fluvial sand deposits store shallow subsurface groundwater even when surface riverbed runs completely dry. NISAR L-band detects root-zone moisture through sandy overburden.",
    descPt: "Depósitos arenosos fluviais armazenam água subsuperficial mesmo quando a superfície do rio seca. O SAR de Banda L penetra a areia seca e detecta a umidade retida nas raízes."
  },
  {
    id: "alluvium_medio",
    name: "Várzea Aluvial do Médio Jaguaribe (Icó - Jaguaribe)",
    category: "alluvial_corridor",
    coords: [-5.95, -38.65],
    radiusMeters: 16000,
    epsilonBase: 18.0,
    depthCm: "15–30 cm",
    volumeOrCapacity: "Várzea Fértil de Alta Retenção",
    descEn: "Broad floodway with organic silt and sand layers. Crucial natural water filtration zone sustaining agriculture.",
    descPt: "Calha larga de inundação com silte e areia. Zona de amortecimento e filtro natural que mantém a umidade no solo."
  },
  {
    id: "alluvium_salgado",
    name: "Corredor Aluvionar do Rio Salgado (Cariri - Icó)",
    category: "alluvial_corridor",
    coords: [-6.65, -38.98],
    radiusMeters: 15000,
    epsilonBase: 19.2,
    depthCm: "15–30 cm",
    volumeOrCapacity: "Fluxo Perenizado do Cariri",
    descEn: "Main perennial tributary of the Jaguaribe, channeling groundwater drainage from the Chapada do Araripe.",
    descPt: "Principal afluente perene do Jaguaribe, drenando águas subterrâneas da Chapada do Araripe."
  },
  {
    id: "alluvium_baixo",
    name: "Planície Aluvial do Baixo Jaguaribe (Limoeiro - Russas)",
    category: "alluvial_corridor",
    coords: [-5.02, -38.00],
    radiusMeters: 18000,
    epsilonBase: 20.0,
    depthCm: "10–30 cm",
    volumeOrCapacity: "Polo de Irrigação & Aquífero Livre",
    descEn: "Deep sediment floodplain supporting dense banana, melon, and fruit agriculture through sub-irrigation.",
    descPt: "Planície profunda de sedimentos que sustenta a fruticultura irrigada por lençol freático acessível."
  },

  // 3. Groundwater Infiltration & Karst / Sandstone Aquifers
  {
    id: "karst_apodi",
    name: "Aquífero Cárstico da Chapada do Apodi (Quixeré / Potiguar)",
    category: "groundwater_karst",
    coords: [-5.18, -37.75],
    radiusMeters: 12000,
    epsilonBase: 16.8,
    depthCm: "20–30 cm (Fraturas cársticas)",
    volumeOrCapacity: "Reserva Carbonática Transfronteiriça",
    descEn: "Permeable limestone and sandstone karst with high secondary porosity, forming a vital drought refuge aquifer.",
    descPt: "Calcários e arenitos com alta porosidade cárstica, constituindo aquífero estratégico de reserva contra a seca."
  },
  {
    id: "sandstone_araripe",
    name: "Bacia Sedimentar do Araripe (Juazeiro do Norte / Crato)",
    category: "groundwater_karst",
    coords: [-7.22, -39.35],
    radiusMeters: 17000,
    epsilonBase: 19.5,
    depthCm: "15–30 cm",
    volumeOrCapacity: "Aquíferos Exú e Missão Velha",
    descEn: "Abundant perennial spring water recharge emerging from Cretaceous sandstone escarpments.",
    descPt: "Recarga perene abundante que brota nas encostas de arenito da Bacia do Araripe, alimentando o Salgado."
  },

  // 4. Estuarine & Coastal Wetlands
  {
    id: "estuary_aracati",
    name: "Complexo Estuarino de Aracati / Fortim (Manguezais)",
    category: "estuarine_wetland",
    coords: [-4.42, -37.76],
    radiusMeters: 12000,
    epsilonBase: 28.0,
    depthCm: "0–30 cm (Saturação hipersalina mareal)",
    volumeOrCapacity: "Estuário Aberto & 3.700 ha de Viveiros",
    descEn: "Tidal mangrove sump and 3,700 ha of shrimp ponds. Permanent saturated conditions yield highest dielectric return (ε > 26).",
    descPt: "Complexo de manguezais e 3.700 ha de viveiros de camarão. Saturação hídrica permanente produz máxima constante dielétrica (ε > 26)."
  }
];

// ECOLOGICAL PROBLEMATIZATION & MITIGATION MARKERS
interface EcologicalMarker {
  id: string;
  category: "erosion" | "siltation" | "settlement" | "aquaculture";
  coords: [number, number];
  titleEn: string;
  titlePt: string;
  color: string;
  problemEn: string;
  problemPt: string;
  mitigationEn: string;
  mitigationPt: string;
}

const ECOLOGICAL_MARKERS: EcologicalMarker[] = [
  {
    id: "erosion_saboeiro",
    category: "erosion",
    coords: [-6.54, -39.90],
    titleEn: "Riverbank Landslides & Gully Erosion (Saboeiro)",
    titlePt: "Desmoronamento de Barrancos & Voçorocas (Saboeiro)",
    color: "#F59E0B",
    problemEn: "Severe bank failure and collapse (desbarrancamento) along deforested river margins during flash flood whiplash.",
    problemPt: "Desmoronamento em massa de barrancos fluviais e avanço de voçorocas por desmatamento ciliar e pisoteio de gado.",
    mitigationEn: "Riparian bioengineering using crib walls, stone riprap, vetiver grass, and native tree reforestation (Juazeiro, Aroeira).",
    mitigationPt: "Bioengenharia de taludes com enrocamento de pedra, paliçadas vivas e reflorestamento com Juazeiro e Aroeira."
  },
  {
    id: "siltation_jaguaribara",
    category: "siltation",
    coords: [-5.58, -38.58],
    titleEn: "Riverbed Siltation at Castanhão Delta (Jaguaribara)",
    titlePt: "Assoreamento da Calha na Entrada do Castanhão",
    color: "#FB923C",
    problemEn: "Massive accumulation of eroded sand choked the riverbed, forming extensive emergent sandbars and reducing reservoir storage.",
    problemPt: "Sedimentos carreados da bacia alta acumulam-se no delta do açude, criando bancos de areia e reduzindo o volume útil.",
    mitigationEn: "Upstream check-dams to trap coarse sand; contour plowing; surgical hydraulic dredging of critical bottlenecks.",
    mitigationPt: "Bacias e barragens sucessivas de retenção de sedimentos; terraceamento agrícola em curvas de nível; dragagem seletiva."
  },
  {
    id: "settlements_iguatu",
    category: "settlement",
    coords: [-6.36, -39.30],
    titleEn: "Vulnerable Riparian Settlements (Iguatu Floodway)",
    titlePt: "Moradias em Várzeas Vulneráveis a Inundação (Iguatu)",
    color: "#F43F5E",
    problemEn: "Informal urban occupation expanded into dry floodways during droughts, facing severe flooding during extreme wet pulses.",
    problemPt: "Moradias avançaram sobre o leito seco durante estiagens, sofrendo inundações severas e desalojamentos nas cheias.",
    mitigationEn: "SAR-based binding floodway hazard zoning; planned resettlement to safe elevated terrain; real-time early warning telemetry sirens.",
    mitigationPt: "Zoneamento de risco hidrológico por satélite SAR; reassentamento habitacional planejado; sirenes integradas à FUNCEME."
  },
  {
    id: "aquaculture_aracati",
    category: "aquaculture",
    coords: [-4.44, -37.78],
    titleEn: "Carciniculture & Estuarine Flushing (Aracati / Fortim)",
    titlePt: "Carcinicultura & Descargas Ecológicas (Aracati)",
    color: "#06B6D4",
    problemEn: "Over 3,700 ha of shrimp ponds discharge nutrient-rich effluents into stagnant tidal creeks when upstream dams cut river flow.",
    problemPt: "Mais de 3.700 ha de viveiros de camarão concentram efluentes orgânicos quando o Castanhão fecha as comportas na estiagem.",
    mitigationEn: "Synchronized ecological freshwater flushing pulses from Castanhão timed with spring ebb tides; RAS settling basins and mangrove biofilters.",
    mitigationPt: "Vazões ecológicas de lavagem sincronizadas do Castanhão em marés de sizígia; bacias de decantação e filtros de manguezal."
  }
];

type MetricType = "storage" | "biomass" | "dielectric" | "salinity";

interface InteractiveBasinMapProps {
  externalSelectedYear?: number;
  onYearChange?: (year: number) => void;
}

export default function InteractiveBasinMap({ externalSelectedYear, onYearChange }: InteractiveBasinMapProps) {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<{ [key: string]: any }>({});

  // Timeline State
  const [selectedYearIdx, setSelectedYearIdx] = useState<number>(HISTORICAL_TIMELINE.length - 1); // Default to 2026
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Map Layer Modes
  const [baseMapStyle, setBaseMapStyle] = useState<"dark" | "satellite" | "osm">("satellite");
  const [sarOverlayMode, setSarOverlayMode] = useState<"none" | "sentinel1_rtc" | "dielectric_heatmap">("sentinel1_rtc");
  const [showEcologicalRisks, setShowEcologicalRisks] = useState<boolean>(true);

  // Off-Canvas Sidebar State
  const [activeMetricDrawer, setActiveMetricDrawer] = useState<MetricType | null>(null);

  const currentMilestone = HISTORICAL_TIMELINE[selectedYearIdx];

  // Sync with external year prop from HistoricalSlideDeck
  useEffect(() => {
    if (externalSelectedYear !== undefined) {
      const idx = HISTORICAL_TIMELINE.findIndex(m => m.year === externalSelectedYear);
      if (idx !== -1 && idx !== selectedYearIdx) {
        setSelectedYearIdx(idx);
      }
    }
  }, [externalSelectedYear]);

  // Notify parent of year change
  const handleYearChange = (idx: number) => {
    setSelectedYearIdx(idx);
    if (onYearChange) {
      onYearChange(HISTORICAL_TIMELINE[idx].year);
    }
  };

  // Auto-play animation loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedYearIdx((prev) => {
          const nextIdx = (prev + 1) % HISTORICAL_TIMELINE.length;
          if (onYearChange) {
            onYearChange(HISTORICAL_TIMELINE[nextIdx].year);
          }
          return nextIdx;
        });
      }, 2200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onYearChange]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;
      if (!isMounted || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Center of Ceará's Jaguaribe Basin
      const map = L.map(mapContainerRef.current, {
        center: [-5.35, -38.90],
        zoom: 7,
        minZoom: 6,
        maxZoom: 15,
        zoomControl: false
      });
      mapInstanceRef.current = map;

      L.control.zoom({ position: "topright" }).addTo(map);

      // BASE TILE PROVIDERS
      const darkTile = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Esri Dark Canvas" }
      );
      const satelliteTile = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Tiles &copy; Esri World Imagery" }
      );
      const osmTile = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "&copy; OpenStreetMap contributors" }
      );

      layersRef.current.dark = darkTile;
      layersRef.current.satellite = satelliteTile;
      layersRef.current.osm = osmTile;

      if (baseMapStyle === "satellite") satelliteTile.addTo(map);
      else if (baseMapStyle === "osm") osmTile.addTo(map);
      else darkTile.addTo(map);

      // PRELOAD ALL 12 GENUINE SENTINEL-1 RTC RADAR SWATHS (Covering 100% of Ceará)
      const s1Layers = CEARA_S1_RTC_GRANULES.map((granule) => {
        return L.tileLayer(
          `https://planetarycomputer.microsoft.com/api/data/v1/item/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?collection=sentinel-1-rtc&item=${granule}&assets=vv&assets=vh&tile_format=png&expression=0.03%20%2B%20log%20(10e-4%20-%20log%20(0.05%20%2F%20(0.02%20%2B%202%20*%20vv)));0.05%20%2B%20exp%20(0.25%20*%20(log%20(0.01%20%2B%202%20*%20vv)%20%2B%20log%20(0.02%20%2B%205%20*%20vh)));1%20-%20log%20(0.05%20%2F%20(0.045%20-%200.9%20*%20vv))&asset_as_band=True&rescale=0,.8000&rescale=0,1.000&rescale=0,1.000&format=png`,
          {
            opacity: 0.85,
            maxZoom: 15,
            attribution: "Copernicus Sentinel-1 RTC Radar Mosaic (ESA / NASA ASF)"
          }
        );
      });
      const sarMosaicGroup = L.layerGroup(s1Layers);
      layersRef.current.sarMosaicGroup = sarMosaicGroup;

      // Add SAR layer immediately on mount so it is preloaded and ready
      if (sarOverlayMode === "sentinel1_rtc") {
        sarMosaicGroup.addTo(map);
        layersRef.current.activeSar = sarMosaicGroup;
      }

      // REAL GENUINE RIO JAGUARIBE HYDROGRAPHY (3,250 vertices from official GeoJSON)
      try {
        const resp = await fetch("/data/rio_jaguaribe_geojson.json");
        if (resp.ok) {
          const geoData = await resp.json();
          const riverLayer = L.geoJSON(geoData, {
            style: {
              color: "#00E5FF",
              weight: 3.5,
              opacity: 0.95,
              lineCap: "round",
              lineJoin: "round"
            },
            onEachFeature: (feature, layer) => {
              layer.bindPopup(`
                <div class="p-2 font-sans text-xs">
                  <strong class="text-cyan-400 font-bold text-sm block">Rio Jaguaribe (Traçado Oficial Cartográfico)</strong>
                  <p class="text-slate-300 mt-1">Extensão de 610 km com 3.250 vértices digitalizados. Conecta as nascentes pedregosas dos Inhamuns à foz estuarina em Aracati.</p>
                </div>
              `);
            }
          }).addTo(map);
          layersRef.current.river = riverLayer;
        }
      } catch (err) {
        console.warn("Could not load real river GeoJSON:", err);
      }

      // STATE BOUNDARY POLYGON (Ceará boundary)
      const cearaBoundary = [
        [-2.78, -40.50], [-2.85, -39.80], [-3.15, -39.00], [-3.70, -38.40],
        [-4.42, -37.76], [-4.80, -37.25], [-5.05, -37.35], [-5.50, -37.60],
        [-6.50, -38.45], [-7.55, -38.60], [-7.85, -39.00], [-7.50, -39.75],
        [-7.15, -40.35], [-6.40, -41.25], [-5.00, -41.40], [-3.60, -41.20],
        [-2.90, -41.00]
      ];
      L.polygon(cearaBoundary as [number, number][], {
        color: "#38BDF8",
        weight: 1.5,
        opacity: 0.6,
        dashArray: "4, 6",
        fillColor: "#0284C7",
        fillOpacity: 0.04
      }).addTo(map);

      // KEY HOTSPOT WAYPOINTS
      const hotspots = [
        {
          name: "Sertão dos Inhamuns (Tauá)",
          role: "Nascente & Caatinga",
          coords: [-5.90, -40.29],
          desc: "Zona de cabeceira pedregosa. O SAR de Banda L penetra a dormência estacional ('mata branca') e mede a biomassa viva preservada.",
          color: "#10B981"
        },
        {
          name: "Açude Castanhão (Alto Santo)",
          role: "Mega-Reservatório & Barragem",
          coords: [-5.50, -38.45],
          desc: "Maior reservatório de terra da América Latina (6,7 bi m³). O InSAR mede estabilidade na crista e o radar delimita o espelho d'água sob nuvens.",
          color: "#06B6D4"
        },
        {
          name: "Açude Orós",
          role: "Barramento Intermediário",
          coords: [-6.10, -38.92],
          desc: "Segundo maior reservatório do Ceará (1,9 bi m³), regulador central do Médio Jaguaribe.",
          color: "#3B82F6"
        },
        {
          name: "Jaguaruana (Limite Cunha Salina)",
          role: "Ponto Crítico de Salinização",
          coords: [-4.75, -37.85],
          desc: "Em 2016, com a retenção no Castanhão, a maré hipersalina penetrou 32 km rio acima até aqui.",
          color: "#F59E0B"
        },
        {
          name: "Estuário de Aracati / Fortim",
          role: "Manguezais & Carcinicultura",
          coords: [-4.42, -37.76],
          desc: "Foz no Atlântico. O SAR polarimétrico (HH-VV) detecta raízes de mangue alagadas e delimita viveiros de carcinicultura.",
          color: "#F43F5E"
        }
      ];

      hotspots.forEach((spot) => {
        const marker = L.circleMarker(spot.coords as [number, number], {
          radius: 8,
          fillColor: spot.color,
          color: "#FFFFFF",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2 font-sans text-xs">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">${spot.role}</span>
            <strong class="text-white text-sm block mb-1" style="color: ${spot.color}">${spot.name}</strong>
            <p class="text-slate-300 leading-relaxed">${spot.desc}</p>
          </div>
        `);
      });

      // ECOLOGICAL CHALLENGES & MITIGATION LAYER
      const riskMarkers = ECOLOGICAL_MARKERS.map((rm) => {
        const m = L.circleMarker(rm.coords, {
          radius: 11,
          fillColor: rm.color,
          color: "#FFFFFF",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9
        });

        m.bindPopup(`
          <div class="p-2.5 font-sans text-xs max-w-xs">
            <div class="flex items-center space-x-1.5 text-amber-400 font-mono text-[10px] font-bold uppercase mb-1">
              <span>⚠️ Ponto Crítico Ecológico</span>
            </div>
            <strong class="text-white text-sm block mb-1.5" style="color: ${rm.color}">
              ${rm.titlePt}
            </strong>
            <div class="mb-2 text-slate-300 leading-relaxed bg-black/40 p-2 rounded-lg border border-slate-800">
              <strong class="text-amber-300 text-[10px] uppercase block mb-0.5">Diagnóstico:</strong>
              ${rm.problemPt}
            </div>
            <div class="text-emerald-300 leading-relaxed bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/30">
              <strong class="text-emerald-400 text-[10px] uppercase block mb-0.5">Medida de Correção:</strong>
              ${rm.mitigationPt}
            </div>
          </div>
        `);
        return m;
      });

      const ecologicalGroup = L.layerGroup(riskMarkers);
      layersRef.current.ecologicalGroup = ecologicalGroup;
      if (showEcologicalRisks) {
        ecologicalGroup.addTo(map);
      }

      // Force recalculation of container dimensions
      setTimeout(() => {
        if (map && isMounted) {
          map.invalidateSize();
        }
      }, 350);

    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Base Map Switching
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.dark) return;
    const map = mapInstanceRef.current;

    map.removeLayer(layersRef.current.dark);
    map.removeLayer(layersRef.current.satellite);
    map.removeLayer(layersRef.current.osm);

    if (baseMapStyle === "satellite") layersRef.current.satellite.addTo(map);
    else if (baseMapStyle === "osm") layersRef.current.osm.addTo(map);
    else layersRef.current.dark.addTo(map);
  }, [baseMapStyle]);

  // Handle Ecological Risk Layer Toggle
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.ecologicalGroup) return;
    const map = mapInstanceRef.current;

    if (showEcologicalRisks) {
      if (!map.hasLayer(layersRef.current.ecologicalGroup)) {
        layersRef.current.ecologicalGroup.addTo(map);
      }
    } else {
      if (map.hasLayer(layersRef.current.ecologicalGroup)) {
        map.removeLayer(layersRef.current.ecologicalGroup);
      }
    }
  }, [showEcologicalRisks]);

  // Handle SAR Overlay Switching & Dielectric Water Points
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove active SAR or Dielectric overlay
    if (layersRef.current.activeSar) {
      map.removeLayer(layersRef.current.activeSar);
      delete layersRef.current.activeSar;
    }

    if (sarOverlayMode === "sentinel1_rtc" && layersRef.current.sarMosaicGroup) {
      layersRef.current.sarMosaicGroup.addTo(map);
      layersRef.current.activeSar = layersRef.current.sarMosaicGroup;
    } else if (sarOverlayMode === "dielectric_heatmap") {
      // PROCEDURAL DIELECTRIC WATER CONCENTRATION & ALLUVIAL MOISTURE POINTS
      import("leaflet").then((L) => {
        const dielectricMarkers = WATER_CONCENTRATION_POINTS.map((pt) => {
          // Dynamic permittivity scaled to the selected multi-decadal timeline milestone
          const dynamicEpsilon = Math.max(
            3.5, 
            Number((pt.epsilonBase * (currentMilestone.soilDielectricEpsilon / 12.4)).toFixed(1))
          );
          
          // Color based on dielectric permittivity (ε)
          const color = dynamicEpsilon >= 22 
            ? "#00E5FF" // Saturated Open Water
            : dynamicEpsilon >= 16 
            ? "#10B981" // Alluvial Aquifer / Moist Subsurface
            : dynamicEpsilon >= 10 
            ? "#F59E0B" // Root-zone Moisture
            : "#EF4444"; // Dry Crust Stress

          // Outer halo indicating microwave dielectric gradient
          const halo = L.default.circle(pt.coords, {
            radius: pt.radiusMeters * (dynamicEpsilon / 18),
            color: color,
            weight: 1.5,
            dashArray: "3, 5",
            fillColor: color,
            fillOpacity: 0.18
          });

          // Core circle
          const core = L.default.circleMarker(pt.coords, {
            radius: 8,
            color: "#FFFFFF",
            weight: 2,
            fillColor: color,
            fillOpacity: 0.85
          });

          const popupContent = `
            <div class="p-2 font-sans text-xs max-w-xs">
              <span class="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">Ponto de Concentração Hídrica & Umidade</span>
              <strong class="text-white text-sm block mb-1.5">${pt.name}</strong>
              <div class="grid grid-cols-2 gap-1.5 mb-2 font-mono text-[11px] bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div>
                  <span class="text-slate-400 block text-[9px] uppercase">Permissividade (ε):</span>
                  <strong class="text-cyan-300">${dynamicEpsilon}</strong>
                </div>
                <div>
                  <span class="text-slate-400 block text-[9px] uppercase">Penetração Banda L:</span>
                  <strong class="text-emerald-300">${pt.depthCm}</strong>
                </div>
              </div>
              <p class="text-slate-300 leading-relaxed text-[11px]">${pt.descPt}</p>
              <span class="text-[10px] text-slate-400 font-mono block mt-1.5 pt-1 border-t border-slate-800">
                ${pt.volumeOrCapacity}
              </span>
            </div>
          `;

          halo.bindPopup(popupContent);
          core.bindPopup(popupContent);

          return L.default.layerGroup([halo, core]);
        });

        const dielectricGroup = L.default.layerGroup(dielectricMarkers);
        dielectricGroup.addTo(map);
        layersRef.current.activeSar = dielectricGroup;
      });
    }

    map.invalidateSize();
  }, [sarOverlayMode, currentMilestone]);

  // Recalculate viewport size when entering/exiting fullscreen
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 300);
    }
  }, [isFullScreen]);

  return (
    <section 
      id="interactive-map" 
      className={`relative w-full border-b border-slate-800 bg-[#050B14] transition-all duration-300 ${
        isFullScreen ? "fixed inset-0 z-50 h-screen" : "h-[750px] lg:h-[820px]"
      }`}
    >
      {/* Map Leaflet Container */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full bg-[#03070E]" />

      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 max-w-[calc(100%-4rem)]">
        
        {/* Base Layer Switcher */}
        <div className="flex items-center rounded-xl border border-slate-700/80 bg-slate-900/90 p-1 backdrop-blur-md shadow-xl text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase px-2 flex items-center space-x-1">
            <Layers className="h-3 w-3 text-cyan-400" />
            <span>{t("Basemap:", "Base:")}</span>
          </span>
          <button
            onClick={() => setBaseMapStyle("dark")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              baseMapStyle === "dark" ? "bg-cyan-500 text-black shadow-sm font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            {t("Dark Canvas", "Escuro")}
          </button>
          <button
            onClick={() => setBaseMapStyle("satellite")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              baseMapStyle === "satellite" ? "bg-cyan-500 text-black shadow-sm font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            {t("Satellite", "Satélite")}
          </button>
          <button
            onClick={() => setBaseMapStyle("osm")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              baseMapStyle === "osm" ? "bg-cyan-500 text-black shadow-sm font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            OSM
          </button>
        </div>

        {/* SAR Sensor Overlay Selector */}
        <div className="flex items-center rounded-xl border border-slate-700/80 bg-slate-900/90 p-1 backdrop-blur-md shadow-xl text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase px-2 flex items-center space-x-1">
            <Radio className="h-3 w-3 animate-pulse" />
            <span>{t("SAR Layer:", "Modo SAR:")}</span>
          </span>
          <button
            onClick={() => setSarOverlayMode("sentinel1_rtc")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              sarOverlayMode === "sentinel1_rtc" ? "bg-emerald-500 text-black shadow-sm font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            {t("Full Ceará Radar Mosaic", "Mosaico Radar Ceará Todo")}
          </button>
          <button
            onClick={() => setSarOverlayMode("dielectric_heatmap")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              sarOverlayMode === "dielectric_heatmap" ? "bg-emerald-500 text-black shadow-sm font-bold" : "text-slate-300 hover:text-white"
            }`}
          >
            {t("Water Points & Dielectric ε", "Pontos de Água & Dielétrico ε")}
          </button>
          <button
            onClick={() => setSarOverlayMode("none")}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              sarOverlayMode === "none" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {t("Off", "Desativar")}
          </button>
        </div>

        {/* Ecological Risks Layer Toggle */}
        <button
          onClick={() => setShowEcologicalRisks(!showEcologicalRisks)}
          className={`flex items-center space-x-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-xl transition-all ${
            showEcologicalRisks
              ? "border-amber-500/50 bg-amber-950/80 text-amber-300 font-bold"
              : "border-slate-700/80 bg-slate-900/90 text-slate-400 hover:text-white"
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
          <span>{t("Ecological Issues & Mitigation", "Problemas Ecológicos & Correção")}</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-2 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md shadow-xl transition-all"
          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Map"}
        >
          {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>

      </div>

      {/* TOP-RIGHT CONCISE HUD CARDS (Clickable -> Opens Drawer) */}
      <div className="absolute top-16 right-4 z-10 flex flex-col gap-2.5 w-64 sm:w-72">
        
        {/* Helper Badge */}
        <div className="rounded-lg bg-black/70 border border-slate-800 px-3 py-1 text-[10px] text-slate-400 text-center backdrop-blur-md">
          {t("Click any indicator below to open full radar telemetry", "Clique em qualquer indicador para abrir a análise")}
        </div>

        {/* Card 1: Castanhão Storage */}
        <div
          onClick={() => setActiveMetricDrawer("storage")}
          className="cursor-pointer group rounded-xl border border-cyan-500/40 bg-slate-900/90 p-3 backdrop-blur-md shadow-xl hover:border-cyan-400 hover:bg-slate-800/90 transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Droplet className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{t("Castanhão Storage", "Volume Castanhão")}</span>
              <span className="text-lg font-mono font-extrabold text-white">{currentMilestone.castanhaoStoragePct}%</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-cyan-400 text-xs">
            <span>{currentMilestone.castanhaoAreaKm2} km²</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Caatinga Biomass Index */}
        <div
          onClick={() => setActiveMetricDrawer("biomass")}
          className="cursor-pointer group rounded-xl border border-emerald-500/40 bg-slate-900/90 p-3 backdrop-blur-md shadow-xl hover:border-emerald-400 hover:bg-slate-800/90 transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <TreePine className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{t("Caatinga Standing Biomass", "Biomassa em Pé")}</span>
              <span className="text-lg font-mono font-extrabold text-white">{currentMilestone.caatingaBiomassIndex} / 100</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-emerald-400 text-xs">
            <span>HV Vol.</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Soil Dielectric Constant */}
        <div
          onClick={() => setActiveMetricDrawer("dielectric")}
          className="cursor-pointer group rounded-xl border border-amber-500/40 bg-slate-900/90 p-3 backdrop-blur-md shadow-xl hover:border-amber-400 hover:bg-slate-800/90 transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{t("Soil Dielectric ε", "Permissividade Dielétrica ε")}</span>
              <span className="text-lg font-mono font-extrabold text-white">{currentMilestone.soilDielectricEpsilon}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-amber-400 text-xs">
            <span>0–30 cm</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Estuarine Salinity Wedge */}
        <div
          onClick={() => setActiveMetricDrawer("salinity")}
          className="cursor-pointer group rounded-xl border border-rose-500/40 bg-slate-900/90 p-3 backdrop-blur-md shadow-xl hover:border-rose-400 hover:bg-slate-800/90 transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
              <Waves className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{t("Salinity Intrusion Wedge", "Cunha Salina a Montante")}</span>
              <span className="text-lg font-mono font-extrabold text-white">{currentMilestone.salinityIntrusionKm} km</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-rose-400 text-xs">
            <span>{currentMilestone.aquaculturePondAreaHa} ha</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* BOTTOM FLUID TIME SLIDER DOCK */}
      <div className="absolute bottom-6 left-4 right-4 lg:left-12 lg:right-12 z-10">
        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/95 p-4 lg:p-5 backdrop-blur-lg shadow-2xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            
            {/* Play/Pause & Active Year Badge */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 font-bold transition-all shadow-md shadow-cyan-950/50"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
              <div>
                <span className="text-xs text-slate-400 font-mono block">
                  {t("Historical Multi-Decadal Slider (1985–2026):", "Linha do Tempo Multidecadal (1985–2026):")}
                </span>
                <span className="text-base font-extrabold text-cyan-300 font-mono">
                  {currentMilestone.label}
                </span>
              </div>
            </div>

            {/* Context Narrative */}
            <p className="text-xs text-slate-300 max-w-md italic">
              {t(currentMilestone.climateContextEn, currentMilestone.climateContextPt)}
            </p>

          </div>

          {/* Range Slider Track */}
          <div className="relative w-full pt-1">
            <input
              type="range"
              min={0}
              max={HISTORICAL_TIMELINE.length - 1}
              value={selectedYearIdx}
              onChange={(e) => {
                setIsPlaying(false);
                handleYearChange(Number(e.target.value));
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
            />
            {/* Milestone Year Labels */}
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
              {HISTORICAL_TIMELINE.map((m, idx) => (
                <span 
                  key={m.year}
                  onClick={() => {
                    setIsPlaying(false);
                    handleYearChange(idx);
                  }}
                  className={`cursor-pointer transition-colors ${
                    idx === selectedYearIdx ? "text-cyan-400 font-bold scale-110" : "hover:text-slate-200"
                  }`}
                >
                  {m.year}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* OFF-CANVAS INTERACTIVE METRIC DRAWER (SLIDING SIDEBAR) */}
      {activeMetricDrawer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#0A1220]/98 border-l border-slate-700/80 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {t("Deep SAR Telemetry Inspector", "Inspetor Biofísico SAR Profundo")}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {activeMetricDrawer === "storage" && t("Castanhão Water Volume & Specular SAR", "Volume do Castanhão & SAR Especular")}
                    {activeMetricDrawer === "biomass" && t("Caatinga Standing Woody Biomass (HV)", "Biomassa em Pé da Caatinga (HV)")}
                    {activeMetricDrawer === "dielectric" && t("Root-Zone Dielectric Moisture (ε)", "Umidade Dielétrica Radicular (ε)")}
                    {activeMetricDrawer === "salinity" && t("Estuarine Salinity Intrusion Wedge", "Cunha Salina & Carcinicultura")}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveMetricDrawer(null)}
                className="rounded-lg p-2 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Metric Detailed Explanation */}
            <div className="space-y-4 mb-6 text-xs text-slate-300 leading-relaxed">
              {activeMetricDrawer === "storage" && (
                <>
                  <p>
                    {t(
                      "Castanhão Dam (6.7 billion m³) controls downstream hydrology for Ceará. Synthetic Aperture Radar detects water via specular reflection: smooth open water acts as a mirror, deflecting incident microwave pulses away and creating jet-black polygons in both HH and VV polarizations.",
                      "O Açude Castanhão (6,7 bilhões de m³) controla a hidrologia a jusante no Ceará. O radar SAR detecta a água por reflexão especular: o espelho d'água liso reflete os pulsos para longe, gerando polígonos pretos milimetricamente delimitados mesmo sob céu nublado."
                    )}
                  </p>
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-[11px] text-cyan-300">
                    <strong>{t("Physics Equation:", "Equação Física:")}</strong> σ⁰_water ≪ σ⁰_land (contraste superior a 15 dB em banda L).
                  </div>
                </>
              )}

              {activeMetricDrawer === "biomass" && (
                <>
                  <p>
                    {t(
                      "During severe droughts, the Caatinga drops 100% of its leaves. Optical satellites see dry gray land (NDVI drops to zero), falsely flagging deforestation. NISAR L-band (24 cm wavelength) penetrates past the missing leaves and measures volume scattering (HV/VH) of standing woody trunks, proving physiological dormancy.",
                      "Na seca severa, a Caatinga perde 100% das folhas. Satélites ópticos veem terra seca (NDVI zera), sugerindo desmatamento. A banda L do NISAR (24 cm) penetra a copa vazia e mede o espalhamento volumétrico (HV/VH) dos troncos lenhosos, comprovando dormência viva."
                    )}
                  </p>
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-[11px] text-emerald-300">
                    <strong>{t("Physics Equation:", "Equação Física:")}</strong> P_v = 4|S_HV|² (Pauli green channel volume decomposition).
                  </div>
                </>
              )}

              {activeMetricDrawer === "dielectric" && (
                <>
                  <p>
                    {t(
                      "Liquid water exhibits a dielectric constant of ε ≈ 80, whereas dry mineral soil is ε ≈ 3.5. Due to its long 24 cm wavelength, NISAR penetrates 15 to 30 cm beneath the dry surface crust, measuring volumetric soil moisture in the taproot zone.",
                      "A água líquida possui constante dielétrica ε ≈ 80, frente a minerais secos com ε ≈ 3,5. Pelo seu comprimento de onda de 24 cm, o NISAR penetra 15 a 30 cm abaixo da crosta seca, medindo a umidade volumétrica na raiz pivotante."
                    )}
                  </p>
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-[11px] text-amber-300">
                    <strong>{t("Topp's Model:", "Modelo de Topp:")}</strong> θ_v = -0.053 + 0.0292ε - 5.5×10⁻⁴ε² + 4.3×10⁻⁶ε³.
                  </div>
                </>
              )}

              {activeMetricDrawer === "salinity" && (
                <>
                  <p>
                    {t(
                      "When upstream dams retain freshwater during megadroughts, the Jaguaribe river outflow approaches zero. Oceanic semidiurnal tides push a hypersaline marine wedge up to 32 km upstream. Carciniculture ponds continue intensive production, requiring synchronized flushing pulses to dilute organic effluents.",
                      "Quando os açudes retêm água na seca, a vazão doce do Jaguaribe zera. As marés empurram uma cunha hipersalina 32 km rio acima até Jaguaruana. A carcinicultura mantém atividade produtiva vital, exigindo pulsos sincronizados de vazão ecológica para diluir efluentes."
                    )}
                  </p>
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-3 font-mono text-[11px] text-rose-300">
                    <strong>{t("Estuarine Salinity:", "Salinidade Estuarina:")}</strong> S(x) = S_ocean · exp(-Q_river · x / (D · A)).
                  </div>
                </>
              )}
            </div>

            {/* 40-Year Recharts Historical Evolution */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 mb-6">
              <span className="text-[11px] font-bold text-white uppercase font-mono block mb-3">
                {t("Historical Multi-Decade Evolution (1985–2026)", "Evolução Histórica Multidecadal (1985–2026)")}
              </span>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={HISTORICAL_TIMELINE}>
                    <defs>
                      <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#64748B" fontSize={10} />
                    <YAxis stroke="#64748B" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#050B14", borderColor: "#334155", fontSize: "11px" }}
                      labelStyle={{ color: "#38BDF8", fontWeight: "bold" }}
                    />
                    <ReferenceLine x={2016} stroke="#EF4444" strokeDasharray="3 3" label={{ value: "Seca 2016", fill: "#EF4444", fontSize: 10 }} />
                    <Area 
                      type="monotone" 
                      dataKey={
                        activeMetricDrawer === "storage" ? "castanhaoStoragePct" :
                        activeMetricDrawer === "biomass" ? "caatingaBiomassIndex" :
                        activeMetricDrawer === "dielectric" ? "soilDielectricEpsilon" : "salinityIntrusionKm"
                      }
                      stroke="#00E5FF" 
                      fillOpacity={1} 
                      fill="url(#metricGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Human Drivers & Story Callout */}
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/30 p-3.5 text-xs text-cyan-200">
              <strong className="text-white block mb-1">
                {t("Human Driver & Community Context:", "Fator Humano & Contexto Social:")}
              </strong>
              {activeMetricDrawer === "storage" && t(
                "Water allocation priority is legally assigned to human consumption in metropolitan Fortaleza via the Eixão das Águas canal, forcing rural riverbed users to adapt to zero flow.",
                "A prioridade de alocação de água é o consumo humano de Fortaleza pelo Eixão das Águas, forçando os usuários rurais da calha a conviver com vazão zero."
              )}
              {activeMetricDrawer === "biomass" && t(
                "Smallholder livestock herders rely on drought-tolerant forage (mandacaru, palma) while woody biomass remains dormant until the first rains trigger explosive greening within 72 hours.",
                "Pecuaristas familiares alimentam rebanhos com palma forrageira enquanto a Caatinga aguarda as primeiras chuvas para rebrotar em menos de 72 horas."
              )}
              {activeMetricDrawer === "dielectric" && t(
                "Detecting subsurface moisture guides dryland farming sowing schedules and provides early warning for desertification risk across the Inhamuns region.",
                "O mapeamento da umidade no subsolo orienta o plantio de sequeiro e fornece alerta precoce contra a desertificação nos Inhamuns."
              )}
              {activeMetricDrawer === "salinity" && t(
                "Aracati shrimp farmers and artisanal crab gatherers depend on the same estuarine waters. Coordinated reservoir pulse releases benefit both ecosystem health and aquaculture production.",
                "Criadores de camarão e catadores de caranguejo dependem da mesma água estuarina. Descargas coordenadas do Castanhão beneficiam o ecossistema e a produção aquícola."
              )}
            </div>

          </div>

          {/* Drawer Close Button */}
          <button
            onClick={() => setActiveMetricDrawer(null)}
            className="w-full mt-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 text-xs transition-colors"
          >
            {t("Close Telemetry Inspector", "Fechar Inspetor")}
          </button>

        </div>
      )}

    </section>
  );
}
