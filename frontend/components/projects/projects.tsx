"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { projects, type Project } from "@/data/projects";

function ProjectEntry({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <AnimatedSection delay={index * 0.1}>
      <article className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 border-t border-border">
        {/* Number + Title */}
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-technical text-xs text-muted">{number}</span>
            <h3 className="font-editorial text-3xl md:text-4xl lg:text-5xl italic leading-tight">
              {project.title}
            </h3>
          </div>
          <p className="font-technical text-xs text-muted">{project.year}</p>
        </div>

        {/* Description + Tech */}
        <div className="md:col-span-4">
          <p className="text-base text-foreground/80 leading-relaxed mb-5">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {project.technologies.map((tech, i) => (
              <span key={tech} className="font-technical text-xs text-muted">
                {tech}
                {i < project.technologies.length - 1 && (
                  <span className="ml-2 text-border">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights + Links */}
        <div className="md:col-span-3">
          {project.highlights.length > 0 && (
            <ul className="space-y-1.5 mb-6">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-sm text-muted flex items-start gap-2"
                >
                  <span className="text-border mt-1.5 text-[8px]">●</span>
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-4 text-sm">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-1 text-foreground hover:text-accent transition-colors"
                whileHover={{ x: 2 }}
              >
                <span>Code</span>
                <span className="text-muted group-hover/link:text-accent transition-colors">
                  ↗
                </span>
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-1 text-foreground hover:text-accent transition-colors"
                whileHover={{ x: 2 }}
              >
                <span>Live</span>
                <span className="text-muted group-hover/link:text-accent transition-colors">
                  ↗
                </span>
              </motion.a>
            )}
            {project.docsUrl && (
              <motion.a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-1 text-foreground hover:text-accent transition-colors"
                whileHover={{ x: 2 }}
              >
                <span>Docs</span>
                <span className="text-muted group-hover/link:text-accent transition-colors">
                  ↗
                </span>
              </motion.a>
            )}
          </div>
        </div>


      </article>
    </AnimatedSection>
  );
}

export function Projects() {
  return (
    <section id="work" className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <SectionHeader number="02" title="Selected Work" />
      </AnimatedSection>

      <div>
        {projects
          .filter((p) => p.featured)
          .map((project, index) => (
            <ProjectEntry key={project.slug} project={project} index={index} />
          ))}
      </div>
    </section>
  );
}
