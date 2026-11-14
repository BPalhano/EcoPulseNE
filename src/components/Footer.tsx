import React from "react";
import { Globe, Github, Heart, Shield, Database } from "lucide-react";

export default function Footer() {
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
              Uma plataforma aberta projetada para democratizar o sensoriamento remoto por radar (NISAR / SAR), 
              revelando a conexão crítica entre as megassecas na Caatinga e o recuo dos manguezais na costa do Nordeste.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com/BPalhano/EcoPulseNE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-slate-200 hover:text-white hover:border-slate-500 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repositório</span>
              </a>
            </div>
          </div>

          {/* Col 2: Datasets Used */}
          <div>
            <h4 className="font-bold text-white mb-3 flex items-center space-x-1.5">
              <Database className="h-3.5 w-3.5 text-cyan-400" />
              <span>Dados Abertos Integrados</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• NASA-ISRO NISAR (Banda L/S)</li>
              <li>• NASA JPL UAVSAR Quad-Pol</li>
              <li>• Copernicus Sentinel-1 SAR (ESA/ASF)</li>
              <li>• Copernicus Sentinel-2 MSI (ESA)</li>
              <li>• MapBiomas Brasil (Coleção 9)</li>
              <li>• ANA - SAR Reservatórios</li>
              <li>• Copernicus DEM (GLO-30)</li>
            </ul>
          </div>

          {/* Col 3: Challenge & License */}
          <div>
            <h4 className="font-bold text-white mb-3 flex items-center space-x-1.5">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>Desafio & Licença</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Desafio: <em>Dancing with the SARs</em></li>
              <li>• Hackathon: NASA Space Apps 2026</li>
              <li>• Licença de Código: MIT (Open Source)</li>
              <li>• Desenvolvido com Next.js & Tailwind</li>
              <li>• Deploy Global: Vercel Edge Network</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright / disclaimer */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>
            © 2026 EcoPulse NE Team. Desenvolvido para o NASA International Space Apps Challenge.
          </p>
          <p className="flex items-center space-x-1">
            <span>Desenvolvido com rigor científico e dedicação à preservação do Nordeste brasileiro.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
