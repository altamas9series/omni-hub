import { motion } from "framer-motion";
import { Clock, FileX, TrendingDown, EyeOff, Unplug, ShieldAlert } from "lucide-react";
import data from "@/data/landingPage.json";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Clock, FileX, TrendingDown, EyeOff, Unplug, ShieldAlert,
};

const ProblemSection = () => {
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
            Chargebacks Are <span className="text-destructive">Costing You</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every uncontested dispute is lost revenue. Every manual process is wasted time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.problems.map((problem, i) => {
            const Icon = iconMap[problem.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 group hover:border-destructive/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  {Icon && <Icon className="h-5 w-5 text-destructive" />}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
