# Original Gatsby Implementation - Angel Finance Landing Page

This directory contains the original Gatsby-based implementation of the Angel Finance landing page, preserved for reference during the migration to Docusaurus.

## Original Structure
- `src/` - React components, pages, and assets
- `gatsby-config.ts` - Gatsby configuration
- `gatsby-browser.js` - Browser-specific configuration  
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration

## Key Components Preserved
- **MainLayout**: MUI ThemeProvider with custom Angel Finance theme
- **Section1-5**: Landing page sections with tokenomics, features, etc.
- **Cardano Integration**: Wallet connection via CIP-30 standard
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Migration Notes
This code was migrated to Docusaurus on [DATE] to:
1. Unify landing page and documentation under one framework
2. Improve documentation management and SEO
3. Simplify build and deployment processes

The new Docusaurus implementation recreates all functionality while adding comprehensive documentation support.