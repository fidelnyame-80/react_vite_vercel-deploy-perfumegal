# Design Guidelines: The Perfume Gal - Luxury E-Commerce Experience

## Design Approach
**Reference-Based Approach**: Drawing inspiration from luxury e-commerce leaders (Chanel, Tom Ford, Jo Malone) combined with modern Shopify aesthetics. The design emphasizes premium visual storytelling, sophisticated restraint, and conversion-optimized layouts.

## Core Design Principles
1. **Luxury Minimalism**: Generous whitespace, restrained animations, high-quality imagery
2. **Conversion-Focused**: Clear CTAs, frictionless shopping flow, trust-building elements
3. **Visual Storytelling**: Large immersive media, elegant typography, curated product displays

## Typography System

**Primary Font**: Playfair Display (serif) - for hero headlines and section titles
- Hero headline: 3.5rem (desktop) / 2rem (mobile), font-weight 700, letter-spacing: -0.02em
- Section headings: 2.5rem (desktop) / 1.5rem (mobile), font-weight 600

**Secondary Font**: Montserrat (sans-serif) - for body text, buttons, and UI elements
- Body text: 1rem, font-weight 400, line-height 1.6
- Button text: 0.875rem, font-weight 600, uppercase, letter-spacing: 0.1em
- Product names: 1.125rem, font-weight 500

**Accent Font**: Cormorant Garamond (serif) - for the hero tagline "Smell is a word. Perfume is literature"
- Size: 2rem (desktop) / 1.25rem (mobile), font-weight 300, italic, letter-spacing: 0.05em

## Layout System

**Spacing Units**: Use Tailwind spacing - primary units are 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-20 (desktop) / py-12 (mobile)
- Container max-width: max-w-7xl with px-6 (mobile) / px-8 (desktop)
- Component gaps: gap-8 (desktop) / gap-6 (mobile)

**Grid System**:
- Product grids: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gallery grid: 2 columns with 1:2 image ratio asymmetry

## Component Library

### Navigation Header
- Fixed position with backdrop blur effect (backdrop-blur-md bg-white/90)
- Height: h-20
- Logo placeholder: "The Perfume Gal" alt text, h-10 width auto
- Navigation links: Montserrat, 0.875rem, font-weight 500, spacing between links: gap-8
- Shopping cart icon: top-right with item count badge

### Hero Carousel Section
- Full viewport height: min-h-screen
- 4-slide carousel: 1 video background + 3 high-quality images
- Overlay: gradient from transparent to black/50 for text readability
- Content centered vertically and horizontally
- Tagline positioned at center with dramatic presence
- "Shop Now" button: 
  - Size: px-8 py-4, rounded-none (sharp edges for luxury feel)
  - Background: blurred backdrop (backdrop-blur-sm bg-white/20)
  - Border: 2px solid white
  - Text: Montserrat uppercase, tracking-wider
  - Position: below tagline with mt-12
- Carousel navigation: Subtle dots at bottom, slide indicators with opacity states
- Auto-advance: 5 seconds per slide with smooth transitions

### Brand Marquee
- Seamless infinite scroll animation
- Brand names in Montserrat uppercase, 1.5rem, font-weight 300, tracking-widest
- Spacing between brand names: mx-12
- Subtle opacity animation as names scroll
- Background: contrast from hero (if hero is dark, marquee on light background)

### Popular Products Carousel
- Section heading: "Popular Perfumes" centered, Playfair Display
- 5-card carousel with smooth horizontal scroll
- Card width: 300px (fixed) with gap-6
- Show 1 card (mobile), 2 cards (tablet), 4 cards (desktop) at a time
- Navigation arrows: subtle, positioned at section edges

### Product Cards (Universal Design)
- Aspect ratio: 3:4 for product images
- Image: object-cover with subtle hover scale (scale-105)
- Card padding: p-4
- Product name: Montserrat, font-weight 500, mt-4
- Price: Montserrat, font-weight 600, text-lg, mt-2
- Background: white with subtle shadow on hover
- Clickable entire card area

### Gallery Grid Section
- 2-column layout (1 large left, 2 stacked right)
- Left image: full height of section (aspect-ratio-square on mobile)
- Right images: 1:1 aspect ratio each with gap-4 between them
- All images clickable to storefront
- Subtle opacity hover effect (hover:opacity-90)

### New Products Section
- Section heading: "New Arrivals" 
- 4 product cards in grid
- Layout: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Same card styling as Popular Products

### Footer
- Background: dark (contrast to main content)
- Multi-column layout: Brand story (2/3 width), Quick links + Social (1/3 width)
- Brand story: Cormorant Garamond, 1.125rem, line-height relaxed, max 3 paragraphs
- Padding: py-16 px-6
- Bottom bar: Copyright, minimal height, centered

### Shop/Products Page
- Breadcrumb navigation: Home > Shop
- Product grid: all 18 perfumes
- Grid: 4 columns (desktop), 3 columns (tablet), 2 columns (mobile)
- Filters sidebar (optional): Categories, Price range, Brands
- Same product card design as homepage

### Product Detail Page
- Two-column layout: Image gallery (left 50%), Details (right 50%)
- Image gallery: Main image + 3-4 thumbnails below
- Product name: Playfair Display, 2.5rem
- Price: Montserrat, 2rem, font-weight 600
- Description: Prose, max-w-prose
- Quantity selector: Clean number input with +/- buttons, h-12
- "Add to Cart" button: Full width on mobile, fixed width on desktop (w-64), py-4
- Related products carousel below

### Checkout Page
- Two-column layout: Form (left 60%), Order summary (right 40%)
- Form sections: Contact, Shipping, Payment
- Input fields: Tailwind form elements, h-12, rounded-md, border-2
- Order summary: Sticky position, background subtle gray
- Product line items: Image thumbnail (60px), Name, Quantity, Price
- Total calculation: Bold, larger text, border-top
- "Complete Order" button: Full width, py-4, prominent

## Animation Guidelines
- Minimize distracting animations - use sparingly for elegance
- Carousel transitions: fade (1s ease-in-out)
- Hover effects: subtle scale (0.2s ease), opacity changes
- Marquee: smooth continuous scroll (40s linear infinite)
- Page transitions: none (instant navigation for e-commerce)

## Images Requirements
- **Hero Carousel**: 1 video (luxury perfume bottle shot, elegant pour, or artistic fragrance visualization) + 3 high-resolution lifestyle images (perfume in elegant settings, close-ups of bottles, atmospheric shots)
- **Gallery Grid**: 3 curated images (perfume bottles, ingredients, lifestyle shots)
- **Product Images**: All 18 perfumes require product photography (white/clean backgrounds, consistent lighting, 3:4 aspect ratio)
- **Overall**: High-quality, professionally shot imagery essential for luxury positioning

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (2-column grids, adjusted typography)
- Desktop: > 1024px (full multi-column layouts, maximum visual impact)