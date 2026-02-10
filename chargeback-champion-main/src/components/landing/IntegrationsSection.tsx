import { motion } from "framer-motion";
import { ShieldCheck, Lock, Globe, KeyRound } from "lucide-react";
import data from "@/data/landingPage.json";

const securityIconMap: Record<string, React.FC<{ className?: string }>> = {
  ShieldCheck, Lock, Globe, KeyRound,
};

const IntegrationsSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Enterprise-Ready <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for security, scale, and compliance from day one.
          </p>
        </motion.div>

        {/* Integrations logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-8 mb-8"
        >
          <h3 className="font-display text-lg font-semibold text-center mb-6">Integrations</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {data.integrations.map((name, i) => (
              <div key={i} className="px-6 py-3 rounded-lg bg-secondary/60 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                {name}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8"
          >
            <h3 className="font-display text-lg font-semibold mb-6">Security & Compliance</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.security.map((item, i) => {
                const Icon = securityIconMap[item.icon];
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                      {Icon && <Icon className="h-4 w-4 text-success" />}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Scalability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-8"
          >
            <h3 className="font-display text-lg font-semibold mb-6">Scale & Performance</h3>
            <div className="space-y-5">
              {data.scalability.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-display font-bold text-lg text-gradient">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
