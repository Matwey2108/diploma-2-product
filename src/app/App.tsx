import { useState } from "react";
import { ChatWidget } from "./components/ChatWidget";
import { RegistrationForm } from "./components/RegistrationForm";
import {
  GraduationCap, BookOpen, Calendar, FileText, Phone,
  Mail, MapPin, Award, Clock, ExternalLink, Menu, X, Users, ClipboardList,
} from "lucide-react";

const COLLEGE_NAME = "ГАПОУ КК «ЛСПК»";
const COLLEGE_FULL_NAME =
  "Государственное автономное профессиональное образовательное учреждение Краснодарского края «Ленинградский социально-педагогический колледж»";
const COLLEGE_ADDRESS = "ул. Красная, 152, ст. Ленинградская";
const COLLEGE_PHONE = "+7 (86145) 7-01-40";
const ADMISSION_PHONE = "+7 (86145) 7-37-21";
const COLLEGE_EMAIL = "lpk31@mail.ru";
const ADMISSION_EMAIL = "lspk-priem-com@mail.ru";

const programs = [
  { code: "44.02.02", name: "Преподавание в начальных классах", color: "#1A56A7", form: "Очная / Заочная" },
  { code: "44.02.01", name: "Дошкольное образование", color: "#8B5CF6", form: "Очная / Заочная" },
  { code: "44.02.04", name: "Специальное дошкольное образование", color: "#EC4899", form: "Очная" },
  { code: "09.02.07", name: "Информационные системы и программирование", color: "#10B981", form: "Очная" },
  { code: "43.02.14", name: "Гостиничное дело", color: "#F59E0B", form: "Очная / Заочная" },
  { code: "43.02.16", name: "Туризм", color: "#EF4444", form: "Очная / Заочная" },
];

const news = [
  {
    date: "20 мая 2026",
    title: "Приём документов на 2026–2027 учебный год открыт",
    text: "Приёмная комиссия начала приём заявлений от абитуриентов. Документы принимаются с 20 июня по 15 августа.",
  },
  {
    date: "15 мая 2026",
    title: "День открытых дверей в колледже",
    text: "Приглашаем абитуриентов и их родителей на день открытых дверей 1 июня 2026 года в 10:00.",
  },
  {
    date: "10 мая 2026",
    title: "Студенты ЛСПК победили в краевой олимпиаде",
    text: "Наши студенты заняли первое место в краевой олимпиаде по информационным технологиям.",
  },
];

