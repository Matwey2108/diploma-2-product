import { Send, Paperclip, Smile, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileAttach?: (file: File) => void;
  disabled?: boolean;
}

const EMOJI_LIST = [
  "😊","😂","❤️","👍","🙏","😍","🎉","✅","🔥","💯",
  "😢","😎","🤔","👋","💪","🚀","⭐","💬","🛒","📦",
];

export function ChatInput({ onSend, onFileAttach, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || attachedFile) && !disabled) {
      if (attachedFile && onFileAttach) onFileAttach(attachedFile);
      if (message.trim()) onSend(message.trim());
      else if (attachedFile) onSend(`📎 Файл: ${attachedFile.name}`);
      setMessage("");
      setAttachedFile(null);
    }
  };

  const handleEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmoji(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
    e.target.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[var(--chat-gray-200)] bg-white px-4 py-3">
      {/* Attached file preview */}
      <AnimatePresence>
        {attachedFile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-2 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2"
          >
            <Paperclip className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="text-xs text-blue-700 truncate flex-1">{attachedFile.name}</span>
            <button
              type="button"
              onClick={() => setAttachedFile(null)}
              className="text-blue-400 hover:text-blue-600"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emoji picker */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-2 bg-white border border-[var(--chat-gray-200)] rounded-2xl p-3 shadow-lg grid grid-cols-10 gap-1"
          >
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleEmoji(emoji)}
                className="text-xl hover:bg-[var(--chat-gray-100)] rounded-lg p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-2">
        {/* File attach */}
        <input ref={fileRef} type="file" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={`flex-shrink-0 w-9 h-9 rounded-full hover:bg-[var(--chat-gray-100)] flex items-center justify-center transition-colors ${
            attachedFile ? "text-[var(--chat-primary)]" : "text-[var(--chat-gray-500)]"
          }`}
          title="Прикрепить файл"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <div className="flex-1 bg-[var(--chat-gray-100)] rounded-2xl px-4 py-2.5 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            disabled={disabled}
            className="flex-1 bg-transparent border-none outline-none text-[var(--chat-gray-900)] placeholder:text-[var(--chat-gray-400)]"
          />
          <button
            type="button"
            onClick={() => setShowEmoji((v) => !v)}
            className={`flex-shrink-0 transition-colors ${
              showEmoji ? "text-[var(--chat-primary)]" : "text-[var(--chat-gray-500)] hover:text-[var(--chat-gray-700)]"
            }`}
            title="Эмодзи"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        <motion.button
          type="submit"
          disabled={(!message.trim() && !attachedFile) || disabled}
          whileHover={{ scale: message.trim() || attachedFile ? 1.05 : 1 }}
          whileTap={{ scale: message.trim() || attachedFile ? 0.95 : 1 }}
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            message.trim() || attachedFile
              ? "bg-[var(--chat-primary)] text-white hover:bg-[var(--chat-primary-hover)]"
              : "bg-[var(--chat-gray-200)] text-[var(--chat-gray-400)] cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
}
