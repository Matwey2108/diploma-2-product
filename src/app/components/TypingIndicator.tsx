import { motion } from "motion/react";
import { Avatar } from "./Avatar";

export function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-4">
      <Avatar fallback="AI" size="md" online />

      <div className="bg-[var(--chat-gray-100)] px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[var(--chat-gray-400)] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
