import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { stackCategories } from "@/data/site";

export function Stack() {
  return (
    <section className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <SectionHeader title="Stack" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <p className="text-base md:text-lg text-foreground/80 mb-10 md:mb-14 max-w-lg">
          I work across
        </p>

        <div className="space-y-8 md:space-y-10">
          {stackCategories.map((category) => (
            <div key={category.label} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
              <div className="md:col-span-3">
                <p className="font-technical text-[11px] uppercase tracking-[0.2em] text-muted/60">
                  {category.label}
                </p>
              </div>
              <div className="md:col-span-9">
                <p className="text-base md:text-lg text-foreground/80">
                  {category.items.join(" · ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
