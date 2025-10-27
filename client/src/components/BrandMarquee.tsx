const brands = [
  "DIOR",
  "TOM FORD",
  "CALVIN KLEIN",
  "CHANEL",
  "GUCCI",
  "VERSACE",
  "YSL",
  "BURBERRY",
  "ARMANI",
  "PRADA",
];

export function BrandMarquee() {
  const allBrands = [...brands, ...brands, ...brands];

  return (
    <div className="bg-card border-y border-card-border py-8 overflow-hidden" data-testid="section-brand-marquee">
      <div className="relative">
        <div className="flex animate-marquee">
          {allBrands.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-12 text-2xl md:text-3xl font-light tracking-[0.3em] text-muted-foreground uppercase"
              data-testid={`text-brand-${index}`}
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
