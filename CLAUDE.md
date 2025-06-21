# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby-based TypeScript landing page for Angel Finance (Levvy), a cryptocurrency/DeFi project with Cardano blockchain integration. The site features a multi-section layout with wallet connectivity, tokenomics visualization, and interactive elements.

## Development Commands

```bash
# Start development server
npm run develop
# or
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clean build artifacts
npm run clean

# Type checking
npm run typecheck
```

## Architecture Overview

### Tech Stack
- **Framework**: Gatsby 5 with TypeScript
- **Styling**: Tailwind CSS + Material-UI (MUI) with custom theme
- **Fonts**: Albert Sans (primary), Cinzel (accent)
- **Blockchain**: Cardano wallet integration via CIP-30 standard

### Project Structure
```
src/
├── components/
│   ├── common/           # Shared layout components (header, footer, main-layout)
│   ├── sections/         # Landing page sections (section1-5)
│   └── coming/           # Coming soon page component
├── pages/                # Gatsby pages (index, 404, terms, policy)
├── scripts/              # Blockchain integration (bifrost.ts, types.ts)
├── images/               # Static assets organized by section
└── styles/               # Global CSS with Tailwind imports
```

### Key Components

**MainLayout** (`src/components/common/main-layout.tsx`):
- Wraps all pages with MUI ThemeProvider
- Defines custom color palette with gradient and chart colors
- Sets up typography with Albert Sans font family

**Landing Page Structure** (`src/pages/index.tsx`):
- Header → Section1 → Section2 → Section3 → Section4 → Section5 → Footer
- Each section is a separate component for modularity

**Cardano Integration** (`src/scripts/bifrost.ts`):
- `getWallets()` function detects available Cardano wallets
- Full TypeScript types for CIP-30 wallet API in `types.ts`
- Supports wallet connection, transaction signing, and data signing

## Custom MUI Theme

The project extends MUI's palette with custom colors:
- **gradient.levvy**: Main brand gradients (cyan to yellow)
- **gradient.button**: Button state colors (7 variations)
- **gradient.background**: Background gradients
- **chart**: Chart-specific color palette
- Dark theme with warm gold/amber primary colors

## Asset Organization

Images are organized by section in `src/images/`:
- `section1/`: Hero section assets
- `section2/`: Tokenomics visuals  
- `section3/`: Product showcase
- `section4/`: Interactive elements
- `section6/`: Additional content
- `socials/`: Social media icons as React components
- `icons/`: Utility icons as React components

## Development Notes

- TypeScript strict mode enabled
- Gatsby's GraphQL typegen enabled for type safety
- PostCSS configured for Tailwind processing
- Progressive Web App manifest configured
- Google Fonts integration for web font optimization
- Images optimized through Gatsby's image processing pipeline

## Wallet Integration

The project includes comprehensive Cardano wallet support:
- Runtime wallet detection via `window.cardano`
- Type-safe wallet API interactions
- Support for addresses, UTXOs, transaction signing
- Event handling for wallet state changes
- Experimental features like collateral management

## Styling Approach

Hybrid styling approach combining:
- **Tailwind**: Utility classes for layout and spacing
- **MUI**: Component theming and complex UI elements  
- **Global CSS**: Base styles and Tailwind imports
- **Inline styles**: Component-specific customizations via MUI's sx prop