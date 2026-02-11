import { useState } from "react";
import { Link } from "react-router-dom";
import { siteContent } from "@/data/content";
import { Calendar, ArrowLeft } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const { scheduleDemo } = siteContent;

export default function ScheduleDemo() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    phone: "",
    learn: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo request received",
      description: "We'll get back to you soon.",
    });
    setFormData({ fullName: "", workEmail: "", company: "", phone: "", learn: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-section-alt">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {scheduleDemo.backToHome}
        </Link>

        <div className="max-w-lg mx-auto">
          <div className="rounded-2xl border border-border bg-card shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                {scheduleDemo.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              {scheduleDemo.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {scheduleDemo.form.fullName} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Smith"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workEmail">
                  {scheduleDemo.form.workEmail} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="workEmail"
                  name="workEmail"
                  type="email"
                  placeholder="jane@company.com"
                  value={formData.workEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">
                  {scheduleDemo.form.company} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Manufacturing"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{scheduleDemo.form.phone}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="learn">{scheduleDemo.form.learn}</Label>
                <Textarea
                  id="learn"
                  name="learn"
                  placeholder={scheduleDemo.form.learnPlaceholder}
                  value={formData.learn}
                  onChange={handleChange}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full mt-6 gap-2">
                <Calendar className="h-4 w-4" />
                {scheduleDemo.form.submit}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
