import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Product, CartItem } from "@shared/schema";

interface CartItemWithProduct extends CartItem {
  product: Product;
}

interface CartContextType {
  items: CartItemWithProduct[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getSessionId(): string {
  let sessionId = localStorage.getItem("cart_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("cart_session_id", sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [sessionId] = useState(getSessionId);
  const queryClient = useQueryClient();

  // Fetch cart items from backend
  const { data: items = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart", sessionId],
    queryFn: async () => {
      const response = await fetch(`/api/cart/${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      // Always use POST - backend will handle deduplication and quantity increment
      return await apiRequest("POST", "/api/cart", {
        sessionId,
        productId,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (quantity <= 0) {
        return await apiRequest("DELETE", `/api/cart/${id}`, {});
      }
      return await apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  // Remove from cart mutation
  const removeFromCartMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/cart/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });

  const addToCart = (product: Product, quantity: number) => {
    addToCartMutation.mutate({ productId: product.id, quantity });
  };

  const removeFromCart = (cartItemId: string) => {
    removeFromCartMutation.mutate(cartItemId);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    updateQuantityMutation.mutate({ id: cartItemId, quantity });
  };

  const clearCart = async () => {
    // Remove all items in parallel and wait for completion
    await Promise.all(
      items.map((item) => apiRequest("DELETE", `/api/cart/${item.id}`, {}))
    );
    queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
  };

  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
