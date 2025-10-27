import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import type { Product } from "@shared/schema";

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export function ProductCarousel({ products, title }: ProductCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  const visibleProducts = 4;
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + visibleProducts < products.length;

  const handlePrev = () => {
    if (canGoPrev) {
      setStartIndex(Math.max(0, startIndex - 1));
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setStartIndex(Math.min(products.length - visibleProducts, startIndex + 1));
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-foreground"
          data-testid={`heading-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {title}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="h-10 w-10"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={!canGoNext}
            className="h-10 w-10"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${startIndex * (100 / visibleProducts + 1.5)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
