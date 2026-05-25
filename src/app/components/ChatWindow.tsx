import { motion, AnimatePresence } from "motion/react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { WelcomeForm } from "./WelcomeForm";
import { RatingModal } from "./RatingModal";
import { useState } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  time?: string;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
}

export function ChatWindow({ isOpen, onClose, onMinimize }: ChatWindowProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [userName, setUserName] = useState("");

  const quickReplies = [
    "Как оформить заказ",
    "Статус заказа",
    "Возврат товара",
    "Доставка",
  ];

  const handleWelcomeSubmit = (data: {
    name: string;
    email: string;
    topic: string;
  }) => {
    setUserName(data.name);
    setShowWelcome(false);

    setTimeout(() => {
      const welcomeMessage: Message = {
        id: "1",
        text: `Здравствуйте, ${data.name}! Спасибо за обращение. Я ваш виртуальный помощник. Чем могу помочь сегодня?`,
        isUser: false,
        time: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([welcomeMessage]);
      setShowQuickReplies(true);
    }, 300);
  };

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      time: new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sending",
    };

    setMessages((prev) => [...prev, newMessage]);
    setShowQuickReplies(false);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "sent" as const } : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg
        )
      );
    }, 1000);

    simulateResponse(text);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleClear = () => {
    setMessages([]);
    setShowQuickReplies(false);
    // Add welcome message again
    setTimeout(() => {
      const msg: Message = {
        id: Date.now().toString(),
        text: `${userName ? userName + ", чат" : "Чат"} очищен. Чем могу помочь?`,
        isUser: false,
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([msg]);
      setShowQuickReplies(true);
    }, 200);
  };

  const handleRateSubmit = (rating: number, comment: string) => {
    console.log("Rating:", rating, comment);
    // Add system message about rating
    const msg: Message = {
      id: Date.now().toString(),
      text: `⭐ Вы оценили диалог на ${rating} из 5. Спасибо!`,
      isUser: false,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
  };

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const responses: { [key: string]: string } = {
        "Как оформить заказ":
          "Чтобы оформить заказ, добавьте товары в корзину и нажмите 'Оформить заказ'. Я помогу вам на каждом шаге!",
        "Статус заказа":
          "Проверить статус заказа можно в личном кабинете в разделе 'Мои заказы'. Если нужна помощь, предоставьте номер заказа.",
        "Возврат товара":
          "У вас есть 30 дней для возврата товара. Свяжитесь с нами через форму возврата или опишите проблему здесь.",
        Доставка:
          "Мы доставляем по всей России. Стандартная доставка занимает 3-5 рабочих дней. Экспресс-доставка — 1-2 дня.",
      };

      // Check if message contains emoji or file
      const isFile = userMessage.startsWith("📎");
      if (isFile) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: "Файл получен! Мы его изучим и свяжемся с вами в ближайшее время.",
          isUser: false,
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        return;
      }

      const responseText =
        responses[userMessage] ||
        "Спасибо за ваш вопрос! Наш специалист свяжется с вами в течение нескольких минут.";

      const botMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        isUser: false,
        time: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (!responses[userMessage]) {
        setTimeout(() => {
          setShowQuickReplies(true);
        }, 500);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[380px] h-full md:h-[620px] bg-white md:rounded-2xl flex flex-col overflow-hidden z-50 relative"
        style={{ boxShadow: "var(--chat-shadow-lg)" }}
      >
        <ChatHeader
          onClose={onClose}
          onMinimize={onMinimize}
          onRate={!showWelcome ? () => setShowRating(true) : undefined}
          onClear={!showWelcome && messages.length > 0 ? handleClear : undefined}
        />

        {showWelcome ? (
          <WelcomeForm onSubmit={handleWelcomeSubmit} />
        ) : (
          <>
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              showQuickReplies={showQuickReplies}
              quickReplies={quickReplies}
              onQuickReply={handleQuickReply}
            />
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </>
        )}

        <RatingModal
          isOpen={showRating}
          onClose={() => setShowRating(false)}
          onSubmit={handleRateSubmit}
        />
      </motion.div>
    </AnimatePresence>
  );
}
