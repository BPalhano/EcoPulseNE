# EcoPulse NE: The Drought & Tidal Waltz
**NASA International Space Apps Challenge 2026**  
**Challenge:** Dancing with the SARs  
**Live Platform:** https://ecopulsene.vercel.app  
**GitHub Repository:** https://github.com/BPalhano/EcoPulseNE  

---

## 1. Summary *
*(50–200 words, clean human language, no bullet points, no enumeration)*

### Versão em Português
EcoPulse NE é uma plataforma interativa de inteligência ambiental desenvolvida para decodificar como as secas extremas no semiárido nordestino repercutem diretamente na saúde dos manguezais costeiros, acompanhando os 610 quilômetros da Bacia do Rio Jaguaribe no Ceará. Utilizando dados de radar de abertura sintética das missões NISAR da NASA e Sentinel da Agência Espacial Europeia, a ferramenta supera as limitações dos satélites ópticos comuns, que são incapazes de enxergar através de nuvens ou de avaliar a vida da vegetação quando a Caatinga perde suas folhas no período seco. O projeto mede a umidade oculta nas raízes das plantas, avalia a estabilidade milimétrica de grandes barragens como o Castanhão e rastreia o avanço da cunha de água salgada sobre os estuários e áreas de carcinicultura. Ao transformar terabytes de física de micro-ondas em visualizações acessíveis, o EcoPulse NE oferece diagnósticos precisos para subsidiar a gestão de recursos hídricos e a preservação de biomas vulneráveis.

### Versão em Inglês (Official NASA Portal Submission)
EcoPulse NE is an interactive environmental intelligence platform engineered to uncover how multi-year megadroughts in the Brazilian semi-arid Caatinga propagate downstream to trigger ecological crises across coastal mangroves, spanning the 610-kilometer Jaguaribe River Basin in Ceará. Leveraging active Synthetic Aperture Radar data from NASA-ISRO NISAR and ESA Sentinel missions, the platform overcomes the critical limitations of conventional optical satellites, which cannot penetrate dense cloud cover or assess living biomass when deciduous trees shed their canopy during dry seasons. The system probes root-zone moisture down to 30 centimeters, verifies millimeter-scale dam crest stability using radar interferometry, and maps saltwater wedge intrusion across sensitive estuaries and shrimp farms. By converting complex microwave physics into intuitive, real-time spatial dashboards, EcoPulse NE delivers actionable environmental intelligence to support water resource governance, climate resilience, and ecosystem conservation.

---

## 2. Project Details *
*(What does it do? Benefits? Impact? Tools & Stack? Creativity? Factors considered?)*

### Versão em Português
O EcoPulse NE funciona como um observatório geoespacial ativo que conecta duas realidades ecológicas distantes, mas intimamente articuladas: o sertão semiárido da Caatinga e os manguezais da zona costeira cearense. A plataforma ingere produtos de radar de abertura sintética em banda L e banda C, aplicando correção radiométrica de terreno e modelos de inversão biofísica para extrair variáveis invisíveis a olho nu. O sistema quantifica a constante dielétrica do solo para medir o teor de água em profundidade radicular, avalia a coerência interferométrica para identificar deformações milimétricas na crista de açudes estratégicos como Castanhão e Orós, e processa dados polarimétricos para detectar o reflexo característico de marés altas sob o dossel de manguezais.

Os benefícios do projeto residem na capacidade de enxergar o território em qualquer condição climática, dia ou noite, atravessando nuvens costeiras e tempestades de poeira que comumente cegam satélites convencionais. Enquanto sensores ópticos geram frequentes falsos alertas de degradação quando a vegetação da Caatinga perde suas folhas na estiagem, o radar auxilia a identificar que a estrutura lenhosa das árvores permanece viva e em pé. Além disso, o sistema alerta sobre o avanço perigoso da água salgada rio acima durante secas prolongadas, período em que as comportas das barragens são fechadas e a ausência de correnteza doce sobrecarrega o estuário com efluentes da carcinicultura.

O impacto almejado é democratizar o acesso a dados espaciais de ponta para tomadores de decisão, comitês de bacia hidrográfica, pesquisadores, agricultores familiares e comunidades tradicionais que dependem das águas do Jaguaribe. Para construir a aplicação, utilizamos Next.js com React e TypeScript no desenvolvimento da interface interativa, Tailwind CSS para a estilização fluida, Recharts e Leaflet para renderização de dados temporais e mapas geoespaciais, e Python para processamento numérico de matrizes de covariância polarimétrica e calibração de dados SAR.

