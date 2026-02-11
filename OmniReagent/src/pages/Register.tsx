import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { toast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        const result = await register(email, password);

        setIsLoading(false);

        if (result.success) {
            toast({
                title: "Registration successful!",
                description: "You have successfully registered. Please sign in.",
            });
            navigate("/login");
        } else {
            setError(result.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-sidebar relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center px-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                            <Shield className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">PFAS Intelligence</h1>
                            <p className="text-sidebar-foreground/70 text-sm">Compliance Forensic Agent</p>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-4">
                        EPA TSCA Section 8(a)(7)
                        <br />
                        <span className="text-primary">Compliance Made Simple</span>
                    </h2>

                    <p className="text-slate-300 text-lg mb-8 max-w-md">
                        Transform legacy documents into actionable PFAS intelligence.
                        Meet your October 2026 deadline with confidence.
                    </p>

                    <div className="grid grid-cols-2 gap-4 max-w-md">
                        <div className="bg-white/10 rounded-lg p-4 border border-sidebar-border">
                            <p className="text-3xl font-bold text-primary">10,000+</p>
                            <p className="text-sidebar-foreground/70 text-sm">Documents Processed</p>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 border border-sidebar-border">
                            <p className="text-3xl font-bold text-primary">99.2%</p>
                            <p className="text-sidebar-foreground/70 text-sm">Detection Accuracy</p>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            </div>

            {/* Right Panel - Register Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-background">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                            <Shield className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">PFAS Intelligence</span>
                    </div>

                    <div className="bg-card rounded-xl shadow-sm border border-border p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-foreground">Create an account</h2>
                            <p className="text-muted-foreground mt-1">Enter your details to register</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

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

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-11 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="h-11 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Registering...
                                    </>
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-xs text-muted-foreground mt-6">
                        By registering, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
