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
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSubmitServiceRequest } from "../../hooks/useQueries";

export default function EcommerceFulfillmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: submitServiceRequest } = useSubmitServiceRequest();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitServiceRequest({
        id: Date.now().toString(),
        serviceType: "EcommerceFulfillment",
        data: JSON.stringify({
          serviceType: "EcommerceFulfillment",
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
      "Fulfillment setup request received! Our team will reach out to onboard you.",
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
            <ShoppingCart size={24} style={{ color: "#1B2A6B" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              E-commerce Fulfillment
            </h1>
            <p className="text-sm text-muted-foreground">
              End-to-end order fulfillment for online stores
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
              Request Received!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Our fulfillment team will contact you to begin onboarding.
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
                  placeholder="Your store name"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>E-commerce Platform</Label>
                <Select required>
                  <SelectTrigger
                    className="bg-muted border-border h-10"
                    data-ocid="ecommerce.platform.select"
                  >
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shopify">Shopify</SelectItem>
                    <SelectItem value="woocommerce">WooCommerce</SelectItem>
                    <SelectItem value="jumia">Jumia</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Monthly Orders Volume</Label>
                <Select required>
                  <SelectTrigger
                    className="bg-muted border-border h-10"
                    data-ocid="ecommerce.volume.select"
                  >
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1–50 orders</SelectItem>
                    <SelectItem value="51-200">51–200 orders</SelectItem>
                    <SelectItem value="201-1000">201–1000 orders</SelectItem>
                    <SelectItem value="1000+">1000+ orders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Storage Needed?</Label>
                <Select required>
                  <SelectTrigger className="bg-muted border-border h-10">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, I need warehousing</SelectItem>
                    <SelectItem value="no">No, drop-shipping only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Delivery Regions</Label>
                <Input
                  placeholder="e.g. Lagos, Abuja, Port Harcourt"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="ecommerce.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "#FFFFFF",
                }}
              >
                Request Fulfillment Setup
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
