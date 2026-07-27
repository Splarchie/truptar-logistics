import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Mail, MessageSquare, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const CHANNELS = [
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us a detailed message and we'll get back within 24 hours.",
    action: "Send Email",
    info: "support@truptar.com",
    onClick: () => {
      window.location.href = "mailto:support@truptar.com";
    },
  },
  {
    icon: Phone,
    title: "WhatsApp",
    desc: "Chat with our support team directly on WhatsApp for quick responses.",
    action: "Open WhatsApp",
    info: "+1 234 567 8900",
    onClick: () => {
      window.open("https://wa.me/12345678900", "_blank");
    },
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    desc: "Connect instantly with a support agent for real-time assistance.",
    action: "Start Chat",
    info: "Available 9am – 6pm",
    onClick: () => {
      toast.info("Live chat coming soon");
    },
  },
];

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Support ticket submitted successfully!");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-16 px-4 overflow-hidden"
        style={{
          background: "#F5F7FA",
        }}
      >
        <div className="relative max-w-3xl mx-auto text-center">
          <p
            className="text-xs font-bold tracking-widest mb-4"
            style={{ color: "#1B2A6B" }}
          >
            CUSTOMER SUPPORT
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-foreground mb-4">
            How Can We <span style={{ color: "#F47C20" }}>Help?</span>
          </h1>
          <p className="text-muted-foreground">
            Open a ticket or reach out via your preferred channel. Our team is
            here to help.
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {CHANNELS.map((ch, i) => (
              <motion.div
                key={ch.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-6 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
              >
                <div
                  className="inline-flex p-3 rounded-xl mb-4"
                  style={{ backgroundColor: "#EEF2FF" }}
                >
                  <ch.icon size={22} style={{ color: "#1B2A6B" }} />
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-1">
                  {ch.title}
                </h3>
                <p className="text-xs mb-1" style={{ color: "#F47C20" }}>
                  {ch.info}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {ch.desc}
                </p>
                <Button
                  size="sm"
                  onClick={ch.onClick}
                  className="w-full font-semibold"
                  style={{
                    backgroundColor: "oklch(0.68 0.16 215)",
                    color: "#fff",
                  }}
                >
                  {ch.action}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-foreground mb-8 text-center">
              Submit a Support Ticket
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                data-ocid="support.form.success_state"
                className="rounded-2xl p-10 border text-center"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C7D2FE",
                }}
              >
                <CheckCircle2
                  size={48}
                  className="mx-auto mb-4"
                  style={{ color: "oklch(0.65 0.18 160)" }}
                />
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Ticket Submitted!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Our support team will review your request and get back to you
                  within 24 hours.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setSubject("");
                    setOrderNum("");
                    setMessage("");
                  }}
                  style={{
                    backgroundColor: "oklch(0.72 0.19 42)",
                    color: "#FFFFFF",
                  }}
                >
                  Submit Another Ticket
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 border space-y-5"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
              >
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs font-semibold">
                    Subject <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    data-ocid="support.subject.input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Delayed shipment inquiry"
                    required
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs font-semibold">
                    Order Number{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    data-ocid="support.ordernumber.input"
                    value={orderNum}
                    onChange={(e) => setOrderNum(e.target.value)}
                    placeholder="e.g. TRUPTAR-LOG-928372"
                    className="bg-input border-border"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground text-xs font-semibold">
                    Message <span className="text-red-400">*</span>
                  </Label>
                  <Textarea
                    data-ocid="support.message.textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    required
                    className="bg-input border-border resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="support.form.submit_button"
                  disabled={loading}
                  className="w-full font-bold h-11"
                  style={{
                    backgroundColor: "oklch(0.72 0.19 42)",
                    color: "#FFFFFF",
                  }}
                >
                  {loading ? "Submitting..." : "Submit Ticket"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
