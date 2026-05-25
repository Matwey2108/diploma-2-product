import { X, Minimize2, Star, Trash2 } from "lucide-react";
import { motion } from "motion/react";

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize?: () => void;
  onRate?: () => void;
  onClear?: () => void;
}

export function ChatHeader({ onClose, onMinimize, onRate, onClear }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-[var(--chat-gray-200)] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--chat-primary)] flex items-center justify-center text-white font-semibold text-lg">
          S
        </div>
        <div>
          <h3 className="font-semibold text-[var(--chat-gray-900)]">Поддержка</h3>
          <div className="flex items-center gap-1.5 text-xs text-[var(--chat-gray-600)]">
            <div className="w-2 h-2 rounded-full bg-[var(--chat-green)]" />
            <span>Мы онлайн • Ответим за 30 секунд</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onRate && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRate}
            title="Оценить чат"
            className="w-8 h-8 rounded-full hover:bg-[var(--chat-gray-100)] flex items-center justify-center text-[var(--chat-gray-500)] transition-colors"
          >
            <Star className="w-4 h-4" />
          </motion.button>
        )}
        {onClear && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClear}
            title="Очистить чат"
            className="w-8 h-8 rounded-full hover:bg-[var(--chat-gray-100)] flex items-center justify-center text-[var(--chat-gray-500)] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        )}
        {onMinimize && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMinimize}
            title="Свернуть"
            className="w-8 h-8 rounded-full hover:bg-[var(--chat-gray-100)] flex items-center justify-center text-[var(--chat-gray-500)] transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          title="Закрыть"
          className="w-8 h-8 rounded-full hover:bg-[var(--chat-gray-100)] flex items-center justify-center text-[var(--chat-gray-500)] transition-colors"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
