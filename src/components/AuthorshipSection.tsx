"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { GraduationCap, ExternalLink, Award, Sparkles, BookOpen } from "lucide-react";

export default function AuthorshipSection() {
  const { t } = useLanguage();

  const authors = [
    {
      name: "Igor Braga Palhano",
      roleEn: "Lead Author & Scientific Investigator",
      rolePt: "Autor Principal & Investigador Científico",
      affiliationEn: "Wireless Telecommunications Research Group (GTEL) / Federal University of Ceará (UFC)",
      affiliationPt: "Grupo de Pesquisa em Telecomunicações sem Fio (GTEL) / Universidade Federal do Ceará (UFC)",
      expertiseEn: "Digital Signal Processing, Microwave Modeling & Optimization",
      expertisePt: "Processamento Digital de Sinais, Modelagem em Micro-ondas & Otimização",
      scholarUrl: "https://scholar.google.com/citations?user=kWYVL0cAAAAJ",
      photoSrc: "/authors/igor_palhano_square.jpg"
    },
    {
      name: "Ruan Pereira Alves",
      roleEn: "Co-Author & Scientific Systems Developer",
      rolePt: "Coautor & Desenvolvedor de Sistemas Científicos",
      affiliationEn: "Federal University of Ceará (UFC)",
      affiliationPt: "Universidade Federal do Ceará (UFC)",
      expertiseEn: "Software-Defined Radio (SDR), Cybernetics & Distributed Systems",
      expertisePt: "Rádio Definido por Software (SDR), Cibersegurança & Sistemas Distribuídos",
      scholarUrl: "https://scholar.google.com/citations?user=GeFWM58AAAAJ",
      photoSrc: "/authors/ruan_pereira_square.jpg"
    },
    {
      name: "Lucas Oliveira Furtado",
      roleEn: "Screenwriter & Creative Director",
      rolePt: "Roteirista & Direção Criativa",
      affiliationEn: "Federal University of Ceará (UFC)",
      affiliationPt: "Universidade Federal do Ceará (UFC)",
      expertiseEn: "Audiovisual Narrative, Science Communication & Scriptwriting",
      expertisePt: "Narrativa Audiovisual, Divulgação Científica & Roteiro",
      photoSrc: "/authors/lucas_furtado_square.jpg"
    }
  ];

  return (
    <section className="py-16 border-t border-slate-800 bg-[#060D1A]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-3">
            <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
            <span>{t("Scientific Investigation & Authorship", "Investigação Científica & Autoria")}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {t("Project Authors & Researchers", "Autores & Pesquisadores do Projeto")}
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            {t(
              "Developed for the NASA International Space Apps Challenge 2026 (Dancing with the SARs) by researchers from the Federal University of Ceará (UFC).",
              "Desenvolvido para o NASA International Space Apps Challenge 2026 (Dancing with the SARs) por pesquisadores da Universidade Federal do Ceará (UFC)."
            )}
          </p>
        </div>

        {/* Authors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {authors.map((author) => (
            <div 
              key={author.name}
              className="group relative rounded-3xl border border-slate-800 bg-slate-900/70 p-6 lg:p-7 backdrop-blur-xl shadow-xl hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Circular Avatar */}
              <div className="relative mb-5">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800">
                  <Image
                    src={author.photoSrc}
                    alt={author.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                {author.name}
              </h3>
              <span className="text-xs font-mono text-cyan-400 mt-1 mb-2 font-semibold">
                {t(author.roleEn, author.rolePt)}
              </span>

              {/* Affiliation */}
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {t(author.affiliationEn, author.affiliationPt)}
              </p>

              {/* Expertise Tag */}
              <span className="inline-block rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1 text-[11px] font-mono text-slate-300 mb-5">
                {t(author.expertiseEn, author.expertisePt)}
              </span>

              {/* Link / Action */}
              {author.scholarUrl ? (
                <a
                  href={author.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center space-x-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2 text-xs font-semibold transition-all hover:scale-105 shadow-sm"
                >
                  <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{t("Google Scholar Profile", "Perfil Google Acadêmico")}</span>
                  <ExternalLink className="h-3 w-3 ml-1 text-cyan-400" />
                </a>
              ) : (
                <div className="mt-auto inline-flex items-center space-x-2 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-4 py-2 text-xs font-semibold shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{t("NASA Pitch Screenwriter", "Roteirista do Pitch NASA")}</span>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
