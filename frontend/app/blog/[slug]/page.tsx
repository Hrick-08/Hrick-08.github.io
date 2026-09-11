import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPostSlugs } from "@/lib/blog";
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedSection } from "@/components/ui/animated-section";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Hrick`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <article className="section-padding max-w-[1440px] mx-auto">
          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-12 md:mb-16"
            >
              <span>←</span>
              <span>All posts</span>
            </Link>
          </AnimatedSection>

          {/* Header */}
          <AnimatedSection delay={0.1}>
            <header className="mb-12 md:mb-16 max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
                <span className="font-technical text-xs text-muted">
                  {formatDate(post.date)}
                </span>
                <span className="text-border text-xs">·</span>
                <span className="font-technical text-xs text-muted/60">
                  {post.readingTime}
                </span>
              </div>

              <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl italic leading-tight mb-6">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-lg text-muted leading-relaxed">
                  {post.description}
                </p>
              )}

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-technical text-[11px] text-muted/50 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </AnimatedSection>

          {/* Divider */}
          <div className="editorial-divider mb-12 md:mb-16" />

          {/* Content */}
          <AnimatedSection delay={0.2}>
            <div
              className="prose-editorial max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedSection>

          {/* Footer nav */}
          <AnimatedSection delay={0.1}>
            <div className="mt-16 md:mt-24 pt-8 border-t border-border mb-16 md:mb-24">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
              >
                <span>←</span>
                <span>Back to all posts</span>
              </Link>
            </div>
          </AnimatedSection>
        </article>
      </main>
      <Footer />
    </>
  );
}
