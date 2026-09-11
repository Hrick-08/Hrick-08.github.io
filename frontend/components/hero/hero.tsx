"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="section-padding min-h-[90vh] md:min-h-screen flex flex-col justify-center pt-20 md:pt-0 max-w-[1440px] mx-auto">
      <div className="max-w-4xl">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-9xl italic leading-[0.9] mb-6 md:mb-8"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-muted font-light leading-snug mb-8 md:mb-10"
        >
          Software engineer &amp; builder.
        </motion.p>

        {/* Copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg text-muted/90 leading-relaxed max-w-lg mb-10 md:mb-14"
        >
          I build software, APIs, AI systems,
          <br className="hidden sm:block" /> and things for the web.
        </motion.p>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 text-sm"
        >
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
          >
            <span>GitHub</span>
            <span className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
          >
            <span>LinkedIn</span>
            <span className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </a>
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="group flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
          >
            <span>Email</span>
            <span className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
