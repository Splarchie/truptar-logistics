import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  Bitcoin,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  Hash,
  Smartphone,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type PaymentMethod = "bank" | "crypto" | "card" | "mobile";

interface PendingOrder {
  orderNumber: string;
  [key: string]: any;
}

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: "bank", label: "Bank Transfer", icon: <Banknote size={20} /> },
  { id: "crypto", label: "Crypto Wallet", icon: <Wallet size={20} /> },
  { id: "card", label: "Card Payment", icon: <CreditCard size={20} /> },
  { id: "mobile", label: "Mobile Money", icon: <Smartphone size={20} /> },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
      style={{
        backgroundColor: copied
          ? "oklch(0.75 0.20 145 / 0.2)"
          : "oklch(0.72 0.19 205 / 0.15)",
        color: copied ? "oklch(0.75 0.15 200)" : "oklch(0.68 0.16 215)",
        border: `1px solid ${copied ? "oklch(0.75 0.20 145 / 0.4)" : "oklch(0.72 0.19 205 / 0.4)"}`,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function DetailRow({
  label,
  value,
  copyable = false,
}: { label: string; value: string; copyable?: boolean }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 py-2.5 border-b last:border-0"
      style={{ borderColor: "#E5E7EB" }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wider w-36 shrink-0"
        style={{ color: "oklch(0.62 0.06 215)" }}
      >
        {label}
      </span>
      <div className="flex items-center justify-between gap-2 flex-1">
        <span className="font-mono text-sm text-foreground break-all">
          {value}
        </span>
        {copyable && <CopyButton text={value} />}
      </div>
    </div>
  );
}

function BankDetails() {
  return (
    <div className="space-y-6">
      {/* USD Account */}
      <div
        className="rounded-xl p-5"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: "oklch(0.80 0.17 68 / 0.15)",
              color: "#F47C20",
            }}
          >
            USD
          </div>
          <span className="text-sm font-semibold text-foreground">
            Lead Bank — United States
          </span>
        </div>
        <DetailRow label="Account Holder" value="Juventus Sopuluchukwu Ikeh" />
        <DetailRow label="Account Number" value="217413061322" copyable />
        <DetailRow label="Wire Routing" value="101019644" copyable />
        <DetailRow label="ACH Routing" value="101019644" copyable />
        <DetailRow label="Account Type" value="Checking" />
        <DetailRow label="Bank Name" value="Lead Bank" />
        <DetailRow
          label="Bank Address"
          value="1801 Main St., Kansas City, MO 64108"
        />
      </div>

      {/* GBP/EUR Account */}
      <div
        className="rounded-xl p-5"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: "oklch(0.75 0.20 145 / 0.15)",
              color: "#0EA5E9",
            }}
          >
            GBP / EUR
          </div>
          <span className="text-sm font-semibold text-foreground">
            Clear Junction Limited — United Kingdom
          </span>
        </div>
        <DetailRow label="Account Holder" value="Juventus Sopuluchukwu Ikeh" />
        <DetailRow label="Account Number" value="69524734" copyable />
        <DetailRow label="IBAN" value="GB28CLJU04130769524734" copyable />
        <DetailRow label="Sort Code" value="041307" copyable />
        <DetailRow label="Swift Code" value="CLJUGB21XXX" copyable />
        <DetailRow label="Bank Name" value="Clear Junction Limited" />
        <DetailRow
          label="Bank Address"
          value="4th Floor Imperial House, 15 Kingsway, London, WC2B 6UN"
        />
      </div>
    </div>
  );
}

