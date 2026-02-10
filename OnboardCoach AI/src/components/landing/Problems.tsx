import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Layers, Clock, EyeOff, Lock, Hourglass, FileText, DollarSign, Users, Award, Shield } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Layers, Clock, EyeOff, Lock, Hourglass, FileText, DollarSign, Users, Award, Shield };
const { problems } = siteContent;

export default function Problems() {
  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{problems.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{problems.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {problems.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Layers;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-surface-elevated border border-border hover:border-destructive/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                  <Icon size={20} className="text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
