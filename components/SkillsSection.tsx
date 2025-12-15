"use client";

import { motion } from "motion/react";
import { useLanguage } from "./i18n/LanguageContext";

export function SkillsSection() {
  const { t } = useLanguage();
  const skills = [
    {
      category: "Frontend",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Motion"],
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
    },
    {
      category: "DevOps",
      technologies: ["Docker", "AWS", "Vercel", "GitHub Actions", "Kubernetes"],
      icon: "🚀",
      color: "from-purple-500 to-pink-500",
    },
    {
      category: "Design",
      technologies: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"],
      icon: "✨",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-600 dark:text-white">{t("skills_title")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">{t("skills_desc")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5, 
                z: 50,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000"
            >
              <div
                className="relative h-full bg-card border border-border rounded-xl p-6 transform-gpu transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    {skill.icon}
                  </motion.div>
                  
                  <h3 className="text-xl mb-4 text-white dark:text-white">{skill.category}</h3>
                  
                  <div className="space-y-3">
                    {skill.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (techIndex * 0.05) }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: techIndex * 0.2 }}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-200">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 3D effect layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-transparent rounded-xl transform translate-z-[-1px] group-hover:translate-z-[-2px] transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-muted/20 rounded-xl transform translate-z-[-2px] group-hover:translate-z-[-4px] transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating skill icons */}
        <div className="relative mt-20 h-40 overflow-hidden">
          {["⚛️", "🔥", "⚡", "🎯", "🛠️", "💎", "🚀", "✨"].map((icon, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl opacity-30"
              style={{
                left: `${(index * 12.5)}%`,
                top: "50%",
              }}
              animate={{
                y: [0, -20, 0],
                rotateZ: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + (index * 0.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}