import { motion } from "motion/react";
import { useState } from "react";
import { User, Phone } from "lucide-react";

interface WelcomeFormProps {
  onSubmit: (data: { name: string; phone: string; topic: string }) => void;
}

export function WelcomeForm({ onSubmit }: WelcomeFormProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", topic: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto px-6 py-8"
      style={{ background: "#F5F7FA" }}
    >
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl"
            style={{ background: "#1A56A7" }}
          >
            Л
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "#1A1A2E" }}>
            Чат поддержки ЛСПК
          </h2>
          <p className="text-sm text-gray-500">
            Представьтесь, и мы постараемся помочь как можно быстрее
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
              Ваше имя *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван Иванов"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none transition-all text-sm"
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1A56A7")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#D1D5DB")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
              Телефон *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (___) ___-__-__"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none transition-all text-sm"
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1A56A7")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#D1D5DB")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
              Тема обращения
            </label>
            <select
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-900 outline-none transition-all text-sm"
              onFocus={(e) => (e.currentTarget.style.borderColor = "#1A56A7")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#D1D5DB")}
            >
              <option value="">Выберите тему</option>
              <option value="admission">Приёмная комиссия / Поступление</option>
              <option value="schedule">Расписание занятий</option>
              <option value="docs">Документы и справки</option>
              <option value="payment">Оплата обучения</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-white py-3 rounded-xl font-medium transition-colors shadow-sm text-sm"
            style={{ background: "#1A56A7" }}
          >
            Начать чат
          </motion.button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-400">
          Ваши данные защищены и не передаются третьим лицам
        </p>
      </div>
    </motion.div>
  );
}
