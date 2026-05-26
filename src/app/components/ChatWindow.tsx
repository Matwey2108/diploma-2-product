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

/* ─────────────────────────────────────────────
   База знаний — ключевые слова → ответ
───────────────────────────────────────────── */
interface KBEntry {
  patterns: string[];
  response: string;
}

const KB: KBEntry[] = [
  {
    patterns: ["привет", "здравствуй", "добрый", "хай", "hello", "hi", "доброе", "хелло"],
    response:
      "Здравствуйте! 👋 Я виртуальный помощник ГАПОУ КК «ЛСПК». Готов ответить на вопросы о колледже, поступлении и программах обучения. Чем могу помочь?",
  },
  {
    patterns: [
      "поступ", "абитуриент", "зачислен", "прием", "приём", "хочу учиться",
      "как попасть", "хочу поступить", "можно поступить",
    ],
    response:
      "Для поступления в ЛСПК:\n\n📅 Приём документов: 20 июня – 15 августа\n👥 Принимаем после 9 и 11 классов\n📞 Приёмная комиссия: +7 (86145) 7-37-21\n📧 lspk-priem-com@mail.ru\n\nТакже можно подать онлайн-заявку на нашем сайте в разделе «Онлайн-заявка»!",
  },
  {
    patterns: [
      "документ", "нужно принести", "список", "паспорт", "аттестат",
      "медицин", "справка", "фотограф", "086", "что взять",
    ],
    response:
      "Для поступления понадобятся:\n\n📄 Заявление о приёме\n🪪 Паспорт (оригинал + копия)\n📜 Аттестат об образовании\n🏥 Медицинская справка 086/у\n📸 6 фотографий 3×4 см\n\nПо вопросам документов: +7 (86145) 7-37-21",
  },
  {
    patterns: [
      "специальност", "программ", "направлен", "профессия", "чему учат",
      "специализаци", "факультет", "отделение", "курс",
    ],
    response:
      "В ЛСПК доступны 6 специальностей:\n\n📚 Преподавание в начальных классах (44.02.02)\n🧒 Дошкольное образование (44.02.01)\n♿ Специальное дошкольное образование (44.02.04)\n💻 Информационные системы и программирование (09.02.07)\n🏨 Гостиничное дело (43.02.14)\n✈️ Туризм (43.02.16)",
  },
  {
    patterns: [
      "расписани", "занятия", "уроки", "пары", "когда начинаются",
      "время занятий", "учёба начинается",
    ],
    response:
      "Расписание занятий публикуется на:\n\n📱 Telegram: @GAPOUlspk1931\n👥 OK.ru: ok.ru/lspk1931\n🏫 Информационных стендах колледжа\n\nПо вопросам расписания: +7 (86145) 7-01-40",
  },
  {
    patterns: [
      "контакт", "телефон", "адрес", "где находится", "как доехать",
      "найти", "почта", "написать", "связаться", "email",
    ],
    response:
      "📍 Адрес: ст. Ленинградская, ул. Красная, 152\n📞 Телефон: +7 (86145) 7-01-40\n📧 Email: lpk31@mail.ru\n\n🕐 Режим работы:\nПн–Сб: 08:00–19:00\nВс: выходной",
  },
  {
    patterns: [
      "стоимост", "цена", "сколько стоит", "платно", "бесплатно",
      "бюджет", "оплата", "платить", "деньги", "взнос",
    ],
    response:
      "В ЛСПК есть как бюджетные (бесплатные), так и платные места.\n\nДля уточнения количества мест и стоимости обратитесь в приёмную комиссию:\n📞 +7 (86145) 7-37-21\n📧 lspk-priem-com@mail.ru",
  },
  {
    patterns: ["армия", "отсрочка", "военный", "призыв", "служба", "военкомат"],
    response:
      "✅ Студенты очного отделения ЛСПК имеют право на отсрочку от военной службы с момента первого зачисления.\n\nПодробнее в деканате: +7 (86145) 7-01-40",
  },
  {
    patterns: [
      "общежити", "иногородн", "жить", "проживание", "жильё",
      "снять", "квартира", "где жить",
    ],
    response:
      "По вопросам проживания (общежитие, иногородние студенты) обратитесь в деканат:\n📞 +7 (86145) 7-01-40\n\nСотрудники расскажут о доступных вариантах.",
  },
  {
    patterns: ["практик", "стажировк", "производственн", "база практики"],
    response:
      "В ЛСПК предусмотрена учебная и производственная практика по всем специальностям.\n\nПрактика проходит в партнёрских организациях Краснодарского края.\nПодробнее: +7 (86145) 7-01-40",
  },
  {
    patterns: [
      "трудоустройств", "работа после", "диплом", "выпускник",
      "устроиться", "карьера", "зарплата",
    ],
    response:
      "Выпускники ЛСПК успешно работают в образовательных учреждениях, IT-компаниях, турагентствах и гостиницах Краснодарского края и по всей России.\n\nДиплом государственного образца признаётся всеми работодателями.",
  },
  {
    patterns: ["история", "основан", "когда создан", "сколько лет", "1931", "основали"],
    response:
      "🏛️ ЛСПК основан в 1931 году. Это одно из старейших учебных заведений Краснодарского края.\n\nЗа 90+ лет колледж подготовил тысячи специалистов в области педагогики, IT, туризма и гостиничного дела.",
  },
  {
    patterns: [
      "день открытых дверей", "открытые двери", "посетить",
      "экскурсия", "познакомиться", "можно приехать",
    ],
    response:
      "🎉 День открытых дверей в ЛСПК проходит ежегодно весной.\n\nСледите за анонсами:\n📱 Telegram: @GAPOUlspk1931\n👥 OK.ru: ok.ru/lspk1931\n\nИли звоните: +7 (86145) 7-01-40",
  },
  {
    patterns: ["заявка", "регистраци", "онлайн", "подать заявку", "записаться"],
    response:
      "Подать онлайн-заявку можно прямо на сайте в разделе «Онлайн-заявка на поступление» ⬆️\n\nИли лично в приёмной комиссии:\n📍 ст. Ленинградская, ул. Красная, 152\n📞 +7 (86145) 7-37-21",
  },
  {
    patterns: ["директор", "ректор", "бауэр", "руководитель", "кто директор"],
    response:
      "🎓 Директор ГАПОУ КК «ЛСПК» — Бауэр Герман Владимирович.\n\nПриёмная директора: +7 (86145) 7-35-10",
  },
  {
    patterns: ["сессия", "экзамен", "зачёт", "пересдача", "отчислен", "задолженност"],
    response:
      "По вопросам сессии, зачётов и пересдач обратитесь в учебную часть:\n📞 +7 (86145) 7-01-40\n\nРежим работы: Пн–Пт 09:00–17:00",
  },
  {
    patterns: ["столовая", "еда", "питание", "кафе", "буфет"],
    response:
      "В колледже есть столовая для студентов и сотрудников. По вопросам питания обратитесь в администрацию: +7 (86145) 7-01-40",
  },
  {
    patterns: ["спорт", "секция", "кружок", "внеурочн", "мероприяти", "досуг"],
    response:
      "В ЛСПК действуют различные кружки и секции для студентов. За актуальным расписанием следите в Telegram: @GAPOUlspk1931",
  },
  {
    patterns: ["пока", "до свидания", "спасибо", "благодарю", "всё", "удачи", "всего доброго"],
    response:
      "Рады были помочь! 😊 Если появятся вопросы — обращайтесь. Желаем успехов при поступлении в ЛСПК! 🎓",
  },
];

