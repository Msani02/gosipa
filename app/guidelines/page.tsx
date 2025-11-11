"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "../../app/images/logo.png";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Polyfill for Promise.withResolvers (for Node.js < 18.17.0)
if (!Promise.withResolvers) {
  Promise.withResolvers = function <T>(): PromiseWithResolvers<T> {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;

    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { promise, resolve, reject };
  };
}




// Define TypeScript interface for PDF items
interface PdfItem {
  name: string;
  file: string;
  id: string;
}

export default function GuidelinesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string>("investment-guidelines");
  const [error, setError] = useState<string | null>(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const pdfs: PdfItem[] = [
    { name: "Investment Guidelines", file: "/investment-guidelines.pdf", id: "investment-guidelines" },
    { name: "Guide to Access Credit", file: "/accessCreadit.pdf", id: "guide-to-access-credit" },
    { name: "GOSIPA Regulations", file: "/regulazations.pdf", id: "gosipa-regulations" },
    {
      name: "Application Form",
      file: "/Unsolicited-Project-Proposals-and-their-Qualifying-Criteria.pdf",
      id: "application-form",
    },
  ];

  // const handlePdfError = (err: Error) => {
  //   const selected = pdfs.find((pdf) => pdf.id === selectedPdf)?.name ?? "document";
  //   setError(`Failed to load ${selected}. Please try downloading it directly or contact support.`);
  //   console.error("PDF Load Error:", err);
  // };

  // Use CDN worker (working) with local fallback option
  const workerUrl = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
  // const workerUrl = "/pdf.worker.min.js"; // Uncomment for local worker (requires public/pdf.worker.min.js)

  // Find the selected PDF
  const currentPdf = pdfs.find((pdf) => pdf.id === selectedPdf);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-gray-900 py-4 px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <Image src={logo} alt="GOSIPA Logo" width={60} height={60} className="rounded-full sm:w-16 sm:h-16" />
          </Link>
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            <Link href="/" className="text-white hover:text-blue-200 px-2 py-2 text-xs sm:text-sm font-medium">
              Home
            </Link>
            <Link href="/#why-gombe" className="text-white hover:text-blue-200 px-2 py-2 text-xs sm:text-sm font-medium">
              Why Gombe
            </Link>
            <Link href="/#key-sectors" className="text-white hover:text-blue-200 px-2 py-2 text-xs sm:text-sm font-medium">
              Sectors
            </Link>
            <Link href="/#about" className="text-white hover:text-blue-200 px-2 py-2 text-xs sm:text-sm font-medium">
              About Us
            </Link>
            <Link href="/guidelines" className="text-white hover:text-blue-200 px-2 py-2 text-xs sm:text-sm font-medium">
              Guideline & Regulations
            </Link>
            <Link href="/#updates" className="text-white hover:text-blue-200 px-2 py-2 text-xs sm:text-sm font-medium">
              Updates
            </Link>
            <Link href="/#resources" className="text-white hover:text-blue-200 px-2 py-2 text-xs sm:text-sm font-medium">
              Resources
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
              Contact Us
            </Button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-xl sm:text-2xl"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden absolute top-14 sm:top-16 right-4 bg-white/90 rounded-lg shadow-lg p-3 space-y-1.5 z-40"
              >
                <Link href="/" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                  Home
                </Link>
                <Link href="/#why-gombe" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                  Why Gombe
                </Link>
                <Link href="/#key-sectors" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                  Sectors
                </Link>
                <Link href="/#about" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                  About Us
                </Link>
                <Link href="/guidelines" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                  Guideline & Regulations
                </Link>
                <Link href="/#updates" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                  Updates
                </Link>
                <Link href="/#resources" className="block hover:text-blue-600 px-2 py-1 text-xs sm:text-sm">
                  Resources
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 tracking-wide">
            Guideline & Regulations
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8">
            Explore Gombe State&apos;s comprehensive guidelines and regulations to understand investment opportunities, compliance requirements, and available incentives.
          </p>

          {/* PDF Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-6">
            {pdfs.map((pdf) => (
              <Button
                key={pdf.id}
                onClick={() => {
                  setSelectedPdf(pdf.id);
                  setError(null);
                }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-colors ${
                  selectedPdf === pdf.id
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {pdf.name}
              </Button>
            ))}
          </div>

          {/* PDF Viewer */}
          <motion.div
            key={selectedPdf}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6 max-w-full sm:max-w-4xl mx-auto"
          >
            {error ? (
              <div className="text-red-600 text-center">
                <p className="text-sm sm:text-base">{error}</p>
                <Button
                  onClick={() => setError(null)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
                >
                  Retry
                </Button>
                <Link href="/#contact" className="block mt-2 text-blue-600 underline text-xs sm:text-sm">
                  Contact Support
                </Link>
              </div>
            ) : currentPdf ? (
              <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-auto">
                <Worker workerUrl={workerUrl}>
                    <Viewer
                      fileUrl={currentPdf.file}
                      plugins={[defaultLayoutPluginInstance]}
                    />

                </Worker>
              </div>
            ) : (
              <p className="text-red-600 text-center text-sm sm:text-base">
                Error: Selected document not found.
              </p>
            )}
          </motion.div>

          {/* Download Button */}
          {currentPdf && (
            <a href={currentPdf.file} download={`${currentPdf.id}.pdf`}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg">
                Download {currentPdf.name} (PDF)
              </Button>
            </a>
          )}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
          <Image src={logo} alt="GOSIPA Logo" width={80} height={40} className="mb-4 sm:w-24 sm:h-12" />
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold text-blue-600">GOSIPA</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Your guide for Business & Talent Development</p>
          </div>
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <Link href="https://linkedin.com" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.027-3.063-1.866-3.063-1.867 0-2.154 1.459-2.154 2.966v5.701h-3v-11h2.882v1.509h.041c.401-.759 1.381-1.557 2.834-1.557 3.03 0 3.593 1.994 3.593 4.587v6.461z" />
              </svg>
            </Link>
            <Link href="https://twitter.com" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .386.044.762.128 1.122-4.087-.205-7.719-2.165-10.141-5.144-.424.729-.666 1.575-.666 2.475 0 1.708.869 3.216 2.188 4.099-.806-.026-1.566-.247-2.229-.616v.062c0 2.385 1.698 4.374 3.946 4.827-.413.111-.847.171-1.296.171-.316 0-.624-.031-.925-.088.625 1.953 2.444 3.377 4.6 3.417-1.686 1.32-3.809 2.105-6.115 2.105-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.054 0 14.002-7.496 14.002-14.002 0-.213-.005-.426-.014-.637.961-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
            <Link href="https://youtube.com" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.868-.501-9.396-.501-9.396-.501s-7.529 0-9.396.501a3.007 3.007 0 00-2.088 2.088c-.501 1.868-.501 5.794-.501 5.794s0 3.927.501 5.794a3.007 3.007 0 002.088 2.088c1.868.501 9.396.501 9.396.501s7.529 0 9.396-.501a3.007 3.007 0 002.088-2.088c.501-1.868.501-5.794.501-5.794s0-3.927-.501-5.794zm-13.941 9.38v-7.168l6.266 3.584-6.266 3.584z" />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center space-x-4 sm:space-x-6 mt-2 sm:mt-4">
            <span className="text-xs sm:text-sm text-gray-500">Carbon Neutral</span>
            <span className="text-xs sm:text-sm text-gray-500">Great Place to Work</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">© 2025 GOSIPA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}