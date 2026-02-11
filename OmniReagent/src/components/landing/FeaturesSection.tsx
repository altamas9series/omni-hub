import { siteContent } from "@/data/content";
import { featureIcons } from "@/data/landingIcons";

const { features } = siteContent;

export function FeaturesSection() {
  return (
    <section id="features" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="container relative z-10 px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {features.title}
            <span className="gradient-text"> {features.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{features.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.items.map((item) => {
            const Icon = featureIcons[item.icon];
            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((listItem, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
