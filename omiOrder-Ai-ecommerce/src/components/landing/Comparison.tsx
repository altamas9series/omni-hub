import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const { comparison } = siteContent;

function CellIcon({ col }: { col: number }) {
  if (col === 0) return <Check size={16} className="text-accent inline mr-1" />;
  return null;
}

export default function Comparison() {
  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{comparison.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{comparison.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {comparison.headers.map((h, i) => (
                  <th
                    key={i}
                    className={`text-left py-4 px-4 text-sm font-semibold ${
                      i === 1 ? "text-primary" : "text-muted-foreground"
                    } ${i === 0 ? "w-1/4" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, ri) => (
                <tr key={ri} className="border-t border-border">
                  <td className="py-4 px-4 text-sm font-medium text-foreground">
                    {row.feature}
                  </td>
                  {row.values.map((v, ci) => (
                    <td
                      key={ci}
                      className={`py-4 px-4 text-sm ${
                        ci === 0
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <CellIcon col={ci} />
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
