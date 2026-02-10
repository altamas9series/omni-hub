import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problems from "@/components/landing/Problems";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import UseCases from "@/components/landing/UseCases";
import Testimonials from "@/components/landing/Testimonials";
import Integrations from "@/components/landing/Integrations";
import Comparison from "@/components/landing/Comparison";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <Features />
        <UseCases />
        <Testimonials />
        <Integrations />
        <Comparison />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
