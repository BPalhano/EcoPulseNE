# EcoPulse NE: The Drought & Tidal Waltz 🛰️🌊🌵
**NASA International Space Apps Challenge 2026**  
**Challenge:** *Dancing with the SARs* (Earth Science / Intermediate & Advanced)

[![CI Pipeline](https://github.com/BPalhano/EcoPulseNE/actions/workflows/ci.yml/badge.svg)](https://github.com/BPalhano/EcoPulseNE/actions/workflows/ci.yml)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://ecopulsene.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 🌍 Overview

**EcoPulse NE** is an open-access, multi-sensor environmental observatory engineered to democratize Synthetic Aperture Radar (SAR) remote sensing from the **NASA-ISRO SAR (NISAR)** and **Copernicus Sentinel-1** missions. 

It investigates the climate-critical teleconnection between **extreme droughts in the semi-arid Caatinga** and the downstream degradation of **coastal Mangroves in Northeast Brazil**, centered along the **Jaguaribe River Basin** (from the arid Inhamuns headwaters to the estuarine shrimp-farming hub of Aracati, Ceará).

While optical satellites are blinded by coastal clouds, cannot pierce dense mangrove canopies, and mistakenly diagnose drought-induced deciduous leaf-loss as deforestation, raw radar data remains trapped behind complex mathematics inaccessible to local communities. **EcoPulse NE bridges this divide by turning complex radar backscatter into citizen-grade, actionable diagnostics.**

---

## 🔬 Radar Physics: Piercing the Invisible

| Ecosystem & Target | Optical Limitation (Sentinel-2) | How Processed SAR (NISAR) Reveals | Decision-Making Impact |
| :--- | :--- | :--- | :--- |
| **Caatinga under Megadrought** | Leafless deciduous vegetation appears barren/dead. NDVI drops to zero, triggering false deforest alerts or concealing illegal charcoal logging. | Cross-polarization (**HV/VH**) measures the structural volume scattering of living wood. If trees are standing, the radar glows green. | Differentiates seasonal dormancy from illegal clear-cutting for industrial kilns; guides emergency livestock fodder relief. |
| **Mangroves under High Tide** | Only sees the continuous green leaf canopy. Cannot see if water is submerged under trees or if the soil is dry. | **Double-Bounce scattering in HH** pierces through foliage, bounces off flat tidal water and tree trunks, glowing bright red. | Maps tidal nursery flooding in real-time, even under 100% cloud cover. |
| **Carciniculture (Shrimp Farms)** | Shallow mud ponds are confused with natural lagoons or wetlands. | Still water surfaces cause total **Specular Reflection** (jet-black pixels) outlined by bright earthen dykes. | Automated spatial polygonization of illegal encroachment over protected salt flats (*apicuns*) and mangrove forests. |
| **Estuarine Pollution & Runoff** | Dark water gives no chemical indicator. | Fuses SAR with optical bio-indices: **NDTI** (Turbidity) and **NDCI** (Chlorophyll-a). | Pinpoints organic effluent dumping from aquaculture ponds before fish-kills occur. |

---

## 🗺️ The Study Area: Jaguaribe River Basin (Ceará, Brazil)

The Jaguaribe River Basin covers over **75,000 km²** (more than 50% of the State of Ceará):
1. **The Headwaters (Arid Caatinga):** Originates in the Sertão dos Inhamuns (Tauá), one of the driest, rockiest areas of the semi-arid interior.
2. **The Strategic Dams (Castanhão & Orós):** Contains Brazil's largest strategic public reservoir (*Açude Castanhão*, 6.7 billion m³). During multi-year megadroughts (e.g., 2012–2017), gates are sealed to preserve drinking water, collapsing river discharge to near zero.
3. **The Estuary (Aracati / Fortim):** Empties into the Atlantic Ocean, where the lack of freshwater causes **estuarine hypersalinization**. The resulting mangrove die-off created dry salt flats (*apicuns*), which were aggressively converted into **Brazil's largest shrimp-farming complex** (>3,500 hectares).

---

## 🚀 Key Platform Features

1. **The "X-Ray" Swipe Slider (Optical vs. SAR):** Real-time interactive split-view comparison between optical satellite imagery and calibrated SAR polarimetric RGB composites.
2. **Jaguaribe Basin Interactive Map:** Schematic hydrological flow linking Inhamuns -> Castanhão Dam -> Aracati Estuary with live hotspot diagnostics.
3. **Citizen Metric Cards & Timeline (1985–2026):** Integrates 40 years of MapBiomas land-cover data and ANA reservoir telemetry using dynamic Recharts time-series graphs.
4. **Educational 60-Second Radar Guide:** Visual, jargon-free explanations of radar physics (*Double-Bounce, Volume Scattering, Specular Reflection*) for students, rangers, and judges.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server-Side Rendering & Static Generation)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom space/radar aesthetic
* **Charts:** [Recharts](https://recharts.org/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **CI/CD:** [GitHub Actions](.github/workflows/ci.yml) (Automated Node.js 20 build and lint pipeline)
* **Hosting:** [Vercel](https://vercel.com/) (Global Edge CDN, sub-second latency, zero login barriers)

---

## 💻 Local Setup & Development

Prerequisites: Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/BPalhano/EcoPulseNE.git
cd EcoPulseNE

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛰️ Open Data & Scientific Acknowledgements

This project proudly integrates open-access datasets from:
* **NASA / ISRO:** NISAR L-band & S-band mission guides and sample products.
* **NASA JPL:** UAVSAR quad-polarimetric high-resolution airborne radar data.
* **ESA / Copernicus / ASF Vertex:** Sentinel-1 C-band SAR and Sentinel-2 MSI optical imagery.
* **MapBiomas Brasil (Collection 9):** 40-year historical land-use classifications (Mangrove, Apicum, Aquaculture, Caatinga).
* **ANA (Agência Nacional de Águas e Saneamento Básico):** SAR Reservoir monitoring telemetry.

---

## 👥 Authors & Scientific Investigators

* **Igor Braga Palhano** ([@BPalhano](https://github.com/BPalhano)) — Project Lead, Remote Sensing & Optimization ([Google Scholar](https://scholar.google.com/citations?user=kWYVL0cAAAAJ))  
  *Wireless Telecommunications Research Group (GTEL) / Federal University of Ceará (UFC)*
* **Ruan Pereira Alves** ([@ruanpereira](https://github.com/ruanpereira)) — Core Developer, Scientific Systems Architecture ([Google Scholar](https://scholar.google.com/citations?user=327pTpUAAAAJ))  
  *Federal University of Ceará (UFC)*

---

## 🤖 AI Usage & Scientific Integrity Disclaimer

Generative artificial intelligence tools were employed as development assistants to draft web application components, UI styling, and structural editing of scientific narratives. 

All remote sensing datasets, orbital radar physics formulations (Pauli decomposition, Topp's dielectric model, DInSAR interferometric phase), and multidecadal hydrological time series are strictly grounded in verified peer-reviewed scientific literature and authentic open-access Earth Observation archives (NASA ASF DAAC, ESA Copernicus, MapBiomas Brasil, ANA, and FUNCEME/COGERH). **No synthetic, diffused, or fabricated satellite data was used.**

---

Developed for the **2026 NASA International Space Apps Challenge** (*Dancing with the SARs*). Distributed under the **MIT License**.
