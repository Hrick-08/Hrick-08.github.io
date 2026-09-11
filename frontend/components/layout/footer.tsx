import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="section-padding py-8 md:py-10 border-t border-border max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted">
          <span>{siteConfig.name} © {new Date().getFullYear()}</span>
          <span className="hidden sm:inline text-border">·</span>
          <span>Built with Next.js + FastAPI</span>
        </div>

        <div className="flex items-center gap-5 text-xs text-muted">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
