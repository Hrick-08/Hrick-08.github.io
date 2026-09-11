import { AnimatedSection } from "@/components/ui/animated-section";
import { siteConfig } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-8 md:mb-12">
            <span className="font-technical text-xs mr-2">05</span>
            Contact
          </p>

          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl italic leading-tight mb-4">
            Have an idea?
          </h2>
          <p className="text-xl md:text-2xl text-muted font-light mb-10 md:mb-14">
            Let&apos;s build it.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-sm">
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="group flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
            >
              <span>Email</span>
              <span className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                ↗
              </span>
            </a>
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
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
