"use client";

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "./i18n/LanguageContext";
import emailjs from "@emailjs/browser";
import "../styles/contact-form.css";

export function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await emailjs.send(
        "service_gmail", // seu Service ID
        "template_kleiton", // seu Template ID
        formData, // já contém from_name, from_email e message
        "xez6HwSBbMPZvRZcG" // sua Public Key
      );

      console.log("✅ Success!", response.status, response.text);
      alert("✅ Mensagem enviada com sucesso!");

      setFormData({ from_name: "", from_email: "", message: "" });
    } catch (error) {
      console.error("❌ Failed...", error);
      alert("❌ Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }

    console.log(formData); // debug dos dados enviados
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "contatokleimacedo@gmail.com",
      link: "mailto:contatokleimacedo@gmail.com",
    },
    {
      icon: "📱",
      label: "WhatsApp",
      value: "+55 27 98191-1375",
      link: "https://wa.me/5527981911375",
    },
    {
      icon: "📍",
      label: "Location",
      value: "Espírito Santo, BR",
      link: "#",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub />,
      link: "https://github.com/kleitonmac/About",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/kleitonmacedo/",
    },
    { name: "WhatsApp", icon: <FaWhatsapp />, link: "https://wa.me/5527981911375" },
    {
      name: "Email",
      icon: <MdEmail />,
      link: "mailto:contatokleimacedo@gmail.com",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-accent/20 to-background"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-6">{t("contact_title")}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-gray-200 max-w-2xl mx-auto">
            {t("contact_desc")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="contact-form space-y-6 bg-card border border-border rounded-xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Nome */}
              <div>
                <motion.input
                  type="text"
                  name="from_name"
                  placeholder={t("contact_form_name")}
                  value={formData.from_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder:text-black"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Email */}
              <div>
                <motion.input
                  type="email"
                  name="from_email"
                  placeholder={t("contact_form_email")}
                  value={formData.from_email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder:text-black"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Mensagem */}
              <div>
                <motion.textarea
                  name="message"
                  placeholder={t("contact_form_message")}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none placeholder:text-black"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Botão */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>{t("contact_sending")}</span>
                  </>
                ) : (
                  <span>{t("contact_send_message")}</span>
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl mb-6">{t("contact_me")}</h3>
              <p className="text-gray-200 mb-8">
                {t("contact_description")}
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      {info.label}
                    </div>
                    <div className="text-foreground">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Linkss */}
            <div>
              <h4 className="text-lg mb-4">{t("Follow Me")}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
