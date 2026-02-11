import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Loader2, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await requestPasswordReset(email);
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PFAS Intelligence</span>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-8">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Forgot password?</h2>
                <p className="text-muted-foreground mt-1">
                  No worries, we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-status-success-bg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-status-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Check your email</h2>
              <p className="text-muted-foreground mb-6">
                Password reset instructions have been sent to{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  try again
                </button>
              </p>
              <Link to="/reset-password">
                <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Continue to reset password
                </Button>
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
