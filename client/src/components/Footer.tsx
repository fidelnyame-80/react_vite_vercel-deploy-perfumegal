import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-semibold mb-6 text-card-foreground">
              The Perfume Gal
            </h3>
            <div className="font-accent text-lg leading-relaxed text-muted-foreground max-w-2xl space-y-4">
              <p>
                At The Perfume Gal, we believe that fragrance is more than just a scent—it's an
                expression of your unique personality and style. Our carefully curated collection
                features the finest luxury perfumes from renowned houses and exclusive boutique brands.
              </p>
              <p>
                Each fragrance in our collection has been personally selected for its exceptional
                quality, artistry, and ability to evoke emotion. Whether you're seeking a signature
                scent or exploring new olfactory experiences, we invite you to discover the perfect
                fragrance that tells your story.
              </p>
              <p className="italic">
                "Smell is a word. Perfume is literature."
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-card-foreground">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover-elevate rounded-md px-2 py-1 -ml-2 inline-block cursor-pointer">
                  About Us
                </li>
                <li className="hover-elevate rounded-md px-2 py-1 -ml-2 inline-block cursor-pointer">
                  Contact
                </li>
                <li className="hover-elevate rounded-md px-2 py-1 -ml-2 inline-block cursor-pointer">
                  Shipping Info
                </li>
                <li className="hover-elevate rounded-md px-2 py-1 -ml-2 inline-block cursor-pointer">
                  Returns
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-card-foreground">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-instagram">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="button-twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-card-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Perfume Gal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
