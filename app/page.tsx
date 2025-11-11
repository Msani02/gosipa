"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { RadialChartPage } from "@/components/RadialChartPage";

// Import image from app/images/
import logo from "./images/logo.png";
import i1 from "./images/inuwa.jpeg";
import s1 from "./images/s (1).jpeg";
import s2 from "./images/s (1).jpg";
import s3 from "./images/s (17).jpg";
import s4 from "./images/s (18).jpg";
import s5 from "./images/s (2).jpeg";
import s6 from "./images/s (3).jpeg";
import s7 from "./images/s (4).jpeg";
import s8 from "./images/s (5).jpeg";
import s9 from "./images/s (5).jpg";
import s10 from "./images/s (8).jpg";
import agriculture from "./images/agriculture.jpg";
import energy from "./images/energy.jpg";
import manufacturing from "./images/manufacturing.jpg";
import mining from "./images/mining.jpg";
import ict from "./images/ict.jpg";
import realEstate from "./images/real-estate.jpg";
import tourism from "./images/tourism.jpg";

// Gallery images data
const galleryImages = [
  {
    src: s1,
    title: "Tula Highlands",
    description: "Scenic landscapes showcasing Gombe's tourism potential.",
    icon: "⛰️",
  },
  {
    src: s2,
    title: "Dadin Kowa Dam",
    description: "A key asset for irrigation and hydropower generation.",
    icon: "🏞️",
  },
  {
    src: s3,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
  {
    src: s4,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
  {
    src: s5,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
  {
    src: s6,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
  {
    src: s7,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
  {
    src: s8,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
  {
    src: s9,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
  {
    src: s10,
    title: "Gombe Agriculture",
    description: "Vibrant fields supporting major crops and agro-processing.",
    icon: "🌾",
  },
];

// Image Slider Component
interface ImageSliderProps {
  images: typeof galleryImages;
}

function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
              priority={currentIndex === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center space-x-4">
              <span className="text-3xl">{images[currentIndex].icon}</span>
              <div>
                <h4 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                  {images[currentIndex].title}
                </h4>
                <p className="text-white/80 text-sm sm:text-base md:text-lg">
                  {images[currentIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-md transition-colors duration-300"
        aria-label="Previous Image"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-md transition-colors duration-300"
        aria-label="Next Image"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// NavLink component for navigation items
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDropdownContent = (linkText: string) => {
    switch (linkText) {
      case "Services":
        return {
          categories: [
            {
              title: "Enabling Capabilities",
              icon: "🌱",
              items: ["Investment Facilitation", "Policy Advisory", "Licensing Support"],
            },
            {
              title: "Strategic Technologies",
              icon: "⚙️",
              items: ["Digital Infrastructure", "Agro-Processing", "Renewable Energy"],
            },
            {
              title: "Investment Ecosystems",
              icon: "💼",
              items: ["PPP Projects", "SME Support", "Tax Incentives"],
            },
          ],
        };
      case "Why Gombe":
        return {
          categories: [
            {
              title: "Enabling Capabilities",
              icon: "🌱",
              items: ["Strategic Location", "Skilled Workforce", "Natural Resources"],
            },
          ],
        };
      case "Sectors":
        return {
          categories: [
            {
              title: "Agriculture",
              icon: "🌱",
              items: ["Tomato", "Wheat", "Live stock", "Agro Processing", "Cutton", "Explore.."],
            },
            {
              title: "Energy",
              icon: "⚙️",
              items: ["Renewable Energy", "Solar", "Hydro", "Gas", "Biomass", "Mini grid"],
            },
            {
              title: "Industrialization",
              icon: "💼",
              items: ["Row materials", "Industrial Zones", "Access Regional Markets", "Infrustructure"],
            },
            {
              title: "Mining & Solid Minirals",
              icon: "💼",
              items: ["Limestone", "Gypsum", "Coal", "Granite", "Uranium", "Feldspar", "Artisanal Mining Sites"],
            },
            {
              title: "Others...",
              icon: "",
              items: ["Others.."],
            },
          ],
        };
      case "About Us":
        return {
          categories: [
            {
              title: "About GOSIPA",
              icon: "💼",
              items: ["Our Mandate", "PPP", "Vision", "Mission", "Core Values", "Our Team", "Contact Us"],
            },
          ],
        };
      case "Resources":
        return {
          categories: [
            {
              title: "Enabling Capabilities",
              icon: "🌱",
              items: ["Investment Guide", "Tax Incentives", "Land Policies"],
            },
            {
              title: "Strategic Technologies",
              icon: "⚙️",
              items: ["Digital Tools", "Publications", "Regulations"],
            },
            {
              title: "Investment Ecosystems",
              icon: "💼",
              items: ["Downloadable PDFs", "Case Studies", "Reports"],
            },
          ],
        };
      case "Guideline & Regulations":
        return {
          categories: [
            {
              title: "GOSIPA Guideline & Regulations",
              icon: "🌱",
              items: ["Investment Guidelines", "Guide to Access Credit", "GOSIPA Regulations", "Application Form"],
            },
          ],
        };
      default:
        return { categories: [] };
    }
  };

  const dropdownContent = getDropdownContent(children as string);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className="text-white hover:text-blue-200 px-3 py-2 text-sm font-medium"
      >
        {children}
      </Link>
      {isHovered && dropdownContent.categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-64 bg-gray-100 rounded-lg shadow-lg p-4 z-50 hidden md:block"
        >
          <div className="grid grid-cols-1 gap-4">
            {dropdownContent.categories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full mr-2">
                    {category.icon}
                  </span>
                  {category.title}
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="hover:text-blue-600">
                      <Link href={children === "Guideline & Regulations" ? `/guidelines#${item.toLowerCase().replace(/\s+/g, '-')}` : `${href}#${item.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 box-border">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Gombe State Promotion agency</title>
        <link rel="icon" href="./images/logo.png" />
      </Head>
      {/* Search Input */}
      <div className="">
        <input
          type="hidden"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search investment sectors..."
          className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      {/* Hero Section with Single Image */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${i1.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-transparent" />
        <header className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src={logo} alt="GOSIPA Logo" width={70} height={70} className="rounded-full" />
            <nav className="hidden md:flex space-x-3">
              <NavLink href="#">Home</NavLink>
              <NavLink href="#why-gombe">Why Gombe</NavLink>
              <NavLink href="#key-sectors">Sectors</NavLink>
              <NavLink href="#about">About Us</NavLink>
              <NavLink href="/guidelines">Guideline & Regulations</NavLink>
              <NavLink href="#updates">Updates</NavLink>
              <NavLink href="#resources">Resources</NavLink>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
              Contact Us
            </Button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-xl sm:text-2xl"
            >
              ☰
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden absolute top-14 sm:top-16 right-4 bg-white/90 rounded-lg shadow-lg p-3 space-y-1.5 z-40">
              <Link href="#" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                Home
              </Link>
              <Link href="#why-gombe" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                Why Gombe
              </Link>
              <Link href="#key-sectors" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                Sectors
              </Link>
              <Link href="#about" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                About Us
              </Link>
              <Link href="/guidelines" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                Guideline & Regulations
              </Link>
              <Link href="#updates" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                Updates
              </Link>
              <Link href="#resources" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                Resources
              </Link>
            </div>
          )}
        </header>

        <div className="relative z-20 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col items-center md:flex-row md:items-center justify-between w-full">
            <div className="text-white space-y-4 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-wide">
                <span className="text-purple-400">Invest in Gombe</span><br />
              </h2>
              <p className="text-base sm:text-lg md:text-xl max-w-md mx-auto md:mx-0">
                Unlock sustainable growth and achieve the triple bottom line
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-2 rounded-full shadow-md transition duration-300 text-sm sm:text-base"
                  onClick={() => document.getElementById("key-sectors")?.scrollIntoView({ behavior: "smooth" })}
                >
                  + Explore Sectors
                </Button>
              </div>
            </div>
            <Card className="w-full sm:w-80 md:w-1/3 bg-white/90 text-gray-900 shadow-2xl rounded-2xl mt-6 md:mt-0 p-3 sm:p-4">
              <CardContent className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src={i1}
                    alt="Video thumbnail"
                    width={96}
                    height={64}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-green-500/20 rounded-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-semibold truncate">
                    Ranked the 1st State in Nigeria
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    in Ease of Doing Bussiness According to State Action on Bussiness Enabling Reforms Report for the year 2021 & 2022
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Sectors Section */}
      <motion.section
        id="sectors"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12 text-center tracking-wide">
            Priority Sectors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "Agriculture",
                description: "Opportunities in Agriculture are thriving in Gombe State.",
                image: agriculture,
              },
              {
                name: "Energy",
                description: "Opportunities in Renewable Energy are thriving in Gombe State.",
                image: energy,
              },
              {
                name: "Manufacturing & Industrialization",
                description: "Opportunities in Manufacturing & Industrialization are thriving in Gombe State.",
                image: manufacturing,
              },
              {
                name: "Mining & Solid Minerals",
                description: "Opportunities in Mining & Solid Minerals are thriving in Gombe State.",
                image: mining,
              },
              {
                name: "ICT & Innovation",
                description: "Opportunities in ICT & Innovation are thriving in Gombe State.",
                image: ict,
              },
              {
                name: "Real Estate & Urban Infrastructure",
                description: "Opportunities in Real Estate & Urban Infrastructure are thriving in Gombe State.",
                image: realEstate,
              },
              {
                name: "Tourism",
                description: "Opportunities in Tourism are thriving in Gombe State.",
                image: tourism,
              },
            ].map(({ name, description, image }, index) => (
              <Card
                key={name}
                className="relative w-full h-64 bg-gray-200 rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                </div>
                <CardContent className="relative z-10 h-full flex flex-col justify-between p-6">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-semibold">
                      {index + 1}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-white">{name}</h4>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Investment Page Content */}
      <motion.section
        id="key-sectors"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-8 bg-gray-100 flex justify-center"
      >
        <div className="w-full max-w-7xl px-4 sm:px-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-0 text-center tracking-wide">
            Explore Investment Sectors
          </h3>
          <RadialChartPage searchQuery={searchQuery} />
        </div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        id="gallery"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12 tracking-wide">
            Discover Gombe
          </h3>
          <ImageSlider images={galleryImages} />
        </div>
      </motion.section>

      {/* Why Gombe Section */}
      <motion.section
        id="why-gombe"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 tracking-wide">
            Why Gombe?
          </h3>
          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Gombe State offers a strategic location, skilled workforce, tax incentives, and abundant natural resources, making it ideal for investment.
          </p>
        </div>
      </motion.section>

      {/* Resources Section */}
      <motion.section
        id="resources"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12 tracking-wide">
            Downloadable Resources
          </h3>
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <Button
              variant="outline"
              className="flex items-center text-sm sm:text-base px-4 sm:px-6 py-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition duration-300 rounded-full"
            >
              Investment Guide (PDF)
            </Button>
            <Button
              variant="outline"
              className="flex items-center text-sm sm:text-base px-4 sm:px-6 py-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition duration-300 rounded-full"
            >
              Tax Incentives Overview
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
          <Image src={logo} alt="GOSIPA Logo" width={100} height={50} className="mb-4" />
          <div className="text-center">
            <p className="text-lg font-semibold text-blue-600">GOSIPA</p>
            <p className="text-sm text-gray-600 mt-2">Your guide for Business & Talent Development</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact Us</span>
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 uppercase mb-4 text-center md:text-left">Main Sections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
                <ul className="space-y-2">
                  <li><Link href="#services" className="hover:underline">Our Services</Link></li>
                  <li><Link href="#why-gombe" className="hover:underline">Why Gombe</Link></li>
                  <li><Link href="#key-sectors" className="hover:underline">Key Sectors</Link></li>
                  <li><Link href="#about" className="hover:underline">About GOSIPA</Link></li>
                </ul>
                <ul className="space-y-2">
                  <li><Link href="#press" className="hover:underline">Press & Media</Link></li>
                  <li><Link href="#resources" className="hover:underline">Resources</Link></li>
                  <li><Link href="#incentives" className="hover:underline">Incentives</Link></li>
                  <li><Link href="#strategic-allies" className="hover:underline">Strategic Allies</Link></li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 uppercase mb-4 text-center md:text-left">Additional Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-600">
                <ul className="space-y-2">
                  <li><Link href="#free-zones" className="hover:underline">Free Zones</Link></li>
                  <li><Link href="#rising-cities" className="hover:underline">Rising Cities</Link></li>
                </ul>
                <ul className="space-y-2">
                  <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                  <li><Link href="/support" className="hover:underline">Support</Link></li>
                  <li><Link href="/language" className="hover:underline">Español</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <Link href="https://linkedin.com" className="text-gray-600 hover:text-blue-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.866-3.063-1.867 0-2.154 1.459-2.154 2.966v5.701h-3v-11h2.882v1.509h.041c.401-.759 1.381-1.557 2.834-1.557 3.03 0 3.593 1.994 3.593 4.587v6.461z"/>
              </svg>
            </Link>
            <Link href="https://twitter.com" className="text-gray-600 hover:text-blue-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .386.044.762.128 1.122-4.087-.205-7.719-2.165-10.141-5.144-.424.729-.666 1.575-.666 2.475 0 1.708.869 3.216 2.188 4.099-.806-.026-1.566-.247-2.229-.616v.062c0 2.385 1.698 4.374 3.946 4.827-.413.111-.847.171-1.296.171-.316 0-.624-.031-.925-.088.625 1.953 2.444 3.377 4.6 3.417-1.686 1.32-3.809 2.105-6.115 2.105-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.054 0 14.002-7.496 14.002-14.002 0-.213-.005-.426-.014-.637.961-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </Link>
            <Link href="https://youtube.com" className="text-gray-600 hover:text-blue-600">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.868-.501-9.396-.501-9.396-.501s-7.529 0-9.396.501a3.007 3.007 0 00-2.088 2.088c-.501 1.868-.501 5.794-.501 5.794s0 3.927.501 5.794a3.007 3.007 0 002.088 2.088c1.868.501 9.396.501 9.396.501s7.529 0 9.396-.501a3.007 3.007 0 002.088-2.088c.501-1.868.501-5.794.501-5.794s0-3.927-.501-5.794zm-13.941 9.38v-7.168l6.266 3.584-6.266 3.584z"/>
              </svg>
            </Link>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <span className="text-sm text-gray-500">Carbon Neutral</span>
            <span className="text-sm text-gray-500">Great Place to Work</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">© 2025 GOSIPA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}