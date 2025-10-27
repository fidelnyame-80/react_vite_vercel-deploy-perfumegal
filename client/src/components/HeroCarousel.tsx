import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import heroImage1 from "@assets/stock_images/luxury_perfume_lifes_dbb07cb0.jpg";
import heroImage2 from "@assets/stock_images/luxury_perfume_lifes_3fd6c686.jpg";
import heroImage3 from "@assets/stock_images/luxury_perfume_lifes_f3fad0aa.jpg";

const slides = [
  {
    type: "video" as const,
    src: "https://player.vimeo.com/external/371433846.sd.mp4?s=c644b21e8e7d13a98870d0c49c48b2a43a2a5bef&profile_id=164&oauth2_token_id=57447761",
    poster: heroImage1,
  },
  {
    type: "image" as const,
    src: heroImage1,
  },
  {
    type: "image" as const,
    src: heroImage2,
  },
  {
    type: "image" as const,
    src: heroImage3,
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide.type === "video" ? (
            <div className="relative w-full h-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={slide.poster}
                className="absolute inset-0 w-full h-full object-cover"
                data-testid="video-hero"
              >
                <source src={slide.src} type="video/mp4" />
              </video>
            </div>
          ) : (
            <img
              src={slide.src}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
              data-testid={`img-hero-${index}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
      ))}

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="font-accent text-4xl md:text-6xl lg:text-7xl font-light italic text-white tracking-wide max-w-4xl leading-tight mb-12"
          data-testid="text-hero-tagline"
        >
          Smell is a word. Perfume is literature.
        </h1>
        <Link href="/shop" data-testid="link-shop-now">
          <Button
            size="lg"
            className="px-8 py-6 text-sm tracking-widest uppercase font-semibold backdrop-blur-sm bg-white/20 hover:bg-white/30 border-2 border-white text-white rounded-none h-auto"
            data-testid="button-shop-now"
          >
            Shop Now
          </Button>
        </Link>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            data-testid={`button-carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
