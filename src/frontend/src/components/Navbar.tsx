import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, Shield, Truck, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar-bg shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1.5">
              <Truck size={20} className="text-white" />
            </div>
            <span className="text-white font-display font-bold text-xl tracking-tight">
              Truptar Logistics
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/freight-services", label: "Services" },
              { to: "/track-order", label: "Track Order" },
              { to: "/about", label: "About" },
              { to: "/features", label: "Features" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="px-3 py-2 text-sm font-medium text-orange-300 hover:text-orange-200 rounded-md hover:bg-white/10 transition-colors flex items-center gap-1"
              data-ocid="nav.admin.link"
            >
              <Shield size={13} /> Admin
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/shipping-form">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white font-bold gap-1.5"
                    data-ocid="nav.ship_now.button"
                  >
                    <Truck size={14} /> Ship Now
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clear()}
                  className="text-white/80 hover:text-white hover:bg-white/10 gap-1.5"
                  data-ocid="nav.logout.button"
                >
                  <LogOut size={14} /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white hover:bg-white/10"
                    data-ocid="nav.login_page.button"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/shipping-form">
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-white font-bold gap-1.5"
                    data-ocid="nav.ship_now.button"
                  >
                    Ship Now
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 gap-1.5"
                  data-ocid="nav.identity_login.button"
                >
                  {isLoggingIn ? (
                    <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <LogIn size={14} />
                  )}
                  Connect
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-white/10"
          style={{ backgroundColor: "#1B2A6B" }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {[
              { to: "/", label: "Home" },
              { to: "/dashboard", label: "Dashboard" },
              { to: "/freight-services", label: "Services" },
              { to: "/track-order", label: "Track Order" },
              { to: "/about", label: "About" },
              { to: "/features", label: "Features" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2.5 text-sm font-medium text-white rounded-md hover:bg-white/10 transition-colors"
                onClick={() => setOpen(false)}
                data-ocid={`mobile.${link.label.toLowerCase().replace(" ", "_")}.link`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="px-3 py-2.5 text-sm font-bold text-orange-300 rounded-md hover:bg-white/10 transition-colors flex items-center gap-1.5"
              onClick={() => setOpen(false)}
              data-ocid="mobile.admin.link"
            >
              <Shield size={14} /> Admin Panel
            </Link>
            <div className="pt-3 flex gap-2 border-t border-white/10 mt-2">
              {isLoggedIn ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    clear();
                    setOpen(false);
                  }}
                  className="text-white/80 hover:text-white"
                >
                  <LogOut size={14} className="mr-1" /> Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/80 hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="bg-primary text-white font-bold"
                    onClick={() => {
                      login();
                      setOpen(false);
                    }}
                  >
                    Ship Now
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
