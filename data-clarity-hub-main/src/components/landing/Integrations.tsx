import { siteContent } from "@/data/content";
import { motion } from "framer-motion";

const { integrations } = siteContent;

export default function Integrations() {
  return (
    <section id="integrations" className="section-padding bg-section-alt">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{integrations.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{integrations.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {integrations.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-surface-elevated border border-border text-center hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary font-bold text-sm">
                {item.name.slice(0, 2)}
              </div>
              <div className="text-sm font-medium text-foreground">{item.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{item.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
