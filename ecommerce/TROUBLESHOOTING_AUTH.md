# Authentication Troubleshooting Guide

## Current Issue: "Invalid token" or Authentication Errors

### What Changed
- ❌ Removed: JWT token authentication
- ✅ Now: AdminJS session-only authentication
- All API endpoints require AdminJS session cookie

## Quick Fix Steps

### 1. Rebuild and Restart Server
```bash
# Stop server (Ctrl+C)
npm run build
npm run dev
```

### 2. Login to AdminJS
1. Open browser: `http://localhost:3000/admin`
2. Login with your credentials
3. You should see the AdminJS dashboard

### 3. Test Cart API (In Browser Console)

Press F12, go to Console tab, paste this:

```javascript
// Test 1: Get Cart
fetch('/api/cart', {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.text())
.then(text => {
  console.log('Response:', text);
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Not JSON:', text);
  }
})
.then(data => console.log('Cart Data:', data));

// Test 2: Add to Cart (make sure product with ID 1 exists)
fetch('/api/cart/add', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ productId: 1, quantity: 1 })
})
.then(r => r.json())
.then(data => console.log('Add Result:', data));
```

## Check Debug Logs

The middleware now logs authentication attempts. When you access `/api/cart`, you should see in the **server console**:

### Success Case:
```
🔍 Session Auth Check:
  - Has session: true
  - Has adminUser: true
  - User ID: 1
  - User Email: user@example.com
  - User Role: user
  ✅ User authenticated: user@example.com
```

### Failure Case (Not Logged In):
```
🔍 Session Auth Check:
  - Has session: true
  - Has adminUser: false
  ❌ Authentication failed - no session
```

### Failure Case (No Session At All):
```
🔍 Session Auth Check:
  - Has session: false
  - Has adminUser: false
  ❌ Authentication failed - no session
```

## Common Problems & Solutions

### Problem 1: "Not authenticated" Error

**Symptom:**
```json
{
  "success": false,
  "message": "Not authenticated. Please login via AdminJS at /admin"
}
```

**Server logs show:**
```
🔍 Session Auth Check:
  - Has session: true
  - Has adminUser: false
```

**Solutions:**
1. Make sure you're logged in at `/admin`
2. Check cookies are enabled in browser
3. Clear browser cookies and login again
4. Check `.env` has `COOKIE_SECRET` set

### Problem 2: Session Cookie Not Sent

**Symptom:** Server logs show `Has session: false`

**Check in Browser:**
1. F12 → Network tab
2. Click on the `/api/cart` request
3. Look at Request Headers
4. Should see: `Cookie: adminjs=...` or `connect.sid=...`

**Solutions:**
- Add `credentials: 'include'` to fetch calls
- For Axios: `withCredentials: true`
- Make sure request is from same domain

### Problem 3: CORS Issues

**Symptom:**
```
Access to fetch at 'http://localhost:3000/api/cart' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Solution:** Add CORS middleware in `src/app.ts`:

```typescript
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies
}));
```

### Problem 4: Still Seeing "Invalid token"

This error shouldn't appear anymore since JWT is removed. If you still see it:

1. **Clear browser cache completely**
2. **Hard refresh:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Check you're not using old frontend code** that sends Authorization headers
4. **Verify server restarted** after code changes

## Testing Workflow

### Correct Flow:
```
1. npm run build && npm run dev
2. Open http://localhost:3000/admin
3. Login with email/password
4. Session cookie is set
5. Navigate to cart page or call /api/cart
6. Middleware finds session → Success ✅
```

### Incorrect Flow (Won't Work):
```
1. Try to access /api/cart directly
2. No login, no session cookie
3. Middleware can't find session → Fail ❌
```

## Verify Session in Browser

### Chrome/Edge:
1. F12 → Application tab
2. Storage → Cookies
3. Look for `adminjs` or `connect.sid` cookie
4. Should have a long random string value

### Firefox:
1. F12 → Storage tab
2. Cookies
3. Look for session cookie

### No Cookie?
- You're not logged in
- Cookies are blocked
- Privacy extensions blocking cookies

## Create Test User

If you don't have an account:

```bash
# Option 1: Run seeder
npm run seed

# Option 2: Use AdminJS as admin
# Login as admin, go to Users, create new user
```

## Environment Check

Verify `.env` file:

```env
# Required
COOKIE_SECRET=change-this-to-a-long-random-string

# Optional
PORT=3000
NODE_ENV=development
```

## Frontend Code Examples

### React Hook Example:
```javascript
import { useEffect, useState } from 'react';

function useCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/cart', {
      credentials: 'include', // IMPORTANT!
    })
    .then(r => {
      if (r.status === 401) {
        // Redirect to login
        window.location.href = '/admin';
        throw new Error('Not authenticated');
      }
      return r.json();
    })
    .then(data => {
      setCart(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  return { cart, loading, error };
}
```

### Vanilla JavaScript:
```javascript
async function addToCart(productId, quantity) {
  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      credentials: 'include', // IMPORTANT!
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, quantity })
    });

    if (response.status === 401) {
      // Redirect to login
      window.location.href = '/admin';
      return;
    }

    const data = await response.json();
    console.log('Added to cart:', data);
    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}
```

## Still Not Working?

### Enable Maximum Debug:

1. **Check all console logs** (server terminal)
2. **Check browser console** for errors
3. **Check Network tab** in DevTools
4. **Verify session cookie exists**
5. **Try in Incognito/Private window** (fresh start)

### Last Resort:

1. **Delete all cookies** for localhost
2. **Clear browser cache**
3. **Restart server**
4. **Login again**
5. **Try accessing cart**

### Share Debug Info:

If still having issues, share:
1. Server console output (the 🔍 logs)
2. Browser console errors
3. Network tab screenshot
4. What endpoint you're calling
5. How you're calling it (fetch/axios/curl)

## Expected Behavior

### After Login:
- ✅ Session cookie set in browser
- ✅ All `/api/*` routes work
- ✅ No need for Authorization headers
- ✅ Cart operations succeed

### Without Login:
- ❌ 401 error from `/api/cart`
- ❌ Message: "Not authenticated"
- ❌ Server logs show: "Has adminUser: false"

---

**The debug logs in the middleware will show you exactly what's happening with the session!**
