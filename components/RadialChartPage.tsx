"use client";

import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Selection } from "d3-selection";
import { motion, AnimatePresence } from "framer-motion";

interface Detail {
  name: string;
  info: string;
  icon: string;
}

interface Subcategory {
  name: string;
  icon: string;
  description: string;
  details: Detail[];
}

interface Sector {
  name: string;
  color: string;
  icon: string;
  description: string;
  opacity?: number;
  subcategories: Subcategory[];
}

const sectors: Sector[] = [
  {
    name: "Agriculture",
    color: "#10b981",
    icon: "🌱",
    description: "Fertile land supporting major crops, irrigation schemes, livestock, and agro-processing potential.",
    subcategories: [
      {
        name: "Major Crops",
        icon: "🌾",
        description: "Key crops include Tomato, Maize, Rice, Millet, Hibiscus Flower, Sorghum, Sesame, Groundnuts, Cowpeas, and Soybeans.",
        details: [
          { name: "Tomato", info: "Widely grown with potential for processing into sauces and pastes.", icon: "🍅" },
          { name: "Maize", info: "A staple crop with opportunities for milling and animal feed.", icon: "🌽" }
        ]
      },
      {
        name: "Irrigation Schemes",
        icon: "💧",
        description: "Supported by Dadin Kowa Dam, Cham Dam, and Balanga Dam for year-round farming.",
        details: [
          { name: "Dadin Kowa Dam", info: "Enables large-scale irrigation and hydropower generation.", icon: "🏞️" }
        ]
      },
      {
        name: "Livestock",
        icon: "🐄",
        description: "Includes cattle, sheep, goats, and poultry for meat, dairy, and egg production.",
        details: [
          { name: "Cattle", info: "Significant for beef and dairy industries.", icon: "🐮" }
        ]
      },
      {
        name: "Agro-Processing Potential",
        icon: "🏭",
        description: "Opportunities in rice milling, groundnut oil, flour milling, and packaging.",
        details: [
          { name: "Rice Milling", info: "Supports local rice production with value-added processing.", icon: "🍚" }
        ]
      },
      {
        name: "Agro-climatic Advantage",
        icon: "☀️",
        description: "Rainfall and temperature conducive for diverse agricultural activities.",
        details: [
          { name: "Rainfall", info: "Supports multiple cropping seasons.", icon: "🌧️" }
        ]
      }
    ]
  },
  {
    name: "Energy",
    color: "#f59e0b",
    icon: "⚡",
    description: "Renewable energy sources including solar, hydro, biomass, mini-grids, and gas potential.",
    subcategories: [
      {
        name: "Solar",
        icon: "☀️",
        description: "High solar irradiation levels across the state for solar energy projects.",
        details: [
          { name: "Solar Farms", info: "Potential for large-scale solar power generation.", icon: "🔋" }
        ]
      },
      {
        name: "Hydro",
        icon: "💧",
        description: "Dadin Kowa Hydropower Plant (40MW) operational for clean energy.",
        details: [
          { name: "Dadin Kowa", info: "Provides 40MW of renewable hydropower.", icon: "🏞️" }
        ]
      },
      {
        name: "Biomass",
        icon: "🌿",
        description: "Availability of agricultural and organic waste for energy production.",
        details: [
          { name: "Organic Waste", info: "Utilized for biogas and bioenergy.", icon: "♻️" }
        ]
      },
      {
        name: "Mini-grid Opportunities",
        icon: "🏘️",
        description: "For rural electrification and industrial clusters.",
        details: [
          { name: "Rural Electrification", info: "Powers remote areas with mini-grids.", icon: "🌐" }
        ]
      },
      {
        name: "Gas Potential",
        icon: "⛽",
        description: "Proximity to Bauchi's Kolmani Gas Field opens up downstream prospects.",
        details: [
          { name: "Kolmani Field", info: "Supports gas-based industrial development.", icon: "🏭" }
        ]
      }
    ]
  },
  {
    name: "Manufacturing & Industrialization",
    color: "#3b82f6",
    icon: "🏭",
    description: "Industrial zones, raw materials, market access, infrastructure, and SME base.",
    subcategories: [
      {
        name: "Industrial Zones",
        icon: "🏢",
        description: "Planned clusters in Dadin Kowa and Kwami for industrial growth.",
        details: [
          { name: "Dadin Kowa", info: "Strategic location for manufacturing hubs.", icon: "📍" }
        ]
      },
      {
        name: "Raw Materials",
        icon: "🧱",
        description: "Agro-based and mineral raw materials for processing industries.",
        details: [
          { name: "Agro-Based", info: "Supports food and textile industries.", icon: "🌾" }
        ]
      },
      {
        name: "Access to Regional Markets",
        icon: "🚚",
        description: "Hub linking North-East and Central Nigeria.",
        details: [
          { name: "North-East", info: "Key trade route for goods distribution.", icon: "🗺️" }
        ]
      },
      {
        name: "Infrastructure",
        icon: "🛤️",
        description: "Growing road network, airport, and proximity to railway.",
        details: [
          { name: "Road Network", info: "Enhances logistics and connectivity.", icon: "🛣️" }
        ]
      },
      {
        name: "SME Base",
        icon: "🛠️",
        description: "Active informal sector with potential for scale-up.",
        details: [
          { name: "Scale-Up", info: "Opportunities for SME growth and formalization.", icon: "📈" }
        ]
      }
    ]
  },
  {
    name: "Mining & Solid Minerals",
    color: "#ef4444",
    icon: "⛏️",
    description: "Commercial mineral deposits and artisanal mining sites.",
    subcategories: [
      {
        name: "Limestone",
        icon: "🏗️",
        description: "Used for cement production.",
        details: [
          { name: "Cement", info: "Supports construction industry growth.", icon: "🏢" }
        ]
      },
      {
        name: "Gypsum",
        icon: "🪨",
        description: "Used for plaster and POP production.",
        details: [
          { name: "Plaster", info: "Key material for building interiors.", icon: "🏠" }
        ]
      },
      {
        name: "Coal",
        icon: "🔥",
        description: "Potential for energy and industrial use.",
        details: [
          { name: "Energy Use", info: "Supports power generation.", icon: "⚡" }
        ]
      },
      {
        name: "Granite",
        icon: "🪶",
        description: "Used in construction and decoration.",
        details: [
          { name: "Construction", info: "Popular for building materials.", icon: "🏗️" }
        ]
      },
      {
        name: "Uranium",
        icon: "☢️",
        description: "Potential for nuclear energy development.",
        details: [
          { name: "Nuclear", info: "Future energy prospect with regulation.", icon: "⚛️" }
        ]
      },
      {
        name: "Feldspar",
        icon: "💎",
        description: "Used in ceramics and glass manufacturing.",
        details: [
          { name: "Ceramics", info: "Supports local pottery industry.", icon: "🏺" }
        ]
      },
      {
        name: "Artisanal Mining Sites",
        icon: "⛏️",
        description: "Identified for formalization and investment.",
        details: [
          { name: "Formalization", info: "Opportunities for regulated mining.", icon: "📜" }
        ]
      }
    ]
  },
  {
    name: "ICT & Innovation",
    color: "#8b5cf6",
    icon: "💻",
    description: "Emerging tech hubs, digital infrastructure, youth demographic, and e-government push.",
    subcategories: [
      {
        name: "Tech Hubs",
        icon: "🏢",
        description: "Innovation centers supported by the state government.",
        details: [
          { name: "Innovation Centers", info: "Fosters startup growth and tech development.", icon: "💡" }
        ]
      },
      {
        name: "Digital Infrastructure",
        icon: "🌐",
        description: "State-owned fiber optic investment initiative.",
        details: [
          { name: "Fiber Optics", info: "Enhances high-speed internet access.", icon: "📡" }
        ]
      },
      {
        name: "Youth Demographic",
        icon: "👥",
        description: "Large population of tech-savvy youth.",
        details: [
          { name: "Tech Talent", info: "Supports IT and innovation sectors.", icon: "🎓" }
        ]
      },
      {
        name: "E-Government Push",
        icon: "📱",
        description: "Digital services under the Gombe Innovation & Tech program.",
        details: [
          { name: "Digital Services", info: "Improves public service delivery.", icon: "🏛️" }
        ]
      }
    ]
  },
  {
    name: "Real Estate & Urban Infrastructure",
    color: "#6b7280",
    icon: "🏠",
    description: "Urban growth, new developments, government partnerships, and digital land management.",
    subcategories: [
      {
        name: "Urban Growth",
        icon: "🏙️",
        description: "Gombe city expanding with demand for housing and commercial property.",
        details: [
          { name: "Housing", info: "Rising demand for residential units.", icon: "🏘️" }
        ]
      },
      {
        name: "New Developments",
        icon: "🏗️",
        description: "Mega Park, modern markets, and estate projects (e.g., Muhammadu Buhari Industrial Park, Shongo Garden Estate).",
        details: [
          { name: "Mega Park", info: "Supports industrial and commercial growth.", icon: "🏢" }
        ]
      },
      {
        name: "Government Partnerships",
        icon: "🤝",
        description: "Availability of land and investment incentives.",
        details: [
          { name: "Land Availability", info: "Facilitates real estate projects.", icon: "🌍" }
        ]
      },
      {
        name: "GOGIS",
        icon: "📊",
        description: "Digital land management for ease of acquisition and title security.",
        details: [
          { name: "Title Security", info: "Ensures transparent land transactions.", icon: "🔐" }
        ]
      }
    ]
  },
  {
    name: "Tourism",
    color: "#ef4444",
    icon: "🌴",
    description: "Attractions, eco-tourism potential, events, and hospitality growth.",
    subcategories: [
      {
        name: "Attractions",
        icon: "🏞️",
        description: "Tula Highlands and Caves, Bima Rock and Hills, Tangale Hills, Lake Dadin Kowa, historical sites, and cultural festivals.",
        details: [
          { name: "Tula Highlands", info: "Scenic landscapes for tourism.", icon: "⛰️" }
        ]
      },
      {
        name: "Eco-tourism Potential",
        icon: "🌍",
        description: "Hills, lakes, and savannah landscapes.",
        details: [
          { name: "Savannah", info: "Ideal for eco-friendly tourism.", icon: "🌾" }
        ]
      },
      {
        name: "Events",
        icon: "🎉",
        description: "Traditional festivals and cultural heritage events.",
        details: [
          { name: "Festivals", info: "Showcases local culture and traditions.", icon: "🎭" }
        ]
      },
      {
        name: "Hospitality Growth",
        icon: "🏨",
        description: "Opportunities in hotels, resorts, and tour services.",
        details: [
          { name: "Hotels", info: "Expanding tourism infrastructure.", icon: "🏡" }
        ]
      }
    ]
  }
];

