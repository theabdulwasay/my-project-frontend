# 🚀 Vercel Frontend Deployment - Quick Start

**Fastest way to deploy your Wah Cantt Coaster Tour frontend on Vercel in 5 minutes!**

## Step 1: Push to GitHub (2 min)

```bash
cd frontend
git init
git add .
git commit -m "Frontend for Vercel"
git remote add origin https://github.com/YOUR_USERNAME/wah-tour-frontend.git
git push -u origin main
```

## Step 2: Connect to Vercel (1 min)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Paste your GitHub repo URL
4. Click **"Import"**

## Step 3: Set Environment Variable (1 min)

In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://your-backend-url.com` (e.g., railway.app domain)
3. Click **"Save"**

## Step 4: Deploy (1 min)

Vercel will automatically deploy! Watch the progress on the dashboard.

When it shows **"Ready ✅"** → Your site is LIVE! 🎉

## 📍 Your Live URL

Default: `https://wah-tour-frontend.vercel.app`

## ✅ Test It

1. Click your Vercel URL
2. Check if it loads
3. If API fails:
   - Check backend is running
   - Check `NEXT_PUBLIC_API_URL` is correct
   - Update Django CORS settings

## 🔧 Backend CORS Update

Add this to Django `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://wah-tour-frontend.vercel.app",
]
```

Redeploy backend. Done!

## 🎯 Next Steps

1. **Monitor:** Vercel dashboard shows analytics
2. **Custom Domain:** Go to Project Settings → Domains
3. **Auto-Deploy:** Push to GitHub = auto-deploy to Vercel ✨

## 📚 Full Guides

- **Detailed:** [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Checklist:** [VERCEL_DEPLOYMENT_CHECKLIST.md](./VERCEL_DEPLOYMENT_CHECKLIST.md)
- **Frontend README:** [frontend/README.md](./frontend/README.md)

## ❓ Common Issues

| Issue | Fix |
|-------|-----|
| API 404 error | Check backend URL, restart backend |
| CORS error | Update Django CORS settings |
| Blank page | Check Vercel logs, rebuild |

---

**Status:** Ready to Deploy! 🚀

Next command:
```bash
cd frontend && git init && git add . && git commit -m "Deploy to Vercel"
```
