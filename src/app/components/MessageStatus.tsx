import { Check, CheckCheck } from "lucide-react";

interface MessageStatusProps {
  status: "sending" | "sent" | "delivered" | "read";
}

export function MessageStatus({ status }: MessageStatusProps) {
  if (status === "sending") {
    return (
      <div className="w-3 h-3 rounded-full border-2 border-[var(--chat-gray-400)] border-t-transparent animate-spin" />
    );
  }

  if (status === "sent") {
    return <Check className="w-3.5 h-3.5 text-[var(--chat-gray-400)]" />;
  }

  if (status === "delivered" || status === "read") {
    return (
      <CheckCheck
        className={`w-3.5 h-3.5 ${
          status === "read" ? "text-[var(--chat-primary)]" : "text-[var(--chat-gray-400)]"
        }`}
      />
    );
  }

  return null;
}
