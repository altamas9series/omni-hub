import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { siteContent } from "@/data/content";
import { Menu, X, Calendar, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

const { brand, nav } = siteContent;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-primary p-2 rounded-lg">
              <FlaskConical className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            {brand.name}<span className="gradient-text">{brand.nameAccent}</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button
            variant="default"
            size="sm"
            className="gap-2"
            onClick={() => navigate(nav.cta.href)}
          >
            <Calendar size={14} />
            {nav.cta.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {nav.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Button
              variant="default"
              size="sm"
              className="w-full justify-center gap-2"
              onClick={() => {
                setOpen(false);
                navigate(nav.cta.href);
              }}
            >
              <Calendar size={14} />
              {nav.cta.label}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
