import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 flex items-center gap-3 bg-[var(--chat-primary)] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[var(--chat-primary-hover)] transition-colors group"
      style={{ boxShadow: "var(--chat-shadow-lg)" }}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-medium">Чат с поддержкой</span>

      {/* Notification badge with pulse animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--chat-green)] rounded-full border-2 border-white"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[var(--chat-green)]"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      </motion.div>
    </motion.button>
  );
}
