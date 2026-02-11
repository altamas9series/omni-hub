import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Clock, DollarSign, Target, Shield, Users, RefreshCw, FileStack, Plug, BarChart3, UserCheck, HelpCircle, Brain, Award, Zap } from "lucide-react";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = { Clock, DollarSign, Target, Shield, Users, RefreshCw, FileStack, Plug, BarChart3, UserCheck, HelpCircle, Brain, Award, Zap };
const { features } = siteContent;

export default function Features() {
  return (
    <section id="features" className="section-padding bg-surface">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground tracking-tight">
            {features.title} <span className="text-gradient">{features.titleAccent}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {features.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.items.map((f, i) => {
            const Icon = iconMap[f.icon] || Clock;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-8 group hover:glow-border transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
