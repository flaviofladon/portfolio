"use client";

import { useState } from "react";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ChatWidget from "@/components/ChatWidget";

import RevealSection from "@/components/RevealSection";
import PortfolioInsights from "@/components/PortfolioInsights";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Nav onOpenChat={() => setChatOpen(true)} />

      <main className="site-main">
        <RevealSection immediate>
          <Hero onOpenChat={() => setChatOpen(true)} />
        </RevealSection>

        <RevealSection>
          <About />
        </RevealSection>

        <RevealSection>
          <PortfolioInsights />
        </RevealSection>

        <RevealSection>
          <Stack />
        </RevealSection>

        <RevealSection>
          <Timeline />
        </RevealSection>

        <RevealSection>
          <Projects />
        </RevealSection>

        <RevealSection>
          <Contact />
        </RevealSection>
      </main>

      <ChatWidget
        open={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}