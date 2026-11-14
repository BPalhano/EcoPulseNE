import React from "react";
import { EDUCATIONAL_CONCEPTS } from "@/data/mockData";
import { BookOpen, Radio, CloudRain, Sun, Moon, Zap, Layers } from "lucide-react";

export default function EducationalGuide() {
  return (
    <section id="education" className="py-16 lg:py-24 border-b border-slate-800/60 bg-[#050B14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            <span>Guia Didático Acessível (Fora da Bolha)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Como o Radar Enxerga o Mundo <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">em 60 Segundos</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Diferente de câmeras normais que dependem do Sol, o <strong>SAR (Radar de Abertura Sintética)</strong> emite sua própria energia em micro-ondas. Entenda a mágica física em 3 conceitos simples.
          </p>
        </div>

        {/* 3 Core Mechanisms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {EDUCATIONAL_CONCEPTS.map((concept, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border bg-gradient-to-b p-6 backdrop-blur-sm transition-all hover:scale-[1.02] ${concept.color}`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-3">
                <span className="rounded bg-black/50 px-2 py-0.5 border border-white/10">{concept.satellite}</span>
                <span className="text-white/60">0{idx + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{concept.title}</h3>
              <p className="text-xs font-semibold text-cyan-300 mb-4">Alvo: {concept.target}</p>
              
              <div className="space-y-3 text-xs text-slate-200">
                <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                  <span className="font-bold text-white block mb-1">Como Funciona a Física:</span>
                  <p className="text-slate-300 leading-relaxed">{concept.howItWorks}</p>
                </div>
                <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                  <span className="font-bold text-emerald-400 block mb-1">Por Que Isso Importa:</span>
                  <p className="text-slate-300 leading-relaxed">{concept.whyItMatters}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout: Optical vs Radar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 max-w-4xl mx-auto">
          <h4 className="text-base font-bold text-white mb-4 text-center">
            A Diferença Prática entre Sensores Passivos e Sensores Ativos
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold mb-2">
                <Sun className="h-4 w-4" />
                <span>Sensoriamento Óptico (Passivo)</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• Depende da iluminação solar (não funciona à noite).</li>
                <li>• Bloqueado 100% por nuvens, névoa e fumaça de queimadas.</li>
                <li>• Enxerga apenas a cor e refletância química da superfície foliar.</li>
                <li>• Confunde seca estacional na Caatinga com terra desmatada.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-2">
                <Radio className="h-4 w-4" />
                <span>Radar SAR / NISAR (Ativo)</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• Emite seu próprio feixe de micro-ondas (opera 24 horas por dia).</li>
                <li>• Atravessa nuvens espessas, chuva e fumaça sem nenhuma interferência.</li>
                <li>• Mede a <strong>rugosidade, estrutura geométrica e umidade (constante dielétrica)</strong>.</li>
                <li>• Enxerga a água da maré por baixo das árvores e mede madeira viva em pé.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
