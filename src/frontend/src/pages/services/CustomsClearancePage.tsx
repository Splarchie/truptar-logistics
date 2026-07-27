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
import { ArrowLeft, FileCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSubmitServiceRequest } from "../../hooks/useQueries";
import { WORLD_COUNTRIES } from "../../lib/countries";

export default function CustomsClearancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [docs, setDocs] = useState({
    invoice: false,
    packing: false,
    bol: false,
    coo: false,
  });
  const { mutateAsync: submitServiceRequest } = useSubmitServiceRequest();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await submitServiceRequest({
        id: Date.now().toString(),
        serviceType: "CustomsClearance",
        data: JSON.stringify({
          serviceType: "CustomsClearance",
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
      "Customs clearance request submitted. Our team will review and contact you.",
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
            <FileCheck size={24} style={{ color: "#1B2A6B" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Customs Clearance
            </h1>
            <p className="text-sm text-muted-foreground">
              Hassle-free customs handling for imports & exports
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
              Our customs team will review your request and contact you.
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
                <Label>Shipment Type</Label>
                <Select required>
                  <SelectTrigger
                    className="bg-muted border-border h-10"
                    data-ocid="customs.type.select"
                  >
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="import">Import</SelectItem>
                    <SelectItem value="export">Export</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Country of Origin / Destination</Label>
                <Select required>
                  <SelectTrigger className="bg-muted border-border h-10">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORLD_COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Commodity Type</Label>
                <Input
                  placeholder="e.g. Electronics, Clothing, Machinery"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Estimated Value (USD)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label>Available Documents</Label>
                <div className="space-y-2">
                  {[
                    { id: "invoice", label: "Commercial Invoice" },
                    { id: "packing", label: "Packing List" },
                    { id: "bol", label: "Bill of Lading" },
                    { id: "coo", label: "Certificate of Origin" },
                  ].map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3">
                      <Checkbox
                        id={doc.id}
                        checked={docs[doc.id as keyof typeof docs]}
                        onCheckedChange={(v) =>
                          setDocs((p) => ({ ...p, [doc.id]: !!v }))
                        }
                        data-ocid={`customs.${doc.id}.checkbox`}
                      />
                      <Label
                        htmlFor={doc.id}
                        className="cursor-pointer font-normal"
                      >
                        {doc.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                data-ocid="customs.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "#FFFFFF",
                }}
              >
                Request Clearance
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
