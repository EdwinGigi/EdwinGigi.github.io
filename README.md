# Edwin Gigi - Portfolio Website

A world-class, highly interactive portfolio website built with React and Vite. Designed with a sleek glassmorphism aesthetic, a dynamic Light/Dark mode system, and stunning custom background physics.

## 🌟 Features

- **Modern Glassmorphism Design**: Clean, frosted glass panels with premium typography, fluid animations, and depth.
- **Dynamic Blog Engine**: A lightweight, performant markdown-ready blog system driven by a single JSON data source. Features dynamic routing and fully responsive reading layouts.
- **Dual Interactive Backgrounds**:
  - **Matrix Rain Canvas**: A custom HTML5 Canvas background where matrix data streams fall endlessly, reacting to cursor movements with glowing trails and ink-bleed effects.
  - **Fluid Cursor Gradient**: A smooth, liquid-like gradient orb that tracks the mouse using spring physics across content pages, adapting colors to light and dark modes.
- **Morphing Cyberpunk Cursor**: A stylized geometric cursor that instantly tracks movement and features a morphing, spring-trailed outline that reacts to clickable elements.
- **Dynamic Light & Dark Modes**: Seamless theme switching that transforms gradients, blurs, and shadows while persisting user preference.
- **3D Hover Tilt**: Featured project cards utilize Framer Motion spring physics to tilt dynamically towards the cursor.

## 🌐 Live Website

Visit the live website at: [edwingigi.github.io](https://edwingigi.github.io)

## 🛠️ Technologies Used

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion**
- **HTML5 Canvas API**
- **React Router DOM**
- **GitHub Pages + GitHub Actions** for automated CI/CD deployment

## 🚀 Setup and Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/EdwinGigi/EdwinGigi.github.io.git
   cd EdwinGigi.github.io
   ```

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Local Development**
   ```bash
   npm run dev
   ```
   This will start the Vite dev server at `http://localhost:5173`.

4. **Building for Production**
   ```bash
   npm run build
   ```
   The optimized production files will be output to `frontend/dist`.

## ⚙️ Deployment to GitHub Pages

The project uses GitHub Actions to deploy to GitHub Pages automatically when changes are pushed to the `master` branch.

**Important**: Ensure that in your repository's **Settings > Pages > Build and deployment**, the "Source" is set to **GitHub Actions**, not "Deploy from a branch".

## 📂 Project Structure

```text
.
├── frontend/
│   ├── public/         # Static assets like images
│   ├── src/            
│   │   ├── components/ # Reusable UI components (Navbar, MatrixBackground, CustomCursor)
│   │   ├── data/       # portfolio-data.json (Source of truth for projects, blog posts, and profile)
│   │   ├── pages/      # Route pages (Home, Projects, Blog, BlogPost, etc.)
│   │   ├── index.css   # Global Tailwind and custom theme variables
│   │   └── App.jsx     # Main application and routing shell
│   ├── vite.config.js  # Vite configuration
│   └── package.json    # React dependencies
└── .github/workflows/
    └── deploy.yml      # GitHub Actions deployment workflow
```
