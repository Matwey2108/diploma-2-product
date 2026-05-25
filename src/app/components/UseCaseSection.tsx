import { motion } from "motion/react";
import { ShoppingCart, HeadphonesIcon, FileQuestion, CreditCard } from "lucide-react";

const useCases = [
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Помощь в выборе товаров и оформлении заказов",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: HeadphonesIcon,
    title: "Техподдержка",
    description: "Решение технических вопросов клиентов",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FileQuestion,
    title: "FAQ",
    description: "Автоматические ответы на частые вопросы",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: CreditCard,
    title: "Финансы",
    description: "Консультации по финансовым продуктам",
    color: "bg-orange-50 text-orange-600",
  },
];

export function UseCaseSection() {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--chat-gray-900)] mb-3">
          Сценарии использования
        </h2>
        <p className="text-lg text-[var(--chat-gray-600)]">
          Виджет чата подходит для любого типа бизнеса
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)] hover:border-[var(--chat-primary)] transition-all group"
          >
            <div
              className={`w-14 h-14 ${useCase.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <useCase.icon className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-2">
              {useCase.title}
            </h3>
            <p className="text-sm text-[var(--chat-gray-600)] leading-relaxed">
              {useCase.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
