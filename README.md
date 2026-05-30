# Wah Cantt Coaster Tour - Frontend

Modern, responsive frontend for Wah Cantt Coaster Tour booking platform. Built with Next.js and optimized for Vercel deployment.

## 🌟 Features

- ✨ Responsive design (Mobile, Tablet, Desktop)
- 🎨 Modern glassmorphic UI with dark theme
- ⚡ Fast performance with Next.js
- 🔐 Secure API communication
- 📱 Mobile-first approach
- 🎯 SEO optimized

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS + Custom CSS
- **Icons:** Font Awesome 6.4
- **Animations:** GSAP, Framer Motion
- **API:** Axios
- **Hosting:** Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🚀 Local Development

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/wah-tour-frontend.git
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with featured tours |
| Beautiful Places | `/places` | List all available tours |
| Booking | `/booking` | Book a tour form |
| About | `/about` | About Wah Cantt Coaster Tour |
| Contact | `/contact` | Contact form and info |
| Login | `/login` | User login |
| Signup | `/signup` | User registration |

## 🔑 API Integration

All API calls are made to `NEXT_PUBLIC_API_URL`.

**Example API Endpoints:**
```
GET  /api/places/          - Get all tours
GET  /api/weather/         - Get weather
POST /api/booking/         - Create booking
POST /auth/login/          - User login
POST /auth/signup/         - User registration
```

## 📱 Component Structure

```
frontend/
├── css/                 # Stylesheets
│   ├── style.css       # Main styles
│   ├── pages-public.css # Public pages styles
│   └── dashboard-ui.css # Dashboard styles
├── js/
│   └── main.js         # Main JavaScript
├── images/             # Static images
└── [page-name].html    # Django templates
```

## 🎯 Deployment on Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/YOUR_USERNAME/wah-tour-frontend)

### Manual Deployment

See [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md) for complete step-by-step guide.

**Quick Steps:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy!

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL |

## 📊 Performance

- Lighthouse Score: 95+
- Page Load Time: < 2s
- Core Web Vitals: Optimized

## 🐛 Troubleshooting

### API Calls Failing
1. Check `NEXT_PUBLIC_API_URL` in environment
2. Verify backend is running
3. Check browser Console for CORS errors
4. Ensure backend CORS allows frontend domain

### Styles Not Loading
```bash
npm run build
npm start
```

### Images Not Showing
- Verify image paths in HTML
- Check image files exist in `/images` folder
- Use relative paths

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Font Awesome Icons](https://fontawesome.com)

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Open a new issue with details
3. Contact: info@wahcanttcoasters.com

## 📄 License

All rights reserved © 2026 Wah Cantt Coaster Tour

## 🔒 Security

- No hardcoded secrets
- API URLs via environment variables
- HTTPS only (Vercel)
- CORS properly configured
- XSS protection enabled

---

**Happy Coding! 🚀**

Last Updated: 2026-05-30
