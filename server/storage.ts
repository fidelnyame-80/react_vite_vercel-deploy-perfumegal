import { type Product, type InsertProduct, type CartItem, type InsertCartItem, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
}

const productImages = [
  "/attached_assets/stock_images/luxury_perfume_bottl_7061514e.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_652a5649.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_1c8e5b44.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_35cca49d.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_f9d75620.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_b6148d8f.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_3e872052.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_bdcb5e8b.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_95c9c76f.jpg",
  "/attached_assets/stock_images/luxury_perfume_bottl_030882b7.jpg",
];

const initialProducts: InsertProduct[] = [
  {
    name: "Ophylia Intense",
    description: "A captivating oriental fragrance with notes of exotic spices, amber, and vanilla. Bold and mysterious, perfect for evening wear.",
    price: "149.99",
    imageUrl: productImages[0],
    category: "oriental",
    isFeatured: 1,
    isNew: 0,
  },
  {
    name: "Pegasus",
    description: "A fresh and vibrant scent featuring bergamot, lavender, and sandalwood. Elegant and timeless, suitable for any occasion.",
    price: "175.00",
    imageUrl: productImages[1],
    category: "fresh",
    isFeatured: 1,
    isNew: 0,
  },
  {
    name: "Ra'ed Luxe",
    description: "Luxurious oud fragrance blended with rose and saffron. A rich and opulent scent that commands attention.",
    price: "199.99",
    imageUrl: productImages[2],
    category: "oud",
    isFeatured: 1,
    isNew: 1,
  },
  {
    name: "Paradox Orient",
    description: "An enigmatic blend of citrus, jasmine, and patchouli. Complex and intriguing, for those who dare to be different.",
    price: "159.99",
    imageUrl: productImages[3],
    category: "oriental",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Paradox Rossa",
    description: "A passionate fusion of red berries, rose, and musk. Romantic and alluring, perfect for special moments.",
    price: "165.00",
    imageUrl: productImages[4],
    category: "floral",
    isFeatured: 1,
    isNew: 0,
  },
  {
    name: "Velvet Oud",
    description: "Smooth and sophisticated oud with hints of leather and tobacco. A true classic for the discerning connoisseur.",
    price: "189.99",
    imageUrl: productImages[5],
    category: "oud",
    isFeatured: 1,
    isNew: 1,
  },
  {
    name: "Khamrah",
    description: "Sweet and spicy oriental with cinnamon, dates, and tonka bean. Warm and inviting, perfect for cooler months.",
    price: "139.99",
    imageUrl: productImages[6],
    category: "oriental",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Ministry of Oud - Indonesian",
    description: "Rare Indonesian oud aged to perfection. Deep, woody, and incredibly rich. A collector's treasure.",
    price: "249.99",
    imageUrl: productImages[7],
    category: "oud",
    isFeatured: 0,
    isNew: 1,
  },
  {
    name: "Mousuf",
    description: "Bright citrus opening with woody base notes. Fresh and energetic, ideal for daytime wear.",
    price: "129.99",
    imageUrl: productImages[8],
    category: "fresh",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "After Sunset",
    description: "Warm amber and vanilla with a touch of orange blossom. Comforting and sensual, like a summer evening.",
    price: "155.00",
    imageUrl: productImages[9],
    category: "oriental",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Berries Weekend",
    description: "Playful berry blend with white musk and jasmine. Fun and flirty, perfect for casual occasions.",
    price: "119.99",
    imageUrl: productImages[0],
    category: "fruity",
    isFeatured: 0,
    isNew: 1,
  },
  {
    name: "Hayaati",
    description: "Luxurious blend of rose, oud, and amber. Regal and sophisticated, for those who appreciate the finer things.",
    price: "179.99",
    imageUrl: productImages[1],
    category: "oud",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "EXPLORE - The One",
    description: "A versatile signature scent with bergamot, cardamom, and cedarwood. Your perfect everyday fragrance.",
    price: "135.00",
    imageUrl: productImages[2],
    category: "fresh",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Nabeez",
    description: "Exotic fruity oriental with dates, plum, and sandalwood. Sweet and captivating.",
    price: "145.00",
    imageUrl: productImages[3],
    category: "fruity",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Mocha Wood",
    description: "Rich coffee and chocolate notes with woody undertones. Warm and indulgent, like your favorite café.",
    price: "159.99",
    imageUrl: productImages[4],
    category: "woody",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Hamraa",
    description: "Bold red rose with spicy saffron and warm amber. Passionate and unforgettable.",
    price: "169.99",
    imageUrl: productImages[5],
    category: "floral",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Instant Love",
    description: "Instant attraction in a bottle. Sweet vanilla, cherry, and tonka bean create an irresistible aura.",
    price: "125.00",
    imageUrl: productImages[6],
    category: "gourmand",
    isFeatured: 0,
    isNew: 0,
  },
  {
    name: "Rouge Tobacco",
    description: "Sophisticated tobacco leaf with rum, vanilla, and spices. Mature and distinguished.",
    price: "185.00",
    imageUrl: productImages[7],
    category: "woody",
    isFeatured: 0,
    isNew: 0,
  },
];

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    
    // Initialize with products
    initialProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists for this session and product
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.sessionId === insertCartItem.sessionId && item.productId === insertCartItem.productId
    );

    if (existingItem) {
      // Update existing item quantity - return a fresh clone
      const updated: CartItem = {
        ...existingItem,
        quantity: existingItem.quantity + insertCartItem.quantity,
      };
      this.cartItems.set(updated.id, updated);
      return updated;
    }

    // Add new item
    const id = randomUUID();
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      // Return a fresh clone to ensure React Query detects the change
      const updated: CartItem = { ...item, quantity };
      this.cartItems.set(id, updated);
      return updated;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
