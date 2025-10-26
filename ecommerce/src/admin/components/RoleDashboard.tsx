import React, { useEffect, useState } from 'react';
import { useCurrentAdmin } from 'adminjs';
import { Box, H2, H5, Text, Table, TableHead, TableBody, TableRow, TableCell, Badge } from '@adminjs/design-system';

interface DashboardStats {
  totalUsers?: number;
  totalOrders: number;
  totalRevenue?: number;
  pendingOrders?: number;
  completedOrders?: number;
  totalSpent?: number;
  recentOrders: Array<{
    id: number;
    userId?: number;
    status: string;
    totalAmount: number;
    createdAt: string;
  }>;
  lowStockProducts?: Array<{
    id: number;
    name: string;
    stock: number;
    price: number;
  }>;
}

/**
 * Smart dashboard component that shows different content based on user role
 */
const RoleDashboard: React.FC = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = currentAdmin?.role === 'admin';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let endpoint = isAdmin ? '/api/dashboard/stats' : '/api/dashboard/user-stats';

        // For regular users, append userId as query parameter
        if (!isAdmin && currentAdmin?.id) {
          endpoint = `${endpoint}?userId=${currentAdmin.id}`;
        }

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch statistics');
        }

        const result = await response.json();
        setStats(result.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load statistics');
        setLoading(false);
      }
    };

    if (currentAdmin) {
      fetchStats();
    }
  }, [isAdmin, currentAdmin]);

  if (!currentAdmin) {
    return (
      <Box padding="xxl">
        <Text>Not authenticated</Text>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box padding="xxl">
        <Text>Loading dashboard...</Text>
      </Box>
    );
  }

  if (error || !stats) {
    return (
      <Box padding="xxl">
        <Text color="error">{error || 'Failed to load dashboard'}</Text>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      default: return 'default';
    }
  };

  // Render Admin Dashboard
  if (isAdmin) {
    return (
      <Box padding="xxl">
        <H2 marginBottom="xl">Admin Dashboard</H2>

        {/* Admin Stats */}
        <Box display="flex" flexDirection="row" marginBottom="xxl" flexWrap="wrap">
          <Box flex="1" minWidth="250px" marginRight="lg" marginBottom="lg" padding="xl" bg="white" border="default" borderRadius="default" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <H5 marginBottom="sm" color="grey60">Total Users</H5>
            <Text fontSize="xxl" fontWeight="bold" color="primary100">{stats.totalUsers}</Text>
          </Box>
          <Box flex="1" minWidth="250px" marginRight="lg" marginBottom="lg" padding="xl" bg="white" border="default" borderRadius="default" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <H5 marginBottom="sm" color="grey60">Total Orders</H5>
            <Text fontSize="xxl" fontWeight="bold" color="primary100">{stats.totalOrders}</Text>
          </Box>
          <Box flex="1" minWidth="250px" marginBottom="lg" padding="xl" bg="white" border="default" borderRadius="default" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <H5 marginBottom="sm" color="grey60">Total Revenue</H5>
            <Text fontSize="xxl" fontWeight="bold" color="success">${Number(stats.totalRevenue).toFixed(2)}</Text>
          </Box>
        </Box>

        {/* Recent Orders */}
        <Box marginBottom="xxl">
          <H5 marginBottom="lg">Recent Orders</H5>
          <Box bg="white" border="default" borderRadius="default" padding="lg">
            {stats.recentOrders?.length === 0 ? (
              <Text color="grey60">No recent orders</Text>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.recentOrders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell><Badge variant={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge></TableCell>
                      <TableCell>${Number(order.totalAmount).toFixed(2)}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>

        {/* Low Stock Products */}
        <Box>
          <H5 marginBottom="lg">Low Stock Products (Stock &lt; 10)</H5>
          <Box bg="white" border="default" borderRadius="default" padding="lg">
            {!stats.lowStockProducts || stats.lowStockProducts.length === 0 ? (
              <Text color="grey60">All products are well stocked</Text>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.lowStockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell><Text fontWeight="bold" color="error">{product.stock}</Text></TableCell>
                      <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  // Render User Dashboard
  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Welcome, {currentAdmin.name}!</H2>

      {/* Personal Info */}
      <Box marginBottom="xxl">
        <H5 marginBottom="lg">Your Information</H5>
        <Box bg="white" border="default" borderRadius="default" padding="xl">
          <Box marginBottom="md">
            <Text fontWeight="bold">Name:</Text> <Text color="grey80">{currentAdmin.name}</Text>
          </Box>
          <Box marginBottom="md">
            <Text fontWeight="bold">Email:</Text> <Text color="grey80">{currentAdmin.email}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Account Type:</Text> <Badge variant="primary">{currentAdmin.role}</Badge>
          </Box>
        </Box>
      </Box>

      {/* Order Stats */}
      <Box marginBottom="xxl">
        <H5 marginBottom="lg">Your Order Statistics</H5>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          <Box flex="1" minWidth="200px" marginRight="lg" marginBottom="lg" padding="xl" bg="white" border="default" borderRadius="default" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Text fontSize="sm" color="grey60" marginBottom="sm">Total Orders</Text>
            <Text fontSize="xxl" fontWeight="bold" color="primary100">{stats.totalOrders}</Text>
          </Box>
          <Box flex="1" minWidth="200px" marginRight="lg" marginBottom="lg" padding="xl" bg="white" border="default" borderRadius="default" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Text fontSize="sm" color="grey60" marginBottom="sm">Pending Orders</Text>
            <Text fontSize="xxl" fontWeight="bold" color="warning">{stats.pendingOrders}</Text>
          </Box>
          <Box flex="1" minWidth="200px" marginRight="lg" marginBottom="lg" padding="xl" bg="white" border="default" borderRadius="default" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Text fontSize="sm" color="grey60" marginBottom="sm">Completed Orders</Text>
            <Text fontSize="xxl" fontWeight="bold" color="success">{stats.completedOrders}</Text>
          </Box>
          <Box flex="1" minWidth="200px" marginBottom="lg" padding="xl" bg="white" border="default" borderRadius="default" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <Text fontSize="sm" color="grey60" marginBottom="sm">Total Spent</Text>
            <Text fontSize="xxl" fontWeight="bold" color="primary100">${Number(stats.totalSpent).toFixed(2)}</Text>
          </Box>
        </Box>
      </Box>

      {/* Recent Orders */}
      <Box>
        <H5 marginBottom="lg">Recent Orders (Last 5)</H5>
        <Box bg="white" border="default" borderRadius="default" padding="lg">
          {stats.recentOrders.length === 0 ? (
            <Box padding="xl" style={{ textAlign: 'center' }}>
              <Text color="grey60" fontSize="lg">You haven't placed any orders yet</Text>
              <Text color="grey60" fontSize="sm" marginTop="sm">Start shopping to see your orders here!</Text>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell><Text fontWeight="bold">#{order.id}</Text></TableCell>
                    <TableCell><Badge variant={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge></TableCell>
                    <TableCell><Text fontWeight="bold">${Number(order.totalAmount).toFixed(2)}</Text></TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>

      {/* API Tips */}
      <Box marginTop="xxl">
        <Box bg="info" border="default" borderRadius="default" padding="lg" style={{ backgroundColor: '#e6f7ff', borderColor: '#91d5ff' }}>
          <Text fontWeight="bold" marginBottom="sm">💡 Quick Tips</Text>
          <Text fontSize="sm" color="grey80">• Use the REST API at <code>/api/products</code> to browse products</Text>
          <Text fontSize="sm" color="grey80">• Manage your cart at <code>/api/cart</code></Text>
          <Text fontSize="sm" color="grey80">• Place orders at <code>/api/checkout</code></Text>
          <Text fontSize="sm" color="grey80">• View order history at <code>/api/user/orders</code></Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RoleDashboard;
