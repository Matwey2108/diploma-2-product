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

const quickReplies = [
  "Как поступить в колледж",
  "Расписание занятий",
  "Какие документы нужны",
  "Контакты колледжа",
];

const botResponses: Record<string, string> = {
  "Как поступить в колледж":
    "Для поступления в ЛСПК подайте заявление и документы в приёмную комиссию с 20 июня по 15 августа. Принимаем после 9 и 11 классов. Телефон приёмной: +7 (86145) 7-37-21.",
  "Расписание занятий":
    "Расписание занятий публикуется на информационных стендах колледжа и в группах в социальных сетях. Telegram-канал: @GAPOUlspk1931. По вопросам расписания звоните: +7 (86145) 7-01-40.",
  "Какие документы нужны":
    "Для поступления нужны: заявление о приёме, паспорт (оригинал + копия), аттестат об образовании, медицинская справка 086/у, 6 фотографий 3×4 см.",
  "Контакты колледжа":
    "📍 ст. Ленинградская, ул. Красная, 152\n📞 +7 (86145) 7-01-40\n📧 lpk31@mail.ru\n🕐 Пн–Сб: 08:00–19:00",
};

export function ChatWindow({ isOpen, onClose, onMinimize }: ChatWindowProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [userName, setUserName] = useState("");

  const now = () =>
    new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  const addBotMessage = (text: string) => {
    setMessages((prev: Message[]) => [
      ...prev,
      { id: Date.now().toString(), text, isUser: false, time: now() },
    ]);
  };

  const handleWelcomeSubmit = (data: { name: string; phone: string; topic: string }) => {
    setUserName(data.name);
    setShowWelcome(false);

    const topicLabels: Record<string, string> = {
      admission: "приёмной комиссии",
      schedule: "расписанию занятий",
      docs: "документам и справкам",
      payment: "оплате обучения",
    };
    const topicHint = data.topic && topicLabels[data.topic]
      ? ` Вижу, что вас интересует вопрос по ${topicLabels[data.topic]}.`
      : "";

    setTimeout(() => {
      addBotMessage(
        `Здравствуйте, ${data.name}! Добро пожаловать в чат поддержки ГАПОУ КК «ЛСПК».${topicHint} Чем могу помочь?`
      );
      setShowQuickReplies(true);
    }, 300);
  };

  const progressStatus = (msgId: string) => {
    setTimeout(() => {
      setMessages((prev: Message[]) =>
        prev.map((m: Message) => (m.id === msgId ? { ...m, status: "sent" as const } : m))
      );
    }, 400);
    setTimeout(() => {
      setMessages((prev: Message[]) =>
        prev.map((m: Message) => (m.id === msgId ? { ...m, status: "delivered" as const } : m))
      );
    }, 900);
    setTimeout(() => {
      setMessages((prev: Message[]) =>
        prev.map((m: Message) => (m.id === msgId ? { ...m, status: "read" as const } : m))
      );
    }, 2000);
  };

  const handleSend = (text: string) => {
    const id = Date.now().toString();
    const newMsg: Message = { id, text, isUser: true, time: now(), status: "sending" };
    setMessages((prev: Message[]) => [...prev, newMsg]);
    setShowQuickReplies(false);
    progressStatus(id);
    simulateResponse(text);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleClear = () => {
    setMessages([]);
    setShowQuickReplies(false);
    setTimeout(() => {
      addBotMessage(
        `${userName ? userName + ", ч" : "Ч"}ат очищен. Чем могу помочь?`
      );
      setShowQuickReplies(true);
    }, 200);
  };

  const handleRateSubmit = (rating: number) => {
    addBotMessage(`⭐ Спасибо за оценку ${rating} из 5! Рады были помочь.`);
  };

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (userMessage.startsWith("📎")) {
        addBotMessage("Файл получен. Специалист свяжется с вами в ближайшее время.");
        return;
      }

      const response =
        botResponses[userMessage] ||
        "Спасибо за вопрос! Для подробной консультации обратитесь в приёмную комиссию: +7 (86145) 7-37-21 или напишите на lspk-priem-com@mail.ru.";

      addBotMessage(response);

      if (!botResponses[userMessage]) {
        setTimeout(() => setShowQuickReplies(true), 400);
      }
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[380px] h-full md:h-[620px] bg-white md:rounded-2xl flex flex-col overflow-hidden z-50"
        style={{ boxShadow: "0 20px 60px rgba(14,61,122,0.25)" }}
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
