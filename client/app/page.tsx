"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

import Preloader from "@/components/Preloader";
import CursorGlow from "@/components/CursorGlow";
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
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
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
      <CursorGlow />
      {!loadingDone && <Preloader onDone={() => setLoadingDone(true)} />}

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 soft-grid opacity-[0.25]" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
               style={{ background: "rgba(168, 85, 247, 0.18)" }} />
          <div className="absolute top-[45vh] right-[-120px] h-[420px] w-[420px] rounded-full blur-3xl"
               style={{ background: "rgba(59, 130, 246, 0.10)" }} />
        </div>

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