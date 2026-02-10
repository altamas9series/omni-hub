import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import data from "@/data/landingPage.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

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
                <div className="container mx-auto text-center max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                  >
                    <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span className="text-muted-foreground">{slide.badge}</span>
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.05 }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
                  >
                    {slide.mainHeadline}
                    <br />
                    <span className="text-gradient">{slide.highlightedText}</span>
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
                    <Button asChild size="lg" className="text-base px-8 py-6 glow-border">
                      <a href="#cta">
                        {hero.ctaPrimary}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild size="lg" className="text-base px-8 py-6 bg-primary text-primary-foreground hover:opacity-90">
                      <Link to="/schedule-demo">
                        <Calendar className="mr-2 h-5 w-5" />
                        {hero.ctaSecondary}
                      </Link>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
                  >
                    {hero.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
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
