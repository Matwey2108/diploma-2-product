import { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  time?: string;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
  showQuickReplies?: boolean;
  quickReplies?: string[];
  onQuickReply?: (reply: string) => void;
}

export function ChatMessages({
  messages,
  isTyping,
  showQuickReplies,
  quickReplies,
  onQuickReply,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 bg-[var(--chat-gray-50)]">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message.text}
          isUser={message.isUser}
          time={message.time}
          status={message.status}
        />
      ))}

      {isTyping && <TypingIndicator />}

      {showQuickReplies && quickReplies && onQuickReply && (
        <QuickReplies options={quickReplies} onSelect={onQuickReply} />
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
