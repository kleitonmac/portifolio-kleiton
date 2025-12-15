"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "./i18n/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // State for typewriter animation
  const [displayText, setDisplayText] = useState("");
  const fullName = t("hero_intro");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullName.length) {
        setDisplayText(fullName.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 120); // Adjust speed here (120ms per character)

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = Array.from(
    { length: 6 },
    (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }),
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/20"
    >
      {/* Animated background elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 blur-sm"
          style={{
            width: element.size,
            height: element.size,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + element.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}

      {/* Parallax grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
          }}
          className="transform-gpu"
        >
          <div className="relative">
            <motion.h1
              className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block w-1 h-20 md:h-32 bg-primary ml-2"
                style={{
                  display: displayText.length < fullName.length ? "inline-block" : "none"
                }}
              />
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 mb-8"
          >
            {t("hero_subtitle")}

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t("hero_view_projects")}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-primary text-primary rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {t("hero_contact_me")}
            </motion.a>
            <motion.a
              href="https://docs.google.com/document/d/18LhyF0nnpagR8vWU-xOjf7lKDdOtOjep/export?format=pdf"
              download="Kleiton-Santos-Macedo-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-green-500 text-gray-700 dark:text-gray-200 rounded-full transition-all duration-300 hover:text-green-600 hover:border-green-600"
            >
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating 3D shapes */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-60"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            z: [0, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transform: `translateZ(50px)`,
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full opacity-60"
          animate={{
            rotateX: [360, 0],
            rotateY: [360, 0],
            z: [0, -100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transform: `translateZ(30px)`,
          }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}