import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Warehouse } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSubmitServiceRequest } from "../../hooks/useQueries";

export default function WarehousingPage() {
  const [form, setForm] = useState({
    businessName: "",
    storageType: "",
    duration: "",
    quantity: "",
    pickupRequest: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync: submitServiceRequest } = useSubmitServiceRequest();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitServiceRequest({
        id: Date.now().toString(),
        serviceType: "WarehousingStorage",
        data: JSON.stringify({
          serviceType: "WarehousingStorage",
          submittedAt: new Date().toISOString(),
        }),
        submittedAt: new Date().toISOString(),
        submittedBy: null as any,
      });
    } catch {
      toast.error("Failed to submit request. Please try again.");
      return;
    }
    setSubmitted(true);
    toast.success(
      "Your warehousing request has been submitted. Our team will contact you shortly.",
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: "#EEF2FF" }}
          >
            <Warehouse size={24} style={{ color: "#1B2A6B" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Warehousing & Storage
            </h1>
            <p className="text-sm text-muted-foreground">
              Secure storage facilities for business inventory
            </p>
          </div>
        </div>
        {submitted ? (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "oklch(0.65 0.15 200 / 0.4)",
            }}
          >
            <p className="text-lg font-semibold text-foreground mb-2">
              Request Submitted!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Our team will contact you shortly with storage options.
            </p>
            <Link to="/">
              <Button
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "#FFFFFF",
                }}
              >
                Back to Home
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className="rounded-xl border p-6 sm:p-8"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input
                  value={form.businessName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, businessName: e.target.value }))
                  }
                  placeholder="Your company name"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Storage Type</Label>
                <Select
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, storageType: v }))
                  }
                  required
                >
                  <SelectTrigger
                    className="bg-muted border-border h-10"
                    data-ocid="warehousing.storage_type.select"
                  >
                    <SelectValue placeholder="Select storage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="climate">Climate-Controlled</SelectItem>
                    <SelectItem value="hazardous">
                      Hazardous Materials
                    </SelectItem>
                    <SelectItem value="bonded">Bonded Warehouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select
                  onValueChange={(v) => setForm((p) => ({ ...p, duration: v }))}
                  required
                >
                  <SelectTrigger
                    className="bg-muted border-border h-10"
                    data-ocid="warehousing.duration.select"
                  >
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1week">1 Week</SelectItem>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantity / Volume</Label>
                <Input
                  value={form.quantity}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, quantity: e.target.value }))
                  }
                  placeholder="e.g. 500 pallets or 1000 sqft"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="pickup"
                  checked={form.pickupRequest}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, pickupRequest: !!v }))
                  }
                  data-ocid="warehousing.pickup.checkbox"
                />
                <Label htmlFor="pickup" className="cursor-pointer">
                  I need a pickup request (Truptar collects from my location)
                </Label>
              </div>
              <Button
                type="submit"
                data-ocid="warehousing.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "#FFFFFF",
                }}
              >
                Request Service
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
