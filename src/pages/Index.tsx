import { useState } from "react";
import Icon from "@/components/ui/icon";

const MAIN_IMAGE = "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/ef13f638-e2ae-4db8-8eab-f9f45eb49e81.jpg";
const LIFESTYLE_IMAGE = "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/b4467fc6-d5a1-4022-9902-f972e4b31236.jpg";

const THUMBS = [
  { id: 0, src: MAIN_IMAGE, label: "Flat lay" },
  { id: 1, src: "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/bcf6bd8e-cc86-420b-8f1c-af46415455f0.jpg", label: "Print close" },
  { id: 2, src: LIFESTYLE_IMAGE, label: "Lifestyle" },
  { id: 3, src: "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/6daebb63-7b43-4bbe-907b-6ec1f1b928a6.jpg", label: "Interior" },
];

const SIZES = ["С", "М", "Л", "XL", "XXL", "XXXL"];

const PLANES = [
  "Cessna 172", "Cessna 152", "Piper PA-28", "Beechcraft Bonanza",
  "Cirrus SR22", "Diamond DA40", "Mooney M20", "Другое (три точки…)",
];

const COLOR_SCHEMES = [
  { id: "red-blue",    colors: ["#b91c1c", "#1d4ed8"] },
  { id: "navy-gold",   colors: ["#1e3a5f", "#c8a731"] },
  { id: "teal-slate",  colors: ["#0f766e", "#475569"] },
  { id: "pink-purple", colors: ["#db2777", "#7c3aed"] },
  { id: "white",       colors: ["#ffffff"] },
  { id: "navy-red",    colors: ["#1e3a5f", "#b91c1c"] },
  { id: "rose-navy",   colors: ["#e11d48", "#1e3a5f"] },
  { id: "navy-khaki",  colors: ["#1e3a5f", "#78716c"] },
  { id: "slate-navy",  colors: ["#475569", "#1e3a5f"] },
  { id: "crossed",     colors: ["#b91c1c", "#1e3a5f", "diagonal"] },
];

const TAIL_COLORS = [
  "#ffffff", "#111827", "#b91c1c", "#db2777", "#f59e0b",
  "#92400e", "#f97316", "#1d4ed8", "#06b6d4", "#0f766e",
];

const STYLE_THUMBS = [
  { id: 0, label: "Классик" },
  { id: 1, label: "Ретро" },
  { id: 2, label: "Боулд" },
  { id: 3, label: "Минимал" },
  { id: 4, label: "Нео" },
];

const LIVERY_ROWS = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  ["more"],
];

