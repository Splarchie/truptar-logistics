import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Truck } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="footer-bg">
      {/* Main footer body */}
      <div className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary rounded-lg p-1.5">
                  <Truck size={18} className="text-white" />
                </div>
                <span className="text-white font-display font-bold text-lg">
                  Truptar Logistics
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#D1D5DB" }}
              >
                Fast, secure, and intelligent freight and delivery systems
                across cities and borders. Powered by JUVENTUS SOPS.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:support@truptar.com"
                  className="flex items-center gap-2 text-xs transition-colors hover:text-primary"
                  style={{ color: "#9CA3AF" }}
                >
                  <Mail size={13} className="text-primary flex-shrink-0" />
                  support@truptar.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-xs transition-colors hover:text-primary"
                  style={{ color: "#9CA3AF" }}
                >
                  <Phone size={13} className="text-primary flex-shrink-0" />
                  +1 (234) 567-8900
                </a>
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#9CA3AF" }}
                >
                  <MapPin size={13} className="text-primary flex-shrink-0" />
                  Global Operations Center
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-5 text-white uppercase">
                Services
              </h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  { to: "/freight-services", label: "Freight Services" },
                  { to: "/services/express-parcel", label: "Express Parcel" },
                  { to: "/services/warehousing", label: "Warehousing" },
                  { to: "/services/customs", label: "Customs Clearance" },
                  { to: "/services/door-to-door", label: "Door-to-Door" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="text-xs transition-colors hover:text-primary"
                    style={{ color: "#9CA3AF" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-5 text-white uppercase">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  {
                    to: "/shipping-form",
                    label: "Ship Now",
                    ocid: "footer.shipnow.link",
                  },
                  {
                    to: "/track-order",
                    label: "Track Shipment",
                    ocid: "footer.track.link",
                  },
                  {
                    to: "/dashboard",
                    label: "My Dashboard",
                    ocid: "footer.dashboard.link",
                  },
                  {
                    to: "/support",
                    label: "Support",
                    ocid: "footer.support.link",
                  },
                  {
                    to: "/features",
                    label: "Features",
                    ocid: "footer.features.link",
                  },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    data-ocid={l.ocid}
                    className="text-xs transition-colors hover:text-primary"
                    style={{ color: "#9CA3AF" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-5 text-white uppercase">
                Company
              </h4>
              <nav className="flex flex-col gap-2.5">
                {[
                  {
                    to: "/about",
                    label: "About Us",
                    ocid: "footer.about.link",
                  },
                  {
                    to: "/features",
                    label: "Platform Features",
                    ocid: "footer.platform.link",
                  },
                  {
                    to: "/admin",
                    label: "Staff Portal",
                    ocid: "footer.admin.link",
                  },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    data-ocid={l.ocid}
                    className="text-xs transition-colors hover:text-primary"
                    style={{ color: "#9CA3AF" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "#1E3A8A" }}
          >
            <p className="text-xs" style={{ color: "#6B7280" }}>
              © {year}{" "}
              <span className="text-white font-medium">TRUPTAR LOGISTICS</span>.{" "}
              Powered by JUVENTUS SOPS.
            </p>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                className="underline hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
