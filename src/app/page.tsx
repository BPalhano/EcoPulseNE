"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import EducationalGuide from "@/components/EducationalGuide";
import Footer from "@/components/Footer";
import { 
  Radar, 
  Waves, 
  Layers, 
  Activity, 
  BookOpen, 
  ArrowRight, 
  TreePine, 
  Droplet, 
  Compass, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  Globe
} from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  const portalCards = [
    {
      href: "/map",
      titleEn: "1. Geographic SAR Observatory",
      titlePt: "1. Observatório Geoespacial SAR",
      tagEn: "Full-Screen GIS Map",
      tagPt: "Mapa GIS em Tela Cheia",
      descEn: "Explore the 610-km Jaguaribe hydrographic corridor with 3,250 real vector vertices, genuine Sentinel-1 RTC radar tiles, 1985–2026 fluid time slider, and interactive sliding telemetry drawers.",
      descPt: "Explore os 610 km da calha do Jaguaribe com 3.250 vértices cartográficos reais, camadas de radar Sentinel-1 RTC, linha do tempo 1985–2026 e gaveta lateral de telemetria.",
      icon: Waves,
      color: "from-cyan-500/20 to-blue-600/20 border-cyan-500/40 text-cyan-400"
    },
    {
      href: "/comparator",
      titleEn: "2. Real Satellite & SAR X-Ray Lab",
      titlePt: "2. Laboratório Real de Raio-X SAR",
      tagEn: "Verified Copernicus Data",
      tagPt: "Dados Reais Copernicus",
      descEn: "Inspect genuine Sentinel-2 optical vs. Sentinel-1 RTC active microwave radar imagery. Prove living woody biomass in leafless Caatinga drought and pierce coastal clouds over mangroves.",
      descPt: "Audite dados reais do Sentinel-2 óptico vs. Sentinel-1 RTC radar. Comprove madeira viva na Caatinga desfolhada e atravesse nuvens costeiras sobre mangues e viveiros de camarão.",
      icon: Layers,
      color: "from-amber-500/20 to-orange-600/20 border-amber-500/40 text-amber-400"
    },
    {
      href: "/telemetry",
      titleEn: "3. Biophysical Telemetry & Geodesy",
      titlePt: "3. Telemetria Biofísica & Geodésia",
      tagEn: "Pauli RGB & InSAR",
      tagPt: "Decomposição Pauli & InSAR",
      descEn: "Simulate Pauli 3-component polarimetric decomposition, examine 0–30 cm root-zone dielectric permittivity (ε), and track millimeter deformation on Castanhão earthen dam crest.",
      descPt: "Simule a decomposição polarimétrica de Pauli, analise a permissividade dielétrica (ε) de 0–30 cm nas raízes e rastreie a deformação milimétrica na crista do Castanhão.",
      icon: Activity,
      color: "from-rose-500/20 to-pink-600/20 border-rose-500/40 text-rose-400"
    },
    {
      href: "/story",
      titleEn: "4. StoryMap Dossier & Human Drivers",
      titlePt: "4. Dossiê StoryMap & Fatores Humanos",
      tagEn: "The Teleconnection",
      tagPt: "A Teleconexão",
      descEn: "Understand how multi-year megadroughts and reservoir retention policies induce estuarine hypersalinity, examining shrimp aquaculture coexistence and community resilience.",
      descPt: "Entenda como megassecas e retenções em barragens induzem hipersalinização estuarina, analisando a coexistência com a carcinicultura e a resiliência comunitária.",
      icon: BookOpen,
      color: "from-emerald-500/20 to-teal-600/20 border-emerald-500/40 text-emerald-400"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#050B14] text-slate-100 selection:bg-cyan-500 selection:text-black">
      <Header />

      {/* Hero Storytelling Section */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-[#0A1428] via-[#050B14] to-[#050B14] py-20 lg:py-28">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-3xl">
            {/* NASA Space Apps Badge */}
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 mb-6 backdrop-blur-md">
              <Radar className="h-3.5 w-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>NASA International Space Apps Challenge 2026 · Dancing with the SARs</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
              EcoPulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">NE</span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-light text-slate-300 tracking-wide">
              {t("The Drought & Tidal Waltz: From Sertão to Mangroves", "A Dança da Seca e da Maré: Do Sertão ao Manguezal")}
            </p>

            <p className="mt-6 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              {t(
                "Bridging the unseen climate teleconnection between multi-year megadroughts in the semi-arid Caatinga and downstream coastal crises in estuarine mangroves through NASA-ISRO NISAR and Copernicus active microwave radar remote sensing.",
                "Revelando a teleconexão oculta entre as megassecas na Caatinga semiárida e as crises a jusante nos manguezais costeiros por meio do sensoriamento remoto ativo por radar de micro-ondas (NISAR e Copernicus SAR)."
              )}
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/map"
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-5 py-3 font-bold text-black shadow-lg shadow-cyan-950/50 hover:brightness-110 transition-all"
              >
                <Waves className="h-4 w-4" />
                <span>{t("Launch Observatory Map", "Abrir Mapa da Bacia")}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                href="/comparator"
                className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 font-bold text-white hover:bg-slate-800 transition-all"
              >
                <Layers className="h-4 w-4 text-amber-400" />
                <span>{t("SAR X-Ray Lab", "Laboratório Raio-X SAR")}</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Dedicated Research Modules (Multi-Page Navigation Grid) */}
      <section className="py-16 lg:py-24 border-b border-slate-800 bg-[#060D19]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block mb-2">
              {t("Research & Visualization Suite", "Módulos Integrados de Pesquisa")}
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              {t("Explore the Multi-Sensor Radar Platform", "Navegue pela Plataforma Multi-Sensorial")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portalCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className={`group rounded-3xl border bg-gradient-to-br p-7 backdrop-blur-md transition-all hover:scale-[1.01] hover:shadow-2xl ${card.color}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-black/50 border border-white/10">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-mono font-bold text-white border border-white/10">
                      {t(card.tagEn, card.tagPt)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{t(card.titleEn, card.titlePt)}</span>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {t(card.descEn, card.descPt)}
                  </p>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Verified Real Satellite Data Callout */}
      <section className="py-12 border-b border-slate-800 bg-[#050B14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-[#0A1424] to-slate-900 p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>{t("Verified Scientific Data Integrity", "Integridade Científica Verificada")}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {t("100% Genuine Copernicus & NASA Open Satellite Granules", "100% Granulados Reais de Satélite da Copernicus & NASA")}
              </h3>
              <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                {t(
                  "All satellite imagery used across EcoPulse NE is fetched directly from the European Space Agency (ESA) and Microsoft Planetary Computer STAC catalog. Zero synthetic AI generation, ensuring rigorous scientific standards for the NASA Space Apps Challenge.",
                  "Todas as imagens de satélite do EcoPulse NE são obtidas diretamente dos catálogos da Agência Espacial Europeia (ESA) e Planetary Computer STAC. Sem imagens sintéticas ou difusão por IA, garantindo padrão científico rigoroso."
                )}
              </p>
            </div>
            <Link
              href="/comparator"
              className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-900/50 transition-colors shrink-0"
            >
              {t("Audit Real Datasets", "Auditar Dados Reais")}
            </Link>
          </div>
        </div>
      </section>

      {/* Accessible 60-Second Radar Science Primer */}
      <EducationalGuide />

      <Footer />
    </main>
  );
}
