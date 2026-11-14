export interface BasinPoint {
  id: string;
  name: string;
  biome: string;
  coords: [number, number];
  role: string;
  description: string;
  metrics: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'stable';
    color: string;
  }[];
  sarInsight: string;
}

export const BASIN_POINTS: BasinPoint[] = [
  {
    id: "inhamuns",
    name: "Sertão dos Inhamuns (Tauá - CE)",
    biome: "Caatinga Hiper-Xerófila",
    coords: [-5.90, -40.29],
    role: "Cabeceira Hidrográfica",
    description: "Zona de nascente pedregosa no semiárido mais seco do Ceará. Sofre com megassecas recorrentes e alta vulnerabilidade à desertificação.",
    metrics: [
      { label: "Biomassa Lenhosa Preservada", value: "78%", trend: "stable", color: "text-emerald-400" },
      { label: "Umidade Radicular (Banda L)", value: "11%", trend: "down", color: "text-amber-400" },
      { label: "Micro-Açudes Rurais Secos", value: "64%", trend: "up", color: "text-rose-400" },
    ],
    sarInsight: "O radar de Banda L mede o retroespalhamento volumétrico em HV/VH, confirmando que 78% da biomassa lenhosa permanece em pé sob caducifólia, refutando falsos alertas ópticos de desmatamento."
  },
  {
    id: "castanhao",
    name: "Açude Castanhão (Alto Santo - CE)",
    biome: "Caatinga Central / Reservatório Estratégico",
    coords: [-5.50, -38.45],
    role: "Barramento Central & Pulso Hídrico",
    description: "O maior açude da América Latina (6,7 bilhões de m³). Durante a estiagem, retém a água doce para Fortaleza e o sertão, reduzindo a vazão fluvial para o estuário a quase zero.",
    metrics: [
      { label: "Volume Útil Atual", value: "32.4%", trend: "up", color: "text-cyan-400" },
      { label: "Vazão Liberada para a Foz", value: "3.2 m³/s", trend: "down", color: "text-rose-400" },
      { label: "Lâmina D'água por SAR", value: "184 km²", trend: "stable", color: "text-blue-400" },
    ],
    sarInsight: "O contraste dielétrico entre a água líquida (ε ≈ 80) e o solo semiárido (ε ≈ 3) permite delimitar a lâmina de água exata por reflexão especular, monitorando a cota mesmo com nuvens."
  },
  {
    id: "aracati",
    name: "Estuário do Rio Jaguaribe (Aracati / Fortim - CE)",
    biome: "Manguezal, Apicum & Zona Costeira",
    coords: [-4.42, -37.76],
    role: "Foz Oceânica & Berçário Marinho",
    description: "O maior polo de carcinicultura do Brasil. A diminuição da água doce vinda do sertão causa hipersalinização estuarina, favorecendo a invasão de viveiros de camarão sobre apicuns e mangues.",
    metrics: [
      { label: "Área de Viveiros de Camarão", value: "3.640 ha", trend: "up", color: "text-rose-400" },
      { label: "Manguezal sob Maré Ativa", value: "1.410 ha", trend: "down", color: "text-amber-400" },
      { label: "Turbidez Estuarina (NDTI)", value: "0.42 (Alta)", trend: "up", color: "text-amber-400" },
    ],
    sarInsight: "A polarização HH revela a maré inundando as raízes aéreas de mangue (Double-Bounce) e mapeia os tanques artificiais de camarão como polígonos pretos milimetricamente delimitados."
  }
];

export const TIMELINE_DATA = [
  { year: "1985", carciniculturaHa: 120, castanhaoVolPct: 85, mangueHa: 2450, apicumHa: 1800 },
  { year: "1995", carciniculturaHa: 480, castanhaoVolPct: 72, mangueHa: 2310, apicumHa: 1650 },
  { year: "2005", carciniculturaHa: 1450, castanhaoVolPct: 68, mangueHa: 2100, apicumHa: 1350 },
  { year: "2012", carciniculturaHa: 2300, castanhaoVolPct: 42, mangueHa: 1890, apicumHa: 1100 },
  { year: "2016", carciniculturaHa: 3100, castanhaoVolPct: 5, mangueHa: 1540, apicumHa: 890 },
  { year: "2020", carciniculturaHa: 3420, castanhaoVolPct: 18, mangueHa: 1460, apicumHa: 780 },
  { year: "2024", carciniculturaHa: 3640, castanhaoVolPct: 32, mangueHa: 1410, apicumHa: 710 },
  { year: "2026", carciniculturaHa: 3750, castanhaoVolPct: 30, mangueHa: 1390, apicumHa: 680 },
];

export const EDUCATIONAL_CONCEPTS = [
  {
    title: "Double-Bounce (Espalhamento em Diedro)",
    satellite: "NISAR Banda L (Polarização HH)",
    target: "Manguezais Inundados",
    howItWorks: "O pulso de radar bate na água lisa sob a floresta e reflete no tronco da árvore (ou vice-versa), retornando como um eco hiper-brilhante para a antena.",
    whyItMatters: "Enquanto satélites ópticos veem apenas a copa verde superior, o SAR enxerga por baixo das folhas e monitora exatamente onde a maré alta subiu no manguezal.",
    color: "from-rose-500/20 to-amber-500/20 border-rose-500/40 text-rose-300",
  },
  {
    title: "Volume Scattering (Espalhamento Volumétrico)",
    satellite: "NISAR Banda L/S (Polarizações HV & VH)",
    target: "Caatinga em Seca Extrema",
    howItWorks: "O comprimento de onda de 24 cm interage repetidamente com os galhos e caules lenhosos, dispersando energia em múltiplas direções.",
    whyItMatters: "Na seca, as folhas caem e a câmera comum assume morte total. O radar mede a densidade da madeira viva, alertando se a mata está dormindo ou se foi desmatada para fornos de carvão.",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300",
  },
  {
    title: "Specular Reflection (Reflexão Especular)",
    satellite: "NISAR & Sentinel-1 (Banda C/L)",
    target: "Viveiros de Carcinicultura & Açudes",
    howItWorks: "Superfícies de água parada funcionam como espelhos perfeitos, refletindo o feixe do radar para longe da antena. O sensor não recebe sinal de volta.",
    whyItMatters: "Os tanques de criação de camarão que invadem apicuns e mangues protegidos surgem pretos como breu, com contornos milimétricos formados pelos diques de terra.",
    color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-300",
  }
];
