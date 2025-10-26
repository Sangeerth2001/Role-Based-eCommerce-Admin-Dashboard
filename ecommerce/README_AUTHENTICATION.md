# Authentication Quick Reference

## ✅ What Works Now

Your eCommerce application uses **AdminJS session authentication exclusively**. No JWT tokens.

## 🚀 Quick Start

### 1. Start the Server
```bash
npm run dev
```

### 2. Login
Navigate to: `http://localhost:3000/admin`

### 3. Use API Endpoints
After logging in, all API endpoints work automatically using session cookies.

## 📍 Key Endpoints

### Login & Access
- **Login Page**: `http://localhost:3000/admin`
- No separate `/api/auth` endpoints (removed)

### Cart (requires login)
- `GET /api/cart` - View cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/:id` - Update item
- `DELETE /api/cart/:id` - Remove item
- `DELETE /api/cart` - Clear cart

### Checkout (requires login)
- `POST /api/checkout` - Create order

### User Profile (requires login)
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/orders` - View orders

### Dashboard
- `GET /api/dashboard/stats` - Admin only
- `GET /api/dashboard/user-stats` - User stats

## 🔧 Frontend Integration

### Fetch Example
```javascript
fetch('/api/cart', {
  credentials: 'include', // ← IMPORTANT!
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### Axios Example
```javascript
axios.create({
  withCredentials: true, // ← IMPORTANT!
})
```

## ❌ What Was Removed

- JWT authentication (`src/middleware/auth.ts`)
- API login/register routes (`/api/auth/*`)
- Signup page (`/signup`)
- All JWT token handling

## ✨ How to Create Users

### Option 1: AdminJS (Recommended)
1. Login as admin
2. Go to Users resource
3. Click "Create New"

### Option 2: Database Seeder
```bash
npm run seed
```

## 🐛 Troubleshooting

### "Not authenticated" Error
**Solution**: Login at `/admin` first

### "Invalid token" Error (Fixed!)
**Before**: Expected JWT token
**Now**: Uses session cookies automatically
**Solution**: Login at `/admin` and use `credentials: 'include'`

### Cart Not Working
**Problem**: Missing session cookie
**Solution**:
1. Login at `/admin`
2. Add `credentials: 'include'` to fetch requests

## 📖 Full Documentation

See [AUTHENTICATION_CHANGES.md](AUTHENTICATION_CHANGES.md) for complete details.

## 🎯 Summary

- **One login**: AdminJS at `/admin`
- **Session-based**: Automatic cookie handling
- **No tokens**: No JWT, no Bearer headers
- **Simple**: Just login and use API

**Your cart and all API endpoints now work correctly with AdminJS session authentication!** 🎉
