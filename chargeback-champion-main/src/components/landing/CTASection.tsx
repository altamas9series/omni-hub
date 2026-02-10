import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10" />
          <div className="absolute inset-0 glass" />

          <div className="relative z-10 p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ready to Transform
              <br />
              <span className="text-gradient">Dispute Management?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Stop losing revenue to chargebacks. Start your free trial and see results in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="text-base px-8 py-6 glow-border">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 border-border hover:bg-secondary">
                Talk to Sales
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                5-minute setup
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                30-day free trial
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
