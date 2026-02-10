import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import data from "@/data/landingPage.json";

const ComparisonSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Manual vs <span className="text-gradient">OmniCharge AI</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See the difference automation makes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 text-center">
            <div className="p-5 text-sm font-semibold text-muted-foreground">{data.comparison.headers[0]}</div>
            <div className="p-5 text-sm font-semibold text-muted-foreground bg-destructive/5">{data.comparison.headers[1]}</div>
            <div className="p-5 text-sm font-semibold text-primary bg-primary/5">{data.comparison.headers[2]}</div>
          </div>

          {/* Rows */}
          {data.comparison.rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 text-center border-t border-border/50">
              <div className="p-4 text-sm font-medium">{row[0]}</div>
              <div className="p-4 text-sm text-muted-foreground bg-destructive/5 flex items-center justify-center gap-2">
                <X className="h-4 w-4 text-destructive shrink-0" />
                {row[1]}
              </div>
              <div className="p-4 text-sm bg-primary/5 flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-success shrink-0" />
                <span className="text-foreground font-medium">{row[2]}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
