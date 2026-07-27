import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  CreditCard,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  Search,
  Ticket,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing } from "../backend.d";
import { StatusBadge } from "../components/StatusBadge";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCallerProfile,
  useMyOrders,
  useSaveProfile,
} from "../hooks/useQueries";

type Tab =
  | "overview"
  | "shipments"
  | "create"
  | "track"
  | "payments"
  | "support"
  | "profile";

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  }
> = {
  pending: {
    label: "Pending",
    color: "#F47C20",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    color: "#F47C20",
    icon: Clock,
  },
  in_transit: {
    label: "In Transit",
    color: "#0EA5E9",
    icon: Truck,
  },
  out_for_delivery: {
    label: "Out for Delivery",
    color: "#F47C20",
    icon: MapPin,
  },
  delivered: {
    label: "Delivered",
    color: "#0EA5E9",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "oklch(0.55 0.22 25)",
    icon: XCircle,
  },
};

const TRACKING_STAGES = [
  { label: "Order Created", icon: Package },
  { label: "Processing", icon: Clock },
  { label: "In Transit", icon: Truck },
  { label: "Out For Delivery", icon: MapPin },
  { label: "Delivered", icon: CheckCircle2 },
];

const MOCK_PAYMENTS = [
  {
    orderId: "TRUPTAR-LOG-001",
    amount: "$120.00",
    method: "Bank Transfer",
    status: "Confirmed",
    date: "Mar 10, 2026",
  },
  {
    orderId: "TRUPTAR-LOG-002",
    amount: "$85.50",
    method: "Mobile Money",
    status: "Confirmed",
    date: "Mar 8, 2026",
  },
  {
    orderId: "TRUPTAR-LOG-003",
    amount: "$340.00",
    method: "Card Payment",
    status: "Pending",
    date: "Mar 12, 2026",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { data: orders = [], isLoading: ordersLoading } = useMyOrders();
  const { data: profile } = useCallerProfile();
  const { mutateAsync: saveProfile, isPending: savingProfile } =
    useSaveProfile();
  const { clear: logout, identity } = useInternetIdentity();

  const [profileForm, setProfileForm] = useState({
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    country: profile?.country ?? "",
  });
  const [trackInput, setTrackInput] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<string | null>(null);
  const [trackStage, setTrackStage] = useState(0);
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "",
    description: "",
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const statusCounts = {
    total: orders.length,
    active: orders.filter(
      (o) =>
        (o.status as string) === "pending" ||
        (o.status as string) === "processing" ||
        (o.status as string) === "in_transit" ||
        (o.status as string) === "out_for_delivery",
    ).length,
    delivered: orders.filter((o) => (o.status as string) === "delivered")
      .length,
  };

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    try {
      await saveProfile({
        ...profileForm,
        passwordHash: profile?.passwordHash ?? "",
      });
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to save profile.");
    }
  }

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!trackInput.trim()) return;
    const id = trackInput.trim().toUpperCase();
    const stage = id.endsWith("-000")
      ? 5
      : id.startsWith("TRUPTAR-LOG-")
        ? 3
        : 2;
    setTrackedOrder(id);
    setTrackStage(stage);
    if (stage >= 5)
      toast.success("Your shipment has been successfully delivered.");
    else
      toast.info(
        `Your shipment ${id} is now ${TRACKING_STAGES[stage - 1]?.label}.`,
      );
  }

  function handleSupportSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSupportSubmitted(true);
    toast.success(
      "Support ticket submitted. Our team will respond within 24 hours.",
    );
  }

  const sidebarItems: {
    id: Tab;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
    label: string;
  }[] = [
    { id: "overview", icon: LayoutDashboard, label: "Overview" },
    { id: "shipments", icon: Package, label: "My Shipments" },
    { id: "create", icon: Plus, label: "Create Shipment" },
    { id: "track", icon: Search, label: "Track Shipment" },
    { id: "payments", icon: CreditCard, label: "Payment History" },
    { id: "support", icon: Ticket, label: "Support Tickets" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 border-r min-h-screen"
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#E5E7EB",
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#E5E7EB" }}>
          <Link to="/">
            <img
              src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
              alt="Truptar Logistics"
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                if (item.id === "create") navigate({ to: "/shipping-form" });
                else setActiveTab(item.id);
              }}
              data-ocid={`dashboard.${item.id}.tab`}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeTab === item.id
                    ? "rgba(248,124,32,0.15)"
                    : "transparent",
                color: activeTab === item.id ? "#FFFFFF" : "#93C5FD",
                borderLeft:
                  activeTab === item.id
                    ? "3px solid #F47C20"
                    : "3px solid transparent",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t" style={{ borderColor: "#E5E7EB" }}>
          {identity && (
            <p className="text-xs text-muted-foreground px-4 mb-3 truncate">
              {identity.getPrincipal().toString().substring(0, 18)}...
            </p>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile topbar */}
        <div
          className="md:hidden flex items-center justify-between px-4 h-14 border-b sticky top-0 z-10"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
          }}
        >
          <img
            src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
            alt="Truptar"
            className="h-8 w-auto"
          />
          <div className="flex gap-1">
            {sidebarItems.slice(0, 5).map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="p-2 rounded-lg"
                style={{
                  color: activeTab === item.id ? "#FFFFFF" : "#93C5FD",
                }}
              >
                <item.icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-1">
                  Welcome back{profile?.name ? `, ${profile.name}` : ""}!
                </h1>
                <p className="text-muted-foreground">
                  Here's an overview of your logistics activity.
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    label: "Total Orders",
                    value: statusCounts.total,
                    icon: Package,
                    color: "#FFFFFF",
                    gradient: "#F5F7FA",
                    border: "#BFDBFE",
                  },
                  {
                    label: "Active Shipments",
                    value: statusCounts.active,
                    icon: Truck,
                    color: "#F47C20",
                    gradient: "#F5F7FA",
                    border: "#FED7AA",
                  },
                  {
                    label: "Delivered Orders",
                    value: statusCounts.delivered,
                    icon: CheckCircle2,
                    color: "#0EA5E9",
                    gradient: "#F5F7FA",
                    border: "#A5F3FC",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-5 border transition-all hover:-translate-y-1"
                    style={{
                      background: stat.gradient,
                      borderColor: stat.border,
                      boxShadow: `0 4px 16px ${stat.border}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                      <stat.icon size={16} style={{ color: stat.color }} />
                    </div>
                    <p
                      className="text-3xl font-display font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="rounded-xl p-6 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "oklch(0.55 0.18 215 / 0.3)",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Link to="/shipping-form">
                    <Button
                      className="gap-2"
                      style={{
                        backgroundColor: "oklch(0.72 0.19 42)",
                        color: "#FFFFFF",
                      }}
                    >
                      <Plus size={16} /> New Shipment
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="gap-2 border-secondary text-secondary hover:bg-secondary/10"
                    onClick={() => setActiveTab("shipments")}
                  >
                    <Package size={16} /> View Shipments
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 border-border text-muted-foreground hover:text-foreground"
                    onClick={() => setActiveTab("track")}
                  >
                    <Search size={16} /> Track Order
                  </Button>
                </div>
              </div>
              {orders.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-foreground">
                      Recent Shipments
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("shipments")}
                      className="text-xs font-medium flex items-center gap-1"
                      style={{ color: "#FFFFFF" }}
                    >
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order, i) => {
                      const sc =
                        STATUS_CONFIG[order.status as string] ??
                        STATUS_CONFIG.pending;
                      return (
                        <div
                          key={order.id}
                          className="flex items-center gap-4 rounded-xl p-4 border"
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#E5E7EB",
                          }}
                          data-ocid={`dashboard.orders.row.${i + 1}`}
                        >
                          <div
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: `${sc.color}1a` }}
                          >
                            <sc.icon size={16} style={{ color: sc.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {order.id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.sender.city} → {order.receiver.city}
                            </p>
                          </div>
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: `${sc.color}1a`,
                              color: sc.color,
                            }}
                          >
                            {sc.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* My Shipments */}
          {activeTab === "shipments" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-display font-bold text-foreground">
                    My Shipments
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {orders.length} shipment{orders.length !== 1 ? "s" : ""}{" "}
                    found
                  </p>
                </div>
                <Link to="/shipping-form">
                  <Button
                    className="gap-2"
                    style={{
                      backgroundColor: "oklch(0.72 0.19 42)",
                      color: "#FFFFFF",
                    }}
                  >
                    <Plus size={16} /> New Order
                  </Button>
                </Link>
              </div>
              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="dashboard.orders.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div
                  className="rounded-xl p-16 border text-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                  }}
                  data-ocid="dashboard.orders.empty_state"
                >
                  <Package
                    size={48}
                    style={{
                      color: "oklch(0.55 0.18 215 / 0.4)",
                      margin: "0 auto 16px",
                    }}
                  />
                  <p className="font-display font-semibold text-foreground mb-2">
                    No shipments yet
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Create your first shipping order to get started.
                  </p>
                  <Link to="/shipping-form">
                    <Button
                      style={{
                        backgroundColor: "oklch(0.72 0.19 42)",
                        color: "#FFFFFF",
                      }}
                      className="gap-2"
                    >
                      <Plus size={16} /> Create Order
                    </Button>
                  </Link>
                </div>
              ) : (
                <div
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: "#E5E7EB" }}
                  data-ocid="dashboard.orders.table"
                >
                  <Table>
                    <TableHeader style={{ backgroundColor: "#FFFFFF" }}>
                      <TableRow style={{ borderColor: "#E5E7EB" }}>
                        <TableHead className="text-muted-foreground">
                          Order ID
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Status
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          From → To
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Type
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Category
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <TableRow
                          key={order.id}
                          data-ocid={`dashboard.orders.row.${i + 1}`}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#E5E7EB",
                          }}
                        >
                          <TableCell className="font-mono text-xs text-foreground/80">
                            {order.id}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status as string} />
                          </TableCell>
                          <TableCell className="text-sm text-foreground/80">
                            {order.sender.city} → {order.receiver.city}
                          </TableCell>
                          <TableCell className="text-sm capitalize text-foreground/70">
                            {order.shipment.deliveryType}
                          </TableCell>
                          <TableCell className="text-sm capitalize text-foreground/70">
                            {order.shipment.category}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* Track Shipment */}
          {activeTab === "track" && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Track Shipment
                </h1>
                <p className="text-muted-foreground mt-1">
                  Enter your order number to get real-time tracking updates.
                </p>
              </div>
              <form onSubmit={handleTrack} className="flex gap-3">
                <Input
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  placeholder="e.g. TRUPTAR-LOG-928372"
                  data-ocid="track.order_number.input"
                  className="h-11 bg-muted border-border focus:border-secondary flex-1 font-mono"
                />
                <Button
                  type="submit"
                  data-ocid="track.submit_button"
                  className="h-11 px-5 font-bold gap-2"
                  style={{
                    backgroundColor: "oklch(0.72 0.19 42)",
                    color: "#FFFFFF",
                  }}
                >
                  <Search size={16} /> Track
                </Button>
              </form>
              {trackedOrder ? (
                <div
                  className="rounded-xl border p-6"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                  }}
                  data-ocid="track.status.card"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Order Number
                      </p>
                      <p className="font-mono font-bold text-foreground">
                        {trackedOrder}
                      </p>
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.15)",
                        color: "#FFFFFF",
                      }}
                    >
                      {TRACKING_STAGES[trackStage - 1]?.label ?? "Processing"}
                    </span>
                  </div>
                  <div className="space-y-0">
                    {TRACKING_STAGES.map((stage, idx) => {
                      const sn = idx + 1;
                      const isDone = sn < trackStage;
                      const isActive = sn === trackStage;
                      const isPending = sn > trackStage;
                      const color = isActive
                        ? "#FFFFFF"
                        : isDone
                          ? "oklch(0.75 0.15 200)"
                          : "oklch(0.40 0.03 225)";
                      return (
                        <div
                          key={stage.label}
                          className="flex gap-4"
                          data-ocid={`track.timeline.item.${sn}`}
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: isPending
                                  ? "oklch(0.22 0.06 225)"
                                  : `${color}22`,
                                border: `2px solid ${isPending ? "oklch(0.28 0.07 220)" : color}`,
                              }}
                            >
                              {isDone ? (
                                <CheckCircle2 size={14} style={{ color }} />
                              ) : isActive ? (
                                <stage.icon size={14} style={{ color }} />
                              ) : (
                                <Circle
                                  size={14}
                                  style={{ color: "oklch(0.35 0.03 225)" }}
                                />
                              )}
                            </div>
                            {idx < TRACKING_STAGES.length - 1 && (
                              <div
                                className="w-0.5 flex-1 my-1"
                                style={{
                                  backgroundColor: isDone
                                    ? "oklch(0.65 0.15 200 / 0.5)"
                                    : "oklch(0.28 0.07 220)",
                                  minHeight: "24px",
                                }}
                              />
                            )}
                          </div>
                          <div className="pb-5 pt-1">
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
                                ? "Current status"
                                : isDone
                                  ? "Completed"
                                  : "Pending"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-xl border p-10 text-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                  }}
                >
                  <Search
                    size={36}
                    style={{
                      color: "oklch(0.55 0.18 215 / 0.3)",
                      margin: "0 auto 12px",
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter your order number above to track your shipment.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Payment History */}
          {activeTab === "payments" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Payment History
                </h1>
                <p className="text-muted-foreground mt-1">
                  Your recent payment transactions
                </p>
              </div>
              <div
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: "#E5E7EB" }}
              >
                <Table>
                  <TableHeader style={{ backgroundColor: "#FFFFFF" }}>
                    <TableRow style={{ borderColor: "#E5E7EB" }}>
                      <TableHead className="text-muted-foreground">
                        Order ID
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Amount
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Method
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Status
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_PAYMENTS.map((p, i) => (
                      <TableRow
                        key={p.orderId}
                        data-ocid={`dashboard.payments.row.${i + 1}`}
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E5E7EB",
                        }}
                      >
                        <TableCell className="font-mono text-xs text-foreground/80">
                          {p.orderId}
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">
                          {p.amount}
                        </TableCell>
                        <TableCell className="text-sm text-foreground/70">
                          {p.method}
                        </TableCell>
                        <TableCell>
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor:
                                p.status === "Confirmed"
                                  ? "oklch(0.65 0.15 200 / 0.15)"
                                  : "oklch(0.82 0.14 42 / 0.15)",
                              color:
                                p.status === "Confirmed"
                                  ? "oklch(0.75 0.15 200)"
                                  : "oklch(0.72 0.19 42)",
                            }}
                          >
                            {p.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-foreground/60">
                          {p.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Support Tickets */}
          {activeTab === "support" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Support Tickets
                </h1>
                <p className="text-muted-foreground mt-1">
                  Submit a support request or view existing tickets
                </p>
              </div>
              {supportSubmitted ? (
                <div
                  className="rounded-xl border p-10 text-center"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "oklch(0.65 0.15 200 / 0.4)",
                  }}
                >
                  <CheckCircle2
                    size={40}
                    style={{
                      color: "#0EA5E9",
                      margin: "0 auto 12px",
                    }}
                  />
                  <p className="text-lg font-semibold text-foreground mb-2">
                    Ticket Submitted!
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Our support team will respond within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSupportSubmitted(false)}
                    variant="outline"
                    className="border-secondary text-secondary"
                  >
                    Submit Another Ticket
                  </Button>
                </div>
              ) : (
                <div
                  className="rounded-xl border p-6 sm:p-8 max-w-2xl"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                  }}
                >
                  <h2 className="font-display font-bold text-foreground mb-5">
                    New Support Ticket
                  </h2>
                  <form onSubmit={handleSupportSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label>Subject</Label>
                      <Input
                        value={supportForm.subject}
                        onChange={(e) =>
                          setSupportForm((p) => ({
                            ...p,
                            subject: e.target.value,
                          }))
                        }
                        placeholder="Brief description of your issue"
                        className="bg-muted border-border focus:border-secondary h-10"
                        required
                        data-ocid="support.subject.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        onValueChange={(v) =>
                          setSupportForm((p) => ({ ...p, category: v }))
                        }
                        required
                      >
                        <SelectTrigger
                          className="bg-muted border-border h-10"
                          data-ocid="support.category.select"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delivery">
                            Delivery Issue
                          </SelectItem>
                          <SelectItem value="payment">Payment Issue</SelectItem>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={supportForm.description}
                        onChange={(e) =>
                          setSupportForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Please describe your issue in detail..."
                        className="bg-muted border-border focus:border-secondary min-h-[120px]"
                        required
                        data-ocid="support.description.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      data-ocid="support.submit_button"
                      className="gap-2"
                      style={{
                        backgroundColor: "oklch(0.72 0.19 42)",
                        color: "#FFFFFF",
                      }}
                    >
                      Submit Ticket
                    </Button>
                  </form>
                </div>
              )}
              <div
                className="rounded-xl border p-8 text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
                data-ocid="support.tickets.empty_state"
              >
                <Ticket
                  size={36}
                  style={{
                    color: "oklch(0.55 0.18 215 / 0.3)",
                    margin: "0 auto 12px",
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  No previous tickets found.
                </p>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  My Profile
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your account details
                </p>
              </div>
              <div
                className="rounded-xl p-8 border max-w-2xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
              >
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Full Name
                      </Label>
                      <Input
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        placeholder="John Doe"
                        data-ocid="dashboard.profile.name.input"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        placeholder="you@email.com"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Phone
                      </Label>
                      <Input
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+234 000 0000 000"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Country
                      </Label>
                      <Input
                        value={profileForm.country}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            country: e.target.value,
                          }))
                        }
                        placeholder="Nigeria"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={savingProfile}
                    data-ocid="dashboard.profile.save_button"
                    className="gap-2"
                    style={{
                      backgroundColor: "oklch(0.72 0.19 42)",
                      color: "#FFFFFF",
                    }}
                  >
                    {savingProfile ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : null}{" "}
                    Save Changes
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
