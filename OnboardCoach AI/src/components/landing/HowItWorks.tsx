import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Plug, Brain, MessageSquare, BarChart3, FileStack, Send, Upload, Route, HelpCircle, Award } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Plug, Brain, MessageSquare, BarChart3, FileStack, Send, Upload, Route, HelpCircle, Award };
const { howItWorks } = siteContent;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-section-alt">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{howItWorks.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{howItWorks.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {howItWorks.steps.map((step, i) => {
            const Icon = iconMap[step.icon] || Plug;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="text-5xl font-bold gradient-text mb-4">{step.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
