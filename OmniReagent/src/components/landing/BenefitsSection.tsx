import { siteContent } from "@/data/content";
import { benefitsIcons } from "@/data/landingIcons";

const { benefits } = siteContent;

export function BenefitsSection() {
  return (
    <section className="section-padding relative bg-card/30">
      <div className="container px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {benefits.title}
            <span className="gradient-text"> {benefits.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground">{benefits.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.items.map((item) => {
            const Icon = benefitsIcons[item.icon];
            return (
              <div
                key={item.title}
                className="group p-8 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="mb-6 p-4 w-fit rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {Icon && <Icon className="h-8 w-8 text-primary" />}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
