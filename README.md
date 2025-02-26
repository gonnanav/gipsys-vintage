# Gipsy's Vintage Web App

This project contains the full-stack development for Gipsy's Vintage, an e-commerce web app selling vintage clothing items for women for a local Israeli audience.

## Architecture & Development

### Core Principles

1. **Clean Architecture**
   - Core business logic and types in `/src/core` are independent of external concerns
   - Dependency rule: dependencies only point inward, toward core
   - External dependencies (WooCommerce, UI) depend on core interfaces, never the reverse

2. **Ports and Adapters (Hexagonal Architecture)**
   - Core defines ports (interfaces) that external systems must adapt to
   - Example: Application port in `/src/core/application.ts`:
     ```typescript
     // Primary port - drives the application
     interface Application {
       getProduct(id: number): Promise<Product>;
       getProducts(): Promise<Product[]>;
       // ...
     }
     ```

3. **Test-Driven Development**
   - Outside-in TDD approach inspired by GOOS (Growing Object-Oriented Software, Guided by Tests)
   - Start with end-to-end tests that drive the design from the user's perspective
   - Follow with focused unit tests to drive out the implementation details
   - Tests colocated with implementation for better maintainability

### Project Structure

```
src/
├── core/           # Domain models and types
├── woocommerce/    # WooCommerce integration
├── composition-root.ts  # Dependency composition
└── app/            # Next.js application code
    ├── shop/       # Product listing pages
    └── product/    # Product detail pages
```
