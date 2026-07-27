import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Calculator,
  CheckCircle,
  Clock,
  Construction,
  FileCheck,
  Globe,
  MapPin,
  Package,
  RefreshCw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { WORLD_COUNTRIES } from "../lib/countries";

type AppRoute =
  | "/"
  | "/freight-services"
  | "/shipping-form"
  | "/track-order"
  | "/services/warehousing"
  | "/services/corporate"
  | "/services/express-parcel"
  | "/services/ecommerce"
  | "/services/heavy-equipment"
  | "/services/customs"
  | "/services/door-to-door"
  | "/services/special-request";

const SERVICES: {
  icon: React.ElementType;
  label: string;
  href: AppRoute;
  desc: string;
}[] = [
  {
    icon: Truck,
    label: "Freight Services",
    href: "/freight-services",
    desc: "Local & international freight solutions",
  },
  {
    icon: Package,
    label: "Express Parcel Delivery",
    href: "/services/express-parcel",
    desc: "Fast and reliable parcel dispatch",
  },
  {
    icon: Warehouse,
    label: "Warehousing & Storage",
    href: "/services/warehousing",
    desc: "Secure, scalable storage facilities",
  },
  {
    icon: Globe,
    label: "International Cargo",
    href: "/freight-services",
    desc: "Worldwide cargo movement",
  },
  {
    icon: ShoppingCart,
    label: "E-commerce Fulfillment",
    href: "/services/ecommerce",
    desc: "End-to-end order fulfillment",
  },
  {
    icon: Building2,
    label: "Corporate Logistics",
    href: "/services/corporate",
    desc: "Tailored enterprise solutions",
  },
  {
    icon: Construction,
    label: "Heavy Equipment Transport",
    href: "/services/heavy-equipment",
    desc: "Safe heavy-load transportation",
  },
  {
    icon: FileCheck,
    label: "Customs Clearance",
    href: "/services/customs",
    desc: "Hassle-free customs handling",
  },
  {
    icon: MapPin,
    label: "Door-to-Door Delivery",
    href: "/services/door-to-door",
    desc: "Direct delivery to your doorstep",
  },
  {
    icon: Star,
    label: "Special Request Logistics",
    href: "/services/special-request",
    desc: "Custom logistics for unique needs",
  },
];

const STATS = [
  { label: "Shipments Delivered", value: "50K+" },
  { label: "Countries Served", value: "150+" },
  { label: "On-Time Rate", value: "99.8%" },
  { label: "Support", value: "24/7" },
];

const AUTOMATIONS: {
  icon: React.ElementType;
  title: string;
  desc: string;
}[] = [
  {
    icon: Package,
    title: "Auto Order Numbering",
    desc: "Every order gets a unique TRUPTAR-LOG-XXXXXX reference automatically.",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Status Updates",
    desc: "Status changes propagate instantly from admin to customer dashboard.",
  },
  {
    icon: BarChart3,
    title: "Admin-User Live Sync",
    desc: "All user orders are directly linked to the admin control panel.",
  },
  {
    icon: CheckCircle,
    title: "Payment Auto-Log",
    desc: "Bank, crypto, and card payments are recorded and confirmed automatically.",
  },
  {
    icon: MapPin,
    title: "5-Stage Tracking Timeline",
    desc: "Order Created → Processing → In Transit → Out For Delivery → Delivered.",
  },
  {
    icon: Bell,
    title: "In-App Notification Center",
    desc: "Real-time in-app alerts for every shipment milestone.",
  },
  {
    icon: Zap,
    title: "Service Request Auto-Routing",
    desc: "Service forms are automatically routed to the admin panel.",
  },
  {
    icon: Shield,
    title: "Support Ticket System",
    desc: "Built-in helpdesk with ticket creation and 24h response SLA.",
  },
];

