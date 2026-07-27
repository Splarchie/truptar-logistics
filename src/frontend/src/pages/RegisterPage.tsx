import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "../hooks/useQueries";
import { WORLD_COUNTRIES } from "../lib/countries";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync: registerUser, isPending } = useRegisterUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);

  function update(key: string, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to Terms & Logistics Policy");
      return;
    }
    try {
      await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        passwordHash: btoa(form.password),
      });
      toast.success("Account created successfully!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Registration failed. Please try again.");
    }
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

      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={18} />
              </Link>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Create Account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Join Truptar Logistics today
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    data-ocid="register.input"
                    className="h-10 bg-white border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    data-ocid="register.input"
                    className="h-10 bg-white border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    placeholder="+234 000 0000 000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                    data-ocid="register.input"
                    className="h-10 bg-white border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">
                    Country
                  </Label>
                  <Select onValueChange={(v) => update("country", v)} required>
                    <SelectTrigger
                      data-ocid="register.select"
                      className="h-10 bg-white border-border"
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {WORLD_COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Create password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    required
                    data-ocid="register.input"
                    className="h-10 bg-white border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground text-sm font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    required
                    data-ocid="register.input"
                    className="h-10 bg-white border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(!!v)}
                  data-ocid="register.checkbox"
                  className="mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  I agree to the{" "}
                  <a href="/terms" className="underline text-primary">
                    Terms &amp; Logistics Policy
                  </a>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                data-ocid="register.submit_button"
                className="w-full h-11 font-bold text-sm bg-primary hover:bg-primary/90 text-white mt-2"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                CREATE ACCOUNT
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
