import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { education } from "@/data/site";

export function About() {
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
    </section>
  );
}
