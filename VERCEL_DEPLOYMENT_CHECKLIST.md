# ✅ Vercel Frontend Deployment Checklist

Complete checklist to deploy your Wah Cantt Coaster Tour frontend on Vercel.

## 📋 Pre-Deployment

- [ ] Backend deployed on Railway/Render/VPS
- [ ] Backend API URL ready (e.g., https://api.example.com)
- [ ] GitHub account created
- [ ] Vercel account created (free at vercel.com)
- [ ] Node.js 18+ installed locally

## 🔧 Frontend Setup (Local)

- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run dev` to test locally
- [ ] Update `.env.local` with backend URL
- [ ] Test that API calls work locally
- [ ] Build with `npm run build` (should succeed)

## 🌐 Push to GitHub

```bash
# In frontend folder
git init
git add .
git commit -m "Frontend ready for Vercel deployment"
git remote add origin https://github.com/YOUR_USERNAME/wah-tour-frontend.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub
- [ ] Repository is public or private (your choice)
- [ ] README visible on GitHub

## 🚀 Deploy to Vercel

### Option A: Web Dashboard (Recommended)

1. [ ] Go to https://vercel.com/dashboard
2. [ ] Click "Add New..." → "Project"
3. [ ] Click "Import Git Repository"
4. [ ] Paste: `https://github.com/YOUR_USERNAME/wah-tour-frontend.git`
5. [ ] Click "Import"

### Option B: Via CLI

```bash
npm install -g vercel
cd frontend
vercel
# Follow prompts
```

- [ ] Vercel import completed

## ⚙️ Configure Vercel

### Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

```
Name: NEXT_PUBLIC_API_URL
Value: https://your-backend-domain.com
Environments: Production, Preview, Development
```

- [ ] `NEXT_PUBLIC_API_URL` set to backend URL
- [ ] Variables saved and visible

## 🧪 Test Deployment

After Vercel finishes deploying (status: Ready ✅):

1. [ ] Visit your Vercel URL
2. [ ] Homepage loads without errors
3. [ ] Navigation works (Home, Places, Booking, etc.)
4. [ ] Open DevTools → Console (should be clean)
5. [ ] Check Network tab (no 404 errors)
6. [ ] Try API call (e.g., click "Beautiful Places")
7. [ ] If API fails, check:
   - [ ] Backend is running
   - [ ] `NEXT_PUBLIC_API_URL` is correct in Vercel
   - [ ] Backend CORS allows Vercel domain

## 🔒 Configure Backend CORS

Update Django `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-vercel-domain.vercel.app",
    "https://your-custom-domain.com",
]

CSRF_TRUSTED_ORIGINS = [
    "https://your-vercel-domain.vercel.app",
]
```

- [ ] Backend CORS updated
- [ ] Backend redeployed
- [ ] Frontend can now call API without errors

## 🌐 Custom Domain (Optional)

1. [ ] Go to Vercel → Project Settings → Domains
2. [ ] Add your domain (e.g., frontend.wahcanttcoasters.com)
3. [ ] Follow DNS setup
4. [ ] Wait for propagation (up to 48 hours)

## 📊 Post-Deployment

- [ ] Monitor Vercel dashboard for errors
- [ ] Check analytics and performance
- [ ] Set up Slack/email notifications for deployments
- [ ] Test on mobile devices
- [ ] Share live URL with team

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| API returns 404 | Check backend URL, restart backend |
| CORS error | Update CORS in Django settings |
| Styles not loading | Clear browser cache, rebuild |
| 404 page | Check routes match files |
| Slow performance | Check Lighthouse, optimize images |

## 📝 Your Vercel URLs

After deployment, you'll get:

- **Production:** `https://wah-tour-frontend.vercel.app`
- **Custom Domain:** `https://your-domain.com` (if configured)
- **Preview:** `https://pr-1.wah-tour-frontend.vercel.app` (for PRs)

## 🎉 Success Indicators

- ✅ Vercel shows "Ready" status (green)
- ✅ Frontend loads at vercel.app URL
- ✅ No errors in browser Console
- ✅ API calls work (check Network tab)
- ✅ All pages accessible
- ✅ Forms submit successfully

## 📞 Need Help?

- Check [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed steps
- Visit [vercel.com/docs](https://vercel.com/docs)
- Check Vercel dashboard logs
- Review browser Console errors

---

## 🚀 Quick Command Reference

```bash
# Local testing
npm install
npm run dev              # Visit http://localhost:3000

# Build
npm run build

# Deploy to Vercel
vercel

# Check local build
npm run build && npm start
```

---

**Status:** Ready for Deployment ✅
**Last Updated:** 2026-05-30
**Framework:** Next.js 14
**Hosting:** Vercel