function CryptoDetails() {
  const wallets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      address: "bc1pnzrx7mvcvfw5z2td2sm0jap5aeljprkxv3ellwjh8uy0e43t78msrc53cg",
      color: "#F47C20",
      bg: "oklch(0.80 0.17 68 / 0.12)",
    },
    {
      symbol: "USDT",
      name: "Tether (ERC-20)",
      address: "0x6c557Fceb0Cec257E37Fc44a55680DC3A3E14ABB",
      color: "#0EA5E9",
      bg: "oklch(0.75 0.20 145 / 0.12)",
    },
    {
      symbol: "BNB",
      name: "BNB Smart Chain",
      address: "0x6c557Fceb0Cec257E37Fc44a55680DC3A3E14ABB",
      color: "#1B2A6B",
      bg: "oklch(0.72 0.19 205 / 0.12)",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Send crypto to the address below. Double-check before sending — crypto
        transactions are irreversible.
      </p>
      {wallets.map((w) => (
        <div
          key={w.symbol}
          className="rounded-xl p-5 border"
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#E5E7EB",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: w.bg }}>
              <Bitcoin size={16} style={{ color: w.color }} />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ color: w.color }}>
                {w.symbol}
              </p>
              <p className="text-xs text-muted-foreground">{w.name}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <code className="flex-1 text-xs font-mono text-foreground/90 break-all leading-relaxed bg-background/50 rounded-lg p-3">
              {w.address}
            </code>
            <CopyButton text={w.address} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CardDetails() {
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid oklch(0.72 0.19 205 / 0.3)",
      }}
    >
      <div
        className="inline-flex p-4 rounded-full mb-4"
        style={{ backgroundColor: "oklch(0.72 0.19 205 / 0.12)" }}
      >
        <CreditCard size={32} style={{ color: "#1B2A6B" }} />
      </div>
      <h3 className="font-display font-bold text-foreground mb-2">
        Pay Securely by Card
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        Pay using Visa, Mastercard, or American Express via our secure payment
        portal.
      </p>
      <a
        href="https://buy.stripe.com/test_placeholder"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className="gap-2 font-bold"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.16 215), oklch(0.75 0.15 200))",
            color: "#FFFFFF",
          }}
          data-ocid="payment.card_pay_button"
        >
          Pay by Card <ExternalLink size={14} />
        </Button>
      </a>
      <p className="text-xs text-muted-foreground mt-4">
        Accepted: Visa · Mastercard · American Express
      </p>
    </div>
  );
}

function MobileDetails() {
  return (
    <div
      className="rounded-xl p-5 text-sm"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
      }}
    >
      <p className="text-foreground font-semibold mb-3">
        Send via Mobile Money
      </p>
      <DetailRow label="Phone" value="+234 800 TRUPTAR" />
      <DetailRow label="Network" value="MTN / Airtel / Glo" />
      <p className="text-xs text-muted-foreground mt-3">
        Contact support if you need assistance with mobile payments.
      </p>
    </div>
  );
}

