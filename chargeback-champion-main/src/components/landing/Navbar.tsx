import { Link } from "react-router-dom";
import { Zap, Calendar } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">OmniCharge AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="#cta" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            Sign In
          </a>
          <a
            href="#"
            className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Calendar size={14} />
            Schedule a Demo
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
