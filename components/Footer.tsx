"use client";

import { motion } from "motion/react";
import { useLanguage } from "./i18n/LanguageContext";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Kleiton
            </h3>
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              {t("footer_description")}
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaGithub />, link: "https://github.com/kleitonmac/About" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/kleitonmacedo/" },
                { icon: <FaWhatsapp />, link: "https://wa.me/5527981911375" },
                { icon: <MdEmail />, link: "mailto:contatokleimacedo@gmail.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg mb-4 text-white dark:text-white">{t("footer_quick_links")}</h4>
            <div className="space-y-2">
              {[t("nav_home"), t("nav_about"), t("nav_skills"), t("nav_projects"), t("nav_contact")].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ x: 5 }}
                  className="block text-gray-600 dark:text-gray-200 hover:text-white dark:hover:text-white transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg mb-4 text-white dark:text-white">{t("footer_contacts")}</h4>
            <div className="space-y-2 text-gray-600 dark:text-gray-200">
              <p>contatokleimacedo@gmail.com</p>
              <p>+55 27 98191-1375</p>
              <p>Espírito Santo, BR</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border mt-8 pt-8 text-center text-gray-600 dark:text-gray-200"
        >
          <p>© {currentYear} Kleiton. {t("footer_rights")}</p>
        </motion.div>
      </div>
    </footer>
  );
}