interface RadialChartProps {
  searchQuery: string;
}

const RadialChart = ({ searchQuery }: RadialChartProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<Detail | null>(null);
  const [filteredSectors, setFilteredSectors] = useState<Sector[]>(sectors);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: { name: string; description: string } | null;
    x: number;
    y: number;
  }>({ visible: false, content: null, x: 0, y: 0 });

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredSectors(
      sectors.map((sector) => ({
        ...sector,
        opacity: sector.name.toLowerCase().includes(query) ||
          sector.description.toLowerCase().includes(query) ||
          sector.subcategories.some(
            (sub) =>
              sub.name.toLowerCase().includes(query) ||
              sub.description.toLowerCase().includes(query) ||
              sub.details.some(
                (detail) =>
                  detail.name.toLowerCase().includes(query) ||
                  detail.info.toLowerCase().includes(query)
              )
          ) ? 1 : 0.3
      }))
    );
  }, [searchQuery]);

  useEffect(() => {
    if (!ref.current) return;

    const updateDimensions = () => {
      const maxWidth = 1000; // Unchanged container width
      const width = Math.min(window.innerWidth * 0.95, maxWidth);
      const height = width * 1.2; // Unchanged taller aspect ratio
      const radius = width / 8; // Increased denominator for smaller radial shape
      return { width, height, radius };
    };

    let { width, height, radius } = updateDimensions();
    const svg = d3.select(ref.current)
      .selectAll("svg")
      .data([null])
      .join("svg") as Selection<SVGSVGElement, null, HTMLDivElement, unknown>;
    svg.attr("width", width)
       .attr("height", height)
       .style("display", "block")
       .style("margin", "0 auto");

    const resize = () => {
      const dims = updateDimensions();
      width = dims.width;
      height = dims.height;
      radius = dims.radius;
      svg.attr("width", width)
         .attr("height", height)
         .style("display", "block")
         .style("margin", "0 auto");
      renderChart();
    };

    window.addEventListener("resize", resize);

    const renderChart = () => {
      svg.selectAll("*").remove();
      const g = svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`) as Selection<SVGGElement, unknown, HTMLDivElement, unknown>;

      const defs = g.append("defs");

      // Glow filter for nodes
      const glowFilter = defs.append("filter")
        .attr("id", "glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
      glowFilter.append("feGaussianBlur")
        .attr("stdDeviation", "4")
        .attr("result", "blur");
      glowFilter.append("feComposite")
        .attr("in", "SourceGraphic")
        .attr("in2", "blur")
        .attr("operator", "over");

      // Background gradient
      const bgGradient = defs.append("radialGradient")
        .attr("id", "bgGradient");
      bgGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#f8fafc");
      bgGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#e2e8f0");

      g.append("circle")
        .attr("r", radius * 2.2)
        .attr("fill", "url(#bgGradient)")
        .style("filter", "url(#glow)");

      // Center text
      const centerGroup = g.append("g");
      centerGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.8em")
        .style("font-size", Math.min(18, width / 40) + "px")
        .style("font-weight", "700")
        .style("fill", "#1e293b")
        .style("font-family", "'Inter', 'Poppins', sans-serif")
        .text("Investment Sectors");
      centerGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "1em")
        .style("font-size", Math.min(12, width / 60) + "px")
        .style("fill", "#475569")
        .style("font-family", "'Inter', 'Poppins', sans-serif")
        .text("Click to explore");

      // Radial layout for sectors
      const totalSectors = filteredSectors.length;
      const sectorAngle = (2 * Math.PI) / totalSectors;

      filteredSectors.forEach((sector, i) => {
        const angle = i * sectorAngle - Math.PI / 2;
        const x = Math.cos(angle) * radius * 1.8;
        const y = Math.sin(angle) * radius * 1.8;

        // Sector node
        const sectorGroup = g.append("g")
          .attr("transform", `translate(${x}, ${y})`)
          .attr("tabindex", 0)
          .style("cursor", "pointer")
          .on("mouseenter", (event: MouseEvent) => {
            setTooltip({
              visible: true,
              content: { name: sector.name, description: sector.description },
              x: event.clientX,
              y: event.clientY
            });
          })
          .on("mouseleave", () => setTooltip({ visible: false, content: null, x: 0, y: 0 }))
          .on("click", () => {
            setSelectedSector(sector.name === selectedSector ? null : sector.name);
            setSelectedSubcategory(null);
            setSelectedDetail(null);
          })
          .on("keypress", (event: KeyboardEvent) => {
            if (event.key === "Enter") {
              setSelectedSector(sector.name === selectedSector ? null : sector.name);
              setSelectedSubcategory(null);
              setSelectedDetail(null);
            }
          });

        sectorGroup.append("circle")
          .attr("r", Math.min(20, width / 30))
          .attr("fill", sector.color)
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 2)
          .style("opacity", sector.opacity || 1)
          .style("filter", "url(#glow)")
          .transition()
          .duration(1000)
          .attr("r", Math.min(20, width / 30));

        sectorGroup.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "-1.2em")
          .style("font-size", Math.min(12, width / 60) + "px")
          .style("font-weight", "600")
          .style("fill", "#1e293b")
          .style("font-family", "'Inter', 'Poppins', sans-serif")
          .text(sector.name)
          .style("opacity", 0)
          .transition()
          .duration(1000)
          .style("opacity", 1);

        sectorGroup.append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "0.4em")
          .style("font-size", Math.min(16, width / 50) + "px")
          .style("fill", "#ffffff")
          .text(sector.icon)
          .style("opacity", 0)
          .transition()
          .duration(1000)
          .style("opacity", 1);

        // Subcategories and details for selected sector
        if (selectedSector === sector.name) {
          const sel = filteredSectors.find(s => s.name === selectedSector);
          if (!sel) return;

          const totalSubcategories = sel.subcategories.length;
          const subAngleStep = Math.PI / (totalSubcategories * 1.5);
          const subStartAngle = angle - (subAngleStep * (totalSubcategories - 1)) / 2;

          sel.subcategories.forEach((sub, j) => {
            const subAngle = subStartAngle + (j * subAngleStep);
            const subX = Math.cos(subAngle) * radius * 3;
            const subY = Math.sin(subAngle) * radius * 3;

            // Curved path to subcategory
            const path = d3.path();
            path.moveTo(x, y);
            path.quadraticCurveTo(0, 0, subX, subY);
            g.append("path")
              .attr("d", path.toString())
              .attr("fill", "none")
              .attr("stroke", sel.color)
              .attr("stroke-width", 2)
              .attr("stroke-dasharray", "6,4")
              .style("opacity", 0)
              .transition()
              .duration(1000)
              .delay(j * 150)
              .style("opacity", 0.8);

            // Subcategory node
            const subGroup = g.append("g")
              .attr("transform", `translate(${subX}, ${subY})`)
              .attr("tabindex", 0)
              .style("cursor", "pointer")
              .on("mouseenter", (event: MouseEvent) => {
                setTooltip({
                  visible: true,
                  content: { name: sub.name, description: sub.description },
                  x: event.clientX,
                  y: event.clientY
                });
              })
              .on("mouseleave", () => setTooltip({ visible: false, content: null, x: 0, y: 0 }))
              .on("click", () => {
                setSelectedSubcategory(sub.name === selectedSubcategory ? null : sub.name);
                setSelectedDetail(null);
              })
              .on("keypress", (event: KeyboardEvent) => {
                if (event.key === "Enter") {
                  setSelectedSubcategory(sub.name === selectedSubcategory ? null : sub.name);
                  setSelectedDetail(null);
                }
              });

            subGroup.append("circle")
              .attr("r", Math.min(15, width / 40))
              .attr("fill", sel.color)
              .attr("stroke", "#ffffff")
              .attr("stroke-width", 2)
              .style("opacity", 0)
              .style("filter", "url(#glow)")
              .transition()
              .duration(1000)
              .delay(j * 150)
              .style("opacity", 1);

            subGroup.append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "-1.2em")
              .style("font-size", Math.min(10, width / 70) + "px")
              .style("font-weight", "600")
              .style("fill", "#1e293b")
              .style("font-family", "'Inter', 'Poppins', sans-serif")
              .text(sub.name)
              .style("opacity", 0)
              .transition()
              .duration(1000)
              .delay(j * 150)
              .style("opacity", 1);

            subGroup.append("text")
              .attr("text-anchor", "middle")
              .attr("dy", "0.4em")
              .style("font-size", Math.min(14, width / 55) + "px")
              .style("fill", "#ffffff")
              .text(sub.icon)
              .style("opacity", 0)
              .transition()
              .duration(1000)
              .delay(j * 150)
              .style("opacity", 1);

            // Details for selected subcategory
            if (selectedSubcategory === sub.name) {
              const totalDetails = sub.details.length;
              const detailAngleStep = Math.PI / (totalDetails * 2);
              const detailStartAngle = subAngle - (detailAngleStep * (totalDetails - 1)) / 2;

              sub.details.forEach((detail, k) => {
                const detailAngle = detailStartAngle + (k * detailAngleStep);
                const detailX = Math.cos(detailAngle) * radius * 4;
                const detailY = Math.sin(detailAngle) * radius * 4;

                // Curved path to detail
                const detailPath = d3.path();
                detailPath.moveTo(subX, subY);
                detailPath.quadraticCurveTo(0, 0, detailX, detailY);
                g.append("path")
                  .attr("d", detailPath.toString())
                  .attr("fill", "none")
                  .attr("stroke", sel.color)
                  .attr("stroke-width", 1.5)
                  .attr("stroke-dasharray", "4,3")
                  .style("opacity", 0)
                  .transition()
                  .duration(1000)
                  .delay(k * 150)
                  .style("opacity", 0.7);

                // Detail node
                const detailGroup = g.append("g")
                  .attr("transform", `translate(${detailX}, ${detailY})`)
                  .attr("tabindex", 0)
                  .style("cursor", "pointer")
                  .on("mouseenter", (event: MouseEvent) => {
                    setTooltip({
                      visible: true,
                      content: { name: detail.name, description: detail.info },
                      x: event.clientX,
                      y: event.clientY
                    });
                  })
                  .on("mouseleave", () => setTooltip({ visible: false, content: null, x: 0, y: 0 }))
                  .on("click", () => {
                    setSelectedDetail(detail);
                  })
                  .on("keypress", (event: KeyboardEvent) => {
                    if (event.key === "Enter") {
                      setSelectedDetail(detail);
                    }
                  });

                detailGroup.append("circle")
                  .attr("r", Math.min(10, width / 50))
                  .attr("fill", "#ffffff")
                  .attr("stroke", sel.color)
                  .attr("stroke-width", 2)
                  .style("opacity", 0)
                  .style("filter", "url(#glow)")
                  .transition()
                  .duration(1000)
                  .delay(k * 150)
                  .style("opacity", 1);

                detailGroup.append("text")
                  .attr("text-anchor", "middle")
                  .attr("dy", "-1.2em")
                  .style("font-size", Math.min(9, width / 80) + "px")
                  .style("font-weight", "500")
                  .style("fill", "#475569")
                  .style("font-family", "'Inter', 'Poppins', sans-serif")
                  .text(detail.name)
                  .style("opacity", 0)
                  .transition()
                  .duration(1000)
                  .delay(k * 150)
                  .style("opacity", 1);

                detailGroup.append("text")
                  .attr("text-anchor", "middle")
                  .attr("dy", "0.4em")
                  .style("font-size", Math.min(12, width / 60) + "px")
                  .style("fill", sel.color)
                  .text(detail.icon)
                  .style("opacity", 0)
                  .transition()
                  .duration(1000)
                  .delay(k * 150)
                  .style("opacity", 1);
              });
            }
          });

          // Sector description
          g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", radius * 2.4)
            .style("font-size", Math.min(12, width / 60) + "px")
            .style("fill", sel.color)
            .style("font-family", "'Inter', 'Poppins', sans-serif")
            .style("font-weight", "600")
            .text(sel.description)
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);
        }
      });
    };

    renderChart();
    return () => window.removeEventListener("resize", resize);
  }, [selectedSector, selectedSubcategory, filteredSectors, searchQuery]);

  return (
    <div className="relative min-h-[500px] flex justify-center items-center">
      <div className="w-full max-w-5xl">
        <div ref={ref} className="w-full" />
        <AnimatePresence>
          {tooltip.visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-2xl border border-gray-100 max-w-sm z-50"
              style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
            >
              <h4 className="font-semibold text-gray-800 text-base">{tooltip.content?.name}</h4>
              <p className="text-sm text-gray-600 mt-2">{tooltip.content?.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {(selectedSector || selectedSubcategory || selectedDetail) && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            className="md:w-96 w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto md:fixed md:right-12 md:top-24 z-50"
          >
            {selectedDetail ? (
              <div>
                <button
                  onClick={() => setSelectedDetail(null)}
                  className="mb-4 text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3" style={{ color: filteredSectors.find(s => s.name === selectedSector)?.color }}>
                    {selectedDetail.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedDetail.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{selectedDetail.info}</p>
              </div>
            ) : selectedSubcategory ? (
              <div>
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className="mb-4 text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3" style={{ color: filteredSectors.find(s => s.name === selectedSector)?.color }}>
                    {filteredSectors.find(s => s.name === selectedSector)?.subcategories.find(sub => sub.name === selectedSubcategory)?.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedSubcategory}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {filteredSectors.find(s => s.name === selectedSector)?.subcategories.find(sub => sub.name === selectedSubcategory)?.description}
                </p>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedSector(null)}
                  className="mb-4 text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3" style={{ color: filteredSectors.find(s => s.name === selectedSector)?.color }}>
                    {filteredSectors.find(s => s.name === selectedSector)?.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedSector}</h3>
                </div>
                <p className="text-gray-600 text-sm">{filteredSectors.find(s => s.name === selectedSector)?.description}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface RadialChartPageProps {
  searchQuery: string;
}

export function RadialChartPage({ searchQuery }: RadialChartPageProps) {
  return (
    <div className="w-full flex justify-center py-8 px-0">
      <div className="w-full max-w-5xl">
        <RadialChart searchQuery={searchQuery} />
      </div>
    </div>
  );
}