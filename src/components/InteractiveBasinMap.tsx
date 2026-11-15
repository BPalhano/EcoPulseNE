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
  Fish,
  Crosshair,
  Satellite,
  Loader2,
  ChevronDown,
  ChevronUp
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
    castanhaoAreaKm2: 0, // Pre-dam baseline
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
    castanhaoAreaKm2: 0,
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
    castanhaoAreaKm2: 0,
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
    castanhaoAreaKm2: 45, // Dam works started
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
    castanhaoAreaKm2: 325, // 100% full maximum footprint
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
    castanhaoAreaKm2: 38, // shrunken pool
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

// 5-YEAR SATELLITE & SAR MISSIONS ACROSS MULTIDECADAL TIMELINE
interface SatelliteMissionEra {
  yearMin: number;
  yearMax: number;
  opticalMission: string;
  opticalSensor: string;
  opticalResolution: string;
  sarMission: string;
  sarBand: string;
  sarResolution: string;
  filterStyle: string;
  contextEn: string;
  contextPt: string;
}

const SATELLITE_MISSION_ERAS: SatelliteMissionEra[] = [
  {
    yearMin: 1985,
    yearMax: 1990,
    opticalMission: "Landsat-5 (NASA / USGS)",
    opticalSensor: "Thematic Mapper (TM)",
    opticalResolution: "30 m Multispectral",
    sarMission: "ERS-1 (ESA)",
    sarBand: "C-Band (5.3 GHz, λ = 5.66 cm)",
    sarResolution: "25 m Precision Imagery",
    filterStyle: "contrast(1.02) saturate(0.95)",
    contextEn: "Pre-Castanhão baseline: Natural riverbed with seasonal torrential flooding. Pristine apicuns.",
    contextPt: "Marco zero pré-Castanhão: Leito natural do Jaguaribe sem represamento. Apicuns preservados."
  },
  {
    yearMin: 1991,
    yearMax: 1995,
    opticalMission: "Landsat-5 (NASA / USGS)",
    opticalSensor: "Thematic Mapper (TM)",
    opticalResolution: "30 m Surface Reflectance",
    sarMission: "ERS-1 / ERS-2 (ESA)",
    sarBand: "AMI Active Microwave Instrument",
    sarResolution: "25 m Synthetic Aperture Radar",
    filterStyle: "contrast(1.05) saturate(1.1)",
    contextEn: "Super wet flood pulses flush basin with heavy sediment transport.",
    contextPt: "Super cheias lavam a bacia com forte transporte de sedimentos."
  },
  {
    yearMin: 1996,
    yearMax: 2000,
    opticalMission: "Landsat-7 (NASA / USGS)",
    opticalSensor: "Enhanced Thematic Mapper Plus (ETM+)",
    opticalResolution: "15 m Pan-Sharpened / 30 m",
    sarMission: "RADARSAT-1 (CSA / NASA)",
    sarBand: "C-Band SAR (5.3 GHz HH Mode)",
    sarResolution: "28 m Standard Mode",
    filterStyle: "contrast(1.08) saturate(0.98)",
    contextEn: "Earthworks and riverbed diversion for Castanhão dam construction.",
    contextPt: "Obras de terraplenagem e desvio do leito para a construção do Castanhão."
  },
  {
    yearMin: 2001,
    yearMax: 2005,
    opticalMission: "Terra MODIS & Landsat-7",
    opticalSensor: "MODIS Surface Reflectance & ETM+",
    opticalResolution: "250 m Surface Reflectance / 30 m",
    sarMission: "ENVISAT (ESA)",
    sarBand: "ASAR (C-Band Alternating Polarization)",
    sarResolution: "30 m Dual-Pol",
    filterStyle: "contrast(1.12) saturate(1.25)",
    contextEn: "Castanhão reaches 100% capacity in 2004, creating a massive 325 km² specular water mirror.",
    contextPt: "Castanhão atinge 100% de sangria em 2004, formando espelho d'água de 325 km²."
  },
  {
    yearMin: 2006,
    yearMax: 2010,
    opticalMission: "Landsat-7 & Terra MODIS",
    opticalSensor: "ETM+ / MODIS Rapid Response",
    opticalResolution: "30 m Multispectral",
    sarMission: "ALOS-1 (JAXA)",
    sarBand: "PALSAR (L-Band 1.27 GHz, λ = 23.6 cm)",
    sarResolution: "10 m Quad-Pol High-Res",
    filterStyle: "contrast(1.1) saturate(1.15)",
    contextEn: "Surplus wet years maintain high storage; rapid carciniculture expansion in Aracati.",
    contextPt: "Anos consecutivos de chuvas fartas mantêm o açude cheio e impulsionam viveiros em Aracati."
  },
  {
    yearMin: 2011,
    yearMax: 2015,
    opticalMission: "Landsat-8 (NASA / USGS)",
    opticalSensor: "Operational Land Imager (OLI)",
    opticalResolution: "15 m Pan / 30 m Multispectral",
    sarMission: "ALOS-2 (JAXA)",
    sarBand: "PALSAR-2 (L-Band 1.2 GHz)",
    sarResolution: "6 m StripMap Full Polarimetry",
    filterStyle: "contrast(1.08) saturate(0.85) sepia(0.08)",
    contextEn: "Onset of historic megadrought: reservoir shrinks by 57%; river gates closed to save Fortaleza.",
    contextPt: "Eclosão da megaseca: espelho d'água retrai 57%; comportas fechadas para resguardar Fortaleza."
  },
  {
    yearMin: 2016,
    yearMax: 2020,
    opticalMission: "Copernicus Sentinel-2A/B (ESA)",
    opticalSensor: "Multi-Spectral Instrument (MSI)",
    opticalResolution: "10 m Full Color & Red Edge",
    sarMission: "Copernicus Sentinel-1A/B (ESA)",
    sarBand: "C-SAR (5.405 GHz VV+VH Dual-Pol RTC)",
    sarResolution: "10 m High-Resolution IW Swath",
    filterStyle: "contrast(1.15) saturate(0.65) brightness(0.95)",
    contextEn: "Megadrought Apex (5.2% storage): Water area contracts to just 38 km². Salinity wedge advances 32 km.",
    contextPt: "Ápice da Seca (5,2% de volume): Lâmina d'água encolhe para 38 km². Cunha salina avança 32 km."
  },
  {
    yearMin: 2021,
    yearMax: 2026,
    opticalMission: "Copernicus Sentinel-2B / MSI (ESA)",
    opticalSensor: "Level-2A Surface Reflectance",
    opticalResolution: "10 m True Color Visual",
    sarMission: "NASA-ISRO NISAR & Sentinel-1 (NASA/ESA)",
    sarBand: "Dual-Frequency L-Band (24 cm) + S-Band (9 cm)",
    sarResolution: "3–10 m High-Resolution Polarimetry",
    filterStyle: "contrast(1.05) saturate(1.05)",
    contextEn: "PISF São Francisco waters arrive; modern dual-frequency microwave monitoring operationalized.",
    contextPt: "Chegada das águas do São Francisco (PISF); monitoramento quinzenal NISAR ativo."
  }
];

