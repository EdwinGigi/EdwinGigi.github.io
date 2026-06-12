# Edwin Gigi - Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing my projects and professional experience.

## 🌟 Features

- **Modern Design**: Clean layout, responsive, smooth animations.
- **Dynamic Content**: Data is driven by `backend/data.json` and generated as a static API.
- **React Router**: Single Page Application routing.

## 🌐 Live Website

Visit the live website at: [edwingigi.github.io](https://edwingigi.github.io)

## 🛠️ Technologies Used

- React 19
- Vite
- Bootstrap 5
- Framer Motion
- React Router DOM
- GitHub Pages + GitHub Actions for deployment

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
   This will run `generate-api.js` to create a static API from `backend/data.json` and start the Vite dev server at `http://localhost:5173`.

4. **Building for Production**
   ```bash
   npm run build
   ```
   The production files will be output to `frontend/dist`.

## ⚙️ Deployment to GitHub Pages

The project uses GitHub Actions to deploy to GitHub Pages automatically when changes are pushed to the `master` branch.

**Important**: Ensure that in your repository's **Settings > Pages > Build and deployment**, the "Source" is set to **GitHub Actions**, not "Deploy from a branch". If you had "Deploy from a branch" selected previously, the Action would not trigger correctly.

## 📂 Project Structure

```
.
├── backend/
│   └── data.json       # Source of truth for portfolio data
├── frontend/
│   ├── public/         # Static assets and generated API
│   ├── src/            # React components and pages
│   ├── vite.config.js  # Vite configuration
│   └── package.json    # React dependencies
└── .github/workflows/
    └── deploy.yml      # GitHub Actions deployment workflow
```
