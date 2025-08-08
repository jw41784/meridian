# Project Meridian Blog

[![Deploy to GitHub Pages](https://github.com/jw41784/meridian/actions/workflows/main.yml/badge.svg)](https://github.com/jw41784/meridian/actions/workflows/main.yml)

A modern, performant blog built with Astro, featuring a sophisticated design and powerful search capabilities.

🌐 **Live Site**: [https://jw41784.github.io/meridian](https://jw41784.github.io/meridian)

## ✨ Features

- **⚡ Lightning Fast**: Built with Astro's island architecture for optimal performance
- **🎨 Modern Design**: Clean, professional styling with custom brand colors
- **🔍 Search Functionality**: Client-side search powered by Lunr.js
- **📱 Fully Responsive**: Beautiful on all devices
- **📝 MDX Support**: Write content with Markdown and React components
- **🏷️ Tag System**: Organize content with tags and categories
- **📊 SEO Optimized**: Sitemap, RSS feed, and meta tags included
- **🚀 GitHub Pages**: Automated deployment with GitHub Actions

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) v4.16
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3.4
- **Search**: [Lunr.js](https://lunrjs.com) v2.3
- **Content**: MDX with full TypeScript support
- **Deployment**: GitHub Pages with Actions

## 🎨 Brand Colors

- **Burgundy**: `#4A2532` - Primary brand color
- **Steel**: `#607D8B` - Secondary color
- **Light Gray**: `#E0E4E8` - Background accents
- **Dark**: `#1A1A1A` - Text headers
- **Text**: `#333333` - Body text

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jw41784/meridian.git
cd meridian

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Building for Production

```bash
# Build the site
npm run build

# Preview production build
npm run preview
```

## 📝 Writing Content

Articles are written in MDX format and stored in `src/content/articles/`.

### Creating a New Article

1. Create a new `.mdx` file in `src/content/articles/`
2. Add the required frontmatter:

```mdx
---
title: "Your Article Title"
description: "Brief description (150-160 characters)"
publishDate: 2025-01-27
author: "Your Name"
tags: ["technology", "innovation"]
draft: false
---

Your content here...
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed authoring guidelines.

## 🗂️ Project Structure

```
meridian/
├── .github/workflows/   # GitHub Actions CI/CD
├── public/             # Static assets
├── src/
│   ├── components/     # Astro/React components
│   ├── content/        # Blog articles (MDX)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── astro.config.mjs    # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── package.json        # Dependencies
```

## 🔧 Configuration

### Astro Config

The site is configured in `astro.config.mjs`:

- Site URL: `https://jw41784.github.io`
- Base path: `/meridian`
- Integrations: Tailwind CSS, MDX, React, Sitemap

### Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The workflow is defined in `.github/workflows/main.yml`.

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run astro` - Run Astro CLI commands

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Writing articles
- Submitting pull requests
- Code style guidelines
- Development workflow

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

Built with:

- [Astro](https://astro.build) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com) - For utility-first styling
- [Lunr.js](https://lunrjs.com) - For client-side search
- Deployed on [GitHub Pages](https://pages.github.com)

---

<p align="center">
  Made with ❤️ by the Project Meridian Team
</p>
