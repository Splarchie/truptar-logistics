import {
  Calendar,
  Camera,
  MapPin,
  PenLine,
  Route,
  Shield,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const FEATURES = [
  {
    icon: MapPin,
    title: "Real-time Order Tracking",
    desc: "Live GPS tracking for all shipments with instant status updates at every checkpoint along the route.",
  },
  {
    icon: Shield,
    title: "Shipment Insurance",
    desc: "Full coverage protection for your cargo against damage, loss, and unexpected events during transit.",
  },
  {
    icon: Calendar,
    title: "Delivery Scheduling",
    desc: "Choose your preferred delivery time slot and schedule pickups and drop-offs at your convenience.",
  },
  {
    icon: Camera,
    title: "Package Photos Upon Delivery",
    desc: "Visual confirmation at every step — photo documentation of package condition at pickup and delivery.",
  },
  {
    icon: Truck,
    title: "Driver Dispatch System",
    desc: "Smart automated driver assignment based on location, availability, and optimal route proximity.",
  },
  {
    icon: Route,
    title: "Route Optimization",
    desc: "AI-powered fastest delivery routes that reduce transit time, fuel cost, and environmental impact.",
  },
  {
    icon: PenLine,
    title: "Delivery Proof Signature",
    desc: "Digital signature confirmation on delivery — verifiable proof that every package reached its recipient.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-16 px-4 overflow-hidden"
        style={{
          background: "#F5F7FA",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-1/3 w-72 h-72 rounded-full blur-3xl"
            style={{ background: "oklch(0.55 0.18 215 / 0.1)" }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-widest mb-4"
            style={{ color: "#1B2A6B" }}
          >
            PLATFORM CAPABILITIES
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
            Advanced Logistics{" "}
            <span style={{ color: "#F47C20" }}>Features</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Truptar Logistics is packed with cutting-edge capabilities designed
            to make every shipment smarter, safer, and more transparent.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl p-6 border group hover:-translate-y-1 transition-transform duration-200"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
              >
                <div
                  className="inline-flex p-3 rounded-xl mb-4"
                  style={{ backgroundColor: "#FFF7ED" }}
                >
                  <f.icon size={22} style={{ color: "#F47C20" }} />
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 border-t"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-foreground mb-4">
            Ready to experience it?
          </h2>
          <p className="text-muted-foreground mb-8">
            All these features are available the moment you create your first
            shipment on Truptar Logistics.
          </p>
          <a
            href="/shipping-form"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-sm transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "oklch(0.72 0.19 42)",
              color: "#FFFFFF",
            }}
          >
            Ship Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
