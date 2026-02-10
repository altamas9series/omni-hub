import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { TrendingUp, Briefcase, Crown, Settings, CreditCard, Building2, ShoppingCart, Landmark, Users, GraduationCap, ShieldCheck, BarChart3 } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { TrendingUp, Briefcase, Crown, Settings, CreditCard, Building2, ShoppingCart, Landmark, Users, GraduationCap, ShieldCheck, BarChart3 };
const { useCases } = siteContent;

export default function UseCases() {
  return (
    <section id="use-cases" className="section-padding bg-section-alt">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{useCases.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{useCases.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {useCases.items.map((uc, i) => {
            const Icon = iconMap[uc.icon] || TrendingUp;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-surface-elevated border border-border hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-accent">{uc.persona}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{uc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{uc.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium">
                  ✓ {uc.benefit}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
