# KodBank - Quick Start Guide

## 📋 Before You Start

You need:
- Node.js installed
- Aiven MySQL database account
- MySQL connection credentials

## ⚡ 5-Minute Setup

### 1. Backend Setup (Terminal 1)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Aiven MySQL credentials
npm start
```

Expected output:
```
✓ KodBank Backend Server running on http://localhost:5000
✓ Database connected successfully
```

### 2. Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in ... ms
Local: http://localhost:5173/
```

## 🎮 Test the App

1. Open http://localhost:5173
2. Click **Create Account**
3. Fill form and register
4. Login with your credentials
5. Click **Check Balance** to see animations!

## 🏦 Aiven MySQL Setup (If New)

1. Go to https://aiven.io
2. Create MySQL service
3. Get connection details from "Overview"
4. Add to backend/.env file

## 📱 Features Overview

| Feature | Path | Auth Required |
|---------|------|---|
| Landing | `/` | No |
| Register | `/register` | No |
| Login | `/login` | No |
| Dashboard | `/dashboard` | Yes |
| Check Balance | Dashboard | Yes |

## 🎨 Animations

Every balance check triggers ONE random animation:
- 🎊 **Confetti Burst** - Colorful falling particles
- 💫 **Glow Wave** - Expanding luminous circles  
- ✨ **Particle Sparkle** - Floating sparkles

## 🔧 Gotchas

| Issue | Solution |
|-------|----------|
| Can't connect to DB | Check .env credentials in backend |
| Port in use | Change PORT in backend/.env |
| CORS errors | Verify backend is running on :5000 |
| Login fails | Check username/password at terminal |

## 📁 Key Files

**Backend**
- `backend/app.js` - Main server
- `backend/.env` - Database credentials
- `backend/models/` - Database operations

**Frontend**  
- `frontend/src/pages/` - All pages
- `frontend/src/components/animations/` - 3 animations
- `frontend/src/utils/api.js` - API calls

## 💾 Default Data

After registration:
- **Starting Balance**: ₹100,000
- **Role**: Customer
- **Token Expiry**: 24 hours

## 🎯 Next Steps

✅ Get both servers running
✅ Register and login
✅ Check balance and enjoy animations
✅ Explore the codebase
✅ Add more features!

## 📞 Quick Help

**Can't start backend?**
```bash
cd backend
npm install
npm start
```

**Can't start frontend?**
```bash
cd frontend
npm install
npm run dev
```

**Database question?**
Check backend/.env.example for format

---

**You're all set! Enjoy KodBank 🏦**
