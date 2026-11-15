"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, Github, Database, Shield, Radio, Heart } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-slate-800 bg-[#03070E] py-12 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Project Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-base font-extrabold text-white">EcoPulse NE</span>
              <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                NASA Space Apps 2026
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {t(
                "An open-access science platform democratizing active microwave radar remote sensing (NISAR / SAR), revealing the vital hydrological link between interior Caatinga megadroughts and coastal mangrove crises across Northeast Brazil.",
                "Uma plataforma científica de acesso aberto que democratiza o sensoriamento remoto por radar (NISAR / SAR), revelando o elo hidrológico vital entre as megassecas na Caatinga e as crises nos manguezais costeiros do Nordeste."
              )}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/BPalhano/EcoPulseNE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 font-mono text-[11px]">NASA-ISRO NISAR L+S Band</span>
            </div>
          </div>

          {/* Col 2: Datasets Used */}
          <div>
            <h4 className="font-bold text-white mb-3 flex items-center space-x-1.5">
              <Database className="h-3.5 w-3.5 text-cyan-400" />
              <span>{t("Integrated Open Datasets", "Dados Abertos Integrados")}</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• NASA-ISRO NISAR (L-band & S-band)</li>
              <li>• NASA JPL UAVSAR (Quad-Pol PolSAR)</li>
              <li>• Copernicus Sentinel-1 SAR (ESA / ASF DAAC)</li>
              <li>• Copernicus Sentinel-2 MSI (ESA)</li>
              <li>• MapBiomas Brasil (Collection 9)</li>
              <li>• ANA & FUNCEME / COGERH Reservoirs</li>
              <li>• Copernicus DEM (GLO-30)</li>
            </ul>
          </div>

          {/* Col 3: Challenge & License */}
          <div>
            <h4 className="font-bold text-white mb-3 flex items-center space-x-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t("Challenge & Open Science", "Desafio & Ciência Aberta")}</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• {t("Challenge:", "Desafio:")} <em>Dancing with the SARs</em></li>
              <li>• NASA International Space Apps 2026</li>
              <li>• {t("Code License: MIT (Open Source)", "Licença: MIT (Código Aberto)")}</li>
              <li>• Next.js 14 · Tailwind CSS · Leaflet</li>
              <li>• Edge Deployment: Vercel Network</li>
            </ul>
          </div>

        </div>

        {/* AI Usage Disclaimer */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 mb-6 text-xs text-slate-400 leading-relaxed">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-[11px] uppercase tracking-wider mb-1.5">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            <span>{t("AI Assistance & Scientific Integrity Disclaimer", "Declaração de Uso de IA & Integridade Científica")}</span>
          </div>
          <p>
            {t(
              "Generative artificial intelligence tools were utilized to assist in drafting web application code, UI styling, and structural editing of scientific narratives. All remote sensing datasets, satellite imagery, polarimetric equations, radar physics models, and hydrological time series are strictly grounded in verified peer-reviewed literature and authentic open-access Earth Observation archives (NASA ASF DAAC, Copernicus ESA, MapBiomas Brasil, ANA, and FUNCEME/COGERH). No synthetic, diffused, or fabricated satellite data was used.",
              "Ferramentas de inteligência artificial generativa foram utilizadas como auxílio na programação web, estilização de interface e estruturação das narrativas científicas. Todos os dados de sensoriamento remoto, imagens orbitais, formulações polarimétricas, física de radar e séries hidrológicas são rigorosamente fundamentados em literatura revisada por pares e em acervos abertos autênticos de Observação da Terra (NASA ASF DAAC, Copernicus ESA, MapBiomas Brasil, ANA e FUNCEME/COGERH). Nenhuma imagem sintética ou dado falso gerado por difusão foi utilizado."
            )}
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>
            © 2026 EcoPulse NE Team. {t("Developed for NASA International Space Apps Challenge.", "Desenvolvido para o NASA International Space Apps Challenge.")}
          </p>
          <p className="flex items-center space-x-1 text-slate-400">
            <span>{t("Built with scientific rigor dedicated to the preservation of Northeast Brazil.", "Desenvolvido com rigor científico e dedicação à preservação do Nordeste brasileiro.")}</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
