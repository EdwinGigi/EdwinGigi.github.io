# Edwin Gigi - Portfolio Website

A world-class, highly interactive portfolio website built with React and Vite. Designed with a sleek glassmorphism aesthetic, a dynamic Light/Dark mode system, and a custom physics-based HTML5 Canvas background.

## 🌟 Features

- **Modern Glassmorphism Design**: Clean, frosted glass panels with premium typography and depth.
- **Dynamic Light & Dark Modes**: Seamless theme switching that persists user preference.
- **Interactive HTML5 Canvas Matrix**: A custom background where data streams react to cursor movement with glowing trails and ink-bleed effects.
- **Magnetic Custom Cursor**: A trailing, physics-based cursor that smoothly expands over interactive elements.
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
│   │   ├── data/       # portfolio-data.json (Source of truth for projects and profile info)
│   │   ├── pages/      # Route pages (Home, Projects, etc.)
│   │   ├── index.css   # Global Tailwind and custom theme variables
│   │   └── App.jsx     # Main application and routing shell
│   ├── vite.config.js  # Vite configuration
│   └── package.json    # React dependencies
└── .github/workflows/
    └── deploy.yml      # GitHub Actions deployment workflow
```
