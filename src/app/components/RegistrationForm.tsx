import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { User, Phone, Mail, Calendar, BookOpen, CheckCircle2, AlertCircle } from "lucide-react";

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

const empty: FormState = {
  fullName: "", dob: "", phone: "+7", email: "",
  education: "", specialty: "", studyForm: "",
};

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex items-center gap-1 mt-1 text-xs"
          style={{ color: "#EF4444" }}
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full py-2.5 bg-white border rounded-xl text-gray-900 placeholder:text-gray-400",
    "outline-none transition-all text-sm",
    hasError ? "border-red-400" : "border-gray-300",
  ].join(" ");
}

export function RegistrationForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  /* ── Фильтры ввода ── */

  // ФИО: только кириллица, пробелы, дефисы
  const onFullName = (raw: string) => {
    const filtered = raw.replace(/[^А-ЯЁа-яё\s\-]/g, "");
    setForm((p) => ({ ...p, fullName: filtered }));
    if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
  };

  // Телефон: авто-формат +7 (XXX) XXX-XX-XX
  const onPhone = (raw: string) => {
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith("8") || digits.startsWith("7")) digits = digits.slice(1);
    digits = digits.slice(0, 10);

    let fmt = "+7";
    if (digits.length > 0) fmt += " (" + digits.slice(0, 3);
    if (digits.length >= 3) fmt += ") " + digits.slice(3, 6);
    if (digits.length >= 6) fmt += "-" + digits.slice(6, 8);
    if (digits.length >= 8) fmt += "-" + digits.slice(8, 10);

    setForm((p) => ({ ...p, phone: fmt }));
    if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
  };

  // Email: без пробелов, только допустимые символы
  const onEmail = (raw: string) => {
    const filtered = raw.replace(/[^\w.@+\-]/g, "");
    setForm((p) => ({ ...p, email: filtered }));
    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
  };

  /* ── Валидация ── */
  const validate = (): boolean => {
    const e: FormErrors = {};

    const nameParts = form.fullName.trim().split(/\s+/).filter(Boolean);
    if (nameParts.length < 2) e.fullName = "Введите фамилию и имя";
    else if (form.fullName.trim().length < 5) e.fullName = "Слишком короткое имя";

    if (!form.dob) {
      e.dob = "Укажите дату рождения";
    } else {
      const today = new Date();
      const birth = new Date(form.dob);
      const age = today.getFullYear() - birth.getFullYear() -
        (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);
      if (age < 14) e.dob = "Минимальный возраст — 14 лет";
      else if (age > 60) e.dob = "Проверьте дату рождения";
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 11) e.phone = "Введите полный номер (11 цифр)";

    if (!form.email) {
      e.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      e.email = "Некорректный email адрес";
    }

    if (!form.education) e.education = "Выберите класс окончания";
    if (!form.specialty) e.specialty = "Выберите специальность";
    if (!form.studyForm) e.studyForm = "Выберите форму обучения";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  /* ── Успех ── */
  if (submitted) {
    const firstName = form.fullName.trim().split(/\s+/)[1] || form.fullName.trim().split(/\s+/)[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "#10B98120" }}
        >
          <CheckCircle2 className="w-10 h-10" style={{ color: "#10B981" }} />
        </div>
        <h3 className="text-2xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
          Заявка принята!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-2">
          Спасибо, <span className="font-semibold">{firstName}</span>! Ваша заявка передана в приёмную комиссию.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Мы свяжемся с вами по номеру {form.phone} в течение рабочего дня.
        </p>
        <button
          onClick={() => { setForm(empty); setSubmitted(false); }}
          className="text-white px-8 py-3 rounded-xl font-medium transition-opacity hover:opacity-90"
          style={{ background: "#1A56A7" }}
        >
          Подать ещё одну заявку
        </button>
      </motion.div>
    );
  }

  /* ── Стиль для активного поля ── */
  const borderStyle = (field: string, hasError: boolean) => ({
    borderColor: hasError ? "#EF4444" : focused === field ? "#1A56A7" : "#D1D5DB",
    boxShadow: focused === field && !hasError ? "0 0 0 3px rgba(26,86,167,0.12)" : undefined,
  });

  const focusProps = (field: string) => ({
    onFocus: () => setFocused(field),
    onBlur: () => setFocused(null),
  });

  /* ── Форма ── */
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-5">

        {/* ФИО */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            ФИО <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => onFullName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              maxLength={80}
              className={inputClass(!!errors.fullName) + " pl-9 pr-4"}
              style={borderStyle("fullName", !!errors.fullName)}
              {...focusProps("fullName")}
            />
          </div>
          <FieldError msg={errors.fullName} />
          <p className="text-xs text-gray-400 mt-1">Только буквы кириллицы</p>
        </div>

        {/* Дата рождения */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Дата рождения <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={form.dob}
              onChange={(e) => {
                setForm((p) => ({ ...p, dob: e.target.value }));
                if (errors.dob) setErrors((p) => ({ ...p, dob: undefined }));
              }}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 14))
                .toISOString().split("T")[0]}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 60))
                .toISOString().split("T")[0]}
              className={inputClass(!!errors.dob) + " pl-9 pr-4"}
              style={borderStyle("dob", !!errors.dob)}
              {...focusProps("dob")}
            />
          </div>
          <FieldError msg={errors.dob} />
        </div>

        {/* Телефон */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Телефон <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => onPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className={inputClass(!!errors.phone) + " pl-9 pr-4"}
              style={borderStyle("phone", !!errors.phone)}
              {...focusProps("phone")}
            />
          </div>
          <FieldError msg={errors.phone} />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Email <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => onEmail(e.target.value)}
              placeholder="ivan@example.com"
              className={inputClass(!!errors.email) + " pl-9 pr-4"}
              style={borderStyle("email", !!errors.email)}
              {...focusProps("email")}
            />
          </div>
          <FieldError msg={errors.email} />
        </div>

        {/* Класс окончания */}
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Поступаю после <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <select
            value={form.education}
            onChange={(e) => {
              setForm((p) => ({ ...p, education: e.target.value }));
              if (errors.education) setErrors((p) => ({ ...p, education: undefined }));
            }}
            className={inputClass(!!errors.education) + " px-4"}
            style={borderStyle("education", !!errors.education)}
            {...focusProps("education")}
          >
            <option value="">Выберите класс</option>
            <option value="9">9 класса</option>
            <option value="11">11 класса</option>
          </select>
          <FieldError msg={errors.education} />
        </div>

        {/* Специальность */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Желаемая специальность <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select
              value={form.specialty}
              onChange={(e) => {
                setForm((p) => ({ ...p, specialty: e.target.value }));
                if (errors.specialty) setErrors((p) => ({ ...p, specialty: undefined }));
              }}
              className={inputClass(!!errors.specialty) + " pl-9 pr-4"}
              style={borderStyle("specialty", !!errors.specialty)}
              {...focusProps("specialty")}
            >
              <option value="">Выберите специальность</option>
              {SPECIALTIES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code})
                </option>
              ))}
            </select>
          </div>
          <FieldError msg={errors.specialty} />
        </div>

        {/* Форма обучения */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>
            Форма обучения <span style={{ color: "#EF4444" }}>*</span>
          </label>
          <div className="flex gap-3">
            {["Очная", "Заочная"].map((f) => (
              <label
                key={f}
                className="flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border transition-all text-sm font-medium select-none"
                style={{
                  background: form.studyForm === f ? "#1A56A7" : "white",
                  borderColor: errors.studyForm ? "#EF4444" : form.studyForm === f ? "#1A56A7" : "#D1D5DB",
                  color: form.studyForm === f ? "white" : "#374151",
                }}
              >
                <input
                  type="radio"
                  name="studyForm"
                  value={f}
                  checked={form.studyForm === f}
                  onChange={() => {
                    setForm((p) => ({ ...p, studyForm: f }));
                    if (errors.studyForm) setErrors((p) => ({ ...p, studyForm: undefined }));
                  }}
                  className="hidden"
                />
                {f}
              </label>
            ))}
          </div>
          <FieldError msg={errors.studyForm} />
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto text-white px-10 py-3.5 rounded-xl font-semibold transition-opacity hover:opacity-90 shadow-md"
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
