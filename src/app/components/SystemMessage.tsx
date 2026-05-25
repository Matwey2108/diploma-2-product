import { motion } from "motion/react";
import { Info } from "lucide-react";

interface SystemMessageProps {
  message: string;
}

export function SystemMessage({ message }: SystemMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center mb-4"
    >
      <div className="bg-[var(--chat-gray-200)] px-4 py-2 rounded-full flex items-center gap-2 text-xs text-[var(--chat-gray-600)]">
        <Info className="w-3.5 h-3.5" />
        <span>{message}</span>
      </div>
    </motion.div>
  );
}
