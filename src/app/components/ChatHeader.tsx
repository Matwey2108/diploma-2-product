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
    <div className="px-5 py-4 flex items-center justify-between flex-shrink-0" style={{ background: "#0E3D7A" }}>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base border-2 flex-shrink-0"
          style={{ background: "#1A56A7", borderColor: "rgba(255,255,255,0.2)" }}
        >
          Л
        </div>
        <div>
          <h3 className="font-semibold text-white text-sm leading-tight">Поддержка ЛСПК</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#34D399" }} />
            <span className="text-xs" style={{ color: "#93C5FD" }}>
              Онлайн · Ответим в течение дня
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        {onRate && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onRate}
            title="Оценить чат"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.65)" }}
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
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.65)" }}
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
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            <Minimize2 className="w-4 h-4" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          title="Закрыть"
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
