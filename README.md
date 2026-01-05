# MedVax Frontend

Production-ready Next.js frontend for MedVax ePharmacy platform.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Toast Notifications**: Sonner
- **Environment Validation**: T3 Env

## Project Structure

```
medvax/
├── app/                          # Next.js App Router
│   ├── (public)/                # Public routes (unauthenticated)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (protected)/             # Protected routes (authenticated)
│   ├── admin/                   # Admin dashboard
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
│
├── features/                     # Feature modules (domain-driven)
│   ├── auth/
│   │   ├── api/                 # API functions
│   │   │   └── auth.api.ts
│   │   ├── components/          # Auth components
│   │   │   └── login-form.tsx
│   │   ├── schemas/             # Zod validation
│   │   │   └── auth.schema.ts
│   │   ├── types/               # TypeScript types
│   │   │   └── auth.types.ts
│   │   └── index.ts             # Barrel export
│   │
│   ├── products/
│   │   ├── api/products.api.ts
│   │   ├── components/product-list.tsx
│   │   ├── hooks/use-products.ts
│   │   ├── schemas/product.schema.ts
│   │   ├── types/product.types.ts
│   │   └── index.ts
│   │
│   ├── orders/
│   │   ├── api/orders.api.ts
│   │   ├── hooks/use-orders.ts
│   │   ├── schemas/order.schema.ts
│   │   ├── types/order.types.ts
│   │   └── index.ts
│   │
│   ├── consultations/
│   │   ├── api/consultations.api.ts
│   │   ├── hooks/use-consultations.ts
│   │   ├── schemas/consultation.schema.ts
│   │   ├── types/consultation.types.ts
│   │   └── index.ts
│   │
│   └── prescriptions/
│       ├── api/prescriptions.api.ts
│       ├── hooks/use-prescriptions.ts
│       ├── schemas/prescription.schema.ts
│       ├── types/prescription.types.ts
│       └── index.ts
│
├── components/                   # Shared components
│   ├── ui/                       # shadcn components (to be added)
│   ├── layouts/                  # Layout components
│   └── forms/                    # Reusable form components
│
├── lib/                          # Core utilities
│   ├── api-client.ts             # Typed API client with error handling
│   ├── utils.ts                  # Helper functions (cn, formatCurrency, etc.)
│   ├── toast.ts                  # Toast notification helpers
│   └── index.ts                  # Barrel export
│
├── providers/                    # React providers
│   ├── query-provider.tsx        # TanStack Query setup
│   └── toast-provider.tsx        # Sonner toast setup
│
├── config/                       # Configuration
│   ├── env.ts                    # T3 Env validation
│   ├── routes.ts                 # Route constants
│   └── app.ts                    # App constants
│
├── types/                        # Global types
│   └── index.ts
│
├── hooks/                       # Shared custom hooks
│
└── public/                      # Static assets

```

## Feature Module Pattern

Each feature module follows this structure:

```
feature/
├── api/                        # API layer - fetch functions
├── components/                 # UI components specific to this feature
├── hooks/                      # TanStack Query hooks (queries & mutations)
├── schemas/                    # Zod validation schemas
├── types/                      # TypeScript type definitions
└── index.ts                    # Barrel export for clean imports
```

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run development server

```bash
pnpm dev
```

## Usage Examples

### Importing from Features

```typescript
// Clean imports via barrel exports
import { useProducts, type Product } from "@/features/products";
import { loginSchema, type LoginInput } from "@/features/auth";
import { useCart, useCheckout } from "@/features/orders";
```

### Using TanStack Query Hooks

```typescript
// Query example
const { data, isLoading, error } = useProducts({ page: 1, limit: 20 });

// Mutation example
const { mutate: addToCart } = useAddToCart(token);
addToCart({ productId: 123, quantity: 2 });
```

### Form Validation with Zod

```typescript
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/features/auth";

const form = useForm<LoginInput>({
  resolver: zodResolver(loginSchema),
});
```

### Toast Notifications

```typescript
import { handleApiError, showSuccessToast } from "@/lib";

try {
  const response = await authApi.login(data);
  showSuccessToast("Login successful!");
} catch (error) {
  handleApiError(error);
}
```

## Core Infrastructure

### API Client

Centralized API client with typed methods:

- `apiClient.get<T>(endpoint, config?)`
- `apiClient.post<T>(endpoint, data?, config?)`
- `apiClient.put<T>(endpoint, data?, config?)`
- `apiClient.delete<T>(endpoint, config?)`
- `apiClient.upload<T>(endpoint, formData, config?)`

### Environment Validation

Using T3 Env for type-safe environment variables with:

- `clientPrefix: 'NEXT_PUBLIC_'` for runtime enforcement
- `emptyStringAsUndefined: true` for proper empty string handling

### Toast Utilities

- `handleApiError(error)` - Automatically handle API errors
- `showSuccessToast(message, description?)`
- `showErrorToast(message, description?)`
- `showInfoToast(message, description?)`
- `showLoadingToast(message)`

## Available Scripts

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Next Steps

1. **Add shadcn/ui components**: Run `npx shadcn@latest init` and add components as needed
2. **Implement auth flow**: Create login/signup pages and auth context
3. **Build product pages**: Product listing, detail, and cart pages
4. **Add middleware**: Protect routes based on authentication
5. **Create admin dashboard**: Product management, orders, analytics

## Architecture Principles

- **Feature-first**: Code organized by business domain
- **Type safety**: End-to-end TypeScript with Zod validation
- **Separation of concerns**: API, UI, validation separated
- **Reusability**: Shared components and hooks
- **Scalability**: Modular structure for growth
- **Query invalidation patterns**: Automatic cache updates on mutations
