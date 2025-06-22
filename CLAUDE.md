# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Docusaurus 3-based TypeScript landing page and documentation site** for Angel Finance (Levvy), a cryptocurrency/DeFi project with Cardano blockchain integration. The site features a multi-section landing page with wallet connectivity, tokenomics visualization, and interactive elements, plus documentation capabilities.

**Migration Status**: ✅ **Phase 2 Complete** - Successfully migrated from Gatsby to Docusaurus with all landing page components functioning.

## Development Commands

```bash
# Start development server
npm start
# or
docusaurus start

# Build for production
npm run build
# or
docusaurus build

# Serve production build locally
npm run serve
# or
docusaurus serve

# Clear build artifacts
npm run clear
# or
docusaurus clear

# Type checking
npm run typecheck
```

## Architecture Overview

### Tech Stack
- **Framework**: Docusaurus 3.8.1 with TypeScript
- **Styling**: Tailwind CSS v3 + Material-UI (MUI) v7 with custom theme
- **Fonts**: Albert Sans (primary), Cinzel (accent)
- **Blockchain**: Cardano wallet integration via CIP-30 standard
- **Build Tool**: React 19 with modern tooling
- **Testing**: Playwright for browser automation and testing

### Project Structure
```
├── docs/                     # Docusaurus documentation pages
├── src/
│   ├── components/
│   │   ├── common/           # Shared layout components (Header, Footer, MainLayout)
│   │   ├── sections/         # Landing page sections (Section1-5)
│   │   └── HomepageFeatures/ # Default Docusaurus components
│   ├── pages/                # Docusaurus pages (index.tsx, markdown-page.md)
│   └── css/                  # Global CSS with Tailwind imports
├── static/
│   ├── images/               # Landing page assets organized by section
│   └── img/                  # Docusaurus default assets and favicon
├── old/                      # Original Gatsby codebase (preserved)
├── docusaurus.config.ts      # Main Docusaurus configuration
├── sidebars.ts              # Documentation sidebar configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

### Key Components

**MainLayout** (`src/components/common/MainLayout.tsx`):
- Wraps all pages with MUI ThemeProvider
- Defines custom color palette with gradient and chart colors
- Sets up typography with Albert Sans font family

**Landing Page Structure** (`src/pages/index.tsx`):
- Uses Docusaurus Layout wrapper with custom title and meta
- Header → Section1 → Section2 → Section3 → Section4 → Section5 → Footer
- Each section is a separate component for modularity
- Homepage CSS class hides Docusaurus navbar/footer using `:has()` selector

**Cardano Integration** (preserved from old Gatsby structure):
- CIP-30 wallet detection and connection
- Full TypeScript types for wallet API interactions
- Support for addresses, UTXOs, transaction signing

## Docusaurus Configuration

**Site Metadata**:
- Title: "Angel Finance • Official Website" (bullet separator)
- Favicon: SVG format for better quality
- Open Graph: Custom preview image for social sharing
- URL: https://angelfinance.io

**Theme Customization**:
- Navbar title empty to prevent duplication in browser tab
- Custom CSS in `src/css/custom.css` with Docusaurus overrides
- Backdrop-blur effect requires `!important` due to Docusaurus CSS specificity

## Custom MUI Theme

The project extends MUI's palette with custom colors:
- **gradient.levvy**: Main brand gradients (cyan to yellow)
- **gradient.button**: Button state colors (7 variations)
- **gradient.background**: Background gradients
- **chart**: Chart-specific color palette for tokenomics
- Dark theme with warm gold/amber primary colors

## Tailwind Configuration

**Custom Spacing Values**: Extensive spacing scale (13-500) to match original design:
```javascript
spacing: {
  '18': '4.5rem',    // 72px
  '22': '5.5rem',    // 88px
  '25': '6.25rem',   // 100px
  // ... up to '500': '125rem'
}
```

**Custom Border Radius**: Support for `rounded-4xl` and other large radius values

**Font Families**: Albert Sans (primary) and Cinzel (accent fonts)

## Asset Organization

**Static Images** (`static/images/`):
- `section1/`: Hero section assets (angel.svg, background.webp, shine.webp)
- `section2/`: Tokenomics visuals (background.webp, tokenomics.webp)
- `section3/`: Product showcase (levvy_*.webp, stars_*.svg)
- `section4/`: Interactive elements (card_bg*.webp, qr_code.webp)
- `section6/`: Additional content (angel_coin.webp, section6_bg.webp)
- `socials/`: Social media icons as React components (discordIcon.tsx, xIcon.tsx)
- `icons/`: Utility icons as React components (wallet.tsx, browser.tsx, etc.)

**Image Paths**: All images use Docusaurus static paths (`/images/...`) instead of imports

## CSS Architecture

**Three-Layer Approach**:
1. **Tailwind**: Utility classes for layout, spacing, and responsive design
2. **MUI**: Component theming and complex UI elements via `sx` prop
3. **Custom CSS**: Global styles, Docusaurus overrides, and glass effects

**Critical CSS Overrides** (`src/css/custom.css`):
```css
/* Hide Docusaurus navbar/footer on homepage */
.homepage:has(.navbar) .navbar,
.homepage:has(.footer) .footer {
  display: none !important;
}

/* Fix backdrop-blur for glass effect */
.backdrop-blur-md\! {
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}
```

## Tokenomics Implementation

**Current Allocation** (1,000,000 total ANGELS supply):
- **10% LP** (100,000 tokens) - Liquidity Pool
- **44.4% Sale** (444,000 tokens) - Public sale
- **45.6% Replacement Drop** (456,000 tokens) - LEVVY holder migration
- **0% Team** - Team purchases allocation

**Technical Implementation**:
- Interactive PieChart using MUI X Charts v8
- Responsive sizing with dynamic chart dimensions
- Custom color palette from `theme.palette.chart`
- Data structure in `tokenomicItems` array for easy updates

## Migration Notes

**Completed Phases**:
- ✅ **Phase 1**: Moved Gatsby code to `/old/`, initialized Docusaurus
- ✅ **Phase 2**: Recreated all landing page components with pixel-perfect fidelity

**Key Migration Changes**:
- Image imports → static paths (`/images/...`)
- Gatsby Layout → Docusaurus Layout wrapper
- CSS Modules → Tailwind utilities where possible
- Preserved all MUI theme and component functionality
- Maintained Cardano wallet integration

**Pending Phases**:
- **Phase 3**: Migrate Angel Paper documentation content
- **Phase 4**: Update build and deployment configuration
- **Phase 5**: Quality assurance and testing

## Development Guidelines

**Component Patterns**:
- Prefer Tailwind utilities over MUI `sx` props where possible
- Use MUI for complex theming and Material Design components
- Maintain responsive design with mobile-first approach
- Follow existing naming conventions (PascalCase components, Section1-5)

**Asset Management**:
- Use static paths for all images (`/images/section1/...`)
- Optimize images in WebP format where possible
- Organize assets by section for maintainability

**Code Style**:
- TypeScript strict mode enabled
- No inline comments unless explicitly requested
- Preserve existing code patterns and component structure
- Use conventional commits for git messages

## Browser Testing

**Playwright Integration**:
- Use `bun x playwright` for browser automation
- Scripts should be placed in `/scripts/` directory
- Useful for visual regression testing and DOM inspection

## Deployment

**Current Configuration**:
- GitHub Pages deployment ready
- Production URL: https://angelfinance.io
- Build artifacts optimized for static hosting
- PWA manifest configured for progressive web app features