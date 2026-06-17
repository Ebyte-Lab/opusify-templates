export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  stock: string;
  description: string;
  details?: string[];
}

export interface ArchiveItem {
  id: string;
  name: string;
  img: string;
}

export interface FAQItemData {
  id: number;
  question: string;
  answer: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "BIOHAZARD HOODIE", 
    price: 120.00, 
    img: "https://picsum.photos/seed/hoodie1/600/800", 
    stock: "LOW STOCK",
    description: "Heavyweight 450gsm organic cotton hoodie. Raw edge seams, acid-dyed print on back, oversized brutalist box fit.",
    details: ["100% Organic Cotton", "Oversized Fit", "Printed in the Syndicate Lab", "All Sales Final"]
  },
  { 
    id: 2, 
    name: "TOXIC TEE", 
    price: 45.00, 
    img: "https://picsum.photos/seed/tee1/600/800", 
    stock: "IN STOCK",
    description: "280gsm luxury blank with drop shoulder design. High-density puff print graphic. Preshrunk to ensure fit integrity.",
    details: ["100% Combed Cotton", "Drop Shoulder Fit", "High-density Puff Print", "All Sales Final"]
  },
  { 
    id: 3, 
    name: "WASTELAND CARGOS", 
    price: 150.00, 
    img: "https://picsum.photos/seed/pants1/600/800", 
    stock: "PRE-ORDER",
    description: "Multi-pocket tactical cargos with adjustable ankle straps. Heavy duty ripstop cotton fabric with double knee reinforcement.",
    details: ["Ripstop Cotton Fabric", "6-pocket Configuration", "Heavy Duty Steel Buckles", "Delivery in 4 weeks"]
  },
  { 
    id: 4, 
    name: "ACID WASH DENIM", 
    price: 180.00, 
    img: "https://picsum.photos/seed/denim1/600/800", 
    stock: "IN STOCK",
    description: "14oz Japanese selvedge denim in a distressed acid wash finish. Straight leg silhouette with raw fringe detailing at the hem.",
    details: ["14oz Japanese Selvedge", "Straight Leg Silhouette", "Brutalist Custom Rivets", "All Sales Final"]
  },
  { 
    id: 5, 
    name: "SYNDICATE BEANIE", 
    price: 35.00, 
    img: "https://picsum.photos/seed/beanie1/600/800", 
    stock: "IN STOCK",
    description: "Double-layered rib knit beanie with embroidered OPUSIFY signature logotype. Snug fit with adjustable fold-over cuff.",
    details: ["100% Acrylic Knit", "Embroidered Branding", "One Size Fits Most", "All Sales Final"]
  },
  { 
    id: 6, 
    name: "TACTICAL VEST", 
    price: 210.00, 
    img: "https://picsum.photos/seed/vest1/600/800", 
    stock: "LOW STOCK",
    description: "Modular chest rig/tactical vest. Featuring MOLLE webbing strap systems, dual front utility pockets, and reinforced back plate support.",
    details: ["1000D Cordura Nylon", "MOLLE Webbing System", "Fully Adjustable Straps", "Extremely Limited"]
  }
];

export const EXTRA_PRODUCTS: Product[] = [
  {
    id: 7,
    name: "GLITCH BALACLAVA",
    price: 40.00,
    img: "https://picsum.photos/seed/mask1/600/800",
    stock: "NEW DROP",
    description: "Knitted full-face balaclava with asymmetric neon stitching details and custom woven label tag. Breathable knit construction.",
    details: ["100% Acrylic Rib Knit", "Asymmetric Stitching", "Woven Branding Tag", "Limited Drop"]
  },
  {
    id: 8,
    name: "WASTELAND BOOTS",
    price: 260.00,
    img: "https://picsum.photos/seed/boots1/600/800",
    stock: "NEW DROP",
    description: "Full-grain calf leather tactical combat boots with chunky vibram lug soles, heavy steel eyelets, and back pull tabs.",
    details: ["Full-grain Calf Leather", "Vibram Lug Sole", "Steel Eyelet Construction", "Includes custom dust bag"]
  },
  {
    id: 9,
    name: "UTILITY HARNESS",
    price: 95.00,
    img: "https://picsum.photos/seed/harness1/600/800",
    stock: "NEW DROP",
    description: "Adjustable utility shoulder harness with detachable modular pouches. Perfect for technical layers and brutalist fits.",
    details: ["Waterproof Nylon Lining", "Metal Carabiner Clasps", "Detachable Card Sleeves", "Fits all chest sizes"]
  }
];

export const ARCHIVE_PRODUCTS: ArchiveItem[] = [
  { id: "arch1", name: "Archive Hoodie 01", img: "https://picsum.photos/seed/arch1/400/400" },
  { id: "arch2", name: "Archive Tee 02", img: "https://picsum.photos/seed/arch2/400/400" },
  { id: "arch3", name: "Archive Cargos 03", img: "https://picsum.photos/seed/arch3/400/400" },
  { id: "arch4", name: "Archive Vest 04", img: "https://picsum.photos/seed/arch4/400/400" }
];

export const FAQS: FAQItemData[] = [
  {
    id: 1,
    question: "When do orders ship?",
    answer: "Everything is printed on demand. Expect 2-3 weeks for production before dispatch. If you can't wait, don't buy. We ain't Amazon."
  },
  {
    id: 2,
    question: "Do you accept returns?",
    answer: "All sales are final. Check the size chart before ordering. If we sent you the wrong item, email support with photographic evidence."
  },
  {
    id: 3,
    question: "Do you ship internationally?",
    answer: "Worldwide shipping available. Customs and duties are the responsibility of the buyer. We mark true value on all customs forms."
  }
];

export const NAV_LINKS: LinkItem[] = [
  { label: "Latest Drop", href: "#latest" },
  { label: "Shop All", href: "#shop" },
  { label: "Archive", href: "#archive" },
  { label: "FAQ", href: "#faq" }
];

export const SOCIAL_LINKS: LinkItem[] = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Discord", href: "#" }
];

export const LEGAL_LINKS: LinkItem[] = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Contact", href: "#" }
];

export const MARQUEE_TEXTS: string[] = [
  "WARNING: HIGH VOLTAGE APPAREL",
  "NO RESTOCKS",
  "ALL SALES FINAL",
  "BUY NOW OR CRY LATER"
];

export const COUNTDOWN_DURATION_MINUTES = 2 * 60 + 45; // 165 minutes
