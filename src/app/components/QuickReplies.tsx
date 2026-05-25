import { motion } from "motion/react";

interface QuickRepliesProps {
  options: string[];
  onSelect: (option: string) => void;
}

export function QuickReplies({ options, onSelect }: QuickRepliesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 mb-4"
    >
      {options.map((option, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option)}
          className="px-4 py-2 bg-white border border-[var(--chat-gray-300)] text-[var(--chat-gray-700)] rounded-full text-sm hover:border-[var(--chat-primary)] hover:text-[var(--chat-primary)] transition-colors"
        >
          {option}
        </motion.button>
      ))}
    </motion.div>
  );
}
