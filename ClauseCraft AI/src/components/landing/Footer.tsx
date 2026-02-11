import { siteContent } from "@/data/content";

const { brand, footer } = siteContent;

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-bold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                O
              </div>
              <span>
                {brand.name} <span className="gradient-text">{brand.nameAccent}</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{brand.tagline}</p>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold text-foreground mb-4">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