export default function HomePage() {
  const [calcOrigin, setCalcOrigin] = useState("");
  const [calcDest, setCalcDest] = useState("");
  const [calcWeight, setCalcWeight] = useState("");
  const [calcType, setCalcType] = useState("Standard");
  const [calcResult, setCalcResult] = useState<string | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const w = Number.parseFloat(calcWeight);
    if (!calcOrigin || !calcDest || !w) return;
    const base = w * 3.5;
    const international = calcOrigin !== calcDest ? 2.5 : 1;
    const typeMultiplier =
      calcType === "Express" ? 1.8 : calcType === "Priority" ? 2.5 : 1;
    const total = base * international * typeMultiplier;
    setCalcResult(`$${total.toFixed(2)}`);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero-bg pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{
                  backgroundColor: "#EEF2FF",
                  borderColor: "#C7D2FE",
                  color: "#1B2A6B",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Trusted by 50,000+ businesses worldwide
              </div>
              <h1
                className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight mb-6 leading-[1.05]"
                style={{ color: "#111827" }}
              >
                Fast &amp; Reliable
                <br />
                <span style={{ color: "#1B2A6B" }}>Logistics</span>{" "}
                <span style={{ color: "#F47C20" }}>Solutions</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Delivering your cargo worldwide with precision and care.
                Door-to-door, freight, customs, warehousing — all in one
                platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/track-order">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-md gap-2"
                    data-ocid="hero.track_shipment.button"
                  >
                    Track Shipment <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/shipping-form">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-bold px-8 gap-2"
                    style={{ borderColor: "#1B2A6B", color: "#1B2A6B" }}
                    data-ocid="hero.get_quote.button"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>

              {/* Stats row */}
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="text-center">
                    <p
                      className="font-display font-extrabold text-2xl"
                      style={{ color: "#F47C20" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div
                className="rounded-2xl p-8"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Truck, label: "Freight", color: "#1B2A6B" },
                    { icon: Package, label: "Express", color: "#F47C20" },
                    { icon: Globe, label: "International", color: "#0EA5E9" },
                    { icon: Shield, label: "Insured", color: "#10B981" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white rounded-xl p-5 flex flex-col items-center gap-2 shadow-sm"
                    >
                      <div
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${item.color}18` }}
                      >
                        <item.icon size={24} style={{ color: item.color }} />
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#DCFCE7" }}
                    >
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        TRUPTAR-LOG-928374
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Out for Delivery · Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest mb-3"
              style={{ color: "#F47C20" }}
            >
              WHAT WE DO
            </p>
            <h2
              className="font-display font-bold text-4xl"
              style={{ color: "#1B2A6B" }}
            >
              Our Services
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              End-to-end logistics solutions designed for businesses and
              individuals alike.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={svc.href}>
                  <div
                    className="service-card p-5 text-center hover:-translate-y-1 transition-transform duration-200 cursor-pointer h-full flex flex-col items-center gap-3"
                    data-ocid={`services.${svc.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}.card`}
                  >
                    <div
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: "#EEF2FF" }}
                    >
                      <svc.icon size={22} style={{ color: "#1B2A6B" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground leading-tight">
                        {svc.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price Calculator ── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#F5F7FA" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-bold tracking-widest mb-3"
              style={{ color: "#F47C20" }}
            >
              INSTANT ESTIMATE
            </p>
            <h2
              className="font-display font-bold text-3xl"
              style={{ color: "#1B2A6B" }}
            >
              Price Calculator
            </h2>
            <p className="text-muted-foreground mt-2">
              Get an instant shipping estimate for your cargo.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-border p-8">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="calc-origin"
                    className="text-sm font-medium text-foreground"
                  >
                    Origin Country
                  </label>
                  <select
                    id="calc-origin"
                    className="w-full h-10 rounded-md border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:border-primary"
                    value={calcOrigin}
                    onChange={(e) => setCalcOrigin(e.target.value)}
                    data-ocid="calculator.origin.select"
                    required
                  >
                    <option value="">Select origin</option>
                    {WORLD_COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="calc-dest"
                    className="text-sm font-medium text-foreground"
                  >
                    Destination Country
                  </label>
                  <select
                    id="calc-dest"
                    className="w-full h-10 rounded-md border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:border-primary"
                    value={calcDest}
                    onChange={(e) => setCalcDest(e.target.value)}
                    data-ocid="calculator.destination.select"
                    required
                  >
                    <option value="">Select destination</option>
                    {WORLD_COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="calc-weight"
                    className="text-sm font-medium text-foreground"
                  >
                    Weight (kg)
                  </label>
                  <Input
                    id="calc-weight"
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="e.g. 5.0"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    data-ocid="calculator.weight.input"
                    className="h-10 bg-white border-border focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="calc-type"
                    className="text-sm font-medium text-foreground"
                  >
                    Shipment Type
                  </label>
                  <select
                    id="calc-type"
                    className="w-full h-10 rounded-md border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:border-primary"
                    value={calcType}
                    onChange={(e) => setCalcType(e.target.value)}
                    data-ocid="calculator.type.select"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Express">Express</option>
                    <option value="Priority">Priority</option>
                  </select>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold gap-2"
                data-ocid="calculator.calculate.button"
              >
                <Calculator size={18} /> Calculate Estimate
              </Button>
            </form>
            {calcResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-xl p-5 text-center"
                style={{ backgroundColor: "#EEF2FF" }}
                data-ocid="calculator.result.panel"
              >
                <p className="text-sm font-medium" style={{ color: "#1B2A6B" }}>
                  Estimated Shipping Cost
                </p>
                <p
                  className="font-display font-extrabold text-4xl mt-2"
                  style={{ color: "#F47C20" }}
                >
                  {calcResult}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Estimate only. Final price may vary by route.
                </p>
                <Link to="/shipping-form">
                  <Button
                    size="sm"
                    className="mt-4 bg-primary text-white font-bold gap-2"
                  >
                    Ship Now <ArrowRight size={14} />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-bg py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
              Ready to Ship?
            </h2>
            <p className="text-white/85 text-lg mb-8">
              Get started today and experience world-class logistics. Fast,
              reliable, and fully tracked.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shipping-form">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow-md gap-2"
                  data-ocid="cta.get_started.button"
                >
                  Get Started <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/track-order">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 gap-2"
                  data-ocid="cta.track.button"
                >
                  Track a Shipment
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Automation Hub ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest mb-3"
              style={{ color: "#F47C20" }}
            >
              BUILT-IN AUTOMATION
            </p>
            <h2
              className="font-display font-bold text-4xl"
              style={{ color: "#1B2A6B" }}
            >
              Automation Hub
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Every free automation you need, built directly into the platform —
              no extra tools required.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUTOMATIONS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="service-card p-6 hover:-translate-y-1 transition-transform duration-200"
              >
                <div
                  className="inline-flex p-3 rounded-xl mb-4"
                  style={{ backgroundColor: "#EEF2FF" }}
                >
                  <a.icon size={20} style={{ color: "#1B2A6B" }} />
                </div>
                <h3 className="font-display font-bold text-sm text-foreground mb-2">
                  {a.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
