import { motion } from "framer-motion";
import { Calendar, Check } from "lucide-react";

const CTASection = () => {
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight">
            Ready to Transform
            <br />
            <span className="text-white/90">Dispute Management?</span>
          </h2>
          <p className="mt-6 text-lg text-white/85 max-w-xl mx-auto">
            Stop losing revenue to chargebacks. Schedule a demo and see results in minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-white" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-white" />
              5-minute setup
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-white" />
              30-day free trial
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary font-semibold text-base hover:opacity-90 transition-opacity glow-border"
            >
              <Calendar size={18} />
              Schedule a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
