import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  Package,
  RefreshCw,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ShippingOrder } from "../backend.d";
import { Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing } from "../backend.d";
import { StatusBadge } from "../components/StatusBadge";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllOrders,
  useAllServiceRequests,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

type AdminTab =
  | "dashboard"
  | "orders"
  | "payments"
  | "users"
  | "tracking"
  | "notifications"
  | "service-requests";

const TAB_CONFIG: {
  id: AdminTab;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: Package },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "users", label: "Users", icon: Users },
  { id: "tracking", label: "Tracking Control", icon: Truck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "service-requests", label: "Service Requests", icon: Briefcase },
];

const SKY = "oklch(0.32 0.12 265)";
const ORANGE = "oklch(0.72 0.19 42)";
const LIGHT_BLUE = "oklch(0.50 0.14 255)";

type OrderStatus =
  | "Processing"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered";

const STATUS_SEQUENCE: OrderStatus[] = [
  "Processing",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

const STATUS_DISPLAY: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function getStatusDisplay(status: unknown): string {
  const key = String(status ?? "");
  return STATUS_DISPLAY[key] ?? key;
}

function StatCard({
  label,
  value,
  color,
  gradient,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  gradient?: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className="rounded-2xl p-6 border flex items-center gap-4 transition-all hover:-translate-y-1"
      style={{
        background: gradient ?? "#FFFFFF",
        borderColor: `${color}55`,
        boxShadow: `0 4px 20px ${color}22`,
      }}
    >
      <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}22` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold" style={{ color }}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function TrackingRow({
  order,
  onUpdate,
  isUpdating,
}: {
  order: ShippingOrder;
  onUpdate: (
    orderId: string,
    backendStatus: Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing,
    label: OrderStatus,
  ) => void;
  isUpdating: boolean;
}) {
  const currentDisplay = getStatusDisplay(order.status) as OrderStatus;

  const statusColor: Record<string, string> = {
    Processing: "oklch(0.78 0.17 55)",
    "In Transit": SKY,
    "Out for Delivery": ORANGE,
    Delivered: LIGHT_BLUE,
    Pending: "oklch(0.65 0.10 55)",
  };

  const backendMap: Record<
    OrderStatus,
    Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing
  > = {
    Processing:
      Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing.processing,
    "In Transit":
      Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing.in_transit,
    "Out for Delivery":
      Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing.out_for_delivery,
    Delivered:
      Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing.delivered,
  };

  const dotColor = statusColor[currentDisplay] ?? LIGHT_BLUE;

  return (
    <div
      className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
      data-ocid="admin.tracking.row"
    >
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-foreground/70 truncate">
          {order.id}
        </p>
        <p className="text-sm font-semibold mt-0.5" style={{ color: SKY }}>
          {order.sender.name} → {order.receiver.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {order.sender.city} → {order.receiver.city}
        </p>
      </div>
      <div
        className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
        style={{
          backgroundColor: `${dotColor}22`,
          color: dotColor,
        }}
      >
        {currentDisplay}
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUS_SEQUENCE.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={currentDisplay === s ? "default" : "outline"}
            disabled={isUpdating}
            onClick={() => onUpdate(order.id, backendMap[s], s)}
            className="text-xs h-7 px-3"
            style={{
              backgroundColor:
                currentDisplay === s
                  ? `${statusColor[s] ?? LIGHT_BLUE}33`
                  : "transparent",
              borderColor: `${statusColor[s] ?? LIGHT_BLUE}55`,
              color: statusColor[s] ?? LIGHT_BLUE,
            }}
            data-ocid={`admin.tracking.${s.replace(/ /g, "_").toLowerCase()}_button`}
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const {
    data: orders = [],
    isLoading: ordersLoading,
    refetch,
  } = useAllOrders();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();
  const { data: serviceRequests = [], isLoading: srLoading } =
    useAllServiceRequests();

  const stats = {
    total: orders.length,
    processing: orders.filter(
      (o) =>
        (o.status as string) === "processing" ||
        (o.status as string) === "pending",
    ).length,
    inTransit: orders.filter(
      (o) =>
        (o.status as string) === "in_transit" ||
        (o.status as string) === "out_for_delivery",
    ).length,
    delivered: orders.filter((o) => (o.status as string) === "delivered")
      .length,
  };

  async function handleStatusUpdate(
    orderId: string,
    backendStatus: Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing,
    label: OrderStatus,
  ) {
    try {
      await updateStatus({ orderId, status: backendStatus });
      toast.success(`Order status updated to "${label}"`);
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  }

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background: "#F5F7FA",
        }}
      >
        <div
          className="w-full max-w-md rounded-2xl border p-10 text-center"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#C7D2FE",
            boxShadow: `0 0 60px ${SKY}18`,
          }}
          data-ocid="admin.login.panel"
        >
          <div
            className="inline-flex p-4 rounded-2xl mb-6"
            style={{ backgroundColor: `${SKY}18` }}
          >
            <LogIn size={36} style={{ color: SKY }} />
          </div>
          <h1
            className="text-2xl font-display font-bold mb-2"
            style={{ color: SKY }}
          >
            Admin Access Required
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign in with Internet Identity to access the admin panel.
          </p>
          <Button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full h-12 font-bold text-base gap-2"
            style={{
              background: `linear-gradient(135deg, ${ORANGE}, oklch(0.78 0.17 55))`,
              color: "#FFFFFF",
            }}
            data-ocid="admin.login.primary_button"
          >
            {isLoggingIn ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            {isLoggingIn ? "Authenticating..." : "Login with Internet Identity"}
          </Button>
          <div className="mt-6">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F5F7FA" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 border-r min-h-screen"
        style={{ backgroundColor: "#F8FAFC", borderColor: "#E5E7EB" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "#E5E7EB" }}>
          <Link to="/">
            <img
              src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
              alt="Truptar Logistics"
              className="h-10 w-auto"
            />
          </Link>
          <p
            className="text-xs font-bold mt-3 tracking-widest"
            style={{ color: ORANGE }}
          >
            ADMIN PANEL
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {TAB_CONFIG.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`admin.${tab.id}.tab`}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeTab === tab.id ? `${SKY}18` : "transparent",
                color: activeTab === tab.id ? "#FFFFFF" : "#D1D5DB",
                borderLeft:
                  activeTab === tab.id
                    ? "3px solid #F47C20"
                    : "3px solid transparent",
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "#E5E7EB" }}>
          {identity && (
            <p className="text-xs text-muted-foreground px-4 mb-2 truncate">
              {identity.getPrincipal().toString().substring(0, 20)}...
            </p>
          )}
          <button
            type="button"
            onClick={() => clear()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            data-ocid="admin.logout_button"
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
          style={{ backgroundColor: "#F8FAFC", borderColor: "#E5E7EB" }}
        >
          <span
            className="font-display font-bold text-sm"
            style={{ color: ORANGE }}
          >
            ADMIN PANEL
          </span>
          <div className="flex gap-1 overflow-x-auto">
            {TAB_CONFIG.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="p-2 rounded-lg"
                data-ocid={`admin.mobile.${tab.id}.tab`}
                style={{
                  color: activeTab === tab.id ? "#FFFFFF" : "#D1D5DB",
                  backgroundColor:
                    activeTab === tab.id ? `${SKY}18` : "transparent",
                }}
              >
                <tab.icon size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className="text-3xl font-display font-bold"
                style={{ color: SKY }}
              >
                {TAB_CONFIG.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage your logistics operations
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="gap-2"
              style={{ borderColor: `${SKY}44`, color: SKY }}
              data-ocid="admin.refresh_button"
            >
              <RefreshCw size={14} /> Refresh
            </Button>
          </div>

          {/* ── Dashboard ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Total Orders"
                  value={stats.total}
                  color={SKY}
                  gradient={"#FFFFFF"}
                  icon={Package}
                />
                <StatCard
                  label="Processing"
                  value={stats.processing}
                  color={ORANGE}
                  gradient={"#FFFFFF"}
                  icon={RefreshCw}
                />
                <StatCard
                  label="In Transit"
                  value={stats.inTransit}
                  color={LIGHT_BLUE}
                  gradient={"#FFFFFF"}
                  icon={Truck}
                />
                <StatCard
                  label="Delivered"
                  value={stats.delivered}
                  color="oklch(0.78 0.17 55)"
                  gradient={"#FFFFFF"}
                  icon={CheckCircle2}
                />
              </div>

              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.dashboard.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "#E5E7EB" }}
                >
                  <div
                    className="px-6 py-4 border-b"
                    style={{
                      backgroundColor: "#F8FAFC",
                      borderColor: "#E5E7EB",
                    }}
                  >
                    <h2
                      className="font-display font-semibold"
                      style={{ color: SKY }}
                    >
                      Recent Orders
                    </h2>
                  </div>
                  <Table>
                    <TableHeader style={{ backgroundColor: "#F8FAFC" }}>
                      <TableRow style={{ borderColor: "#E5E7EB" }}>
                        <TableHead className="text-muted-foreground">
                          Order ID
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Sender
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Receiver
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order, i) => (
                        <TableRow
                          key={order.id}
                          data-ocid={`admin.dashboard.orders.row.${i + 1}`}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#E5E7EB",
                          }}
                        >
                          <TableCell
                            className="font-mono text-xs"
                            style={{ color: SKY }}
                          >
                            {order.id}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.sender.name}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.receiver.name}
                          </TableCell>
                          <TableCell>
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${ORANGE}22`,
                                color: ORANGE,
                              }}
                            >
                              {getStatusDisplay(order.status)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {orders.length === 0 && (
                    <div
                      className="py-12 text-center text-muted-foreground"
                      data-ocid="admin.orders.empty_state"
                    >
                      <Package size={36} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No orders yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Orders ── */}
          {activeTab === "orders" && (
            <div>
              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.orders.loading_state"
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "#E5E7EB" }}
                  data-ocid="admin.orders.table"
                >
                  <Table>
                    <TableHeader style={{ backgroundColor: "#F8FAFC" }}>
                      <TableRow style={{ borderColor: "#E5E7EB" }}>
                        <TableHead className="text-muted-foreground">
                          Order ID
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Sender
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Receiver
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Status
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Route
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <TableRow
                          key={order.id}
                          data-ocid={`admin.orders.row.${i + 1}`}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderColor: "#E5E7EB",
                          }}
                        >
                          <TableCell
                            className="font-mono text-xs"
                            style={{ color: SKY }}
                          >
                            {order.id}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.sender.name}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.receiver.name}
                          </TableCell>
                          <TableCell>
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${ORANGE}22`,
                                color: ORANGE,
                              }}
                            >
                              {getStatusDisplay(order.status)}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {order.sender.city} → {order.receiver.city}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {orders.length === 0 && (
                    <div
                      className="py-12 text-center text-muted-foreground"
                      data-ocid="admin.orders.empty_state"
                    >
                      <Package size={36} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No orders yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Tracking Control ── */}
          {activeTab === "tracking" && (
            <div className="space-y-4">
              <div
                className="rounded-xl border p-4 mb-6"
                style={{
                  backgroundColor: `${SKY}0a`,
                  borderColor: `${SKY}33`,
                }}
              >
                <p className="text-sm text-foreground/80">
                  <span className="font-bold" style={{ color: ORANGE }}>
                    Tracking Control:
                  </span>{" "}
                  Click the status buttons on each order to update its delivery
                  status. Changes are saved instantly and reflected in the
                  customer dashboard in real time.
                </p>
              </div>

              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.tracking.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div
                  className="rounded-xl border p-16 text-center"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                  data-ocid="admin.tracking.empty_state"
                >
                  <Truck
                    size={48}
                    style={{ color: `${SKY}55`, margin: "0 auto 16px" }}
                  />
                  <p className="font-semibold mb-1" style={{ color: SKY }}>
                    No active orders
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Orders from users will appear here for tracking updates
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <TrackingRow
                      key={order.id}
                      order={order}
                      onUpdate={handleStatusUpdate}
                      isUpdating={isUpdating}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Payments ── */}
          {activeTab === "payments" && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
            >
              <CreditCard
                size={48}
                style={{ color: `${SKY}66`, margin: "0 auto 16px" }}
              />
              <p
                className="font-display font-semibold mb-2"
                style={{ color: SKY }}
              >
                Payments Management
              </p>
              <p className="text-sm text-muted-foreground">
                Payment confirmation and history — coming soon.
              </p>
            </div>
          )}

          {/* ── Users ── */}
          {activeTab === "users" && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
            >
              <Users
                size={48}
                style={{ color: `${ORANGE}66`, margin: "0 auto 16px" }}
              />
              <p
                className="font-display font-semibold mb-2"
                style={{ color: ORANGE }}
              >
                User Management
              </p>
              <p className="text-sm text-muted-foreground">
                View and manage registered users — coming soon.
              </p>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeTab === "notifications" && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
            >
              <Bell
                size={48}
                style={{ color: `${LIGHT_BLUE}66`, margin: "0 auto 16px" }}
              />
              <p
                className="font-display font-semibold mb-2"
                style={{ color: LIGHT_BLUE }}
              >
                Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Customer notification history and settings — coming soon.
              </p>
            </div>
          )}

          {/* ── Service Requests ── */}
          {activeTab === "service-requests" && (
            <div className="space-y-6">
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: `${ORANGE}0a`,
                  borderColor: `${ORANGE}33`,
                }}
              >
                <p className="text-sm" style={{ color: ORANGE }}>
                  <span className="font-bold">Service Requests</span> — All
                  service requests submitted by users appear here in real time.
                  These include Warehousing, Express Parcel, E-commerce,
                  Corporate Logistics, Heavy Equipment, Customs Clearance,
                  Door-to-Door, and Special Requests.
                </p>
              </div>

              {srLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.service_requests.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : serviceRequests.length === 0 ? (
                <div
                  className="rounded-xl border p-16 text-center"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" }}
                  data-ocid="admin.service_requests.empty_state"
                >
                  <Briefcase
                    size={48}
                    style={{ color: `${ORANGE}55`, margin: "0 auto 16px" }}
                  />
                  <p className="font-semibold mb-1" style={{ color: ORANGE }}>
                    No service requests yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    When users submit service request forms, they will appear
                    here instantly.
                  </p>
                </div>
              ) : (
                <div
                  className="space-y-4"
                  data-ocid="admin.service_requests.list"
                >
                  {serviceRequests.map((req, i) => {
                    let parsedData: Record<string, string> = {};
                    try {
                      parsedData = JSON.parse(req.data);
                    } catch {
                      // ignore
                    }
                    return (
                      <div
                        key={req.id}
                        className="rounded-xl border p-5"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderColor: "#E5E7EB",
                        }}
                        data-ocid={`admin.service_requests.item.${i + 1}`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <span
                              className="text-xs font-bold px-2.5 py-1 rounded-full"
                              style={{
                                backgroundColor: `${ORANGE}22`,
                                color: ORANGE,
                              }}
                            >
                              {req.serviceType}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground flex-shrink-0">
                            {new Date(req.submittedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                        {Object.keys(parsedData).length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {Object.entries(parsedData).map(([key, val]) => (
                              <div key={key}>
                                <p
                                  className="text-xs font-medium mb-0.5"
                                  style={{ color: SKY }}
                                >
                                  {key
                                    .replace(/([A-Z])/g, " $1")
                                    .replace(/^./, (s) => s.toUpperCase())}
                                </p>
                                <p className="text-sm text-foreground/90">
                                  {String(val)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
