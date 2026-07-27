import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Processing",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  in_transit: {
    label: "In Transit",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/20 text-red-400 border-red-500/30",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
