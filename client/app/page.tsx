"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import About from "@/components/About";
import FeaturedProjects from "@/components/FeaturedProjects";
import TerminalSection from "@/components/TerminalSection";
import SkillsGrid from "@/components/SkillsGrid";
import Timeline from "@/components/Timeline";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Prevent browser from trying to scroll to previous position on refresh
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    const lenis = new Lenis({ duration: 1.3, smoothWheel: true, syncTouch: true });
    const raf = (t: number) => {
      lenis.raf(t);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* ── Global overlays ─────────────────────── */}

      {/* Noise texture grain */}
      <div className="noise" aria-hidden />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Custom cursor */}
      <CursorGlow />

      {/* Preloader */}
      {!loadingDone && <Preloader onDone={() => setLoadingDone(true)} />}

      {/* ── Background ──────────────────────────── */}

      {/* Dot grid */}
      <div className="pointer-events-none fixed inset-0 soft-grid opacity-[0.18]" aria-hidden />

      {/* Hero purple blob */}
      <div
        className="pointer-events-none fixed -top-60 left-1/2 h-200 w-200 -translate-x-1/2 rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle,rgba(168,85,247,0.12),transparent 70%)" }}
        aria-hidden
      />

      {/* Right sky blob */}
      <div
        className="pointer-events-none fixed top-[45vh] -right-50 h-150 w-150 rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle,rgba(56,189,248,0.08),transparent 70%)" }}
        aria-hidden
      />

      {/* Bottom rose blob */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 h-125 w-125 rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle,rgba(251,113,133,0.07),transparent 70%)" }}
        aria-hidden
      />

      {/* ── Content ─────────────────────────────── */}
      <div className="relative">
        <Navbar />

        <section id="top">
          <Hero />
        </section>

        <section id="proof">
          <ProofStrip />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="projects">
          <FeaturedProjects />
        </section>

        <section id="terminal">
          <TerminalSection />
        </section>

        <section id="skills">
          <SkillsGrid />
        </section>

        <section id="journey">
          <Timeline />
        </section>

        <section id="contact">
          <ContactCTA />
        </section>

        <Footer />
      </div>
    </main>
  );
}