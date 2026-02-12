import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { siteContent } from "@/data/content";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const { scheduleDemo } = siteContent;

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";

const scheduleFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  workEmail: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Work email is required"),
  company: Yup.string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .required("Company is required"),
  phone: Yup.string().trim(),
  learn: Yup.string().trim(),
  recaptchaToken: RECAPTCHA_SITE_KEY
    ? Yup.string().required("Please complete the captcha")
    : Yup.string(),
});

type ScheduleFormValues = Yup.InferType<typeof scheduleFormSchema>;

const initialValues: ScheduleFormValues = {
  fullName: "",
  workEmail: "",
  company: "",
  phone: "",
  learn: "",
  recaptchaToken: "",
};

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

          <Formik
            initialValues={initialValues}
            validationSchema={scheduleFormSchema}
            onSubmit={(values) => {
              // Send values to your API; verify recaptchaToken server-side with Google's verify API
              console.log("Schedule demo submitted:", values);
            }}
          >
            {({ setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {scheduleDemo.form.fullName} <span className="text-destructive">*</span>
                  </Label>
                  <Field
                    as={Input}
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Jane Smith"
                    className="bg-muted/50"
                    aria-invalid={touched.fullName && !!errors.fullName}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="p"
                    className="text-sm text-destructive"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workEmail">
                    {scheduleDemo.form.workEmail} <span className="text-destructive">*</span>
                  </Label>
                  <Field
                    as={Input}
                    id="workEmail"
                    name="workEmail"
                    type="email"
                    placeholder="jane@company.com"
                    className="bg-muted/50"
                    aria-invalid={touched.workEmail && !!errors.workEmail}
                  />
                  <ErrorMessage
                    name="workEmail"
                    component="p"
                    className="text-sm text-destructive"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    {scheduleDemo.form.company} <span className="text-destructive">*</span>
                  </Label>
                  <Field
                    as={Input}
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Acme Manufacturing"
                    className="bg-muted/50"
                    aria-invalid={touched.company && !!errors.company}
                  />
                  <ErrorMessage
                    name="company"
                    component="p"
                    className="text-sm text-destructive"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{scheduleDemo.form.phone}</Label>
                  <Field
                    as={Input}
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="bg-muted/50"
                  />
                  <ErrorMessage
                    name="phone"
                    component="p"
                    className="text-sm text-destructive"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learn">{scheduleDemo.form.learn}</Label>
                  <Field
                    as={Textarea}
                    id="learn"
                    name="learn"
                    placeholder={scheduleDemo.form.learnPlaceholder}
                    className="min-h-[100px] bg-muted/50 resize-none"
                    rows={4}
                  />
                  <ErrorMessage
                    name="learn"
                    component="p"
                    className="text-sm text-destructive"
                  />
                </div>

                {RECAPTCHA_SITE_KEY && (
                  <div className="space-y-2">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => {
                        setFieldValue("recaptchaToken", token ?? "");
                        setFieldTouched("recaptchaToken", true);
                      }}
                      onExpired={() => setFieldValue("recaptchaToken", "")}
                      onErrored={() => setFieldValue("recaptchaToken", "")}
                      theme="light"
                      size="normal"
                    />
                    <ErrorMessage
                      name="recaptchaToken"
                      component="p"
                      className="text-sm text-destructive"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full mt-2 rounded-lg"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Calendar size={18} className="shrink-0" />
                  {scheduleDemo.form.submit}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
