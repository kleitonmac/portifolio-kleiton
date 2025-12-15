"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "./i18n/LanguageContext";
import profileImage from "../assets/terno.png";

export function AboutSection() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-accent/30 to-secondary/30"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-600 dark:text-white">{t("about_title")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="relative w-80 h-80 mx-auto mb-8 md:mb-0"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-2xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl transform -rotate-3 translate-x-4 translate-y-4"></div>
              <div className="relative w-full h-full bg-background rounded-2xl border-2 border-border overflow-hidden">
                <motion.img
                  src={profileImage}
                  alt="Kleiton Macedo"
                  className="w-full h-full object-cover object-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl text-gray-600 dark:text-white">{t("about_hello")}</h3>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
              {t("about_p1")}
            </p>
            <p className="text-gray-600 dark:text-gray-200 leading-relaxed">
              {t("about_p2")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {[
                { label: t("about_stats_projects"), value: "10+" },
                { label: t("about_stats_years"), value: "1+" },
                { label: t("about_stats_clients"), value: "10+" },
                { label: t("about_stats_techs"), value: "10+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 bg-card border border-border rounded-lg"
                >
                  <div className="text-2xl text-primary dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}