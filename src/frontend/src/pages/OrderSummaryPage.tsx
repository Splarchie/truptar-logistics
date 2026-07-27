import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Hash,
  MapPin,
  Package,
  PhoneCall,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface PendingOrder {
  orderNumber: string;
  orderId: string;
  createdAt: string;
  sender: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  receiver: {
    name: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  shipment: {
    description: string;
    weight: string;
    quantity: string;
    deliveryType: string;
    category: string;
  };
}

const MULTIPLIERS: Record<string, number> = {
  standard: 2000,
  express: 3500,
  priority: 5000,
};

function formatCost(weight: string, deliveryType: string): string {
  const w = Number.parseFloat(weight) || 0;
  const multiplier = MULTIPLIERS[deliveryType?.toLowerCase()] ?? 2000;
  const cost = w * multiplier;
  return cost.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2.5 border-b last:border-b-0"
      style={{ borderColor: "#E5E7EB" }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wider w-40 shrink-0"
        style={{ color: "oklch(0.62 0.06 215)" }}
      >
        {label}
      </span>
      <span className="text-sm text-foreground">{value || "—"}</span>
    </div>
  );
}

function SectionCard({
  icon,
  title,
  accentColor,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E5E7EB",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <div style={{ color: accentColor }}>{icon}</div>
        </div>
        <h3 className="font-display font-bold text-foreground">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function OrderSummaryPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<PendingOrder | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("truptar_pending_order");
    if (raw) {
      setOrder(JSON.parse(raw));
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <Package
              size={48}
              className="mx-auto mb-4"
              style={{ color: "#1B2A6B" }}
            />
            <h2 className="text-xl font-display font-bold text-foreground mb-2">
              No Order Found
            </h2>
            <p className="text-muted-foreground mb-6">
              Please create a shipping order first.
            </p>
            <Link to="/shipping-form">
              <Button
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "#FFFFFF",
                }}
              >
                Create Order
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const deliveryLabel =
    order.shipment.deliveryType.charAt(0).toUpperCase() +
    order.shipment.deliveryType.slice(1);
  const categoryLabel =
    order.shipment.category === "document_"
      ? "Document"
      : order.shipment.category.charAt(0).toUpperCase() +
        order.shipment.category.slice(1);

  const estimatedCost = formatCost(
    order.shipment.weight,
    order.shipment.deliveryType,
  );
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="order_summary.page"
    >
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Order Number Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#1B2A6B" }}
            >
              Order Confirmed
            </p>
            <div
              className="inline-block rounded-2xl px-8 py-5 border mb-4"
              data-ocid="order_summary.order_number"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "oklch(0.82 0.14 42 / 0.5)",
                boxShadow: "0 0 40px oklch(0.82 0.14 42 / 0.12)",
              }}
            >
              <div className="flex items-center gap-3">
                <Hash size={20} style={{ color: "#F47C20" }} />
                <span
                  className="font-mono text-2xl font-bold tracking-wider"
                  style={{ color: "#F47C20" }}
                >
                  {order.orderNumber}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-display font-extrabold text-foreground">
              Order Summary
            </h1>
          </motion.div>

          <div className="space-y-5">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <SectionCard
                icon={<Package size={18} />}
                title="Order Summary"
                accentColor="oklch(0.68 0.16 215)"
              >
                <DetailRow label="Order Number" value={order.orderNumber} />
                <DetailRow label="Date" value={formattedDate} />
                <DetailRow label="Status" value="Pending" />
              </SectionCard>
            </motion.div>

            {/* Sender Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <SectionCard
                icon={<User size={18} />}
                title="Sender Details"
                accentColor="oklch(0.68 0.16 215)"
              >
                <DetailRow label="Full Name" value={order.sender.name} />
                <DetailRow label="Phone" value={order.sender.phone} />
                <DetailRow label="Email" value={order.sender.email} />
                <DetailRow label="Address" value={order.sender.address} />
                <DetailRow label="City" value={order.sender.city} />
                <DetailRow label="Country" value={order.sender.country} />
              </SectionCard>
            </motion.div>

            {/* Receiver Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SectionCard
                icon={<MapPin size={18} />}
                title="Receiver Details"
                accentColor="oklch(0.72 0.19 42)"
              >
                <DetailRow label="Name" value={order.receiver.name} />
                <DetailRow label="Phone" value={order.receiver.phone} />
                <DetailRow label="Address" value={order.receiver.address} />
                <DetailRow label="City" value={order.receiver.city} />
                <DetailRow label="Country" value={order.receiver.country} />
              </SectionCard>
            </motion.div>

            {/* Shipping Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <SectionCard
                icon={<Truck size={18} />}
                title="Shipping Type"
                accentColor="oklch(0.60 0.22 274)"
              >
                <DetailRow label="Delivery Type" value={deliveryLabel} />
                <DetailRow label="Category" value={categoryLabel} />
                <DetailRow
                  label="Weight"
                  value={`${order.shipment.weight} kg`}
                />
                <DetailRow label="Quantity" value={order.shipment.quantity} />
                <DetailRow
                  label="Description"
                  value={order.shipment.description}
                />
              </SectionCard>
            </motion.div>

            {/* Estimated Cost */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FED7AA",
                  boxShadow: "0 0 30px oklch(0.82 0.14 42 / 0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: "oklch(0.82 0.14 42 / 0.15)" }}
                  >
                    <Wallet size={18} style={{ color: "#F47C20" }} />
                  </div>
                  <h3 className="font-display font-bold text-foreground">
                    Estimated Cost
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Based on {order.shipment.weight}kg × {deliveryLabel} rate
                    </p>
                    <p
                      className="text-3xl font-display font-extrabold"
                      style={{ color: "#F47C20" }}
                    >
                      {estimatedCost}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: "oklch(0.82 0.14 42 / 0.12)",
                      color: "#F47C20",
                    }}
                  >
                    NGN
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Proceed Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Button
              data-ocid="order_summary.proceed_button"
              onClick={() => navigate({ to: "/payment" })}
              className="w-full h-14 font-bold text-base tracking-wider gap-3"
              style={{
                backgroundColor: "oklch(0.68 0.16 215)",
                color: "white",
              }}
            >
              Proceed To Payment
              <ArrowRight size={20} />
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              <PhoneCall size={12} className="inline mr-1" />
              Questions? Contact us at +234 800 TRUPTAR
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