const QUICK_REPLIES = [
  "Как поступить в колледж",
  "Какие документы нужны",
  "Список специальностей",
  "Контакты колледжа",
];

/* ── Умный поиск по базе знаний ── */
function findBotResponse(input: string): string {
  const text = input.toLowerCase().trim();

  for (const entry of KB) {
    if (entry.patterns.some((p) => text.includes(p))) {
      return entry.response;
    }
  }

  // Неизвестный вопрос
  return "Спасибо за вопрос! Для подробной консультации обращайтесь:\n📞 Приёмная комиссия: +7 (86145) 7-37-21\n📧 lspk-priem-com@mail.ru\n🕐 Пн–Пт: 09:00–17:00";
}

/* ─────────────────────────────────────────────
   Компонент
───────────────────────────────────────────── */
export function ChatWindow({ isOpen, onClose, onMinimize }: ChatWindowProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [userName, setUserName] = useState("");

  const now = () =>
    new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  const addBot = (text: string) =>
    setMessages((prev: Message[]) => [
      ...prev,
      { id: Date.now().toString(), text, isUser: false, time: now() },
    ]);

  const progressStatus = (id: string) => {
    const set = (status: Message["status"], delay: number) =>
      setTimeout(
        () =>
          setMessages((prev: Message[]) =>
            prev.map((m: Message) => (m.id === id ? { ...m, status } : m))
          ),
        delay
      );
    set("sent", 400);
    set("delivered", 900);
    set("read", 2200);
  };

  const handleWelcomeSubmit = (data: { name: string; phone: string; topic: string }) => {
    setUserName(data.name);
    setShowWelcome(false);

    const topicHints: Record<string, string> = {
      admission: "Вижу, что вас интересует поступление.",
      schedule: "Вижу, что вас интересует расписание занятий.",
      docs: "Вижу, что вас интересуют документы и справки.",
      payment: "Вижу, что вас интересует оплата обучения.",
    };
    const hint = data.topic ? ` ${topicHints[data.topic] ?? ""}` : "";

    setTimeout(() => {
      addBot(
        `Здравствуйте, ${data.name}!${hint} Я помощник ЛСПК и постараюсь ответить на ваши вопросы. Чем могу помочь?`
      );
      setShowQuickReplies(true);
    }, 300);
  };

  const handleSend = (text: string) => {
    const id = Date.now().toString();
    setMessages((prev: Message[]) => [
      ...prev,
      { id, text, isUser: true, time: now(), status: "sending" },
    ]);
    setShowQuickReplies(false);
    progressStatus(id);

    if (text.startsWith("📎")) {
      setTimeout(() => {
        setIsTyping(false);
        addBot("Файл получен. Специалист свяжется с вами в ближайшее время.");
      }, 1000);
      return;
    }

    setIsTyping(true);
    // Задержка имитирует «набор текста»
    const delay = 900 + Math.min(text.length * 18, 800);
    setTimeout(() => {
      setIsTyping(false);
      addBot(findBotResponse(text));
      setTimeout(() => setShowQuickReplies(true), 500);
    }, delay);
  };

  const handleClear = () => {
    setMessages([]);
    setShowQuickReplies(false);
    setTimeout(() => {
      addBot(`${userName ? userName + ", ч" : "Ч"}ат очищен. Чем могу помочь?`);
      setShowQuickReplies(true);
    }, 200);
  };

  const handleRateSubmit = (rating: number) => {
    addBot(`⭐ Спасибо за оценку ${rating} из 5! Рады были помочь.`);
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
              quickReplies={QUICK_REPLIES}
              onQuickReply={handleSend}
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
