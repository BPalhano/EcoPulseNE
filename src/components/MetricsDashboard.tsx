"use client";

import React, { useState } from "react";
import { TIMELINE_DATA } from "@/data/mockData";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
  ComposedChart
} from "recharts";
import { Activity, TrendingUp, AlertOctagon, Droplets, TreePine, ShieldCheck } from "lucide-react";

export default function MetricsDashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("2026");

  const currentYearData = TIMELINE_DATA.find((d) => d.year === selectedYear) || TIMELINE_DATA[TIMELINE_DATA.length - 1];

  return (
    <section id="metrics" className="py-16 lg:py-24 border-b border-slate-800/60 bg-[#070E1A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3.5 py-1 text-xs font-semibold text-rose-300 mb-4">
            <Activity className="h-3.5 w-3.5 text-rose-400" />
            <span>Telemetria & Séries Temporais (1985 - 2026)</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            A Dança das Quatro Décadas: <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400">MapBiomas, ANA e Radar SAR</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Cruzamento da retração hídrica no interior com o crescimento exponencial de viveiros de camarão sobre os manguezais de Aracati.
          </p>
        </div>

        {/* 4 Citizen Metric Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <div className="rounded-xl border border-emerald-500/30 bg-slate-900/70 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Resiliência da Caatinga</span>
              <TreePine className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">82%</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Madeira lenhosa viva confirmada por Banda L em HV. Mata em dormência estacional segura.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-slate-900/70 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Manguezal sob Maré Ativa</span>
              <Droplets className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">{currentYearData.mangueHa} ha</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Berçário marinho inundado detectado por double-bounce (recuo de 43% desde 1985).
            </p>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-slate-900/70 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Carcinicultura em Apicuns</span>
              <AlertOctagon className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-2xl font-extrabold text-rose-400 font-mono">{currentYearData.carciniculturaHa} ha</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Viveiros de camarão delimitados por reflexão especular (crescimento de +3.000% desde 1985).
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-slate-900/70 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Cota Açude Castanhão (ANA)</span>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-blue-400 font-mono">{currentYearData.castanhaoVolPct}%</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Volume útil telemetrado. Regula a vazão doce que drena para o estuário de Aracati.
            </p>
          </div>

        </div>

        {/* The Big Chart Card */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-sm">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>Evolução Temporal: Carcinicultura vs. Volume do Castanhão</span>
              </h3>
              <p className="text-xs text-slate-400">
                Observe como as megassecas na Caatinga aceleram a expansão dos viveiros de camarão sobre os apicuns e mangues.
              </p>
            </div>

            {/* Year selector buttons */}
            <div className="flex flex-wrap gap-1.5">
              {TIMELINE_DATA.map((d) => (
                <button
                  key={d.year}
                  onClick={() => setSelectedYear(d.year)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono font-semibold transition-all ${
                    selectedYear === d.year
                      ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                      : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  {d.year}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Container */}
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={TIMELINE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  yAxisId="left"
                  stroke="#F43F5E"
                  fontSize={11}
                  tickLine={false}
                  unit=" ha"
                  label={{ value: "Viveiros de Camarão (ha)", angle: -90, position: "insideLeft", fill: "#F43F5E", fontSize: 10 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#38BDF8"
                  fontSize={11}
                  tickLine={false}
                  unit="%"
                  label={{ value: "Volume Castanhão (%)", angle: 90, position: "insideRight", fill: "#38BDF8", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#050B14",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#F8FAFC"
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                
                {/* Shrimp Farm Expansion Area */}
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="carciniculturaHa"
                  name="Viveiros de Camarão (MapBiomas ha)"
                  stroke="#F43F5E"
                  fill="url(#colorCarcinicultura)"
                  strokeWidth={2.5}
                />
                <defs>
                  <linearGradient id="colorCarcinicultura" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>

                {/* Mangrove Area */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="mangueHa"
                  name="Manguezal Arbóreo (ha)"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#10B981" }}
                />

                {/* Castanhão Reservoir Storage */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="castanhaoVolPct"
                  name="Volume Açude Castanhão (%)"
                  stroke="#38BDF8"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={{ r: 4, fill: "#38BDF8" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-4 text-[11px] text-slate-400 text-center">
            Fonte dos Dados: MapBiomas Brasil (Coleção 9 - Classes 31 e 5) e ANA (Sistema de Acompanhamento de Reservatórios).
          </p>

        </div>

      </div>
    </section>
  );
}
