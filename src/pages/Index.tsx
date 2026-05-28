import { useState } from "react";
import Icon from "@/components/ui/icon";

const LIFESTYLE_IMAGE = "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/b4467fc6-d5a1-4022-9902-f972e4b31236.jpg";
const INTERIOR_IMAGE = "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/6daebb63-7b43-4bbe-907b-6ec1f1b928a6.jpg";

const SIZES = ["С", "М", "Л", "XL", "XXL", "XXXL"];

const PLANES = [
  "Cessna 172", "Cessna 152", "Piper PA-28", "Beechcraft Bonanza",
  "Cirrus SR22", "Diamond DA40", "Mooney M20", "Другое (три точки…)",
];

const COLOR_SCHEMES = [
  { id: "red-blue",    c1: "#b91c1c", c2: "#1d4ed8" },
  { id: "navy-gold",   c1: "#1e3a5f", c2: "#c8a731" },
  { id: "teal-slate",  c1: "#0f766e", c2: "#475569" },
  { id: "pink-purple", c1: "#db2777", c2: "#7c3aed" },
  { id: "white",       c1: "#e5e7eb", c2: "#9ca3af" },
  { id: "navy-red",    c1: "#1e3a5f", c2: "#b91c1c" },
  { id: "rose-navy",   c1: "#e11d48", c2: "#1e3a5f" },
  { id: "navy-khaki",  c1: "#1e3a5f", c2: "#78716c" },
  { id: "slate-navy",  c1: "#475569", c2: "#1e3a5f" },
  { id: "crossed",     c1: "#b91c1c", c2: "#1e3a5f" },
];

const TAIL_COLORS = [
  "#ffffff", "#111827", "#b91c1c", "#db2777", "#f59e0b",
  "#92400e", "#f97316", "#1d4ed8", "#06b6d4", "#0f766e",
];

const STYLE_LABELS = ["Классик", "Ретро", "Боулд", "Минимал", "Нео"];