A criatividade da proposta está na abordagem da teleconexão hidroecológica, tratando o rio como uma artéria única cujas retenções a montante definem a vida biológica na foz do mar. Ao longo do desenvolvimento, a equipe considerou fatores socioeconômicos profundos da convivência com o semiárido nordestino, como a geologia cristalina de baixa infiltração subterrânea, a história secular de construção de açudes, a transposição do Rio São Francisco e a necessidade urgente de preservar tanto a segurança hídrica urbana quanto o equilíbrio dos mangues.

### Versão em Inglês (Official NASA Portal Submission)
EcoPulse NE operates as an active multi-sensor radar observatory bridging two connected yet geographically distant realities: the semi-arid Caatinga scrublands and the coastal estuarine mangroves of Northeast Brazil. The platform ingests L-band and C-band Synthetic Aperture Radar granules, applying Radiometric Terrain Correction and biophysical inversion models to extract environmental indicators invisible to passive optical sensors. It derives root-zone soil moisture from dielectric permittivity, tracks millimeter-scale crest deformation on major earthen dams through repeat-pass InSAR coherence, and processes polarimetric decompositions to detect sub-canopy tidal inundation in mangrove root systems.

The core benefit of the platform is uninterrupted monitoring regardless of weather or illumination conditions, cutting through persistent coastal trade-wind clouds and dry-season dust. While conventional optical NDVI misidentifies deciduous Caatinga defoliation during seasonal droughts as dead land, SAR active microwaves confirm structural volume backscatter from living woody trunks, helping differentiate physiological dormancy from clear-cut deforestation. Furthermore, the tool monitors estuarine hypersalinization and effluent stagnation when upstream river gates are curtailed to preserve metropolitan drinking water reserves.

The intended impact is to provide actionable environmental intelligence for water authorities, river basin committees, conservation agencies, and rural communities along the Jaguaribe River. The software architecture was developed using Next.js, React, and TypeScript for responsive interface state management, Leaflet and Recharts for spatial and time-series geovisualization, Tailwind CSS for scientific UI styling, and Python for SAR calibration, radiometric correction, and polarimetric matrix decomposition.

The project is creative in formulating and proving the hydro-ecological teleconnection hypothesis between interior drought governance and coastal wetland survival. Our team integrated complex hydrogeological realities, including shallow crystalline Precambrian bedrock with minimal groundwater recharge, historical century-long reservoir construction, transboundary water transfers from the São Francisco River, and the urgent need to balance metropolitan water security with estuarine ecological integrity.

---

## 3. NASA Data *
*(Official NASA datasets and missions used in EcoPulse NE — Required for Global Award Eligibility)*

| Link Text | Link Url | Descrição Técnica & Aplicação no Projeto |
| :--- | :--- | :--- |
| **NASA-ISRO Synthetic Aperture Radar (NISAR) Mission** | `https://nisar.jpl.nasa.gov` | Dados de radar polarimétrico em Banda L (1,25 GHz, comprimento de onda de 24,2 cm) e Banda S (3,2 GHz) utilizados para sondagem de umidade radicular no solo (0–30 cm) e detecção de diedro duplo sob raízes de mangue. |
| **NASA Alaska Satellite Facility (ASF DAAC) — Vertex Data Portal** | `https://asf.alaska.edu` | Portal oficial da NASA para busca, acesso e download de produtos de radar de abertura sintética (SLC e RTC) cobrindo o Nordeste do Brasil. |
| **NASA Earthdata Search** | `https://search.earthdata.nasa.gov` | Portal global da NASA para descoberta e integração de dados de sensoriamento remoto, precipitação e variáveis ambientais da Terra. |
| **NASA Shuttle Radar Topography Mission (SRTM) Global 30m DEM** | `https://www.jpl.nasa.gov/missions/shuttle-radar-topography-mission-srtm` | Modelo digital de elevação global de 30 metros utilizado na calibração geométrica e na correção de distorções de relevo da visada lateral do radar. |
| **NASA ARSET — SAR for Water Resources and Disaster Monitoring** | `https://appliedsciences.nasa.gov/what-we-do/capacity-building/arset` | Metodologias e diretrizes de capacitação técnica da NASA para mapeamento de inundações, interferometria DInSAR e estimativa de umidade por micro-ondas. |

---

## 4. Space Agency Partner & Other Data
*(Partner space agencies, Brazilian hydrological databases, land use collections, and open-source code)*

