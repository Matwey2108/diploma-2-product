import { motion } from "motion/react";
import { useState } from "react";
import { User, Mail, MessageSquare } from "lucide-react";

interface WelcomeFormProps {
  onSubmit: (data: { name: string; email: string; topic: string }) => void;
}

export function WelcomeForm({ onSubmit }: WelcomeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto px-6 py-8 bg-[var(--chat-gray-50)]"
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--chat-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--chat-gray-900)] mb-2">
            Начать чат
          </h2>
          <p className="text-sm text-[var(--chat-gray-600)]">
            Расскажите нам о себе, чтобы мы могли лучше помочь вам
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--chat-gray-700)] mb-2">
              Ваше имя *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--chat-gray-400)]" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Иван Иванов"
                className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--chat-gray-300)] rounded-xl text-[var(--chat-gray-900)] placeholder:text-[var(--chat-gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--chat-primary)] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--chat-gray-700)] mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--chat-gray-400)]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="ivan@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white border border-[var(--chat-gray-300)] rounded-xl text-[var(--chat-gray-900)] placeholder:text-[var(--chat-gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--chat-primary)] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--chat-gray-700)] mb-2">
              Тема обращения
            </label>
            <select
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              className="w-full px-4 py-3 bg-white border border-[var(--chat-gray-300)] rounded-xl text-[var(--chat-gray-900)] focus:outline-none focus:ring-2 focus:ring-[var(--chat-primary)] focus:border-transparent transition-all"
            >
              <option value="">Выберите тему</option>
              <option value="order">Оформление заказа</option>
              <option value="status">Статус заказа</option>
              <option value="return">Возврат товара</option>
              <option value="delivery">Доставка</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[var(--chat-primary)] text-white py-3 rounded-xl font-medium hover:bg-[var(--chat-primary-hover)] transition-colors shadow-sm"
          >
            Начать чат
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-[var(--chat-gray-500)]">
            Мы ценим вашу конфиденциальность и защищаем ваши данные
          </p>
        </div>
      </div>
    </motion.div>
  );
}
