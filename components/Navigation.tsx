"use client"; 
// Indica que este componente roda no cliente (Next.js - App Router)

import { motion } from "motion/react"; 
// Importa animações do Motion (framer-motion)

import { useState, useEffect } from "react"; 
// Hooks do React para estados e efeitos

import { useLanguage } from "./i18n/LanguageContext"; 
// Hook personalizado para alternar idiomas

export function Navigation() {

  // Guarda qual seção está ativa (destacada no menu)
  const [activeSection, setActiveSection] = useState("home");

  // Detecta se usuário rolou a página, usado para estilos do nav
  const [scrolled, setScrolled] = useState(false);

  // Sistema de tradução / idioma
  const { t, locale, setLocale } = useLanguage();

  // Controla se o menu mobile está aberto
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tema claro/escuro com persistência no localStorage
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light"; // Evita erro no SSR
    const saved = localStorage.getItem("theme"); // Busca tema salvo
    return (saved as "light" | "dark") || "light";
  });

  // Itens do menu de navegação
  const navItems = [
    { id: "home", label: t("nav_home") },
    { id: "about", label: t("nav_about") },
    { id: "skills", label: t("nav_skills") },
    { id: "projects", label: t("nav_projects") },
    { id: "contact", label: t("nav_contact") },
  ];

  useEffect(() => {
    // Monitora rolagem da página
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Define como "rolou" após 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Limpa o evento
  }, []);

  // Controla bloqueio de scroll ao abrir menu + tecla ESC para fechar
  useEffect(() => {
    const root = document.documentElement;
    if (isMenuOpen) {
      root.classList.add("overflow-hidden"); // Bloqueia rolagem da página
    } else {
      root.classList.remove("overflow-hidden");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false); // Fecha com ESC
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Aplica o tema no HTML e salva no localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // Salva para manter ao recarregar
  }, [theme]);

  // Função que rola suavemente até uma seção e fecha o menu mobile
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Rolagem suave
      setActiveSection(sectionId); // Atualiza o item ativo no menu
      setIsMenuOpen(false); // Fecha menu mobile
    }
  };

  return (
    // Barra de navegação com animação inicial de slide
    <motion.nav
      initial={{ y: -100 }} // Começa fora da tela
      animate={{ y: 0 }} // Desce até o topo
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background border-b border-border`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logotipo / Nome que volta ao topo ao clicar */}
          <motion.div
            whileHover={{ scale: 1.05 }} // Cresce ao passar o mouse
            className="cursor-pointer"
            onClick={() => scrollToSection("home")} // Volta pro topo
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Kleiton
            </span>
          </motion.div>

          {/* Menu Desktop - só aparece em telas grandes */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-2 transition-colors ${
                  activeSection === item.id
                    ? "text-primary" // Se ativo, fica colorido
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {/* Linha abaixo do item ativo */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </motion.button>
            ))}

            {/* Botão de idioma */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLocale(locale === "en" ? "pt-BR" : "en")}
              className="px-3 py-2 rounded-md border border-border text-sm"
              aria-label="Toggle language"
              title={locale === "en" ? "Mudar para Português (Brasil)" : "Switch to English"}
            >
              <span className="text-xl align-middle">
                <i className={locale === "en" ? "fi fi-us" : "fi fi-br"}></i> {/* Bandeiras */}
              </span>
            </motion.button>

            {/* Botão tema claro/escuro */}
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

          {/* Botão de menu mobile (hamburger) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2" // Só no mobile
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)} // Alterna abrir/fechar
          >
            {/* Tracinhos do hamburger */}
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className="w-full h-0.5 bg-foreground"></span>
              <span className="w-full h-0.5 bg-foreground"></span>
              <span className="w-full h-0.5 bg-foreground"></span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Menu Mobile - overlay com fundo escuro e drawer lateral */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>

          <motion.div
            initial={{ x: "-100%" }} // Começa fora da tela
            animate={{ x: 0 }} // Desliza para dentro
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 h-full w-11/12 bg-background border-r border-border p-6 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Cabeçalho do menu mobile */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Kleiton</span>
              <button
                className="p-2"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                {/* Ícone de fechar (X) */}
                <span className="block w-5 h-0.5 bg-foreground rotate-45 translate-y-0.5"></span>
                <span className="block w-5 h-0.5 bg-foreground -rotate-45 -translate-y-0.5"></span>
              </button>
            </div>

            {/* Lista de itens do menu mobile */}
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

            {/* Rodapé com botões de idioma e tema */}
            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <button
                onClick={() => setLocale(locale === "en" ? "pt-BR" : "en")}
                className="flex-1 px-3 py-2 rounded-md border border-border text-sm"
                aria-label="Toggle language"
              >
                <span className="text-xl align-middle">
                  <i className={locale === "en" ? "fi fi-us" : "fi fi-br"}></i>
                </span>
              </button>

              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="flex-1 px-3 py-2 rounded-md border border-border text-sm"
                aria-label="Toggle theme"
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
