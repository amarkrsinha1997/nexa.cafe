# nexa.cafe

> **The future of payments meets cozy cafe culture**

A modern, static website showcasing cafes and restaurants that accept [Nexa](https://nexa.org) cryptocurrency. Built with vanilla HTML, SCSS, and JavaScript with multi-language support.

![nexa.cafe](https://img.shields.io/badge/nexa-cafe-FFE144?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-UNLICENSED-red?style=for-the-badge)

---

## 🌟 Features

- **🎨 Modern Dark Design** - Warm, inviting aesthetic with Nexa yellow accents and cafe-inspired colors
- **🌍 Multi-language Support** - Built-in i18n system (English, Hindi, Spanish)
- **📱 Fully Responsive** - Mobile-first design that works beautifully on all devices
- **⚡ Fast & Lightweight** - No frameworks, pure vanilla JavaScript
- **🎯 SEO Optimized** - Semantic HTML, meta tags, sitemap, robots.txt
- **♿ Accessible** - WCAG-compliant with proper ARIA labels and keyboard navigation
- **🔄 Dynamic Cafe Listing** - Easily add cafes via JSON data structure

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/nexacafe/nexa.cafe.git
cd nexa.cafe

# Install dependencies
npm install

# Start development server with live reload
npm run dev
```

The site will be available at `http://localhost:3000` (or the port shown in terminal).

---

## 📦 Build Commands

```bash
# Development mode - watch SCSS and serve with live reload
npm run dev

# Build for production - compile and minify CSS
npm run build

# Serve production build
npm run serve

# Watch SCSS files only
npm run sass

# Compile SCSS once (production)
npm run sass:build

# Generate SEO files
npm run seo              # Generate both sitemap and robots.txt
npm run sitemap          # Generate sitemap.xml
npm run robots           # Generate robots.txt
```

---

## 📁 Project Structure

```
nexa.cafe/
├── index.html                 # Main HTML file
├── package.json              # npm configuration
├── manifest.json             # PWA manifest
├── robots.txt                # SEO robots file
├── sitemap.xml              # SEO sitemap
│
├── scss/                     # SCSS source files
│   ├── _variables.scss      # Design tokens (colors, fonts, spacing)
│   ├── _mixins.scss         # Reusable SCSS mixins
│   └── styles.scss          # Main stylesheet (imports all partials)
│
├── css/                      # Compiled CSS (generated)
│   └── styles.css           # Compiled from SCSS
│
├── js/                       # JavaScript files
│   ├── content.config.js    # English translations (default)
│   ├── content.hi.js        # Hindi translations
│   ├── content.es.js        # Spanish translations
│   └── main.js              # Main JavaScript (i18n, rendering, interactivity)
│
├── assets/                   # Static assets
│   ├── icons/               # Favicons and PWA icons
│   └── images/              # Images and graphics
│
└── scripts/                  # Build and utility scripts
    ├── generate-sitemap.sh  # Generate sitemap.xml
    └── generate-robots.sh   # Generate robots.txt
```

---

## 🎨 Design System

### Color Palette

| Purpose | Color | Hex Code |
|---------|-------|----------|
| **Primary Brand** | Nexa Yellow | `#FFE144` |
| Primary Soft | Nexa Light Yellow | `#FFFD9D` |
| **Backgrounds** | Dark Main | `#05070B` |
| Background Alt | Dark Alt | `#0C1017` |
| Card Background | Dark Card | `#111623` |
| **Accents** | Cafe Latte | `#C58A3A` |
| Fresh Mint | Mint Green | `#43D9B8` |
| **Text** | Main Text | `#D6D9E0` |
| Heading Text | Light Text | `#F5F7FA` |
| Muted Text | Grey Text | `#8A91A2` |
| **Borders** | Border | `#202635` |

### Typography

- **Display Font**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) - Headings
- **UI Font**: [Inter](https://fonts.google.com/specimen/Inter) - Body text, UI elements
- **Base Size**: 16px (responsive)
- **Line Height**: 1.5 (body), 1.2 (headings)

### Spacing Scale

Based on 8px grid: `4px`, `8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`

### Border Radius

- Small: `4px`
- Medium: `8px`
- Large: `12px`
- XL: `16px`
- 2XL: `24px`
- Pill: `999px`

---

## 🌐 Internationalization (i18n)

### Supported Languages

- **English (en)** - Default
- **Hindi (hi)** - हिन्दी
- **Spanish (es)** - Español

### Adding a New Language

1. Create new content file: `js/content.[lang].js`
2. Copy structure from `js/content.config.js`
3. Translate all text values
4. Add to HTML:
   ```html
   <script src="/js/content.[lang].js"></script>
   ```
5. Add button to language switcher:
   ```html
   <button class="lang-switcher__btn" data-lang="[lang]">[LANG]</button>
   ```
6. Update `I18n` class in `main.js` to include new language

### Using i18n in HTML

Add `data-i18n` attribute with translation key:

```html
<h1 data-i18n="hero.title">Pay with Nexa at your favorite cafes</h1>
<p data-i18n="hero.subtitle">Discover restaurants...</p>
```

---

## ☕ Adding Cafes

Edit the `cafesData` array in `js/main.js`:

```javascript
const cafesData = [
  {
    id: 1,
    name: "Crypto Coffee House",
    city: "San Francisco",
    country: "USA",
    cuisines: ["Coffee", "Pastries", "Breakfast"],
    image: "https://images.unsplash.com/photo-...",
    isComingSoon: false,
    tags: ["Wi-Fi", "Pet-Friendly"]
  },
  // Add more cafes...
];
```

Or use the API:

```javascript
window.nexaCafe.addCafe({
  id: 7,
  name: "Your Cafe Name",
  // ... rest of cafe data
});
```

---

## 🚢 Deployment

### Static Hosting (Recommended)

The built site is 100% static and can be deployed to:

- **Cloudflare Pages** - Recommended, global CDN
- **Netlify** - Easy continuous deployment
- **Vercel** - Excellent performance
- **GitHub Pages** - Free for public repos
- **AWS S3 + CloudFront**

### Build for Production

```bash
# 1. Build CSS
npm run build

# 2. Generate SEO files
npm run seo

# 3. Upload entire project directory to hosting provider
# (Make sure to serve index.html as default)
```

### Example: Cloudflare Pages

1. Connect your GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `./` (root)
4. Deploy!

### Custom Domain

Update these files with your domain:

- `sitemap.xml` - Replace `https://nexa.cafe/` with your domain
- `robots.txt` - Update Sitemap URL
- `manifest.json` - Update `start_url` if needed
- `index.html` - Update Open Graph URLs

---

## 🔧 Development

### SCSS Architecture

- **`_variables.scss`** - Design tokens (colors, fonts, spacing, breakpoints)
- **`_mixins.scss`** - Reusable mixins (buttons, cards, responsive breakpoints)
- **`styles.scss`** - Main stylesheet with all component styles

### JavaScript Modules

- **`I18n` class** - Multi-language content management
- **`CafeRenderer` class** - Dynamic cafe card generation
- **`SmoothScroll` class** - Smooth anchor link scrolling
- **`MobileMenu` class** - Mobile navigation toggle
- **`ActiveNav` class** - Active section highlighting on scroll

### Making Style Changes

1. Edit SCSS files in `/scss` directory
2. Run `npm run sass` (or `npm run dev` for watch mode)
3. CSS auto-compiles to `/css/styles.css`

---

## 📱 PWA Support

The site includes a `manifest.json` for Progressive Web App capabilities:

- Add to home screen on mobile
- Standalone app experience
- Custom theme color (#FFE144)
- App icons (need to be added to `/assets/icons/`)

### Adding PWA Icons

Generate icons at these sizes and place in `/assets/icons/`:

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`
- `apple-touch-icon.png` (180x180)
- `favicon-32x32.png`
- `favicon-16x16.png`

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

UNLICENSED - Private/Proprietary

---

## 🔗 Related Projects

- **[Nekka](https://nekka.com)** - Nexa Fixed Deposit DeFi Platform
- **[Nexa](https://nexa.org)** - The cryptocurrency powering cafe payments

---

## 💬 Support

- **Website**: [nexa.cafe](https://nexa.cafe)
- **Nekka Platform**: [nekka.com](https://nekka.com)
- **Email**: contact@nexa.cafe

---

## 🎉 Acknowledgments

- Built by the [Nekka](https://nekka.com) team
- Powered by [Nexa](https://nexa.org) cryptocurrency
- Design inspired by modern fintech and cozy cafe culture
- Cafe images from [Unsplash](https://unsplash.com)

---

**Made with ☕ and ⚡ by the Nekka team**