export default function PaymentPage() {
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("bank");
  const [answered, setAnswered] = useState<"yes" | "no" | null>(null);
  const [reference, setReference] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem("truptar_pending_order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!reference.trim()) return;
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="payment.page"
    >
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div
              className="inline-flex p-3 rounded-xl mb-4"
              style={{ backgroundColor: "oklch(0.72 0.19 205 / 0.12)" }}
            >
              <Banknote size={28} style={{ color: "#1B2A6B" }} />
            </div>
            <h1 className="text-3xl font-display font-extrabold text-foreground mb-2">
              Complete Your Logistics Payment
            </h1>
            {order && (
              <div
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "oklch(0.80 0.17 68 / 0.1)",
                  border: "1px solid oklch(0.80 0.17 68 / 0.3)",
                }}
              >
                <Hash size={14} style={{ color: "#F47C20" }} />
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: "#F47C20" }}
                >
                  {order.orderNumber}
                </span>
              </div>
            )}
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              data-ocid="payment.success_state"
              className="rounded-2xl p-10 text-center border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "oklch(0.75 0.20 145 / 0.4)",
                boxShadow: "0 0 50px oklch(0.75 0.20 145 / 0.1)",
              }}
            >
              <div
                className="inline-flex p-5 rounded-full mb-5"
                style={{ backgroundColor: "oklch(0.75 0.20 145 / 0.12)" }}
              >
                <CheckCircle2 size={48} style={{ color: "#0EA5E9" }} />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Payment Submitted!
              </h2>
              <p className="text-muted-foreground mb-2">
                Your payment has been submitted for verification.
              </p>
              <p className="font-semibold mb-6" style={{ color: "#F47C20" }}>
                Your order{" "}
                <span className="font-mono">{order?.orderNumber}</span> is now
                being activated.
              </p>
              <Link to="/dashboard">
                <Button
                  className="gap-2 font-bold"
                  style={{
                    backgroundColor: "oklch(0.68 0.16 215)",
                    color: "white",
                  }}
                >
                  Go to Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Payment Method Selector */}
              <div
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-4">
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      data-ocid={`payment.${m.id}_tab`}
                      onClick={() => {
                        setMethod(m.id);
                        setAnswered(null);
                      }}
                      className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 border cursor-pointer"
                      style={{
                        backgroundColor:
                          method === m.id
                            ? "oklch(0.72 0.19 205 / 0.15)"
                            : "oklch(0.16 0.05 225)",
                        borderColor:
                          method === m.id
                            ? "oklch(0.68 0.16 215)"
                            : "oklch(0.28 0.07 220)",
                        color:
                          method === m.id
                            ? "oklch(0.85 0.15 205)"
                            : "oklch(0.62 0.06 215)",
                      }}
                    >
                      {m.icon}
                      <span className="text-xs font-semibold text-center leading-tight">
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <motion.div
                key={method}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5E7EB",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-4">
                  Payment Instructions
                </h2>
                {method === "bank" && <BankDetails />}
                {method === "crypto" && <CryptoDetails />}
                {method === "card" && <CardDetails />}
                {method === "mobile" && <MobileDetails />}
              </motion.div>

              {/* Payment Confirmation Question */}
              <div
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "oklch(0.72 0.19 205 / 0.35)",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-5 text-center">
                  Have you completed your payment?
                </h2>
                <div className="flex gap-4 justify-center">
                  <Button
                    data-ocid="payment.yes_button"
                    onClick={() => setAnswered("yes")}
                    className="w-28 h-12 font-bold text-base"
                    style={{
                      backgroundColor:
                        answered === "yes"
                          ? "oklch(0.75 0.15 200)"
                          : "oklch(0.75 0.20 145 / 0.15)",
                      color:
                        answered === "yes"
                          ? "oklch(0.14 0.04 225)"
                          : "oklch(0.75 0.15 200)",
                      border: "1px solid oklch(0.75 0.20 145 / 0.5)",
                    }}
                  >
                    YES
                  </Button>
                  <Button
                    data-ocid="payment.no_button"
                    onClick={() => setAnswered("no")}
                    className="w-28 h-12 font-bold text-base"
                    style={{
                      backgroundColor:
                        answered === "no"
                          ? "oklch(0.55 0.22 25)"
                          : "oklch(0.55 0.22 25 / 0.12)",
                      color:
                        answered === "no" ? "white" : "oklch(0.75 0.15 25)",
                      border: "1px solid oklch(0.55 0.22 25 / 0.5)",
                    }}
                  >
                    NO
                  </Button>
                </div>

                {/* Conditional Responses */}
                <AnimatePresence mode="wait">
                  {answered === "no" && (
                    <motion.div
                      key="no"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 overflow-hidden"
                    >
                      <div
                        className="rounded-xl p-4 flex items-start gap-3"
                        style={{
                          backgroundColor: "oklch(0.80 0.17 68 / 0.08)",
                          border: "1px solid oklch(0.80 0.17 68 / 0.35)",
                        }}
                      >
                        <AlertTriangle
                          size={18}
                          className="shrink-0 mt-0.5"
                          style={{ color: "#F47C20" }}
                        />
                        <p className="text-sm" style={{ color: "#F47C20" }}>
                          Please complete your payment to activate your shipment
                          order.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {answered === "yes" && (
                    <motion.div
                      key="yes"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <form onSubmit={handleConfirm} className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-foreground/80">
                            Payment Reference *
                          </Label>
                          <Input
                            data-ocid="payment.reference_input"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            required
                            placeholder="Enter payment reference number"
                            className="bg-muted border-border focus:border-secondary h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-foreground/80">
                            Upload Payment Proof (optional)
                          </Label>
                          <label
                            data-ocid="payment.upload_button"
                            className="rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors block"
                            style={{ borderColor: "#E5E7EB" }}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={(e) =>
                                setProofFile(e.target.files?.[0] ?? null)
                              }
                            />
                            <span
                              className="text-sm"
                              style={{ color: "oklch(0.62 0.06 215)" }}
                            >
                              {proofFile ? (
                                <span style={{ color: "#0EA5E9" }}>
                                  ✓ {proofFile.name}
                                </span>
                              ) : (
                                <span>
                                  Click to upload screenshot or PDF receipt
                                </span>
                              )}
                            </span>
                          </label>
                        </div>
                        <Button
                          type="submit"
                          data-ocid="payment.confirm_button"
                          disabled={!reference.trim()}
                          className="w-full h-12 font-bold tracking-wider gap-2"
                          style={{
                            backgroundColor: "oklch(0.68 0.16 215)",
                            color: "white",
                          }}
                        >
                          <CheckCircle2 size={18} />
                          Confirm Payment
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
