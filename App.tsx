"use client";

import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./components/i18n/LanguageContext";
import { ContactSection } from "./components/ContactSection";


export default function App() {
  useEffect(() => {
    document.title = "Kleiton | Portifólio";
  }, []);
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
 
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}