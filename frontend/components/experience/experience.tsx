import { SectionHeader } from "@/components/ui/section-header";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animated-section";
import { experience } from "@/data/site";

export function Experience() {
  return (
    <section className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <SectionHeader title="Experience" />
      </AnimatedSection>

      <StaggerContainer>
        {experience.map((exp) => (
          <StaggerItem key={exp.role}>
            <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-border">
              <div className="md:col-span-4">
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {exp.role}
                </h3>
                <p className="font-technical text-xs text-muted">
                  {exp.period}
                </p>
              </div>

              <div className="md:col-span-6">
                <p className="text-sm text-muted/80 mb-3">
                  {exp.organization}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
