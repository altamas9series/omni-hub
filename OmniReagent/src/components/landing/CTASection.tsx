import { useNavigate } from "react-router-dom";
import { siteContent } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";

const { cta } = siteContent;

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />

      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {cta.headline}
            <br />
            <span className="gradient-text">{cta.headlineAccent}</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {cta.description}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {cta.trust.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          <Button
            size="xl"
            className="gap-2 glow-border"
            onClick={() => navigate(cta.primaryCta.href)}
          >
            <Calendar className="h-5 w-5" />
            {cta.primaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
