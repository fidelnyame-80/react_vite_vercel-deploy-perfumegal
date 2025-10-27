import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Minus, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const product = products?.find((p) => p.id === productId);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="font-serif text-2xl text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="font-serif text-2xl text-foreground">Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover-elevate px-2 py-1 rounded-md" data-testid="link-breadcrumb-home">
              Home
            </a>
            <span>/</span>
            <a href="/shop" className="hover-elevate px-2 py-1 rounded-md" data-testid="link-breadcrumb-shop">
              Shop
            </a>
            <span>/</span>
            <span className="text-foreground" data-testid="text-breadcrumb-product">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-md overflow-hidden bg-muted">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  data-testid="img-product-main"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h1
                  className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4"
                  data-testid="heading-product-name"
                >
                  {product.name}
                </h1>
                <div
                  className="text-3xl font-semibold text-foreground"
                  data-testid="text-product-price"
                >
                  ${parseFloat(product.price).toFixed(2)}
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-border">
                <div className="space-y-3">
                  <label
                    htmlFor="quantity"
                    className="text-sm font-semibold uppercase tracking-wider text-foreground"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-input rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-12 w-12 rounded-r-none"
                        data-testid="button-quantity-decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="h-12 w-20 text-center border-0 bg-transparent focus:outline-none focus:ring-0 text-foreground font-medium"
                        data-testid="input-quantity"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-12 w-12 rounded-l-none"
                        data-testid="button-quantity-increase"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full md:w-auto md:min-w-[300px] h-12 text-sm tracking-wider uppercase font-semibold"
                  data-testid="button-add-to-cart"
                >
                  Add to Cart
                </Button>
              </div>

              <div className="pt-6 space-y-3 text-sm text-muted-foreground border-t border-border">
                <p>Free shipping on orders over $100</p>
                <p>Authentic luxury fragrances</p>
                <p>Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
