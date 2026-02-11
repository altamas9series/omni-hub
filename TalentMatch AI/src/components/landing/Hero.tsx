import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { siteContent } from "@/data/content";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const { hero } = siteContent;
const slides =
  "slides" in hero && Array.isArray(hero.slides) && hero.slides.length > 0
    ? hero.slides
    : [
        {
          badge: "AI-Powered Order & Fulfillment Intelligence",
          headline: "Orders, Inventory & Fulfillment",
          headlineAccent: "Managed with Predictive Accuracy",
          description:
            "Intelligent agent for managing orders, inventory, and customer fulfillment. Optimize supply and demand while automating order tasks.",
        },
      ];

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>(undefined);
  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api || slides.length <= 1) return;
    const id = setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [api]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden soft-panel">
      <div className="absolute inset-0 hero-glow pointer-events-none z-0" />
      

      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="relative z-10 w-full"
      >
        <CarouselContent className="-ml-0 w-full">
          {slides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="pl-0 basis-full min-w-full w-full"
            >
              <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20">
                <div className="max-w-4xl mx-auto text-center w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-6"
                  >
                    {slide.badge}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight"
                  >
                    {slide.headline}{" "}
                    <span className="gradient-text">{slide.headlineAccent}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                  >
                    {"subheadline" in slide ? slide.subheadline : slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                    {hero.secondaryCta.href.startsWith("/") ? (
                      <Link
                        to={hero.secondaryCta.href}
                        className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity flex items-center gap-2 glow-border"
                      >
                        <Calendar size={18} />
                        {hero.secondaryCta.label}
                      </Link>
                    ) : (
                      <a
                        href={hero.secondaryCta.href}
                        className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity flex items-center gap-2 glow-border"
                      >
                        <Calendar size={18} />
                        {hero.secondaryCta.label}
                      </a>
                    )}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 text-sm text-muted-foreground"
                  >
                    {hero.trust}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-10 w-full max-w-4xl mx-auto rounded-2xl blue-band border border-primary/40 shadow-xl overflow-hidden flex flex-wrap"
                  >
                    {(hero.stats ?? []).map((s) => (
                      <div
                        key={s.label}
                        className="flex-1 min-w-[120px] p-5 text-center text-white/95 border-r border-white/20 last:border-r-0"
                      >
                        <div className="text-2xl md:text-3xl font-bold">
                          {s.value}
                        </div>
                        <div className="text-xs text-white/85 mt-1">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next - full width positioning */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none flex items-center justify-between px-2 sm:px-4 md:px-6">
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto h-10 w-10 rounded-full border-border/80 bg-background/80 backdrop-blur-sm hover:bg-background shadow-md"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto h-10 w-10 rounded-full border-border/80 bg-background/80 backdrop-blur-sm hover:bg-background shadow-md"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                h-2 rounded-full transition-all duration-300
                ${i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"}
              `}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
