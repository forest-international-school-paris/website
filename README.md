# Forest International School Paris Website

A modern, bilingual (English/French) website for Forest International School Paris, built with Astro and Tailwind CSS.

## Documentation

- **[ENGINEERING.md](./ENGINEERING.md)** - Technical documentation for developers and maintainers
  - Content editing guide
  - Multilingual system (EN/FR synchronization)
  - Adding new pages
  - Styling system
  - Image/video management
  - Deployment instructions

## Features

- Bilingual support (English/French)
- Responsive design for all devices
- Fast loading (static site generation)
- SEO optimized
- Modern UI with Tailwind CSS

## Pages

| English | French |
|---------|--------|
| Homepage | Accueil |
| About Our School | A Propos |
| Early Years (2-5) | Maternelle |
| Primary School (6-11) | Ecole Primaire |
| Middle School (11-15) | College |
| Admissions | Admissions |
| Tuition & Fees | Frais de Scolarite |
| Summer Camp | Camp d'Ete |
| Contact | Contact |

## Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x
- **Hosting**: Cloudflare Pages (recommended)
- **Annual Cost**: ~$10-15 USD (domain renewal only)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Cloudflare Pages

### Option 1: Connect GitHub Repository (Recommended)

1. Push this code to a GitHub repository
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Create a new project and connect your GitHub repo
4. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: `20.x`
5. Deploy!

### Option 2: Direct Upload

1. Build the project locally: `npm run build`
2. Go to Cloudflare Pages Dashboard
3. Create new project > Upload assets
4. Upload the contents of the `dist` folder

### Custom Domain Setup

After deployment:
1. Go to your Pages project settings
2. Add custom domain: `forestinternationalschool.com`
3. Update DNS records at your domain registrar as instructed by Cloudflare

## Project Structure

```
forest-school/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navigation.astro
│   │   └── Footer.astro
│   ├── layouts/         # Page layouts
│   │   └── Layout.astro
│   ├── pages/           # Page routes
│   │   ├── en/          # English pages
│   │   ├── fr/          # French pages
│   │   └── index.astro  # Redirect to /en
│   └── styles/          # Global styles
│       └── global.css
├── astro.config.mjs     # Astro configuration
├── wrangler.toml        # Cloudflare Pages config
└── package.json
```

## Editing Content

### For Technical Users
Edit the `.astro` files directly in `src/pages/en/` (English) and `src/pages/fr/` (French)

### Using AI Assistance
You can use AI tools like Claude to help modify the code:
1. Share the file you want to edit
2. Describe the changes you need
3. AI will provide the updated code

## Cost Comparison

| Platform | Annual Cost |
|----------|-------------|
| **This solution** | **~$10-15 USD** (domain only) |
| Hostinger | $36-132 USD |
| Squarespace | $192 USD |
| Wix | $204+ USD |

## Contact Information

- **School Address**: 28 Rue de Tour d'Echelle, 78750 Mareil-Marly, France
- **Phone**: +33 1 39 16 87 35
- **Email**: infos@forest-international-school.com

---

Built with Astro + Tailwind CSS
