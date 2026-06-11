import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CATEGORIES, DISHES, type Dish } from "@/data/menu";
import { DishCard } from "@/components/DishCard";
import { DishDetail } from "@/components/DishDetail";
import { ARViewer } from "@/components/ARViewer";
import cafeInterior from "@/assets/cafe-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cafe Buddy's Espresso — Best Cafe in Ambegaon, Pune" },
      {
        name: "description",
        content:
          "Specialty coffee, artisan bites and an AR-powered menu at Cafe Buddy's Espresso in Ambegaon Budruk, Pune. View dishes in 3D before you order.",
      },
      { property: "og:title", content: "Cafe Buddy's Espresso — Ambegaon, Pune" },
      {
        property: "og:description",
        content: "Specialty coffee and an AR-powered menu in Ambegaon Budruk.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [arDish, setArDish] = useState<Dish | null>(null);

  const filtered = useMemo(
    () => DISHES.filter((d) => d.category === activeCategory),
    [activeCategory],
  );

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <div className="min-h-screen bg-coffee-100 font-sans text-coffee-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-40 px-6 py-4 flex justify-between items-center bg-coffee-100/80 backdrop-blur-md border-b border-coffee-900/5">
        <a href="#top" className="font-display text-2xl font-bold tracking-tight text-coffee-900">
          Buddy's<span className="text-accent">.</span>
        </a>
        <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest">
          <a href="#menu" className="text-accent">Menu</a>
          <a href="#experience" className="opacity-50 hover:opacity-100 transition-opacity">Experience</a>
          <a href="#visit" className="opacity-50 hover:opacity-100 transition-opacity">Visit</a>
        </div>
        <div className="text-right">
          <div className="text-[9px] uppercase tracking-widest text-coffee-800/50">Rated</div>
          <div className="text-xs font-bold">4.7 ★ · 199 reviews</div>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="relative pt-32 pb-24 px-6 overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 -z-10"
        >
          <img
            src={cafeInterior}
            alt="Cafe Buddy's Espresso interior"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-100 via-coffee-100/40 to-coffee-100" />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-coffee-800/60"
          >
            <span className="w-8 h-px bg-accent" />
            Ambegaon Budruk · Pune
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl leading-[0.9] text-balance"
          >
            The Art of <br />
            <span className="italic text-accent">Daily Rituals</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-md text-lg text-coffee-800/70 leading-relaxed"
          >
            Cafe Buddy's Espresso — Ambegaon's sanctuary for specialty beans and artisan bites.
            कैफे बडी'स एस्प्रेसो. Crafted with patience, served with soul.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#menu"
              className="px-7 py-3.5 rounded-full bg-coffee-900 text-coffee-100 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-coffee-900 transition-colors"
            >
              Explore Menu
            </a>
            <a
              href="#experience"
              className="px-7 py-3.5 rounded-full border border-coffee-900/15 text-xs font-bold uppercase tracking-widest hover:bg-coffee-900/5 transition-colors"
            >
              Try AR Preview
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl"
          >
            {[
              ["4.7★", "199 reviews"],
              ["10 AM", "Opens daily"],
              ["3D · AR", "Menu preview"],
              ["Dine-in", "Drive · Delivery"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-display text-2xl text-coffee-900">{k}</div>
                <div className="text-[10px] uppercase tracking-widest text-coffee-800/50 mt-1">{v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Menu */}
      <section id="menu" className="px-6 py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">The Menu</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3">Made with intent.</h2>
            </div>
            <p className="text-sm text-coffee-800/60 max-w-sm">
              Tap any dish for ingredients & story. Tap the AR badge to preview it in 3D — right on your table.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex gap-3 mb-12 overflow-x-auto pb-2 no-scrollbar -mx-6 px-6">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-colors ${
                    active
                      ? "text-coffee-100"
                      : "text-coffee-900 border border-coffee-900/10 hover:bg-coffee-900/5"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeCat"
                      className="absolute inset-0 rounded-full bg-coffee-900"
                      transition={{ type: "spring", damping: 26, stiffness: 260 }}
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((dish, i) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  index={i}
                  onSelect={() => setSelectedDish(dish)}
                  onAR={() => setArDish(dish)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* AR Experience */}
      <section id="experience" className="px-6 py-16 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto bg-coffee-900 rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">AR Quick Look</span>
              <h2 className="font-display text-4xl md:text-5xl text-coffee-100 mt-4 mb-6">
                See it before you <span className="italic text-accent">order</span>.
              </h2>
              <p className="text-coffee-100/60 mb-8 max-w-md leading-relaxed">
                Every dish on our menu has a 3D model. Tap "View in AR" on any item and place a life-sized
                preview on your table — directly from your browser, no app required.
              </p>
              <ul className="space-y-3 text-sm text-coffee-100/70">
                {["Drag to rotate, pinch to zoom", "Works on iOS Quick Look & Android Scene Viewer", "Tap any dish card's AR badge to begin"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-square bg-coffee-800 rounded-2xl overflow-hidden grid place-items-center"
            >
              <button
                onClick={() => setArDish(DISHES[0])}
                className="relative z-10 px-8 py-4 rounded-full bg-accent text-coffee-900 font-bold uppercase tracking-widest text-xs animate-ar-pulse hover:bg-coffee-100 transition-colors"
              >
                Launch AR Demo
              </button>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-coffee-900" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Visit */}
      <footer id="visit" className="bg-coffee-900 text-coffee-100/50 px-6 py-20 mt-20">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-display text-3xl text-coffee-100 mb-12">Visit Buddy's.</h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-coffee-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Location</h4>
              <p className="text-sm leading-relaxed">
                Shop No 1, Ground Floor, Lake View, Kadam Plaza,
                <br />
                Mumbai-Bangalore National Highway-4,
                <br />
                opp. Swaminarayan Temple, Narhe,
                <br />
                Ambegaon Budruk, Pune, MH 411046
              </p>
            </div>
            <div>
              <h4 className="text-coffee-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Hours</h4>
              <p className="text-sm leading-relaxed">
                Open Daily<br />
                10:00 AM — 11:30 PM
              </p>
              <p className="text-sm mt-4">Dine-in · Drive-through · Delivery</p>
            </div>
            <div>
              <h4 className="text-coffee-100 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Contact</h4>
              <p className="text-sm mb-2">+91 93077 12990</p>
              <a href="https://cafebuddysespresso.com" className="text-accent hover:underline text-sm">
                cafebuddysespresso.com
              </a>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-coffee-100/10 flex justify-between items-center text-[10px] uppercase tracking-widest">
            <span>© Cafe Buddy's Espresso</span>
            <span>Made with patience, in Pune</span>
          </div>
        </div>
      </footer>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedDish && (
          <DishDetail
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
            onOpenAR={() => {
              setArDish(selectedDish);
              setSelectedDish(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* AR viewer */}
      <AnimatePresence>
        {arDish && <ARViewer dish={arDish} onClose={() => setArDish(null)} />}
      </AnimatePresence>
    </div>
  );
}
