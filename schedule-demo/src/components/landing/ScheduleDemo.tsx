import { Link } from "react-router-dom";
import { siteContent } from "@/data/content";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const { scheduleDemo } = siteContent;

export default function ScheduleDemo() {
  return (
    <section className="min-h-screen bg-[hsl(220_100%_98%)] flex flex-col items-center justify-center px-4 pt-8 pb-12">
      <div className="w-full max-w-md flex flex-col gap-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
        >
          <ArrowLeft size={16} />
          {scheduleDemo.backToHome}
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {scheduleDemo.title}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {scheduleDemo.subtitle}
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                {scheduleDemo.form.fullName} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Smith"
                className="bg-muted/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEmail">
                {scheduleDemo.form.workEmail} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="workEmail"
                type="email"
                placeholder="jane@company.com"
                className="bg-muted/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">
                {scheduleDemo.form.company} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Acme Manufacturing"
                className="bg-muted/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{scheduleDemo.form.phone}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="bg-muted/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learn">{scheduleDemo.form.learn}</Label>
              <Textarea
                id="learn"
                placeholder={scheduleDemo.form.learnPlaceholder}
                className="min-h-[100px] bg-muted/50 resize-none"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full mt-2 rounded-lg" size="lg">
              <Calendar size={18} className="shrink-0" />
              {scheduleDemo.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
