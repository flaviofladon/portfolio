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

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Nav onOpenChat={() => setChatOpen(true)} />
      <Hero onOpenChat={() => setChatOpen(true)} />
      <About />
      <Stack />
      <Timeline />
      <Projects />
      <Contact />
      <ChatWidget
        open={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}