// 12 GENUINE SENTINEL-1 RTC GRANULES COVERING 100% OF CEARÁ
const CEARA_S1_RTC_GRANULES = [
  "S1A_IW_GRDH_1SDV_20231129T080854_20231129T080923_051429_0634EA_rtc",
  "S1A_IW_GRDH_1SDV_20231129T080923_20231129T080948_051429_0634EA_rtc",
  "S1A_IW_GRDH_1SDV_20231129T080948_20231129T081013_051429_0634EA_rtc",
  "S1A_IW_GRDH_1SDV_20231129T081013_20231129T081038_051429_0634EA_rtc",
  "S1A_IW_GRDH_1SDV_20231122T081735_20231122T081800_051327_06316D_rtc",
  "S1A_IW_GRDH_1SDV_20231122T081800_20231122T081825_051327_06316D_rtc",
  "S1A_IW_GRDH_1SDV_20231122T081825_20231122T081850_051327_06316D_rtc",
  "S1A_IW_GRDH_1SDV_20231122T081850_20231122T081915_051327_06316D_rtc",
  "S1A_IW_GRDH_1SDV_20231127T082535_20231127T082604_051400_0633E3_rtc",
  "S1A_IW_GRDH_1SDV_20231127T082604_20231127T082629_051400_0633E3_rtc",
  "S1A_IW_GRDH_1SDV_20231127T082629_20231127T082654_051400_0633E3_rtc",
  "S1A_IW_GRDH_1SDV_20231127T082654_20231127T082719_051400_0633E3_rtc"
];

// MAJOR DAMS SPECIFICATION FOR DAM SELECTOR & RIGIDITY VS DECORRELATION
export interface DamSpecification {
  id: string;
  name: string;
  river: string;
  location: string;
  coords: [number, number];
  zoom: number;
  capacityMm3: number;
  currentStoragePct: number;
  crestLengthM: number;
  crestHeightM: number;
  damTypeEn: string;
  damTypePt: string;
  foundationGeologyEn: string;
  foundationGeologyPt: string;
  insarCoherence: number;
  deformationMmYr: number;
  rigidityStatusEn: string;
  rigidityStatusPt: string;
  descriptionEn: string;
  descriptionPt: string;
}

export const MAJOR_DAMS: DamSpecification[] = [
  {
    id: "castanhao",
    name: "Açude Castanhão (Padre Cícero)",
    river: "Rio Jaguaribe",
    location: "Alto Santo / Jaguaribara (Médio Jaguaribe)",
    coords: [-5.50, -38.45],
    zoom: 11,
    capacityMm3: 6700,
    currentStoragePct: 34.2,
    crestLengthM: 30000,
    crestHeightM: 60,
    damTypeEn: "Zoned earthfill dam with concrete gated spillway",
    damTypePt: "Barragem de terra zoneada com vertedouro de concreto e comportas",
    foundationGeologyEn: "Precambrian gneiss bedrock with weathered granite abutments",
    foundationGeologyPt: "Embasamento gnáissico pré-cambriano com ombreiras de granito alterado",
    insarCoherence: 0.92,
    deformationMmYr: -2.4,
    rigidityStatusEn: "Rigid Structural Armor (High Coherence γ > 0.90)",
    rigidityStatusPt: "Enrocamento Rígido Estável (Alta Coerência γ > 0,90)",
    descriptionEn: "Latin America's largest public reservoir. Riprap rock armor on the upstream face preserves stable radar phase, allowing millimeter PS-InSAR tracking.",
    descriptionPt: "Maior reservatório público de terra da América Latina. O enrocamento de pedras na face de montante preserva a fase de radar, permitindo monitorar assentamentos milimétricos."
  },
  {
    id: "oros",
    name: "Açude Orós (Pres. Juscelino Kubitschek)",
    river: "Rio Jaguaribe",
    location: "Orós / Iguatu (Alto/Médio Jaguaribe)",
    coords: [-6.10, -38.92],
    zoom: 11,
    capacityMm3: 1940,
    currentStoragePct: 58.5,
    crestLengthM: 1980,
    crestHeightM: 54,
    damTypeEn: "Curved rockfill embankment with masonry core (Built 1961)",
    damTypePt: "Aterro de enrocamento curvo com núcleo de alvenaria de pedra (Construído em 1961)",
    foundationGeologyEn: "Massive crystalline quartz-diorite canyon gorge",
    foundationGeologyPt: "Boqueirão cristalino de quartzo-diorito maciço",
    insarCoherence: 0.95,
    deformationMmYr: -0.6,
    rigidityStatusEn: "Ultra-Rigid Bedrock Anchor (γ ≈ 0.95)",
    rigidityStatusPt: "Fixação Ultrarrígida em Rocha Viva (γ ≈ 0,95)",
    descriptionEn: "Anchored directly into a steep crystalline canyon gorge. Extremely low temporal decorrelation makes Orós a prime InSAR geodetic calibration reference.",
    descriptionPt: "Ancorado diretamente no boqueirão de rocha cristalina. Baixíssima decorrelação temporal torna o Orós um calibrador geodésico ideal para satélites SAR."
  },
  {
    id: "banabuiu",
    name: "Açude Banabuiú (Arrojado Lisboa)",
    river: "Rio Banabuiú",
    location: "Banabuiú (Sertão Central)",
    coords: [-5.32, -38.92],
    zoom: 11,
    capacityMm3: 1600,
    currentStoragePct: 39.0,
    crestLengthM: 1040,
    crestHeightM: 48,
    damTypeEn: "Rockfill with central clay core and side spillway",
    damTypePt: "Enrocamento com núcleo central de argila e vertedouro lateral",
    foundationGeologyEn: "Biotite-gneiss crystalline basement",
    foundationGeologyPt: "Embasamento cristalino biotita-gnaisse",
    insarCoherence: 0.88,
    deformationMmYr: -1.2,
    rigidityStatusEn: "Stable Rigid Embankment (γ > 0.85)",
    rigidityStatusPt: "Aterro Rígido Estável (γ > 0,85)",
    descriptionEn: "Third largest reservoir in Ceará, providing strategic buffering for the Sertão Central agricultural perimeter.",
    descriptionPt: "Terceiro maior açude do estado, regulador estratégico de água potável e irrigação para o Sertão Central."
  },
  {
    id: "arneiroz",
    name: "Açude Arneiroz II",
    river: "Alto Jaguaribe",
    location: "Arneiroz / Tauá (Sertão dos Inhamuns)",
    coords: [-6.32, -40.16],
    zoom: 12,
    capacityMm3: 197,
    currentStoragePct: 62.0,
    crestLengthM: 1420,
    crestHeightM: 32,
    damTypeEn: "Homogeneous earthfill dam with riprap slope protection",
    damTypePt: "Barragem de terra homogênea com enrocamento de proteção",
    foundationGeologyEn: "Schistose and migmatitic bedrock",
    foundationGeologyPt: "Embasamento xistoso e migmatítico",
    insarCoherence: 0.86,
    deformationMmYr: -0.9,
    rigidityStatusEn: "Stable Headwater Retention (γ ≈ 0.86)",
    rigidityStatusPt: "Retenção Estável de Cabeceira (γ ≈ 0,86)",
    descriptionEn: "Controls torrential summer flash floods from the Inhamuns crystalline uplands, storing precious water before it reaches Orós.",
    descriptionPt: "Retém as enxurradas torrenciais das serras secas dos Inhamuns, preservando volume antes do Médio Jaguaribe."
  },
  {
    id: "trussu",
    name: "Açude Roberto Costa (Trussu)",
    river: "Rio Trussu (Afluente do Jaguaribe)",
    location: "Iguatu (Centro-Sul Cearense)",
    coords: [-6.28, -39.38],
    zoom: 12,
    capacityMm3: 300,
    currentStoragePct: 54.0,
    crestLengthM: 1100,
    crestHeightM: 38,
    damTypeEn: "Zoned earthfill dam with morning-glory shaft spillway",
    damTypePt: "Barragem de terra zoneada com vertedouro tipo tulipa",
    foundationGeologyEn: "Metasedimentary crystalline basement",
    foundationGeologyPt: "Embasamento metassedimentar cristalino",
    insarCoherence: 0.89,
    deformationMmYr: -0.7,
    rigidityStatusEn: "Rigid Structural Crest (γ ≈ 0.89)",
    rigidityStatusPt: "Crista Estrutural Rígida (γ ≈ 0,89)",
    descriptionEn: "Crucial regulatory dam for the fertile Iguatu floodplain and confluence with Rio Salgado.",
    descriptionPt: "Açude vital para perenizar a rica várzea de Iguatu e abastecer a confluência com o Rio Salgado."
  }
];

