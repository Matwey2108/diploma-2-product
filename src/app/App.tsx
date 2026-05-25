import { ChatWidget } from "./components/ChatWidget";
import { ChatDemo } from "./components/ChatDemo";
import { FeatureCard } from "./components/FeatureCard";
import { UseCaseSection } from "./components/UseCaseSection";
import { MessageCircle, Zap, Shield, Globe } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [view, setView] = useState<"demo" | "widget">("widget");

  return (
    <div className="size-full bg-[var(--chat-gray-50)] overflow-auto">
      {/* Toggle buttons */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full shadow-lg border border-[var(--chat-gray-200)] p-1 flex gap-1">
        <button
          onClick={() => setView("widget")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            view === "widget"
              ? "bg-[var(--chat-primary)] text-white"
              : "text-[var(--chat-gray-600)] hover:text-[var(--chat-gray-900)]"
          }`}
        >
          Виджет
        </button>
        <button
          onClick={() => setView("demo")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            view === "demo"
              ? "bg-[var(--chat-primary)] text-white"
              : "text-[var(--chat-gray-600)] hover:text-[var(--chat-gray-900)]"
          }`}
        >
          Дизайн-система
        </button>
      </div>

      {view === "widget" ? (
        <div className="size-full overflow-auto relative pt-20">
          {/* Demo content - simulating a website */}
          <div className="max-w-6xl mx-auto px-6 py-12 text-center">
            <h1 className="text-5xl font-bold text-[var(--chat-gray-900)] mb-4">
              Добро пожаловать на наш сайт
            </h1>
            <p className="text-xl text-[var(--chat-gray-600)] mb-8">
              Виджет чата поддержки находится в правом нижнем углу
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <FeatureCard
                icon={MessageCircle}
                title="24/7 Поддержка"
                description="Мгновенные ответы на вопросы клиентов в любое время"
                index={0}
              />
              <FeatureCard
                icon={Zap}
                title="Быстрая интеграция"
                description="Установка виджета занимает всего несколько минут"
                index={1}
              />
              <FeatureCard
                icon={Shield}
                title="Безопасность"
                description="Защита данных и конфиденциальности пользователей"
                index={2}
              />
              <FeatureCard
                icon={Globe}
                title="Мультиязычность"
                description="Поддержка нескольких языков для глобальной аудитории"
                index={3}
              />
            </div>

            <UseCaseSection />

            <div className="mt-20 text-center">
              <p className="text-sm text-[var(--chat-gray-500)]">
                Нажмите на кнопку чата в правом нижнем углу, чтобы начать
              </p>
            </div>
          </div>

          {/* Chat Widget */}
          <ChatWidget />
        </div>
      ) : (
        <div className="pt-20">
          <ChatDemo />
        </div>
      )}
    </div>
  );
}