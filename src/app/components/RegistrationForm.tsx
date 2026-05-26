import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  User, Phone, Mail, Calendar, BookOpen,
  CheckCircle2, AlertCircle, CheckCircle,
} from "lucide-react";

const SPECIALTIES = [
  { code: "44.02.02", name: "Преподавание в начальных классах" },
  { code: "44.02.01", name: "Дошкольное образование" },
  { code: "44.02.04", name: "Специальное дошкольное образование" },
  { code: "09.02.07", name: "Информационные системы и программирование" },
  { code: "43.02.14", name: "Гостиничное дело" },
  { code: "43.02.16", name: "Туризм" },
];

interface FormState {
  fullName: string;
  dob: string;
  phone: string;
  email: string;
  education: string;
  specialty: string;
  studyForm: string;
}

interface FormErrors {
  fullName?: string;
  dob?: string;
  phone?: string;
  email?: string;
  education?: string;
  specialty?: string;
  studyForm?: string;
}

const EMPTY: FormState = {
  fullName: "", dob: "", phone: "+7", email: "",
  education: "", specialty: "", studyForm: "",
};

/* ─── Вспомогательные компоненты ─── */

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex items-center gap-1 mt-1.5 text-xs font-medium"
          style={{ color: "#DC2626" }}
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FieldOk({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <CheckCircle className="w-4 h-4" style={{ color: "#10B981" }} />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/* ─── Логика валидации полей ─── */

/** ФИО: проверяет каждое слово */
function validateName(name: string): string | undefined {
  const trimmed = name.trim();
  if (!trimmed) return "Введите ФИО";

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return "Введите фамилию и имя (минимум 2 слова)";

  for (const part of parts) {
    if (part.replace(/[-]/g, "").length < 2)
      return `«${part}» — слишком короткое слово`;
    // Одна и та же буква во всём слове: Аааааа, Бббб
    if (/^(.)\1+$/i.test(part))
      return "Введите настоящее имя — похоже на случайный набор";
    // 3+ одинаковых символа подряд: Ивааааанов
    if (/(.)\1{2,}/.test(part))
      return "Слово содержит слишком много повторяющихся букв";
  }

  return undefined;
}

/** Телефон: проверяет 10 цифр после +7 */
function validatePhone(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, "");
  const local = digits.slice(1); // без ведущей 7

  if (local.length < 10)
    return `Введите номер полностью (${local.length} из 10 цифр)`;

  // Первая цифра — 9 для мобильных, 3-8 для городских
  if (!/^[3-9]/.test(local))
    return "Номер должен начинаться с цифры 3–9";

  // Все цифры одинаковые: 0000000000, 9999999999
  if (/^(.)\1+$/.test(local))
    return "Введите настоящий номер телефона";

  // Слишком простые последовательности: 1234567890, 9876543210
  const SEQUENCES = ["0123456789", "9876543210", "1234567890"];
  if (SEQUENCES.some((s) => local === s))
    return "Введите настоящий номер телефона";

  return undefined;
}

/** Email */
function validateEmail(email: string): string | undefined {
  if (!email) return "Введите email";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    return "Некорректный формат email";
  return undefined;
}

/* ─── Основной компонент ─── */

export function RegistrationForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  /* ── Реальные фильтры при вводе ── */

  const onFullName = (raw: string) => {
    // 1. Только кириллица, пробелы, дефисы — всё остальное блокируется сразу
    let v = raw.replace(/[^А-ЯЁа-яё\s\-]/g, "");

    // 2. Автокапитализация первой буквы каждого слова
    v = v.replace(/(^|\s|-)([а-яё])/g, (_, sep, ch) => sep + ch.toUpperCase());

    // 3. Не более 2 одинаковых букв подряд (блокируем «аааааа»)
    v = v.replace(/([А-ЯЁа-яё])\1{2,}/g, "$1$1");

    // 4. Не более одного пробела/дефиса подряд
    v = v.replace(/\s{2,}/g, " ").replace(/-{2,}/g, "-");

    setForm((p: FormState) => ({ ...p, fullName: v }));
    if (touched.fullName) setErrors((p: FormErrors) => ({ ...p, fullName: validateName(v) }));
  };

  const onPhone = (raw: string) => {
    // Только цифры, убираем ведущие 7/8
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith("8") || digits.startsWith("7")) digits = digits.slice(1);
    digits = digits.slice(0, 10);

    // Первая цифра после +7 должна быть 3–9 — блокируем 0,1,2
    if (digits.length > 0 && !/^[3-9]/.test(digits)) digits = digits.slice(1);

    // Форматируем: +7 (XXX) XXX-XX-XX
    let fmt = "+7";
    if (digits.length > 0) fmt += " (" + digits.slice(0, 3);
    if (digits.length >= 3) fmt += ") " + digits.slice(3, 6);
    if (digits.length >= 6) fmt += "-" + digits.slice(6, 8);
    if (digits.length >= 8) fmt += "-" + digits.slice(8, 10);

    setForm((p: FormState) => ({ ...p, phone: fmt }));
    if (touched.phone) setErrors((p: FormErrors) => ({ ...p, phone: validatePhone(fmt) }));
  };

  const onEmail = (raw: string) => {
    // Блокируем пробелы и недопустимые символы
    const v = raw.replace(/[^\w.@+\-]/g, "").toLowerCase();
    setForm((p: FormState) => ({ ...p, email: v }));
    if (touched.email) setErrors((p: FormErrors) => ({ ...p, email: validateEmail(v) }));
  };

  /* ── Blur-валидация (при уходе с поля) ── */
  const onBlur = (field: keyof FormState) => {
    setFocused(null);
    setTouched((p: Partial<Record<keyof FormState, boolean>>) => ({ ...p, [field]: true }));

    const e: FormErrors = { ...errors };
    if (field === "fullName") e.fullName = validateName(form.fullName);
    if (field === "phone") e.phone = validatePhone(form.phone);
    if (field === "email") e.email = validateEmail(form.email);
    setErrors(e);
  };

  /* ── Полная валидация при отправке ── */
  const validate = (): boolean => {
    const e: FormErrors = {
      fullName: validateName(form.fullName),
      phone: validatePhone(form.phone),
      email: validateEmail(form.email),
    };

    if (!form.dob) {
      e.dob = "Укажите дату рождения";
    } else {
      const today = new Date();
      const birth = new Date(form.dob);
      const age =
        today.getFullYear() -
        birth.getFullYear() -
        (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
      if (age < 14) e.dob = "Минимальный возраст — 14 лет";
      else if (age > 60) e.dob = "Проверьте дату рождения";
    }

    if (!form.education) e.education = "Выберите класс окончания";
    if (!form.specialty) e.specialty = "Выберите специальность";
    if (!form.studyForm) e.studyForm = "Выберите форму обучения";

    setErrors(e);
    setTouched({ fullName: true, phone: true, email: true, dob: true, education: true, specialty: true, studyForm: true });
    return !Object.values(e).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  /* ── Экран успеха ── */
  if (submitted) {
    const parts = form.fullName.trim().split(/\s+/);
    const firstName = parts[1] ?? parts[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#10B98120" }}>
          <CheckCircle2 className="w-10 h-10" style={{ color: "#10B981" }} />
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>Заявка принята!</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-2">
          Спасибо, <span className="font-semibold">{firstName}</span>! Ваша заявка передана в приёмную комиссию.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Мы свяжемся с вами по номеру <span className="font-medium">{form.phone}</span> в течение рабочего дня.
        </p>
        <button
          onClick={() => { setForm(EMPTY); setErrors({}); setTouched({}); setSubmitted(false); }}
          className="text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
          style={{ background: "#1A56A7" }}
        >
          Подать ещё одну заявку
        </button>
      </motion.div>
    );
  }

  /* ── Вспомогательные стили ── */
  const phoneDigits = form.phone.replace(/\D/g, "").slice(1).length; // 0–10
  const nameOk = !validateName(form.fullName) && form.fullName.trim().length > 0;
  const phoneOk = !validatePhone(form.phone);
  const emailOk = !validateEmail(form.email) && form.email.length > 0;

  const fieldStyle = (field: string, hasError: boolean) => ({
    borderColor: hasError && touched[field as keyof FormState]
      ? "#DC2626"
      : focused === field
      ? "#1A56A7"
      : "#D1D5DB",
    boxShadow:
      focused === field && !(hasError && touched[field as keyof FormState])
        ? "0 0 0 3px rgba(26,86,167,0.12)"
        : undefined,
  });

  const fp = (field: keyof FormState) => ({
    onFocus: () => setFocused(field),
    onBlur: () => onBlur(field),
  });

  const showError = (field: keyof FormState) =>
    touched[field] ? errors[field] : undefined;

  /* ── Рендер ── */
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">

        {/* ФИО */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            ФИО <span style={{ color: "#DC2626" }}>*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => onFullName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              maxLength={80}
              autoComplete="off"
              className="w-full pl-9 pr-9 py-2.5 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all"
              style={fieldStyle("fullName", !!errors.fullName)}
              {...fp("fullName")}
            />
            <FieldOk show={nameOk} />
          </div>
          <FieldError msg={showError("fullName")} />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-400">
              Только кириллица · Фамилия Имя Отчество
            </p>
            <p className="text-xs" style={{ color: form.fullName.trim().split(/\s+/).filter(Boolean).length >= 2 ? "#10B981" : "#9CA3AF" }}>
              {form.fullName.trim().split(/\s+/).filter(Boolean).length} / 2 слова
            </p>
          </div>
        </div>

        {/* Дата рождения */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Дата рождения <span style={{ color: "#DC2626" }}>*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={form.dob}
              onChange={(e) => {
                setForm((p: FormState) => ({ ...p, dob: e.target.value }));
                if (touched.dob) {
                  const age = new Date().getFullYear() - new Date(e.target.value).getFullYear();
                  setErrors((p: FormErrors) => ({
                    ...p,
                    dob: !e.target.value ? "Укажите дату рождения"
                      : age < 14 ? "Минимальный возраст — 14 лет"
                      : age > 60 ? "Проверьте дату рождения"
                      : undefined,
                  }));
                }
              }}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 14)).toISOString().split("T")[0]}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 60)).toISOString().split("T")[0]}
              className="w-full pl-9 pr-4 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all"
              style={fieldStyle("dob", !!errors.dob)}
              {...fp("dob")}
            />
          </div>
          <FieldError msg={showError("dob")} />
        </div>

        {/* Телефон */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Телефон <span style={{ color: "#DC2626" }}>*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => onPhone(e.target.value)}
              placeholder="+7 (9__) ___-__-__"
              className="w-full pl-9 pr-14 py-2.5 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all"
              style={fieldStyle("phone", !!errors.phone)}
              {...fp("phone")}
            />
            {phoneOk ? (
              <FieldOk show />
            ) : (
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold"
                style={{ color: "#9CA3AF" }}
              >
                {phoneDigits}/10
              </span>
            )}
          </div>
          <FieldError msg={showError("phone")} />
          <p className="text-xs text-gray-400 mt-1">Начинается с +7 9xx (российский номер)</p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Email <span style={{ color: "#DC2626" }}>*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => onEmail(e.target.value)}
              placeholder="ivan@example.com"
              className="w-full pl-9 pr-9 py-2.5 bg-white border rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all"
              style={fieldStyle("email", !!errors.email)}
              {...fp("email")}
            />
            <FieldOk show={emailOk} />
          </div>
          <FieldError msg={showError("email")} />
        </div>

        {/* Класс */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Поступаю после <span style={{ color: "#DC2626" }}>*</span>
          </label>
          <select
            value={form.education}
            onChange={(e) => {
              setForm((p: FormState) => ({ ...p, education: e.target.value }));
              setErrors((p: FormErrors) => ({ ...p, education: undefined }));
            }}
            className="w-full px-4 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all"
            style={fieldStyle("education", !!errors.education)}
            {...fp("education")}
          >
            <option value="">Выберите класс</option>
            <option value="9">9 класса</option>
            <option value="11">11 класса</option>
          </select>
          <FieldError msg={showError("education")} />
        </div>

        {/* Специальность */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Желаемая специальность <span style={{ color: "#DC2626" }}>*</span>
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={form.specialty}
              onChange={(e) => {
                setForm((p: FormState) => ({ ...p, specialty: e.target.value }));
                setErrors((p: FormErrors) => ({ ...p, specialty: undefined }));
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border rounded-xl text-sm text-gray-900 outline-none transition-all"
              style={fieldStyle("specialty", !!errors.specialty)}
              {...fp("specialty")}
            >
              <option value="">Выберите специальность</option>
              {SPECIALTIES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
          <FieldError msg={showError("specialty")} />
        </div>

        {/* Форма обучения */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
            Форма обучения <span style={{ color: "#DC2626" }}>*</span>
          </label>
          <div className="flex gap-3">
            {["Очная", "Заочная"].map((f) => (
              <label
                key={f}
                className="flex items-center gap-2 cursor-pointer px-5 py-2.5 rounded-xl border transition-all text-sm font-medium select-none"
                style={{
                  background: form.studyForm === f ? "#1A56A7" : "white",
                  borderColor: errors.studyForm && touched.studyForm
                    ? "#DC2626"
                    : form.studyForm === f
                    ? "#1A56A7"
                    : "#D1D5DB",
                  color: form.studyForm === f ? "white" : "#374151",
                }}
              >
                <input
                  type="radio"
                  name="studyForm"
                  value={f}
                  checked={form.studyForm === f}
                  onChange={() => {
                    setForm((p: FormState) => ({ ...p, studyForm: f }));
                    setErrors((p: FormErrors) => ({ ...p, studyForm: undefined }));
                    setTouched((p: Partial<Record<keyof FormState, boolean>>) => ({ ...p, studyForm: true }));
                  }}
                  className="hidden"
                />
                {f}
              </label>
            ))}
          </div>
          <FieldError msg={showError("studyForm")} />
        </div>
      </div>

      {/* Кнопка */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto text-white px-10 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md"
          style={{ background: "#1A56A7" }}
        >
          Отправить заявку
        </motion.button>
        <p className="text-xs text-gray-400 text-center sm:text-left">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных
        </p>
      </div>
    </form>
  );
}
