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
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSubmitServiceRequest } from "../../hooks/useQueries";

export default function CorporateLogisticsPage() {
  const [form, setForm] = useState({
    companyName: "",
    volume: "",
    deliveryLocations: "",
    monthlyDemand: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync: submitServiceRequest } = useSubmitServiceRequest();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitServiceRequest({
        id: Date.now().toString(),
        serviceType: "CorporateLogistics",
        data: JSON.stringify({
          serviceType: "CorporateLogistics",
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
      "Your corporate logistics enquiry has been received. Our team will contact you within 24 hours.",
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
            <Building2 size={24} style={{ color: "#1B2A6B" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Corporate Logistics
            </h1>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade logistics solutions for businesses
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
              Enquiry Submitted!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Our corporate team will reach out within 24 hours.
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
                <Label>Company Name</Label>
                <Input
                  value={form.companyName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, companyName: e.target.value }))
                  }
                  placeholder="Your company name"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Volume of Shipments (per month)</Label>
                <Select
                  onValueChange={(v) => setForm((p) => ({ ...p, volume: v }))}
                  required
                >
                  <SelectTrigger
                    className="bg-muted border-border h-10"
                    data-ocid="corporate.volume.select"
                  >
                    <SelectValue placeholder="Select shipment volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1–10 shipments</SelectItem>
                    <SelectItem value="11-50">11–50 shipments</SelectItem>
                    <SelectItem value="51-200">51–200 shipments</SelectItem>
                    <SelectItem value="200+">200+ shipments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Delivery Locations</Label>
                <Textarea
                  value={form.deliveryLocations}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      deliveryLocations: e.target.value,
                    }))
                  }
                  placeholder="List cities, regions or countries you deliver to"
                  className="bg-muted border-border focus:border-secondary min-h-[80px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Monthly Logistics Demand</Label>
                <Textarea
                  value={form.monthlyDemand}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, monthlyDemand: e.target.value }))
                  }
                  placeholder="Describe your logistics requirements, special needs, cargo types..."
                  className="bg-muted border-border focus:border-secondary min-h-[100px]"
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="corporate.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "#FFFFFF",
                }}
              >
                Submit Enquiry
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
