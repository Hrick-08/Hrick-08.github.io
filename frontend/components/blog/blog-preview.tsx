import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SectionHeader } from "@/components/ui/section-header";
import { AnimatedSection } from "@/components/ui/animated-section";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="section-padding section-gap max-w-[1440px] mx-auto">
      <AnimatedSection>
        <SectionHeader number="04" title="Writing" />
      </AnimatedSection>

      <div>
        {posts.map((post, index) => (
          <AnimatedSection key={post.slug} delay={index * 0.08}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <article className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-6 md:py-8 border-t border-border">
                <div className="md:col-span-3">
                  <p className="font-technical text-xs text-muted">
                    {formatDate(post.date)}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-accent transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="md:col-span-2 flex md:justify-end items-start">
                  <span className="font-technical text-xs text-muted/50">
                    {post.readingTime}
                  </span>
                </div>
              </article>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3}>
        <div className="mt-6">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <span>Explore blogs</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
