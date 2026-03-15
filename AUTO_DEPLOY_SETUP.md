# Auto-Deploy Setup for BarterHub on Render.com

This guide will help you set up automatic deployment so that when you push changes to GitHub, your BarterHub app will automatically deploy.

---

## ✅ Current Status

- **Frontend**: Already deployed at `https://barterhub-g3vp.onrender.com` ✅
- **API URL**: Already configured in `api.js` to use `https://barterhub-g3vp.onrender.com/api` ✅
- **Backend**: Needs to be configured with environment variables

---

## 🔄 How Auto-Deploy Works

Once properly configured:
1. Make changes to your code
2. Push to GitHub: `git push origin main`
3. Render.com automatically detects the changes and redeploys
4. Your app is updated within 1-2 minutes

---

## ⚠️ Current Issue: Backend Needs Environment Variables

Your backend needs these environment variables configured in Render.com to work properly:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string (REQUIRED) |
| `JWT_SECRET` | A secure random string |

---

## 📋 Steps to Fix

### Step 1: Set Up MongoDB (If Not Already Done)

**Option A: MongoDB Atlas (Free)**
1. Go to https://www.mongodb.com/atlas/database
2. Create a free account
3. Create a free cluster
4. Create a database user (remember username/password)
5. Get your connection string from "Connect" → "Connect your application"
6. It looks like: `mongodb+srv://user:password@cluster.xxx.mongodb.net/barterhub`

### Step 2: Configure Environment Variables in Render.com

1. Go to https://dashboard.render.com
2. Find your `barterhub-backend` service
3. Click on "Environment"
4. Add these variables:

```
MONGODB_URI = mongodb+srv://your_username:your_password@cluster.xxx.mongodb.net/barterhub
JWT_SECRET = any_random_secure_string_like_abc123xyz
NODE_ENV = production
PORT = 5000
```

### Step 3: Push Updates

After making code changes, simply run:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render.com will automatically deploy your changes!

---

## 📁 Files Created/Updated

- ✅ `render.yaml` - Render.com deployment configuration
- ✅ `backend/server.js` - Updated to use environment variables
- ✅ `api.js` - Already configured with production URL
- ✅ `AUTO_DEPLOY_SETUP.md` - This guide

