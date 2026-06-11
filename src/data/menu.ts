import cappuccino from "@/assets/dishes/caramel-cappuccino.jpg";
import coldBrew from "@/assets/dishes/cold-brew.jpg";
import oreoFrappe from "@/assets/dishes/oreo-frappe.jpg";
import pizza from "@/assets/dishes/margherita-pizza.jpg";
import pasta from "@/assets/dishes/pesto-pasta.jpg";
import fries from "@/assets/dishes/jalapeno-fries.jpg";
import nachos from "@/assets/dishes/nachos.jpg";
import tiramisu from "@/assets/dishes/tiramisu.jpg";
import brownie from "@/assets/dishes/brownie.jpg";

export type Dish = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  category: string;
  image: string;
  model: string; // GLB URL for AR
  ingredients: string[];
};

// Local model paths (place your optimized .glb and optional .usdz files under `public/models`)
const MODELS = {
  cup: "/models/ice_coffee.glb",
  food: "/models/pizza_bigboss_pancho.glb",
  cake: "/models/french_fries_-_free.glb",
};

export const CATEGORIES = [
  "Signature Coffee",
  "Frappes & Shakes",
  "Artisan Bites",
  "Small Plates",
  "Desserts",
] as const;

export const DISHES: Dish[] = [
  {
    id: "caramel-cappuccino",
    name: "Caramel Cappuccino",
    tagline: "Double shot espresso, salted caramel, velvet foam",
    description:
      "Our signature pour. A double-shot of house-roasted Arabica meets silky steamed milk and a slow ribbon of in-house salted caramel. Finished with a delicate latte art rosetta.",
    price: "₹240",
    category: "Signature Coffee",
    image: cappuccino,
    model: MODELS.cup,
    ingredients: [
      "House-roasted Arabica beans",
      "Steamed whole milk",
      "House-made salted caramel",
      "Himalayan pink salt",
      "Madagascar vanilla extract",
    ],
  },
  {
    id: "cold-brew",
    name: "Signature Cold Brew",
    tagline: "18-hour slow steep, single origin",
    description:
      "Cold-extracted over 18 hours for a smooth, low-acid finish with notes of dark chocolate and stone fruit. Served over hand-cut ice with a touch of fresh cream.",
    price: "₹260",
    category: "Signature Coffee",
    image: coldBrew,
    model: MODELS.cup,
    ingredients: ["Single origin Karnataka beans", "Filtered spring water", "Fresh cream", "Hand-cut ice"],
  },
  {
    id: "oreo-frappe",
    name: "Oreo Cookie Frappe",
    tagline: "Crushed cookies, vanilla cream, chocolate drizzle",
    description:
      "Blended cold and thick — a tall glass of crushed Oreos, vanilla bean ice cream, and our house cold brew. Topped with whipped cream and chocolate shavings.",
    price: "₹290",
    category: "Frappes & Shakes",
    image: oreoFrappe,
    model: MODELS.cup,
    ingredients: ["Vanilla bean ice cream", "Crushed Oreo cookies", "House cold brew", "Whipped cream", "Chocolate shavings"],
  },
  {
    id: "margherita-pizza",
    name: "Wood-Fired Margherita",
    tagline: "San Marzano, fresh mozzarella, Genovese basil",
    description:
      "Thin-crust sourdough base, charred in our wood oven. Topped with San Marzano tomato, torn mozzarella di bufala, and basil from our rooftop garden.",
    price: "₹420",
    category: "Artisan Bites",
    image: pizza,
    model: MODELS.food,
    ingredients: ["Sourdough crust", "San Marzano tomato", "Mozzarella di bufala", "Fresh basil", "Extra virgin olive oil"],
  },
  {
    id: "pesto-pasta",
    name: "Basil Pesto Pasta",
    tagline: "Hand-rolled fettuccine, pine nuts, aged parm",
    description:
      "Hand-rolled fettuccine tossed in a bright Genovese pesto with toasted pine nuts, shaved pecorino, and a drizzle of cold-pressed olive oil.",
    price: "₹380",
    category: "Artisan Bites",
    image: pasta,
    model: MODELS.food,
    ingredients: ["Semolina fettuccine", "Genovese basil", "Toasted pine nuts", "Pecorino Romano", "Extra virgin olive oil", "Garlic confit"],
  },
  {
    id: "jalapeno-fries",
    name: "Jalapeño Fries",
    tagline: "Double-fried russets, spiced oil, cilantro crema",
    description:
      "Hand-cut russets, double-fried for maximum crunch, tossed with smoked paprika and fire-roasted jalapeños. Served with a cool cilantro-lime crema.",
    price: "₹220",
    category: "Small Plates",
    image: fries,
    model: MODELS.food,
    ingredients: ["Russet potatoes", "Pickled jalapeños", "Smoked paprika", "Lime zest", "Cilantro crema", "Garlic emulsion"],
  },
  {
    id: "loaded-nachos",
    name: "Loaded Nachos",
    tagline: "Three-cheese melt, salsa fresca, sour cream",
    description:
      "House-fried tortilla chips smothered in a three-cheese blend, topped with pico de gallo, sliced jalapeños, and a dollop of cultured sour cream.",
    price: "₹320",
    category: "Small Plates",
    image: nachos,
    model: MODELS.food,
    ingredients: ["Corn tortilla chips", "Cheddar & monterey jack", "Pico de gallo", "Pickled jalapeños", "Sour cream", "Fresh cilantro"],
  },
  {
    id: "tiramisu",
    name: "Classic Tiramisu",
    tagline: "Mascarpone, espresso-soaked savoiardi, cocoa",
    description:
      "Layers of espresso-soaked Italian savoiardi between clouds of mascarpone cream, dusted with bittersweet cocoa. Made fresh daily.",
    price: "₹280",
    category: "Desserts",
    image: tiramisu,
    model: MODELS.cake,
    ingredients: ["Mascarpone cheese", "Savoiardi biscuits", "Fresh espresso", "Free-range eggs", "Bittersweet cocoa powder", "Marsala wine"],
  },
  {
    id: "brownie-sundae",
    name: "Warm Brownie Sundae",
    tagline: "Dark chocolate brownie, vanilla bean ice cream",
    description:
      "A warm, fudgy 70% dark chocolate brownie topped with a generous scoop of Madagascar vanilla bean ice cream and our house chocolate sauce.",
    price: "₹310",
    category: "Desserts",
    image: brownie,
    model: MODELS.cake,
    ingredients: ["70% dark chocolate", "Cultured butter", "Vanilla bean ice cream", "House chocolate sauce", "Maldon sea salt"],
  },
];
