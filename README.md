# Edwin Gigi - Portfolio Website

A modern, responsive portfolio website built with Jekyll and Bootstrap, showcasing my projects and professional experience.

## 🌟 Features

- **Modern Design**
  - Clean and professional layout
  - Responsive design that works on all devices
  - Smooth animations and transitions
  - Modern card-based UI components

- **Dark Mode Support**
  - Automatic theme detection
  - Manual theme toggle
  - Persistent theme preference
  - Smooth theme transitions

- **Project Showcase**
  - Featured projects with detailed descriptions
  - Technology stack badges
  - Project screenshots with hover effects
  - Links to live demos and GitHub repositories

- **Professional Experience**
  - Timeline of work experience
  - Educational background
  - Technical skills showcase
  - Achievements and certifications

## 🌐 Live Website

Visit the live website at: [edwingigi.github.io](https://edwingigi.github.io)

## 🛠️ Technologies Used

- Jekyll - Static site generator
- SCSS - Advanced styling
- Bootstrap 5 - Frontend framework
- JavaScript - Interactivity and animations
- Font Awesome - Icons
- GitHub Pages - Hosting
- Listen - File system monitoring for Windows compatibility

## 🚀 Setup and Development

1. **Prerequisites**
   ```bash
   # Install Ruby (if not already installed)
   # For Windows, download from https://rubyinstaller.org/
   # For macOS/Linux:
   brew install ruby # macOS
   sudo apt-get install ruby-full # Ubuntu

   # Install Jekyll and Bundler
   gem install jekyll bundler
   ```

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/EdwinGigi/EdwinGigi.github.io.git
   cd EdwinGigi.github.io

   # Install dependencies
   bundle install
   ```

3. **Local Development**
   ```bash
   # Start the development server
   bundle exec jekyll serve

   # Visit http://localhost:4000 in your browser
   ```

4. **Building for Production**
   ```bash
   # Build the site
   bundle exec jekyll build
   ```

## 📂 Project Structure

```
.
├── _includes/          # Reusable components
├── _layouts/           # Page templates
├── _sass/             # SCSS partials
├── assets/            # Static assets
│   ├── css/          # Compiled CSS
│   ├── js/           # JavaScript files
│   └── images/       # Images and icons
├── _config.yml        # Jekyll configuration
├── Gemfile           # Ruby dependencies
└── index.md          # Homepage content
```

## 🎨 Customization

1. **Colors and Themes**
   - Edit `_sass/_variables.scss` to modify the color scheme
   - Customize dark mode colors in `_sass/_dark-mode.scss`

2. **Content Management**
   - Add new projects in `_posts/` directory
   - Update experience in `_data/experience.yml`
   - Modify skills in `_data/skills.yml`

## 🔧 Dependencies

The project uses the following key Ruby gems:
- jekyll (~> 4.3.2)
- jekyll-sass-converter (~> 3.0)
- jekyll-feed (~> 0.12)
- jekyll-seo-tag (~> 2.8)
- jekyll-paginate (~> 1.1)
- listen (~> 3.8.0) - For Windows file system monitoring

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- GitHub: [@EdwinGigi](https://github.com/EdwinGigi)
- LinkedIn: [Edwin Gigi](https://linkedin.com/in/edwin-gigi)
- Email: edwingigi2012@gmail.com

## 🙏 Acknowledgments

- Jekyll team for the amazing static site generator
- Bootstrap team for the frontend framework
- Font Awesome for the icons
- All contributors and supporters
