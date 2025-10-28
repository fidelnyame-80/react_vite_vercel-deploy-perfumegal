import { Link } from "wouter";
import galleryImage1 from "/gallery img2.png";
import galleryImage2 from "/gallery img1.png";
import galleryImage3 from "/gallery img other.png";

export function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <Link href="/shop" data-testid="link-gallery-1">
        <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden rounded-md group cursor-pointer hover-elevate">
          <img
            src={galleryImage1}
            alt="Luxury perfume collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            data-testid="img-gallery-1"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
        </div>
      </Link>

      <div className="grid grid-rows-2 gap-4 md:gap-6">
        <Link href="/shop" data-testid="link-gallery-2">
          <div className="relative aspect-square overflow-hidden rounded-md group cursor-pointer hover-elevate">
            <img
              src={galleryImage2}
              alt="Perfume ingredients"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              data-testid="img-gallery-2"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          </div>
        </Link>

        <Link href="/shop" data-testid="link-gallery-3">
          <div className="relative aspect-square overflow-hidden rounded-md group cursor-pointer hover-elevate">
            <img
              src={galleryImage3}
              alt="Elegant fragrances"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              data-testid="img-gallery-3"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}