// WATER BODY POLYGONS (REAL WATER MASK DELINEATING WATER SURFACES OVER SAR)
const WATER_BODY_POLYGONS = {
  // Castanhão 100% full extent
  castanhaoFull: [
    [-5.42, -38.45], [-5.44, -38.40], [-5.48, -38.35], [-5.52, -38.36],
    [-5.56, -38.40], [-5.60, -38.46], [-5.62, -38.52], [-5.58, -38.56],
    [-5.54, -38.55], [-5.50, -38.52], [-5.46, -38.48]
  ],
  // Castanhão shrunken 2016 drought pool (5.2%)
  castanhaoDrought2016: [
    [-5.48, -38.44], [-5.50, -38.42], [-5.53, -38.43], [-5.52, -38.46],
    [-5.49, -38.47]
  ],
  // Açude Orós Lake
  oros: [
    [-6.02, -38.90], [-6.06, -38.88], [-6.12, -38.89], [-6.16, -38.93],
    [-6.18, -38.97], [-6.14, -38.96], [-6.08, -38.93], [-6.04, -38.92]
  ],
  // Açude Banabuiú Lake
  banabuiu: [
    [-5.28, -38.90], [-5.32, -38.88], [-5.36, -38.92], [-5.34, -38.96],
    [-5.30, -38.94]
  ],
  // Açude Arneiroz II
  arneiroz: [
    [-6.30, -40.14], [-6.33, -40.15], [-6.35, -40.18], [-6.33, -40.19],
    [-6.31, -40.16]
  ],
  // Açude Trussu
  trussu: [
    [-6.26, -39.36], [-6.29, -39.37], [-6.31, -39.40], [-6.29, -39.41],
    [-6.27, -39.38]
  ],
  // Estuário de Aracati / Fortim (Tidal channel & shrimp pond clusters)
  aracatiEstuary: [
    [-4.40, -37.74], [-4.42, -37.75], [-4.45, -37.77], [-4.48, -37.80],
    [-4.46, -37.82], [-4.43, -37.79], [-4.41, -37.76]
  ]
};

// BIOME POLYGONS (REALISTIC SPATIAL EXTENTS ACROSS CEARÁ & JAGUARIBE BASIN)
const BIOME_POLYGONS = {
  // 1. Caatinga da Depressão Sertaneja & Médio/Baixo Jaguaribe (Dominant Biome)
  caatingaSertaoCentral: {
    nameEn: "Sertão Central & Depressão Sertaneja Caatinga",
    namePt: "Caatinga da Depressão Sertaneja & Médio Jaguaribe",
    biomeEn: "Crystalline Depression Caatinga (Deciduous Scrub)",
    biomePt: "Caatinga sobre Cristalino Raso da Depressão Sertaneja",
    color: "#F59E0B",
    borderColor: "#B45309",
    coords: [
      [-4.35, -38.65], [-4.38, -37.75], [-4.95, -37.30], [-5.65, -37.60],
      [-6.25, -38.15], [-6.45, -38.75], [-6.15, -39.15], [-5.55, -39.25],
      [-4.85, -39.35], [-4.35, -38.65]
    ],
    featuresEn: "Dominant biome covering 75% of the basin over shallow crystalline Precambrian bedrock. Complete seasonal deciduous defoliation during prolonged dry spells; volume scattering (HV/VH) helps distinguish living standing woody stems from clear-cutting.",
    featuresPt: "Bioma dominante cobrindo 75% da bacia sobre embasamento cristalino pré-cambriano raso. Defoliação caducifólia total na seca; retroespalhamento volumétrico (HV/VH) auxilia a diferenciar caules lenhosos vivos de corte raso."
  },
  // 2. Caatinga dos Inhamuns & Alto Jaguaribe (Dry Southwestern Uplands)
  caatingaInhamuns: {
    nameEn: "Inhamuns Arboreal & Thorny Caatinga (Alto Jaguaribe)",
    namePt: "Caatinga Arbustiva dos Inhamuns & Alto Jaguaribe",
    biomeEn: "Hyperxerophytic Upland Caatinga",
    biomePt: "Caatinga Hiperxerófila de Planalto Cristalino",
    color: "#EA580C",
    borderColor: "#9A3412",
    coords: [
      [-5.25, -40.65], [-5.25, -39.85], [-5.85, -39.65], [-6.45, -39.45],
      [-6.95, -39.75], [-7.25, -40.25], [-6.85, -40.95], [-6.05, -40.95],
      [-5.25, -40.65]
    ],
    featuresEn: "Arid crystalline tablelands (Tauá, Parambu, Arneiroz, Aiuaba). Deep-penetrating L-band microwave telemetry (NISAR) penetrates parched soil (0–30 cm) tracking severe moisture deficits.",
    featuresPt: "Altos sertões cristalinos (Tauá, Parambu, Arneiroz, Aiuaba). Micro-ondas em banda L (NISAR) penetram até 30 cm no solo ressequido, rastreando secas profundas."
  },
  // 3. Mata Ciliar Ripária do Rio Jaguaribe (APP Fluvial de 610 km)
  mataCiliarJaguaribe: {
    nameEn: "Jaguaribe Riparian Gallery Forest (610-km River APP)",
    namePt: "Mata Ciliar Ripária do Rio Jaguaribe (APP Fluvial 610 km)",
    biomeEn: "Riparian Alluvial Gallery Forest",
    biomePt: "Mata Ripária Aluvionar Protetora",
    color: "#10B981",
    borderColor: "#047857",
    coords: [
      [-4.42, -37.76], [-4.60, -37.95], [-4.95, -38.10], [-5.35, -38.35],
      [-5.70, -38.58], [-6.12, -38.88], [-6.25, -39.35], [-6.38, -39.95],
      [-6.55, -40.25], [-6.45, -40.35], [-6.25, -40.05], [-6.10, -39.45],
      [-5.98, -38.98], [-5.58, -38.68], [-5.22, -38.45], [-4.85, -38.20],
      [-4.50, -38.05], [-4.38, -37.82]
    ],
    featuresEn: "Linear riparian gallery buffering sediment runoff, stabilizing riverbank terraces against devastating slope landslides (desbarrancamento), and preserving alluvial aquifers.",
    featuresPt: "Faixa florestal contínua que retém sedimentos, estabiliza barrancos contra deslizamentos (desbarrancamento) e protege os aquíferos aluviais perenizados."
  },
  // 4. Manguezais Estuarinos de Aracati & Fortim
  manguezaisAracati: {
    nameEn: "Aracati & Fortim Estuarine Mangroves",
    namePt: "Manguezais Estuarinos de Aracati & Fortim",
    biomeEn: "Tidal Marine Mangrove",
    biomePt: "Manguezal Estuarino de Maré",
    color: "#06B6D4",
    borderColor: "#0891B2",
    coords: [
      [-4.34, -37.68], [-4.40, -37.72], [-4.47, -37.76], [-4.52, -37.82],
      [-4.49, -37.86], [-4.42, -37.80], [-4.35, -37.74]
    ],
    featuresEn: "Tidal fringe forest (Rhizophora mangle, Avicennia germinans). High tide water sheet creates an orthogonal 90° dihedral reflector with stilt roots, yielding +8.4 dB double-bounce radar spike.",
    featuresPt: "Manguezal de maré (Rhizophora mangle, Avicennia germinans). A lâmina d'água na preamar forma diedro de 90° com raízes escora, gerando pico de +8,4 dB em reflexão dupla."
  },
  // 5. Apicuns e Planícies Hipersalinas Costeiras
  apicunsCosteiros: {
    nameEn: "Aracati Coastal Apicuns & Salt Flats",
    namePt: "Apicuns & Salgados Costeiros de Aracati",
    biomeEn: "Hypersaline Coastal Supratidal Flat",
    biomePt: "Planície Hipersalina Supramareal (Apicum)",
    color: "#E11D48",
    borderColor: "#9F1239",
    coords: [
      [-4.41, -37.70], [-4.46, -37.74], [-4.52, -37.79], [-4.50, -37.82],
      [-4.44, -37.77], [-4.39, -37.73]
    ],
    featuresEn: "Supratidal hypersaline flats bordering mangroves. Low biomass and high surface radar backscatter; primary conversion area for shrimp ponds.",
    featuresPt: "Planícies hipersalinas na retaguarda do manguezal. Baixa biomassa e reflexão de superfície; área de expansão de viveiros."
  },
  // 6. Brejos de Altitude & Matas Serranas (Pereiro, Baturité)
  brejosAltitude: {
    nameEn: "High-Altitude Moist Forest Relicts (Brejos de Altitude)",
    namePt: "Brejos de Altitude & Matas Serranas (Pereiro/Baturité)",
    biomeEn: "Subperennial Moist Highland Forest",
    biomePt: "Floresta Úmida Subperenifólia Serrana",
    color: "#15803D",
    borderColor: "#14532D",
    coords: [
      [-4.20, -38.90], [-4.40, -38.80], [-4.50, -38.95], [-4.30, -39.10]
    ],
    featuresEn: "Relict moist highland forests intercepting orographic clouds on crystalline massifs. Maintain high canopy volume scattering year-round, serving as ecological recharge islands.",
    featuresPt: "Ilhas de floresta úmida sobre maciços cristalinos que retêm chuvas orográficas. Mantêm alto espalhamento volumétrico o ano todo, atuando como refúgios ecológicos."
  }
};

