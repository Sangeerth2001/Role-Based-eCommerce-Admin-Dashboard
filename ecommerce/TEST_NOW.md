# Quick Test Instructions

## 🚀 Start Here

### Step 1: Restart Server
```bash
# In your terminal:
npm run build
npm run dev
```

Wait for:
```
AdminJS available at http://localhost:3000/admin
API available at http://localhost:3000/api
```

### Step 2: Login

1. Open browser: `http://localhost:3000/admin`
2. Enter your credentials
3. You should see the AdminJS dashboard

### Step 3: Test Cart API

**In Browser Console (F12 → Console tab):**

```javascript
// Copy and paste this:
fetch('/api/cart', { credentials: 'include' })
  .then(r => r.json())
  .then(data => {
    if (data.success) {
      console.log('✅ SUCCESS! Cart API working:', data);
    } else {
      console.error('❌ FAILED:', data);
    }
  });
```

## Expected Results

### ✅ If Working:

**Browser Console:**
```javascript
✅ SUCCESS! Cart API working: {
  success: true,
  data: [],
  total: "0.00",
  count: 0
}
```

**Server Console:**
```
🔍 Session Auth Check:
  - Has session: true
  - Has adminUser: true
  - User ID: 1
  - User Email: your@email.com
  ✅ User authenticated: your@email.com
```

### ❌ If Still Broken:

**Browser Console:**
```javascript
❌ FAILED: {
  success: false,
  message: "Not authenticated..."
}
```

**Server Console:**
```
🔍 Session Auth Check:
  - Has session: true
  - Has adminUser: false
  ❌ Authentication failed - no session
```

## If Still Not Working

### Check 1: Server Restarted?
```bash
# Stop server (Ctrl+C) and run:
npm run build && npm run dev
```

### Check 2: Logged In?
- Go to `http://localhost:3000/admin`
- Make sure you're logged in
- Then try cart API again

### Check 3: Cookies Enabled?
1. F12 → Application → Cookies
2. Look for `adminjs` cookie
3. If missing, clear cookies and login again

### Check 4: Check Server Logs
Look for the 🔍 emoji in server console when you call `/api/cart`

## Full Test Script

```javascript
// Run this in browser console after logging in:

async function testAuth() {
  console.log('Testing authentication...');

  // Test 1: Get Cart
  console.log('\n1. Testing GET /api/cart');
  let response = await fetch('/api/cart', { credentials: 'include' });
  let data = await response.json();
  console.log('Response:', data);

  if (!data.success) {
    console.error('❌ Cart failed - not authenticated');
    return;
  }
  console.log('✅ Cart works!');

  // Test 2: Add to Cart (make sure product 1 exists)
  console.log('\n2. Testing POST /api/cart/add');
  response = await fetch('/api/cart/add', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 1, quantity: 1 })
  });
  data = await response.json();
  console.log('Response:', data);

  if (data.success) {
    console.log('✅ Add to cart works!');
  } else {
    console.log('⚠️  Add failed (product might not exist):', data.message);
  }

  // Test 3: Get Orders
  console.log('\n3. Testing GET /api/user/orders');
  response = await fetch('/api/user/orders', { credentials: 'include' });
  data = await response.json();
  console.log('Response:', data);

  if (data.success) {
    console.log('✅ Orders works!');
  }

  console.log('\n🎉 All tests complete!');
}

testAuth();
```

## What Should Happen

1. **Login at /admin** → Session created
2. **Call /api/cart** → Session recognized
3. **Cart data returned** → Success!

## Summary

- ✅ Session middleware is now global
- ✅ All routes share the same session
- ✅ Authentication works across entire app

**Just restart the server and test!** 🚀
