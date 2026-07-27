import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const STAGES = [
  {
    label: "Order Created",
    icon: Package,
    desc: "Your order has been received and confirmed",
  },
  { label: "Processing", icon: Clock, desc: "Your shipment is being prepared" },
  { label: "In Transit", icon: Truck, desc: "Your shipment is on the way" },
  {
    label: "Out For Delivery",
    icon: MapPin,
    desc: "Shipment is out for final delivery",
  },
  {
    label: "Delivered",
    icon: CheckCircle2,
    desc: "Package has been delivered",
  },
];

function getStatusForOrder(orderId: string): number {
  if (orderId.endsWith("-000")) return 5;
  if (orderId.startsWith("TRUPTAR-LOG-")) return 3;
  return 2;
}

export default function OrderTrackingPage() {
  const [orderInput, setOrderInput] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!orderInput.trim()) return;
    const stage = getStatusForOrder(orderInput.trim().toUpperCase());
    setTrackedOrder(orderInput.trim().toUpperCase());
    setActiveStage(stage);
    if (stage >= 5) {
      toast.success("Your shipment has been successfully delivered.");
    } else {
      const stageName = STAGES[stage - 1]?.label ?? "Processing";
      toast.info(
        `Your shipment ${orderInput.trim().toUpperCase()} is now ${stageName}.`,
      );
    }
  }

  const statusColors = [
    "oklch(0.72 0.19 42)",
    "oklch(0.72 0.19 42)",
    "oklch(0.68 0.16 215)",
    "oklch(0.55 0.22 35)",
    "oklch(0.75 0.15 200)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Track Your Shipment
          </h1>
          <p className="text-muted-foreground">
            Enter your order number to get real-time tracking updates.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleTrack} className="flex gap-3 mb-10">
          <Input
            value={orderInput}
            onChange={(e) => setOrderInput(e.target.value)}
            placeholder="e.g. TRUPTAR-LOG-928372"
            data-ocid="track.order_number.input"
            className="h-12 bg-muted border-border focus:border-secondary flex-1 font-mono"
          />
          <Button
            type="submit"
            data-ocid="track.submit_button"
            className="h-12 px-6 font-bold gap-2"
            style={{
              backgroundColor: "oklch(0.72 0.19 42)",
              color: "#FFFFFF",
            }}
          >
            <Search size={16} /> Track
          </Button>
        </form>

        {/* Tracking Result */}
        {trackedOrder && (
          <div
            className="rounded-xl border p-6 sm:p-8 space-y-6"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB",
            }}
            data-ocid="track.status.card"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Order Number
                </p>
                <p className="font-mono font-bold text-foreground text-lg">
                  {trackedOrder}
                </p>
              </div>
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: `${statusColors[activeStage - 1] ?? statusColors[0]}1a`,
                  color: statusColors[activeStage - 1] ?? statusColors[0],
                }}
              >
                {STAGES[activeStage - 1]?.label ?? "Processing"}
              </span>
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {STAGES.map((stage, idx) => {
                const stageNum = idx + 1;
                const isDone = stageNum < activeStage;
                const isActive = stageNum === activeStage;
                const isPending = stageNum > activeStage;
                const color = isActive
                  ? statusColors[idx]
                  : isDone
                    ? "oklch(0.75 0.15 200)"
                    : "oklch(0.40 0.03 225)";

                return (
                  <div
                    key={stage.label}
                    className="flex gap-4"
                    data-ocid={`track.timeline.item.${stageNum}`}
                  >
                    {/* Line + icon */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{
                          backgroundColor: isPending
                            ? "oklch(0.22 0.06 225)"
                            : `${color}22`,
                          border: `2px solid ${isPending ? "oklch(0.28 0.07 220)" : color}`,
                        }}
                      >
                        {isDone ? (
                          <CheckCircle2 size={16} style={{ color }} />
                        ) : isActive ? (
                          <stage.icon size={16} style={{ color }} />
                        ) : (
                          <Circle
                            size={16}
                            style={{ color: "oklch(0.35 0.03 225)" }}
                          />
                        )}
                      </div>
                      {idx < STAGES.length - 1 && (
                        <div
                          className="w-0.5 flex-1 my-1"
                          style={{
                            backgroundColor: isDone
                              ? "oklch(0.65 0.15 200 / 0.5)"
                              : "oklch(0.28 0.07 220)",
                            minHeight: "28px",
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-6 pt-1.5">
                      <p
                        className="font-semibold text-sm"
                        style={{
                          color: isPending
                            ? "oklch(0.45 0.03 225)"
                            : "oklch(0.97 0.01 210)",
                        }}
                      >
                        {stage.label}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{
                          color: isPending
                            ? "oklch(0.38 0.03 225)"
                            : "oklch(0.55 0.03 225)",
                        }}
                      >
                        {isActive
                          ? stage.desc
                          : isDone
                            ? "Completed"
                            : "Pending"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              className="text-xs text-muted-foreground border-t pt-4"
              style={{ borderColor: "#E5E7EB" }}
            >
              App notifications are sent at every status change event.
            </p>
          </div>
        )}

        {!trackedOrder && (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB",
            }}
          >
            <Truck
              size={40}
              style={{
                color: "oklch(0.55 0.18 215 / 0.4)",
                margin: "0 auto 12px",
              }}
            />
            <p className="text-sm text-muted-foreground">
              Enter your order number above to track your shipment.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
