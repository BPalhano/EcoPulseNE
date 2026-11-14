import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Waves, TreePine, Droplet, Eye } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800/60 bg-gradient-to-b from-[#050B14] via-[#091322] to-[#050B14]">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-rose-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 mb-6 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>NASA Space Apps Challenge 2026 — Theme: Dancing with the SARs</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
            A Valsa Invisível entre o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
              Sertão Seco
            </span>{" "}
            e a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
              Maré dos Manguezais
            </span>
          </h1>

          {/* Subtitle / Lead */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Como as <strong className="text-amber-300">megassecas na Caatinga</strong> desencadeiam a hipersalinização e a destruição de <strong className="text-cyan-300">manguezais na costa do Nordeste</strong>. 
            O <strong>EcoPulse NE</strong> transforma a física complexa do Radar de Abertura Sintética (<strong>NISAR / SAR</strong>) em diagnósticos de satélite acessíveis a qualquer cidadão.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#comparator"
              className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-bold text-black transition-all hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
            >
              <Eye className="h-4 w-4" />
              <span>Experimentar o Slider Raio-X</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#basin-map"
              className="inline-flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:border-slate-500"
            >
              <Waves className="h-4 w-4 text-cyan-400" />
              <span>Explorar a Bacia do Jaguaribe</span>
            </a>
          </div>
        </div>

        {/* 3 Pillars Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-amber-500/20 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-amber-500/40 transition-colors">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-4 border border-amber-500/20">
              <TreePine className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Caatinga sob Seca Extrema</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Durante a estiagem, a vegetação perde as folhas e parece morta no satélite óptico. O radar mede a <strong>madeira lenhosa viva em pé (HV/VH)</strong>, separando a dormência estacional do carvoejamento clandestino.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-blue-500/40 transition-colors">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
              <Droplet className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. O Barramento do Jaguaribe</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              O Açude Castanhão e outros reservatórios retêm a água para abastecimento do interior. A vazão doce que chega à foz despenca a zero, permitindo que a água salgada do mar invada o rio e hipersalinize o estuário.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/50 p-6 backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-4 border border-cyan-500/20">
              <Waves className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. O Avanço da Carcinicultura</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Manguezais enfraquecidos pela salinidade viram apicuns áridos, que são invadidos por viveiros industriais de camarão. O SAR detecta os tanques com <strong>reflexão especular milimétrica</strong> e monitora a poluição.
            </p>
          </div>
        </div>

        {/* Data Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Dados Integrados:</span>
          <span className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300">NASA-ISRO NISAR (Banda L/S)</span>
          <span className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300">Copernicus Sentinel-1 SAR</span>
          <span className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300">MapBiomas Brasil (Coleção 9)</span>
          <span className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300">ANA - Telemetria de Reservatórios</span>
          <span className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300">UAVSAR (NASA JPL)</span>
        </div>
      </div>
    </section>
  );
}
