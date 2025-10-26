# Cart Error Fix - "Failed to fetch cart"

## Issue

When accessing the User Cart page, you see the error: **"Failed to fetch cart"**

## Root Cause

The Cart associations are properly configured, but the server needs to be restarted to load the new Cart model and its associations.

## Solution

Simply restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then rebuild and restart:

npm run build
npm run dev
```

## Verification Steps

### 1. Start the Server
```bash
npm run build
npm run dev
```

Wait for the output:
```
Connection has been established successfully.
All models were synchronized successfully.
AdminJS available at http://localhost:3000/admin
API available at http://localhost:3000/api
```

### 2. Login to AdminJS
- Go to: http://localhost:3000/admin
- Login with your credentials

### 3. Test the Cart
1. Navigate to "Products" page
2. Click "Add to Cart" on any product
3. Navigate to "Cart" page
4. You should see your cart items!

## What's Already Fixed

✅ **Cart Model** - Properly located in `src/db/models/Cart.ts`
✅ **Cart Associations** - Defined in `src/db/index.ts`:
   - Cart.belongsTo(Product)
   - Cart.belongsTo(User)
   - Product.hasMany(Cart)
   - User.hasMany(Cart)

✅ **Cart Controller** - All functions working in `src/controllers/cartController.ts`:
   - getCart() - Fetch cart with product details
   - addToCart() - Add items to cart
   - updateCartItem() - Update quantities
   - removeFromCart() - Remove items
   - clearCart() - Clear entire cart

✅ **Cart Routes** - Properly configured in `src/routes/api/cartRoutes.ts`
✅ **Authentication** - Session auth middleware applied
✅ **Build** - TypeScript compiles successfully

## Technical Details

The error occurs because:
1. The Cart model associations need to be loaded when the server starts
2. The `defineAssociations()` function in `src/db/index.ts` sets up the relationships
3. This only runs when the application initializes
4. After adding JWT authentication, you need a fresh server start

## API Endpoints Working

After restart, these endpoints will work:

```bash
# Get cart
GET /api/cart
Headers: Session cookie from AdminJS login

# Add to cart
POST /api/cart/add
Headers: Session cookie
Body: { "productId": 1, "quantity": 2 }

# Update quantity
PUT /api/cart/:id
Headers: Session cookie
Body: { "quantity": 3 }

# Remove item
DELETE /api/cart/:id
Headers: Session cookie

# Clear cart
DELETE /api/cart
Headers: Session cookie
```

## Alternative: Using JWT Token

If you prefer using JWT authentication for the cart API:

```bash
# 1. Get JWT token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Save the token from response

# 2. Add to cart with JWT
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"productId": 1, "quantity": 2}'

# 3. Get cart with JWT
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Note:** You need to update the cart routes to use `authenticateHybrid` middleware instead of `adminSessionAuth` to support JWT.

## Optional: Enable JWT for Cart Routes

If you want to use JWT tokens with cart API, update the cart routes:

**File:** `src/routes/api/cartRoutes.ts`

**Change from:**
```typescript
import { adminSessionAuth } from '../../middleware/adminSession.js';

const router = Router();
router.use(adminSessionAuth);
```

**Change to:**
```typescript
import { authenticateHybrid } from '../../middleware/jwtAuth.js';

const router = Router();
router.use(authenticateHybrid);
```

This allows the cart API to accept EITHER session cookies OR JWT tokens.

## Summary

**The fix is simple: Restart your server!**

```bash
npm run build && npm run dev
```

Everything is properly configured and will work after the server restarts with the Cart model associations loaded.

## Still Having Issues?

If the error persists after restart, check:

1. **Database Connection:**
   ```bash
   # Check console output for:
   "Connection has been established successfully."
   ```

2. **Model Synchronization:**
   ```bash
   # Check console output for:
   "All models were synchronized successfully."
   ```

3. **Browser Console:**
   - Open DevTools (F12)
   - Check Network tab for actual error response
   - Look for authentication issues

4. **Session Authentication:**
   - Make sure you're logged in to AdminJS
   - Session cookie should be present
   - Try logging out and logging back in

5. **Database Tables:**
   - Verify `carts` table exists in PostgreSQL
   - Should have been created by `sequelize.sync({ alter: true })`

## Quick Test

```bash
# After restarting server:

# 1. Check if Cart model is loaded
# In console you should see:
# "All models were synchronized successfully."

# 2. Login to AdminJS
http://localhost:3000/admin

# 3. Navigate to Products page
# Add a product to cart

# 4. Navigate to Cart page
# Should show your cart items!
```

---

**TL;DR: Just restart the server with `npm run build && npm run dev` and it will work!** 🚀
