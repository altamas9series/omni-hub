import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Clock, DollarSign, Target, Shield, Users, RefreshCw, FileStack, Plug, BarChart3, UserCheck, HelpCircle, Brain, Award, Zap } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Clock, DollarSign, Target, Shield, Users, RefreshCw, FileStack, Plug, BarChart3, UserCheck, HelpCircle, Brain, Award, Zap };
const { features } = siteContent;

export default function Features() {
  return (
    <section id="features" className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {features.title}{" "}
            <span className="gradient-text">{features.titleAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{features.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.items.map((f, i) => {
            const Icon = iconMap[f.icon] || Clock;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-border bg-surface-elevated hover:border-primary/30 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
