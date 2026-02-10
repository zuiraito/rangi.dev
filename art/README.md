# Static Image Gallery

A simple, static image gallery with tag-based filtering, similar to booru-style imageboards.

## File Structure

```
your-gallery/
├── index.html          # Main HTML file
├── data.json           # Image metadata and tags
├── images/             # Directory for your images
│   ├── image001.jpg
│   ├── image002.jpg
│   └── ...
└── README.md          # This file
```

## Setup Instructions

1. **Create the images directory:**
   ```bash
   mkdir images
   ```

2. **Add your images:**
   - Place all your images in the `images/` directory
   - Supported formats: jpg, jpeg, png, gif, webp

3. **Edit data.json:**
   - Update the `filename` field to match your actual image filenames
   - Add or modify `tags` for each image
   - Update the `title` for each image
   - Add or remove image entries as needed

   Example entry:
   ```json
   {
     "id": 1,
     "filename": "my-photo.jpg",
     "title": "Beautiful Sunset",
     "tags": ["landscape", "sunset", "nature"]
   }
   ```

4. **Open index.html in your browser:**
   - Just double-click `index.html` or
   - Serve it with a local web server (recommended for better performance)

## Using a Local Web Server (Optional but Recommended)

Some browsers have restrictions on loading local JSON files. For best results, use a simple web server:

### Python (if you have Python installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Node.js (if you have Node installed):
```bash
npx http-server
```

## Adding New Images

1. Add the image file to the `images/` directory
2. Add a new entry to `data.json`:
   ```json
   {
     "id": 13,
     "filename": "new-image.jpg",
     "title": "My New Image",
     "tags": ["tag1", "tag2", "tag3"]
   }
   ```
3. Refresh the page

## Customization

### Change the images directory name:
In `index.html`, find this line and change it:
```javascript
const IMAGES_DIR = 'images/'; // Change this to your directory name
```

### Styling:
Edit the `<style>` section in `index.html` to customize colors, fonts, layout, etc.

### Grid size:
In the CSS, find `.gallery` and adjust:
```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
/* Change 200px to make thumbnails bigger or smaller */
```

## Tips

- Keep image filenames simple (no spaces, special characters)
- Use consistent image naming (e.g., img001.jpg, img002.jpg)
- Tags are case-sensitive and generated automatically from your data
- The tag list is built dynamically from all tags in data.json
- You can have as many tags per image as you want

## Deploying to the Web

This is a static site, so you can host it anywhere:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service
- Just upload all files including the images directory

Enjoy your gallery!