| Link Text | Link Url | Descrição do Recurso & Utilização |
| :--- | :--- | :--- |
| **European Space Agency (ESA) Copernicus Sentinel-1 SAR Constellation** | `https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-1` | Radar em Banda C (5,405 GHz, comprimento de onda de 5,6 cm) com dupla polarização (VV/VH), empregado na análise interferométrica de estabilidade de barragens e séries temporais de espelhos d'água. |
| **European Space Agency (ESA) Copernicus Sentinel-2 MSI** | `https://sentinels.copernicus.eu/web/sentinel/missions/sentinel-2` | Imagens multiespectrais ópticas de 10 e 20 metros de resolução espacial utilizadas no comparador interativo SAR X-Ray para contrastar a cegueira por nuvens com a penetração de micro-ondas. |
| **Copernicus Global 30m Digital Elevation Model (GLO-30)** | `https://spacedata.copernicus.eu/collections/copernicus-digital-elevation-model` | Modelo digital de elevação de 30 metros para Correção Radiométrica de Terreno (RTC) e normalização de retroespalhamento gamma-nought (γ⁰). |
| **Agência Nacional de Águas e Saneamento Básico (ANA) — Dados de Reservatórios** | `https://www.gov.br/ana/pt-br` | Dados hidrométricos oficiais, séries temporais históricas de armazenamento e vazões defluentes dos açudes Castanhão, Orós e Banabuiú. |
| **COGERH — Portal Hidrológico do Ceará** | `https://www.hidro.ce.gov.br` | Telemetria de capacidade volumétrica, cotas de sangria históricas e dados de monitoramento dos recursos hídricos do Estado do Ceará. |
| **MapBiomas Brasil — Cobertura e Uso da Terra** | `https://brasil.mapbiomas.org` | Séries históricas anuais de mapeamento de cobertura vegetal, classes de Caatinga e superfícies hídricas (1985 a 2024) para validação cruzada. |
| **EcoPulse NE — Open Source Code Repository (GitHub)** | `https://github.com/BPalhano/EcoPulseNE` | Repositório público com código-fonte completo, componentes React/TypeScript, algoritmos de radar e rotinas de geoprocessamento. |
| **EcoPulse NE — Live Interactive Platform (Vercel)** | `https://ecopulsene.vercel.app` | Plataforma web interativa de acesso público, executada em ambiente de produção contínua com telemetria e mapas dinâmicos. |

---

## 5. Roteiro Oficial do Vídeo de Apresentação (30 Segundos)
* **Título do Vídeo:** EcoPulse NE — The Drought & Tidal Waltz
* **Duração Máxima:** Exatamente 30 segundos
* **Fio Condutor:** Como distinguir a Caatinga que perde folhas na seca da vegetação que foi removida?
* **Arquivo Gerado:** `EcoPulseNE_30s_pitch.mp4`

### Estrutura de Cenas & Locução

#### Cena 1 (0:00 – 0:05) — A Caatinga e o paradoxo da seca
* **Visual:** Imagens da Caatinga na estação seca — galhos cinzentos, aparência árida e desértica.
* **Texto na Tela:** *Caatinga: 100% brasileira. Na seca, as folhas caem. A floresta dorme.*
* **Locução (PT):**
  > "A Caatinga é o único bioma exclusivamente brasileiro. Na seca severa, ela perde todas as folhas para sobreviver."
* **Voiceover (EN - Official Video):**
  > "The Caatinga is South America's only exclusively Brazilian biome. In severe drought, trees drop all leaves to survive."

#### Cena 2 (0:05 – 0:18) — O risco e o desafio da fiscalização
* **Visual:** Transição para imagem de satélite óptico (falso alerta de desmatamento: tudo parece solo nu). Inserção de dados: desmatamento real, perda de mata ciliar, risco de assoreamento dos açudes e avanço da salinidade no Baixo Jaguaribe.
* **Texto na Tela:**
  * *Satélite óptico: solo exposto?*
  * *Desmatamento ou dormência?*
  * *Mata ciliar em risco — reservatórios ameaçados*
* **Locução (PT):**
  > "Para satélites ópticos, a floresta dormente parece solo exposto. Como fiscalizar sem gerar falsos alertas? Enquanto isso, o desmatamento real avança, ameaçando matas ciliares e acelerando o assoreamento dos grandes açudes."
* **Voiceover (EN - Official Video):**
  > "To optical satellites, the dormant forest looks like bare soil, creating blind spots. Meanwhile, real clearing advances, threatening reservoirs and rivers."

#### Cena 3 (0:18 – 0:30) — A solução: radar SAR e conservação integrada
* **Visual:** Transição da imagem óptica para imagem SAR (retroespalhamento revelando os troncos e galhos em pé). Destaque para o espelho d'água dos açudes (reflexão especular) e o monitoramento da bacia do Jaguaribe. Fechamento com o logo e nome do projeto: **EcoPulse NE**.
* **Texto na Tela:**
  * *SAR: as micro-ondas enxergam a estrutura lenhosa*
  * *Monitoramento de açudes e controle da salinidade*
  * *EcoPulse NE — Tecnologia espacial para a Caatinga*
