"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { certifications, education } from "@/data/site";
import { Download, Eye, X } from "lucide-react";

export function About() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if (!isResumeOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsResumeOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isResumeOpen]);

  return (
    <section id="about" className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <SectionHeader number="01" title="About" />
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        {/* Main Copy */}
        <AnimatedSection className="md:col-span-7" delay={0.1}>
          <div className="space-y-6 text-base md:text-lg leading-relaxed text-foreground/90">
            <p>
              I&apos;m Hritabrata Das — a computer science student and software
              engineer focused on building systems that work well and solve real
              problems.
            </p>
            <p>
              My work spans full-stack web development, AI systems, and backend
              infrastructure. I&apos;m drawn to projects that sit at the
              intersection of engineering and design — where the technical
              decisions shape the user experience.
            </p>
            <p>
              Currently pursuing a B.E. in Computer Science with an AI &amp; ML
              specialization at Chitkara University, maintaining a{" "}
              <span className="font-technical text-sm">{education.cgpa}</span>{" "}
              CGPA. Expected graduation{" "}
              <span className="font-technical text-sm">
                {education.graduation}
              </span>
              .
            </p>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Eye size={15} strokeWidth={1.5} aria-hidden="true" />
              Preview resume
            </button>
          </div>
        </AnimatedSection>

        {/* Details */}
        <AnimatedSection className="md:col-span-5 md:col-start-9" delay={0.2}>
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-2">
                Education
              </p>
              <p className="text-sm text-foreground">{education.degree}</p>
              <p className="text-sm text-muted">{education.specialization}</p>
              <p className="text-sm text-muted">{education.university}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-2">
                Certifications
              </p>
              <div className="space-y-1.5 text-sm">
                {certifications.map((certification) => (
                  <a
                    key={certification.name}
                    href={certification.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-foreground/80 transition-colors hover:text-accent"
                  >
                    {certification.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-2">
                Focus
              </p>
              <p className="text-sm text-foreground/80">
                Full-stack development, AI systems, backend architecture,
                developer tools
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mb-2">
                Location
              </p>
              <p className="text-sm text-foreground/80">Punjab, India</p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {isResumeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 md:p-8"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsResumeOpen(false);
          }}
        >
          <div
            className="flex h-[min(92vh,900px)] w-full max-w-5xl flex-col border border-border bg-background"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-preview-title"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 id="resume-preview-title" className="text-sm text-foreground">
                Resume preview
              </h2>
              <div className="flex items-center gap-3">
                <a
                  href="/HrickResume.pdf"
                  download="HrickResume.pdf"
                  className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
                >
                  <Download size={15} strokeWidth={1.5} aria-hidden="true" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(false)}
                  aria-label="Close resume preview"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <X size={18} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe
              src="/HrickResume.pdf"
              title="Hrick resume"
              className="min-h-0 flex-1 bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}
