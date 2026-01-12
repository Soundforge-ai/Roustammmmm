#!/bin/bash

# Directory containing the images
IMAGE_DIR="public/images/foto's"
ROOT_IMG_DIR="public/images"

echo "🖼️  Starting image optimization..."

# 1. Convert HEIC to JPG
if [ -f "$IMAGE_DIR/IMG_7212.heic" ]; then
    echo "Converting IMG_7212.heic to jpg..."
    sips -s format jpeg "$IMAGE_DIR/IMG_7212.heic" --out "$IMAGE_DIR/IMG_7212.jpg"
fi

# 2. Convert Gemini PNGs to JPG
for file in "$IMAGE_DIR"/Gemini_Generated_Image_*.png; do
    if [ -f "$file" ]; then
        filename=$(basename -- "$file")
        filename_no_ext="${filename%.*}"
        # Only convert if jpg doesn't exist to save time/resources or overwrite if needed
        # We overwrite to be sure
        echo "Converting $filename to jpg..."
        sips -s format jpeg -s formatOptions 80 "$file" --out "$IMAGE_DIR/$filename_no_ext.jpg"
    fi
done

# 3. Convert Large Root PNGs to JPG
# List of large files identified
LARGE_FILES=(
    "c67c2ffe-a42b-477f-a67d-10100999c4f0.png"
    "16676485-bd4d-49a4-a5a6-89e07254fa23.png"
    "ab28966c-9a91-4f93-bb29-8291a542b636.png"
    "c042e299-3e07-4212-b6a2-5c6297e61d69.png"
)

for file in "${LARGE_FILES[@]}"; do
    if [ -f "$ROOT_IMG_DIR/$file" ]; then
        filename="$file"
        filename_no_ext="${filename%.*}"
        echo "Converting $filename to jpg..."
        sips -s format jpeg -s formatOptions 80 "$ROOT_IMG_DIR/$file" --out "$ROOT_IMG_DIR/$filename_no_ext.jpg"
    fi
done

echo "✅ Optimization complete!"