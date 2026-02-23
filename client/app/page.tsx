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
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, syncTouch: true });
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
        {/* Dot grid background */}
        <div className="pointer-events-none fixed inset-0 soft-grid opacity-[0.2]" />

        {/* Hero purple blob */}
        <div
          className="pointer-events-none fixed -top-52 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)" }}
        />

        {/* Right accent blob */}
        <div
          className="pointer-events-none fixed top-[50vh] right-[-180px] h-[500px] w-[500px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)" }}
        />

        {/* Bottom accent */}
        <div
          className="pointer-events-none fixed bottom-0 left-0 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(251,113,133,0.07), transparent 70%)" }}
        />

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