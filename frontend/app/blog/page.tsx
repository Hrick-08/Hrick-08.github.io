import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedSection } from "@/components/ui/animated-section";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <div className="section-padding max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="mb-16 md:mb-20">
              <h1 className="font-editorial text-5xl md:text-6xl lg:text-7xl italic leading-tight mb-4">
                Blog
              </h1>
              <p className="text-base md:text-lg text-muted max-w-lg">
                Thoughts on software engineering, AI, and building things.
              </p>
            </div>
          </AnimatedSection>

          {posts.length === 0 ? (
            <AnimatedSection delay={0.1}>
              <div className="py-16 border-t border-border">
                <p className="text-muted text-center">
                  No posts yet. Add a <code className="font-technical text-sm">.md</code> file to{" "}
                  <code className="font-technical text-sm">content/blog/</code> to get started.
                </p>
              </div>
            </AnimatedSection>
          ) : (
            <div>
              {posts.map((post, index) => (
                <AnimatedSection key={post.slug} delay={index * 0.08}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <article className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-border">
                      {/* Date + Reading Time */}
                      <div className="md:col-span-3">
                        <p className="font-technical text-xs text-muted">
                          {formatDate(post.date)}
                        </p>
                        <p className="font-technical text-xs text-muted/50 mt-1">
                          {post.readingTime}
                        </p>
                      </div>

                      {/* Title + Description */}
                      <div className="md:col-span-7">
                        <h2 className="text-lg md:text-xl font-medium text-foreground group-hover:text-accent transition-colors mb-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted leading-relaxed">
                          {post.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="md:col-span-2 flex flex-wrap md:justify-end gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-technical text-[10px] text-muted/60 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
