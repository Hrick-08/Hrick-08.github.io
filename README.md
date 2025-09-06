# Hrick-08 Portfolio

A retro-themed portfolio website built with React, Vite, and TailwindCSS, featuring a nostalgic 90s/early-2000s computer interface design.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-cyan)

## 🎮 Features

- **Retro Theme**: Authentic 90s/early-2000s computer interface aesthetic
- **Dark/Light Mode**: Toggle between themes while maintaining retro feel
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smooth Animations**: Framer Motion animations with retro-style transitions
- **Interactive Components**: Retro-styled buttons, windows, and UI elements
- **Contact Form**: Functional contact form with retro styling
- **Social Integration**: GitHub and LinkedIn links
- **GitHub Pages Ready**: Pre-configured for easy deployment

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: TailwindCSS 4.1.13
- **Animations**: Framer Motion 12.23.12
- **Icons**: React Icons 5.5.0
- **Deployment**: GitHub Pages

## 🎨 Design Elements

### Color Palette
- **Retro Beige**: `#F5F5DC`
- **Retro Pink**: `#F0A0A0`
- **Retro Blue**: `#87CEEB`
- **Retro Cream**: `#FFF8DC`
- **Retro Brown**: `#D2B48C`

### Typography
- **Headings**: Press Start 2P (pixel font)
- **Body**: VT323 (retro monospace)
- **UI Elements**: Inter (modern sans-serif)

### UI Components
- Window/dialog boxes with title bars
- Retro buttons with hover effects
- Pixelated borders and shadows
- Custom scrollbars
- Retro cursor styles
- Loading animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hrick-08/hrick-portfolio.git
   cd hrick-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Sections

### 🏠 Home
- Hero section with animated profile
- Contact information
- Social media links
- Call-to-action buttons

### 👨‍💻 About
- Personal introduction
- Key interests and skills
- Academic background
- Achievement highlights

### 🛠️ Skills
- Technical skills organized by category
- Interactive skill badges
- Progress indicators
- Technology icons

### 🚀 Projects
- Featured project showcase
- Project descriptions and tech stacks
- GitHub links
- Live demo links (where available)

### 🎓 Education
- Academic timeline
- Institution details
- Course highlights
- Achievements

### 🏆 Certifications
- Professional certifications
- Issuing organizations
- Skills covered
- Verification links

### 📞 Contact
- Contact form
- Social media links
- Availability status
- Location information

## 🎯 Personal Information

**Name**: Hritabrata Das  
**Title**: Full-Stack Developer | AI & ML Enthusiast | IoT Innovator  
**Location**: Punjab, India  
**Email**: hritabratadas8@gmail.com  
**Phone**: +91-9382058536  

### Social Links
- **GitHub**: [Hrick-08](https://github.com/Hrick-08)
- **LinkedIn**: [hritabrata-das](https://www.linkedin.com/in/hritabrata-das-913460326/)

## 🚀 Deployment

### GitHub Pages

This project is pre-configured for GitHub Pages deployment.

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Select "gh-pages" branch as source
   - Your site will be available at `https://hrick-08.github.io/hrick-portfolio`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - Railway
   - Render

## 🎨 Customization

### Colors
Edit the color palette in `tailwind.config.js`:

```javascript
colors: {
  'retro-beige': '#F5F5DC',
  'retro-pink': '#F0A0A0',
  // ... add your colors
}
```

### Content
Update personal information in the respective component files:
- `src/components/Hero.jsx` - Personal details
- `src/components/About.jsx` - About section
- `src/components/Skills.jsx` - Skills and technologies
- `src/components/Projects.jsx` - Project information
- `src/components/Education.jsx` - Educational background
- `src/components/Certifications.jsx` - Certifications
- `src/components/Contact.jsx` - Contact information

### Styling
Modify retro styles in `src/index.css`:

```css
.btn-retro {
  @apply px-6 py-3 bg-retro-blue text-retro-dark font-pixel text-sm border-2 border-retro-dark shadow-retro;
}
```

## 📁 Project Structure

```
hrick-portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Education.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useTheme.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Fonts**: Google Fonts (Press Start 2P, VT323, Inter)
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Styling**: TailwindCSS
- **Build Tool**: Vite

## 📞 Contact

**Hritabrata Das**  
Email: hritabratadas8@gmail.com  
GitHub: [@Hrick-08](https://github.com/Hrick-08)  
LinkedIn: [hritabrata-das](https://www.linkedin.com/in/hritabrata-das-913460326/)

---

⭐ **Star this repository if you found it helpful!**