// SVG preview of the tshirt with live data
function TshirtPreview({ c1, c2, date, plane, studentName, cfiName, airport, tailNum, tailColor }: {
  c1: string; c2: string;
  date: string; plane: string;
  studentName: string; cfiName: string;
  airport: string; tailNum: string; tailColor: string;
}) {
  const displayDate = date || "12.17.1903";
  const displayStudent = studentName || "Орвилл Райт";
  const displayCfi = cfiName || "Георгий Цыфаркин";
  const displayAirport = airport || "КФФА";
  const displayPlane = plane || "Cessna 172";
  const displayTail = tailNum || "N75200";

  return (
    <svg viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      {/* T-shirt shape */}
      <defs>
        <clipPath id="shirtClip">
          <path d="M80,60 L30,100 L65,130 L65,380 L335,380 L335,130 L370,100 L320,60 L270,85 C260,95 250,100 200,100 C150,100 140,95 130,85 Z" />
        </clipPath>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
        </filter>
      </defs>

      {/* shirt body */}
      <path
        d="M80,60 L30,100 L65,130 L65,380 L335,380 L335,130 L370,100 L320,60 L270,85 C260,95 250,100 200,100 C150,100 140,95 130,85 Z"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="2"
        filter="url(#shadow)"
      />
      {/* shirt shading */}
      <path d="M65,130 L65,380 L110,380 L110,130 Z" fill="#e2e8f0" opacity="0.3"/>
      <path d="M335,130 L335,380 L290,380 L290,130 Z" fill="#e2e8f0" opacity="0.3"/>

      {/* === BADGE design === */}
      {/* outer ring */}
      <circle cx="200" cy="230" r="108" fill={c1} />
      <circle cx="200" cy="230" r="100" fill="none" stroke="#fff" strokeWidth="2" opacity="0.4"/>
      <circle cx="200" cy="230" r="95" fill={c2} />
      <circle cx="200" cy="230" r="87" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.5"/>

      {/* inner bg */}
      <circle cx="200" cy="230" r="83" fill="#fff" />

      {/* TOP arc text: TODAY BEGINS */}
      <path id="topArc" d="M 118,200 A 82,82 0 0,1 282,200" fill="none"/>
      <text fontSize="9" fontFamily="Arial Black, Arial" fontWeight="900" fill={c1} letterSpacing="3">
        <textPath href="#topArc" startOffset="50%" textAnchor="middle">TODAY BEGINS</textPath>
      </text>

      {/* FIRST SOLO banner */}
      <rect x="118" y="175" width="164" height="34" rx="4" fill={c1} />
      <text x="200" y="196" textAnchor="middle" fontSize="20" fontFamily="Arial Black, Arial" fontWeight="900" fill="#fff" letterSpacing="1">FIRST SOLO</text>

      {/* Date */}
      <text x="200" y="218" textAnchor="middle" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="700" fill={c1} letterSpacing="1">
        {displayDate}
      </text>

      {/* Plane SVG simplified (Cessna-like) */}
      <g transform="translate(200,240) scale(0.85)">
        {/* fuselage */}
        <ellipse cx="0" cy="0" rx="55" ry="9" fill={c2} />
        {/* nose */}
        <ellipse cx="52" cy="0" rx="8" ry="7" fill={c2} />
        {/* tail fin */}
        <path d="M-50,-9 L-60,-28 L-40,-9 Z" fill={c2} />
        <path d="M-48,9 L-60,24 L-38,9 Z" fill={c2} opacity="0.7"/>
        {/* main wing */}
        <path d="M-10,-9 L-20,-32 L30,-32 L20,-9 Z" fill={c1} />
        <path d="M-10,9 L-20,30 L30,30 L20,9 Z" fill={c1} opacity="0.6"/>
        {/* prop */}
        <circle cx="58" cy="0" r="4" fill="#374151"/>
        <line x1="58" y1="-12" x2="58" y2="12" stroke="#374151" strokeWidth="2.5" strokeLinecap="round"/>
        {/* tail number on fuselage */}
        <text x="-5" y="4" textAnchor="middle" fontSize="6" fontFamily="Arial, sans-serif" fontWeight="700" fill={tailColor === "#ffffff" ? "#374151" : tailColor}>
          {displayTail}
        </text>
      </g>

      {/* Airport badge */}
      <rect x="168" y="254" width="64" height="14" rx="2" fill={c2} opacity="0.9"/>
      <text x="200" y="264" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" fontWeight="700" fill="#fff" letterSpacing="1">
        {displayAirport}
      </text>

      {/* Student pilot line */}
      <text x="200" y="279" textAnchor="middle" fontSize="7.5" fontFamily="Arial, sans-serif" fontWeight="700" fill="#374151">
        Student Pilot: {displayStudent.length > 18 ? displayStudent.slice(0, 18) + "…" : displayStudent}
      </text>

      {/* CFI line */}
      <text x="200" y="291" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" fill="#6b7280">
        CFI: {displayCfi.length > 20 ? displayCfi.slice(0, 20) + "…" : displayCfi}
      </text>

      {/* Plane model */}
      <text x="200" y="303" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" fill="#6b7280" fontStyle="italic">
        {displayPlane.length > 22 ? displayPlane.slice(0, 22) + "…" : displayPlane}
      </text>

      {/* BORN TO FLY bottom banner */}
      <rect x="118" y="308" width="164" height="30" rx="4" fill={c1} />
      <text x="200" y="327" textAnchor="middle" fontSize="18" fontFamily="Arial Black, Arial" fontWeight="900" fill="#fff" letterSpacing="1">BORN TO FLY</text>

      {/* BOTTOM arc text: THE PILOT'S JOURNEY */}
      <path id="botArc" d="M 120,265 A 82,82 0 0,0 280,265" fill="none"/>
      <text fontSize="7.5" fontFamily="Arial, sans-serif" fontWeight="600" fill={c2} letterSpacing="2">
        <textPath href="#botArc" startOffset="50%" textAnchor="middle">THE PILOT'S JOURNEY</textPath>
      </text>

      {/* collar */}
      <path d="M170,60 Q200,80 230,60" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

export default function Index() {
  const [previewMode, setPreviewMode] = useState<"live" | "photo1" | "photo2">("live");
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

  const activeScheme = COLOR_SCHEMES.find((s) => s.id === colorScheme) || COLOR_SCHEMES[0];

  // Format date for display on shirt
  const formatDate = () => {
    if (!soloDate) return "12.17.1903";
    const [y, m, d] = soloDate.split("-");
    return dateFmt === "us" ? `${m}.${d}.${y}` : `${d}.${m}.${y}`;
  };

  function handleAddToCart() {
    setCartMsg(true);
    setTimeout(() => setCartMsg(false), 3000);
  }

  const PHOTO_THUMBS = [
    { id: "live", label: "Превью", isLive: true },
    { id: "photo1", label: "Лайфстайл", src: LIFESTYLE_IMAGE },
    { id: "photo2", label: "Интерьер", src: INTERIOR_IMAGE },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#111827" }}>

      {/* HEADER */}
      <header style={{ borderBottom: "1px solid #e5e7eb", background: "#fff", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <div style={{ width: 48, height: 48, background: "#1e3a5f", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "0.6rem", textAlign: "center", lineHeight: 1.2 }}>
                DUSTY<br/>FLYER
              </div>
              <span style={{ fontWeight: 900, fontSize: "0.85rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "#1e3a5f" }}>Dusty Flyer</span>
            </div>
            <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {["Дом", "Америка250", "Футболки на заказ", "Декор для стен", "Футболки ▾", "О ▾", "Посмотреть все"].map((item) => (
                <span key={item} className="nav-link" style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}>{item}</span>
              ))}
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: "0.75rem", color: "#6b7280", textAlign: "right", lineHeight: 1.4 }} className="hidden md:block">
                Соединённые Штаты | USD $
              </div>
              <Icon name="Search" size={20} />
              <Icon name="User" size={20} />
              <Icon name="ShoppingCart" size={20} />
              <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                <Icon name="Menu" size={22} />
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div style={{ borderTop: "1px solid #e5e7eb", padding: "12px 24px", background: "#fff" }}>
            {["Дом", "Футболки на заказ", "Декор для стен", "Посмотреть все"].map((item) => (
              <div key={item} style={{ padding: "8px 0", fontSize: "0.875rem", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>{item}</div>
            ))}
          </div>
        )}
      </header>

      {/* BREADCRUMB */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "10px 24px", fontSize: "0.75rem", color: "#9ca3af" }}>
        flicker.com
      </div>

      {/* PRODUCT */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="block md:grid">

          {/* LEFT: Gallery */}
          <div style={{ position: "sticky", top: 80 }}>
            {/* Main view */}
            <div style={{ background: previewMode === "live" ? "#f0f4ff" : "#f9fafb", borderRadius: 12, overflow: "hidden", marginBottom: 12, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", border: "1px solid #e5e7eb" }}>
              {previewMode === "live" ? (
                <div style={{ width: "85%", height: "85%" }}>
                  <TshirtPreview
                    c1={activeScheme.c1}
                    c2={activeScheme.c2}
                    date={formatDate()}
                    plane={plane}
                    studentName={studentName}
                    cfiName={cfiName}
                    airport={airport}
                    tailNum={tailNum}
                    tailColor={tailColor}
                  />
                </div>
              ) : (
                <img
                  src={previewMode === "photo1" ? LIFESTYLE_IMAGE : INTERIOR_IMAGE}
                  alt="product"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {previewMode === "live" && (
                <div style={{ position: "absolute", top: 12, left: 12, background: "#1a56db", color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.05em" }}>
                  ● LIVE ПРЕВЬЮ
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {PHOTO_THUMBS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setPreviewMode(t.id as "live" | "photo1" | "photo2")}
                  style={{
                    borderRadius: 6, overflow: "hidden", cursor: "pointer", aspectRatio: "1/1",
                    border: previewMode === t.id ? "2px solid #1a56db" : "2px solid #e5e7eb",
                    transition: "border-color 0.15s",
                    background: t.isLive ? "#f0f4ff" : "#f9fafb",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {t.isLive ? (
                    <div style={{ width: "90%", height: "90%" }}>
                      <TshirtPreview
                        c1={activeScheme.c1}
                        c2={activeScheme.c2}
                        date={formatDate()}
                        plane={plane}
                        studentName={studentName}
                        cfiName={cfiName}
                        airport={airport}
                        tailNum={tailNum}
                        tailColor={tailColor}
                      />
                    </div>
                  ) : (
                    <img src={t.src} alt={t.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
              ))}
            </div>

            <p style={{ fontSize: "0.72rem", color: "#9ca3af", textAlign: "center", marginTop: 8 }}>
              Превью обновляется в реальном времени при заполнении формы
            </p>
          </div>

          {/* RIGHT: Product info */}
          <div style={{ paddingTop: 4 }}>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>
              Футболка «Первый пилот-одиночка» (с персонализацией)
            </h1>
            <p style={{ fontSize: "0.78rem", color: "#6b7280", marginBottom: 10 }}>
              Налоги включены.{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>Стоимость доставки</span>{" "}
              рассчитывается при оформлении заказа.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, fontSize: "0.78rem", color: "#6b7280" }}>
              <span>Оплата в рассрочку от</span>
              <strong style={{ color: "#5a31f4" }}>35,00 $</strong>
              <span style={{ background: "#5a31f4", color: "#fff", borderRadius: 3, padding: "1px 6px", fontWeight: 700, fontSize: "0.7rem" }}>shop</span>
              <span style={{ color: "#5a31f4", fontWeight: 600 }}>Pay</span>
              <span style={{ color: "#5a31f4", textDecoration: "underline", cursor: "pointer" }}>Узнать больше</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#b91c1c" }}>{PRICE.toFixed(2)} долларов США</span>
              <span style={{ fontSize: "0.95rem", color: "#9ca3af", textDecoration: "line-through" }}>{OLD_PRICE.toFixed(2)} долларов США</span>
              <span className="discount-badge">Экономия {DISCOUNT}%</span>
            </div>

            {/* Product type */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", color: "#374151", marginBottom: 8, textTransform: "uppercase" }}>Доступные товары</div>
              <select className="form-input" style={{ maxWidth: 320 }}>
                <option>Футболка (премиум-класса, унис…</option>
                <option>Худи (премиум-класса)</option>
                <option>Лонгслив</option>
              </select>
            </div>

            {/* Size */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.05em", color: "#374151", marginBottom: 8, textTransform: "uppercase" }}>Размер</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {SIZES.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`size-pill${size === s ? " active" : ""}`}>{s}</button>
                ))}
              </div>
            </div>

            {/* PERSONALIZE */}
            <div style={{ border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden", marginBottom: 20 }}>
              <div style={{ background: "#f9fafb", padding: "14px 16px", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", textAlign: "center", textTransform: "uppercase", borderBottom: "1px solid #e5e7eb" }}>
                Персонализировать
              </div>
              <div style={{ padding: "16px" }}>

                {/* Style */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Стиль дизайна <span className="req">*</span></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {STYLE_LABELS.map((label, i) => (
                      <div
                        key={i}
                        onClick={() => setStyleId(i)}
                        style={{
                          width: 52, height: 52, borderRadius: 6, cursor: "pointer",
                          border: styleId === i ? "2px solid #1a56db" : "2px solid #e5e7eb",
                          background: `hsl(${i * 40}, 60%, 92%)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.6rem", fontWeight: 700, color: "#374151", textAlign: "center",
                          transition: "border-color 0.15s",
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="field-hint">Выберите стиль для своего дизайна</div>
                </div>

                {/* Date format */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Формат даты <span className="req">*</span></div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button className={`date-fmt-btn${dateFmt === "us" ? " active" : ""}`} onClick={() => setDateFmt("us")}>ММ.ДД.ГГГГ (США)</button>
                    <button className={`date-fmt-btn${dateFmt === "eu" ? " active" : ""}`} onClick={() => setDateFmt("eu")}>ДД.ММ.ГГГГ (ЕС)</button>
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
                          background: `linear-gradient(135deg, ${cs.c1} 50%, ${cs.c2} 50%)`,
                          border: colorScheme === cs.id ? "3px solid #1a56db" : "3px solid #e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                  <div className="field-hint">Выберите цветовую схему вашего самолета.</div>
                </div>

                {/* Livery */}
                <div style={{ marginBottom: 16 }}>
                  <div className="field-label">Тип ливреи <span className="req">*</span></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        onClick={() => setLivery(i)}
                        style={{
                          width: 60, height: 44, borderRadius: 4, cursor: "pointer",
                          border: livery === i ? "2px solid #1a56db" : "2px solid #e5e7eb",
                          background: `linear-gradient(${i * 36}deg, ${activeScheme.c1}, ${activeScheme.c2})`,
                          transition: "border-color 0.15s",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.65rem", fontWeight: 700, color: "#fff",
                        }}
                      >
                        #{i + 1}
                      </div>
                    ))}
                    <div
                      onClick={() => setLivery(10)}
                      style={{ width: 60, height: 44, borderRadius: 4, cursor: "pointer", border: livery === 10 ? "2px solid #1a56db" : "2px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: "#6b7280", background: "#f9fafb" }}
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

            {/* Qty + buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span style={{ minWidth: 32, textAlign: "center", fontWeight: 600 }}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <button className="btn-add-cart" onClick={handleAddToCart}>ДОБАВИТЬ В КОРЗИНУ</button>
              <button className="btn-buy-now">КУПИТЬ СЕЙЧАС</button>
            </div>

            {cartMsg && (
              <div style={{ background: "#dcfce7", border: "1px solid #16a34a", borderRadius: 6, padding: "10px 14px", fontSize: "0.85rem", color: "#15803d", marginBottom: 12 }}>
                ✓ Товар добавлен в корзину!
              </div>
            )}

            <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "#6b7280", background: "none", border: "none", cursor: "pointer" }}>
              <Icon name="Share2" size={14} /> Поделиться
            </button>

            {/* Description */}
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
                  Если вы не видите свой самолёт или схему окраски, просто выберите «Другое (три точки…)», загрузите фотографию, и наш художник перерисует её в нашем фирменном стиле.
                </p>
                <p style={{ fontWeight: 700, marginBottom: 6 }}>✦ Премиум качество — Сделано в США</p>
                <p>Лёгкая футболка 4,2 унции из 100% чёсаного кольцевого хлопка Airlume. Печать DTG — чёткость и долговечность.</p>
              </div>
            )}

            {/* Shipping */}
            <button className="section-toggle" onClick={() => setShippingOpen(!shippingOpen)}>
              <span>ДОСТАВКА И ВОЗВРАТ</span>
              <Icon name={shippingOpen ? "ChevronUp" : "ChevronDown"} size={18} />
            </button>
            {shippingOpen && (
              <div style={{ fontSize: "0.85rem", lineHeight: 1.75, color: "#374151", paddingBottom: 16 }}>
                <p>🚚 Бесплатная доставка по США от $50</p>
                <p>📦 Изготовление: 3–5 рабочих дней</p>
                <p>✈️ Доставка: 5–10 рабочих дней</p>
                <p>↩ Возврат 30 дней при браке. Персонализированные товары возврату не подлежат.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e7eb", background: "#f9fafb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 24 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", color: "#1e3a5f", marginBottom: 12 }}>DUSTY FLYER</div>
            <p style={{ fontSize: "0.8rem", color: "#6b7280", maxWidth: 240, lineHeight: 1.6 }}>Авиационные подарки и одежда для пилотов и любителей авиации.</p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { title: "Магазин", links: ["Футболки на заказ", "Декор для стен", "Все товары"] },
              { title: "Помощь", links: ["Доставка", "Возврат", "Контакты"] },
            ].map((col) => (
              <div key={col.title}>
                <div style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>{col.title}</div>
                {col.links.map((l) => <div key={l} style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: 6, cursor: "pointer" }}>{l}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1280, margin: "20px auto 0", borderTop: "1px solid #e5e7eb", paddingTop: 16, fontSize: "0.75rem", color: "#9ca3af", textAlign: "center" }}>
          © 2026 Dusty Flyer. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
