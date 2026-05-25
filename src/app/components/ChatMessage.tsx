import { motion } from "motion/react";
import { MessageStatus } from "./MessageStatus";
import { Avatar } from "./Avatar";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  time?: string;
  avatar?: string;
  status?: "sending" | "sent" | "delivered" | "read";
}

export function ChatMessage({ message, isUser, time, avatar, status }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2 mb-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && <Avatar fallback="AI" size="md" online />}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[75%]`}>
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isUser
              ? "bg-[var(--chat-primary)] text-white rounded-br-md"
              : "bg-[var(--chat-gray-100)] text-[var(--chat-gray-900)] rounded-bl-md"
          }`}
        >
          <p className="text-[14px] leading-relaxed">{message}</p>
        </div>
        {(time || status) && (
          <div className="flex items-center gap-1 mt-1 px-1">
            {time && (
              <span className="text-xs text-[var(--chat-gray-400)]">{time}</span>
            )}
            {isUser && status && <MessageStatus status={status} />}
          </div>
        )}
      </div>
    </motion.div>
  );
}