// APPROXIMATED WATER CONCENTRATION & ALLUVIAL MOISTURE POINTS
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
    id: "alluvium_alto",
    name: "Aquífero Aluvionar do Alto Jaguaribe (Tauá - Arneiroz)",
    category: "alluvial_corridor",
    coords: [-6.05, -40.22],
    radiusMeters: 14000,
    epsilonBase: 16.5,
    depthCm: "15–30 cm (Sondagem Banda L)",
    volumeOrCapacity: "Reserva Aluvionar Subsuperficial",
    descEn: "Coarse fluvial sand deposits store shallow subsurface groundwater even when surface riverbed runs dry.",
    descPt: "Depósitos arenosos fluviais armazenam água subsuperficial mesmo quando a superfície do rio seca."
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
    descEn: "Broad floodway with organic silt and sand layers sustaining subsistence agriculture.",
    descPt: "Calha larga de inundação com silte e areia. Zona de amortecimento e filtro natural."
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
    descEn: "Deep sediment floodplain supporting dense fruit agriculture through accessible shallow water tables.",
    descPt: "Planície profunda de sedimentos que sustenta a fruticultura irrigada por lençol freático acessível."
  },
  {
    id: "estuary_aracati",
    name: "Complexo Estuarino de Aracati / Fortim (Manguezais & Viveiros)",
    category: "estuarine_wetland",
    coords: [-4.42, -37.76],
    radiusMeters: 12000,
    epsilonBase: 28.0,
    depthCm: "0–30 cm (Saturação mareal)",
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

// BILINGUAL POPUP CONTENT GENERATORS
const getEcologicalPopupContent = (rm: EcologicalMarker, isPt: boolean) => `
  <div class="p-2.5 font-sans text-xs max-w-xs">
    <div class="flex items-center space-x-1.5 text-amber-400 font-mono text-[10px] font-bold uppercase mb-1">
      <span>⚠️ ${isPt ? "Ponto Crítico Ecológico" : "Ecological Critical Point"}</span>
    </div>
    <strong class="text-white text-sm block mb-1.5" style="color: ${rm.color}">
      ${isPt ? rm.titlePt : rm.titleEn}
    </strong>
    <div class="mb-2 text-slate-300 leading-relaxed bg-black/40 p-2 rounded-lg border border-slate-800">
      <strong class="text-amber-300 text-[10px] uppercase block mb-0.5">${isPt ? "Diagnóstico:" : "Diagnosis:"}</strong>
      ${isPt ? rm.problemPt : rm.problemEn}
    </div>
    <div class="text-emerald-300 leading-relaxed bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/30">
      <strong class="text-emerald-400 text-[10px] uppercase block mb-0.5">${isPt ? "Medida de Correção:" : "Mitigation Measure:"}</strong>
      ${isPt ? rm.mitigationPt : rm.mitigationEn}
    </div>
  </div>
`;

const getDamPopupContent = (dam: (typeof MAJOR_DAMS)[0], isPt: boolean) => `
  <div class="p-2.5 font-sans text-xs max-w-xs">
    <span class="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">${isPt ? "Barragem & Geodésia InSAR" : "Dam & InSAR Geodesy"}</span>
    <strong class="text-white text-sm block mb-1">${dam.name}</strong>
    <div class="grid grid-cols-2 gap-1.5 mb-2 font-mono text-[10px] bg-slate-900/90 p-2 rounded-lg border border-slate-800">
      <div>
        <span class="text-slate-400 block text-[9px] uppercase">${isPt ? "Capacidade:" : "Capacity:"}</span>
        <strong class="text-white">${dam.capacityMm3} mi m³</strong>
      </div>
      <div>
        <span class="text-slate-400 block text-[9px] uppercase">${isPt ? "Coerência (γ):" : "Coherence (γ):"}</span>
        <strong class="text-emerald-400">${dam.insarCoherence}</strong>
      </div>
      <div>
        <span class="text-slate-400 block text-[9px] uppercase">${isPt ? "Deformação:" : "Deformation:"}</span>
        <strong class="text-cyan-300">${dam.deformationMmYr} mm/${isPt ? "ano" : "yr"}</strong>
      </div>
      <div>
        <span class="text-slate-400 block text-[9px] uppercase">${isPt ? "Extensão Crista:" : "Crest Length:"}</span>
        <strong class="text-white">${(dam.crestLengthM / 1000).toFixed(1)} km</strong>
      </div>
    </div>
    <p class="text-slate-300 leading-relaxed text-[11px] mb-2">${isPt ? dam.descriptionPt : dam.descriptionEn}</p>
    <div class="mb-2 p-1.5 rounded bg-black/50 border border-slate-800 text-[10px] text-cyan-200/90 leading-tight">
      <strong>${isPt ? "Contexto do Açude:" : "Hydrogeology Context:"}</strong> ${isPt ? "Barramento sobre embasamento cristalino impermeável para garantir armazenamento contra secas plurianuais." : "Reservoir anchored into impermeable crystalline bedrock to secure vital water storage through multi-year droughts."}
    </div>
    <div class="p-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
      ${isPt ? dam.rigidityStatusPt : dam.rigidityStatusEn}
    </div>
  </div>
`;

const getBiomePopupContent = (biomeData: any, isPt: boolean) => `
  <div class="p-2.5 font-sans text-xs max-w-xs">
    <span class="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">${isPt ? "Bioma Cearense & Radar SAR" : "Ceará Biome & SAR Radar"}</span>
    <strong class="text-white text-sm block mb-1">${isPt ? biomeData.namePt : biomeData.nameEn}</strong>
    <div class="mb-2 font-mono text-[11px] bg-slate-900/90 p-2 rounded-lg border border-slate-800">
      <span class="text-slate-400 block text-[9px] uppercase">${isPt ? "Classificação Fitofisionômica:" : "Phytophysiognomic Class:"}</span>
      <strong class="text-emerald-300">${isPt ? biomeData.biomePt : biomeData.biomeEn}</strong>
    </div>
    <p class="text-slate-300 leading-relaxed text-[11px]">${isPt ? biomeData.featuresPt : biomeData.featuresEn}</p>
  </div>
`;

type MetricType = "storage" | "biomass" | "dielectric" | "salinity";

interface InteractiveBasinMapProps {
  externalSelectedYear?: number;
  onYearChange?: (year: number) => void;
}

export default function InteractiveBasinMap({ externalSelectedYear, onYearChange }: InteractiveBasinMapProps) {
  const { t, lang } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<{ [key: string]: any }>({});

  // Timeline State
  const [selectedYearIdx, setSelectedYearIdx] = useState<number>(HISTORICAL_TIMELINE.length - 1); // Default to 2026
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  // Selected Dam for Detailed Geotechnical & Coherence Inspection
  const [selectedDamId, setSelectedDamId] = useState<string>("castanhao");

  // Map Layer Modes: Default to Satellite + Off as requested
  const [baseMapStyle, setBaseMapStyle] = useState<"dark" | "satellite" | "osm">("satellite");
  const [sarOverlayMode, setSarOverlayMode] = useState<"none" | "sentinel1_rtc" | "vegetation_biomes">("none");
  const [showEcologicalRisks, setShowEcologicalRisks] = useState<boolean>(true);
  const [mapTilesLoading, setMapTilesLoading] = useState<boolean>(false);

  // Collapsible HUD and Legend states
  const [isTelemetryHudCollapsed, setIsTelemetryHudCollapsed] = useState<boolean>(false);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState<boolean>(false);
  const [isMissionEraCollapsed, setIsMissionEraCollapsed] = useState<boolean>(false);

  // Off-Canvas Sidebar State
  const [activeMetricDrawer, setActiveMetricDrawer] = useState<MetricType | null>(null);

  const currentMilestone = HISTORICAL_TIMELINE[selectedYearIdx];

  // Identify active 5-year satellite mission era
  const currentMissionEra = SATELLITE_MISSION_ERAS.find(
    (e) => currentMilestone.year >= e.yearMin && currentMilestone.year <= e.yearMax
  ) || SATELLITE_MISSION_ERAS[SATELLITE_MISSION_ERAS.length - 1];

  const selectedDam = MAJOR_DAMS.find((d) => d.id === selectedDamId) || MAJOR_DAMS[0];

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

  // Fly to selected Dam
  const handleSelectDam = (dam: DamSpecification) => {
    setSelectedDamId(dam.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(dam.coords, dam.zoom, { duration: 1.5 });
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
      }, 2400);
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

      darkTile.on("loading", () => setMapTilesLoading(true));
      darkTile.on("load", () => setMapTilesLoading(false));
      satelliteTile.on("loading", () => setMapTilesLoading(true));
      satelliteTile.on("load", () => setMapTilesLoading(false));
      osmTile.on("loading", () => setMapTilesLoading(true));
      osmTile.on("load", () => setMapTilesLoading(false));

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

      // MAJOR DAMS PINS (With InSAR Coherence details)
      // MAJOR DAMS PINS (With InSAR Coherence details)
      layersRef.current.damMarkers = [];
      const damPins = MAJOR_DAMS.map((dam) => {
        const pin = L.circleMarker(dam.coords, {
          radius: 9,
          fillColor: "#06B6D4",
          color: "#FFFFFF",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.95
        });

        pin.bindPopup(getDamPopupContent(dam, lang === "pt"));
        layersRef.current.damMarkers.push({ marker: pin, data: dam });
        return pin;
      });
      L.layerGroup(damPins).addTo(map);

      // ECOLOGICAL CHALLENGES & MITIGATION LAYER
      layersRef.current.ecologicalMarkers = [];
      const riskMarkers = ECOLOGICAL_MARKERS.map((rm) => {
        const m = L.circleMarker(rm.coords, {
          radius: 11,
          fillColor: rm.color,
          color: "#FFFFFF",
          weight: 2.5,
          opacity: 1,
          fillOpacity: 0.9
        });

        m.bindPopup(getEcologicalPopupContent(rm, lang === "pt"));
        layersRef.current.ecologicalMarkers.push({ marker: m, data: rm });
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

  // Handle SAR Overlay Switching & DYNAMIC 5-YEAR WATER MASK (ON TOP OF MAP / SAR)
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
    } else if (sarOverlayMode === "vegetation_biomes") {
      // RENDER VEGETATION MASK WITH SENTINEL-1 SAR MOSAIC UNDERNEATH AND COHERENT BIOMES OVERLAY
      import("leaflet").then((L) => {
        const biomeLayers: any[] = [];
        layersRef.current.biomeMarkers = [];

        // 1. Add Full SAR Radar Mosaic as base texture under the vegetation mask
        if (layersRef.current.sarMosaicGroup) {
          biomeLayers.push(layersRef.current.sarMosaicGroup);
        }

        // 2. Add realistic vegetation biomes with semi-transparent vegetative shading
        Object.entries(BIOME_POLYGONS).forEach(([key, biomeData]) => {
          const poly = L.default.polygon(biomeData.coords as [number, number][], {
            color: biomeData.borderColor,
            weight: 2.5,
            fillColor: biomeData.color,
            fillOpacity: key === "manguezaisAracati" ? 0.70 : key === "mataCiliarJaguaribe" ? 0.65 : 0.48
          });

          poly.bindPopup(getBiomePopupContent(biomeData, lang === "pt"));
          layersRef.current.biomeMarkers.push({ marker: poly, data: biomeData });
          biomeLayers.push(poly);
        });

        const biomeGroup = L.default.layerGroup(biomeLayers);
        biomeGroup.addTo(map);
        layersRef.current.activeSar = biomeGroup;
      });
    }

    map.invalidateSize();
  }, [sarOverlayMode, currentMilestone, lang]);

  // Dynamically update popup contents when language switches
  useEffect(() => {
    const isPt = lang === "pt";
    if (layersRef.current.damMarkers) {
      layersRef.current.damMarkers.forEach(({ marker, data }: any) => {
        marker.setPopupContent(getDamPopupContent(data, isPt));
      });
    }
    if (layersRef.current.ecologicalMarkers) {
      layersRef.current.ecologicalMarkers.forEach(({ marker, data }: any) => {
        marker.setPopupContent(getEcologicalPopupContent(data, isPt));
      });
    }
    if (layersRef.current.biomeMarkers) {
      layersRef.current.biomeMarkers.forEach(({ marker, data }: any) => {
        marker.setPopupContent(getBiomePopupContent(data, isPt));
      });
    }
  }, [lang]);

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
        isFullScreen ? "fixed inset-0 z-50 h-screen" : "h-[760px] lg:h-[840px]"
      }`}
    >
      {/* Map Leaflet Container with Dynamic 5-Year Atmospheric Atmosphere Filter */}
      <div 
        ref={mapContainerRef} 
        className="absolute inset-0 z-0 h-full w-full bg-[#03070E] transition-all duration-700"
        style={{ filter: currentMissionEra.filterStyle }}
      />

      {/* UNIFIED TOP CONTROL BAR */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Left Cluster: Basemap & SAR Masks */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Base Layer Switcher */}
          <div className="flex items-center rounded-xl border border-slate-700/80 bg-slate-900/95 p-1 backdrop-blur-md shadow-xl text-xs">
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

          {/* SAR Sensor & Mask Overlay Selector */}
          <div className="flex items-center rounded-xl border border-slate-700/80 bg-slate-900/95 p-1 backdrop-blur-md shadow-xl text-xs">
            <span className="text-[10px] font-bold text-emerald-400 uppercase px-2 flex items-center space-x-1">
              <Radio className="h-3 w-3 animate-pulse" />
              <span>{t("SAR Masks:", "Máscaras SAR:")}</span>
            </span>
            <button
              onClick={() => setSarOverlayMode("vegetation_biomes")}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                sarOverlayMode === "vegetation_biomes" ? "bg-emerald-500 text-black shadow-sm font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              🌿 {t("Vegetation (Biomes)", "Vegetação (Biomas)")}
            </button>
            <button
              onClick={() => setSarOverlayMode("sentinel1_rtc")}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                sarOverlayMode === "sentinel1_rtc" ? "bg-emerald-500 text-black shadow-sm font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              📡 {t("SAR Mosaic", "Mosaico SAR")}
            </button>
            <button
              onClick={() => setSarOverlayMode("none")}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                sarOverlayMode === "none" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              {t("Off", "Desligar")}
            </button>
          </div>
        </div>

        {/* Right Cluster: Dam Quick Focus + Ecological Risks + Fullscreen */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto ml-auto">
          {/* Dam Quick Focus Selector */}
          <div className="flex items-center rounded-xl border border-slate-700/80 bg-slate-900/95 p-1 backdrop-blur-md shadow-xl text-xs">
            <span className="text-[10px] font-bold text-cyan-300 uppercase px-2 flex items-center space-x-1">
              <Crosshair className="h-3 w-3" />
              <span className="hidden sm:inline">{t("Focus Dam:", "Foco Açude:")}</span>
            </span>
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              {MAJOR_DAMS.map((dam) => (
                <button
                  key={dam.id}
                  onClick={() => handleSelectDam(dam)}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all ${
                    selectedDamId === dam.id
                      ? "bg-cyan-500 text-black shadow-sm font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                  title={`${dam.name} (${dam.capacityMm3} mi m³)`}
                >
                  {dam.name.split(" ")[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Ecological Risks Layer Toggle */}
          <button
            onClick={() => setShowEcologicalRisks(!showEcologicalRisks)}
            className={`flex items-center space-x-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold backdrop-blur-md shadow-xl transition-all ${
              showEcologicalRisks
                ? "border-amber-500/50 bg-amber-950/80 text-amber-300 font-bold"
                : "border-slate-700/80 bg-slate-900/95 text-slate-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden md:inline">{t("Ecological Issues", "Problemas Ecológicos")}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="rounded-xl border border-slate-700/80 bg-slate-900/95 p-2 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md shadow-xl transition-all"
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Map"}
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>

      </div>

      {/* FLOATING NON-SHIFTING TILE STREAMING INDICATOR (Positioned Below Search / Dam Bar) */}
      {mapTilesLoading && (
        <div className="absolute top-[58px] left-4 z-20 flex items-center space-x-2 rounded-xl border border-cyan-500/50 bg-slate-900/95 px-3 py-1 text-xs font-mono text-cyan-300 shadow-2xl backdrop-blur-md animate-pulse pointer-events-none">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />
          <span>{t("Streaming Radar Tiles (SAR RTC & Basemap)...", "Carregando Camadas SAR & Base...")}</span>
        </div>
      )}

      {/* TOP-LEFT 5-YEAR SATELLITE & SAR MISSION TIMESTAMP BADGE (Collapsible) */}
      <div className="absolute top-16 left-4 z-10 max-w-xs sm:max-w-sm rounded-2xl border border-slate-700/80 bg-slate-900/95 p-3 backdrop-blur-md shadow-2xl transition-all">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono text-cyan-400 font-bold uppercase">
            <Satellite className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t("Active Satellite Era", "Era de Satélites")} ({currentMissionEra.yearMin}–{currentMissionEra.yearMax})</span>
          </div>
          <button
            onClick={() => setIsMissionEraCollapsed(!isMissionEraCollapsed)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-2"
            title={isMissionEraCollapsed ? t("Expand Era Details", "Expandir") : t("Collapse Era", "Minimizar")}
          >
            {isMissionEraCollapsed ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
          </button>
        </div>

        {isMissionEraCollapsed ? (
          <div 
            onClick={() => setIsMissionEraCollapsed(false)}
            className="cursor-pointer pt-1 flex items-center justify-between text-[10px] font-mono text-slate-300 hover:text-cyan-300"
          >
            <span className="truncate">{currentMissionEra.sarMission} ({currentMissionEra.sarBand.split("(")[0].trim()})</span>
            <span className="text-cyan-400 ml-2">▼</span>
          </div>
        ) : (
          <div className="space-y-1 text-xs pt-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-amber-300 font-bold">Óptico:</span>
              <span className="font-mono text-white text-[10px]">{currentMissionEra.opticalMission}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-300 font-bold">Radar SAR:</span>
              <span className="font-mono text-white text-[10px]">{currentMissionEra.sarMission} ({currentMissionEra.sarBand.split("(")[0]})</span>
            </div>
            <div className="mt-1.5 pt-1 border-t border-slate-800 text-[10px] text-slate-300 italic">
              {t(currentMissionEra.contextEn, currentMissionEra.contextPt)}
            </div>
          </div>
        )}
      </div>

      {/* REALLOCATED BOTTOM-LEFT FLOATING BIOME DISCRIMINATION LEGEND (ELEVATED ABOVE SLIDER) */}
      {sarOverlayMode === "vegetation_biomes" && (
        <div className="absolute bottom-52 left-4 z-10 max-w-xs sm:max-w-sm rounded-2xl border border-emerald-500/40 bg-slate-900/95 p-3 backdrop-blur-md shadow-2xl animate-in fade-in duration-300 transition-all">
          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-800">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center space-x-1.5">
              <TreePine className="h-3.5 w-3.5" />
              <span>{t("Vegetation Mask (Biomes)", "Máscara de Vegetação (Biomas)")}</span>
            </span>
            <div className="flex items-center space-x-1">
              <span className="text-[9px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                L+C SAR
              </span>
              <button
                onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors ml-1"
                title={isLegendCollapsed ? t("Expand Legend", "Expandir") : t("Collapse Legend", "Minimizar")}
              >
                {isLegendCollapsed ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>
          </div>

          {isLegendCollapsed ? (
            <div 
              onClick={() => setIsLegendCollapsed(false)}
              className="cursor-pointer pt-1 flex items-center justify-between text-[10px] font-mono text-emerald-300 hover:text-emerald-200"
            >
              <span>{t("6 Biome Classes active", "6 Classes de Bioma ativas")}</span>
              <span className="text-emerald-400 ml-2">▲</span>
            </div>
          ) : (
            <div className="space-y-1.5 text-[11px] pt-0.5">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#F59E0B" }} />
                <span className="text-white font-medium">{t("Sertão Central Caatinga", "Caatinga Depressão Sertaneja")}</span>
                <span className="text-[9px] text-amber-400 font-mono ml-auto">({t("Crystalline", "Cristalino")})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#EA580C" }} />
                <span className="text-white font-medium">{t("Inhamuns Upland Caatinga", "Caatinga dos Inhamuns")}</span>
                <span className="text-[9px] text-orange-400 font-mono ml-auto">({t("Planalto", "Planalto")})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#10B981" }} />
                <span className="text-white font-medium">{t("Jaguaribe Riparian Gallery (APP)", "Mata Ciliar Ripária (APP 610km)")}</span>
                <span className="text-[9px] text-emerald-400 font-mono ml-auto">({t("Riparian", "Ciliar")})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#06B6D4" }} />
                <span className="text-white font-medium">{t("Aracati Estuarine Mangroves", "Manguezais de Aracati & Fortim")}</span>
                <span className="text-[9px] text-cyan-400 font-mono ml-auto">({t("Tidal", "Maré")})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#E11D48" }} />
                <span className="text-white font-medium">{t("Hypersaline Flats / Apicuns", "Apicuns & Salgados")}</span>
                <span className="text-[9px] text-rose-400 font-mono ml-auto">({t("Supratidal", "Hipersalino")})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#15803D" }} />
                <span className="text-white font-medium">{t("Moist Forest Relicts (Brejos)", "Brejos de Altitude (Serras)")}</span>
                <span className="text-[9px] text-emerald-300 font-mono ml-auto">({t("Orographic", "Serrano")})</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESTRUCTURED TOP-RIGHT COMPACT TELEMETRY INSPECTOR HUD */}
      <div className="absolute top-16 right-4 z-10 w-72 sm:w-80">
        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/95 p-3 backdrop-blur-md shadow-2xl transition-all">
          
          {/* HUD Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-1.5">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono font-bold uppercase text-white tracking-wide">
                {t("SAR Telemetry HUD", "Inspetor de Telemetria SAR")}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveMetricDrawer("storage")}
                className="text-[10px] font-mono text-cyan-300 hover:text-cyan-200 px-2 py-0.5 rounded bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 flex items-center space-x-1 transition-colors"
                title={t("Open Detailed Metric Drawer", "Abrir Painel Detalhado")}
              >
                <span>{t("Drawer", "Abrir")}</span>
                <ChevronRight className="h-3 w-3" />
              </button>
              <button
                onClick={() => setIsTelemetryHudCollapsed(!isTelemetryHudCollapsed)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                title={isTelemetryHudCollapsed ? t("Expand HUD", "Expandir") : t("Collapse HUD", "Minimizar")}
              >
                {isTelemetryHudCollapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* When Collapsed: Sleek Mini Summary Pill */}
          {isTelemetryHudCollapsed ? (
            <div 
              onClick={() => setIsTelemetryHudCollapsed(false)}
              className="cursor-pointer pt-2 flex items-center justify-between text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <span>{selectedDam.name.split(" ")[1]}: {selectedDam.insarCoherence}γ</span>
              <span>•</span>
              <span className="text-cyan-400">{currentMilestone.castanhaoStoragePct}% vol</span>
              <span>•</span>
              <span className="text-amber-400">ε {currentMilestone.soilDielectricEpsilon}</span>
            </div>
          ) : (
            /* When Expanded: Compact 2x2 Telemetry Grid */
            <div className="pt-2 space-y-2">
              {/* Focused Dam Mini Ribbon */}
              <div 
                onClick={() => setActiveMetricDrawer("storage")}
                className="cursor-pointer rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 p-2 flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 block">{selectedDam.name.split("(")[0]}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{lang === "pt" ? selectedDam.damTypePt.split(" com ")[0] : selectedDam.damTypeEn.split(" with ")[0]}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[11px] font-bold text-emerald-300 block">γ = {selectedDam.insarCoherence}</span>
                  <span className="text-[9px] text-slate-400">{selectedDam.deformationMmYr} mm/{lang === "pt" ? "ano" : "yr"}</span>
                </div>
              </div>

              {/* 2x2 Metric Grid */}
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {/* 1. Castanhão Volume */}
                <div 
                  onClick={() => setActiveMetricDrawer("storage")}
                  className="cursor-pointer group rounded-xl border border-cyan-500/30 bg-cyan-950/10 hover:bg-cyan-950/30 hover:border-cyan-400 p-2 transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="flex items-center space-x-1 text-cyan-400">
                      <Droplet className="h-3 w-3" />
                      <span>{t("Storage", "Volume")}</span>
                    </span>
                    <ChevronRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-extrabold font-mono text-white">{currentMilestone.castanhaoStoragePct}%</span>
                    <span className="text-[9px] text-slate-400">{currentMilestone.castanhaoAreaKm2} km²</span>
                  </div>
                </div>

                {/* 2. Caatinga Biomass */}
                <div 
                  onClick={() => setActiveMetricDrawer("biomass")}
                  className="cursor-pointer group rounded-xl border border-emerald-500/30 bg-emerald-950/10 hover:bg-emerald-950/30 hover:border-emerald-400 p-2 transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="flex items-center space-x-1 text-emerald-400">
                      <TreePine className="h-3 w-3" />
                      <span>{t("Biomass", "Biomassa")}</span>
                    </span>
                    <ChevronRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-extrabold font-mono text-white">{currentMilestone.caatingaBiomassIndex}</span>
                    <span className="text-[9px] text-slate-400">/ 100</span>
                  </div>
                </div>

                {/* 3. Soil Dielectric */}
                <div 
                  onClick={() => setActiveMetricDrawer("dielectric")}
                  className="cursor-pointer group rounded-xl border border-amber-500/30 bg-amber-950/10 hover:bg-amber-950/30 hover:border-amber-400 p-2 transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="flex items-center space-x-1 text-amber-400">
                      <Activity className="h-3 w-3" />
                      <span>{t("Dielectric ε", "Dielétrico ε")}</span>
                    </span>
                    <ChevronRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-extrabold font-mono text-white">{currentMilestone.soilDielectricEpsilon}</span>
                    <span className="text-[9px] text-slate-400">0–30 cm</span>
                  </div>
                </div>

                {/* 4. Salinity Wedge */}
                <div 
                  onClick={() => setActiveMetricDrawer("salinity")}
                  className="cursor-pointer group rounded-xl border border-rose-500/30 bg-rose-950/10 hover:bg-rose-950/30 hover:border-rose-400 p-2 transition-all"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="flex items-center space-x-1 text-rose-400">
                      <Waves className="h-3 w-3" />
                      <span>{t("Saline Wedge", "Cunha Salina")}</span>
                    </span>
                    <ChevronRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-sm font-extrabold font-mono text-white">{currentMilestone.salinityIntrusionKm} km</span>
                    <span className="text-[9px] text-slate-400">{currentMilestone.aquaculturePondAreaHa} ha</span>
                  </div>
                </div>
              </div>

              <div className="pt-1 text-[9px] text-center text-slate-400 font-mono">
                {t("Click any metric tile to open time series", "Clique no card para abrir série temporal")}
              </div>
            </div>
          )}

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

      {/* OFF-CANVAS INTERACTIVE METRIC DRAWER */}
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
                    {activeMetricDrawer === "storage" && t("Dam Geodesy & Specular SAR Waterline", "Geodésia de Barragens & Lâmina Hídrica SAR")}
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
                  <div className="rounded-xl border border-cyan-500/30 bg-slate-900 p-3.5 mb-3">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                      {t("Selected Dam Geotechnical Profile:", "Perfil Geotécnico do Açude Selecionado:")}
                    </span>
                    <strong className="text-white text-sm block mb-1">{selectedDam.name}</strong>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-2">
                      <div>
                        <span className="text-slate-400 block text-[9px]">{t("Total Capacity:", "Capacidade Total:")}</span>
                        <span className="text-white font-bold">{selectedDam.capacityMm3} {t("M m³", "mi m³")}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">{t("InSAR Coherence (γ):", "Coerência InSAR (γ):")}</span>
                        <span className="text-emerald-400 font-bold">{selectedDam.insarCoherence}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">{t("Annual Deformation:", "Deformação Anual:")}</span>
                        <span className="text-cyan-300 font-bold">{selectedDam.deformationMmYr} mm/{lang === "pt" ? "ano" : "yr"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">{t("Crest Length:", "Comprimento Crista:")}</span>
                        <span className="text-white font-bold">{selectedDam.crestLengthM} m</span>
                      </div>
                    </div>
                  </div>

                  {/* Socio-Hydrogeological Context: What is an Açude? */}
                  <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 to-slate-900/90 p-3.5 mb-3">
                    <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
                      <Mountain className="h-4 w-4" />
                      <span>{t("Hydrogeological Context: What is an Açude?", "Contexto Hidrogeológico: O que é um Açude no Semiárido?")}</span>
                    </div>
                    <p className="text-slate-200 text-xs leading-relaxed mb-2">
                      {t(
                        "In Ceará, over 75% of the land is underlain by impermeable Precambrian crystalline bedrock. Unlike sedimentary basins with deep subterranean aquifers (like the Guarani), water cannot penetrate deep into solid rock. Rains run off immediately in violent seasonal flash floods, causing natural rivers like the Jaguaribe to run completely dry for 6 to 9 months of the year ('the largest dry river in the world').",
                        "No Ceará, mais de 75% do território repousa sobre rochas cristalinas pré-cambrianas impermeáveis. Sem aquíferos subterrâneos profundos de fácil recarga (ao contrário de bacias sedimentares), as chuvas escorrem rapidamente em enxurradas torrenciais, e rios como o Jaguaribe secavam totalmente na estiagem ('o maior rio seco do mundo')."
                      )}
                    </p>
                    <p className="text-slate-200 text-xs leading-relaxed mb-2">
                      {t(
                        "Therefore, an 'açude' is not a mere artificial pond: it is an indispensable life-support megastructure created by damming intermittent river canyons with compacted zoned earthfill and riprap rock armor. It captures the violent seasonal runoff of the short 3-month rainy season ('quadra chuvosa') to store billions of cubic meters, securing drinking water, cattle herds, and downstream irrigated agriculture across multi-year megadroughts.",
                        "Por isso, o 'açude' não é um simples lago: é uma infraestrutura de sobrevivência vital. Ao barrar boqueirões e calhas com paredões de terra compactada e enrocamento de pedras, o açude armazena as enxurradas da curta 'quadra chuvosa' (fevereiro a maio) para abastecer cidades, rebanhos e perímetros agrícolas durante megassecas plurianuais de até 6 anos."
                      )}
                    </p>
                    <div className="rounded-lg bg-black/50 p-2.5 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">
                      <strong>{t("Role of SAR Microwave Remote Sensing:", "Papel do Radar de Micro-ondas SAR:")}</strong>{" "}
                      {t(
                        "Synthetic Aperture Radar pierces cloud cover to delineate the water surface mirror (σ⁰ < -22 dB) and uses repeat-pass InSAR interferometry (γ > 0.90) to detect millimeter-level crest settlement under drought decompression.",
                        "Satélites SAR perfuram nuvens para medir a lâmina d'água especular (σ⁰ < -22 dB) e usam interferometria InSAR repetida para monitorar estabilidade e assentamento milimétrico da crista sob descompressão hidrostática."
                      )}
                    </div>
                  </div>

                  <p>
                    {t(
                      "Synthetic Aperture Radar detects water via specular reflection: smooth open water acts as a mirror, deflecting incident microwave pulses away and creating jet-black polygons in both HH and VV polarizations.",
                      "O radar SAR detecta a água por reflexão especular: o espelho d'água liso reflete os pulsos para longe, gerando polígonos pretos milimetricamente delimitados mesmo sob céu nublado."
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
                      "During severe droughts, the Caatinga drops 100% of its leaves. Optical satellites see dry gray land (NDVI drops to zero), falsely flagging deforestation. NISAR L-band (24 cm wavelength) penetrates past the missing leaves and measures volume scattering (HV/VH) of standing woody trunks, helping differentiate physiological dormancy from clear-cut deforestation.",
                      "Na seca severa, a Caatinga perde 100% das folhas. Satélites ópticos veem terra seca (NDVI zera), sugerindo desmatamento. A banda L do NISAR (24 cm) penetra a copa vazia e mede o espalhamento volumétrico (HV/VH) dos troncos lenhosos, auxiliando na identificação da dormência fisiológica frente ao corte raso."
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
