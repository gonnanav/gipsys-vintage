# Gipsy's Vintage Web App

This project contains the full-stack development for Gipsy's Vintage, an e-commerce web app selling vintage clothing items for women for a local Israeli audience.

## Getting Started

### Prerequisites

- Node.js
- npm
- A WordPress site with WooCommerce plugin installed and configured
  - WooCommerce REST API must be accessible over HTTPS
  - WooCommerce API keys with read/write permissions

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Setup

1. Create a `.env.local` file in the project root with the following variables:
   ```bash
   WOOCOMMERCE_URL=your_woocommerce_url
   WOOCOMMERCE_CUSTOMER_KEY=your_customer_key
   WOOCOMMERCE_CUSTOMER_SECRET=your_customer_secret
   ```

### Development

```bash
# Start development server with hot reload
npm run dev

# Start Storybook to view and develop UI components
npm run storybook   # Available at http://localhost:6006

# Run type checking
npm run ts:check

# Run tests
npm run test        # Unit tests
npm run e2e         # End-to-end tests
npm run cy:open     # Open Cypress test runner

# Run all checks (format, lint, type check, test)
npm run check
```

### WooCommerce Integration

This application is built as a headless frontend for WooCommerce. It requires:

- A WordPress installation with WooCommerce plugin
- WooCommerce REST API enabled and accessible over HTTPS
- API keys with appropriate permissions (see [WooCommerce REST API docs](https://woocommerce.github.io/woocommerce-rest-api-docs/))

The app communicates with WooCommerce exclusively through its REST API for all e-commerce operations.

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
