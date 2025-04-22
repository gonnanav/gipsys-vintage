# Gipsy's Vintage Web App

A modern, full-stack e-commerce application built with Next.js, React Server Components, TypeScript, and WooCommerce integration.

![Status: Under Development](https://img.shields.io/badge/Status-Under%20Development-yellow)

## Project Overview

This project implements a full-stack e-commerce application for Gipsy's Vintage, a boutique selling curated vintage clothing items for women to a local Israeli audience. The application leverages Next.js and React Server Components for an optimized user experience, with WooCommerce serving as the backing e-commerce platform.

## ⚠️ Development Status

**IMPORTANT**: This project is currently under active development and is not yet operational.

## Technical Highlights

- **Full-Stack Implementation**: Next.js with TypeScript, React Server Components, and server-side rendering
- **Testing**: Jest for unit testing, React Testing Library for component testing, and Playwright for E2E tests
- **State Management**: Zustand for global state management with custom hooks for encapsulating data access
- **API Integration**: Type-safe WooCommerce REST API client with proper error handling
- **Development Workflow**: ESLint, Prettier, TypeScript, and Jest for code quality
- **UI Development**: Storybook for component development and documentation

## Usage Terms

This project is publicly accessible for educational purposes, but it is not open-source. For detailed terms, please see the [LICENSE](./LICENSE) file.

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

# Run all checks (format, lint, type check, test)
npm run check
```

### WooCommerce Integration

This application is built as a headless frontend for WooCommerce. It requires:

- A WordPress installation with WooCommerce plugin
- WooCommerce REST API enabled and accessible over HTTPS
- API keys with appropriate permissions (see [WooCommerce REST API docs](https://woocommerce.github.io/woocommerce-rest-api-docs/))

The app communicates with WooCommerce exclusively through its REST API for all e-commerce operations.
