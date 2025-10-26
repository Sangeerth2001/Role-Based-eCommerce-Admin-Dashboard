import React, { useState, useEffect } from 'react';
import { useCurrentAdmin } from 'adminjs';
import { Box, H2, H5, Text, Button, MessageBox, Badge } from '@adminjs/design-system';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  itemTotal: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

const UserCheckout: React.FC = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart', {
        credentials: 'include', // Use AdminJS session cookies
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }

      const result = await response.json();
      setCartItems(result.data || []);
      setTotal(parseFloat(result.total) || 0);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err instanceof Error ? err.message : 'Failed to load cart');
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    setPlacing(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Use AdminJS session cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const result = await response.json();
      setOrderId(result.data.id);
      setSuccess(true);
      setPlacing(false);
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err instanceof Error ? err.message : 'Failed to place order');
      setPlacing(false);
    }
  };

  if (!currentAdmin) {
    return (
      <Box padding="xxl">
        <Text>Not authenticated</Text>
      </Box>
    );
  }

  if (success && orderId) {
    return (
      <Box padding="xxl">
        <Box style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <Box marginBottom="xl">
            <Text fontSize="xxl" style={{ fontSize: '48px' }}>✓</Text>
          </Box>
          <H2 marginBottom="lg" color="success">Order Placed Successfully!</H2>
          <Text fontSize="lg" marginBottom="xl">
            Your order <Badge variant="primary">#{orderId}</Badge> has been confirmed.
          </Text>
          <Box bg="white" border="default" borderRadius="default" padding="xl" marginBottom="xl">
            <Text fontWeight="bold" marginBottom="sm">What's Next?</Text>
            <Text fontSize="sm" color="grey80" marginBottom="sm">
              • You will receive an order confirmation email shortly
            </Text>
            <Text fontSize="sm" color="grey80" marginBottom="sm">
              • Track your order status in your dashboard
            </Text>
            <Text fontSize="sm" color="grey80">
              • We'll notify you when your order ships
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" style={{ gap: '12px' }}>
            <Button onClick={() => window.location.href = '#/admin'}>
              Go to Dashboard
            </Button>
            <Button variant="text" onClick={() => window.location.href = '#/admin/pages/products'}>
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Checkout</H2>

      {error && (
        <MessageBox message={error} variant="danger" onClose={() => setError(null)} />
      )}

      {loading ? (
        <Text>Loading checkout...</Text>
      ) : cartItems.length === 0 ? (
        <Box padding="xxl" style={{ textAlign: 'center' }}>
          <Text color="grey60" fontSize="lg" marginBottom="lg">
            Your cart is empty
          </Text>
          <Button onClick={() => window.location.href = '#/admin/pages/products'}>
            Browse Products
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexDirection="row" flexWrap="wrap" style={{ gap: '24px' }}>
          {/* Order Summary */}
          <Box flex="1" minWidth="300px">
            <Box bg="white" border="default" borderRadius="default" padding="xl">
              <H5 marginBottom="lg">Order Summary</H5>

              {cartItems.map((item) => (
                <Box key={item.id} marginBottom="lg" paddingBottom="lg" style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <Box display="flex" justifyContent="space-between" marginBottom="sm">
                    <Text fontWeight="bold">{item.product.name}</Text>
                    <Text>${Number(item.product.price).toFixed(2)}</Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="grey60">Quantity: {item.quantity}</Text>
                    <Text fontWeight="bold">${Number(item.itemTotal).toFixed(2)}</Text>
                  </Box>
                </Box>
              ))}

              <Box marginTop="lg" paddingTop="lg" style={{ borderTop: '2px solid #f0f0f0' }}>
                <Box display="flex" justifyContent="space-between" marginBottom="sm">
                  <Text>Subtotal:</Text>
                  <Text>${total.toFixed(2)}</Text>
                </Box>
                <Box display="flex" justifyContent="space-between" marginBottom="sm">
                  <Text>Tax (estimated):</Text>
                  <Text>${(total * 0.08).toFixed(2)}</Text>
                </Box>
                <Box display="flex" justifyContent="space-between" marginBottom="sm">
                  <Text>Shipping:</Text>
                  <Text>$9.99</Text>
                </Box>
                <Box display="flex" justifyContent="space-between" marginTop="lg" paddingTop="lg" style={{ borderTop: '2px solid #f0f0f0' }}>
                  <Text fontSize="lg" fontWeight="bold">Total:</Text>
                  <Text fontSize="lg" fontWeight="bold" color="primary100">
                    ${(total + total * 0.08 + 9.99).toFixed(2)}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Customer Information */}
          <Box flex="1" minWidth="300px">
            <Box bg="white" border="default" borderRadius="default" padding="xl" marginBottom="lg">
              <H5 marginBottom="lg">Customer Information</H5>
              <Box marginBottom="md">
                <Text fontWeight="bold">Name:</Text>
                <Text color="grey80">{currentAdmin.name}</Text>
              </Box>
              <Box marginBottom="md">
                <Text fontWeight="bold">Email:</Text>
                <Text color="grey80">{currentAdmin.email}</Text>
              </Box>
            </Box>

            <Box bg="white" border="default" borderRadius="default" padding="xl">
              <H5 marginBottom="lg">Payment Method</H5>
              <Box bg="grey20" padding="lg" borderRadius="default" marginBottom="lg">
                <Text fontSize="sm" color="grey60" style={{ textAlign: 'center' }}>
                  Payment processing is simulated
                </Text>
              </Box>

              <Button
                variant="primary"
                onClick={placeOrder}
                disabled={placing}
                style={{ width: '100%' }}
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </Button>

              <Text fontSize="sm" color="grey60" marginTop="md" style={{ textAlign: 'center' }}>
                By placing this order, you agree to our terms and conditions
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserCheckout;
