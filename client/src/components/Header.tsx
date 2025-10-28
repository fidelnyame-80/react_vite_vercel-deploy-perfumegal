import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [location] = useLocation();
  const { items } = useCart();
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/90 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex  hover-elevate rounded-md px-3 py-2 h-[8rem] w-[8rem]">
              <img
                src="/logo.png"
                alt="The Perfume Gal logo"
                className="h-30 w-30  object-cover"
              />

            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" data-testid="link-nav-home">
              <span
                className={`text-sm font-medium tracking-wide cursor-pointer hover-elevate px-3 py-2 rounded-md transition-colors ${location === "/" ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                HOME
              </span>
            </Link>
            <Link href="/shop" data-testid="link-nav-shop">
              <span
                className={`text-sm font-medium tracking-wide cursor-pointer hover-elevate px-3 py-2 rounded-md transition-colors ${location === "/shop" ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                SHOP
              </span>
            </Link>
          </nav>

          <Link href="/cart" data-testid="link-cart">
            <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  data-testid="badge-cart-count"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
