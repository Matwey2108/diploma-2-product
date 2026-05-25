import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";
import { SystemMessage } from "./SystemMessage";
import { MessageStatus } from "./MessageStatus";
import { CodeExample } from "./CodeExample";
import { motion, AnimatePresence } from "motion/react";

export function ChatDemo() {
  const [selectedTab, setSelectedTab] = useState<"states" | "components" | "usage">("states");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12">
      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[var(--chat-gray-900)] text-white px-5 py-2.5 rounded-full text-sm shadow-lg"
          >
            ✅ Выбрано: «{toast}»
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--chat-gray-900)] mb-2">
          Дизайн-система чат-виджета
        </h2>
        <p className="text-[var(--chat-gray-600)]">
          Компоненты и состояния для профессионального чата поддержки
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[var(--chat-gray-200)] overflow-x-auto">
        {(["states", "components", "usage"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
              selectedTab === tab
                ? "text-[var(--chat-primary)]"
                : "text-[var(--chat-gray-600)] hover:text-[var(--chat-gray-900)]"
            }`}
          >
            {tab === "states" ? "Состояния сообщений" : tab === "components" ? "Компоненты" : "Использование"}
            {selectedTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--chat-primary)]" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {selectedTab === "states" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Messages */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)]">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4">
              Сообщения пользователя
            </h3>
            <div className="bg-[var(--chat-gray-50)] rounded-xl p-4 space-y-4">
              {[
                { text: "Привет! Как дела?", status: "sending" as const, label: "Отправка" },
                { text: "Можете помочь?", status: "sent" as const, label: "Отправлено" },
                { text: "Спасибо за помощь!", status: "delivered" as const, label: "Доставлено" },
                { text: "Отлично, понял!", status: "read" as const, label: "Прочитано" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-[var(--chat-gray-500)] mb-2">{item.label}</p>
                  <ChatMessage message={item.text} isUser={true} time={`14:3${i}`} status={item.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Bot Messages */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)]">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4">
              Сообщения бота
            </h3>
            <div className="bg-[var(--chat-gray-50)] rounded-xl p-4 space-y-4">
              <div>
                <p className="text-xs text-[var(--chat-gray-500)] mb-2">Обычное</p>
                <ChatMessage message="Здравствуйте! Чем могу помочь?" isUser={false} time="14:32" />
              </div>
              <div>
                <p className="text-xs text-[var(--chat-gray-500)] mb-2">Длинное</p>
                <ChatMessage
                  message="Конечно, я могу помочь с оформлением заказа. Для этого добавьте товары в корзину и следуйте инструкциям на экране."
                  isUser={false}
                  time="14:33"
                />
              </div>
              <div>
                <p className="text-xs text-[var(--chat-gray-500)] mb-2">Набор текста</p>
                <TypingIndicator />
              </div>
            </div>
          </div>

          {/* System Messages */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)]">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4">
              Системные сообщения
            </h3>
            <div className="bg-[var(--chat-gray-50)] rounded-xl p-4 space-y-4">
              <SystemMessage message="Оператор присоединился к чату" />
              <SystemMessage message="Чат завершен" />
              <SystemMessage message="Новое сообщение" />
            </div>
          </div>

          {/* Quick Replies - NOW INTERACTIVE */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)]">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4">
              Быстрые ответы
            </h3>
            <p className="text-xs text-[var(--chat-gray-500)] mb-3">Нажмите на кнопку — она интерактивная!</p>
            <div className="bg-[var(--chat-gray-50)] rounded-xl p-4">
              <QuickReplies
                options={["Как оформить заказ", "Статус заказа", "Возврат товара", "Доставка"]}
                onSelect={(option) => showToast(option)}
              />
            </div>
          </div>
        </div>
      )}

      {selectedTab === "components" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Status Icons */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)]">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4">
              Статусы сообщений
            </h3>
            <div className="space-y-4">
              {(["sending", "sent", "delivered", "read"] as const).map((status) => (
                <div key={status} className="flex items-center justify-between p-3 bg-[var(--chat-gray-50)] rounded-lg">
                  <span className="text-sm capitalize">
                    {{ sending: "Отправка", sent: "Отправлено", delivered: "Доставлено", read: "Прочитано" }[status]}
                  </span>
                  <MessageStatus status={status} />
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)]">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4">
              Цветовая палитра
            </h3>
            <div className="space-y-3">
              {[
                { color: "bg-[var(--chat-primary)]", name: "Primary", hex: "#0066FF" },
                { color: "bg-[var(--chat-primary-hover)]", name: "Primary Hover", hex: "#0052CC" },
                { color: "bg-[var(--chat-green)]", name: "Online", hex: "#10B981" },
                { color: "bg-[var(--chat-gray-100)] border border-[var(--chat-gray-200)]", name: "Background", hex: "#F3F4F6" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${item.color}`} />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-[var(--chat-gray-500)]">{item.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white rounded-2xl p-6 border border-[var(--chat-gray-200)]">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4">
              Типографика
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[var(--chat-gray-500)] mb-1">Heading</p>
                <p className="text-lg font-semibold">Inter Semibold 18px</p>
              </div>
              <div>
                <p className="text-xs text-[var(--chat-gray-500)] mb-1">Body</p>
                <p className="text-sm">Inter Regular 14px</p>
              </div>
              <div>
                <p className="text-xs text-[var(--chat-gray-500)] mb-1">Caption</p>
                <p className="text-xs">Inter Regular 12px</p>
              </div>
              <div>
                <p className="text-xs text-[var(--chat-gray-500)] mb-1">Button</p>
                <p className="text-sm font-medium">Inter Medium 14px</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "usage" && (
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4 text-xl">
              Быстрый старт
            </h3>
            <p className="text-[var(--chat-gray-600)] mb-6">
              Добавьте виджет на свой сайт за несколько простых шагов
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-[var(--chat-gray-900)] mb-3">
                  1. Импортируйте компонент
                </h4>
                <CodeExample
                  code={`import { ChatWidget } from "./components/ChatWidget";\n\nexport default function App() {\n  return (\n    <>\n      {/* Ваш контент */}\n      <ChatWidget />\n    </>\n  );\n}`}
                  title="App.tsx"
                />
              </div>

              <div>
                <h4 className="font-medium text-[var(--chat-gray-900)] mb-3">
                  2. Настройте цвета (опционально)
                </h4>
                <CodeExample
                  code={`/* src/styles/theme.css */\n:root {\n  --chat-primary: #0066FF;\n  --chat-primary-hover: #0052CC;\n  --chat-green: #10B981;\n}`}
                  language="css"
                  title="theme.css"
                />
              </div>

              <div>
                <h4 className="font-medium text-[var(--chat-gray-900)] mb-3">
                  3. Готово! 🎉
                </h4>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <p className="text-green-800 font-medium mb-2">
                    Виджет чата готов к использованию
                  </p>
                  <p className="text-green-700 text-sm">
                    Он появится в правом нижнем углу экрана с полной функциональностью
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--chat-gray-200)] pt-8">
            <h3 className="font-semibold text-[var(--chat-gray-900)] mb-4 text-xl">
              Новые возможности
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "📎 Прикрепление файлов", desc: "Пользователи могут прикреплять файлы к сообщениям прямо в чате" },
                { title: "😊 Эмодзи-пикер", desc: "Встроенный выбор эмодзи для более живого общения" },
                { title: "⭐ Оценка диалога", desc: "Кнопка оценки в заголовке — пользователь ставит 1–5 звёзд" },
                { title: "🗑️ Очистка чата", desc: "Быстрая очистка истории переписки одним нажатием" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-6 border border-[var(--chat-gray-200)]">
                  <h4 className="font-medium text-[var(--chat-gray-900)] mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--chat-gray-600)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
