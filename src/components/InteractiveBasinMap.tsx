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
  Maximize2
} from "lucide-react";

interface YearData {
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

const HISTORICAL_TIMELINE: YearData[] = [
  {
    year: 1985,
    label: "1985 - Baseline",
    castanhaoStoragePct: 88,
    castanhaoAreaKm2: 310,
    caatingaBiomassIndex: 92,
    soilDielectricEpsilon: 14.2,
    aquaculturePondAreaHa: 120,
    estuarineBiologicalLoad: "Low",
    salinityIntrusionKm: 4.5,
    climateContextEn: "Pre-dam baseline: Natural seasonal flooding. Minimal estuarine biological load.",
    climateContextPt: "Marco zero pré-barramento: Pulso natural de inundações. Carga biológica mínima na foz."
  },
  {
    year: 2000,
    label: "2000 - Castanhão Construction",
    castanhaoStoragePct: 74,
    castanhaoAreaKm2: 275,
    caatingaBiomassIndex: 86,
    soilDielectricEpsilon: 12.1,
    aquaculturePondAreaHa: 890,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 9.0,
    climateContextEn: "Dam completion begins regulating downstream flow. Initial aquaculture expansion in Aracati.",
    climateContextPt: "Conclusão das obras do Castanhão. Expansão inicial da atividade de carcinicultura em Aracati."
  },
  {
    year: 2012,
    label: "2012 - Onset of Megadrought",
    castanhaoStoragePct: 42,
    castanhaoAreaKm2: 195,
    caatingaBiomassIndex: 71,
    soilDielectricEpsilon: 7.8,
    aquaculturePondAreaHa: 2300,
    estuarineBiologicalLoad: "Elevated",
    salinityIntrusionKm: 18.5,
    climateContextEn: "Beginning of Northeast Brazil's historic multi-year megadrought. Gates start restricting flow.",
    climateContextPt: "Início da histórica megasseca plurianual do Nordeste. Restrição progressiva da vazão fluvial."
  },
  {
    year: 2016,
    label: "2016 - Peak Megadrought Crisis",
    castanhaoStoragePct: 5,
    castanhaoAreaKm2: 38,
    caatingaBiomassIndex: 48,
    soilDielectricEpsilon: 3.4,
    aquaculturePondAreaHa: 3100,
    estuarineBiologicalLoad: "Critical",
    salinityIntrusionKm: 32.0,
    climateContextEn: "Reservoir collapsed to 5%. Marine salt wedge penetrated 32 km upstream. High organic concentration.",
    climateContextPt: "Colapso do Castanhão para 5%. Cunha salina oceânica avançou 32 km rio acima. Alta carga biológica."
  },
  {
    year: 2020,
    label: "2020 - Partial Hydrological Recovery",
    castanhaoStoragePct: 18,
    castanhaoAreaKm2: 110,
    caatingaBiomassIndex: 68,
    soilDielectricEpsilon: 8.9,
    aquaculturePondAreaHa: 3420,
    estuarineBiologicalLoad: "Elevated",
    salinityIntrusionKm: 21.0,
    climateContextEn: "Gradual recovery of seasonal rains. Structural consolidation of aquaculture parks.",
    climateContextPt: "Retomada gradual de chuvas. Consolidação estrutural dos polos aquícolas em Aracati."
  },
  {
    year: 2024,
    label: "2024 - Active Monitoring",
    castanhaoStoragePct: 33,
    castanhaoAreaKm2: 188,
    caatingaBiomassIndex: 79,
    soilDielectricEpsilon: 11.5,
    aquaculturePondAreaHa: 3640,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 14.0,
    climateContextEn: "NISAR deployment window: Advanced dual-frequency L & S-band monitoring of biomass & moisture.",
    climateContextPt: "Janela NISAR: Monitoramento avançado em Banda L e S de biomassa e umidade profunda."
  },
  {
    year: 2026,
    label: "2026 - Present / Operational",
    castanhaoStoragePct: 31,
    castanhaoAreaKm2: 180,
    caatingaBiomassIndex: 81,
    soilDielectricEpsilon: 11.2,
    aquaculturePondAreaHa: 3750,
    estuarineBiologicalLoad: "Moderate",
    salinityIntrusionKm: 15.5,
    climateContextEn: "Current state: Continuous Sentinel-1 & NISAR multi-polarimetric surveillance of water & mangroves.",
    climateContextPt: "Estado atual: Vigilância contínua Sentinel-1 e NISAR por radar polarimétrico na bacia."
  }
];

export default function InteractiveBasinMap() {
  const { lang, t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<any>({});

  const [currentYearIndex, setCurrentYearIndex] = useState<number>(6); // Default 2026
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mapStyle, setMapStyle] = useState<"satellite" | "dark" | "streets">("satellite");
  const [activeOverlays, setActiveOverlays] = useState({
    basinRiver: true,
    states: true,
    reservoirs: true,
    mangroveZone: true,
    urbanFootprints: true
  });

  const currentData = HISTORICAL_TIMELINE[currentYearIndex];

  // Auto-play timer for time slider
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentYearIndex((prev) => (prev + 1) % HISTORICAL_TIMELINE.length);
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Leaflet map initialization
  useEffect(() => {
    if (!mapContainerRef.current) return;
    let isMounted = true;

    // Dynamically load leaflet
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Center around Ceará / Jaguaribe basin: lat -5.2, lon -38.6
      const map = L.map(mapContainerRef.current, {
        center: [-5.15, -38.65],
        zoom: 7,
        minZoom: 6,
        maxZoom: 13,
        zoomControl: false,
      });
      mapInstanceRef.current = map;

      // Add zoom control top right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Tile Layers
      const satelliteTile = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Tiles &copy; Esri &mdash; Earthstar Geographics" }
      );
      const darkTile = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { attribution: "&copy; OpenStreetMap contributors &copy; CARTO" }
      );
      const streetsTile = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "&copy; OpenStreetMap contributors" }
      );

      // Save references
      layersRef.current.satellite = satelliteTile;
      layersRef.current.dark = darkTile;
      layersRef.current.streets = streetsTile;

      // Apply initial style
      if (mapStyle === "satellite") satelliteTile.addTo(map);
      else if (mapStyle === "dark") darkTile.addTo(map);
      else streetsTile.addTo(map);

      // 1. State Boundaries (Ceará, RN, PB, PE, PI)
      const ceBorder = [
        [-2.8, -40.8], [-2.9, -40.0], [-3.7, -38.5], [-4.4, -37.3], // Coast
        [-5.0, -37.2], [-6.0, -37.5], [-6.5, -38.5], // Border with RN & PB
        [-7.5, -39.0], [-7.5, -40.5], // Border with PE
        [-6.5, -40.8], [-5.0, -41.2], [-3.5, -41.4], [-2.8, -40.8]  // Border with PI
      ];
      const statePolygon = L.polygon(ceBorder as [number, number][], {
        color: "#00E5FF",
        weight: 1.5,
        fillColor: "#00E5FF",
        fillOpacity: 0.04,
        dashArray: "4, 4"
      }).addTo(map);
      statePolygon.bindTooltip("ESTADO DO CEARÁ (CE)", { permanent: true, direction: "center", className: "bg-transparent text-cyan-300 font-extrabold text-xs border-0 shadow-none tracking-widest" });

      // Surrounding State Labels
      L.marker([-5.8, -36.5], { icon: L.divIcon({ html: '<span class="text-slate-400 font-bold text-[11px] tracking-wider uppercase">Rio Grande do Norte (RN)</span>', className: 'text-center' }) }).addTo(map);
      L.marker([-7.2, -37.2], { icon: L.divIcon({ html: '<span class="text-slate-400 font-bold text-[11px] tracking-wider uppercase">Paraíba (PB)</span>', className: 'text-center' }) }).addTo(map);
      L.marker([-8.2, -39.5], { icon: L.divIcon({ html: '<span class="text-slate-400 font-bold text-[11px] tracking-wider uppercase">Pernambuco (PE)</span>', className: 'text-center' }) }).addTo(map);
      L.marker([-5.5, -42.0], { icon: L.divIcon({ html: '<span class="text-slate-400 font-bold text-[11px] tracking-wider uppercase">Piauí (PI)</span>', className: 'text-center' }) }).addTo(map);

      // 2. The Jaguaribe River Polyline (from Inhamuns Tauá to Aracati Foz)
      const riverPath = [
        [-5.90, -40.29], // Inhamuns / Tauá (Nascente)
        [-6.02, -39.85], // Arneiroz
        [-6.25, -39.30], // Jucás
        [-6.36, -39.05], // Iguatu
        [-6.10, -38.92], // Açude Orós
        [-5.80, -38.65], // Solonópole
        [-5.50, -38.45], // Açude Castanhão
        [-5.25, -38.20], // Tabuleiro do Norte
        [-5.14, -38.10], // Limoeiro do Norte
        [-4.94, -37.97], // Russas
        [-4.75, -37.85], // Jaguaruana
        [-4.56, -37.77], // Itaiçaba
        [-4.42, -37.76]  // Aracati & Fortim (Foz do Estuário no Atlântico)
      ];
      const riverLine = L.polyline(riverPath as [number, number][], {
        color: "#00F0FF",
        weight: 4,
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round"
      }).addTo(map);
      riverLine.bindPopup("<div class='p-1 font-sans'><strong class='text-cyan-400 text-sm'>Rio Jaguaribe</strong><p class='text-xs text-slate-300 mt-1'>Extensão de 610 km. Drena 50% do território do Ceará, conectando a Caatinga profunda ao estuário de manguezais.</p></div>");

      // 3. Urban Footprints (Cities in the Region)
      const cities = [
        { name: "Fortaleza (Capital)", coords: [-3.73, -38.52], size: "Metrópole", pop: "2.6M" },
        { name: "Aracati (Polo Aquícola & Foz)", coords: [-4.44, -37.77], size: "Pólo Estuarino", pop: "75k" },
        { name: "Iguatu (Médio Jaguaribe)", coords: [-6.36, -39.29], size: "Centro Regional", pop: "103k" },
        { name: "Tauá (Inhamuns - Nascente)", coords: [-5.90, -40.29], size: "Sertão Árido", pop: "61k" },
        { name: "Russas (Baixo Jaguaribe)", coords: [-4.94, -37.97], size: "Agrícola", pop: "79k" },
        { name: "Mossoró (RN - Leste)", coords: [-5.18, -37.34], size: "Pólo Salineiro", pop: "300k" },
        { name: "Sobral (Norte)", coords: [-3.68, -40.35], size: "Pólo Industrial", pop: "210k" },
      ];

      cities.forEach((city) => {
        const cityMarker = L.circleMarker(city.coords as [number, number], {
          radius: city.size.includes("Metrópole") ? 8 : 5,
          fillColor: "#F59E0B",
          color: "#FFFFFF",
          weight: 1.5,
          fillOpacity: 0.85
        }).addTo(map);
        cityMarker.bindTooltip(`<strong>${city.name}</strong><br><span class="text-xs text-slate-300">Pop: ${city.pop}</span>`, {
          direction: "top"
        });
      });

      // 4. Strategic Hotspots (Reservoirs & Estuary)
      // Castanhao Reservoir Circle
      const castanhaoCircle = L.circle([-5.50, -38.45], {
        radius: 12000,
        fillColor: "#0284C7",
        color: "#38BDF8",
        weight: 2,
        fillOpacity: 0.5
      }).addTo(map);
      castanhaoCircle.bindPopup("<div class='p-1 font-sans'><strong class='text-blue-400 text-sm'>Açude Castanhão</strong><p class='text-xs text-slate-300 mt-1'>Capacidade: 6,7 bilhões de m³. O maior reservatório de água doce da América do Sul.</p></div>");

      // Orós Reservoir Circle
      const orosCircle = L.circle([-6.10, -38.92], {
        radius: 8000,
        fillColor: "#0284C7",
        color: "#38BDF8",
        weight: 1.5,
        fillOpacity: 0.4
      }).addTo(map);
      orosCircle.bindPopup("<div class='p-1 font-sans'><strong class='text-blue-400 text-sm'>Açude Orós</strong><p class='text-xs text-slate-300 mt-1'>Capacidade: 1,9 bilhão de m³. Barramento central do Rio Jaguaribe.</p></div>");

      // Aracati Mangrove & Aquaculture Polygon
      const aracatiPolygon = L.polygon([
        [-4.38, -37.74],
        [-4.42, -37.82],
        [-4.52, -37.84],
        [-4.50, -37.72],
        [-4.40, -37.70]
      ], {
        color: "#F43F5E",
        fillColor: "#F43F5E",
        weight: 2,
        fillOpacity: 0.45
      }).addTo(map);
      aracatiPolygon.bindPopup("<div class='p-1 font-sans'><strong class='text-rose-400 text-sm'>Estuário de Aracati / Fortim</strong><p class='text-xs text-slate-300 mt-1'>Mais de 3.500 hectares de viveiros de carcinicultura instalados sobre mangues e apicuns.</p></div>");

    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer on style change
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current.satellite) return;
    const map = mapInstanceRef.current;
    
    // Remove all base tiles
    if (map.hasLayer(layersRef.current.satellite)) map.removeLayer(layersRef.current.satellite);
    if (map.hasLayer(layersRef.current.dark)) map.removeLayer(layersRef.current.dark);
    if (map.hasLayer(layersRef.current.streets)) map.removeLayer(layersRef.current.streets);

    // Add selected
    if (mapStyle === "satellite") layersRef.current.satellite.addTo(map);
    else if (mapStyle === "dark") layersRef.current.dark.addTo(map);
    else if (mapStyle === "streets") layersRef.current.streets.addTo(map);
  }, [mapStyle]);

  return (
    <section id="interactive-map" className="relative w-full border-b border-slate-800 bg-[#050B14]">
      
      {/* Top Banner & Quick Intro */}
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
              <Compass className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "16s" }} />
              <span>{t("Active Geospatial Command Center", "Centro de Comando Geoespacial Ativo")}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t("The Jaguaribe Corridor: ", "O Corredor do Rio Jaguaribe: ")}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400">
                {t("From Arid Caatinga to Tidal Mangroves", "Da Caatinga Árida aos Manguezais da Costa")}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {t(
                "Explore the regional map connecting the semi-arid headwaters (Tauá) through Brazil's largest reservoir (Castanhão Dam) to the coastal estuarine mangroves of Aracati. Use the timeline slider below to witness 40 years of climate stress, water retention, and aquaculture dynamics.",
                "Explore o mapa regional que conecta a nascente semiárida (Tauá) pelo maior açude do Brasil (Castanhão) até os manguezais estuarinos de Aracati. Utilize o slider temporal abaixo para acompanhar 40 anos de estresse climático, retenção hídrica e expansão aquícola."
              )}
            </p>
          </div>

          {/* Map Base Tile Style Selector */}
          <div className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/90 p-1.5 text-xs">
            <span className="text-slate-400 px-2 font-medium flex items-center space-x-1">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>{t("Base Layer:", "Mapa Base:")}</span>
            </span>
            <button
              onClick={() => setMapStyle("satellite")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                mapStyle === "satellite"
                  ? "bg-cyan-500 text-black font-bold shadow-sm"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {t("Satellite (Esri)", "Satélite (Esri)")}
            </button>
            <button
              onClick={() => setMapStyle("dark")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                mapStyle === "dark"
                  ? "bg-cyan-500 text-black font-bold shadow-sm"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {t("Dark Urban", "Urbano Dark")}
            </button>
            <button
              onClick={() => setMapStyle("streets")}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                mapStyle === "streets"
                  ? "bg-cyan-500 text-black font-bold shadow-sm"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {t("Streets", "Vias")}
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Box */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="relative h-[500px] sm:h-[620px] w-full rounded-2xl border border-slate-700 shadow-[0_0_35px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Leaflet DOM container */}
          <div ref={mapContainerRef} className="h-full w-full z-0" />

          {/* Floating Top Telemetry HUD Bar (Live Reactive Indicators) */}
          <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              
              {/* Card 1: Reservoir Water Volume */}
              <div className="rounded-xl border border-blue-500/40 bg-slate-950/90 p-3 backdrop-blur-md pointer-events-auto shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-blue-300 flex items-center space-x-1">
                    <Droplet className="h-3 w-3 text-blue-400" />
                    <span>{t("Castanhão Storage", "Volume Castanhão")}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-white">{currentData.castanhaoAreaKm2} km²</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
                    {currentData.castanhaoStoragePct}%
                  </span>
                  <span className="text-[10px] text-slate-400">{t("Useful capacity", "Capacidade útil")}</span>
                </div>
                {/* Visual bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-500"
                    style={{ width: `${currentData.castanhaoStoragePct}%` }}
                  />
                </div>
              </div>

              {/* Card 2: Caatinga Floral & Woody Biomass */}
              <div className="rounded-xl border border-emerald-500/40 bg-slate-950/90 p-3 backdrop-blur-md pointer-events-auto shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-emerald-300 flex items-center space-x-1">
                    <TreePine className="h-3 w-3 text-emerald-400" />
                    <span>{t("Caatinga Biomass Index", "Biomassa Caatinga")}</span>
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400">{t("L-band HV", "Banda L HV")}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                    {currentData.caatingaBiomassIndex}/100
                  </span>
                  <span className="text-[10px] text-slate-400">{t("Woody volume", "Volume lenhoso")}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full transition-all duration-500"
                    style={{ width: `${currentData.caatingaBiomassIndex}%` }}
                  />
                </div>
              </div>

              {/* Card 3: Deep Soil Dielectric Moisture */}
              <div className="rounded-xl border border-amber-500/40 bg-slate-950/90 p-3 backdrop-blur-md pointer-events-auto shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-amber-300 flex items-center space-x-1">
                    <Activity className="h-3 w-3 text-amber-400" />
                    <span>{t("Root-Zone Moisture", "Umidade Subsuperficial")}</span>
                  </span>
                  <span className="font-mono text-[10px] text-amber-300">&epsilon; dielectric</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                    {currentData.soilDielectricEpsilon}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {currentData.soilDielectricEpsilon < 6 ? t("Severe Deficit", "Déficit Severo") : t("Moist Substratum", "Substrato Úmido")}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-600 to-orange-400 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (currentData.soilDielectricEpsilon / 20) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Card 4: Estuarine Aquaculture & Marine Salinity Wedge */}
              <div className="rounded-xl border border-rose-500/40 bg-slate-950/90 p-3 backdrop-blur-md pointer-events-auto shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-rose-300 flex items-center space-x-1">
                    <Waves className="h-3 w-3 text-rose-400" />
                    <span>{t("Estuarine Aquaculture", "Aquicultura Estuarina")}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-rose-400">{currentData.aquaculturePondAreaHa} ha</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-200">
                    {t("Salt Wedge Intrusion:", "Cunha Salina:")} <strong className="text-rose-400 font-mono text-base">{currentData.salinityIntrusionKm} km</strong>
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    currentData.estuarineBiologicalLoad === "Critical" 
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" 
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  }`}>
                    {t(currentData.estuarineBiologicalLoad, currentData.estuarineBiologicalLoad)}
                  </span>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 truncate">
                  {t("Productive aquaculture & biological nutrient load", "Atividade produtiva & carga biológica estuarina")}
                </p>
              </div>

            </div>
          </div>

          {/* Floating Bottom Timeline Slider Controller */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/95 p-4 backdrop-blur-md shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-all font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    aria-label="Play/Pause Timeline"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 flex items-center space-x-1.5">
                      <Calendar className="h-3 w-3" />
                      <span>{t("Multidecadal SAR & Hydrological Timeline (1985 - 2026)", "Linha do Tempo Multidecadal SAR & Hidrologia (1985 - 2026)")}</span>
                    </span>
                    <h4 className="text-sm font-extrabold text-white">
                      {currentData.label}
                    </h4>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-300 max-w-md hidden md:block">
                  <p className="italic text-slate-300 bg-slate-900/80 rounded-lg px-3 py-1.5 border border-slate-800">
                    {lang === "en" ? currentData.climateContextEn : currentData.climateContextPt}
                  </p>
                </div>
              </div>

              {/* Slider Input with Snap Years */}
              <div className="relative pt-2 pb-1">
                <input
                  type="range"
                  min="0"
                  max={HISTORICAL_TIMELINE.length - 1}
                  step="1"
                  value={currentYearIndex}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setCurrentYearIndex(parseInt(e.target.value));
                  }}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 transition-all"
                />

                {/* Ticks & Labels */}
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-slate-400 mt-2 px-1">
                  {HISTORICAL_TIMELINE.map((item, index) => (
                    <button
                      key={item.year}
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentYearIndex(index);
                      }}
                      className={`transition-colors ${
                        currentYearIndex === index
                          ? "text-cyan-300 scale-110 font-black glow-cyan"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {item.year}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Informative Note below the map */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 px-2 gap-2">
          <p>
            💡 <strong className="text-slate-200">{t("Live Interaction:", "Interação:")}</strong>{" "}
            {t(
              "Drag or play the timeline slider to observe how Castanhão storage drops during droughts while estuarine salinity intrusion and aquaculture footprints expand.",
              "Arraste ou dê play no slider temporal para observar o esvaziamento do Castanhão nas secas e a expansão concomitante da cunha salina e dos viveiros de aquicultura."
            )}
          </p>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center space-x-1 text-cyan-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>{t("Jaguaribe River (610 km)", "Rio Jaguaribe (610 km)")}</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-400 font-mono">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>{t("Aracati Estuarine Aquaculture", "Aquicultura Estuarina de Aracati")}</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
