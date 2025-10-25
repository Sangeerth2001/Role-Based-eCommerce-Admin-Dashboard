import React, { useEffect, useState } from 'react';
import { Box, H2, H5, Text, Table, TableHead, TableBody, TableRow, TableCell } from '@adminjs/design-system';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: number;
    userId: number;
    status: string;
    totalAmount: number;
    createdAt: string;
  }>;
  lowStockProducts: Array<{
    id: number;
    name: string;
    stock: number;
    price: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }

        const result = await response.json();
        setStats(result.data as DashboardStats);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

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

  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Admin Dashboard</H2>

      {/* Statistics Cards */}
      <Box display="flex" flexDirection="row" marginBottom="xxl" flexWrap="wrap">
        <Box
          flex="1"
          minWidth="250px"
          marginRight="lg"
          marginBottom="lg"
          padding="xl"
          bg="white"
          border="default"
          borderRadius="default"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          <H5 marginBottom="sm" color="grey60">Total Users</H5>
          <Text fontSize="xxl" fontWeight="bold" color="primary100">
            {stats.totalUsers}
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="250px"
          marginRight="lg"
          marginBottom="lg"
          padding="xl"
          bg="white"
          border="default"
          borderRadius="default"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          <H5 marginBottom="sm" color="grey60">Total Orders</H5>
          <Text fontSize="xxl" fontWeight="bold" color="primary100">
            {stats.totalOrders}
          </Text>
        </Box>

        <Box
          flex="1"
          minWidth="250px"
          marginBottom="lg"
          padding="xl"
          bg="white"
          border="default"
          borderRadius="default"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          <H5 marginBottom="sm" color="grey60">Total Revenue</H5>
          <Text fontSize="xxl" fontWeight="bold" color="success">
            ${Number(stats.totalRevenue).toFixed(2)}
          </Text>
        </Box>
      </Box>

      {/* Recent Orders */}
      <Box marginBottom="xxl">
        <H5 marginBottom="lg">Recent Orders</H5>
        <Box bg="white" border="default" borderRadius="default" padding="lg">
          {stats.recentOrders.length === 0 ? (
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
                {stats.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>
                      <Text
                        fontWeight="bold"
                        color={
                          order.status === 'delivered'
                            ? 'success'
                            : order.status === 'cancelled'
                            ? 'error'
                            : 'primary100'
                        }
                      >
                        {order.status}
                      </Text>
                    </TableCell>
                    <TableCell>${Number(order.totalAmount).toFixed(2)}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
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
          {stats.lowStockProducts.length === 0 ? (
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
                    <TableCell>
                      <Text fontWeight="bold" color="error">
                        {product.stock}
                      </Text>
                    </TableCell>
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
};

export default AdminDashboard;
