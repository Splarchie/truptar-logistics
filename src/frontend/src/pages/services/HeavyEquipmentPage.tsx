import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Construction } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSubmitServiceRequest } from "../../hooks/useQueries";

export default function HeavyEquipmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutateAsync: submitServiceRequest } = useSubmitServiceRequest();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitServiceRequest({
        id: Date.now().toString(),
        serviceType: "HeavyEquipmentTransport",
        data: JSON.stringify({
          serviceType: "HeavyEquipmentTransport",
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
      "Heavy equipment transport request submitted. Our specialist team will contact you.",
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
            <Construction size={24} style={{ color: "#1B2A6B" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Heavy Equipment Transport
            </h1>
            <p className="text-sm text-muted-foreground">
              Safe transportation for heavy-load cargo
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
              Our heavy transport specialist will contact you shortly.
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
                <Label>Equipment Type</Label>
                <Input
                  placeholder="e.g. Excavator, Generator, Industrial Machine"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Weight (tons)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 15"
                    className="bg-muted border-border focus:border-secondary h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dimensions (L x W x H)</Label>
                  <Input
                    placeholder="e.g. 10m x 3m x 4m"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Pickup Location</Label>
                <Input
                  placeholder="Full address or city"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Delivery Location</Label>
                <Input
                  placeholder="Full address or city"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Special Requirements</Label>
                <Textarea
                  placeholder="Any special handling, permits, or escort requirements..."
                  className="bg-muted border-border focus:border-secondary min-h-[80px]"
                />
              </div>
              <Button
                type="submit"
                data-ocid="heavy.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "#FFFFFF",
                }}
              >
                Request Transport
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
