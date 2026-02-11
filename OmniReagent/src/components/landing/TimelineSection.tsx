import { useNavigate } from "react-router-dom";
import { siteContent } from "@/data/content";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";

const { timeline } = siteContent;

export function TimelineSection() {
  const navigate = useNavigate();

  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="container relative z-10 px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-6">
            <Clock className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">{timeline.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {timeline.title}
            <span className="text-gradient"> {timeline.titleAccent}</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-destructive" />
            <div className="space-y-8">
              {timeline.steps.map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div
                    className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                      "isDeadline" in step && step.isDeadline
                        ? "bg-destructive border-destructive"
                        : "bg-primary border-primary"
                    }`}
                  />
                  <div
                    className={`p-4 rounded-xl ${
                      "isDeadline" in step && step.isDeadline
                        ? "bg-destructive/10 border border-destructive/30"
                        : "bg-secondary/30"
                    }`}
                  >
                    <p
                      className={
                        "isDeadline" in step && step.isDeadline
                          ? "font-semibold text-destructive"
                          : "font-semibold"
                      }
                    >
                      {step.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-destructive/10 border border-destructive/30 text-center mb-8">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-4" />
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{timeline.warningBold}</span>
            {" "}{timeline.warning.replace(timeline.warningBold, "").trim()}
          </p>
        </div>

        <div className="text-center">
          <Button
            variant="default"
            size="xl"
            className="gap-2 glow-border group"
            onClick={() => navigate("/schedule-demo")}
          >
            {timeline.cta}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
