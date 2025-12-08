#!/bin/bash

# Generate robots.txt for nexa.cafe
# This script creates a robots.txt file

cat > robots.txt << 'EOF'
# Robots.txt for nexa.cafe
# Generated on 2025-12-08

User-agent: *
Allow: /

# Disallow admin/private areas (future use)
Disallow: /admin/
Disallow: /private/

# Allow crawling of assets
Allow: /assets/
Allow: /css/
Allow: /js/

# Sitemap location
Sitemap: https://nexa.cafe/sitemap.xml
EOF

echo "✅ robots.txt generated successfully"
