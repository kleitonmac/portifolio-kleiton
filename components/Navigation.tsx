"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "./i18n/LanguageContext";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { t, locale, setLocale } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    return (saved as "light" | "dark") || "light";
  });

  const navItems = [
    { id: "home", label: t("nav_home") },
    { id: "about", label: t("nav_about") },
    { id: "skills", label: t("nav_skills") },
    { id: "projects", label: t("nav_projects") },
    { id: "contact", label: t("nav_contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll when mobile menu is open and handle Escape key to close
  useEffect(() => {
    const root = document.documentElement;
    if (isMenuOpen) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Kleiton
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 transition-colors ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </motion.button>
            ))}

            {/* Language toggle (flags) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocale(locale === "en" ? "pt-BR" : "en")}
              className="px-3 py-2 rounded-md border border-border text-sm"
              aria-label="Toggle language"
              title={locale === "en" ? "Mudar para Português (Brasil)" : "Switch to English"}
            >
            <span className="text-xl align-middle">
            <i className={locale === "en" ? "fi fi-us" : "fi fi-br"}></i>
          </span>
            </motion.button>

            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-3 py-2 rounded-md border border-border text-sm"
              aria-label="Toggle theme"
              title={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
            >
              <span className="text-xl align-middle">{theme === "light" ? "🌙" : "☀️"}</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="w-full h-0.5 bg-foreground"></span>
              <span className="w-full h-0.5 bg-foreground"></span>
              <span className="w-full h-0.5 bg-foreground"></span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Dim background */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>

          {/* Sliding drawer from the left, with left-aligned content */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 h-full w-11/12 max-w-xs bg-background border-r border-border p-6 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Kleiton</span>
              <button
                className="p-2"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block w-5 h-0.5 bg-foreground rotate-45 translate-y-0.5"></span>
                <span className="block w-5 h-0.5 bg-foreground -rotate-45 -translate-y-0.5"></span>
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-3 rounded-md text-base transition-colors ${
                    activeSection === item.id
                      ? "bg-muted text-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Bottom controls: language and theme toggles */}
            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <button
                onClick={() => setLocale(locale === "en" ? "pt-BR" : "en")}
                className="flex-1 px-3 py-2 rounded-md border border-border text-sm"
                aria-label="Toggle language"
                title={locale === "en" ? "Mudar para Português (Brasil)" : "Switch to English"}
              >
                <span className="text-xl align-middle">
                  <i className={locale === "en" ? "fi fi-us" : "fi fi-br"}></i>
                </span>
              </button>

              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex-1 px-3 py-2 rounded-md border border-border text-sm"
                aria-label="Toggle theme"
                title={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
              >
                <span className="text-xl align-middle">{theme === "light" ? "🌙" : "☀️"}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.nav>
  );
}