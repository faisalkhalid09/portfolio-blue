# Modern Portfolio Website (GBP 1500)

This is the modern, animated portfolio website for Rantilini S. Samaratunga. It features a contemporary design with smooth animations, interactive elements, and a responsive layout.

## Features

- **Modern Design**: Clean, contemporary layout with smooth animations
- **Interactive Elements**: Animated hero section with orbital tech icons
- **Responsive**: Works perfectly on all device sizes
- **Theme Toggle**: Light/dark mode support
- **Skill Bars**: Animated progress bars for technical skills
- **Project Filtering**: Dynamic project filtering by category
- **Contact Form**: Interactive contact form with validation
- **Self-contained**: No external backend dependencies

## File Structure

```
GBP 1500/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── scripts.js          # JavaScript functionality
├── server.py           # Simple Python server (optional)
└── README.md           # This file
```

## Running the Website

### Option 1: Simple Python Server (Recommended)

```bash
python server.py
```

This will start a local server at `http://localhost:3001` and automatically open your browser.

### Option 2: Using Python's built-in server

```bash
python -m http.server 3001
```

Then open `http://localhost:3001` in your browser.

### Option 3: Direct File Opening

You can also open `index.html` directly in your browser, though some features may not work due to CORS restrictions.

## Website Sections

1. **Hero Section**: Animated introduction with role rotation
2. **About**: Professional background and expertise areas
3. **Skills**: Technical skills with animated progress bars
4. **Projects**: Portfolio projects with filtering capabilities
5. **Contact**: Contact information and form

## Key Differences from GBP 500

- **Design**: Modern, animated design vs. traditional layout
- **Dependencies**: Self-contained vs. FastAPI backend
- **Projects**: Hardcoded in JavaScript vs. JSON API
- **Interactivity**: More animations and interactive elements
- **Port**: Runs on 3001 vs. 8080 for the other website

## Customization

- **Projects**: Edit the `projects` array in `scripts.js`
- **Colors**: Modify CSS custom properties in `styles.css`
- **Content**: Update text content in `index.html`
- **Animations**: Adjust animation parameters in CSS

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

This website is optimized for performance with:
- Minimal dependencies (no external libraries)
- Efficient CSS animations
- Lazy loading concepts
- Responsive images

## 🚀 Deployment

This website is ready for production deployment! See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy Options:

**🌐 Netlify (Recommended)**
```bash
# Push to GitHub, then connect to Netlify
# Automatic deployment with included netlify.toml
```

**🐳 Docker**
```bash
docker-compose up -d
# Access at http://localhost:3001
```

**☁️ Vercel**
```bash
npm i -g vercel
vercel
```

### Files Included for Deployment:
- `Dockerfile` - Container configuration
- `docker-compose.yml` - Multi-container setup
- `netlify.toml` - Netlify deployment config
- `vercel.json` - Vercel deployment config
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `gunicorn.conf.py` - Production server config
- `requirements.txt` - Python dependencies

---

**Note**: This is the modern version (GBP 1500) of the portfolio. The traditional version with FastAPI backend is located in the "GBP 500" folder.