export default function Index() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [size, setSize] = useState("М");
  const [styleId, setStyleId] = useState(0);
  const [dateFmt, setDateFmt] = useState("us");
  const [soloDate, setSoloDate] = useState("");
  const [plane, setPlane] = useState("Cessna 172");
  const [colorScheme, setColorScheme] = useState("red-blue");
  const [livery, setLivery] = useState(0);
  const [tailNum, setTailNum] = useState("N75200");
  const [tailColor, setTailColor] = useState("#111827");
  const [studentName, setStudentName] = useState("");
  const [cfiName, setCfiName] = useState("");
  const [airport, setAirport] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [qty, setQty] = useState(1);
  const [descOpen, setDescOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [cartMsg, setCartMsg] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const PRICE = 34.80;
  const OLD_PRICE = 43.00;
  const DISCOUNT = Math.round(100 - (PRICE / OLD_PRICE) * 100);

  function handleAddToCart() {
    setCartMsg(true);
    setTimeout(() => setCartMsg(false), 3000);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111827" }}>

      {/* HEADER */}
      <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fff", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{
                width: 48, height: 48,
                background: "#1e3a5f",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 900, fontSize: "0.65rem", textAlign: "center", lineHeight: 1.2,
                letterSpacing: "0.02em"
              }}>
                DUSTY<br/>FLYER
              </div>
              <span style={{ fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "#1e3a5f" }}>
                Dusty Flyer
              </span>
            </div>

            {/* Nav desktop */}
            <nav style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }} className="hidden md:flex">
              {["Дом", "Америка250", "Футболки на заказ", "Декор для стен", "Футболки ▾", "О ▾"].map((item) => (
                <span key={item} className="nav-link" style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}>{item}</span>
              ))}
              <span className="nav-link" style={{ fontSize: "0.82rem" }}>Посмотреть все</span>
            </nav>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "right", lineHeight: 1.4 }} className="hidden md:block">
                Соединённые Штаты | USD $
              </div>
              <Icon name="Search" size={20} style={{ color: "#374151", cursor: "pointer" }} />
              <Icon name="User" size={20} style={{ color: "#374151", cursor: "pointer" }} />
              <Icon name="ShoppingCart" size={20} style={{ color: "#374151", cursor: "pointer" }} />
              <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                <Icon name="Menu" size={22} />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile nav */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid #e5e7eb", padding: "12px 24px", background: "#fff" }}>
            {["Дом", "Америка250", "Футболки на заказ", "Декор для стен", "Футболки", "О нас", "Посмотреть все"].map((item) => (
              <div key={item} style={{ padding: "8px 0", fontSize: "0.875rem", color: "#374151", cursor: "pointer", borderBottom: "1px solid #f3f4f6" }}>{item}</div>
            ))}
          </div>
        )}
      </header>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 24px", fontSize: "0.75rem", color: "#9ca3af" }}>
        <span className="nav-link">flicker.com</span>
      </div>

      {/* PRODUCT */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}
             className="block md:grid">

          {/* LEFT: Gallery */}
          <div>
            {/* Main image */}
            <div style={{ position: "relative", background: "#f9fafb", borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
              <img
                src={THUMBS[activeThumb].src}
                alt="product"
                style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }}
              />
              <button
                onClick={() => setActiveThumb((p) => Math.max(0, p - 1))}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "1px solid #e5e7eb", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <Icon name="ChevronLeft" size={18} />
              </button>
              <button
                onClick={() => setActiveThumb((p) => Math.min(THUMBS.length - 1, p + 1))}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "1px solid #e5e7eb", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
            {/* Thumbnails */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {THUMBS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setActiveThumb(t.id)}
                  style={{
                    borderRadius: 6, overflow: "hidden", cursor: "pointer", aspectRatio: "1/1",
                    border: activeThumb === t.id ? "2px solid #1a56db" : "2px solid #e5e7eb",
                    transition: "border-color 0.15s"
                  }}
                >
                  <img src={t.src} alt={t.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div style={{ paddingTop: 4 }}>
            {/* Title */}
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.3, marginBottom: 12, color: "#111827" }}>
              Футболка «Первый пилот-одиночка» (с персонализацией)
            </h1>

            {/* Tax/shipping */}
            <p style={{ fontSize: "0.78rem", color: "#6b7280", marginBottom: 10 }}>
              Налоги включены.{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Стоимость доставки</span>{" "}
              рассчитывается при оформлении заказа.
            </p>

            {/* Shop Pay */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, fontSize: "0.78rem", color: "#6b7280" }}>
              <span>Оплата в рассрочку для заказов свыше</span>
              <strong style={{ color: "#5a31f4" }}>35,00 $</strong>
              <span>с</span>
              <span style={{ background: "#5a31f4", color: "#fff", borderRadius: 3, padding: "1px 6px", fontWeight: 700, fontSize: "0.7rem" }}>shop</span>
              <span style={{ color: "#5a31f4", fontWeight: 600 }}>Pay</span>
              <span style={{ color: "#5a31f4", textDecoration: "underline", cursor: "pointer" }}>Узнать больше</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#b91c1c" }}>
                {PRICE.toFixed(2)} долларов США
              </span>
              <span style={{ fontSize: "0.95rem", color: "#9ca3af", textDecoration: "line-through" }}>
                {OLD_PRICE.toFixed(2)} долларов США
              </span>
              <span className="discount-badge">Экономия {DISCOUNT}%</span>
            </div>

            {/* Available products */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", color: "#374151", marginBottom: 8, textTransform: "uppercase" }}>
                Доступные товары
              </div>
              <select
                className="form-input"
                style={{ maxWidth: 320 }}
                defaultValue="premium"
              >
                <option value="premium">Футболка (премиум-класса, унис…</option>
                <option value="hoodie">Худи (премиум-класса)</option>
                <option value="long">Лонгслив</option>
              </select>
            </div>

            {/* Size */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", color: "#374151", marginBottom: 8, textTransform: "uppercase" }}>
                Размер
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`size-pill${size === s ? " active" : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* PERSONALIZE */}
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ background: "#f9fafb", padding: "14px 16px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textAlign: "center", textTransform: "uppercase", color: "#111827", borderBottom: "1px solid #e5e7eb" }}>
                Персонализировать
              </div>
              <div style={{ padding: "16px" }}>

                {/* Style */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Стиль дизайна <span className="req">*</span></div>
                  <div className="thumb-grid">
                    {STYLE_THUMBS.map((st) => (
                      <img
                        key={st.id}
                        src={MAIN_IMAGE}
                        alt={st.label}
                        className={`style-thumb${styleId === st.id ? " active" : ""}`}
                        onClick={() => setStyleId(st.id)}
                        title={st.label}
                      />
                    ))}
                  </div>
                  <div className="field-hint">Выберите стиль для своего дизайна</div>
                </div>

                {/* Date format */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Формат даты <span className="req">*</span></div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button className={`date-fmt-btn${dateFmt === "us" ? " active" : ""}`} onClick={() => setDateFmt("us")}>
                      ММ.ДД.ГГГГ (США)
                    </button>
                    <button className={`date-fmt-btn${dateFmt === "eu" ? " active" : ""}`} onClick={() => setDateFmt("eu")}>
                      ДД.ММ.ГГГГ (ЕС)
                    </button>
                  </div>
                </div>

                {/* Solo date */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Первое самостоятельное свидание <span className="req">*</span></div>
                  <p style={{ fontSize: "0.78rem", color: "#9ca3af", marginBottom: 6, fontStyle: "italic" }}>
                    {dateFmt === "us" ? "17.12.1903" : "12.17.1903"}
                  </p>
                  <input
                    type="date"
                    className="form-input"
                    value={soloDate}
                    onChange={(e) => setSoloDate(e.target.value)}
                    style={{ maxWidth: 200 }}
                  />
                  <div className="field-hint">Выберите своё первое свидание наедине.</div>
                </div>

                {/* Plane */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Самолёт <span className="req">*</span></div>
                  <select className="form-input" value={plane} onChange={(e) => setPlane(e.target.value)}>
                    {PLANES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <div className="field-hint">Выберите модель вашего самолета</div>
                </div>

                {/* Color scheme */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Схема окраски <span className="req">*</span></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {COLOR_SCHEMES.map((cs) => (
                      <div
                        key={cs.id}
                        onClick={() => setColorScheme(cs.id)}
                        className="color-swatch"
                        style={{
                          background: cs.colors.length === 1
                            ? cs.colors[0]
                            : `linear-gradient(135deg, ${cs.colors[0]} 50%, ${cs.colors[1] || cs.colors[0]} 50%)`,
                          border: colorScheme === cs.id ? "3px solid #1a56db" : "3px solid #e5e7eb",
                          boxShadow: cs.colors[0] === "#ffffff" ? "inset 0 0 0 1px #d1d5db" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <div className="field-hint">Выберите цветовую схему вашего самолета.</div>
                </div>

                {/* Livery */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Тип конской униформы <span className="req">*</span></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        onClick={() => setLivery(i)}
                        className={`livery-thumb`}
                        style={{
                          border: livery === i ? "2px solid #1a56db" : "2px solid #e5e7eb",
                        }}
                      >
                        <img src={MAIN_IMAGE} alt={`livery-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                      </div>
                    ))}
                    <div
                      onClick={() => setLivery(10)}
                      className="livery-thumb"
                      style={{ border: livery === 10 ? "2px solid #1a56db" : "2px solid #e5e7eb", fontSize: "1.2rem", color: "#6b7280" }}
                    >
                      •••
                    </div>
                  </div>
                  <div className="field-hint">Выберите стиль</div>
                </div>

                {/* Tail number */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Номер хвостового оперения <span className="req">*</span></div>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      className="form-input"
                      value={tailNum}
                      maxLength={7}
                      onChange={(e) => setTailNum(e.target.value.toUpperCase())}
                      placeholder="N75200"
                    />
                    <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: "0.72rem", color: "#9ca3af" }}>
                      {tailNum.length}/7
                    </span>
                  </div>
                </div>

                {/* Tail color */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Цвет бортового номера</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {TAIL_COLORS.map((c) => (
                      <div
                        key={c}
                        onClick={() => setTailColor(c)}
                        className="color-swatch"
                        style={{
                          background: c,
                          border: tailColor === c ? "3px solid #1a56db" : "3px solid #e5e7eb",
                          boxShadow: c === "#ffffff" ? "inset 0 0 0 1px #d1d5db" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Student name */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Имя студента-пилота <span className="req">*</span></div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Орвилл Райт"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                  <div className="field-hint">Введите имя пилота-стажера.</div>
                </div>

                {/* CFI name */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Имя CFI <span className="req">*</span></div>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Георгий Цыфаркин"
                    value={cfiName}
                    onChange={(e) => setCfiName(e.target.value)}
                  />
                  <div className="field-hint">Введите имя преподавателя</div>
                </div>

                {/* Airport */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Аэропорт (ИКАО) <span className="req">*</span></div>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="КФФА"
                      value={airport}
                      maxLength={4}
                      onChange={(e) => setAirport(e.target.value.toUpperCase())}
                    />
                    <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: "0.72rem", color: "#9ca3af" }}>
                      {airport.length}/4
                    </span>
                  </div>
                  <div className="field-hint">Введите код ИКАО (например, KFFA)</div>
                </div>

                {/* Agree */}
                <label style={{ display: "flex", gap: 10, fontSize: "0.8rem", color: "#374151", cursor: "pointer", lineHeight: 1.5 }}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    style={{ marginTop: 2, flexShrink: 0 }}
                  />
                  Вы несёте ответственность за предоставление корректной информации для персонализации перед нажатием кнопки «Купить сейчас».
                </label>
              </div>
            </div>

            {/* Quantity + buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span style={{ minWidth: 32, textAlign: "center", fontWeight: 600, fontSize: "1rem" }}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <button className="btn-add-cart" onClick={handleAddToCart}>
                ДОБАВИТЬ В КОРЗИНУ
              </button>
              <button className="btn-buy-now">
                КУПИТЬ СЕЙЧАС
              </button>
            </div>

            {cartMsg && (
              <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 6, padding: "10px 14px", fontSize: "0.85rem", color: "#15803d", marginBottom: 12 }}>
                ✓ Товар добавлен в корзину!
              </div>
            )}

            {/* Share */}
            <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "#6b7280", background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
              <Icon name="Share2" size={14} /> Поделиться
            </button>

            {/* Description accordion */}
            <button className="section-toggle" onClick={() => setDescOpen(!descOpen)}>
              <span>ОПИСАНИЕ</span>
              <Icon name={descOpen ? "ChevronUp" : "ChevronDown"} size={18} />
            </button>
            {descOpen && (
              <div style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "#374151", paddingBottom: 16 }}>
                <p style={{ marginBottom: 10 }}>
                  Создайте по-настоящему персонализированную футболку, указав каждую деталь: имена пилота и инструктора, модель самолёта, схему окраски, код аэропорта ИКАО и дату полёта — превратив этот незабываемый момент в вещь, которую вы сможете носить долгие годы.
                </p>
                <p style={{ marginBottom: 10 }}>
                  Если вы не видите свой самолёт или схему окраски, просто выберите «Другое (три точки…)», загрузите фотографию, и наш художник перерисует её в нашем фирменном стиле — мы изготовим для вас уникальную футболку на заказ.
                </p>
                <p style={{ marginBottom: 6, fontWeight: 700 }}>✦ Премиум качество — Сделано в США</p>
                <p style={{ marginBottom: 6 }}>
                  Эта лёгкая футболка весом 4,2 унции, изготовленная из исключительно мягкого 100% чёсаного и кольцевого хлопка <em>Airlume</em>, обеспечивает комфорт в течение всего дня и приятные тактильные ощущения.
                </p>
                <p>
                  Печать выполнена с использованием высококачественной технологии DTG, что гарантирует чёткость, яркость и долговечность.
                </p>
              </div>
            )}

            {/* Shipping accordion */}
            <button className="section-toggle" onClick={() => setShippingOpen(!shippingOpen)}>
              <span>ДОСТАВКА И ВОЗВРАТ</span>
              <Icon name={shippingOpen ? "ChevronUp" : "ChevronDown"} size={18} />
            </button>
            {shippingOpen && (
              <div style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "#374151", paddingBottom: 16 }}>
                <p style={{ marginBottom: 8 }}>🚚 <strong>Бесплатная доставка</strong> по США при заказе от $50</p>
                <p style={{ marginBottom: 8 }}>📦 Срок изготовления: 3–5 рабочих дней</p>
                <p style={{ marginBottom: 8 }}>✈️ Доставка: 5–10 рабочих дней</p>
                <p>↩ Возврат в течение 30 дней при наличии брака производителя. Персонализированные товары возврату не подлежат.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", background: "#f9fafb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", color: "#1e3a5f", marginBottom: 12, letterSpacing: "0.05em" }}>
              DUSTY FLYER
            </div>
            <p style={{ fontSize: "0.8rem", color: "#6b7280", maxWidth: 240, lineHeight: 1.6 }}>
              Авиационные подарки и одежда для пилотов и любителей авиации.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { title: "Магазин", links: ["Футболки на заказ", "Декор для стен", "Все товары"] },
              { title: "Помощь", links: ["Доставка", "Возврат", "Контакты"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10, color: "#374151" }}>{col.title}</div>
                {col.links.map((l) => (
                  <div key={l} style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: 6, cursor: "pointer" }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1280, margin: "24px auto 0", borderTop: "1px solid #e5e7eb", paddingTop: 16, fontSize: "0.75rem", color: "#9ca3af", textAlign: "center" }}>
          © 2026 Dusty Flyer. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
