# Assets Directory

This directory contains static assets for nexa.cafe.

## Structure

### `/icons`
- Favicons and PWA icons
- Recommended sizes: 16x16, 32x32, 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- Apple touch icon: 180x180
- Generate from source logo using tools like [Favicon Generator](https://realfavicongenerator.net/)

### `/images`
- Hero section images
- Cafe photos (currently using Unsplash placeholders)
- OG social share image (recommended: 1200x630px)
- Background textures or patterns

## Adding Assets

1. **Optimize images** before adding:
   - Use WebP format for photos (with PNG/JPG fallback)
   - Compress with tools like ImageOptim or TinyPNG
   - Recommended max width: 2000px for hero images, 800px for cafe cards

2. **Naming convention**:
   - Use lowercase with hyphens: `nexa-logo-yellow.svg`
   - Be descriptive: `hero-cafe-payment-mockup.png`

3. **Reference in code**:
   ```html
   <img src="/assets/images/your-image.jpg" alt="Description">
   ```

## Current Placeholders

- Cafe listing images are currently pulled from Unsplash
- Replace with actual cafe photos in production
- Add Nexa coin logo/icon in SVG format
- Add social icons if not using emoji fallbacks
