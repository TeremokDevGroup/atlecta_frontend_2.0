# atlecta_frontend_2.0
A platform for finding sports facilities and training partners

# React + TypeScript + Vite Project

This project provides a starter template for building applications with React, TypeScript, and Vite, including environment configuration for Yandex Maps and API integration.

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn (recommended)

## Getting Started

1. Clone the repository:
```bash
git clone <your-repository-url>

cd <project-directory>

yarn install
# or
npm install

Create a .env file in the project root with the following variables:
VITE_YANDEX_MAP_API_KEY=your_yandex_maps_api_key
VITE_API_KEY=your_api_key
VITE_API_URL=your_api_base_url

Development
yarn dev
# or
npm run dev

/src
  /assets       # Static assets (images, fonts, etc.)
  /components   # Reusable components
  /hooks        # Custom hooks
  /pages        # Application pages
  /services     # API services
  /styles       # Global styles
  /types        # TypeScript type definitions
  /utils        # Utility functions
  App.tsx       # Main application component
  main.tsx      # Application entry point
vite.config.ts  # Vite configuration