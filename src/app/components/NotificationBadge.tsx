import { motion } from "motion/react";

interface NotificationBadgeProps {
  count: number;
  size?: "sm" | "md" | "lg";
}

export function NotificationBadge({ count, size = "md" }: NotificationBadgeProps) {
  if (count === 0) return null;

  const sizeClasses = {
    sm: "w-4 h-4 text-[10px]",
    md: "w-5 h-5 text-xs",
    lg: "w-6 h-6 text-sm",
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={`${sizeClasses[size]} bg-[var(--chat-green)] rounded-full flex items-center justify-center text-white font-semibold`}
    >
      {count > 9 ? "9+" : count}
    </motion.div>
  );
}
