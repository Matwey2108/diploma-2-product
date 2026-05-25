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
      className="fixed bottom-6 right-6 flex items-center gap-3 text-white px-5 py-3.5 rounded-full transition-colors"
      style={{
        background: "#1A56A7",
        boxShadow: "0 8px 24px rgba(26,86,167,0.45)",
      }}
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium text-sm">Задать вопрос</span>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
        style={{ background: "#34D399" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "#34D399" }}
          animate={{ scale: [1, 1.8, 1.8], opacity: [0.8, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        />
      </motion.div>
    </motion.button>
  );
}
