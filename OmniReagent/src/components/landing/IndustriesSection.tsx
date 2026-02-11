import { siteContent } from "@/data/content";
import { industryIcons } from "@/data/landingIcons";

const { industries } = siteContent;

export function IndustriesSection() {
  return (
    <section className="section-padding relative bg-card/30">
      <div className="container px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {industries.title}
            <span className="gradient-text"> {industries.titleAccent}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.items.map((item) => {
            const Icon = industryIcons[item.icon];
            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
