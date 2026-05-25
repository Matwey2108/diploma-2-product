import { motion } from "motion/react";
import { MessageCircle, X } from "lucide-react";

interface MinimizedChatProps {
  onClick: () => void;
  onClose: () => void;
  unreadCount?: number;
}

export function MinimizedChat({ onClick, onClose, unreadCount = 0 }: MinimizedChatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
      style={{ boxShadow: "var(--chat-shadow-lg)" }}
    >
      <div onClick={onClick} className="px-6 py-4 flex items-center gap-3 pr-12">
        <div className="w-10 h-10 rounded-full bg-[var(--chat-primary)] flex items-center justify-center text-white relative">
          <MessageCircle className="w-5 h-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--chat-green)] rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white">
              {unreadCount}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-[var(--chat-gray-900)] text-sm">
            Поддержка
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-[var(--chat-gray-600)]">
            <div className="w-2 h-2 rounded-full bg-[var(--chat-green)]" />
            <span>Онлайн</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 w-6 h-6 rounded-full hover:bg-[var(--chat-gray-100)] flex items-center justify-center text-[var(--chat-gray-500)] transition-colors"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
