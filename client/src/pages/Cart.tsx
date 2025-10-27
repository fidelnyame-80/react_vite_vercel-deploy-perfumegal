import { Link } from "wouter";
import { Trash2, Minus, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h1
              className="font-serif text-4xl md:text-5xl font-semibold mb-8 text-foreground"
              data-testid="heading-cart"
            >
              Shopping Cart
            </h1>
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-6" data-testid="text-cart-empty">
                Your cart is empty
              </p>
              <Link href="/shop" data-testid="link-continue-shopping">
                <Button data-testid="button-continue-shopping">Continue Shopping</Button>
              </Link>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1
            className="font-serif text-4xl md:text-5xl font-semibold mb-8 text-foreground"
            data-testid="heading-cart"
          >
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-6" data-testid={`cart-item-${item.product.id}`}>
                  <div className="flex gap-6">
                    <div className="w-24 h-32 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        data-testid={`img-cart-item-${item.product.id}`}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3
                          className="font-medium text-lg text-card-foreground mb-2"
                          data-testid={`text-cart-item-name-${item.product.id}`}
                        >
                          {item.product.name}
                        </h3>
                        <p
                          className="text-lg font-semibold text-card-foreground"
                          data-testid={`text-cart-item-price-${item.product.id}`}
                        >
                          ${parseFloat(item.product.price).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-input rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-9 w-9 rounded-r-none"
                            data-testid={`button-decrease-${item.product.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span
                            className="px-4 text-sm font-medium text-foreground"
                            data-testid={`text-quantity-${item.product.id}`}
                          >
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-9 w-9 rounded-l-none"
                            data-testid={`button-increase-${item.product.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-remove-${item.product.id}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-32">
                <h2 className="font-serif text-2xl font-semibold mb-6 text-card-foreground" data-testid="heading-order-summary">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span data-testid="text-subtotal">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span data-testid="text-shipping">
                      {total >= 100 ? "FREE" : "$10.00"}
                    </span>
                  </div>
                  <div className="border-t border-card-border pt-4">
                    <div className="flex justify-between text-lg font-semibold text-card-foreground">
                      <span>Total</span>
                      <span data-testid="text-total">
                        ${(total + (total >= 100 ? 0 : 10)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" data-testid="link-checkout">
                  <Button size="lg" className="w-full" data-testid="button-checkout">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/shop" data-testid="link-continue-shopping-summary">
                  <Button variant="ghost" className="w-full mt-3" data-testid="button-continue-shopping-summary">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
