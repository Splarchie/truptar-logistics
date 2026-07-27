import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  CheckCircle2,
  Globe,
  Package,
  Plane,
  Ship,
  Truck,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LOCAL_SERVICES = [
  "Truck Cargo Transport",
  "Inter-city cargo shipping",
  "Same-day freight dispatch",
  "Warehouse pickup",
  "Retail distribution",
];

const INTERNATIONAL_SERVICES = [
  "Air Freight",
  "Sea Freight",
  "Cross-border cargo shipping",
  "Container logistics",
  "Export / Import handling",
];

export default function FreightServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section
        className="pt-28 pb-16 px-4 relative overflow-hidden"
        style={{
          background: "#F5F7FA",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "oklch(0.55 0.18 215 / 0.1)" }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{
              backgroundColor: "oklch(0.55 0.18 215 / 0.1)",
              borderColor: "oklch(0.55 0.18 215 / 0.3)",
              color: "#1B2A6B",
            }}
          >
            <Truck size={12} /> Freight Division
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-foreground mb-4">
            Freight Logistics Services
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base leading-relaxed">
            Truptar Logistics provides both Local Freight and International
            Freight solutions designed for individuals, merchants, and
            corporations. Our freight network ensures safe, trackable, and
            efficient cargo movement.
          </p>
        </div>
      </section>

      {/* Two columns */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Local Freight */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "oklch(0.55 0.18 215 / 0.3)",
              boxShadow: "0 0 30px oklch(0.55 0.18 215 / 0.08)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "#EEF2FF" }}
              >
                <Truck size={28} style={{ color: "#1B2A6B" }} />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  LOCAL FREIGHT
                </h2>
                <p className="text-sm text-muted-foreground">
                  Domestic cargo solutions
                </p>
              </div>
            </div>
            <div className="space-y-3 mb-8">
              {LOCAL_SERVICES.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    style={{ color: "#F47C20", flexShrink: 0 }}
                  />
                  <span className="text-sm text-foreground/90">{s}</span>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-5 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
              }}
            >
              <p className="text-xs font-semibold text-muted-foreground mb-2">
                COVERAGE AREA
              </p>
              <p className="text-sm text-foreground/80">
                All 36 states + FCT. Same-day delivery in major cities: Lagos,
                Abuja, Port Harcourt, Kano, Ibadan.
              </p>
            </div>
          </div>

          {/* International Freight */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "oklch(0.82 0.14 42 / 0.3)",
              boxShadow: "0 0 30px oklch(0.82 0.14 42 / 0.06)",
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "oklch(0.82 0.14 42 / 0.12)" }}
              >
                <Globe size={28} style={{ color: "#F47C20" }} />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">
                  INTERNATIONAL FREIGHT
                </h2>
                <p className="text-sm text-muted-foreground">
                  Global cargo movement
                </p>
              </div>
            </div>
            <div className="space-y-3 mb-8">
              {INTERNATIONAL_SERVICES.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <CheckCircle2
                    size={16}
                    style={{ color: "#F47C20", flexShrink: 0 }}
                  />
                  <span className="text-sm text-foreground/90">{s}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Plane, label: "Air Freight" },
                { icon: Ship, label: "Sea Freight" },
                { icon: Box, label: "Container" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center p-3 rounded-lg border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                  }}
                >
                  <item.icon
                    size={20}
                    style={{
                      color: "#F47C20",
                      margin: "0 auto 6px",
                    }}
                  />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section
        className="py-12 px-4 border-t"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Book Service",
                desc: "Fill out our freight form with shipment details",
              },
              {
                step: "02",
                title: "Pickup",
                desc: "Our team collects cargo from your location",
              },
              {
                step: "03",
                title: "In Transit",
                desc: "Real-time tracking throughout the journey",
              },
              {
                step: "04",
                title: "Delivered",
                desc: "Safe delivery with digital confirmation",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="text-4xl font-display font-black mb-3"
                  style={{ color: "oklch(0.55 0.18 215 / 0.4)" }}
                >
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Package
            size={48}
            style={{ color: "#F47C20", margin: "0 auto 20px" }}
          />
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Ready to Move Your Cargo?
          </h2>
          <p className="text-muted-foreground mb-8">
            Fill out our freight booking form and our logistics team will
            contact you within 2 hours.
          </p>
          <Link to="/shipping-form">
            <Button
              size="lg"
              className="h-12 px-10 font-bold gap-2"
              style={{
                backgroundColor: "oklch(0.72 0.19 42)",
                color: "#FFFFFF",
              }}
            >
              Book a Freight Service <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
