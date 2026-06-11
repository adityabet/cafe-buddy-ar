import ModelViewerAR from "./ModelViewerAR";
import type { Dish } from "@/data/menu";

export function ARViewer({
  dish,
  onClose,
}: {
  dish: Dish;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 bg-white text-black px-4 py-2 rounded-lg"
      >
        Close
      </button>

      <ModelViewerAR model={dish.model} />
    </div>
  );
}