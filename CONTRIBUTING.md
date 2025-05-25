# Contributing to Project Meridian Blog

Welcome! We're excited that you're interested in contributing to Project Meridian Blog. This guide will help you get started with creating and publishing content.

## 📝 Writing Articles

### Article Format

Articles are written in MDX format (Markdown with JSX support) and stored in `src/content/articles/`.

### Creating a New Article

1. Create a new `.mdx` file in `src/content/articles/`
2. Name it using kebab-case: `my-article-title.mdx`
3. Add the required frontmatter:

```mdx
---
title: "Your Article Title"
description: "A brief description of your article (150-160 characters)"
publishDate: 2024-01-15
author: "Your Name"
tags: ["technology", "innovation", "best-practices"]
draft: false
image:
  src: "/images/article-cover.jpg"
  alt: "Description of the image"
---

Your article content goes here...
```

### Frontmatter Schema

- **title** (required): The article title
- **description** (required): Brief summary for SEO and preview cards
- **publishDate** (required): Publication date (YYYY-MM-DD format)
- **author** (required): Author name
- **tags** (required): Array of relevant tags
- **draft** (optional): Set to `true` to hide from production
- **image** (optional): Cover image with src and alt text

### Content Guidelines

1. **Use clear, descriptive headings** - Start with H2 (`##`) for main sections
2. **Include code examples** when relevant:
   ```typescript
   const example = "Use syntax highlighting";
   ```
3. **Add images** to the `public/images/` directory
4. **Link internally** using relative paths: `[Other Article](/articles/other-article)`
5. **Keep paragraphs concise** - Aim for 3-4 sentences per paragraph

## 🌿 Branch Strategy

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b article/your-article-name
   ```

2. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add article: Your Article Title"
   ```

3. **Push and create a PR**:
   ```bash
   git push origin article/your-article-name
   ```

## ✅ Pre-Publication Checklist

Before submitting your PR, ensure:

- [ ] Article has all required frontmatter fields
- [ ] No spelling or grammar errors (use a spell checker)
- [ ] All links work correctly
- [ ] Images have descriptive alt text
- [ ] Code examples are tested and working
- [ ] Article renders correctly locally (`npm run dev`)
- [ ] Tags are relevant and lowercase
- [ ] Draft is set to `false` (unless intentionally keeping as draft)

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the dev server**:
   ```bash
   npm run dev
   ```

3. **View your article** at `http://localhost:4321/articles/your-article-slug`

## 🔍 Article Template

Here's a template to get you started:

```mdx
---
title: "Article Title Here"
description: "Compelling description that summarizes the article in 150-160 characters"
publishDate: 2024-01-15
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
draft: false
---

## Introduction

Start with a compelling introduction that hooks the reader and clearly states what they'll learn.

## Main Topic

Dive into your main content here. Use subheadings to break up long sections.

### Subtopic 1

Explain key concepts with examples.

### Subtopic 2

Include code examples when relevant:

```javascript
// Example code
console.log("Hello, Project Meridian!");
```

## Best Practices

- Use bullet points for lists
- Keep sections focused
- Include practical examples

## Conclusion

Summarize key takeaways and provide next steps for readers.

## Further Reading

- [Related Article 1](/articles/related-1)
- [External Resource](https://example.com)
```

## 📋 Style Guide

- **Voice**: Professional but approachable
- **Tone**: Informative and engaging
- **Person**: Use "we" for team perspectives, "you" when addressing readers
- **Tense**: Present tense for current states, past for historical events

## 🤝 Getting Help

If you need help:

1. Check existing articles for examples
2. Review the [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/)
3. Open an issue with questions
4. Reach out to the maintainers

Thank you for contributing to Project Meridian Blog! 🚀