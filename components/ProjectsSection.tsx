"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./i18n/LanguageContext";

export function ProjectsSection() {
  const { t } = useLanguage();
  const projects = [
    {
      id: 1,
      title: "Barbearia Novo Estilo",
      description: t("project_prime_barbershop_desc"),
      technologies: ["TypeScript", "React", "MongoDB", "API", "CRUD","Painel Adm", "Figma","Node","Styled-Components"],
      image:
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80",
      link: "https://novoestilo.vercel.app/",
      github: "https://github.com/kleitonmac",
    },
    { 
      id: 2,
      title: "Grão & Aroma Cafeteria",
      description: t("project_grao_aroma_desc"),
      technologies: ["HTML", "CSS", "Javascript", "Styled-Components"],
      image:
        "https://amaisd.com.br/wp-content/uploads/2023/10/cafeteriadecor.jpg",
      link: "https://cafeteriagraoearoma.vercel.app/",
      github: "https://github.com/kleitonmac",
    },
    {
      id: 3,
      title: "CodeBurguer",
      description: t("project_codeburgue_desc"),
      technologies: ["Javascript","CSS", "React","UI/UX","Typescript","Styled-Components","EmailJS","Figma"],
      image:
        "/code.png",
      link: "https://codeburgue.vercel.app/",
      github: "https://github.com/kleitonmac/codeburgue",
    },
    {
      id: 4,
      title: "Dashboard Kdev",
      description: t("Dashboard KDev: um painel moderno e intuitivo para gerenciar projetos e monitorar implantações, métricas e desempenho de forma centralizada e eficiente."),
      technologies: ["Javascript", "CSS", "React","UI/UX","Styled-Components"],
      image:
        "/print.png",
      link: "https://dashboard-kdev.vercel.app/",
      github: "https://github.com/kleitonmac/admin-dashboard",
    },
    {
      id: 5,
      title: "Loja Nike",
      description: t("project_nike_store_desc"),
      technologies: ["Javascript", "CSS", "Styled-Components"],
      image:
        "https://raw.githubusercontent.com/kleitonmac/nike/refs/heads/main/assets/print-projeto.png",
      link: "https://nike-delta-sooty.vercel.app/",
      github: "https://github.com/kleitonmac/nike",
    },
    {
      id: 6,
      title: "Inventory Management System",
      description: t("project_inventory_system_desc"),
      technologies: ["Python", "Django", "Styled-Components"],
      image:
        "https://raw.githubusercontent.com/kleitonmac/sge/refs/heads/main/img/image.png",
      link: "https://github.com/kleitonmac/sge",
      github: "https://github.com/kleitonmac/sge",
    },
    {
      id: 7,
      title: "Consórcio Dev",
      description: t("project_consorcio_dev_desc"),
      technologies: ["Python", "Django", "Styled-Components"],
      image:
        "https://raw.githubusercontent.com/kleitonmac/carros/refs/heads/main/img/menu.png",
      link: "https://github.com/kleitonmac/carros",
      github: "https://github.com/kleitonmac/carros",
    },
    {
      id: 8,
      title: "Parking Management System",
      description: t("project_parking_system_desc"),
      technologies: ["Django", "API", "AI", "Postman"],
      image:
        "https://raw.githubusercontent.com/kleitonmac/estacionamento/refs/heads/main/img/backend-img.png",
      link: "https://github.com/kleitonmac/estacionamento",
      github: "https://github.com/kleitonmac/estacionamento",
    },
    {
      id: 9,
      title: "Bar do Bispo",
      description: t("project_bardobispo_desc"),
      technologies: ["React", "React-dom", "Tailwind CSS", "Figma", "JavaScript", "TypeScript"],
      image:
        "/bispo.png",
      link: "https://bispobar.vercel.app/",
      github: "https://github.com/kleitonmac/bispo",
    },

  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-600 dark:text-white">{t("projects_title")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">{t("projects_desc")}</p>
        </motion.div>

        {/* Project grid */}
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group perspective-1000"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  z: 50,
                  transition: { duration: 0.3 },
                }}
                className="relative bg-card border border-border rounded-xl overflow-hidden transform-gpu transition-all duration-300 group-hover:shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className=" p-6 flex flex-col flex-grow mx-auto">
                  <h3 className="text-xl font-semibold mb-2 text-center px-4 text-gray-600 dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-200 mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Botão Ver Projeto centralizado */}
                    <div className="flex gap-3 items-center justify-center">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 border border-primary text-primary rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground text-center"
                    >
                      {t("projects_view_more")}
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all duration-300 border border-primary"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                    </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
}
