# How to Test Cart API

## The Issue

You're seeing "Invalid token" or authentication errors when trying to access the cart.

## Root Cause

The cart API requires **AdminJS session authentication**, which means:
1. You MUST login via AdminJS first
2. The session cookie must be sent with requests
3. No JWT tokens are supported anymore

## Step-by-Step Testing

### Method 1: Using Browser (Easiest)

1. **Start the server**:
```bash
npm run dev
```

2. **Login to AdminJS**:
   - Open browser: `http://localhost:3000/admin`
   - Enter your credentials
   - You should see the AdminJS dashboard

3. **Open Browser DevTools**:
   - Press F12
   - Go to Console tab

4. **Test Cart API**:
```javascript
// Get cart
fetch('/api/cart', {
  credentials: 'include'
})
.then(r => r.json())
.then(data => console.log('Cart:', data))
.catch(err => console.error('Error:', err));

// Add to cart
fetch('/api/cart/add', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    productId: 1,
    quantity: 2
  })
})
.then(r => r.json())
.then(data => console.log('Added:', data))
.catch(err => console.error('Error:', err));
```

### Method 2: Using Postman/Insomnia

1. **Login First**:
   - Method: POST
   - URL: `http://localhost:3000/admin/login`
   - Body (form-data or JSON):
     ```json
     {
       "email": "your@email.com",
       "password": "yourpassword"
     }
     ```
   - **IMPORTANT**: Enable "Automatically follow redirects"
   - **IMPORTANT**: Enable "Save cookies"

2. **Test Cart**:
   - Method: GET
   - URL: `http://localhost:3000/api/cart`
   - **IMPORTANT**: Make sure cookies from login are sent
   - Headers:
     ```
     Content-Type: application/json
     ```

### Method 3: Using cURL

1. **Login and save cookies**:
```bash
curl -c cookies.txt -X POST \
  http://localhost:3000/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"yourpassword"}'
```

2. **Access cart with cookies**:
```bash
curl -b cookies.txt \
  http://localhost:3000/api/cart
```

## Common Mistakes

### ❌ Wrong: Sending JWT Token
```javascript
// DON'T DO THIS - No longer supported!
fetch('/api/cart', {
  headers: {
    'Authorization': 'Bearer eyJhbGc...'
  }
})
```

### ✅ Correct: Using Session Cookies
```javascript
// DO THIS - Session cookies
fetch('/api/cart', {
  credentials: 'include'
})
```

### ❌ Wrong: Not Logged In
```bash
# This will fail with 401
curl http://localhost:3000/api/cart
```

### ✅ Correct: Login First
```bash
# 1. Login (get session)
# 2. Then access cart (with cookies)
```

## Debug Checklist

If cart still doesn't work:

- [ ] Is the server running? (`npm run dev`)
- [ ] Did you login to AdminJS at `/admin`?
- [ ] Are you sending cookies? (`credentials: 'include'`)
- [ ] Check browser console for errors
- [ ] Check Network tab - is session cookie being sent?
- [ ] Look at server console for error messages

## Expected Responses

### Success (200):
```json
{
  "success": true,
  "data": [...],
  "total": "0.00",
  "count": 0
}
```

### Not Logged In (401):
```json
{
  "success": false,
  "message": "Not authenticated. Please login via AdminJS at /admin"
}
```

## Verify Session Cookie

### In Browser:
1. Login to AdminJS
2. Open DevTools > Application > Cookies
3. Look for cookie named `adminjs` or `connect.sid`
4. This cookie must exist and be sent with API requests

### In Request:
Check Network tab:
- Request Headers should show: `Cookie: adminjs=...`

## Create Test User

If you don't have a user account:

### Option 1: Via AdminJS (if you're admin)
1. Login as admin
2. Navigate to Users
3. Create new user

### Option 2: Via Database Seeder
```bash
npm run seed
```

### Option 3: Check .env for default credentials
Check if seeder created default users

## Still Not Working?

### Check Environment Variables:
```bash
# .env file should have:
COOKIE_SECRET=your-secret-here
```

### Check Session Configuration:
Look in `src/app.ts` - the session should be configured with AdminJS

### Enable Debug Mode:
Add to server console to see what's happening:
```typescript
// In src/middleware/adminSession.ts
export const adminSessionAuth = (req: Request, res: Response, next: NextFunction) => {
  const session = (req as any).session;
  console.log('Session:', session); // ADD THIS
  console.log('AdminUser:', session?.adminUser); // ADD THIS
  // ... rest of code
};
```

## Contact Flow

The correct flow is:
1. Browser/Client → Login at `/admin`
2. Server → Creates session, sets cookie
3. Browser → Stores cookie automatically
4. Browser → Makes request to `/api/cart` with cookie
5. Server → Validates session from cookie
6. Server → Returns cart data

**The key is: Session cookie must be present in every API request!**
