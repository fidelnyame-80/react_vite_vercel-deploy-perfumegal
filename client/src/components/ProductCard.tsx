import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`}>
      <Card className="group cursor-pointer overflow-hidden hover-elevate transition-all duration-300">
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            data-testid={`img-product-${product.id}`}
          />
        </div>
        <div className="p-4 space-y-2">
          <h3
            className="font-medium text-lg text-card-foreground line-clamp-1"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p
            className="text-lg font-semibold text-card-foreground"
            data-testid={`text-product-price-${product.id}`}
          >
            ${parseFloat(product.price).toFixed(2)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
