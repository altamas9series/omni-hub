import { siteContent } from "@/data/content";
import { howItWorksIcons } from "@/data/landingIcons";
import { ArrowRight } from "lucide-react";

const { howItWorks } = siteContent;

export function SolutionSection() {
  return (
    <section id="solution" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {howItWorks.title}
              <span className="gradient-text"> {howItWorks.titleAccent}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {howItWorks.subtitle}
            </p>
          </div>

          <div className="space-y-8">
            {howItWorks.steps.map((step) => {
              const Icon = howItWorksIcons[step.icon];
              return (
                <div
                  key={step.title}
                  className="relative flex gap-6 p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-2xl font-bold text-gradient">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {Icon && <Icon className="h-5 w-5 text-primary" />}
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    {"description" in step && step.description && (
                      <p className="text-muted-foreground">{step.description}</p>
                    )}
                    {"items" in step && step.items && (
                      <ul className="space-y-2 mt-2">
                        {step.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-muted-foreground">
                            <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-lg font-semibold">{howItWorks.timelineLabel}</span>
              <span className="text-lg text-gradient font-bold">{howItWorks.timelineValue}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