* **Locução (PT):**
  > "O radar SAR atravessa a poeira e interage com os troncos e galhos em pé, ajudando a distinguir dormência de desmatamento. Com o SAR, monitoramos da água dos reservatórios à vegetação da Caatinga."
* **Voiceover (EN - Official Video):**
  > "Synthetic Aperture Radar pierces dust and dry air, revealing standing woody trunks. With SAR, EcoPulse NE tracks living biomass and reservoir water. EcoPulse NE. Space intelligence for the Caatinga."

---

## 6. Scientific Authors & Affiliations
* **Igor Braga Palhano** — Lead Author & Scientific Investigator  
  * *Affiliation:* Wireless Telecommunications Research Group (GTEL) / Federal University of Ceará (UFC)  
  * *Expertise:* Digital Signal Processing, Microwave Modeling & Optimization  
  * *Scholar:* https://scholar.google.com/citations?user=kWYVL0cAAAAJ  

* **Ruan Pereira Alves** — Co-Author & Scientific Systems Developer  
  * *Affiliation:* Federal University of Ceará (UFC)  
  * *Expertise:* Software-Defined Radio (SDR), Cybernetics & Distributed Systems  
  * *Scholar:* https://scholar.google.com/citations?user=GeFWM58AAAAJ  

* **Lucas Oliveira Furtado** — Co-Author, Screenwriter & Creative Director  
  * *Affiliation:* Federal University of Ceará (UFC)  
  * *Expertise:* Audiovisual Narrative, Science Communication & Scriptwriting  
  * *Role:* Roteiro e Direção do Pitch Audiovisual Oficial de 30 Segundos  

---

## 7. Use of Super Intelligence (SI) *
*(NASA Space Apps Challenge 2026 Submission Field)*

### Pergunta Oficial da Submissão:
> **Did your project use Super Intelligence (SI) in its design, development, or execution?**  
> **Yes / No**  
> **If yes, please briefly describe how and where SI was used, and explain your strategy for validating that the output was accurate, unbiased, and compliant with NASA guidelines.**

### Resposta Oficial (English / NASA Portal):
**Yes.**

**How and Where SI Was Used:**  
Super Intelligence (SI) tools were utilized as an assistive accelerator during project development:
1. **Full-Stack Web Engineering:** Assisting in structuring Next.js/React/TypeScript components, Tailwind CSS design layouts, Leaflet map overlays, and Recharts interactive telemetry curves.
2. **Biophysical Formula Verification:** Validating numerical implementations of Pauli and Freeman-Durden polarimetric decomposition matrices, InSAR coherence thresholds ($\gamma > 0.85$), and dielectric permittivity bounds ($arepsilon pprox 3.5$ for dry crust vs $arepsilon pprox 80$ for liquid water).
3. **Bilingual Translation & Documentation:** Assisting in refining technical and scientific text consistency between Brazilian Portuguese and English across the web platform and project dossier.
4. **Automated Media Synthesis Pipeline:** Scripting the 30-second presentation video assembly via Python and FFmpeg, applying smooth pan/wipe transitions, generating ambient audio beds, and rendering synchronized captions.

**Strategy for Validating Accuracy, Neutrality, and Non-Bias:**  
- **Ground-Truth Validation:** Every synthetic data point and physical assertion was cross-referenced and verified against published peer-reviewed remote sensing literature (e.g., ASF DAAC guides, ESA Copernicus Sentinel-1 user handbooks, NASA NISAR science handbook), empirical hydrographic datasets from the Ceará Water Management Company (COGERH), and historical land-use classifications from MapBiomas Brasil (1985–2024).
- **Scientific Tone Calibration:** Rigorous manual review ensured that no unverified or absolute claims were made; for example, tone was strictly calibrated to emphasize that SAR *assists in distinguishing* deciduous dormancy from clear-cutting, rather than acting as an infallible absolute identifier.
- **Data Integrity:** No synthetic or AI-fabricated satellite data was presented as genuine radar granules; genuine Copernicus Sentinel-1 RTC GeoTIFF tiles and official cartographic vectors of the Jaguaribe River (3,250 vertices) were utilized.

**Compliance with NASA Guidelines:**  
- **No NASA Branding on Generated Media:** In strict adherence to NASA Space Apps regulations, no NASA meatball logo, NASA worm insignia, national flags, or official agency badges were used on any SI-generated visual assets or video materials.
- **Visible Watermark:** All SI-assisted generated video media prominently displays a transparent, persistent lower watermark: `SI-Assisted Production · NASA Space Apps Challenge 2026`.
- **Open Transparency:** Full disclosure of SI tools, open-source code, and methodological workflows is documented directly in the public GitHub repository and project submission.
