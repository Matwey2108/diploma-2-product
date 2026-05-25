import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Star, X } from "lucide-react";

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

export function RatingModal({ isOpen, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    onSubmit(rating, comment);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setRating(0);
      setComment("");
    }, 2000);
  };

  const labels: Record<number, string> = {
    1: "Очень плохо",
    2: "Плохо",
    3: "Нормально",
    4: "Хорошо",
    5: "Отлично!",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 rounded-2xl"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="bg-white rounded-2xl p-6 mx-4 w-full max-w-xs shadow-xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--chat-gray-400)] hover:text-[var(--chat-gray-700)]"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-semibold text-[var(--chat-gray-900)] text-lg">
                  Спасибо за отзыв!
                </h3>
                <p className="text-sm text-[var(--chat-gray-600)] mt-1">
                  Ваша оценка помогает нам стать лучше
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-[var(--chat-gray-900)] text-lg mb-1">
                  Оцените качество поддержки
                </h3>
                <p className="text-sm text-[var(--chat-gray-600)] mb-5">
                  Насколько вы довольны нашим сервисом?
                </p>

                <div className="flex justify-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hovered || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-[var(--chat-gray-300)]"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>

                {(hovered || rating) > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-sm font-medium text-[var(--chat-primary)] mb-4"
                  >
                    {labels[hovered || rating]}
                  </motion.p>
                )}

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Оставьте комментарий (необязательно)"
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-[var(--chat-gray-300)] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--chat-primary)] text-[var(--chat-gray-900)] placeholder:text-[var(--chat-gray-400)]"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className={`mt-3 w-full py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    rating > 0
                      ? "bg-[var(--chat-primary)] text-white hover:bg-[var(--chat-primary-hover)]"
                      : "bg-[var(--chat-gray-200)] text-[var(--chat-gray-400)] cursor-not-allowed"
                  }`}
                >
                  Отправить оценку
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
