import { useNavigate } from "react-router-dom";
import { siteContent } from "@/data/content";
import { riskIcons } from "@/data/landingIcons";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const { risks } = siteContent;

export function RiskSection() {
  const navigate = useNavigate();

  return (
    <section className="section-padding relative bg-destructive/5">
      <div className="container px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-6">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">{risks.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {risks.title}
            <span className="text-destructive"> {risks.titleAccent}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {risks.items.map((item) => {
            const Icon = riskIcons[item.icon];
            return (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-card border border-destructive/20 hover:border-destructive/40 transition-all"
              >
                <div className="mb-4 p-3 w-fit rounded-xl bg-destructive/10">
                  {Icon && <Icon className="h-6 w-6 text-destructive" />}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            variant="default"
            size="xl"
            className="glow-border"
            onClick={() => navigate("/schedule-demo")}
          >
            {risks.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
