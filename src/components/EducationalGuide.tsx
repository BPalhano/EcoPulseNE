"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Radio, Sun, CheckCircle2 } from "lucide-react";

export default function EducationalGuide() {
  const { t } = useLanguage();

  const concepts = [
    {
      titleEn: "Double-Bounce (Dihedral Scattering)",
      titlePt: "Double-Bounce (Espalhamento em Diedro)",
      satellite: "NISAR L-Band (HH Polarisation)",
      targetEn: "Tidally Flooded Mangroves",
      targetPt: "Manguezais Inundados sob Maré",
      howItWorksEn: "The radar microwave pulse strikes the calm water surface beneath the canopy, bounces onto vertical tree trunks and stilt roots (or vice-versa), and echoes back with high intensity to the antenna.",
      howItWorksPt: "O pulso de micro-ondas do radar bate na água sob o dossel, rebate nos troncos verticais e raízes escora (ou vice-versa), e retorna como um eco hiper-brilhante para a antena.",
      whyItMattersEn: "While optical satellites only see the uppermost green leaf canopy, SAR penetrates through foliage to monitor exact tidal inundation patterns beneath dense mangrove stands.",
      whyItMattersPt: "Enquanto satélites ópticos veem apenas a copa verde superior, o SAR enxerga por baixo das folhas e monitora exatamente onde a maré alta subiu no manguezal.",
      color: "from-rose-500/20 to-amber-500/20 border-rose-500/40 text-rose-300"
    },
    {
      titleEn: "Volume Scattering (Cross-Polarization)",
      titlePt: "Volume Scattering (Espalhamento Volumétrico)",
      satellite: "NISAR L-Band (HV / VH Polarisation)",
      targetEn: "Caatinga in Extreme Drought",
      targetPt: "Caatinga em Seca Extrema",
      howItWorksEn: "The 24.2 cm wavelength penetrates deeply into the dry brushwood, interacting with random branch angles and stems to depolarize the transmitted signal into cross-polarized backscatter.",
      howItWorksPt: "O comprimento de onda de 24,2 cm penetra fundo na mata seca, interagindo com galhos e caules lenhosos para despolarizar o sinal em retroespalhamento cruzado.",
      whyItMattersEn: "When Caatinga drops 100% of leaves during drought, optical NDVI misclassifies it as barren earth. L-band SAR measures true standing woody biomass, detecting physiological dormancy vs illegal deforestation.",
      whyItMattersPt: "Na estiagem, as folhas caem e a câmera comum assume terra nua. O radar mede a densidade da madeira viva em pé, alertando se a mata está apenas dormente ou se foi desmatada.",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300"
    },
    {
      titleEn: "Specular Reflection (Mirror Scattering)",
      titlePt: "Reflexão Especular (Espelhamento)",
      satellite: "NISAR L/S & Sentinel-1 C-Band",
      targetEn: "Aquaculture Basins & Mega-Reservoirs",
      targetPt: "Viveiros de Carcinicultura & Açudes",
      howItWorksEn: "Smooth water surfaces act as near-perfect specular mirrors, deflecting incident microwave pulses forward and away from the satellite antenna, resulting in near-zero backscatter return.",
      howItWorksPt: "Superfícies de água parada funcionam como espelhos quase perfeitos, refletindo o feixe do radar para longe da antena. O sensor não recebe sinal de volta.",
      whyItMattersEn: "Enables automated, sharp delineation of open water reservoirs (Castanhão) and aquaculture shrimp pond perimeters day or night, through clouds and atmospheric haze.",
      whyItMattersPt: "Permite delimitação automatizada e nítida de reservatórios (Castanhão) e perímetros de tanques de carcinicultura, dia e noite, através de nuvens e névoa.",
      color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-300"
    }
  ];

  return (
    <section id="education" className="py-16 lg:py-24 border-b border-slate-800/60 bg-[#050B14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-4">
            <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
            <span>{t("Accessible 60-Second Primer (Out of the Bubble)", "Guia Didático Acessível (Fora da Bolha)")}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            {t("How Radar Sees the Earth", "Como o Radar Enxerga o Mundo")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {t("in 60 Seconds", "em 60 Segundos")}
            </span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            {t(
              "Unlike conventional cameras that rely on sunlight, Synthetic Aperture Radar (SAR) illuminates the Earth with its own active microwave energy. Understand the core physics through 3 simple mechanisms.",
              "Diferente de câmeras normais que dependem do Sol, o SAR (Radar de Abertura Sintética) ilumina a Terra com sua própria energia em micro-ondas. Entenda a física em 3 conceitos simples."
            )}
          </p>
        </div>

        {/* 3 Core Mechanisms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {concepts.map((concept, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border bg-gradient-to-b p-6 backdrop-blur-sm transition-all hover:scale-[1.02] ${concept.color}`}
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold mb-3">
                <span className="rounded bg-black/50 px-2 py-0.5 border border-white/10">{concept.satellite}</span>
                <span className="text-white/60">0{idx + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t(concept.titleEn, concept.titlePt)}</h3>
              <p className="text-xs font-semibold text-cyan-300 mb-4">
                {t("Target:", "Alvo:")} {t(concept.targetEn, concept.targetPt)}
              </p>
              
              <div className="space-y-3 text-xs text-slate-200">
                <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                  <span className="font-bold text-white block mb-1">
                    {t("How the Physics Works:", "Como Funciona a Física:")}
                  </span>
                  <p className="text-slate-300 leading-relaxed">{t(concept.howItWorksEn, concept.howItWorksPt)}</p>
                </div>
                <div className="rounded-lg bg-black/40 p-3 border border-white/5">
                  <span className="font-bold text-emerald-400 block mb-1">
                    {t("Why This Matters:", "Por Que Isso Importa:")}
                  </span>
                  <p className="text-slate-300 leading-relaxed">{t(concept.whyItMattersEn, concept.whyItMattersPt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Callout: Optical vs Radar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 max-w-4xl mx-auto">
          <h4 className="text-base font-bold text-white mb-4 text-center">
            {t(
              "Practical Difference: Passive Optical vs. Active Radar Sensors",
              "A Diferença Prática entre Sensores Ópticos Passivos e Sensores Radar Ativos"
            )}
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold mb-2">
                <Sun className="h-4 w-4" />
                <span>{t("Optical Sensing (Passive)", "Sensoriamento Óptico (Passivo)")}</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• {t("Relies on daylight sunlight (blind at night).", "Depende da iluminação solar (não funciona à noite).")}</li>
                <li>• {t("100% blocked by clouds, coastal sea-fog, and wildfire smoke.", "Bloqueado 100% por nuvens, névoa e fumaça de queimadas.")}</li>
                <li>• {t("Only sees top leaf pigmentation (chlorophyll).", "Enxerga apenas a cor e refletância química da superfície foliar.")}</li>
                <li>• {t("Confuses seasonal drought leaf-shed with deforestation.", "Confunde seca estacional na Caatinga com terra desmatada.")}</li>
              </ul>
            </div>

            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold mb-2">
                <Radio className="h-4 w-4" />
                <span>{t("NISAR SAR Radar (Active)", "Radar SAR / NISAR (Ativo)")}</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>• {t("Transmits its own microwave pulse (operates 24/7 Day & Night).", "Emite seu próprio feixe de micro-ondas (opera 24 horas por dia).")}</li>
                <li>• {t("Penetrates dense clouds, tropical rain, and atmospheric smoke.", "Atravessa nuvens espessas, chuva e fumaça sem nenhuma interferência.")}</li>
                <li>• {t("Measures roughness, 3D geometric structure, and dielectric moisture (ε).", "Mede a rugosidade, estrutura geométrica e umidade (constante dielétrica).")}</li>
                <li>• {t("Detects tidal water beneath mangrove trees and standing woody biomass.", "Enxerga a água da maré por baixo das árvores e mede madeira viva em pé.")}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
