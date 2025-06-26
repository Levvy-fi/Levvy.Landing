#!/bin/bash

# FFmpeg Image Optimization Script for Angel Finance
# This script optimizes all images for web performance

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create optimized directory
OPTIMIZED_DIR="../static/images/optimized"
mkdir -p "$OPTIMIZED_DIR"

echo -e "${GREEN}🎬 Starting image optimization with FFmpeg...${NC}\n"

# Function to get file size in human readable format
get_size() {
    ls -lh "$1" | awk '{print $5}'
}

# Function to optimize WebP images
optimize_webp() {
    local input="$1"
    local output_base="$2"
    local original_size=$(get_size "$input")
    
    echo -e "${YELLOW}Processing: $input (${original_size})${NC}"
    
    # Get dimensions
    dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$input" 2>/dev/null)
    width=$(echo $dimensions | cut -d'x' -f1)
    height=$(echo $dimensions | cut -d'x' -f2)
    
    # Desktop version (max 1920px width, quality 85)
    if [ $width -gt 1920 ]; then
        ffmpeg -i "$input" -vf "scale=1920:-1" -quality 85 -compression_level 6 "$output_base-desktop.webp" -y 2>/dev/null
        echo -e "  ✓ Desktop: $(get_size "$output_base-desktop.webp")"
    else
        ffmpeg -i "$input" -quality 85 -compression_level 6 "$output_base-desktop.webp" -y 2>/dev/null
        echo -e "  ✓ Desktop: $(get_size "$output_base-desktop.webp")"
    fi
    
    # Tablet version (max 1024px width, quality 80)
    if [ $width -gt 1024 ]; then
        ffmpeg -i "$input" -vf "scale=1024:-1" -quality 80 -compression_level 6 "$output_base-tablet.webp" -y 2>/dev/null
        echo -e "  ✓ Tablet: $(get_size "$output_base-tablet.webp")"
    fi
    
    # Mobile version (max 640px width, quality 75)
    if [ $width -gt 640 ]; then
        ffmpeg -i "$input" -vf "scale=640:-1" -quality 75 -compression_level 6 "$output_base-mobile.webp" -y 2>/dev/null
        echo -e "  ✓ Mobile: $(get_size "$output_base-mobile.webp")"
    fi
    
    echo ""
}

# Function to convert PNG to WebP
convert_png_to_webp() {
    local input="$1"
    local output_base="$2"
    local original_size=$(get_size "$input")
    
    echo -e "${YELLOW}Converting PNG: $input (${original_size})${NC}"
    
    # Convert with high quality
    ffmpeg -i "$input" -quality 90 -compression_level 6 "$output_base.webp" -y 2>/dev/null
    echo -e "  ✓ WebP: $(get_size "$output_base.webp")"
    
    # Also create responsive versions
    dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$input" 2>/dev/null)
    width=$(echo $dimensions | cut -d'x' -f1)
    
    if [ $width -gt 1024 ]; then
        ffmpeg -i "$input" -vf "scale=1024:-1" -quality 85 "$output_base-1024.webp" -y 2>/dev/null
        echo -e "  ✓ 1024px: $(get_size "$output_base-1024.webp")"
    fi
    
    echo ""
}

# 1. Optimize the massive section_bg.webp (6MB)
echo -e "${GREEN}1. Optimizing section backgrounds...${NC}"
optimize_webp "../static/images/section4/section_bg.webp" "$OPTIMIZED_DIR/section4_bg"

# 2. Convert and optimize PNG files
echo -e "${GREEN}2. Converting PNG to WebP...${NC}"
convert_png_to_webp "../static/images/angelfinance_preview.png" "$OPTIMIZED_DIR/angelfinance_preview"

# 3. Optimize other large WebP files
echo -e "${GREEN}3. Optimizing other large images...${NC}"

# Section 4 images
optimize_webp "../static/images/section4/card_bg2_mobile.webp" "$OPTIMIZED_DIR/section4_card_bg2_mobile"
optimize_webp "../static/images/section4/card_bg2.webp" "$OPTIMIZED_DIR/section4_card_bg2"

# Section 2 background
optimize_webp "../static/images/section2/background.webp" "$OPTIMIZED_DIR/section2_bg"

# Section 3 images
optimize_webp "../static/images/section3/levvy_showcase.webp" "$OPTIMIZED_DIR/section3_levvy_showcase"
optimize_webp "../static/images/section3/levvy_mascot.webp" "$OPTIMIZED_DIR/section3_levvy_mascot"

# Section 6 images
optimize_webp "../static/images/section6/card_bg.webp" "$OPTIMIZED_DIR/section6_card_bg"
optimize_webp "../static/images/section6/section6_bg.webp" "$OPTIMIZED_DIR/section6_bg"

# 4. Create a summary
echo -e "${GREEN}Optimization Summary:${NC}"
echo -e "Original total size: $(du -sh ../static/images | cut -f1)"
echo -e "Optimized total size: $(du -sh $OPTIMIZED_DIR | cut -f1)"

# 5. Generate responsive image component helper
cat > "$OPTIMIZED_DIR/responsive-images.json" << EOF
{
  "section4_bg": {
    "desktop": "/images/optimized/section4_bg-desktop.webp",
    "tablet": "/images/optimized/section4_bg-tablet.webp",
    "mobile": "/images/optimized/section4_bg-mobile.webp",
    "original": "/images/section4/section_bg.webp"
  },
  "angelfinance_preview": {
    "webp": "/images/optimized/angelfinance_preview.webp",
    "webp_1024": "/images/optimized/angelfinance_preview-1024.webp",
    "original": "/images/angelfinance_preview.png"
  }
}
EOF

echo -e "\n${GREEN}✅ Optimization complete!${NC}"
echo -e "Next steps:"
echo -e "1. Review optimized images in: $OPTIMIZED_DIR"
echo -e "2. Update components to use responsive images"
echo -e "3. Implement lazy loading"
echo -e "4. Test performance improvements"