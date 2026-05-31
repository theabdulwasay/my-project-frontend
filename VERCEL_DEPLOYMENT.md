# Vercel Frontend Deployment Guide

Complete guide to deploy Wah Cantt Coaster Tour frontend on Vercel.

## 📋 Prerequisites

1. **GitHub Account** - Frontend code pushed to GitHub
2. **Vercel Account** - Free account at [vercel.com](https://vercel.com)
3. **Backend API** - Deployed on Railway, Render, or your own server
4. **Node.js 18+** - Installed locally

## 🚀 Step 1: Prepare Frontend Code

### 1.1 Initialize Git (if not already done)
```bash
cd frontend
git init
git add .
git commit -m "Initial frontend setup for Vercel"
```

### 1.2 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/wah-tour-frontend.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Set Up Backend (if not done)

Your backend must be deployed somewhere accessible. Options:

### Option A: Railway.app (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Create new project → Deploy from GitHub
4. Select your backend repo
5. Add environment variables (same as .env)
6. Deploy and copy the Railway domain

### Option B: Render.com
1. Go to [render.com](https://render.com)
2. Create new Web Service from GitHub repo
3. Configure environment
4. Deploy and copy the render domain

### Option C: Your Own Server
Use any VPS (Heroku, DigitalOcean, AWS, etc.) and note your backend URL.

**Example Backend URLs:**
- Railway: `https://wah-tour-backend-xyz.railway.app`
- Render: `https://wah-tour-backend.onrender.com`

## 🎯 Step 3: Deploy to Vercel

### 3.1 Install Vercel CLI (Optional but recommended)
```bash
npm install -g vercel
```

### 3.2 Connect GitHub to Vercel

**Method A: Via Web Dashboard (Easiest)**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub repo URL: `https://github.com/YOUR_USERNAME/wah-tour-frontend.git`
5. Click **"Import"**

**Method B: Via CLI**
```bash
cd frontend
vercel
# Follow prompts and connect your GitHub
```

### 3.3 Configure Environment Variables

In **Vercel Dashboard:**

1. Go to your project settings
2. Navigate to **"Settings"** → **"Environment Variables"**
3. Add the following variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | Your backend URL (e.g., `https://wah-tour-backend.railway.app`) |

**For Production:**
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

**For Development:**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3.4 Deploy

The deployment will start automatically when you push to GitHub.

**Monitor deployment:**
- Vercel Dashboard → Your Project → Deployments
- Watch the build logs
- Once green ✅ → Your site is live!

## 📦 Step 4: Update Backend CORS Settings

In your Django backend `settings.py`, allow Vercel domain:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-vercel-domain.vercel.app",
    "https://your-custom-domain.com",
]

# Or allow all for development (not recommended for production)
CORS_ALLOW_ALL_ORIGINS = False
```

Also update `CSRF_TRUSTED_ORIGINS`:

```python
CSRF_TRUSTED_ORIGINS = [
    "https://your-vercel-domain.vercel.app",
]
```

Redeploy backend after changes.

## ✅ Step 5: Verify Deployment

1. **Visit your Vercel URL:**
   - Default: `https://wah-tour-frontend-abc123.vercel.app`
   - Or your custom domain if configured

2. **Test functionality:**
   - ✅ Homepage loads
   - ✅ Navigation works
   - ✅ API calls work (check browser Console for errors)
   - ✅ Contact form submits
   - ✅ Booking page loads

3. **Check Console for errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for CORS, API, or 404 errors

## 🔧 Troubleshooting

### Issue: "API Connection Failed"
**Solution:**
- Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Verify backend is running and accessible
- Check backend CORS settings
- Browser Console will show the actual error

### Issue: 404 Not Found
**Solution:**
- Make sure pages exist in your frontend
- Check file paths match URL routes
- Verify all imports are correct

### Issue: Static Assets Not Loading
**Solution:**
```bash
# In frontend folder
npm run build
# Check .next/static exists
```

### Issue: Environment Variables Not Working
**Solution:**
1. Ensure variable starts with `NEXT_PUBLIC_` for client-side access
2. Redeploy after changing variables
3. Clear browser cache (Ctrl+Shift+Delete)

## 🌐 Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain (e.g., `wahcanttcoasters.com`)
3. Follow DNS setup instructions
4. Wait for DNS propagation (up to 48 hours)

## 📊 Monitoring & Logs

**View Logs:**
- Vercel Dashboard → Deployments → Click deployment → View logs

**Analytics:**
- Dashboard shows traffic, response times, errors

## 🔒 Security Checklist

- ✅ Removed hardcoded API URLs
- ✅ Used environment variables
- ✅ Backend has CORS configured
- ✅ No sensitive data in frontend code
- ✅ HTTPS enabled (automatic on Vercel)

## 📝 Environment Variables Reference

```env
# Required
NEXT_PUBLIC_API_URL=https://your-backend-url.com

# Optional - for analytics, logging, etc.
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🎉 Success!

Your frontend is now live on Vercel! 

**Next Steps:**
1. Monitor performance in Vercel dashboard
2. Set up custom domain
3. Configure automatic deployments from GitHub
4. Monitor backend and frontend health

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Backend Issues:** Check Django logs on your backend server

---

**Updated:** 2026-05-30
**Framework:** Next.js 14
**Hosting:** Vercel
