# The Perfume Gal - Luxury E-Commerce Website

A professional, conversion-focused luxury perfume e-commerce website with stunning visuals and complete shopping functionality.

## Overview

**The Perfume Gal** is a full-stack e-commerce application built with React, Express, and TypeScript. The site features a sophisticated design with video hero carousel, product showcases, shopping cart, and checkout functionality.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS with custom luxury design system
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Typography**: Playfair Display (serif), Montserrat (sans-serif), Cormorant Garamond (accent)
- **State Management**: React Query + Context API
- **Animations**: Framer Motion, custom CSS animations

### Backend
- **Server**: Express.js
- **Storage**: In-memory storage with TypeScript interfaces
- **Validation**: Zod schemas
- **Session Management**: Client-generated session IDs

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── HeroCarousel.tsx
│   │   │   ├── BrandMarquee.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   └── ProductCarousel.tsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── Checkout.tsx
│   │   ├── lib/           # Utilities and contexts
│   │   │   ├── cart-context.tsx
│   │   │   └── queryClient.ts
│   │   └── index.css      # Global styles and theme
│   └── index.html
├── server/                # Backend Express application
│   ├── storage.ts         # In-memory data storage
│   └── routes.ts          # API endpoints
├── shared/                # Shared types and schemas
│   └── schema.ts          # Drizzle schemas and Zod validation
└── design_guidelines.md   # Design system documentation
```

## Features

### Homepage
- **Video Hero Carousel**: 4-slide carousel (1 video + 3 images) with elegant tagline
- **Brand Marquee**: Infinite scroll animation featuring luxury brand names
- **Popular Products**: Carousel showcasing 5 featured perfumes
- **Gallery Grid**: Asymmetric grid (1 large + 2 small images), all clickable to shop
- **New Arrivals**: Grid of 4 newest products
- **Footer**: Brand story and social links

### Shop Page
- All 18 perfume products displayed in responsive grid
- Shopify-style product cards with hover effects
- Breadcrumb navigation
- Products: Ophylia Intense, Pegasus, Ra'ed Luxe, Paradox Orient, Paradox Rossa, Velvet Oud, Khamrah, Ministry of Oud Indonesian, Mousuf, After Sunset, Berries Weekend, Hayaati, EXPLORE - The One, Nabeez, Mocha Wood, Hamraa, Instant Love, Rouge Tobacco

### Product Detail Page
- Large product image
- Product name, price, and description
- Quantity selector with +/- controls
- Add to cart functionality
- Breadcrumb navigation

### Shopping Cart
- Cart items with product images and details
- Quantity adjustment controls
- Remove item functionality
- Order summary with subtotal, shipping, and total
- Free shipping on orders over $100
- Backend-synchronized cart state

### Checkout
- Customer information form (name, email, phone)
- Shipping address form
- Order summary with all items
- Total calculation with shipping
- Order creation and processing

## Design System

### Colors
- **Primary**: Deep burgundy/wine (#340 75% 28%) for luxury appeal
- **Backgrounds**: Light mode (white/near-white), Dark mode (charcoal/black)
- **Accents**: Subtle grays and muted tones for sophistication

### Typography
- **Headings**: Playfair Display (serif) - 700 weight for hero, 600 for sections
- **Body**: Montserrat (sans-serif) - 400-600 weight
- **Tagline**: Cormorant Garamond (serif) - 300 weight italic

### Spacing
- Section padding: py-20 (desktop), py-12 (mobile)
- Component gaps: gap-8 (desktop), gap-6 (mobile)
- Container max-width: 7xl (80rem)

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart/:sessionId` - Get cart items for session
- `POST /api/cart` - Add item to cart (auto-increments if exists)
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `POST /api/orders` - Create new order

## Cart Architecture

The cart system uses a hybrid approach:
1. **Session-based**: Client generates unique session ID stored in localStorage
2. **Backend-synchronized**: All cart operations go through API endpoints
3. **Automatic deduplication**: Adding same product multiple times increments quantity
4. **Fresh object cloning**: Ensures React Query detects all state changes
5. **Orphan cleanup**: Cart items with missing products are automatically removed

## Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Running the Project

The application runs on a single port (5000) with:
- Frontend: Vite dev server
- Backend: Express server
- Command: `npm run dev`

## Future Enhancements (Not in MVP)

1. **Payment Integration**: Stripe for actual payment processing
2. **User Accounts**: Authentication and order history
3. **Product Search**: Search and filter functionality
4. **Admin Dashboard**: Product and inventory management
5. **Email Notifications**: Order confirmation emails
6. **Product Reviews**: Customer ratings and reviews
7. **Wishlist**: Save favorites for later

## Notes

- All prices are placeholders and can be edited later
- Product images are from stock photo libraries
- Session IDs are client-generated and stored in localStorage
- Cart persists between page refreshes via backend storage
- Checkout creates order records but doesn't process payments

## Recent Changes

- **2025-10-27**: Initial MVP implementation
  - Complete homepage with all sections
  - Shop page with full product catalog
  - Product detail pages with add to cart
  - Shopping cart with backend integration
  - Checkout flow with order creation
  - Full responsive design
  - Luxury design system with custom typography
