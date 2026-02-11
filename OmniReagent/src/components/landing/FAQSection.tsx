import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteContent } from "@/data/content";

const { faq } = siteContent;

export function FAQSection() {
  return (
    <section id="faq" className="section-padding relative bg-card/30">
      <div className="container px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {faq.title}
            <span className="gradient-text"> {faq.titleAccent}</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/50 rounded-xl px-6 bg-card/50 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
