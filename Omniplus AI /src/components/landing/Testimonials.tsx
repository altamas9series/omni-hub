import { useState, useEffect } from "react";
import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const { testimonials } = siteContent;

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="section-padding bg-surface">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{testimonials.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{testimonials.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.items.map((t, i) => (
                <CarouselItem key={t.name} className="pl-2 md:pl-4 md:basis-1/2">
                  <div className="p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border h-full">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <blockquote className="text-foreground leading-relaxed mb-6">
                      "{t.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {t.name.split(" ").map((w) => w[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role}, {t.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 md:-left-12 border-2 bg-background/80 hover:bg-background" />
            <CarouselNext className="right-0 md:-right-12 border-2 bg-background/80 hover:bg-background" />
          </Carousel>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
