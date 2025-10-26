# Authentication System Changes

## Summary

**JWT-based API authentication has been completely removed.** The application now uses **AdminJS session-based authentication exclusively** for all routes.

## What Was Removed

### Deleted Files:
- ❌ `src/middleware/auth.ts` - JWT authentication middleware
- ❌ `src/routes/auth.ts` - JWT login/register/me endpoints
- ❌ `public/signup.html` - Standalone signup page

### Removed Routes:
- ❌ `POST /api/auth/register` - User registration with JWT token
- ❌ `POST /api/auth/login` - User login with JWT token
- ❌ `GET /api/auth/me` - Get current user via JWT token
- ❌ `GET /signup` - Signup page

### Removed Middleware:
- ❌ `authenticate` - JWT token verification
- ❌ `isAdmin` - JWT-based admin check
- ❌ `isOwnerOrAdmin` - JWT-based ownership check

## Current Authentication System

### ✅ AdminJS Session Authentication (ONLY Method)

All authentication is now handled through **AdminJS sessions**:

1. **Login**: Users log in via AdminJS at `/admin`
2. **Session**: AdminJS creates a session cookie
3. **API Access**: All API routes use `adminSessionAuth` middleware
4. **No Tokens**: No JWT tokens, no Bearer headers needed

### How It Works

```typescript
// All API routes now use AdminJS session authentication
import { adminSessionAuth } from '../middleware/adminSession.js';

router.use(adminSessionAuth);
```

When a user makes an API request:
1. Middleware checks for AdminJS session cookie
2. Extracts user from session: `{ id, email, name, role }`
3. Attaches user to `req.user`
4. If no session → Returns 401 error

## How to Use the Application

### For Regular Users:

1. **Login**: Navigate to `http://localhost:3000/admin`
2. **Enter credentials**: Use your email and password
3. **Access features**: After login, use the user pages:
   - Products page
   - Cart page
   - Checkout page
   - User Settings page

### For Admin Users:

1. **Login**: Navigate to `http://localhost:3000/admin`
2. **Enter admin credentials**
3. **Full access**: You can access all AdminJS resources plus user pages

### Creating New Users:

Since there's no `/api/auth/register` endpoint anymore:

**Option 1: AdminJS Admin Panel (Recommended)**
```
1. Login as admin
2. Navigate to Users resource
3. Click "Create New"
4. Fill in user details
5. Save
```

**Option 2: Database Seeder**
```bash
# Run the database seeder
npm run seed
```

**Option 3: Direct Database Insert**
```sql
INSERT INTO users (name, email, password, role)
VALUES ('John Doe', 'john@example.com', '$2a$10$...', 'user');
```

Note: Password must be bcrypt hashed. The User model has a `beforeCreate` hook that handles this.

## API Usage Examples

### Before (JWT - REMOVED):
```javascript
// ❌ This no longer works
fetch('/api/cart', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
})
```

### Now (AdminJS Session - ONLY WAY):
```javascript
// ✅ Use this - session cookie is sent automatically
fetch('/api/cart', {
  credentials: 'include', // Important: Include cookies
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### Important Notes:

1. **Include Credentials**: Always use `credentials: 'include'` to send cookies
2. **Same Origin**: API calls must be from the same domain or configure CORS properly
3. **No Token Header**: Don't send `Authorization: Bearer` header
4. **Cookie-Based**: Authentication relies on session cookies

## Protected Routes

All the following routes require AdminJS session authentication:

### Cart Routes (require login):
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Checkout Routes (require login):
- `POST /api/checkout` - Create order

### User Routes (require login):
- `GET /api/user/profile` - Get profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/orders` - Get user's orders
- `GET /api/user/orders/:id` - Get order details

### Dashboard Routes:
- `GET /api/dashboard/stats` - Admin only
- `GET /api/dashboard/user-stats` - Users see own stats

### Settings Routes:
- `GET /api/settings` - Admin only
- `PUT /api/settings/:id` - Admin only

## Error Messages

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authenticated. Please login via AdminJS at /admin"
}
```

**Solution**: User needs to login at `/admin` first

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

**Solution**: User doesn't have required role

## Frontend Integration

### React/Vue/Angular Example:

```javascript
// Configure fetch to always include credentials
const api = {
  async get(url) {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      // Redirect to login
      window.location.href = '/admin';
      return;
    }

    return response.json();
  },

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status === 401) {
      window.location.href = '/admin';
      return;
    }

    return response.json();
  }
};

// Usage
api.get('/api/cart').then(data => console.log(data));
api.post('/api/cart/add', { productId: 1, quantity: 2 });
```

### Axios Example:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Important: Send cookies
});

// Add response interceptor for auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Usage
api.get('/api/cart');
api.post('/api/cart/add', { productId: 1, quantity: 2 });
```

## CORS Configuration (If Needed)

If your frontend runs on a different port/domain:

```typescript
// In app.ts
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow cookies
}));
```

## Migration Checklist

If you had existing code using JWT authentication:

- [ ] Remove all `Authorization: Bearer` headers from API calls
- [ ] Add `credentials: 'include'` to all fetch calls
- [ ] Remove JWT token storage (localStorage/sessionStorage)
- [ ] Update login flow to redirect to `/admin`
- [ ] Handle 401 errors by redirecting to `/admin`
- [ ] Remove any JWT decoding logic
- [ ] Update API documentation
- [ ] Test all API endpoints with session cookies

## Advantages of This Approach

✅ **Simpler**: No need to manage JWT tokens
✅ **Secure**: HttpOnly cookies prevent XSS attacks
✅ **Unified**: Same authentication for admin panel and API
✅ **Less Code**: Removed ~200 lines of JWT code
✅ **Better UX**: Single login for all features
✅ **CSRF Protected**: AdminJS includes CSRF protection

## Testing Authentication

### Test Session Authentication:

```bash
# 1. Login via AdminJS (get session cookie)
# Visit http://localhost:3000/admin and login

# 2. Test API with curl (session cookie will be in browser)
# Or use Postman/Insomnia and enable "Send cookies"

# 3. Test from browser console:
fetch('/api/cart', { credentials: 'include' })
  .then(r => r.json())
  .then(console.log)
```

### Test Without Authentication:

```bash
# Should return 401
curl http://localhost:3000/api/cart
```

## Troubleshooting

### "Invalid token" error (FIXED)
**Before**: Cart routes expected JWT tokens
**Now**: Cart uses AdminJS session authentication
**Solution**: Login at `/admin`, then access cart

### "Not authenticated" error
**Cause**: No session cookie present
**Solution**: Login at `/admin` first

### CORS errors with credentials
**Cause**: Frontend on different domain
**Solution**: Configure CORS with `credentials: true`

### Session not persisting
**Cause**: Cookie settings or HTTPS issues
**Solution**: Check `COOKIE_SECRET` env variable, ensure cookies are enabled

## Environment Variables

Ensure these are set:

```env
# Required for session encryption
COOKIE_SECRET=your-secret-key-here

# Not needed anymore (can remove)
# JWT_SECRET=...  ← DELETE THIS
```

## Summary

🎯 **One authentication method**: AdminJS sessions
🔒 **Secure by default**: HttpOnly cookies
✨ **Simple to use**: Login once, access everything
📝 **Well documented**: Complete guides available

All API routes now work seamlessly with AdminJS session authentication. No more "Invalid token" errors!
