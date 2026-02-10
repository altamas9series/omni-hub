import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Check } from "lucide-react";

const { cta } = siteContent;

export default function CTA() {
  return (
    <section id="cta" className="relative section-padding bg-section-alt overflow-hidden">
      <div className="absolute inset-0 hero-glow pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
            {cta.headline}
            <br />
            <span className="gradient-text">{cta.headlineAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            {cta.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {cta.trust.map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={16} className="text-primary" />
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={cta.primaryCta.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity glow-border"
            >
              <ArrowRight size={18} />
              {cta.primaryCta.label}
            </a>
            {cta.secondaryCta && (
              <a
                href={cta.secondaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-border bg-surface-elevated font-semibold text-base hover:border-primary/30 transition-colors"
              >
                <Calendar size={18} />
                {cta.secondaryCta.label}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
