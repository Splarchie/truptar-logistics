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
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Package, Send, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing,
  Variant_cargo_freight_document_parcel,
  Variant_express_priority_standard,
} from "../backend.d";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCreateShippingOrder } from "../hooks/useQueries";
import { WORLD_COUNTRIES } from "../lib/countries";

function generateId() {
  return `TL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

function generateOrderNumber() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `TRUPTAR-LOG-${digits}`;
}

export default function ShippingFormPage() {
  const { mutateAsync: createOrder, isPending } = useCreateShippingOrder();
  const navigate = useNavigate();

  const [sender, setSender] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });
  const [receiver, setReceiver] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [shipment, setShipment] = useState({
    description: "",
    weight: "",
    quantity: "",
    deliveryType: "" as string,
    category: "" as string,
  });

  function updateSender(k: string, v: string) {
    setSender((p) => ({ ...p, [k]: v }));
  }
  function updateReceiver(k: string, v: string) {
    setReceiver((p) => ({ ...p, [k]: v }));
  }
  function updateShipment(k: string, v: string) {
    setShipment((p) => ({ ...p, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = generateId();
    const orderNumber = generateOrderNumber();
    const pendingOrder = {
      orderNumber,
      orderId: id,
      createdAt: new Date().toISOString(),
      sender,
      receiver,
      shipment,
    };
    try {
      await createOrder({
        id,
        status:
          Variant_cancelled_pending_out_for_delivery_in_transit_delivered_processing.pending,
        owner: null as any,
        sender: { ...sender },
        receiver: { ...receiver, email: undefined },
        shipment: {
          description: shipment.description,
          weight: Number.parseFloat(shipment.weight),
          quantity: BigInt(shipment.quantity || "1"),
          deliveryType:
            shipment.deliveryType as Variant_express_priority_standard,
          category: shipment.category as Variant_cargo_freight_document_parcel,
        },
      });
    } catch {
      toast.error("Failed to create order. Please try again.");
      return;
    }
    localStorage.setItem("truptar_pending_order", JSON.stringify(pendingOrder));
    toast.success("Order created! Proceeding to payment...");
    navigate({ to: "/order-summary" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex p-3 rounded-xl mb-5"
              style={{ backgroundColor: "#EEF2FF" }}
            >
              <Package size={32} style={{ color: "#1B2A6B" }} />
            </div>
            <h1 className="text-4xl font-display font-extrabold text-foreground mb-3">
              Create Shipping Order
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to book your freight shipment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sender Details */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "oklch(0.55 0.18 215 / 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#EEF2FF" }}
                >
                  <User size={18} style={{ color: "#1B2A6B" }} />
                </div>
                <h2 className="text-lg font-display font-bold text-foreground">
                  Sender Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Full Name *
                  </Label>
                  <Input
                    value={sender.name}
                    onChange={(e) => updateSender("name", e.target.value)}
                    required
                    placeholder="John Doe"
                    data-ocid="shipping_form.sender_name_input"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Phone Number *
                  </Label>
                  <Input
                    value={sender.phone}
                    onChange={(e) => updateSender("phone", e.target.value)}
                    required
                    placeholder="+234 000 0000 000"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">Email</Label>
                  <Input
                    type="email"
                    value={sender.email}
                    onChange={(e) => updateSender("email", e.target.value)}
                    placeholder="sender@email.com"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Address *
                  </Label>
                  <Input
                    value={sender.address}
                    onChange={(e) => updateSender("address", e.target.value)}
                    required
                    placeholder="123 Shipping Lane"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">City *</Label>
                  <Input
                    value={sender.city}
                    onChange={(e) => updateSender("city", e.target.value)}
                    required
                    placeholder="Lagos"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Country *
                  </Label>
                  <Select
                    onValueChange={(v) => updateSender("country", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "#FFFFFF" }}>
                      {WORLD_COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "oklch(0.82 0.14 42 / 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "oklch(0.82 0.14 42 / 0.12)" }}
                >
                  <User size={18} style={{ color: "#F47C20" }} />
                </div>
                <h2 className="text-lg font-display font-bold text-foreground">
                  Receiver Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Receiver Name *
                  </Label>
                  <Input
                    value={receiver.name}
                    onChange={(e) => updateReceiver("name", e.target.value)}
                    required
                    placeholder="Jane Smith"
                    data-ocid="shipping_form.receiver_name_input"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Receiver Phone *
                  </Label>
                  <Input
                    value={receiver.phone}
                    onChange={(e) => updateReceiver("phone", e.target.value)}
                    required
                    placeholder="+1 000 000 0000"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm text-foreground/80">
                    Receiver Address *
                  </Label>
                  <Input
                    value={receiver.address}
                    onChange={(e) => updateReceiver("address", e.target.value)}
                    required
                    placeholder="456 Delivery Ave"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Destination City *
                  </Label>
                  <Input
                    value={receiver.city}
                    onChange={(e) => updateReceiver("city", e.target.value)}
                    required
                    placeholder="New York"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Destination Country *
                  </Label>
                  <Select
                    onValueChange={(v) => updateReceiver("country", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "#FFFFFF" }}>
                      {WORLD_COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#E5E7EB",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#EEF2FF" }}
                >
                  <Send size={18} style={{ color: "#1B2A6B" }} />
                </div>
                <h2 className="text-lg font-display font-bold text-foreground">
                  Shipment Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm text-foreground/80">
                    Package Description *
                  </Label>
                  <Textarea
                    value={shipment.description}
                    onChange={(e) =>
                      updateShipment("description", e.target.value)
                    }
                    required
                    placeholder="Describe the package contents..."
                    data-ocid="shipping_form.description_input"
                    className="bg-muted border-border focus:border-secondary min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Weight (kg) *
                  </Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={shipment.weight}
                    onChange={(e) => updateShipment("weight", e.target.value)}
                    required
                    placeholder="5.0"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Quantity *
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={shipment.quantity}
                    onChange={(e) => updateShipment("quantity", e.target.value)}
                    required
                    placeholder="1"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Delivery Type *
                  </Label>
                  <Select
                    onValueChange={(v) => updateShipment("deliveryType", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "#FFFFFF" }}>
                      <SelectItem
                        value={Variant_express_priority_standard.standard}
                      >
                        Standard
                      </SelectItem>
                      <SelectItem
                        value={Variant_express_priority_standard.express}
                      >
                        Express
                      </SelectItem>
                      <SelectItem
                        value={Variant_express_priority_standard.priority}
                      >
                        Priority
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Shipment Category *
                  </Label>
                  <Select
                    onValueChange={(v) => updateShipment("category", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: "#FFFFFF" }}>
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.document_}
                      >
                        Document
                      </SelectItem>
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.parcel}
                      >
                        Parcel
                      </SelectItem>
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.cargo}
                      >
                        Cargo
                      </SelectItem>
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.freight}
                      >
                        Freight
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              data-ocid="shipping_form.submit_button"
              className="w-full h-14 font-bold text-base tracking-widest gap-3"
              style={{
                backgroundColor: "oklch(0.72 0.19 42)",
                color: "#FFFFFF",
              }}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Package size={20} />
              )}
              CREATE SHIPPING ORDER
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
