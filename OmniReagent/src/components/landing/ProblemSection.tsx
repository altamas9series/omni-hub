import { siteContent } from "@/data/content";
import { problemIcons } from "@/data/landingIcons";
import { AlertTriangle } from "lucide-react";

const { problems } = siteContent;

export function ProblemSection() {
  return (
    <section id="problem" className="section-padding relative bg-card/30">
      <div className="container px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-6">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-destructive">{problems.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {problems.title}
              <span className="gradient-text"> {problems.titleAccent}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {problems.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {problems.items.map((item) => {
              const Icon = problemIcons[item.icon];
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-destructive/30 transition-all"
                >
                  <div className="mb-4 p-3 w-fit rounded-xl bg-destructive/10">
                    {Icon && <Icon className="h-6 w-6 text-destructive" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="p-8 rounded-2xl bg-destructive/5 border border-destructive/20">
            <h3 className="text-xl font-semibold mb-4 text-destructive">{problems.traditionalTitle}</h3>
            <p className="text-muted-foreground mb-4">{problems.traditionalBody}</p>
            <p className="text-lg font-semibold text-gradient">{problems.traditionalCta}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
