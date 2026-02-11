import { useNavigate } from "react-router-dom";
import { siteContent } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Shield, Calendar, Clock } from "lucide-react";

const { hero } = siteContent;

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen overflow-hidden soft-panel">
      <div className="absolute inset-0 hero-glow pointer-events-none z-0" />

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-6">
            <Clock className="h-4 w-4" />
            {hero.badge}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
            {hero.headline}{" "}
            <span className="gradient-text">{hero.headlineAccent}</span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {hero.description}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 px-8 py-3.5 rounded-xl glow-border"
              onClick={() => navigate(hero.primaryCta.href)}
            >
              <Calendar size={18} />
              {hero.primaryCta.label}
            </Button>
          </div>

          {/* Trust */}
          <p className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            {hero.trust}
          </p>

          {/* Stats band (OmniOrder style) */}
          <div className="mt-10 w-full max-w-4xl mx-auto rounded-2xl blue-band border border-primary/40 shadow-xl overflow-hidden flex flex-wrap">
            {hero.stats.map((s) => (
              <div
                key={s.label}
                className="flex-1 min-w-[120px] p-5 text-center text-white/95 border-r border-white/20 last:border-r-0"
              >
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-white/85 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
