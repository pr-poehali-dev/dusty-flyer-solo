import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "URBAN GRAPHIC TEE",
    price: 3490,
    oldPrice: 4990,
    image: "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/bcf6bd8e-cc86-420b-8f1c-af46415455f0.jpg",
    tag: "HIT",
    tagColor: "#FF3B3B",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Оверсайз-футболка с ярким урбан-принтом. 100% хлопок.",
    category: "tee",
  },
  {
    id: 2,
    name: "NEON HOODIE DROP",
    price: 6990,
    oldPrice: null,
    image: "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/6daebb63-7b43-4bbe-907b-6ec1f1b928a6.jpg",
    tag: "NEW",
    tagColor: "#FFD700",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Толстовка оверсайз с неоновым принтом. Начёс внутри.",
    category: "hoodie",
  },
  {
    id: 3,
    name: "CARGO FLEX PANTS",
    price: 5490,
    oldPrice: 7200,
    image: "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/5b5c5432-0ec8-4dfd-88ae-ca05043e0407.jpg",
    tag: "SALE",
    tagColor: "#FF3B3B",
    sizes: ["XS", "S", "M", "L"],
    description: "Карго-штаны с геометричным узором. Эластичный пояс.",
    category: "pants",
  },
  {
    id: 4,
    name: "GEOMETRIC JACKET",
    price: 9990,
    oldPrice: null,
    image: "https://cdn.poehali.dev/projects/9efec3ac-78fb-43c5-ac13-9d68b82bd856/files/f89f3a98-8dc4-48bf-b4f8-2b95e4baa3ee.jpg",
    tag: "DROP",
    tagColor: "#FFD700",
    sizes: ["S", "M", "L", "XL"],
    description: "Куртка с геометрическим паттерном. Лимитированная коллекция.",
    category: "jacket",
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type Page = "catalog" | "contacts" | "checkout";

export default function Index() {
  const [page, setPage] = useState<Page>("catalog");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [orderDone, setOrderDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", comment: "" });
  const [filter, setFilter] = useState("all");

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    const size = selectedSizes[product.id] || product.sizes[2];
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) return prev.map((i) => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, size, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const changeQty = (id: number, size: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id && i.size === size ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const filteredProducts = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderDone(true);
    setCart([]);
  };

  const navLinks: { label: string; key: Page }[] = [
    { label: "КАТАЛОГ", key: "catalog" },
    { label: "КОНТАКТЫ", key: "contacts" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--dark)", color: "#F5F5F5" }}>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "var(--dark)", borderBottom: "1px solid #1E1E1E" }}
      >
        <button
          onClick={() => setPage("catalog")}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "var(--neon)", letterSpacing: "0.05em" }}
        >
          DRIP<span style={{ color: "#F5F5F5" }}>STORE</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.key}
              onClick={() => setPage(l.key)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1rem",
                letterSpacing: "0.1em",
                color: page === l.key ? "var(--neon)" : "#999",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 transition-all"
          style={{ border: "1px solid #333", color: "#F5F5F5" }}
        >
          <Icon name="ShoppingBag" size={18} />
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.85rem", fontWeight: 700 }}>
            Корзина
          </span>
          {totalQty > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-black"
              style={{ background: "var(--neon)", color: "#0D0D0D", borderRadius: "50%" }}
            >
              {totalQty}
            </span>
          )}
        </button>
      </nav>

      {/* MARQUEE BANNER */}
      <div
        className="overflow-hidden py-2 mt-[65px]"
        style={{ background: "var(--neon)", color: "#0D0D0D" }}
      >
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", padding: "0 24px" }}
            >
              НОВАЯ КОЛЛЕКЦИЯ &nbsp;★&nbsp; FREE ДОСТАВКА ОТ 5000₽ &nbsp;★&nbsp; STREETWEAR DROP 2026 &nbsp;★&nbsp; BOLD IS THE NEW NORMAL &nbsp;★&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* CART OVERLAY */}
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />

      {/* CART SIDEBAR */}
      <div className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #222" }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.05em" }}>
            КОРЗИНА {totalQty > 0 && <span style={{ color: "var(--neon)" }}>({totalQty})</span>}
          </span>
          <button onClick={() => setCartOpen(false)}>
            <Icon name="X" size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4" style={{ opacity: 0.4 }}>
              <Icon name="ShoppingBag" size={48} />
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.1em" }}>
                КОРЗИНА ПУСТА
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-3" style={{ borderBottom: "1px solid #1E1E1E", paddingBottom: "16px" }}>
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.05em" }}>{item.name}</div>
                  <div className="text-xs mt-1" style={{ color: "#666" }}>Размер: <span style={{ color: "var(--neon)" }}>{item.size}</span></div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => changeQty(item.id, item.size, -1)} className="w-6 h-6 flex items-center justify-center text-sm" style={{ border: "1px solid #333" }}>−</button>
                      <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                      <button onClick={() => changeQty(item.id, item.size, 1)} className="w-6 h-6 flex items-center justify-center text-sm" style={{ border: "1px solid #333" }}>+</button>
                    </div>
                    <span className="font-black text-sm">{(item.price * item.qty).toLocaleString("ru")} ₽</span>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id, item.size)} className="self-start mt-1" style={{ opacity: 0.3 }}>
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: "1px solid #222" }}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold" style={{ color: "#999" }}>ИТОГО</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem" }}>{totalPrice.toLocaleString("ru")} ₽</span>
            </div>
            <button
              className="btn-neon"
              onClick={() => { setCartOpen(false); setPage("checkout"); }}
              style={{ width: "100%", clipPath: "none" }}
            >
              ОФОРМИТЬ ЗАКАЗ
            </button>
          </div>
        )}
      </div>

      {/* CATALOG PAGE */}
      {page === "catalog" && (
        <div>
          {/* HERO */}
          <section className="relative overflow-hidden" style={{ minHeight: "75vh", display: "flex", alignItems: "center" }}>
            <div
              className="absolute inset-0 -z-10"
              style={{ background: "linear-gradient(135deg, #0D0D0D 0%, #141414 50%, #1a1200 100%)" }}
            />
            <div
              className="absolute top-0 right-0 w-1/2 h-full -z-10"
              style={{ background: "radial-gradient(ellipse at right, rgba(255,215,0,0.12) 0%, transparent 70%)" }}
            />
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
              <div>
                <div
                  className="inline-block mb-4 px-4 py-1 text-xs font-black tracking-widest"
                  style={{ background: "#FF3B3B", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.15em" }}
                >
                  ★ SPRING DROP 2026
                </div>
                <h1
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(4rem, 10vw, 8rem)",
                    lineHeight: 0.9,
                    letterSpacing: "0.02em",
                  }}
                >
                  БУДЬ<br />
                  <span style={{ color: "var(--neon)" }}>ВНЕ</span><br />
                  ПРАВИЛ
                </h1>
                <p className="mt-6 text-base" style={{ color: "#888", maxWidth: "360px", lineHeight: 1.7 }}>
                  Streetwear для тех, кто задаёт тренды. Лимитированные дропы каждую неделю.
                </p>
                <div className="flex gap-4 mt-8 flex-wrap">
                  <button
                    className="btn-neon"
                    onClick={() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    СМОТРЕТЬ КОЛЛЕКЦИЮ
                  </button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <img
                  src={PRODUCTS[1].image}
                  alt="hero"
                  className="w-full object-cover"
                  style={{ maxHeight: "500px", objectPosition: "top", filter: "contrast(1.05) saturate(1.1)" }}
                />
                <div
                  className="absolute bottom-4 left-4 px-4 py-3"
                  style={{ background: "var(--neon)", color: "#0D0D0D" }}
                >
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem" }}>NEON HOODIE DROP</div>
                  <div className="text-sm font-black">6 990 ₽</div>
                </div>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section style={{ background: "var(--surface)", borderTop: "1px solid #1E1E1E", borderBottom: "1px solid #1E1E1E" }}>
            <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { num: "10K+", label: "клиентов" },
                { num: "200+", label: "уникальных принтов" },
                { num: "48ч", label: "доставка" },
                { num: "100%", label: "авторский дизайн" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", color: "var(--neon)" }}>{s.num}</div>
                  <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#666" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CATALOG */}
          <section id="catalog-section" className="container mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="text-xs font-black tracking-widest mb-2" style={{ color: "var(--neon)", fontFamily: "'Bebas Neue', sans-serif" }}>— КАТАЛОГ</div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", lineHeight: 1 }}>
                  ВСЯ КОЛЛЕКЦИЯ
                </h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: "all", label: "ВСЁ" },
                  { key: "tee", label: "ФУТБОЛКИ" },
                  { key: "hoodie", label: "ХУДИ" },
                  { key: "pants", label: "ШТАНЫ" },
                  { key: "jacket", label: "КУРТКИ" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className="size-btn"
                    style={filter === f.key ? { borderColor: "var(--neon)", color: "var(--neon)", background: "rgba(255,215,0,0.08)" } : {}}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div
                      className="card-overlay absolute inset-0 flex items-end justify-center pb-4"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}
                    >
                      <button
                        className="btn-neon text-sm"
                        style={{ clipPath: "none" }}
                        onClick={() => addToCart(product)}
                      >
                        В КОРЗИНУ
                      </button>
                    </div>
                    <div
                      className="absolute top-3 left-3 tag-badge font-black"
                      style={{
                        background: product.tagColor,
                        color: product.tagColor === "#FFD700" ? "#0D0D0D" : "#fff",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                        padding: "2px 10px",
                      }}
                    >
                      {product.tag}
                    </div>
                  </div>
                  <div className="p-4">
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "0.05em" }}>
                      {product.name}
                    </div>
                    <p className="text-xs mt-1 mb-3" style={{ color: "#666", lineHeight: 1.5 }}>{product.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className="size-btn"
                          style={(selectedSizes[product.id] || product.sizes[2]) === size
                            ? { borderColor: "var(--neon)", color: "var(--neon)" }
                            : {}}
                          onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-black text-lg">{product.price.toLocaleString("ru")} ₽</span>
                        {product.oldPrice && (
                          <span className="text-xs line-through ml-2" style={{ color: "#555" }}>
                            {product.oldPrice.toLocaleString("ru")} ₽
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-1 text-sm font-bold"
                        style={{ color: "var(--neon)" }}
                      >
                        <Icon name="Plus" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA BANNER */}
          <section className="mx-6 mb-16 py-16 px-8 relative overflow-hidden" style={{ background: "var(--neon)" }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#0D0D0D", lineHeight: 1.1 }}>
                БЕСПЛАТНАЯ ДОСТАВКА<br />
                <span style={{ fontSize: "0.5em", letterSpacing: "0.2em" }}>ПРИ ЗАКАЗЕ ОТ 5 000 ₽</span>
              </div>
              <button
                className="btn-outline flex-shrink-0"
                style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}
                onClick={() => document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                ВЫБРАТЬ ТОВАР
              </button>
            </div>
          </section>
        </div>
      )}

      {/* CONTACTS PAGE */}
      {page === "contacts" && (
        <div className="container mx-auto px-6 py-24 max-w-2xl">
          <div className="text-xs font-black tracking-widest mb-2" style={{ color: "var(--neon)", fontFamily: "'Bebas Neue', sans-serif" }}>— КОНТАКТЫ</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", lineHeight: 1 }}>
            СВЯЖИСЬ<br />С НАМИ
          </h2>
          <p className="mt-4 mb-12 text-sm" style={{ color: "#777", lineHeight: 1.8 }}>
            Есть вопросы по заказу, размерам или коллаборации? Пиши — ответим быстро.
          </p>

          <div className="grid gap-4 mb-12">
            {[
              { icon: "Mail", label: "Email", value: "hello@dripstore.ru" },
              { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00" },
              { icon: "MapPin", label: "Адрес", value: "Москва, ул. Арбат, 1" },
              { icon: "Clock", label: "Режим работы", value: "Пн–Пт 10:00–19:00" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 p-4" style={{ border: "1px solid #1E1E1E", background: "var(--surface)" }}>
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,215,0,0.1)", color: "var(--neon)" }}>
                  <Icon name={c.icon} size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest mb-0.5" style={{ color: "#555" }}>{c.label.toUpperCase()}</div>
                  <div className="font-semibold text-sm">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #1E1E1E", paddingTop: "32px" }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", marginBottom: "16px" }}>НАПИСАТЬ НАМ</div>
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Сообщение отправлено! Мы свяжемся с вами."); }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Ваше имя"
                required
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ background: "var(--surface2)", border: "1px solid #222", color: "#F5F5F5", fontFamily: "'Manrope', sans-serif" }}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ background: "var(--surface2)", border: "1px solid #222", color: "#F5F5F5", fontFamily: "'Manrope', sans-serif" }}
              />
              <textarea
                placeholder="Ваше сообщение"
                rows={4}
                required
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={{ background: "var(--surface2)", border: "1px solid #222", color: "#F5F5F5", fontFamily: "'Manrope', sans-serif" }}
              />
              <button type="submit" className="btn-neon" style={{ clipPath: "none" }}>
                ОТПРАВИТЬ
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHECKOUT PAGE */}
      {page === "checkout" && (
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {orderDone ? (
            <div className="flex flex-col items-center justify-center text-center py-24 gap-6">
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "5rem", color: "var(--neon)", lineHeight: 1 }}>
                ГОТОВО!
              </div>
              <p className="text-sm" style={{ color: "#777", maxWidth: "400px", lineHeight: 1.8 }}>
                Ваш заказ принят. Мы свяжемся с вами в ближайшее время для подтверждения.
              </p>
              <button className="btn-neon mt-4" style={{ clipPath: "none" }} onClick={() => { setOrderDone(false); setPage("catalog"); }}>
                ВЕРНУТЬСЯ В МАГАЗИН
              </button>
            </div>
          ) : (
            <div>
              <div className="text-xs font-black tracking-widest mb-2" style={{ color: "var(--neon)", fontFamily: "'Bebas Neue', sans-serif" }}>— ОФОРМЛЕНИЕ</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", lineHeight: 1, marginBottom: "32px" }}>
                ВАШ ЗАКАЗ
              </h2>

              <div className="grid md:grid-cols-5 gap-8">
                <form className="md:col-span-3 space-y-4" onSubmit={handleOrder}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "#999", marginBottom: "8px", letterSpacing: "0.1em" }}>
                    ДАННЫЕ ДЛЯ ДОСТАВКИ
                  </div>
                  {[
                    { key: "name", placeholder: "Имя и фамилия", type: "text" },
                    { key: "phone", placeholder: "Телефон", type: "tel" },
                    { key: "email", placeholder: "Email", type: "email" },
                    { key: "address", placeholder: "Адрес доставки (город, улица, дом)", type: "text" },
                  ].map((f) => (
                    <input
                      key={f.key}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      value={form[f.key as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{ background: "var(--surface)", border: "1px solid #222", color: "#F5F5F5", fontFamily: "'Manrope', sans-serif" }}
                    />
                  ))}
                  <textarea
                    placeholder="Комментарий к заказу (необязательно)"
                    rows={3}
                    value={form.comment}
                    onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-4 py-3 text-sm outline-none resize-none"
                    style={{ background: "var(--surface)", border: "1px solid #222", color: "#F5F5F5", fontFamily: "'Manrope', sans-serif" }}
                  />
                  <button type="submit" className="btn-neon" style={{ clipPath: "none", width: "100%" }}>
                    ПОДТВЕРДИТЬ ЗАКАЗ
                  </button>
                  <p className="text-xs text-center" style={{ color: "#444" }}>
                    Нажимая кнопку, вы соглашаетесь с условиями обработки данных
                  </p>
                </form>

                <div className="md:col-span-2">
                  <div className="p-5" style={{ background: "var(--surface)", border: "1px solid #1E1E1E" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "#999", marginBottom: "16px", letterSpacing: "0.1em" }}>
                      СОСТАВ ЗАКАЗА
                    </div>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-14 object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold truncate" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
                              {item.name}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: "#555" }}>{item.size} × {item.qty}</div>
                          </div>
                          <div className="text-sm font-black flex-shrink-0">{(item.price * item.qty).toLocaleString("ru")} ₽</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: "1px solid #222", marginTop: "16px", paddingTop: "16px" }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs" style={{ color: "#666" }}>Товары</span>
                        <span className="text-sm font-bold">{totalPrice.toLocaleString("ru")} ₽</span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs" style={{ color: "#666" }}>Доставка</span>
                        <span className="text-sm font-bold" style={{ color: totalPrice >= 5000 ? "var(--neon)" : "#F5F5F5" }}>
                          {totalPrice >= 5000 ? "БЕСПЛАТНО" : "300 ₽"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center" style={{ borderTop: "1px solid #222", paddingTop: "12px" }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem" }}>ИТОГО</span>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: "var(--neon)" }}>
                          {(totalPrice + (totalPrice >= 5000 ? 0 : 300)).toLocaleString("ru")} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="mt-3 text-xs font-semibold flex items-center gap-1"
                    style={{ color: "#555" }}
                    onClick={() => { setPage("catalog"); setCartOpen(true); }}
                  >
                    <Icon name="ArrowLeft" size={12} /> Изменить корзину
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1E1E1E", background: "var(--surface)" }}>
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem" }}>
            DRIP<span style={{ color: "var(--neon)" }}>STORE</span>
          </div>
          <div className="flex gap-6">
            {navLinks.map((l) => (
              <button
                key={l.key}
                onClick={() => setPage(l.key)}
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#555", letterSpacing: "0.1em" }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="text-xs" style={{ color: "#333" }}>
            © 2026 DRIPSTORE. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}