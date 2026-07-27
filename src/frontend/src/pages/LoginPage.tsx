import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Truck } from "lucide-react";
import { useState } from "react";
import { SiGoogle, SiWhatsapp } from "react-icons/si";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F5F7FA" }}
    >
      {/* Top bar */}
      <div className="navbar-bg py-4 px-6 flex items-center gap-3">
        <div className="bg-primary rounded-lg p-1.5">
          <Truck size={18} className="text-white" />
        </div>
        <span className="text-white font-display font-bold text-lg">
          Truptar Logistics
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            <div className="text-center mb-8">
              <div
                className="inline-flex p-3 rounded-xl mb-4"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <Truck size={28} style={{ color: "#1B2A6B" }} />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Sign in to manage your shipments
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-foreground text-sm font-medium"
                >
                  Email / Phone
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="login.input"
                  className="h-11 bg-white border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-foreground text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-ocid="login.input"
                    className="h-11 bg-white border-border focus:border-primary pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                data-ocid="login.submit_button"
                className="w-full h-11 font-bold text-sm bg-primary hover:bg-primary/90 text-white"
              >
                LOGIN
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                or continue with
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                data-ocid="login.google_button"
                className="w-full h-11 border-border text-foreground hover:bg-muted gap-3"
              >
                <SiGoogle size={16} style={{ color: "#1B2A6B" }} />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                data-ocid="login.whatsapp_button"
                className="w-full h-11 border-border text-foreground hover:bg-muted gap-3"
              >
                <SiWhatsapp size={16} className="text-green-500" />
                Continue with WhatsApp
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <Link
                to="/register"
                data-ocid="login.register_link"
                className="font-medium text-primary hover:underline"
              >
                Create Account
              </Link>
              <span className="text-muted-foreground">·</span>
              <a
                href="/forgot-password"
                data-ocid="login.forgot_link"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 px-4 border-t border-border">
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <a
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <span>·</span>
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <span>·</span>
          <a
            href="/support"
            className="hover:text-foreground transition-colors"
          >
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
}
