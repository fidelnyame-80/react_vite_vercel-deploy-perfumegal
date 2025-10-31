import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@shared/schema";

export default function Shop() {
  const { data: products, isLoading } = useQuery<Product[]>({
  queryKey: ["/api/products"],
  queryFn: async () => {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Failed to load products");
    return res.json();
  },
});

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover-elevate px-2 py-1 rounded-md" data-testid="link-breadcrumb-home">
                Home
              </a>
              <span>/</span>
              <span className="text-foreground" data-testid="text-breadcrumb-shop">Shop</span>
            </nav>
            <h1
              className="font-serif text-4xl md:text-5xl font-semibold text-foreground"
              data-testid="heading-shop"
            >
              All Fragrances
            </h1>
            <p className="text-lg text-muted-foreground mt-4" data-testid="text-shop-description">
              Discover our complete collection of luxury perfumes
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-muted rounded-md animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
