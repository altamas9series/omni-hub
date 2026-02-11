import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const { comparison } = siteContent;

export default function Comparison() {
  const featureHeader = (comparison.headers?.[0] ?? "").trim() || "Feature";
  // Current data order in `content.ts` is: ["", "OmniOrder AI", "Manual / Spreadsheets"]
  const omniHeader = comparison.headers?.[1] ?? "OmniOrder AI";
  const manualHeader = comparison.headers?.[2] ?? "Manual / Spreadsheets";

  return (
    <section className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground tracking-tight">
            {comparison.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {comparison.subtitle}
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
            <div className="p-5 text-sm font-semibold text-muted-foreground">{featureHeader}</div>
            <div className="p-5 text-sm font-semibold text-muted-foreground bg-destructive/5">{manualHeader}</div>
            <div className="p-5 text-sm font-semibold text-primary bg-primary/5">{omniHeader}</div>
          </div>

          {/* Rows */}
          {comparison.rows.map((row, i) => {
            const omniValue = row.values?.[0] ?? "";
            const manualValue = row.values?.[1] ?? "";

            return (
              <div key={i} className="grid grid-cols-3 text-center border-t border-border/50">
                <div className="p-4 text-sm font-medium text-foreground">{row.feature}</div>
                <div className="p-4 text-sm text-muted-foreground bg-destructive/5 flex items-center justify-center gap-2">
                  <X className="h-4 w-4 text-destructive shrink-0" />
                  {manualValue}
                </div>
                <div className="p-4 text-sm bg-primary/5 flex items-center justify-center gap-2">
                  <Check className="h-4 w-4 text-success shrink-0" />
                  <span className="text-foreground font-medium">{omniValue}</span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
