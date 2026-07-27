import { CheckCircle2, Globe, Lightbulb, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const VALUES = [
  {
    icon: Zap,
    title: "Speed",
    desc: "Lightning-fast delivery networks optimized for efficiency at every mile.",
  },
  {
    icon: Shield,
    title: "Security",
    desc: "Enterprise-grade cargo protection, insurance, and tamper-proof tracking.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "AI-powered routing, digital signatures, and smart dispatch technology.",
  },
  {
    icon: Globe,
    title: "Reliability",
    desc: "99.2% on-time delivery rate across 42+ countries and counting.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-4 overflow-hidden"
        style={{
          background: "#F5F7FA",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-10 right-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "oklch(0.55 0.18 215 / 0.1)" }}
          />
          <div
            className="absolute -bottom-10 left-10 w-60 h-60 rounded-full blur-3xl"
            style={{ background: "oklch(0.82 0.14 42 / 0.07)" }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-xs font-bold tracking-widest mb-4"
              style={{ color: "#1B2A6B" }}
            >
              ABOUT US
            </p>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight mb-6 text-foreground">
              TRUPTAR
              <br />
              <span style={{ color: "#F47C20" }}>LOGISTICS</span>
            </h1>
            <p
              className="text-lg sm:text-xl font-semibold mb-4 font-display"
              style={{ color: "#1B2A6B" }}
            >
              A logistics innovation powered by JUVENTUS SOPS
            </p>
            <p className="max-w-2xl mx-auto text-base text-muted-foreground leading-relaxed">
              Designed to connect businesses and individuals through fast,
              secure and intelligent freight and delivery systems across cities
              and borders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              label: "OUR MISSION",
              text: "Simplify logistics through smart technology.",
              color: "#1B2A6B",
              glow: "oklch(0.55 0.18 215 / 0.15)",
              borderColor: "#C7D2FE",
            },
            {
              label: "OUR VISION",
              text: "Become a trusted global logistics network.",
              color: "#F47C20",
              glow: "oklch(0.82 0.14 42 / 0.1)",
              borderColor: "#FED7AA",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: item.borderColor,
                boxShadow: `0 0 40px ${item.glow}`,
              }}
            >
              <p
                className="text-xs font-bold tracking-widest mb-4"
                style={{ color: item.color }}
              >
                {item.label}
              </p>
              <p className="text-xl font-display font-bold text-foreground leading-snug">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 px-4 border-t"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest mb-3"
              style={{ color: "#1B2A6B" }}
            >
              CORE VALUES
            </p>
            <h2 className="text-3xl font-display font-bold text-foreground">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-6 border text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
              >
                <div
                  className="inline-flex p-3 rounded-xl mb-4"
                  style={{ backgroundColor: "#EEF2FF" }}
                >
                  <v.icon size={22} style={{ color: "#1B2A6B" }} />
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-widest mb-4"
            style={{ color: "#F47C20" }}
          >
            OUR STORY
          </p>
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">
            Built to Move the World
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Truptar Logistics was born from a simple insight: the global supply
            chain was broken for small and mid-sized businesses. JUVENTUS SOPS
            set out to fix that — building a technology-first logistics platform
            that democratizes access to world-class freight and delivery
            services.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we serve over 800 corporate partners across 42+ countries,
            with a 99.2% on-time delivery rate and a growing network of drivers,
            warehouses, and technology partners committed to redefining
            logistics.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { v: "42+", l: "Countries" },
              { v: "150K+", l: "Deliveries" },
              { v: "800+", l: "Partners" },
              { v: "99.2%", l: "On-Time Rate" },
            ].map((s) => (
              <div key={s.l}>
                <p
                  className="text-2xl font-display font-bold"
                  style={{ color: "#F47C20" }}
                >
                  {s.v}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
