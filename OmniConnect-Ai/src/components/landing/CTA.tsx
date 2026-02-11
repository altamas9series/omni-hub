import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";

const { cta } = siteContent;

export default function CTA() {
  const demoCta =
    ("secondaryCta" in cta && cta.secondaryCta) ||
    ("cta" in cta && (cta as { cta?: { label: string; href: string } }).cta) ||
    cta.primaryCta;

  return (
    <section id="cta" className="relative section-padding blue-band overflow-hidden">
      <img
        src="/circle-9.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[0px] top-1/2 z-0 hidden w-[640px] max-w-none -translate-y-1/2 opacity-85 md:block"
      />
      <img
        src="/circle-9.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-1/2 z-0 w-[430px] max-w-none -translate-y-1/2 opacity-35 md:hidden"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_25%,hsl(216_98%_52%/.35),transparent_45%)] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {cta.headline}
            <br />
            <span className="text-white/90">{cta.headlineAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-white/85 max-w-xl mx-auto">
            {cta.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/90">
            {cta.trust.map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={16} className="text-white" />
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={demoCta.href}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary font-semibold text-base hover:opacity-90 transition-opacity glow-border"
            >
              <Calendar size={18} />
              {demoCta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
