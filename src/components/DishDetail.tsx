import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Dish } from "@/data/menu";

export function DishDetail({
  dish,
  onClose,
  onOpenAR,
}: {
  dish: Dish;
  onClose: () => void;
  onOpenAR: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Preload 3D model in background when dish detail opens
  useEffect(() => {
    if (dish.model) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "fetch";
      link.href = dish.model;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [dish.model]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-coffee-900/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-coffee-100 rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col md:grid md:grid-cols-2"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-coffee-100/90 backdrop-blur flex items-center justify-center hover:bg-coffee-100 transition-colors shadow"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden bg-coffee-800/5"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              width={800}
              height={1000}
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-coffee-100/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-coffee-800">
              {dish.category}
            </div>
          </motion.div>

          <div className="overflow-y-auto p-8 md:p-10 flex flex-col gap-6">
            <div>
              <motion.h2
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl text-coffee-900 leading-tight"
              >
                {dish.name}
              </motion.h2>
              <motion.p
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.18 }}
                className="mt-2 text-accent italic"
              >
                {dish.tagline}
              </motion.p>
            </div>

            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.26 }}
              className="text-coffee-800/70 leading-relaxed"
            >
              {dish.description}
            </motion.p>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-coffee-800/40 block mb-3">
                Ingredients
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {dish.ingredients.map((ing, i) => (
                  <motion.li
                    key={ing}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 text-sm text-coffee-900"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {ing}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-auto border-t border-coffee-900/5">
              <span className="font-display text-3xl text-accent">{dish.price}</span>
              <button
                onClick={onOpenAR}
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-coffee-900 text-coffee-100 hover:bg-accent hover:text-coffee-900 transition-all animate-ar-pulse"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L3 7v10l9 5 9-5V7l-9-5z M12 2v20 M3 7l9 5 9-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest">View in AR</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
