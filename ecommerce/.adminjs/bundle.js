(function (React, designSystem, adminjs) {
    'use strict';

    function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

    var React__default = /*#__PURE__*/_interopDefault(React);

    const AdminDashboard = () => {
      const [stats, setStats] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      React.useEffect(() => {
        const fetchDashboardStats = async () => {
          try {
            const response = await fetch('/api/dashboard/stats', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
            if (!response.ok) {
              throw new Error('Failed to fetch dashboard stats');
            }
            const result = await response.json();
            setStats(result.data);
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
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading dashboard..."));
      }
      if (error || !stats) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          color: "error"
        }, error || 'Failed to load dashboard'));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        marginBottom: "xl"
      }, "Admin Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexDirection: "row",
        marginBottom: "xxl",
        flexWrap: "wrap"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "250px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "sm",
        color: "grey60"
      }, "Total Users"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "primary100"
      }, stats.totalUsers)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "250px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "sm",
        color: "grey60"
      }, "Total Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "primary100"
      }, stats.totalOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "250px",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "sm",
        color: "grey60"
      }, "Total Revenue"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "success"
      }, "$", Number(stats.totalRevenue).toFixed(2)))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Recent Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "lg"
      }, stats.recentOrders.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60"
      }, "No recent orders")) : (/*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Order ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "User ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Status"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Amount"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Date"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, stats.recentOrders.map(order => (/*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
        key: order.id
      }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, order.id), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, order.userId), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold",
        color: order.status === 'delivered' ? 'success' : order.status === 'cancelled' ? 'error' : 'primary100'
      }, order.status)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "$", Number(order.totalAmount).toFixed(2)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, new Date(order.createdAt).toLocaleDateString()))))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Low Stock Products (Stock < 10)"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "lg"
      }, stats.lowStockProducts.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60"
      }, "All products are well stocked")) : (/*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Product ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Name"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Stock"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Price"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, stats.lowStockProducts.map(product => (/*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
        key: product.id
      }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, product.id), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, product.name), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold",
        color: "error"
      }, product.stock)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "$", Number(product.price).toFixed(2)))))))))));
    };

    const UserDashboard = () => {
      const [currentAdmin] = adminjs.useCurrentAdmin();
      const [stats, setStats] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      React.useEffect(() => {
        const fetchUserStats = async () => {
          try {
            const response = await fetch('/api/dashboard/user-stats', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            });
            if (!response.ok) {
              throw new Error('Failed to fetch user statistics');
            }
            const result = await response.json();
            setStats(result.data);
            setLoading(false);
          } catch (err) {
            console.error('Error fetching user stats:', err);
            setError('Failed to load statistics');
            setLoading(false);
          }
        };
        fetchUserStats();
      }, []);
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading your dashboard..."));
      }
      if (error || !stats) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          color: "error"
        }, error || 'Failed to load dashboard'));
      }
      const getStatusColor = status => {
        switch (status) {
          case 'delivered':
            return 'success';
          case 'cancelled':
            return 'danger';
          case 'processing':
            return 'info';
          case 'shipped':
            return 'primary';
          default:
            return 'default';
        }
      };
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        marginBottom: "xl"
      }, "Welcome, ", currentAdmin?.name || 'User', "!"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Your Information"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Name:"), ' ', /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey80"
      }, currentAdmin?.name)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Email:"), ' ', /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey80"
      }, currentAdmin?.email)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Account Type:"), ' ', /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "primary"
      }, currentAdmin?.role)))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Your Order Statistics"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Total Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "primary100"
      }, stats.totalOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Pending Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "warning"
      }, stats.pendingOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Completed Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "success"
      }, stats.completedOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Total Spent"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "primary100"
      }, "$", Number(stats.totalSpent).toFixed(2))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Recent Orders (Last 5)"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "lg"
      }, stats.recentOrders.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xl",
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "lg"
      }, "You haven't placed any orders yet"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "sm",
        marginTop: "sm"
      }, "Start shopping to see your orders here!"))) : (/*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Order ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Status"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Amount"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Date"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, stats.recentOrders.map(order => (/*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
        key: order.id
      }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "#", order.id)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: getStatusColor(order.status)
      }, order.status.toUpperCase())), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "$", Number(order.totalAmount).toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, new Date(order.createdAt).toLocaleDateString()))))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "info",
        border: "default",
        borderRadius: "default",
        padding: "lg",
        style: {
          backgroundColor: '#e6f7ff',
          borderColor: '#91d5ff'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold",
        marginBottom: "sm"
      }, "\uD83D\uDCA1 Quick Tips"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 Use the REST API at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/products"), " to browse products"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 Manage your cart at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/cart")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 Place orders at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/checkout")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 View order history at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/user/orders")))));
    };

    const RoleDashboard = () => {
      const [currentAdmin] = adminjs.useCurrentAdmin();
      const [stats, setStats] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      const isAdmin = currentAdmin?.role === 'admin';
      React.useEffect(() => {
        const fetchStats = async () => {
          try {
            let endpoint = isAdmin ? '/api/dashboard/stats' : '/api/dashboard/user-stats';
            if (!isAdmin && currentAdmin?.id) {
              endpoint = `${endpoint}?userId=${currentAdmin.id}`;
            }
            const response = await fetch(endpoint, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
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
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Not authenticated"));
      }
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading dashboard..."));
      }
      if (error || !stats) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          color: "error"
        }, error || 'Failed to load dashboard'));
      }
      const getStatusColor = status => {
        switch (status) {
          case 'delivered':
            return 'success';
          case 'cancelled':
            return 'danger';
          case 'processing':
            return 'info';
          case 'shipped':
            return 'primary';
          default:
            return 'default';
        }
      };
      if (isAdmin) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
          marginBottom: "xl"
        }, "Admin Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          display: "flex",
          flexDirection: "row",
          marginBottom: "xxl",
          flexWrap: "wrap"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          flex: "1",
          minWidth: "250px",
          marginRight: "lg",
          marginBottom: "lg",
          padding: "xl",
          bg: "white",
          border: "default",
          borderRadius: "default",
          style: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
          marginBottom: "sm",
          color: "grey60"
        }, "Total Users"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "xxl",
          fontWeight: "bold",
          color: "primary100"
        }, stats.totalUsers)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          flex: "1",
          minWidth: "250px",
          marginRight: "lg",
          marginBottom: "lg",
          padding: "xl",
          bg: "white",
          border: "default",
          borderRadius: "default",
          style: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
          marginBottom: "sm",
          color: "grey60"
        }, "Total Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "xxl",
          fontWeight: "bold",
          color: "primary100"
        }, stats.totalOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          flex: "1",
          minWidth: "250px",
          marginBottom: "lg",
          padding: "xl",
          bg: "white",
          border: "default",
          borderRadius: "default",
          style: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
          marginBottom: "sm",
          color: "grey60"
        }, "Total Revenue"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "xxl",
          fontWeight: "bold",
          color: "success"
        }, "$", Number(stats.totalRevenue).toFixed(2)))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          marginBottom: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
          marginBottom: "lg"
        }, "Recent Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          bg: "white",
          border: "default",
          borderRadius: "default",
          padding: "lg"
        }, stats.recentOrders?.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          color: "grey60"
        }, "No recent orders")) : (/*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Order ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "User ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Status"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Amount"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Date"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, stats.recentOrders?.map(order => (/*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
          key: order.id
        }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, order.id), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, order.userId), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
          variant: getStatusColor(order.status)
        }, order.status.toUpperCase())), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "$", Number(order.totalAmount).toFixed(2)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, new Date(order.createdAt).toLocaleDateString()))))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
          marginBottom: "lg"
        }, "Low Stock Products (Stock < 10)"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          bg: "white",
          border: "default",
          borderRadius: "default",
          padding: "lg"
        }, !stats.lowStockProducts || stats.lowStockProducts.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          color: "grey60"
        }, "All products are well stocked")) : (/*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Product ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Name"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Stock"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Price"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, stats.lowStockProducts.map(product => (/*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
          key: product.id
        }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, product.id), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, product.name), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontWeight: "bold",
          color: "error"
        }, product.stock)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "$", Number(product.price).toFixed(2)))))))))));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        marginBottom: "xl"
      }, "Welcome, ", currentAdmin.name, "!"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Your Information"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Name:"), " ", /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey80"
      }, currentAdmin.name)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Email:"), " ", /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey80"
      }, currentAdmin.email)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Account Type:"), " ", /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "primary"
      }, currentAdmin.role)))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Your Order Statistics"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Total Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "primary100"
      }, stats.totalOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Pending Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "warning"
      }, stats.pendingOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginRight: "lg",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Completed Orders"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "success"
      }, stats.completedOrders)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "200px",
        marginBottom: "lg",
        padding: "xl",
        bg: "white",
        border: "default",
        borderRadius: "default",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, "Total Spent"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xxl",
        fontWeight: "bold",
        color: "primary100"
      }, "$", Number(stats.totalSpent).toFixed(2))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Recent Orders (Last 5)"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "lg"
      }, stats.recentOrders.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xl",
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "lg"
      }, "You haven't placed any orders yet"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "sm",
        marginTop: "sm"
      }, "Start shopping to see your orders here!"))) : (/*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Order ID"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Status"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Amount"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Date"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, stats.recentOrders.map(order => (/*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
        key: order.id
      }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "#", order.id)), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: getStatusColor(order.status)
      }, order.status.toUpperCase())), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "$", Number(order.totalAmount).toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, new Date(order.createdAt).toLocaleDateString()))))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "info",
        border: "default",
        borderRadius: "default",
        padding: "lg",
        style: {
          backgroundColor: '#e6f7ff',
          borderColor: '#91d5ff'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold",
        marginBottom: "sm"
      }, "\uD83D\uDCA1 Quick Tips"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 Use the REST API at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/products"), " to browse products"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 Manage your cart at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/cart")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 Place orders at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/checkout")), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "\u2022 View order history at ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/user/orders")))));
    };

    const SettingsPage = () => {
      const [settings, setSettings] = React.useState({});
      const [loading, setLoading] = React.useState(true);
      const [saving, setSaving] = React.useState(false);
      const [error, setError] = React.useState(null);
      const [success, setSuccess] = React.useState(null);
      const settingsConfig = [{
        key: 'site_name',
        label: 'Site Name',
        description: 'The name of your eCommerce store'
      }, {
        key: 'currency',
        label: 'Currency',
        description: 'Default currency (e.g., USD, EUR, GBP)'
      }, {
        key: 'tax_rate',
        label: 'Tax Rate (%)',
        description: 'Default tax rate percentage'
      }, {
        key: 'shipping_cost',
        label: 'Shipping Cost',
        description: 'Default shipping cost'
      }, {
        key: 'contact_email',
        label: 'Contact Email',
        description: 'Customer support email address'
      }, {
        key: 'min_order_amount',
        label: 'Minimum Order Amount',
        description: 'Minimum order amount for checkout'
      }];
      React.useEffect(() => {
        fetchSettings();
      }, []);
      const fetchSettings = async () => {
        try {
          const response = await fetch('/api/settings', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch settings');
          }
          const result = await response.json();
          const settingsMap = {};
          result.data.forEach(setting => {
            settingsMap[setting.key] = setting.value;
          });
          setSettings(settingsMap);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching settings:', err);
          setError('Failed to load settings');
          setLoading(false);
        }
      };
      const handleInputChange = (key, value) => {
        setSettings(prev => ({
          ...prev,
          [key]: value
        }));
      };
      const handleSave = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);
        try {
          const response = await fetch('/api/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              settings
            })
          });
          if (!response.ok) {
            throw new Error('Failed to save settings');
          }
          setSuccess('Settings saved successfully!');
          setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
          console.error('Error saving settings:', err);
          setError('Failed to save settings');
        } finally {
          setSaving(false);
        }
      };
      if (loading) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading settings..."));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        marginBottom: "xl"
      }, "Settings"), error && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: error,
        variant: "danger",
        onClose: () => setError(null)
      })), success && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: success,
        variant: "success",
        onClose: () => setSuccess(null)
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xxl",
        style: {
          maxWidth: '800px'
        }
      }, settingsConfig.map(config => (/*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        key: config.key,
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        htmlFor: config.key
      }, config.label), config.description && (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, config.description)), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        id: config.key,
        value: settings[config.key] || '',
        onChange: e => handleInputChange(config.key, e.target.value),
        placeholder: `Enter ${config.label.toLowerCase()}`
      })))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "xxl",
        display: "flex",
        justifyContent: "flex-end"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "primary",
        onClick: handleSave,
        disabled: saving
      }, saving ? 'Saving...' : 'Save Settings'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Current Settings Summary"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "grey20",
        border: "default",
        borderRadius: "default",
        padding: "lg"
      }, settingsConfig.map(config => (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: config.key,
        marginBottom: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, config.label, ":"), ' ', /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey80"
      }, settings[config.key] || 'Not set')))))));
    };

    const UserSettings = () => {
      const [currentAdmin] = adminjs.useCurrentAdmin();
      const [name, setName] = React.useState('');
      const [email, setEmail] = React.useState('');
      const [currentPassword, setCurrentPassword] = React.useState('');
      const [newPassword, setNewPassword] = React.useState('');
      const [confirmPassword, setConfirmPassword] = React.useState('');
      const [saving, setSaving] = React.useState(false);
      const [error, setError] = React.useState(null);
      const [success, setSuccess] = React.useState(null);
      React.useEffect(() => {
        if (currentAdmin) {
          setName(currentAdmin.name || '');
          setEmail(currentAdmin.email || '');
        }
      }, [currentAdmin]);
      const handleSaveProfile = async () => {
        setSaving(true);
        setError(null);
        setSuccess(null);
        try {
          const updateData = {
            name,
            email
          };
          if (newPassword) {
            if (newPassword !== confirmPassword) {
              setError('New passwords do not match');
              setSaving(false);
              return;
            }
            if (!currentPassword) {
              setError('Current password is required to set a new password');
              setSaving(false);
              return;
            }
            updateData.currentPassword = currentPassword;
            updateData.newPassword = newPassword;
          }
          const response = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(updateData)
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update profile');
          }
          setSuccess('Profile updated successfully!');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
          console.error('Error updating profile:', err);
          setError(err instanceof Error ? err.message : 'Failed to update profile');
        } finally {
          setSaving(false);
        }
      };
      if (!currentAdmin) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Not authenticated"));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        marginBottom: "xl"
      }, "Account Settings"), error && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: error,
        variant: "danger",
        onClose: () => setError(null)
      })), success && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: success,
        variant: "success",
        onClose: () => setSuccess(null)
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xxl",
        marginBottom: "xxl",
        style: {
          maxWidth: '600px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Profile Information"), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        htmlFor: "name"
      }, "Full Name"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        id: "name",
        value: name,
        onChange: e => setName(e.target.value),
        placeholder: "Enter your full name"
      })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        htmlFor: "email"
      }, "Email Address"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        id: "email",
        type: "email",
        value: email,
        onChange: e => setEmail(e.target.value),
        placeholder: "Enter your email"
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "primary",
        onClick: handleSaveProfile,
        disabled: saving
      }, saving ? 'Saving...' : 'Save Profile'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xxl",
        style: {
          maxWidth: '600px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Change Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "lg"
      }, "Leave blank if you don't want to change your password"), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        htmlFor: "currentPassword"
      }, "Current Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        id: "currentPassword",
        type: "password",
        value: currentPassword,
        onChange: e => setCurrentPassword(e.target.value),
        placeholder: "Enter current password"
      })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        htmlFor: "newPassword"
      }, "New Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        id: "newPassword",
        type: "password",
        value: newPassword,
        onChange: e => setNewPassword(e.target.value),
        placeholder: "Enter new password"
      })), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, {
        htmlFor: "confirmPassword"
      }, "Confirm New Password"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        id: "confirmPassword",
        type: "password",
        value: confirmPassword,
        onChange: e => setConfirmPassword(e.target.value),
        placeholder: "Confirm new password"
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "primary",
        onClick: handleSaveProfile,
        disabled: saving
      }, saving ? 'Updating...' : 'Update Password'))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "info",
        border: "default",
        borderRadius: "default",
        padding: "lg",
        style: {
          backgroundColor: '#e6f7ff',
          borderColor: '#91d5ff',
          maxWidth: '600px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold",
        marginBottom: "sm"
      }, "\u2139\uFE0F Note"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey80"
      }, "To use the full shopping features, you need to authenticate via the REST API using ", /*#__PURE__*/React__default.default.createElement("code", null, "/api/auth/login"), " endpoint and save the JWT token."))));
    };

    const UserProducts = () => {
      const [currentAdmin] = adminjs.useCurrentAdmin();
      const [products, setProducts] = React.useState([]);
      const [categories, setCategories] = React.useState([]);
      const [selectedCategory, setSelectedCategory] = React.useState('');
      const [searchQuery, setSearchQuery] = React.useState('');
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      const [success, setSuccess] = React.useState(null);
      React.useEffect(() => {
        fetchCategories();
        fetchProducts();
      }, []);
      const fetchCategories = async () => {
        try {
          const response = await fetch('/api/categories', {
            credentials: 'include'
          });
          const result = await response.json();
          setCategories(result.data || []);
        } catch (err) {
          console.error('Error fetching categories:', err);
        }
      };
      const fetchProducts = async (categoryId, search) => {
        setLoading(true);
        try {
          let url = '/api/products?';
          if (categoryId) url += `categoryId=${categoryId}&`;
          if (search) url += `search=${encodeURIComponent(search)}&`;
          const response = await fetch(url, {
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const result = await response.json();
          setProducts(result.data || []);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching products:', err);
          setError('Failed to load products');
          setLoading(false);
        }
      };
      const handleCategoryChange = categoryId => {
        setSelectedCategory(categoryId);
        fetchProducts(categoryId, searchQuery);
      };
      const handleSearch = () => {
        fetchProducts(selectedCategory, searchQuery);
      };
      const handleAddToCart = async (productId, productName) => {
        try {
          const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              productId,
              quantity: 1
            })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add to cart');
          }
          setSuccess(`${productName} added to cart!`);
          setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to add to cart');
        }
      };
      if (!currentAdmin) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Not authenticated"));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        marginBottom: "xl"
      }, "Browse Products"), error && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: error,
        variant: "danger",
        onClose: () => setError(null)
      })), success && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: success,
        variant: "success",
        onClose: () => setSuccess(null)
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "lg",
        marginBottom: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        flex: "1",
        minWidth: "200px",
        marginRight: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Category"), /*#__PURE__*/React__default.default.createElement("select", {
        value: selectedCategory,
        onChange: e => handleCategoryChange(e.target.value),
        style: {
          width: '100%',
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #d9d9d9'
        }
      }, /*#__PURE__*/React__default.default.createElement("option", {
        value: ""
      }, "All Categories"), categories.map(cat => (/*#__PURE__*/React__default.default.createElement("option", {
        key: cat.id,
        value: cat.id
      }, cat.name))))), /*#__PURE__*/React__default.default.createElement(designSystem.FormGroup, {
        flex: "2",
        minWidth: "300px",
        marginRight: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Label, null, "Search"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        value: searchQuery,
        onChange: e => setSearchQuery(e.target.value),
        onKeyPress: e => e.key === 'Enter' && handleSearch(),
        placeholder: "Search products..."
      })), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "flex-end"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        onClick: handleSearch
      }, "Search")))), loading ? (/*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading products...")) : products.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl",
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "lg"
      }, "No products found"))) : (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "grid",
        style: {
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }
      }, products.map(product => (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: product.id,
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "lg",
        style: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: '100%',
          height: '200px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }, !product.imageUrl && (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60"
      }, "No Image")))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "sm"
      }, product.name), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginBottom: "sm"
      }, product.description), product.category && (/*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
        variant: "info",
        size: "sm",
        style: {
          marginBottom: '8px'
        }
      }, product.category.name))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "xl",
        fontWeight: "bold",
        color: "primary100"
      }, "$", Number(product.price).toFixed(2)), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: product.stock > 0 ? 'success' : 'error'
      }, product.stock > 0 ? `${product.stock} in stock` : 'Out of stock')), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "primary",
        onClick: () => handleAddToCart(product.id, product.name),
        disabled: product.stock === 0,
        style: {
          width: '100%'
        }
      }, product.stock === 0 ? 'Out of Stock' : 'Add to Cart')))))));
    };

    const UserCart = () => {
      const [currentAdmin] = adminjs.useCurrentAdmin();
      const [cartItems, setCartItems] = React.useState([]);
      const [total, setTotal] = React.useState(0);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);
      const [success, setSuccess] = React.useState(null);
      React.useEffect(() => {
        fetchCart();
      }, []);
      const fetchCart = async () => {
        setLoading(true);
        try {
          console.log('Fetching cart with credentials...');
          const response = await fetch('/api/cart', {
            credentials: 'include',
            headers: {
              'Accept': 'application/json'
            }
          });
          console.log('Cart response status:', response.status);
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({
              message: 'Failed to fetch cart'
            }));
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
      const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
          const response = await fetch(`/api/cart/${cartItemId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
              quantity: newQuantity
            })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update quantity');
          }
          fetchCart();
          setSuccess('Quantity updated');
          setTimeout(() => setSuccess(null), 2000);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to update quantity');
        }
      };
      const removeItem = async cartItemId => {
        try {
          const response = await fetch(`/api/cart/${cartItemId}`, {
            method: 'DELETE',
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to remove item');
          }
          fetchCart();
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
            credentials: 'include'
          });
          if (!response.ok) {
            throw new Error('Failed to clear cart');
          }
          fetchCart();
          setSuccess('Cart cleared');
          setTimeout(() => setSuccess(null), 2000);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to clear cart');
        }
      };
      if (!currentAdmin) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Not authenticated"));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Shopping Cart"), cartItems.length > 0 && (/*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "text",
        onClick: clearCart
      }, "Clear Cart"))), error && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: error,
        variant: "danger",
        onClose: () => setError(null)
      })), success && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: success,
        variant: "success",
        onClose: () => setSuccess(null)
      })), loading ? (/*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading cart...")) : cartItems.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl",
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "lg",
        marginBottom: "lg"
      }, "Your cart is empty"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60"
      }, "Start browsing products to add items to your cart!"))) : (/*#__PURE__*/React__default.default.createElement(React__default.default.Fragment, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "lg",
        marginBottom: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Product"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Price"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Quantity"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Total"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Actions"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableBody, null, cartItems.map(item => (/*#__PURE__*/React__default.default.createElement(designSystem.TableRow, {
        key: item.id
      }, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        style: {
          width: '60px',
          height: '60px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          marginRight: '12px',
          backgroundImage: item.product.imageUrl ? `url(${item.product.imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, item.product.name))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "$", Number(item.product.price).toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        alignItems: "center"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        size: "sm",
        variant: "text",
        onClick: () => updateQuantity(item.id, item.quantity - 1),
        disabled: item.quantity <= 1
      }, "-"), /*#__PURE__*/React__default.default.createElement(designSystem.Input, {
        value: item.quantity,
        onChange: e => {
          const val = parseInt(e.target.value, 10);
          if (val > 0) updateQuantity(item.id, val);
        },
        type: "number",
        min: "1",
        max: item.product.stock,
        style: {
          width: '60px',
          margin: '0 8px',
          textAlign: 'center'
        }
      }), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        size: "sm",
        variant: "text",
        onClick: () => updateQuantity(item.id, item.quantity + 1),
        disabled: item.quantity >= item.product.stock
      }, "+"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "$", Number(item.itemTotal).toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        size: "sm",
        variant: "text",
        onClick: () => removeItem(item.id)
      }, "Remove")))))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xl",
        style: {
          maxWidth: '400px',
          marginLeft: 'auto'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Cart Summary"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Subtotal:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "$", total.toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "lg",
        paddingTop: "lg",
        style: {
          borderTop: '2px solid #f0f0f0'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "lg",
        fontWeight: "bold"
      }, "Total:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "lg",
        fontWeight: "bold",
        color: "primary100"
      }, "$", total.toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "primary",
        style: {
          width: '100%'
        },
        onClick: () => window.location.href = '#/admin/pages/checkout'
      }, "Proceed to Checkout")))));
    };

    const UserCheckout = () => {
      const [currentAdmin] = adminjs.useCurrentAdmin();
      const [cartItems, setCartItems] = React.useState([]);
      const [total, setTotal] = React.useState(0);
      const [loading, setLoading] = React.useState(true);
      const [placing, setPlacing] = React.useState(false);
      const [error, setError] = React.useState(null);
      const [success, setSuccess] = React.useState(false);
      const [orderId, setOrderId] = React.useState(null);
      React.useEffect(() => {
        fetchCart();
      }, []);
      const fetchCart = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/cart', {
            credentials: 'include'
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
              'Content-Type': 'application/json'
            },
            credentials: 'include'
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
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Not authenticated"));
      }
      if (success && orderId) {
        return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          padding: "xxl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          style: {
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          marginBottom: "xl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "xxl",
          style: {
            fontSize: '48px'
          }
        }, "\u2713")), /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
          marginBottom: "lg",
          color: "success"
        }, "Order Placed Successfully!"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "lg",
          marginBottom: "xl"
        }, "Your order ", /*#__PURE__*/React__default.default.createElement(designSystem.Badge, {
          variant: "primary"
        }, "#", orderId), " has been confirmed."), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          bg: "white",
          border: "default",
          borderRadius: "default",
          padding: "xl",
          marginBottom: "xl"
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontWeight: "bold",
          marginBottom: "sm"
        }, "What's Next?"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "sm",
          color: "grey80",
          marginBottom: "sm"
        }, "\u2022 You will receive an order confirmation email shortly"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "sm",
          color: "grey80",
          marginBottom: "sm"
        }, "\u2022 Track your order status in your dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
          fontSize: "sm",
          color: "grey80"
        }, "\u2022 We'll notify you when your order ships")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
          display: "flex",
          justifyContent: "center",
          style: {
            gap: '12px'
          }
        }, /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
          onClick: () => window.location.href = '#/admin'
        }, "Go to Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
          variant: "text",
          onClick: () => window.location.href = '#/admin/pages/products'
        }, "Continue Shopping"))));
      }
      return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H2, {
        marginBottom: "xl"
      }, "Checkout"), error && (/*#__PURE__*/React__default.default.createElement(designSystem.MessageBox, {
        message: error,
        variant: "danger",
        onClose: () => setError(null)
      })), loading ? (/*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Loading checkout...")) : cartItems.length === 0 ? (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        padding: "xxl",
        style: {
          textAlign: 'center'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey60",
        fontSize: "lg",
        marginBottom: "lg"
      }, "Your cart is empty"), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        onClick: () => window.location.href = '#/admin/pages/products'
      }, "Browse Products"))) : (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        style: {
          gap: '24px'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "300px"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Order Summary"), cartItems.map(item => (/*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        key: item.id,
        marginBottom: "lg",
        paddingBottom: "lg",
        style: {
          borderBottom: '1px solid #f0f0f0'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, item.product.name), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "$", Number(item.product.price).toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60"
      }, "Quantity: ", item.quantity), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "$", Number(item.itemTotal).toFixed(2)))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginTop: "lg",
        paddingTop: "lg",
        style: {
          borderTop: '2px solid #f0f0f0'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Subtotal:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "$", total.toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Tax (estimated):"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "$", (total * 0.08).toFixed(2))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "sm"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Shipping:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "$9.99")), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "lg",
        paddingTop: "lg",
        style: {
          borderTop: '2px solid #f0f0f0'
        }
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "lg",
        fontWeight: "bold"
      }, "Total:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "lg",
        fontWeight: "bold",
        color: "primary100"
      }, "$", (total + total * 0.08 + 9.99).toFixed(2)))))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        flex: "1",
        minWidth: "300px"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xl",
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Customer Information"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Name:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey80"
      }, currentAdmin.name)), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        marginBottom: "md"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontWeight: "bold"
      }, "Email:"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        color: "grey80"
      }, currentAdmin.email))), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "white",
        border: "default",
        borderRadius: "default",
        padding: "xl"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.H5, {
        marginBottom: "lg"
      }, "Payment Method"), /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
        bg: "grey20",
        padding: "lg",
        borderRadius: "default",
        marginBottom: "lg"
      }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        style: {
          textAlign: 'center'
        }
      }, "Payment processing is simulated")), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
        variant: "primary",
        onClick: placeOrder,
        disabled: placing,
        style: {
          width: '100%'
        }
      }, placing ? 'Placing Order...' : 'Place Order'), /*#__PURE__*/React__default.default.createElement(designSystem.Text, {
        fontSize: "sm",
        color: "grey60",
        marginTop: "md",
        style: {
          textAlign: 'center'
        }
      }, "By placing this order, you agree to our terms and conditions"))))));
    };

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.AdminDashboard = AdminDashboard;
    AdminJS.UserComponents.UserDashboard = UserDashboard;
    AdminJS.UserComponents.RoleDashboard = RoleDashboard;
    AdminJS.UserComponents.SettingsPage = SettingsPage;
    AdminJS.UserComponents.UserSettings = UserSettings;
    AdminJS.UserComponents.UserProducts = UserProducts;
    AdminJS.UserComponents.UserCart = UserCart;
    AdminJS.UserComponents.UserCheckout = UserCheckout;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvQWRtaW5EYXNoYm9hcmQuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlckRhc2hib2FyZC5qcyIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Sb2xlRGFzaGJvYXJkLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1NldHRpbmdzUGFnZS5qcyIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyU2V0dGluZ3MuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlclByb2R1Y3RzLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJDYXJ0LmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJDaGVja291dC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ2VsbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgQWRtaW5EYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgW3N0YXRzLCBzZXRTdGF0c10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZldGNoRGFzaGJvYXJkU3RhdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvZGFzaGJvYXJkL3N0YXRzJywge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZGFzaGJvYXJkIHN0YXRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZXRTdGF0cyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGFzaGJvYXJkIHN0YXRzOicsIGVycik7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCBzdGF0aXN0aWNzJyk7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZldGNoRGFzaGJvYXJkU3RhdHMoKTtcbiAgICB9LCBbXSk7XG4gICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTG9hZGluZyBkYXNoYm9hcmQuLi5cIikpKTtcbiAgICB9XG4gICAgaWYgKGVycm9yIHx8ICFzdGF0cykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJlcnJvclwiIH0sIGVycm9yIHx8ICdGYWlsZWQgdG8gbG9hZCBkYXNoYm9hcmQnKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIkFkbWluIERhc2hib2FyZFwiKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwicm93XCIsIG1hcmdpbkJvdHRvbTogXCJ4eGxcIiwgZmxleFdyYXA6IFwid3JhcFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgVXNlcnNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sIHN0YXRzLnRvdGFsVXNlcnMpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyNTBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJUb3RhbCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sIHN0YXRzLnRvdGFsT3JkZXJzKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgUmV2ZW51ZVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJzdWNjZXNzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgIE51bWJlcihzdGF0cy50b3RhbFJldmVudWUpLnRvRml4ZWQoMikpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnNcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc3RhdHMucmVjZW50T3JkZXJzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJObyByZWNlbnQgb3JkZXJzXCIpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiT3JkZXIgSURcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJVc2VyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiU3RhdHVzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiQW1vdW50XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVCb2R5LCBudWxsLCBzdGF0cy5yZWNlbnRPcmRlcnMubWFwKChvcmRlcikgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIHsga2V5OiBvcmRlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgb3JkZXIuaWQpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgb3JkZXIudXNlcklkKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBvcmRlci5zdGF0dXMgPT09ICdkZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3JkZXIuc3RhdHVzID09PSAnY2FuY2VsbGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnZXJyb3InXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdwcmltYXJ5MTAwJyB9LCBvcmRlci5zdGF0dXMpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpKSkpKSkpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJMb3cgU3RvY2sgUHJvZHVjdHMgKFN0b2NrIDwgMTApXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLmxvd1N0b2NrUHJvZHVjdHMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIkFsbCBwcm9kdWN0cyBhcmUgd2VsbCBzdG9ja2VkXCIpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiUHJvZHVjdCBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIk5hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJTdG9ja1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByaWNlXCIpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHksIG51bGwsIHN0YXRzLmxvd1N0b2NrUHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgeyBrZXk6IHByb2R1Y3QuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QuaWQpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgcHJvZHVjdC5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcImVycm9yXCIgfSwgcHJvZHVjdC5zdG9jaykpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSkpKSkpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBBZG1pbkRhc2hib2FyZDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ2VsbCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuY29uc3QgVXNlckRhc2hib2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xuICAgIGNvbnN0IFtzdGF0cywgc2V0U3RhdHNdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaFVzZXJTdGF0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9kYXNoYm9hcmQvdXNlci1zdGF0cycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXIgc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHVzZXIgc3RhdHM6JywgZXJyKTtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmZXRjaFVzZXJTdGF0cygpO1xuICAgIH0sIFtdKTtcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIHlvdXIgZGFzaGJvYXJkLi4uXCIpKSk7XG4gICAgfVxuICAgIGlmIChlcnJvciB8fCAhc3RhdHMpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZXJyb3JcIiB9LCBlcnJvciB8fCAnRmFpbGVkIHRvIGxvYWQgZGFzaGJvYXJkJykpKTtcbiAgICB9XG4gICAgY29uc3QgZ2V0U3RhdHVzQ29sb3IgPSAoc3RhdHVzKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlICdkZWxpdmVyZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnc3VjY2Vzcyc7XG4gICAgICAgICAgICBjYXNlICdjYW5jZWxsZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGFuZ2VyJztcbiAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NpbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5mbyc7XG4gICAgICAgICAgICBjYXNlICdzaGlwcGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ByaW1hcnknO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgXCJXZWxjb21lLCBcIixcbiAgICAgICAgICAgIGN1cnJlbnRBZG1pbj8ubmFtZSB8fCAnVXNlcicsXG4gICAgICAgICAgICBcIiFcIiksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIllvdXIgSW5mb3JtYXRpb25cIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJOYW1lOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTgwXCIgfSwgY3VycmVudEFkbWluPy5uYW1lKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiRW1haWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5ODBcIiB9LCBjdXJyZW50QWRtaW4/LmVtYWlsKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBcIkFjY291bnQgVHlwZTpcIiksXG4gICAgICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBcInByaW1hcnlcIiB9LCBjdXJyZW50QWRtaW4/LnJvbGUpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJZb3VyIE9yZGVyIFN0YXRpc3RpY3NcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJyb3dcIiwgZmxleFdyYXA6IFwid3JhcFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlRvdGFsIE9yZGVyc1wiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sIHN0YXRzLnRvdGFsT3JkZXJzKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlBlbmRpbmcgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJ3YXJuaW5nXCIgfSwgc3RhdHMucGVuZGluZ09yZGVycykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyMDBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSwgXCJDb21wbGV0ZWQgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJzdWNjZXNzXCIgfSwgc3RhdHMuY29tcGxldGVkT3JkZXJzKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlRvdGFsIFNwZW50XCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHN0YXRzLnRvdGFsU3BlbnQpLnRvRml4ZWQoMikpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJSZWNlbnQgT3JkZXJzIChMYXN0IDUpXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLnJlY2VudE9yZGVycy5sZW5ndGggPT09IDAgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4bFwiLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIsIGZvbnRTaXplOiBcImxnXCIgfSwgXCJZb3UgaGF2ZW4ndCBwbGFjZWQgYW55IG9yZGVycyB5ZXRcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiLCBmb250U2l6ZTogXCJzbVwiLCBtYXJnaW5Ub3A6IFwic21cIiB9LCBcIlN0YXJ0IHNob3BwaW5nIHRvIHNlZSB5b3VyIG9yZGVycyBoZXJlIVwiKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJPcmRlciBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkFtb3VudFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkRhdGVcIikpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMucmVjZW50T3JkZXJzLm1hcCgob3JkZXIpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogb3JkZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlci5pZCkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmFkZ2UsIHsgdmFyaWFudDogZ2V0U3RhdHVzQ29sb3Iob3JkZXIuc3RhdHVzKSB9LCBvcmRlci5zdGF0dXMudG9VcHBlckNhc2UoKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgbmV3IERhdGUob3JkZXIuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKSkpKSkpKSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luVG9wOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJpbmZvXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiwgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiAnI2U2ZjdmZicsIGJvcmRlckNvbG9yOiAnIzkxZDVmZicgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSwgXCJcXHVEODNEXFx1RENBMSBRdWljayBUaXBzXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5ODBcIiB9LFxuICAgICAgICAgICAgICAgICAgICBcIlxcdTIwMjIgVXNlIHRoZSBSRVNUIEFQSSBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL3Byb2R1Y3RzXCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiB0byBicm93c2UgcHJvZHVjdHNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBNYW5hZ2UgeW91ciBjYXJ0IGF0IFwiLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9hcGkvY2FydFwiKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBQbGFjZSBvcmRlcnMgYXQgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL2FwaS9jaGVja291dFwiKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBWaWV3IG9yZGVyIGhpc3RvcnkgYXQgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL2FwaS91c2VyL29yZGVyc1wiKSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJEYXNoYm9hcmQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ2VsbCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFJvbGVEYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgaXNBZG1pbiA9IGN1cnJlbnRBZG1pbj8ucm9sZSA9PT0gJ2FkbWluJztcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaFN0YXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgZW5kcG9pbnQgPSBpc0FkbWluID8gJy9hcGkvZGFzaGJvYXJkL3N0YXRzJyA6ICcvYXBpL2Rhc2hib2FyZC91c2VyLXN0YXRzJztcbiAgICAgICAgICAgICAgICBpZiAoIWlzQWRtaW4gJiYgY3VycmVudEFkbWluPy5pZCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRwb2ludCA9IGAke2VuZHBvaW50fT91c2VySWQ9JHtjdXJyZW50QWRtaW4uaWR9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZmV0Y2ggc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0YXRzOicsIGVycik7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBzdGF0aXN0aWNzJyk7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgICAgIGZldGNoU3RhdHMoKTtcbiAgICAgICAgfVxuICAgIH0sIFtpc0FkbWluLCBjdXJyZW50QWRtaW5dKTtcbiAgICBpZiAoIWN1cnJlbnRBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJOb3QgYXV0aGVudGljYXRlZFwiKSkpO1xuICAgIH1cbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIGRhc2hib2FyZC4uLlwiKSkpO1xuICAgIH1cbiAgICBpZiAoZXJyb3IgfHwgIXN0YXRzKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImVycm9yXCIgfSwgZXJyb3IgfHwgJ0ZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCcpKSk7XG4gICAgfVxuICAgIGNvbnN0IGdldFN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAnZGVsaXZlcmVkJzogcmV0dXJuICdzdWNjZXNzJztcbiAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGxlZCc6IHJldHVybiAnZGFuZ2VyJztcbiAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NpbmcnOiByZXR1cm4gJ2luZm8nO1xuICAgICAgICAgICAgY2FzZSAnc2hpcHBlZCc6IHJldHVybiAncHJpbWFyeSc7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJBZG1pbiBEYXNoYm9hcmRcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJyb3dcIiwgbWFyZ2luQm90dG9tOiBcInh4bFwiLCBmbGV4V3JhcDogXCJ3cmFwXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFVzZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxVc2VycykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyNTBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFJldmVudWVcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoc3RhdHMudG90YWxSZXZlbnVlKS50b0ZpeGVkKDIpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInh4bFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLnJlY2VudE9yZGVycz8ubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk5vIHJlY2VudCBvcmRlcnNcIikpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJPcmRlciBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJVc2VyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJBbW91bnRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMucmVjZW50T3JkZXJzPy5tYXAoKG9yZGVyKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgeyBrZXk6IG9yZGVyLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgb3JkZXIuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIG9yZGVyLnVzZXJJZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IGdldFN0YXR1c0NvbG9yKG9yZGVyLnN0YXR1cykgfSwgb3JkZXIuc3RhdHVzLnRvVXBwZXJDYXNlKCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgbmV3IERhdGUob3JkZXIuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKSkpKSkpKSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJMb3cgU3RvY2sgUHJvZHVjdHMgKFN0b2NrIDwgMTApXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiB9LCAhc3RhdHMubG93U3RvY2tQcm9kdWN0cyB8fCBzdGF0cy5sb3dTdG9ja1Byb2R1Y3RzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJBbGwgcHJvZHVjdHMgYXJlIHdlbGwgc3RvY2tlZFwiKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByb2R1Y3QgSURcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiTmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJTdG9ja1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJQcmljZVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMubG93U3RvY2tQcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogcHJvZHVjdC5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcImVycm9yXCIgfSwgcHJvZHVjdC5zdG9jaykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSkpKSkpKSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgIFwiV2VsY29tZSwgXCIsXG4gICAgICAgICAgICBjdXJyZW50QWRtaW4ubmFtZSxcbiAgICAgICAgICAgIFwiIVwiKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiWW91ciBJbmZvcm1hdGlvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJtZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBcIk5hbWU6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk4MFwiIH0sIGN1cnJlbnRBZG1pbi5uYW1lKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiRW1haWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk4MFwiIH0sIGN1cnJlbnRBZG1pbi5lbWFpbCkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJBY2NvdW50IFR5cGU6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBcInByaW1hcnlcIiB9LCBjdXJyZW50QWRtaW4ucm9sZSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIllvdXIgT3JkZXIgU3RhdGlzdGljc1wiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLCBmbGV4V3JhcDogXCJ3cmFwXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiVG90YWwgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiUGVuZGluZyBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcIndhcm5pbmdcIiB9LCBzdGF0cy5wZW5kaW5nT3JkZXJzKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIkNvbXBsZXRlZCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LCBzdGF0cy5jb21wbGV0ZWRPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiVG90YWwgU3BlbnRcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoc3RhdHMudG90YWxTcGVudCkudG9GaXhlZCgyKSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnMgKExhc3QgNSlcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc3RhdHMucmVjZW50T3JkZXJzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInhsXCIsIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiwgZm9udFNpemU6IFwibGdcIiB9LCBcIllvdSBoYXZlbid0IHBsYWNlZCBhbnkgb3JkZXJzIHlldFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIsIGZvbnRTaXplOiBcInNtXCIsIG1hcmdpblRvcDogXCJzbVwiIH0sIFwiU3RhcnQgc2hvcHBpbmcgdG8gc2VlIHlvdXIgb3JkZXJzIGhlcmUhXCIpKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlSGVhZCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIk9yZGVyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiU3RhdHVzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiQW1vdW50XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVCb2R5LCBudWxsLCBzdGF0cy5yZWNlbnRPcmRlcnMubWFwKChvcmRlcikgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIHsga2V5OiBvcmRlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLmlkKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBnZXRTdGF0dXNDb2xvcihvcmRlci5zdGF0dXMpIH0sIG9yZGVyLnN0YXR1cy50b1VwcGVyQ2FzZSgpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKG9yZGVyLnRvdGFsQW1vdW50KS50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpKSkpKSkpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcImluZm9cIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6ICcjZTZmN2ZmJywgYm9yZGVyQ29sb3I6ICcjOTFkNWZmJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdUQ4M0RcXHVEQ0ExIFF1aWNrIFRpcHNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBVc2UgdGhlIFJFU1QgQVBJIGF0IFwiLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9hcGkvcHJvZHVjdHNcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiIHRvIGJyb3dzZSBwcm9kdWN0c1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIE1hbmFnZSB5b3VyIGNhcnQgYXQgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL2FwaS9jYXJ0XCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIFBsYWNlIG9yZGVycyBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL2NoZWNrb3V0XCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIFZpZXcgb3JkZXIgaGlzdG9yeSBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL3VzZXIvb3JkZXJzXCIpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUm9sZURhc2hib2FyZDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIElucHV0LCBCdXR0b24sIEZvcm1Hcm91cCwgTGFiZWwsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFNldHRpbmdzUGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBbc2V0dGluZ3MsIHNldFNldHRpbmdzXSA9IHVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgc2V0dGluZ3NDb25maWcgPSBbXG4gICAgICAgIHsga2V5OiAnc2l0ZV9uYW1lJywgbGFiZWw6ICdTaXRlIE5hbWUnLCBkZXNjcmlwdGlvbjogJ1RoZSBuYW1lIG9mIHlvdXIgZUNvbW1lcmNlIHN0b3JlJyB9LFxuICAgICAgICB7IGtleTogJ2N1cnJlbmN5JywgbGFiZWw6ICdDdXJyZW5jeScsIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBjdXJyZW5jeSAoZS5nLiwgVVNELCBFVVIsIEdCUCknIH0sXG4gICAgICAgIHsga2V5OiAndGF4X3JhdGUnLCBsYWJlbDogJ1RheCBSYXRlICglKScsIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCB0YXggcmF0ZSBwZXJjZW50YWdlJyB9LFxuICAgICAgICB7IGtleTogJ3NoaXBwaW5nX2Nvc3QnLCBsYWJlbDogJ1NoaXBwaW5nIENvc3QnLCBkZXNjcmlwdGlvbjogJ0RlZmF1bHQgc2hpcHBpbmcgY29zdCcgfSxcbiAgICAgICAgeyBrZXk6ICdjb250YWN0X2VtYWlsJywgbGFiZWw6ICdDb250YWN0IEVtYWlsJywgZGVzY3JpcHRpb246ICdDdXN0b21lciBzdXBwb3J0IGVtYWlsIGFkZHJlc3MnIH0sXG4gICAgICAgIHsga2V5OiAnbWluX29yZGVyX2Ftb3VudCcsIGxhYmVsOiAnTWluaW11bSBPcmRlciBBbW91bnQnLCBkZXNjcmlwdGlvbjogJ01pbmltdW0gb3JkZXIgYW1vdW50IGZvciBjaGVja291dCcgfSxcbiAgICBdO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZldGNoU2V0dGluZ3MoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvc2V0dGluZ3MnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc2V0dGluZ3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzTWFwID0ge307XG4gICAgICAgICAgICByZXN1bHQuZGF0YS5mb3JFYWNoKChzZXR0aW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3NNYXBbc2V0dGluZy5rZXldID0gc2V0dGluZy52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U2V0dGluZ3Moc2V0dGluZ3NNYXApO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc2V0dGluZ3M6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBzZXR0aW5ncycpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgc2V0U2V0dGluZ3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgW2tleV06IHZhbHVlLFxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTYXZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRTYXZpbmcodHJ1ZSk7XG4gICAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgICBzZXRTdWNjZXNzKG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9zZXR0aW5ncycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzZXR0aW5ncyB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHNhdmUgc2V0dGluZ3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFN1Y2Nlc3MoJ1NldHRpbmdzIHNhdmVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHNldHRpbmdzOicsIGVycik7XG4gICAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHNhdmUgc2V0dGluZ3MnKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChsb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgc2V0dGluZ3MuLi5cIikpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJTZXR0aW5nc1wiKSxcbiAgICAgICAgZXJyb3IgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZUJveCwgeyBtZXNzYWdlOiBlcnJvciwgdmFyaWFudDogXCJkYW5nZXJcIiwgb25DbG9zZTogKCkgPT4gc2V0RXJyb3IobnVsbCkgfSkpLFxuICAgICAgICBzdWNjZXNzICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogc3VjY2VzcywgdmFyaWFudDogXCJzdWNjZXNzXCIsIG9uQ2xvc2U6ICgpID0+IHNldFN1Y2Nlc3MobnVsbCkgfSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzgwMHB4JyB9IH0sXG4gICAgICAgICAgICBzZXR0aW5nc0NvbmZpZy5tYXAoKGNvbmZpZykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IGtleTogY29uZmlnLmtleSwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IGNvbmZpZy5rZXkgfSwgY29uZmlnLmxhYmVsKSxcbiAgICAgICAgICAgICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSwgY29uZmlnLmRlc2NyaXB0aW9uKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBpZDogY29uZmlnLmtleSwgdmFsdWU6IHNldHRpbmdzW2NvbmZpZy5rZXldIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUlucHV0Q2hhbmdlKGNvbmZpZy5rZXksIGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IGBFbnRlciAke2NvbmZpZy5sYWJlbC50b0xvd2VyQ2FzZSgpfWAgfSkpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieHhsXCIsIGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6IGhhbmRsZVNhdmUsIGRpc2FibGVkOiBzYXZpbmcgfSwgc2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBTZXR0aW5ncycpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkN1cnJlbnQgU2V0dGluZ3MgU3VtbWFyeVwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcImdyZXkyMFwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc2V0dGluZ3NDb25maWcubWFwKChjb25maWcpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBrZXk6IGNvbmZpZy5rZXksIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgXCI6XCIpLFxuICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTgwXCIgfSwgc2V0dGluZ3NbY29uZmlnLmtleV0gfHwgJ05vdCBzZXQnKSkpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NQYWdlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBJbnB1dCwgQnV0dG9uLCBGb3JtR3JvdXAsIExhYmVsLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBVc2VyU2V0dGluZ3MgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW2N1cnJlbnRQYXNzd29yZCwgc2V0Q3VycmVudFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBbbmV3UGFzc3dvcmQsIHNldE5ld1Bhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBbY29uZmlybVBhc3N3b3JkLCBzZXRDb25maXJtUGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudEFkbWluKSB7XG4gICAgICAgICAgICBzZXROYW1lKGN1cnJlbnRBZG1pbi5uYW1lIHx8ICcnKTtcbiAgICAgICAgICAgIHNldEVtYWlsKGN1cnJlbnRBZG1pbi5lbWFpbCB8fCAnJyk7XG4gICAgICAgIH1cbiAgICB9LCBbY3VycmVudEFkbWluXSk7XG4gICAgY29uc3QgaGFuZGxlU2F2ZVByb2ZpbGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICAgIHNldFN1Y2Nlc3MobnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVEYXRhID0geyBuYW1lLCBlbWFpbCB9O1xuICAgICAgICAgICAgaWYgKG5ld1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Bhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ05ldyBwYXNzd29yZHMgZG8gbm90IG1hdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50UGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0N1cnJlbnQgcGFzc3dvcmQgaXMgcmVxdWlyZWQgdG8gc2V0IGEgbmV3IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jdXJyZW50UGFzc3dvcmQgPSBjdXJyZW50UGFzc3dvcmQ7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5uZXdQYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS91c2VyL3Byb2ZpbGUnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZURhdGEpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRTdWNjZXNzKCdQcm9maWxlIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICAgICAgc2V0Q3VycmVudFBhc3N3b3JkKCcnKTtcbiAgICAgICAgICAgIHNldE5ld1Bhc3N3b3JkKCcnKTtcbiAgICAgICAgICAgIHNldENvbmZpcm1QYXNzd29yZCgnJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN1Y2Nlc3MobnVsbCksIDMwMDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHByb2ZpbGU6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWN1cnJlbnRBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJOb3QgYXV0aGVudGljYXRlZFwiKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIkFjY291bnQgU2V0dGluZ3NcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4eGxcIiwgbWFyZ2luQm90dG9tOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiUHJvZmlsZSBJbmZvcm1hdGlvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgeyBodG1sRm9yOiBcIm5hbWVcIiB9LCBcIkZ1bGwgTmFtZVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcIm5hbWVcIiwgdmFsdWU6IG5hbWUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgZnVsbCBuYW1lXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiZW1haWxcIiB9LCBcIkVtYWlsIEFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBpZDogXCJlbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIsIHZhbHVlOiBlbWFpbCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgZW1haWxcIiB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBoYW5kbGVTYXZlUHJvZmlsZSwgZGlzYWJsZWQ6IHNhdmluZyB9LCBzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIFByb2ZpbGUnKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiQ2hhbmdlIFBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkxlYXZlIGJsYW5rIGlmIHlvdSBkb24ndCB3YW50IHRvIGNoYW5nZSB5b3VyIHBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiY3VycmVudFBhc3N3b3JkXCIgfSwgXCJDdXJyZW50IFBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgaWQ6IFwiY3VycmVudFBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IGN1cnJlbnRQYXNzd29yZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRDdXJyZW50UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpLCBwbGFjZWhvbGRlcjogXCJFbnRlciBjdXJyZW50IHBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwibmV3UGFzc3dvcmRcIiB9LCBcIk5ldyBQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcIm5ld1Bhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IG5ld1Bhc3N3b3JkLCBvbkNoYW5nZTogKGUpID0+IHNldE5ld1Bhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IFwiRW50ZXIgbmV3IHBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIE5ldyBQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcImNvbmZpcm1QYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIsIHZhbHVlOiBjb25maXJtUGFzc3dvcmQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q29uZmlybVBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBuZXcgcGFzc3dvcmRcIiB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBoYW5kbGVTYXZlUHJvZmlsZSwgZGlzYWJsZWQ6IHNhdmluZyB9LCBzYXZpbmcgPyAnVXBkYXRpbmcuLi4nIDogJ1VwZGF0ZSBQYXNzd29yZCcpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwiaW5mb1wiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIsIHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJyNlNmY3ZmYnLCBib3JkZXJDb2xvcjogJyM5MWQ1ZmYnLCBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdTIxMzlcXHVGRTBGIE5vdGVcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiVG8gdXNlIHRoZSBmdWxsIHNob3BwaW5nIGZlYXR1cmVzLCB5b3UgbmVlZCB0byBhdXRoZW50aWNhdGUgdmlhIHRoZSBSRVNUIEFQSSB1c2luZyBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL2F1dGgvbG9naW5cIiksXG4gICAgICAgICAgICAgICAgICAgIFwiIGVuZHBvaW50IGFuZCBzYXZlIHRoZSBKV1QgdG9rZW4uXCIpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyU2V0dGluZ3M7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgQmFkZ2UsIElucHV0LCBMYWJlbCwgRm9ybUdyb3VwLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBVc2VyUHJvZHVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbcHJvZHVjdHMsIHNldFByb2R1Y3RzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbY2F0ZWdvcmllcywgc2V0Q2F0ZWdvcmllc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3NlbGVjdGVkQ2F0ZWdvcnksIHNldFNlbGVjdGVkQ2F0ZWdvcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hDYXRlZ29yaWVzKCk7XG4gICAgICAgIGZldGNoUHJvZHVjdHMoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXRlZ29yaWVzJywge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHNldENhdGVnb3JpZXMocmVzdWx0LmRhdGEgfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhdGVnb3JpZXM6JywgZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZmV0Y2hQcm9kdWN0cyA9IGFzeW5jIChjYXRlZ29yeUlkLCBzZWFyY2gpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSAnL2FwaS9wcm9kdWN0cz8nO1xuICAgICAgICAgICAgaWYgKGNhdGVnb3J5SWQpXG4gICAgICAgICAgICAgICAgdXJsICs9IGBjYXRlZ29yeUlkPSR7Y2F0ZWdvcnlJZH0mYDtcbiAgICAgICAgICAgIGlmIChzZWFyY2gpXG4gICAgICAgICAgICAgICAgdXJsICs9IGBzZWFyY2g9JHtlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoKX0mYDtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBzZXRQcm9kdWN0cyhyZXN1bHQuZGF0YSB8fCBbXSk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwcm9kdWN0czonLCBlcnIpO1xuICAgICAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHByb2R1Y3RzJyk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UgPSAoY2F0ZWdvcnlJZCkgPT4ge1xuICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5KGNhdGVnb3J5SWQpO1xuICAgICAgICBmZXRjaFByb2R1Y3RzKGNhdGVnb3J5SWQsIHNlYXJjaFF1ZXJ5KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNlYXJjaCA9ICgpID0+IHtcbiAgICAgICAgZmV0Y2hQcm9kdWN0cyhzZWxlY3RlZENhdGVnb3J5LCBzZWFyY2hRdWVyeSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVBZGRUb0NhcnQgPSBhc3luYyAocHJvZHVjdElkLCBwcm9kdWN0TmFtZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0L2FkZCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcHJvZHVjdElkLCBxdWFudGl0eTogMSB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBhZGQgdG8gY2FydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0U3VjY2VzcyhgJHtwcm9kdWN0TmFtZX0gYWRkZWQgdG8gY2FydCFgKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gYWRkIHRvIGNhcnQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTm90IGF1dGhlbnRpY2F0ZWRcIikpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJCcm93c2UgUHJvZHVjdHNcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwicm93XCIsIGZsZXhXcmFwOiBcIndyYXBcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyMDBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIFwiQ2F0ZWdvcnlcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyB2YWx1ZTogc2VsZWN0ZWRDYXRlZ29yeSwgb25DaGFuZ2U6IChlKSA9PiBoYW5kbGVDYXRlZ29yeUNoYW5nZShlLnRhcmdldC52YWx1ZSksIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkOWQ5ZDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiIH0sIFwiQWxsIENhdGVnb3JpZXNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzLm1hcCgoY2F0KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IGtleTogY2F0LmlkLCB2YWx1ZTogY2F0LmlkIH0sIGNhdC5uYW1lKSkpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgZmxleDogXCIyXCIsIG1pbldpZHRoOiBcIjMwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJTZWFyY2hcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgdmFsdWU6IHNlYXJjaFF1ZXJ5LCBvbkNoYW5nZTogKGUpID0+IHNldFNlYXJjaFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKSwgb25LZXlQcmVzczogKGUpID0+IGUua2V5ID09PSAnRW50ZXInICYmIGhhbmRsZVNlYXJjaCgpLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggcHJvZHVjdHMuLi5cIiB9KSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiZmxleC1lbmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVTZWFyY2ggfSwgXCJTZWFyY2hcIikpKSksXG4gICAgICAgIGxvYWRpbmcgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgcHJvZHVjdHMuLi5cIikpIDogcHJvZHVjdHMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIsIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiLCBmb250U2l6ZTogXCJsZ1wiIH0sIFwiTm8gcHJvZHVjdHMgZm91bmRcIikpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImdyaWRcIiwgc3R5bGU6IHsgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyODBweCwgMWZyKSknLCBnYXA6ICcyMHB4JyB9IH0sIHByb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGtleTogcHJvZHVjdC5pZCwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMGYwZjAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBwcm9kdWN0LmltYWdlVXJsID8gYHVybCgke3Byb2R1Y3QuaW1hZ2VVcmx9KWAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH0gfSwgIXByb2R1Y3QuaW1hZ2VVcmwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk5vIEltYWdlXCIpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIHByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBwcm9kdWN0LmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0LmNhdGVnb3J5ICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IFwiaW5mb1wiLCBzaXplOiBcInNtXCIsIHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogJzhweCcgfSB9LCBwcm9kdWN0LmNhdGVnb3J5Lm5hbWUpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIocHJvZHVjdC5wcmljZSkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBwcm9kdWN0LnN0b2NrID4gMCA/ICdzdWNjZXNzJyA6ICdlcnJvcicgfSwgcHJvZHVjdC5zdG9jayA+IDAgPyBgJHtwcm9kdWN0LnN0b2NrfSBpbiBzdG9ja2AgOiAnT3V0IG9mIHN0b2NrJykpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUFkZFRvQ2FydChwcm9kdWN0LmlkLCBwcm9kdWN0Lm5hbWUpLCBkaXNhYmxlZDogcHJvZHVjdC5zdG9jayA9PT0gMCwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9IH0sIHByb2R1Y3Quc3RvY2sgPT09IDAgPyAnT3V0IG9mIFN0b2NrJyA6ICdBZGQgdG8gQ2FydCcpKSkpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZHVjdHM7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgVGFibGUsIFRhYmxlSGVhZCwgVGFibGVCb2R5LCBUYWJsZVJvdywgVGFibGVDZWxsLCBJbnB1dCwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgVXNlckNhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbY2FydEl0ZW1zLCBzZXRDYXJ0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmZXRjaENhcnQoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hDYXJ0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIGNhcnQgd2l0aCBjcmVkZW50aWFscy4uLicpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0Jywge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYXJ0IHJlc3BvbnNlIHN0YXR1czonLCByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoeyBtZXNzYWdlOiAnRmFpbGVkIHRvIGZldGNoIGNhcnQnIH0pKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDYXJ0IGZldGNoIGVycm9yOicsIGVycm9yRGF0YSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8IGBGYWlsZWQgdG8gZmV0Y2ggY2FydCAoJHtyZXNwb25zZS5zdGF0dXN9KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhcnQgZGF0YSByZWNlaXZlZDonLCByZXN1bHQpO1xuICAgICAgICAgICAgc2V0Q2FydEl0ZW1zKHJlc3VsdC5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgIHNldFRvdGFsKHBhcnNlRmxvYXQocmVzdWx0LnRvdGFsKSB8fCAwKTtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhcnQ6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGxvYWQgY2FydCcpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVwZGF0ZVF1YW50aXR5ID0gYXN5bmMgKGNhcnRJdGVtSWQsIG5ld1F1YW50aXR5KSA9PiB7XG4gICAgICAgIGlmIChuZXdRdWFudGl0eSA8IDEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2NhcnQvJHtjYXJ0SXRlbUlkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBxdWFudGl0eTogbmV3UXVhbnRpdHkgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBkYXRlIHF1YW50aXR5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmZXRjaENhcnQoKTtcbiAgICAgICAgICAgIHNldFN1Y2Nlc3MoJ1F1YW50aXR5IHVwZGF0ZWQnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gdXBkYXRlIHF1YW50aXR5Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlbW92ZUl0ZW0gPSBhc3luYyAoY2FydEl0ZW1JZCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9jYXJ0LyR7Y2FydEl0ZW1JZH1gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmVtb3ZlIGl0ZW0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZldGNoQ2FydCgpO1xuICAgICAgICAgICAgc2V0U3VjY2VzcygnSXRlbSByZW1vdmVkIGZyb20gY2FydCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdWNjZXNzKG51bGwpLCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzZXRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byByZW1vdmUgaXRlbScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjbGVhckNhcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIHlvdXIgY2FydD8nKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvY2FydCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjbGVhciBjYXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmZXRjaENhcnQoKTtcbiAgICAgICAgICAgIHNldFN1Y2Nlc3MoJ0NhcnQgY2xlYXJlZCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdWNjZXNzKG51bGwpLCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzZXRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBjbGVhciBjYXJ0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmICghY3VycmVudEFkbWluKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIk5vdCBhdXRoZW50aWNhdGVkXCIpKSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgbnVsbCwgXCJTaG9wcGluZyBDYXJ0XCIpLFxuICAgICAgICAgICAgY2FydEl0ZW1zLmxlbmd0aCA+IDAgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwidGV4dFwiLCBvbkNsaWNrOiBjbGVhckNhcnQgfSwgXCJDbGVhciBDYXJ0XCIpKSksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgbG9hZGluZyA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTG9hZGluZyBjYXJ0Li4uXCIpKSA6IGNhcnRJdGVtcy5sZW5ndGggPT09IDAgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiwgc3R5bGU6IHsgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIsIGZvbnRTaXplOiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiWW91ciBjYXJ0IGlzIGVtcHR5XCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiU3RhcnQgYnJvd3NpbmcgcHJvZHVjdHMgdG8gYWRkIGl0ZW1zIHRvIHlvdXIgY2FydCFcIikpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJQcm9kdWN0XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByaWNlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlF1YW50aXR5XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlRvdGFsXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkFjdGlvbnNcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHksIG51bGwsIGNhcnRJdGVtcy5tYXAoKGl0ZW0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogaXRlbS5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMGYwZjAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGl0ZW0ucHJvZHVjdC5pbWFnZVVybCA/IGB1cmwoJHtpdGVtLnByb2R1Y3QuaW1hZ2VVcmx9KWAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBpdGVtLnByb2R1Y3QubmFtZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihpdGVtLnByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHVwZGF0ZVF1YW50aXR5KGl0ZW0uaWQsIGl0ZW0ucXVhbnRpdHkgLSAxKSwgZGlzYWJsZWQ6IGl0ZW0ucXVhbnRpdHkgPD0gMSB9LCBcIi1cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgdmFsdWU6IGl0ZW0ucXVhbnRpdHksIG9uQ2hhbmdlOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVF1YW50aXR5KGl0ZW0uaWQsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0eXBlOiBcIm51bWJlclwiLCBtaW46IFwiMVwiLCBtYXg6IGl0ZW0ucHJvZHVjdC5zdG9jaywgc3R5bGU6IHsgd2lkdGg6ICc2MHB4JywgbWFyZ2luOiAnMCA4cHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHVwZGF0ZVF1YW50aXR5KGl0ZW0uaWQsIGl0ZW0ucXVhbnRpdHkgKyAxKSwgZGlzYWJsZWQ6IGl0ZW0ucXVhbnRpdHkgPj0gaXRlbS5wcm9kdWN0LnN0b2NrIH0sIFwiK1wiKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoaXRlbS5pdGVtVG90YWwpLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHJlbW92ZUl0ZW0oaXRlbS5pZCkgfSwgXCJSZW1vdmVcIikpKSkpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzQwMHB4JywgbWFyZ2luTGVmdDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiQ2FydCBTdW1tYXJ5XCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIG1hcmdpbkJvdHRvbTogXCJtZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJTdWJ0b3RhbDpcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmdUb3A6IFwibGdcIiwgc3R5bGU6IHsgYm9yZGVyVG9wOiAnMnB4IHNvbGlkICNmMGYwZjAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcImxnXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiVG90YWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwibGdcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIHN0eWxlOiB7IHdpZHRoOiAnMTAwJScgfSwgb25DbGljazogKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnIy9hZG1pbi9wYWdlcy9jaGVja291dCcgfSwgXCJQcm9jZWVkIHRvIENoZWNrb3V0XCIpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgVXNlckNhcnQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgTWVzc2FnZUJveCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFVzZXJDaGVja291dCA9ICgpID0+IHtcbiAgICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xuICAgIGNvbnN0IFtjYXJ0SXRlbXMsIHNldENhcnRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbcGxhY2luZywgc2V0UGxhY2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW29yZGVySWQsIHNldE9yZGVySWRdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hDYXJ0KCk7XG4gICAgfSwgW10pO1xuICAgIGNvbnN0IGZldGNoQ2FydCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvY2FydCcsIHtcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggY2FydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgc2V0Q2FydEl0ZW1zKHJlc3VsdC5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgIHNldFRvdGFsKHBhcnNlRmxvYXQocmVzdWx0LnRvdGFsKSB8fCAwKTtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhcnQ6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGxvYWQgY2FydCcpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHBsYWNlT3JkZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldFBsYWNpbmcodHJ1ZSk7XG4gICAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jaGVja291dCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHBsYWNlIG9yZGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBzZXRPcmRlcklkKHJlc3VsdC5kYXRhLmlkKTtcbiAgICAgICAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG4gICAgICAgICAgICBzZXRQbGFjaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwbGFjaW5nIG9yZGVyOicsIGVycik7XG4gICAgICAgICAgICBzZXRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBwbGFjZSBvcmRlcicpO1xuICAgICAgICAgICAgc2V0UGxhY2luZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmICghY3VycmVudEFkbWluKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIk5vdCBhdXRoZW50aWNhdGVkXCIpKSk7XG4gICAgfVxuICAgIGlmIChzdWNjZXNzICYmIG9yZGVySWQpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXhXaWR0aDogJzYwMHB4JywgbWFyZ2luOiAnMCBhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBzdHlsZTogeyBmb250U2l6ZTogJzQ4cHgnIH0gfSwgXCJcXHUyNzEzXCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEgyLCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBjb2xvcjogXCJzdWNjZXNzXCIgfSwgXCJPcmRlciBQbGFjZWQgU3VjY2Vzc2Z1bGx5IVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJZb3VyIG9yZGVyIFwiLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVySWQpLFxuICAgICAgICAgICAgICAgICAgICBcIiBoYXMgYmVlbiBjb25maXJtZWQuXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieGxcIiwgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIldoYXQncyBOZXh0P1wiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdTIwMjIgWW91IHdpbGwgcmVjZWl2ZSBhbiBvcmRlciBjb25maXJtYXRpb24gZW1haWwgc2hvcnRseVwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdTIwMjIgVHJhY2sgeW91ciBvcmRlciBzdGF0dXMgaW4geW91ciBkYXNoYm9hcmRcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5ODBcIiB9LCBcIlxcdTIwMjIgV2UnbGwgbm90aWZ5IHlvdSB3aGVuIHlvdXIgb3JkZXIgc2hpcHNcIikpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIiwgc3R5bGU6IHsgZ2FwOiAnMTJweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjL2FkbWluJyB9LCBcIkdvIHRvIERhc2hib2FyZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvYWRtaW4vcGFnZXMvcHJvZHVjdHMnIH0sIFwiQ29udGludWUgU2hvcHBpbmdcIikpKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIkNoZWNrb3V0XCIpLFxuICAgICAgICBlcnJvciAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IGVycm9yLCB2YXJpYW50OiBcImRhbmdlclwiLCBvbkNsb3NlOiAoKSA9PiBzZXRFcnJvcihudWxsKSB9KSksXG4gICAgICAgIGxvYWRpbmcgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgY2hlY2tvdXQuLi5cIikpIDogY2FydEl0ZW1zLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiwgZm9udFNpemU6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJZb3VyIGNhcnQgaXMgZW1wdHlcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjL2FkbWluL3BhZ2VzL3Byb2R1Y3RzJyB9LCBcIkJyb3dzZSBQcm9kdWN0c1wiKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLCBmbGV4V3JhcDogXCJ3cmFwXCIsIHN0eWxlOiB7IGdhcDogJzI0cHgnIH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIzMDBweFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJPcmRlciBTdW1tYXJ5XCIpLFxuICAgICAgICAgICAgICAgICAgICBjYXJ0SXRlbXMubWFwKChpdGVtKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsga2V5OiBpdGVtLmlkLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZ0JvdHRvbTogXCJsZ1wiLCBzdHlsZTogeyBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2YwZjBmMCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgaXRlbS5wcm9kdWN0Lm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihpdGVtLnByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJRdWFudGl0eTogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucXVhbnRpdHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKGl0ZW0uaXRlbVRvdGFsKS50b0ZpeGVkKDIpKSkpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJsZ1wiLCBwYWRkaW5nVG9wOiBcImxnXCIsIHN0eWxlOiB7IGJvcmRlclRvcDogJzJweCBzb2xpZCAjZjBmMGYwJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJTdWJ0b3RhbDpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwudG9GaXhlZCgyKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiVGF4IChlc3RpbWF0ZWQpOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG90YWwgKiAwLjA4KS50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJTaGlwcGluZzpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIiQ5Ljk5XCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIG1hcmdpblRvcDogXCJsZ1wiLCBwYWRkaW5nVG9wOiBcImxnXCIsIHN0eWxlOiB7IGJvcmRlclRvcDogJzJweCBzb2xpZCAjZjBmMGYwJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcImxnXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiVG90YWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJsZ1wiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG90YWwgKyB0b3RhbCAqIDAuMDggKyA5Ljk5KS50b0ZpeGVkKDIpKSkpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMzAwcHhcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieGxcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkN1c3RvbWVyIEluZm9ybWF0aW9uXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiTmFtZTpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTgwXCIgfSwgY3VycmVudEFkbWluLm5hbWUpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBcIkVtYWlsOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5ODBcIiB9LCBjdXJyZW50QWRtaW4uZW1haWwpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJQYXltZW50IE1ldGhvZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwiZ3JleTIwXCIsIHBhZGRpbmc6IFwibGdcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiwgc3R5bGU6IHsgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sIFwiUGF5bWVudCBwcm9jZXNzaW5nIGlzIHNpbXVsYXRlZFwiKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBwbGFjZU9yZGVyLCBkaXNhYmxlZDogcGxhY2luZywgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9IH0sIHBsYWNpbmcgPyAnUGxhY2luZyBPcmRlci4uLicgOiAnUGxhY2UgT3JkZXInKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Ub3A6IFwibWRcIiwgc3R5bGU6IHsgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sIFwiQnkgcGxhY2luZyB0aGlzIG9yZGVyLCB5b3UgYWdyZWUgdG8gb3VyIHRlcm1zIGFuZCBjb25kaXRpb25zXCIpKSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJDaGVja291dDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEFkbWluRGFzaGJvYXJkIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9BZG1pbkRhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQWRtaW5EYXNoYm9hcmQgPSBBZG1pbkRhc2hib2FyZFxuaW1wb3J0IFVzZXJEYXNoYm9hcmQgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJEYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVzZXJEYXNoYm9hcmQgPSBVc2VyRGFzaGJvYXJkXG5pbXBvcnQgUm9sZURhc2hib2FyZCBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvUm9sZURhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuUm9sZURhc2hib2FyZCA9IFJvbGVEYXNoYm9hcmRcbmltcG9ydCBTZXR0aW5nc1BhZ2UgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1NldHRpbmdzUGFnZSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2V0dGluZ3NQYWdlID0gU2V0dGluZ3NQYWdlXG5pbXBvcnQgVXNlclNldHRpbmdzIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyU2V0dGluZ3MnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVzZXJTZXR0aW5ncyA9IFVzZXJTZXR0aW5nc1xuaW1wb3J0IFVzZXJQcm9kdWN0cyBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlclByb2R1Y3RzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Vc2VyUHJvZHVjdHMgPSBVc2VyUHJvZHVjdHNcbmltcG9ydCBVc2VyQ2FydCBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlckNhcnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVzZXJDYXJ0ID0gVXNlckNhcnRcbmltcG9ydCBVc2VyQ2hlY2tvdXQgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJDaGVja291dCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXNlckNoZWNrb3V0ID0gVXNlckNoZWNrb3V0Il0sIm5hbWVzIjpbIkFkbWluRGFzaGJvYXJkIiwic3RhdHMiLCJzZXRTdGF0cyIsInVzZVN0YXRlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwidXNlRWZmZWN0IiwiZmV0Y2hEYXNoYm9hcmRTdGF0cyIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiY3JlZGVudGlhbHMiLCJvayIsIkVycm9yIiwicmVzdWx0IiwianNvbiIsImRhdGEiLCJlcnIiLCJjb25zb2xlIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwicGFkZGluZyIsIlRleHQiLCJjb2xvciIsIkgyIiwibWFyZ2luQm90dG9tIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJmbGV4V3JhcCIsImZsZXgiLCJtaW5XaWR0aCIsIm1hcmdpblJpZ2h0IiwiYmciLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJzdHlsZSIsImJveFNoYWRvdyIsIkg1IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwidG90YWxVc2VycyIsInRvdGFsT3JkZXJzIiwiTnVtYmVyIiwidG90YWxSZXZlbnVlIiwidG9GaXhlZCIsInJlY2VudE9yZGVycyIsImxlbmd0aCIsIlRhYmxlIiwiVGFibGVIZWFkIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJUYWJsZUJvZHkiLCJtYXAiLCJvcmRlciIsImtleSIsImlkIiwidXNlcklkIiwic3RhdHVzIiwidG90YWxBbW91bnQiLCJEYXRlIiwiY3JlYXRlZEF0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwibG93U3RvY2tQcm9kdWN0cyIsInByb2R1Y3QiLCJuYW1lIiwic3RvY2siLCJwcmljZSIsIlVzZXJEYXNoYm9hcmQiLCJjdXJyZW50QWRtaW4iLCJ1c2VDdXJyZW50QWRtaW4iLCJmZXRjaFVzZXJTdGF0cyIsImdldFN0YXR1c0NvbG9yIiwiZW1haWwiLCJCYWRnZSIsInZhcmlhbnQiLCJyb2xlIiwicGVuZGluZ09yZGVycyIsImNvbXBsZXRlZE9yZGVycyIsInRvdGFsU3BlbnQiLCJ0ZXh0QWxpZ24iLCJtYXJnaW5Ub3AiLCJ0b1VwcGVyQ2FzZSIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwiUm9sZURhc2hib2FyZCIsImlzQWRtaW4iLCJmZXRjaFN0YXRzIiwiZW5kcG9pbnQiLCJlcnJvckRhdGEiLCJjYXRjaCIsIm1lc3NhZ2UiLCJTZXR0aW5nc1BhZ2UiLCJzZXR0aW5ncyIsInNldFNldHRpbmdzIiwic2F2aW5nIiwic2V0U2F2aW5nIiwic3VjY2VzcyIsInNldFN1Y2Nlc3MiLCJzZXR0aW5nc0NvbmZpZyIsImxhYmVsIiwiZGVzY3JpcHRpb24iLCJmZXRjaFNldHRpbmdzIiwic2V0dGluZ3NNYXAiLCJmb3JFYWNoIiwic2V0dGluZyIsInZhbHVlIiwiaGFuZGxlSW5wdXRDaGFuZ2UiLCJwcmV2IiwiaGFuZGxlU2F2ZSIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwic2V0VGltZW91dCIsIk1lc3NhZ2VCb3giLCJvbkNsb3NlIiwibWF4V2lkdGgiLCJjb25maWciLCJGb3JtR3JvdXAiLCJMYWJlbCIsImh0bWxGb3IiLCJJbnB1dCIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwidG9Mb3dlckNhc2UiLCJqdXN0aWZ5Q29udGVudCIsIkJ1dHRvbiIsIm9uQ2xpY2siLCJkaXNhYmxlZCIsIlVzZXJTZXR0aW5ncyIsInNldE5hbWUiLCJzZXRFbWFpbCIsImN1cnJlbnRQYXNzd29yZCIsInNldEN1cnJlbnRQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwic2V0TmV3UGFzc3dvcmQiLCJjb25maXJtUGFzc3dvcmQiLCJzZXRDb25maXJtUGFzc3dvcmQiLCJoYW5kbGVTYXZlUHJvZmlsZSIsInVwZGF0ZURhdGEiLCJ0eXBlIiwiVXNlclByb2R1Y3RzIiwicHJvZHVjdHMiLCJzZXRQcm9kdWN0cyIsImNhdGVnb3JpZXMiLCJzZXRDYXRlZ29yaWVzIiwic2VsZWN0ZWRDYXRlZ29yeSIsInNldFNlbGVjdGVkQ2F0ZWdvcnkiLCJzZWFyY2hRdWVyeSIsInNldFNlYXJjaFF1ZXJ5IiwiZmV0Y2hDYXRlZ29yaWVzIiwiZmV0Y2hQcm9kdWN0cyIsImNhdGVnb3J5SWQiLCJzZWFyY2giLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJoYW5kbGVDYXRlZ29yeUNoYW5nZSIsImhhbmRsZVNlYXJjaCIsImhhbmRsZUFkZFRvQ2FydCIsInByb2R1Y3RJZCIsInByb2R1Y3ROYW1lIiwicXVhbnRpdHkiLCJ3aWR0aCIsImNhdCIsIm9uS2V5UHJlc3MiLCJhbGlnbkl0ZW1zIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImdhcCIsImhlaWdodCIsImJhY2tncm91bmRJbWFnZSIsImltYWdlVXJsIiwiYmFja2dyb3VuZFNpemUiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJjYXRlZ29yeSIsInNpemUiLCJVc2VyQ2FydCIsImNhcnRJdGVtcyIsInNldENhcnRJdGVtcyIsInRvdGFsIiwic2V0VG90YWwiLCJmZXRjaENhcnQiLCJsb2ciLCJwYXJzZUZsb2F0IiwidXBkYXRlUXVhbnRpdHkiLCJjYXJ0SXRlbUlkIiwibmV3UXVhbnRpdHkiLCJyZW1vdmVJdGVtIiwiY2xlYXJDYXJ0IiwiY29uZmlybSIsIkZyYWdtZW50IiwiaXRlbSIsInZhbCIsInBhcnNlSW50IiwibWluIiwibWF4IiwibWFyZ2luIiwiaXRlbVRvdGFsIiwibWFyZ2luTGVmdCIsInBhZGRpbmdUb3AiLCJib3JkZXJUb3AiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJVc2VyQ2hlY2tvdXQiLCJwbGFjaW5nIiwic2V0UGxhY2luZyIsIm9yZGVySWQiLCJzZXRPcmRlcklkIiwicGxhY2VPcmRlciIsInBhZGRpbmdCb3R0b20iLCJib3JkZXJCb3R0b20iLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFFQSxNQUFNQSxjQUFjLEdBQUdBLE1BQU07TUFDekIsTUFBTSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHQyxjQUFRLENBQUMsSUFBSSxDQUFDO01BQ3hDLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFQyxVQUFVLENBQUMsR0FBR0YsY0FBUSxDQUFDLElBQUksQ0FBQztNQUM1QyxNQUFNLENBQUNHLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdKLGNBQVEsQ0FBQyxJQUFJLENBQUM7SUFDeENLLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0lBQ1osSUFBQSxNQUFNQyxtQkFBbUIsR0FBRyxZQUFZO1VBQ3BDLElBQUk7SUFDQSxRQUFBLE1BQU1DLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUMsc0JBQXNCLEVBQUU7SUFDakRDLFVBQUFBLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLFVBQUFBLE9BQU8sRUFBRTtJQUNMLFlBQUEsY0FBYyxFQUFFO2VBQ25CO0lBQ0RDLFVBQUFBLFdBQVcsRUFBRTtJQUNqQixTQUFDLENBQUM7SUFDRixRQUFBLElBQUksQ0FBQ0osUUFBUSxDQUFDSyxFQUFFLEVBQUU7SUFDZCxVQUFBLE1BQU0sSUFBSUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDO0lBQ3RELFFBQUE7SUFDQSxRQUFBLE1BQU1DLE1BQU0sR0FBRyxNQUFNUCxRQUFRLENBQUNRLElBQUksRUFBRTtJQUNwQ2hCLFFBQUFBLFFBQVEsQ0FBQ2UsTUFBTSxDQUFDRSxJQUFJLENB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
