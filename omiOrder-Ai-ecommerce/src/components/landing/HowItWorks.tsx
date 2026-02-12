import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Plug, Brain, BarChart3, Send, FileText } from "lucide-react";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  Plug,
  Brain,
  BarChart3,
  Send,
  FileText,
};
const { howItWorks } = siteContent;

export default function HowItWorks() {
  const isDefaultTitle = howItWorks.title.trim().toLowerCase() === "how it works";

  return (
    <section id="how-it-works" className="section-padding bg-section-alt relative overflow-hidden">
      <div className="container mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground tracking-tight">
            {isDefaultTitle ? (
              <>
                How <span className="text-gradient">OmniOrder AI</span> Works
              </>
            ) : (
              howItWorks.title
            )}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {howItWorks.subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />

          <div className="space-y-12 lg:space-y-16">
            {howItWorks.steps.map((step, i) => {
              const Icon = iconMap[step.icon] ?? FileText;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-3">
                      <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold">
                        {step.step}
                      </span>
                      Step {step.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>

                  <div className="w-20 h-20 rounded-2xl glass glow-border flex items-center justify-center shrink-0">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
