"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="section-padding flex items-center justify-between h-14 md:h-16 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="font-editorial text-xl md:text-2xl italic text-foreground hover:text-accent transition-colors"
        >
          {siteConfig.name}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-1.5 text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              <span className="font-technical text-[10px] text-muted/60 group-hover:text-accent transition-colors">
                {item.number}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
          <div className="w-px h-4 bg-border mx-1" />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            GitHub ↗
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-foreground origin-center"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-foreground origin-center"
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-border/50 bg-background overflow-hidden"
          >
            <div className="section-padding py-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-baseline gap-3 text-lg text-foreground"
                >
                  <span className="font-technical text-xs text-muted">
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
              <div className="editorial-divider my-2" />
              <div className="flex gap-6 text-sm text-muted">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
