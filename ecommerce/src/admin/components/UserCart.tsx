import React, { useState, useEffect } from 'react';
import { useCurrentAdmin } from 'adminjs';
import { Box, H2, H5, Text, Button, Table, TableHead, TableBody, TableRow, TableCell, Input, MessageBox } from '@adminjs/design-system';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  itemTotal: number;
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    image?: string;
  };
}

const UserCart: React.FC = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      console.log('Fetching cart with credentials...');
      const response = await fetch('/api/cart', {
        credentials: 'include', // Use AdminJS session cookies
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Cart response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch cart' }));
        console.error('Cart fetch error:', errorData);
        throw new Error(errorData.message || `Failed to fetch cart (${response.status})`);
      }

      const result = await response.json();
      console.log('Cart data received:', result);
      setCartItems(result.data || []);
      setTotal(parseFloat(result.total) || 0);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Use AdminJS session cookies
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update quantity');
      }

      fetchCart(); // Refresh cart
      setSuccess('Quantity updated');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update quantity');
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
        credentials: 'include', // Use AdminJS session cookies
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      fetchCart(); // Refresh cart
      setSuccess('Item removed from cart');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return;

    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        credentials: 'include', // Use AdminJS session cookies
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      fetchCart(); // Refresh cart
      setSuccess('Cart cleared');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
    }
  };

  if (!currentAdmin) {
    return (
      <Box padding="xxl">
        <Text>Not authenticated</Text>
      </Box>
    );
  }

  return (
    <Box padding="xxl">
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="xl">
        <H2>Shopping Cart</H2>
        {cartItems.length > 0 && (
          <Button variant="text" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </Box>

      {error && (
        <MessageBox message={error} variant="danger" onClose={() => setError(null)} />
      )}

      {success && (
        <MessageBox message={success} variant="success" onClose={() => setSuccess(null)} />
      )}

      {loading ? (
        <Text>Loading cart...</Text>
      ) : cartItems.length === 0 ? (
        <Box padding="xxl" style={{ textAlign: 'center' }}>
          <Text color="grey60" fontSize="lg" marginBottom="lg">
            Your cart is empty
          </Text>
          <Text fontSize="sm" color="grey60">
            Start browsing products to add items to your cart!
          </Text>
        </Box>
      ) : (
        <>
          <Box bg="white" border="default" borderRadius="default" padding="lg" marginBottom="xl">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '4px',
                            marginRight: '12px',
                            backgroundImage: item.product.image ? `url(${item.product.image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                        <Text fontWeight="bold">{item.product.name}</Text>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Text>${Number(item.product.price).toFixed(2)}</Text>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Button
                          size="sm"
                          variant="text"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <Input
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            if (val > 0) updateQuantity(item.id, val);
                          }}
                          type="number"
                          min="1"
                          max={item.product.stock}
                          style={{ width: '60px', margin: '0 8px', textAlign: 'center' }}
                        />
                        <Button
                          size="sm"
                          variant="text"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          +
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Text fontWeight="bold">${Number(item.itemTotal).toFixed(2)}</Text>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="text" onClick={() => removeItem(item.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Cart Summary */}
          <Box bg="white" border="default" borderRadius="default" padding="xl" style={{ maxWidth: '400px', marginLeft: 'auto' }}>
            <H5 marginBottom="lg">Cart Summary</H5>
            <Box display="flex" justifyContent="space-between" marginBottom="md">
              <Text>Subtotal:</Text>
              <Text fontWeight="bold">${total.toFixed(2)}</Text>
            </Box>
            <Box display="flex" justifyContent="space-between" marginBottom="lg" paddingTop="lg" style={{ borderTop: '2px solid #f0f0f0' }}>
              <Text fontSize="lg" fontWeight="bold">Total:</Text>
              <Text fontSize="lg" fontWeight="bold" color="primary100">${total.toFixed(2)}</Text>
            </Box>
            <Button variant="primary" style={{ width: '100%' }} onClick={() => window.location.href = '#/admin/pages/checkout'}>
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserCart;
