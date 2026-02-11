import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { scheduleDemo } from "@/services/demo";

const FORM_NAME_TO_API_KEY: Record<string, string> = {
  fullName: "full_name",
  email: "work_email",
  company: "company",
  phone: "phone_number",
  message: "message",
};

export default function ScheduleDemo() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [genericError, setGenericError] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const apiKey = FORM_NAME_TO_API_KEY[name];
    if (apiKey && fieldErrors[apiKey]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[apiKey];
        return next;
      });
    }
    if (genericError) setGenericError(null);
    if (recaptchaError) setRecaptchaError(null);
  };

  const getErrorForField = (apiKey: string) => fieldErrors[apiKey];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGenericError(null);
    setRecaptchaError(null);
    setIsLoading(true);

    const token = typeof window !== "undefined" ? window.grecaptcha?.getResponse?.() ?? "" : "";
    if (!token || token.length === 0) {
      setIsLoading(false);
      setRecaptchaError("Please complete the reCAPTCHA verification.");
      toast({
        variant: "destructive",
        title: "Verification required",
        description: "Please complete the reCAPTCHA verification.",
      });
      return;
    }

    const payload = {
      full_name: formData.fullName.trim(),
      work_email: formData.email.trim(),
      company: formData.company.trim(),
      phone_number: formData.phone.trim() || null,
      message: formData.message.trim() || null,
      recaptcha_token: token,
    };

    let result;
    try {
      result = await scheduleDemo(payload);
    } catch {
      setIsLoading(false);
      const message = "Something went wrong. Please try again later. Contact support if it persists.";
      setGenericError(message);
      toast({
        variant: "destructive",
        title: "Request failed",
        description: message,
      });
      return;
    }
    setIsLoading(false);

    if (result.success) {
      setSubmitted(true);
      toast({
        title: "Demo request received",
        description: "We'll be in touch shortly to schedule your demo.",
      });
      setFormData({ fullName: "", email: "", company: "", phone: "", message: "" });
      if (typeof window !== "undefined") window.grecaptcha?.reset?.();
      return;
    }

    if (result.status === 400 && "detail" in result) {
      setRecaptchaError(result.detail);
      if (typeof window !== "undefined") window.grecaptcha?.reset?.();
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: result.detail,
      });
      setIsLoading(false);
      return;
    }

    if (result.status === 422 && "errors" in result) {
      setFieldErrors(result.errors);
      if (typeof window !== "undefined") window.grecaptcha?.reset?.();
      toast({
        variant: "destructive",
        title: "Please fix the errors below",
        description: "Check the highlighted fields and try again.",
      });
      return;
    }

    if (typeof window !== "undefined") window.grecaptcha?.reset?.();
    const message =
      result.status === 503 || (result.status >= 500 && "detail" in result)
        ? "Something went wrong. Please try again later. Contact support if it persists."
        : "detail" in result && result.detail
          ? result.detail
          : "Something went wrong. Please try again later.";
    setGenericError(message);
    toast({
      variant: "destructive",
      title: "Request failed",
      description: message,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-card rounded-xl shadow-sm border border-border p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Thank you!</h2>
              <p className="text-muted-foreground mb-8">
                We've received your request and will contact you within 1–2 business days to schedule your demo.
              </p>
              <Button variant="outline" asChild>
                <Link to="/" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-lg mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="bg-card rounded-xl shadow-sm border border-border p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Schedule a Demo</h1>
                <p className="text-muted-foreground text-sm">
                  Tell us a bit about yourself and we'll get back to you soon.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {genericError && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
                  {genericError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">
                  Full name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Jane Smith"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`h-11 ${getErrorForField("full_name") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  required
                />
                {getErrorForField("full_name") && (
                  <p className="text-sm text-destructive">{getErrorForField("full_name")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Work email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`h-11 ${getErrorForField("work_email") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  required
                />
                {getErrorForField("work_email") && (
                  <p className="text-sm text-destructive">{getErrorForField("work_email")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  Company <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Manufacturing"
                  value={formData.company}
                  onChange={handleChange}
                  className={`h-11 ${getErrorForField("company") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  required
                />
                {getErrorForField("company") && (
                  <p className="text-sm text-destructive">{getErrorForField("company")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`h-11 ${getErrorForField("phone_number") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {getErrorForField("phone_number") && (
                  <p className="text-sm text-destructive">{getErrorForField("phone_number")}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  What would you like to learn?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="e.g. How OmniReagent can help us meet the EPA PFAS reporting deadline..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`min-h-[100px] resize-none ${getErrorForField("message") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  rows={4}
                />
                {getErrorForField("message") && (
                  <p className="text-sm text-destructive">{getErrorForField("message")}</p>
                )}
              </div>

              {recaptchaSiteKey && (
                <div className="space-y-2 flex flex-col items-center">
                  <div className="g-recaptcha" data-sitekey={recaptchaSiteKey} />
                  {recaptchaError && (
                    <p className="text-sm text-destructive">{recaptchaError}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Request demo
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
