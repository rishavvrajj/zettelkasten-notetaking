"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [pricingTab, setPricingTab] = useState<"workspace" | "pro">("workspace");

  return (
    <div className="min-h-screen flex flex-col bg-[#1E1E1E] text-neutral-100 selection:bg-neutral-800">
      <Navbar />

      {/* Top Banner */}
      <div className="bg-[#121212] border-b border-neutral-800 py-2 px-4 text-center text-xs text-neutral-400">
        <span className="font-medium text-white">ZK is now available for your workspace</span> → <Link href="/notes" className="underline hover:text-white">Try live demo</Link>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Zettelkasten Knowledge Workspace
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Magically simplify your <br className="hidden sm:inline" />
            <span className="text-neutral-400">knowledge and notes.</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Automated knowledge graphs, effortless note-taking, and bi-directional linking. Set up in 10 mins. Back to thinking by 9:32pm.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/notes"
              className="w-full sm:w-auto px-6 py-3 text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-200 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Get started</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#pricing"
              className="w-full sm:w-auto px-6 py-3 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-all flex items-center justify-center"
            >
              Pricing →
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="max-w-5xl mx-auto w-full mt-12 relative z-10 px-4">
          <div className="rounded-xl border border-neutral-800 bg-[#121212] shadow-2xl overflow-hidden text-left">
            <div className="px-4 py-3 bg-[#181818] border-b border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-2 font-mono text-neutral-400">Zettelkasten Workspace — Graph & Notes</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-neutral-400">
                <span className="hidden sm:inline">Nodes: 12</span>
                <span className="hidden sm:inline">Links: 18</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">Synced</span>
              </div>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#121212]">
              <div className="p-4 rounded-lg bg-[#181818] border border-neutral-800 space-y-2">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">Total Nodes</div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-[11px] text-emerald-400 font-medium">+4 new this week</div>
              </div>
              <div className="p-4 rounded-lg bg-[#181818] border border-neutral-800 space-y-2">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">Wiki-Links</div>
                <div className="text-2xl font-bold text-white">28</div>
                <div className="text-[11px] text-neutral-400">Fully connected graph</div>
              </div>
              <div className="p-4 rounded-lg bg-[#181818] border border-neutral-800 space-y-2">
                <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wide">Active Workspace</div>
                <div className="text-2xl font-bold text-white">Zettelkasten</div>
                <div className="text-[11px] text-emerald-400 font-medium">Local persistence ready</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Ticker */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Trusted by fast-growing researchers and writers</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 text-xs font-semibold text-neutral-300">
            <span>RESEND</span>
            <span>MAGIC PATTERNS</span>
            <span>ONYX</span>
            <span>CIRCLEBACK</span>
            <span>MORPH</span>
            <span>OUTLINE</span>
          </div>
        </div>
      </section>

      {/* Testimonial Grid Section */}
      <section className="py-20 px-6 bg-[#151515] border-t border-neutral-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Testimonials</h2>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Built for ambitious founders & thinkers
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Discover how connected notes and atomic knowledge graphs transform complex learning into effortless clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#121212] border border-neutral-800 space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                &ldquo;Zettelkasten seems to understand the needs of early-stage YC companies fundamentally better than the competitors. With this tool, it&apos;s a no-brainer.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-200">
                  BP
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Roopp Pal</div>
                  <div className="text-[11px] text-neutral-400">Founder at Slate AI</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#121212] border border-neutral-800 space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                &ldquo;Working with Andy to help determine whether Finta was a fit for our company was an excellent experience. We was fully transparent regarding the potential challenges...&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-200">
                  JS
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Jake Stevens</div>
                  <div className="text-[11px] text-neutral-400">Founder at Lumina</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#121212] border border-neutral-800 space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                &ldquo;Expense categorization is fast and accurate, provides the best possible quickbooks. Onboarding was so smooth. Outstanding user experience!&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-200">
                  CB
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Colin Barnard</div>
                  <div className="text-[11px] text-neutral-400">Founder at Velo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="py-20 px-6 bg-[#1E1E1E] border-t border-neutral-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Zero Stress Note-Taking</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Expert prep, filing, and dedicated support for your round-the-clock peace of mind.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Keep your atomic notes meticulously structured with separated titles and clean text areas. Never worry about markdown clutter again.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                <span>Automatic wiki-link detection & bidirectional graphs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
                <span>Instant live outline generation & table of contents</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#121212] border border-neutral-800 space-y-4 shadow-sm">
            <div className="text-xs font-semibold text-neutral-400 uppercase">Live Workspace Preview</div>
            <div className="p-4 rounded-lg bg-[#181818] border border-neutral-800 space-y-2">
              <div className="text-sm font-bold text-white">Zettelkasten Method</div>
              <div className="text-xs text-neutral-400">The slip box method relies on atomic notes connected through bi-directional wiki-links.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-[#151515] border-t border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Pricing</span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Pricing for inception to scale
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Transparent and scales with features you use, not your expenses.
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg bg-neutral-900 border border-neutral-800 p-1 text-xs font-medium">
              <button
                onClick={() => setPricingTab("workspace")}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  pricingTab === "workspace"
                    ? "bg-[#1E1E1E] text-white shadow-sm"
                    : "text-neutral-400"
                }`}
              >
                Workspace
              </button>
              <button
                onClick={() => setPricingTab("pro")}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  pricingTab === "pro"
                    ? "bg-[#1E1E1E] text-white shadow-sm"
                    : "text-neutral-400"
                }`}
              >
                Pro Graph
              </button>
            </div>
          </div>

          <div className="max-w-md mx-auto p-8 rounded-xl bg-[#121212] border border-neutral-800 space-y-6 shadow-2xl text-left">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-neutral-400 uppercase">Zettelkasten Plan</div>
              <div className="text-3xl font-bold text-white">
                {pricingTab === "workspace" ? "$0" : "$19"} <span className="text-xs font-normal text-neutral-400">/ month</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Local Storage Persistence</span>
                <span className="font-medium text-white">Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Interactive Knowledge Graph</span>
                <span className="font-medium text-white">Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Bi-directional Wiki-Links</span>
                <span className="font-medium text-white">Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Advanced Export & Backup</span>
                <span className="font-medium text-white">{pricingTab === "pro" ? "Included" : "$29/mo"}</span>
              </div>
            </div>

            <Link
              href="/notes"
              className="w-full py-3 text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-200 rounded-lg shadow-sm transition-all flex items-center justify-center"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-6 bg-[#0E0E0E] text-white text-center border-t border-neutral-800">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Set up in 10 mins. <br />
            Back to building by 9:32pm.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Built for founders and thinkers who want to focus on their notes, not their tools.
          </p>
          <div>
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium text-neutral-900 bg-white hover:bg-neutral-200 rounded-lg shadow-sm transition-all"
            >
              <span>Get started</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
