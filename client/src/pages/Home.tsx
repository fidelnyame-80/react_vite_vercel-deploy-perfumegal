import { useQuery } from "@tanstack/react-query";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BrandMarquee } from "@/components/BrandMarquee";
import { ProductCarousel } from "@/components/ProductCarousel";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products?.filter((p) => p.isFeatured === 1).slice(0, 5) || [];
  const newProducts = products?.filter((p) => p.isNew === 1).slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="font-serif text-2xl text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroCarousel />

      <BrandMarquee />

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <ProductCarousel products={featuredProducts} title="Popular Perfumes" />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <GalleryGrid />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold mb-8 text-foreground"
          data-testid="heading-new-arrivals"
        >
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
