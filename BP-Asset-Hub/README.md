# BP-Asset-Hub

Bournys Productions Premium Asset Marketplace

## Overview

A modern, premium digital asset marketplace for Roblox developers, community owners, roleplay groups, and creators.

## Features

- 🛒 Product Marketplace
- 👤 User Dashboard
- 🛍️ Shopping Cart & Wishlist
- ⭐ Reviews & Ratings
- 🔐 Secure Authentication
- 💳 Stripe Payment Integration
- 📊 Analytics Dashboard
- 🎨 Modern UI with Glassmorphism

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Stripe
- PostgreSQL

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketplace.

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── marketplace/
│   ├── product/
│   ├── dashboard/
│   └── admin/
├── components/
│   ├── Navigation.tsx
│   ├── ProductCard.tsx
│   └── ...
├── styles/
├── utils/
└── lib/
    ├── supabase.ts
    └── stripe.ts
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
```
