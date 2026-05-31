# Deployment Guide for Wah Cantt Coaster Tour Frontend

## 🚀 Quick Deployment to Vercel

### Prerequisites
- Vercel account (free)
- Git installed
- This repository connected to GitHub

### Steps to Deploy

#### 1. Connect to Vercel
```bash
npm i -g vercel
vercel login
```

#### 2. Deploy from Project Root
```bash
cd frontend
vercel deploy --prod
```

#### 3. Configure Environment Variables (if needed)
In Vercel Dashboard → Project Settings → Environment Variables

### Troubleshooting CSS Issues

**Problem: CSS not loading after deployment**

**Solution:**
- All CSS files are in `/css/` directory
- All HTML files reference CSS using absolute paths: `/css/style.css`
- Cache busting is applied automatically with version numbers
- Vercel serves static files correctly

**Problem: Styles disappear when switching tabs**

**Solution:**
- The `visibilitychange` event listener automatically reloads CSS
- Each page has inline scripts that handle tab switching
- CSS cache headers are configured in `vercel.json`

### Folder Structure
```
frontend/
├── index.html (home page)
├── home.html (duplicate home)
├── beautiful_places.html
├── booking.html
├── about.html
├── contact.html
├── login.html
├── signup.html
├── css/
│   ├── style.css (main styles)
│   ├── pages-public.css (page-specific)
│   └── dashboard-ui.css (dashboard styles)
├── js/
│   └── main.js (client-side logic)
├── images/
│   └── tours/ (tour images)
├── package.json
├── vercel.json (deployment config)
└── .vercelignore
```

### Performance Tips

1. **Cache Strategy**: 
   - Images and CSS: 1 year cache
   - HTML pages: 1 hour cache
   
2. **CSS Loading**:
   - All CSS files are loaded at page start
   - Version numbers prevent caching issues
   - Tab switching automatically refreshes CSS

3. **Optimization**:
   - Use CDN for FontAwesome icons
   - Tailwind CSS via CDN
   - Minimize external requests

### Local Testing

Before deploying, test locally:
```bash
cd frontend
npx http-server . -p 3000
```

Then visit: `http://localhost:3000`

### Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| CSS not showing | Path issue | Use absolute paths like `/css/style.css` |
| CSS disappears on tab switch | Browser caching | Handled by `visibilitychange` listener |
| Images not loading | Wrong path | Use `/images/` prefix |
| Navigation broken | Django links | All links converted to direct paths |

### Rollback to Previous Deploy

```bash
vercel rollback
```

### Monitor Deployment

Visit: `https://vercel.com/dashboard`

## 📝 Notes

- This is a **static site deployment** (not Node.js app)
- All Django template syntax has been removed
- All CSS and JS files are included in deployment
- Automatic cache busting prevents stale CSS issues

## 🆘 Support

For issues or questions:
1. Check Vercel deployment logs
2. Verify all files are in correct directories
3. Ensure CSS paths use `/css/filename.css` format
4. Test with Chrome DevTools (F12) Network tab
