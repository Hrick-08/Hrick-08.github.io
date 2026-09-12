import { Header } from "@/components/navigation/header";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Projects } from "@/components/projects/projects";
import { LiveActivity } from "@/components/activity/live-activity";
import { Experience } from "@/components/experience/experience";
import { Stack } from "@/components/stack/stack";
import { Now } from "@/components/now/now";
import { BlogPreview } from "@/components/blog/blog-preview";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <About />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <Projects />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <LiveActivity />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <Experience />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <Stack />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <Now />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <BlogPreview />

        <div className="editorial-divider max-w-[1440px] mx-auto section-padding" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
