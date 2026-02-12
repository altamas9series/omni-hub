import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data/landingPage.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import heroSectionOne from "@/assets/hero-section-one.png";
import heroSectionTwo from "@/assets/hero-section-two.png";
import heroSectionThree from "@/assets/hero-section-three.png";

const heroImages = [heroSectionOne, heroSectionTwo, heroSectionThree];

const hero = data.hero as {
  rotatingHeadlines?: string[];
  mainHeadline: string;
  highlightedText: string;
  subheadline: string;
  stats: { value: string; label: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
  slides?: { badge: string; mainHeadline: string; highlightedText: string; subheadline: string }[];
};

const slides =
  hero.slides && hero.slides.length > 0
    ? hero.slides
    : [
        {
          badge: hero.rotatingHeadlines?.[0] ?? "AI-Powered Chargeback Defense",
          mainHeadline: hero.mainHeadline,
          highlightedText: hero.highlightedText,
          subheadline: hero.subheadline,
        },
      ];

const AUTOPLAY_MS = 6000;

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);
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
              className="pl-0 basis-full min-w-full w-full relative"
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0 opacity-30 blur-sm"
                style={{
                  backgroundImage: `url(${heroImages[index % heroImages.length]})`,
                }}
              />
              <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20">
                <div className="container mx-auto text-center max-w-5xl">
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
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight"
                  >
                    {slide.mainHeadline}{" "}
                    <span className="gradient-text">{slide.highlightedText}</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                  >
                    {slide.subheadline}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
                  >
                    <Button asChild size="lg" className="text-base px-8 py-6 bg-primary text-primary-foreground hover:opacity-90 glow-border">
                      <a href="#">
                        <Calendar className="mr-2 h-5 w-5" />
                        {hero.ctaSecondary}
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-10 w-full max-w-4xl mx-auto rounded-2xl blue-band border border-primary/40 shadow-xl overflow-hidden flex flex-wrap"
                  >
                    {(hero.stats ?? []).map((stat, i) => (
                      <div
                        key={stat.label ?? i}
                        className="flex-1 min-w-[120px] p-5 text-center text-white/95 border-r border-white/20 last:border-r-0"
                      >
                        <div className="text-2xl md:text-3xl font-bold">
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/85 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Prev/Next */}
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
};

export default HeroSection;