const navLinks = [
  { href: "#about", label: "О колледже" },
  { href: "#programs", label: "Образование" },
  { href: "#admission", label: "Приёмная комиссия" },
  { href: "#news", label: "Новости" },
  { href: "#contacts", label: "Контакты" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#F5F7FA" }}>
      {/* ───── Шапка ───── */}
      <header className="text-white sticky top-0 z-40 shadow-lg" style={{ background: "#0E3D7A" }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center border-2 flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">{COLLEGE_NAME}</div>
              <div className="text-xs leading-tight hidden md:block" style={{ color: "#93C5FD" }}>
                Краснодарский край
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#register"
              className="hidden md:inline-flex text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:opacity-90"
              style={{ background: "#E8A020" }}
            >
              Подать документы
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="lg:hidden border-t px-4 py-3"
            style={{ background: "#0A3268", borderColor: "rgba(255,255,255,0.1)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-sm"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setMenuOpen(false)}
              className="block mt-3 text-white px-4 py-2 rounded-lg text-sm font-semibold text-center"
              style={{ background: "#E8A020" }}
            >
              Подать документы
            </a>
          </div>
        )}
      </header>

      {/* ───── Баннер ───── */}
      <section
        className="text-white py-20"
        style={{ background: "linear-gradient(135deg, #0E3D7A 0%, #1A56A7 60%, #2D7DD2 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-2"
            style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.25)" }}
          >
            <GraduationCap className="w-14 h-14 text-white" />
          </div>
          <div className="text-sm font-medium mb-2" style={{ color: "#93C5FD" }}>
            Основан в 1931 году
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Ленинградский<br />социально-педагогический<br />колледж
          </h1>
          <p className="text-lg mb-2" style={{ color: "#BFDBFE" }}>ГАПОУ КК «ЛСПК»</p>
          <p className="text-base mb-10 max-w-2xl mx-auto" style={{ color: "#93C5FD" }}>
            Качественное профессиональное образование в Краснодарском крае
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#admission"
              className="text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-opacity"
              style={{ background: "#E8A020" }}
            >
              Приёмная комиссия
            </a>
            <a
              href="#programs"
              className="text-white px-8 py-3 rounded-xl font-semibold transition-colors border hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.25)" }}
            >
              Программы обучения
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-16 max-w-2xl mx-auto">
            {[
              { value: "1931", label: "год основания" },
              { value: "6", label: "специальностей" },
              { value: "1000+", label: "студентов" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm mt-1" style={{ color: "#93C5FD" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Быстрые ссылки ───── */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "Расписание", sub: "занятий", color: "#1A56A7", href: "#" },
            { icon: Users, label: "Приёмная", sub: "комиссия", color: "#8B5CF6", href: "#admission" },
            { icon: FileText, label: "Документы", sub: "и справки", color: "#10B981", href: "#" },
            { icon: Phone, label: "Контакты", sub: "колледжа", color: "#E8A020", href: "#contacts" },
          ].map(({ icon: Icon, label, sub, color, href }) => (
            <a
              key={label}
              href={href}
              className="bg-white rounded-xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: `${color}20` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <div className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{label}</div>
              <div className="text-xs text-gray-500">{sub}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ───── О колледже ───── */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: "#1A56A7" }}>
              О нас
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A1A2E" }}>О колледже</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              ГАПОУ КК «Ленинградский социально-педагогический колледж» — одно из старейших учебных
              заведений Краснодарского края, основанное в 1931 году. За более чем 90 лет истории
              колледж подготовил тысячи специалистов в области педагогики, информационных технологий,
              туризма и гостиничного дела.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Обучение ведётся по очной и заочной формам. Принимаем абитуриентов после 9 и 11 классов.
              Очное отделение даёт право на отсрочку от военной службы.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: Award, text: "Государственная лицензия на образовательную деятельность" },
                { icon: GraduationCap, text: "Государственная аккредитация всех программ" },
                { icon: Clock, text: "Режим работы: Пн–Сб 08:00–19:00" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-700">
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: "#1A56A7" }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Директор", value: "Бауэр Г.В.", sub: "Герман Владимирович" },
              { title: "Год основания", value: "1931", sub: "более 90 лет истории" },
              { title: "Форма обучения", value: "2 формы", sub: "Очная и заочная" },
              { title: "Отсрочка от армии", value: "Да", sub: "для очного отделения" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="text-xs text-gray-400 mb-1">{item.title}</div>
                <div className="text-xl font-bold mb-1" style={{ color: "#1A56A7" }}>{item.value}</div>
                <div className="text-xs text-gray-600">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Программы обучения ───── */}
      <section id="programs" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: "#1A56A7" }}>
              Специальности
            </div>
            <h2 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>Программы обучения</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div key={prog.code} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${prog.color}15` }}
                  >
                    <BookOpen className="w-6 h-6" style={{ color: prog.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Код: {prog.code}</div>
                    <h3 className="font-semibold mb-2 leading-snug" style={{ color: "#1A1A2E" }}>
                      {prog.name}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: "#EBF3FF", color: "#1A56A7" }}
                    >
                      {prog.form}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Приёмная комиссия ───── */}
      <section id="admission" className="py-16" style={{ background: "#EBF3FF" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: "#1A56A7" }}>
              Поступление
            </div>
            <h2 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>Приёмная комиссия</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#1A56A715" }}>
                <FileText className="w-6 h-6" style={{ color: "#1A56A7" }} />
              </div>
              <h3 className="font-semibold mb-3" style={{ color: "#1A1A2E" }}>Необходимые документы</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Заявление о приёме</li>
                <li>• Паспорт (оригинал + копия)</li>
                <li>• Аттестат об образовании</li>
                <li>• Медицинская справка 086/у</li>
                <li>• 6 фотографий 3×4 см</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#8B5CF615" }}>
                <Calendar className="w-6 h-6" style={{ color: "#8B5CF6" }} />
              </div>
              <h3 className="font-semibold mb-3" style={{ color: "#1A1A2E" }}>Сроки приёма</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><span className="font-medium">20 июня</span> — начало приёма документов</li>
                <li><span className="font-medium">15 августа</span> — окончание приёма</li>
                <li><span className="font-medium">Август</span> — зачисление</li>
                <li><span className="font-medium">1 сентября</span> — начало занятий</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#10B98115" }}>
                <Phone className="w-6 h-6" style={{ color: "#10B981" }} />
              </div>
              <h3 className="font-semibold mb-3" style={{ color: "#1A1A2E" }}>Контакты комиссии</h3>
              <div className="text-sm text-gray-600 space-y-3">
                <div>
                  <div className="text-xs text-gray-400">Телефон</div>
                  <a href={`tel:${ADMISSION_PHONE}`} className="font-medium hover:underline" style={{ color: "#1A56A7" }}>
                    {ADMISSION_PHONE}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <a href={`mailto:${ADMISSION_EMAIL}`} className="hover:underline" style={{ color: "#1A56A7" }}>
                    {ADMISSION_EMAIL}
                  </a>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Режим работы</div>
                  <div>Пн–Пт: 09:00–17:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Онлайн-заявка ───── */}
      <section id="register" className="py-16" style={{ background: "#F0F5FF" }}>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "#1A56A715" }}
            >
              <ClipboardList className="w-7 h-7" style={{ color: "#1A56A7" }} />
            </div>
            <div className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: "#1A56A7" }}>
              Поступление онлайн
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#1A1A2E" }}>
              Онлайн-заявка на поступление
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Заполните форму — приёмная комиссия свяжется с вами в течение рабочего дня
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* ───── Новости ───── */}
      <section id="news" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-sm font-semibold mb-1 uppercase tracking-wide" style={{ color: "#1A56A7" }}>
                Актуально
              </div>
              <h2 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>Новости колледжа</h2>
            </div>
            <button className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: "#1A56A7" }}>
              Все новости <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-1.5" style={{ background: i === 0 ? "#1A56A7" : i === 1 ? "#8B5CF6" : "#10B981" }} />
                <div className="p-6">
                  <div className="text-xs text-gray-400 mb-2">{item.date}</div>
                  <h3 className="font-semibold mb-2 leading-snug" style={{ color: "#1A1A2E" }}>{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Контакты ───── */}
      <section id="contacts" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: "#1A56A7" }}>
              Связаться с нами
            </div>
            <h2 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>Контакты</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: "Адрес", value: COLLEGE_ADDRESS, sub: "353740, Краснодарский край", color: "#1A56A7" },
              { icon: Phone, label: "Телефон", value: COLLEGE_PHONE, sub: `Приёмная: ${ADMISSION_PHONE}`, color: "#10B981" },
              { icon: Mail, label: "Email", value: COLLEGE_EMAIL, sub: ADMISSION_EMAIL, color: "#8B5CF6" },
              { icon: Clock, label: "Режим работы", value: "Пн–Сб: 8:00–19:00", sub: "Воскресенье: выходной", color: "#E8A020" },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div key={label} className="text-center p-6 rounded-xl" style={{ background: "#F5F7FA" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${color}15` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="text-xs text-gray-400 mb-1">{label}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: "#1A1A2E" }}>{value}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Подвал ───── */}
      <footer className="text-white py-10" style={{ background: "#0E3D7A" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">{COLLEGE_NAME}</div>
                  <div className="text-xs" style={{ color: "#93C5FD" }}>с 1931 года</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#93C5FD" }}>{COLLEGE_FULL_NAME}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="block text-sm transition-colors hover:text-white" style={{ color: "#93C5FD" }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm" style={{ color: "#93C5FD" }}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>ст. Ленинградская, ул. Красная, 152</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{COLLEGE_PHONE}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{COLLEGE_EMAIL}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="text-sm" style={{ color: "#93C5FD" }}>
              © 2026 ГАПОУ КК «ЛСПК». Все права защищены.
            </div>
            <div className="flex items-center gap-4 text-sm" style={{ color: "#93C5FD" }}>
              <span>Telegram: @GAPOUlspk1931</span>
              <span>ОК: ok.ru/lspk1931</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ───── Чат-виджет ───── */}
      <ChatWidget />
    </div>
  );
}
