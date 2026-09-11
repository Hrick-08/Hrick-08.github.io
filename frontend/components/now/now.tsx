import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { now } from "@/data/site";

export function Now() {
  return (
    <section id="now" className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <SectionHeader number="03" title="Currently" />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="space-y-8 md:space-y-10 max-w-2xl">
          {now.map((item) => (
            <div key={item.label} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6">
              <div className="md:col-span-3">
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
              </div>
              <div className="md:col-span-9">
                <p className="text-sm text-muted leading-relaxed">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
