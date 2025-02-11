# Next.js CRUD Application with DummyJSON Integration

This project demonstrates a basic CRUD (Create, Read, Update, Delete) application built with Next.js 13, integrating with the dummyJSON API for product data.  It utilizes the Next.js App Router, Server Components, and SWR for state management and data fetching.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Application Structure](#application-structure)
- [Setup Instructions](#setup-instructions)
- [Design Decisions](#design-decisions)

## Features

- **Product Listing:** Displays a paginated list of products fetched from the dummyJSON API.
- **Product Details:** Displays detailed information for a specific product.
- **Product Creation:** Allows users to create new products.
- **Product Update:** Allows users to update existing products.
- **Product Deletion:** Allows users to delete products.
- **Optimistic Updates:** The UI updates immediately when a product is created, updated, or deleted, providing a better user experience. SWR handles any potential errors and reverts the UI if the API request fails.
- **Error Handling:** Basic error handling is included, but should be expanded upon in a production application.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **Next.js:** React framework for server-side rendering and static site generation.
- **SWR:** React Hook for data fetching.
- **Context API:** React's built-in solution for managing application state.
- **Shadcn UI:** Component library for styling.

## Application Structure
src/
├── app/
│   ├── layout.tsx                // Root layout
│   ├── page.tsx                  // Main product list page
│   ├── products/
│   │   ├── [id]/
│   │   │   └── page.tsx         // Dynamic route for product details
│   │   ├── create/
│   │   │   └── page.tsx         // Page for creating a new product
│   │   └── edit/
│   │       └── page.tsx         // Page for edit an existing product
├── components/          # Reusable UI components
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   ├── ProductDetails.tsx
│   ├── ProductForm.tsx
│   ├── Shared/
│   │   └── LoadingSpinner.tsx
│   └── ui/
│       └── button.tsx (Shadcn components)
│       └── card.tsx (Shadcn components)
│       └── input.tsx (Shadcn components)
│       └── label.tsx (Shadcn components)
├── lib/                 # Utility functions and API interaction
│   └── api.js
├── public/              # Static assets
├── styles/             # Global styles
├── .env.local          # Environment variables
├── package.json
└── README.md