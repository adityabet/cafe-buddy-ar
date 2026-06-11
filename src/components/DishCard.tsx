import { motion } from "framer-motion";
import type { Dish } from "@/data/menu";

export function DishCard({
  dish,
  onSelect,
  onAR,
  index,
}: {
  dish: Dish;
  onSelect: () => void;
  onAR: () => void;
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 bg-coffee-800/5 aspect-[4/5]">
        <motion.img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAR();
          }}
          className="absolute bottom-4 right-4 bg-coffee-100/95 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-accent hover:text-coffee-900 transition-all shadow-lg"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          AR
        </button>

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-coffee-100/90 backdrop-blur text-[9px] font-bold uppercase tracking-widest text-coffee-800 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0">
          {dish.category}
        </div>
      </div>
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-2xl text-coffee-900 mb-1 leading-tight">{dish.name}</h3>
          <p className="text-sm text-coffee-800/60 leading-relaxed line-clamp-2">{dish.tagline}</p>
        </div>
        <span className="font-semibold text-accent shrink-0">{dish.price}</span>
      </div>
    </motion.article>
  );
}
