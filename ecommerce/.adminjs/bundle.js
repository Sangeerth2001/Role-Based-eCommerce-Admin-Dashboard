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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvQWRtaW5EYXNoYm9hcmQuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlckRhc2hib2FyZC5qcyIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Sb2xlRGFzaGJvYXJkLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1NldHRpbmdzUGFnZS5qcyIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyU2V0dGluZ3MuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlclByb2R1Y3RzLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJDYXJ0LmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJDaGVja291dC5qcyIsImVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ2VsbCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgQWRtaW5EYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgW3N0YXRzLCBzZXRTdGF0c10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZldGNoRGFzaGJvYXJkU3RhdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvZGFzaGJvYXJkL3N0YXRzJywge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZGFzaGJvYXJkIHN0YXRzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICBzZXRTdGF0cyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgZGFzaGJvYXJkIHN0YXRzOicsIGVycik7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCBzdGF0aXN0aWNzJyk7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZldGNoRGFzaGJvYXJkU3RhdHMoKTtcbiAgICB9LCBbXSk7XG4gICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTG9hZGluZyBkYXNoYm9hcmQuLi5cIikpKTtcbiAgICB9XG4gICAgaWYgKGVycm9yIHx8ICFzdGF0cykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJlcnJvclwiIH0sIGVycm9yIHx8ICdGYWlsZWQgdG8gbG9hZCBkYXNoYm9hcmQnKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIkFkbWluIERhc2hib2FyZFwiKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwicm93XCIsIG1hcmdpbkJvdHRvbTogXCJ4eGxcIiwgZmxleFdyYXA6IFwid3JhcFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgVXNlcnNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sIHN0YXRzLnRvdGFsVXNlcnMpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyNTBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJUb3RhbCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sIHN0YXRzLnRvdGFsT3JkZXJzKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgUmV2ZW51ZVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJzdWNjZXNzXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgIE51bWJlcihzdGF0cy50b3RhbFJldmVudWUpLnRvRml4ZWQoMikpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnNcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc3RhdHMucmVjZW50T3JkZXJzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJObyByZWNlbnQgb3JkZXJzXCIpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiT3JkZXIgSURcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJVc2VyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiU3RhdHVzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiQW1vdW50XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVCb2R5LCBudWxsLCBzdGF0cy5yZWNlbnRPcmRlcnMubWFwKChvcmRlcikgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIHsga2V5OiBvcmRlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgb3JkZXIuaWQpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgb3JkZXIudXNlcklkKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBvcmRlci5zdGF0dXMgPT09ICdkZWxpdmVyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3N1Y2Nlc3MnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3JkZXIuc3RhdHVzID09PSAnY2FuY2VsbGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnZXJyb3InXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdwcmltYXJ5MTAwJyB9LCBvcmRlci5zdGF0dXMpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpKSkpKSkpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJMb3cgU3RvY2sgUHJvZHVjdHMgKFN0b2NrIDwgMTApXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLmxvd1N0b2NrUHJvZHVjdHMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIkFsbCBwcm9kdWN0cyBhcmUgd2VsbCBzdG9ja2VkXCIpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlLCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiUHJvZHVjdCBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIk5hbWVcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJTdG9ja1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByaWNlXCIpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHksIG51bGwsIHN0YXRzLmxvd1N0b2NrUHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgeyBrZXk6IHByb2R1Y3QuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QuaWQpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgcHJvZHVjdC5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcImVycm9yXCIgfSwgcHJvZHVjdC5zdG9jaykpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSkpKSkpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBBZG1pbkRhc2hib2FyZDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ2VsbCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuY29uc3QgVXNlckRhc2hib2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xuICAgIGNvbnN0IFtzdGF0cywgc2V0U3RhdHNdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaFVzZXJTdGF0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9kYXNoYm9hcmQvdXNlci1zdGF0cycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHVzZXIgc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHVzZXIgc3RhdHM6JywgZXJyKTtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmZXRjaFVzZXJTdGF0cygpO1xuICAgIH0sIFtdKTtcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIHlvdXIgZGFzaGJvYXJkLi4uXCIpKSk7XG4gICAgfVxuICAgIGlmIChlcnJvciB8fCAhc3RhdHMpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZXJyb3JcIiB9LCBlcnJvciB8fCAnRmFpbGVkIHRvIGxvYWQgZGFzaGJvYXJkJykpKTtcbiAgICB9XG4gICAgY29uc3QgZ2V0U3RhdHVzQ29sb3IgPSAoc3RhdHVzKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlICdkZWxpdmVyZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnc3VjY2Vzcyc7XG4gICAgICAgICAgICBjYXNlICdjYW5jZWxsZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnZGFuZ2VyJztcbiAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NpbmcnOlxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5mbyc7XG4gICAgICAgICAgICBjYXNlICdzaGlwcGVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ByaW1hcnknO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgXCJXZWxjb21lLCBcIixcbiAgICAgICAgICAgIGN1cnJlbnRBZG1pbj8ubmFtZSB8fCAnVXNlcicsXG4gICAgICAgICAgICBcIiFcIiksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIllvdXIgSW5mb3JtYXRpb25cIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJOYW1lOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTgwXCIgfSwgY3VycmVudEFkbWluPy5uYW1lKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiRW1haWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5ODBcIiB9LCBjdXJyZW50QWRtaW4/LmVtYWlsKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBcIkFjY291bnQgVHlwZTpcIiksXG4gICAgICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBcInByaW1hcnlcIiB9LCBjdXJyZW50QWRtaW4/LnJvbGUpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJZb3VyIE9yZGVyIFN0YXRpc3RpY3NcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJyb3dcIiwgZmxleFdyYXA6IFwid3JhcFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlRvdGFsIE9yZGVyc1wiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sIHN0YXRzLnRvdGFsT3JkZXJzKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlBlbmRpbmcgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJ3YXJuaW5nXCIgfSwgc3RhdHMucGVuZGluZ09yZGVycykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyMDBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSwgXCJDb21wbGV0ZWQgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJzdWNjZXNzXCIgfSwgc3RhdHMuY29tcGxldGVkT3JkZXJzKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlRvdGFsIFNwZW50XCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHN0YXRzLnRvdGFsU3BlbnQpLnRvRml4ZWQoMikpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJSZWNlbnQgT3JkZXJzIChMYXN0IDUpXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLnJlY2VudE9yZGVycy5sZW5ndGggPT09IDAgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4bFwiLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIsIGZvbnRTaXplOiBcImxnXCIgfSwgXCJZb3UgaGF2ZW4ndCBwbGFjZWQgYW55IG9yZGVycyB5ZXRcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiLCBmb250U2l6ZTogXCJzbVwiLCBtYXJnaW5Ub3A6IFwic21cIiB9LCBcIlN0YXJ0IHNob3BwaW5nIHRvIHNlZSB5b3VyIG9yZGVycyBoZXJlIVwiKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJPcmRlciBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkFtb3VudFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkRhdGVcIikpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMucmVjZW50T3JkZXJzLm1hcCgob3JkZXIpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogb3JkZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmRlci5pZCkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmFkZ2UsIHsgdmFyaWFudDogZ2V0U3RhdHVzQ29sb3Iob3JkZXIuc3RhdHVzKSB9LCBvcmRlci5zdGF0dXMudG9VcHBlckNhc2UoKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgbmV3IERhdGUob3JkZXIuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKSkpKSkpKSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luVG9wOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJpbmZvXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiwgc3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiAnI2U2ZjdmZicsIGJvcmRlckNvbG9yOiAnIzkxZDVmZicgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSwgXCJcXHVEODNEXFx1RENBMSBRdWljayBUaXBzXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5ODBcIiB9LFxuICAgICAgICAgICAgICAgICAgICBcIlxcdTIwMjIgVXNlIHRoZSBSRVNUIEFQSSBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL3Byb2R1Y3RzXCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiB0byBicm93c2UgcHJvZHVjdHNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBNYW5hZ2UgeW91ciBjYXJ0IGF0IFwiLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9hcGkvY2FydFwiKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBQbGFjZSBvcmRlcnMgYXQgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL2FwaS9jaGVja291dFwiKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBWaWV3IG9yZGVyIGhpc3RvcnkgYXQgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL2FwaS91c2VyL29yZGVyc1wiKSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJEYXNoYm9hcmQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ2VsbCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFJvbGVEYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgaXNBZG1pbiA9IGN1cnJlbnRBZG1pbj8ucm9sZSA9PT0gJ2FkbWluJztcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaFN0YXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgZW5kcG9pbnQgPSBpc0FkbWluID8gJy9hcGkvZGFzaGJvYXJkL3N0YXRzJyA6ICcvYXBpL2Rhc2hib2FyZC91c2VyLXN0YXRzJztcbiAgICAgICAgICAgICAgICBpZiAoIWlzQWRtaW4gJiYgY3VycmVudEFkbWluPy5pZCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRwb2ludCA9IGAke2VuZHBvaW50fT91c2VySWQ9JHtjdXJyZW50QWRtaW4uaWR9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZmV0Y2ggc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0YXRzOicsIGVycik7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBzdGF0aXN0aWNzJyk7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgICAgIGZldGNoU3RhdHMoKTtcbiAgICAgICAgfVxuICAgIH0sIFtpc0FkbWluLCBjdXJyZW50QWRtaW5dKTtcbiAgICBpZiAoIWN1cnJlbnRBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJOb3QgYXV0aGVudGljYXRlZFwiKSkpO1xuICAgIH1cbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIGRhc2hib2FyZC4uLlwiKSkpO1xuICAgIH1cbiAgICBpZiAoZXJyb3IgfHwgIXN0YXRzKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImVycm9yXCIgfSwgZXJyb3IgfHwgJ0ZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCcpKSk7XG4gICAgfVxuICAgIGNvbnN0IGdldFN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAnZGVsaXZlcmVkJzogcmV0dXJuICdzdWNjZXNzJztcbiAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGxlZCc6IHJldHVybiAnZGFuZ2VyJztcbiAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NpbmcnOiByZXR1cm4gJ2luZm8nO1xuICAgICAgICAgICAgY2FzZSAnc2hpcHBlZCc6IHJldHVybiAncHJpbWFyeSc7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJBZG1pbiBEYXNoYm9hcmRcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJyb3dcIiwgbWFyZ2luQm90dG9tOiBcInh4bFwiLCBmbGV4V3JhcDogXCJ3cmFwXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFVzZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxVc2VycykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyNTBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFJldmVudWVcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoc3RhdHMudG90YWxSZXZlbnVlKS50b0ZpeGVkKDIpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInh4bFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLnJlY2VudE9yZGVycz8ubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk5vIHJlY2VudCBvcmRlcnNcIikpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJPcmRlciBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJVc2VyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJBbW91bnRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMucmVjZW50T3JkZXJzPy5tYXAoKG9yZGVyKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgeyBrZXk6IG9yZGVyLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgb3JkZXIuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIG9yZGVyLnVzZXJJZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IGdldFN0YXR1c0NvbG9yKG9yZGVyLnN0YXR1cykgfSwgb3JkZXIuc3RhdHVzLnRvVXBwZXJDYXNlKCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgbmV3IERhdGUob3JkZXIuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKSkpKSkpKSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJMb3cgU3RvY2sgUHJvZHVjdHMgKFN0b2NrIDwgMTApXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiB9LCAhc3RhdHMubG93U3RvY2tQcm9kdWN0cyB8fCBzdGF0cy5sb3dTdG9ja1Byb2R1Y3RzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJBbGwgcHJvZHVjdHMgYXJlIHdlbGwgc3RvY2tlZFwiKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByb2R1Y3QgSURcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiTmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJTdG9ja1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJQcmljZVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMubG93U3RvY2tQcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogcHJvZHVjdC5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcImVycm9yXCIgfSwgcHJvZHVjdC5zdG9jaykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSkpKSkpKSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgIFwiV2VsY29tZSwgXCIsXG4gICAgICAgICAgICBjdXJyZW50QWRtaW4ubmFtZSxcbiAgICAgICAgICAgIFwiIVwiKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiWW91ciBJbmZvcm1hdGlvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJtZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBcIk5hbWU6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk4MFwiIH0sIGN1cnJlbnRBZG1pbi5uYW1lKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiRW1haWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk4MFwiIH0sIGN1cnJlbnRBZG1pbi5lbWFpbCkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJBY2NvdW50IFR5cGU6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBcInByaW1hcnlcIiB9LCBjdXJyZW50QWRtaW4ucm9sZSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIllvdXIgT3JkZXIgU3RhdGlzdGljc1wiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLCBmbGV4V3JhcDogXCJ3cmFwXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiVG90YWwgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiUGVuZGluZyBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcIndhcm5pbmdcIiB9LCBzdGF0cy5wZW5kaW5nT3JkZXJzKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIkNvbXBsZXRlZCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LCBzdGF0cy5jb21wbGV0ZWRPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiVG90YWwgU3BlbnRcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoc3RhdHMudG90YWxTcGVudCkudG9GaXhlZCgyKSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnMgKExhc3QgNSlcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc3RhdHMucmVjZW50T3JkZXJzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInhsXCIsIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiwgZm9udFNpemU6IFwibGdcIiB9LCBcIllvdSBoYXZlbid0IHBsYWNlZCBhbnkgb3JkZXJzIHlldFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIsIGZvbnRTaXplOiBcInNtXCIsIG1hcmdpblRvcDogXCJzbVwiIH0sIFwiU3RhcnQgc2hvcHBpbmcgdG8gc2VlIHlvdXIgb3JkZXJzIGhlcmUhXCIpKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlSGVhZCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIk9yZGVyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiU3RhdHVzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiQW1vdW50XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVCb2R5LCBudWxsLCBzdGF0cy5yZWNlbnRPcmRlcnMubWFwKChvcmRlcikgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIHsga2V5OiBvcmRlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLmlkKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBnZXRTdGF0dXNDb2xvcihvcmRlci5zdGF0dXMpIH0sIG9yZGVyLnN0YXR1cy50b1VwcGVyQ2FzZSgpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKG9yZGVyLnRvdGFsQW1vdW50KS50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpKSkpKSkpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcImluZm9cIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6ICcjZTZmN2ZmJywgYm9yZGVyQ29sb3I6ICcjOTFkNWZmJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdUQ4M0RcXHVEQ0ExIFF1aWNrIFRpcHNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBVc2UgdGhlIFJFU1QgQVBJIGF0IFwiLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9hcGkvcHJvZHVjdHNcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiIHRvIGJyb3dzZSBwcm9kdWN0c1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIE1hbmFnZSB5b3VyIGNhcnQgYXQgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL2FwaS9jYXJ0XCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIFBsYWNlIG9yZGVycyBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL2NoZWNrb3V0XCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIFZpZXcgb3JkZXIgaGlzdG9yeSBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL3VzZXIvb3JkZXJzXCIpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUm9sZURhc2hib2FyZDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIElucHV0LCBCdXR0b24sIEZvcm1Hcm91cCwgTGFiZWwsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFNldHRpbmdzUGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBbc2V0dGluZ3MsIHNldFNldHRpbmdzXSA9IHVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgc2V0dGluZ3NDb25maWcgPSBbXG4gICAgICAgIHsga2V5OiAnc2l0ZV9uYW1lJywgbGFiZWw6ICdTaXRlIE5hbWUnLCBkZXNjcmlwdGlvbjogJ1RoZSBuYW1lIG9mIHlvdXIgZUNvbW1lcmNlIHN0b3JlJyB9LFxuICAgICAgICB7IGtleTogJ2N1cnJlbmN5JywgbGFiZWw6ICdDdXJyZW5jeScsIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBjdXJyZW5jeSAoZS5nLiwgVVNELCBFVVIsIEdCUCknIH0sXG4gICAgICAgIHsga2V5OiAndGF4X3JhdGUnLCBsYWJlbDogJ1RheCBSYXRlICglKScsIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCB0YXggcmF0ZSBwZXJjZW50YWdlJyB9LFxuICAgICAgICB7IGtleTogJ3NoaXBwaW5nX2Nvc3QnLCBsYWJlbDogJ1NoaXBwaW5nIENvc3QnLCBkZXNjcmlwdGlvbjogJ0RlZmF1bHQgc2hpcHBpbmcgY29zdCcgfSxcbiAgICAgICAgeyBrZXk6ICdjb250YWN0X2VtYWlsJywgbGFiZWw6ICdDb250YWN0IEVtYWlsJywgZGVzY3JpcHRpb246ICdDdXN0b21lciBzdXBwb3J0IGVtYWlsIGFkZHJlc3MnIH0sXG4gICAgICAgIHsga2V5OiAnbWluX29yZGVyX2Ftb3VudCcsIGxhYmVsOiAnTWluaW11bSBPcmRlciBBbW91bnQnLCBkZXNjcmlwdGlvbjogJ01pbmltdW0gb3JkZXIgYW1vdW50IGZvciBjaGVja291dCcgfSxcbiAgICBdO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZldGNoU2V0dGluZ3MoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvc2V0dGluZ3MnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc2V0dGluZ3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzTWFwID0ge307XG4gICAgICAgICAgICByZXN1bHQuZGF0YS5mb3JFYWNoKChzZXR0aW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3NNYXBbc2V0dGluZy5rZXldID0gc2V0dGluZy52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U2V0dGluZ3Moc2V0dGluZ3NNYXApO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc2V0dGluZ3M6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBzZXR0aW5ncycpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgc2V0U2V0dGluZ3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgW2tleV06IHZhbHVlLFxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTYXZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRTYXZpbmcodHJ1ZSk7XG4gICAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgICBzZXRTdWNjZXNzKG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9zZXR0aW5ncycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzZXR0aW5ncyB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHNhdmUgc2V0dGluZ3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFN1Y2Nlc3MoJ1NldHRpbmdzIHNhdmVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHNldHRpbmdzOicsIGVycik7XG4gICAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHNhdmUgc2V0dGluZ3MnKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChsb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgc2V0dGluZ3MuLi5cIikpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJTZXR0aW5nc1wiKSxcbiAgICAgICAgZXJyb3IgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZUJveCwgeyBtZXNzYWdlOiBlcnJvciwgdmFyaWFudDogXCJkYW5nZXJcIiwgb25DbG9zZTogKCkgPT4gc2V0RXJyb3IobnVsbCkgfSkpLFxuICAgICAgICBzdWNjZXNzICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogc3VjY2VzcywgdmFyaWFudDogXCJzdWNjZXNzXCIsIG9uQ2xvc2U6ICgpID0+IHNldFN1Y2Nlc3MobnVsbCkgfSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzgwMHB4JyB9IH0sXG4gICAgICAgICAgICBzZXR0aW5nc0NvbmZpZy5tYXAoKGNvbmZpZykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IGtleTogY29uZmlnLmtleSwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IGNvbmZpZy5rZXkgfSwgY29uZmlnLmxhYmVsKSxcbiAgICAgICAgICAgICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSwgY29uZmlnLmRlc2NyaXB0aW9uKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBpZDogY29uZmlnLmtleSwgdmFsdWU6IHNldHRpbmdzW2NvbmZpZy5rZXldIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUlucHV0Q2hhbmdlKGNvbmZpZy5rZXksIGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IGBFbnRlciAke2NvbmZpZy5sYWJlbC50b0xvd2VyQ2FzZSgpfWAgfSkpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieHhsXCIsIGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6IGhhbmRsZVNhdmUsIGRpc2FibGVkOiBzYXZpbmcgfSwgc2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBTZXR0aW5ncycpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkN1cnJlbnQgU2V0dGluZ3MgU3VtbWFyeVwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcImdyZXkyMFwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc2V0dGluZ3NDb25maWcubWFwKChjb25maWcpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBrZXk6IGNvbmZpZy5rZXksIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgXCI6XCIpLFxuICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTgwXCIgfSwgc2V0dGluZ3NbY29uZmlnLmtleV0gfHwgJ05vdCBzZXQnKSkpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NQYWdlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBJbnB1dCwgQnV0dG9uLCBGb3JtR3JvdXAsIExhYmVsLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBVc2VyU2V0dGluZ3MgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW2N1cnJlbnRQYXNzd29yZCwgc2V0Q3VycmVudFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBbbmV3UGFzc3dvcmQsIHNldE5ld1Bhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBbY29uZmlybVBhc3N3b3JkLCBzZXRDb25maXJtUGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudEFkbWluKSB7XG4gICAgICAgICAgICBzZXROYW1lKGN1cnJlbnRBZG1pbi5uYW1lIHx8ICcnKTtcbiAgICAgICAgICAgIHNldEVtYWlsKGN1cnJlbnRBZG1pbi5lbWFpbCB8fCAnJyk7XG4gICAgICAgIH1cbiAgICB9LCBbY3VycmVudEFkbWluXSk7XG4gICAgY29uc3QgaGFuZGxlU2F2ZVByb2ZpbGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICAgIHNldFN1Y2Nlc3MobnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVEYXRhID0geyBuYW1lLCBlbWFpbCB9O1xuICAgICAgICAgICAgaWYgKG5ld1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Bhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ05ldyBwYXNzd29yZHMgZG8gbm90IG1hdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50UGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0N1cnJlbnQgcGFzc3dvcmQgaXMgcmVxdWlyZWQgdG8gc2V0IGEgbmV3IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jdXJyZW50UGFzc3dvcmQgPSBjdXJyZW50UGFzc3dvcmQ7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5uZXdQYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS91c2VyL3Byb2ZpbGUnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZURhdGEpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRTdWNjZXNzKCdQcm9maWxlIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICAgICAgc2V0Q3VycmVudFBhc3N3b3JkKCcnKTtcbiAgICAgICAgICAgIHNldE5ld1Bhc3N3b3JkKCcnKTtcbiAgICAgICAgICAgIHNldENvbmZpcm1QYXNzd29yZCgnJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN1Y2Nlc3MobnVsbCksIDMwMDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHByb2ZpbGU6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWN1cnJlbnRBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJOb3QgYXV0aGVudGljYXRlZFwiKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIkFjY291bnQgU2V0dGluZ3NcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4eGxcIiwgbWFyZ2luQm90dG9tOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiUHJvZmlsZSBJbmZvcm1hdGlvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgeyBodG1sRm9yOiBcIm5hbWVcIiB9LCBcIkZ1bGwgTmFtZVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcIm5hbWVcIiwgdmFsdWU6IG5hbWUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgZnVsbCBuYW1lXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiZW1haWxcIiB9LCBcIkVtYWlsIEFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBpZDogXCJlbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIsIHZhbHVlOiBlbWFpbCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgZW1haWxcIiB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBoYW5kbGVTYXZlUHJvZmlsZSwgZGlzYWJsZWQ6IHNhdmluZyB9LCBzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIFByb2ZpbGUnKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiQ2hhbmdlIFBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkxlYXZlIGJsYW5rIGlmIHlvdSBkb24ndCB3YW50IHRvIGNoYW5nZSB5b3VyIHBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiY3VycmVudFBhc3N3b3JkXCIgfSwgXCJDdXJyZW50IFBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgaWQ6IFwiY3VycmVudFBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IGN1cnJlbnRQYXNzd29yZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRDdXJyZW50UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpLCBwbGFjZWhvbGRlcjogXCJFbnRlciBjdXJyZW50IHBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwibmV3UGFzc3dvcmRcIiB9LCBcIk5ldyBQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcIm5ld1Bhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IG5ld1Bhc3N3b3JkLCBvbkNoYW5nZTogKGUpID0+IHNldE5ld1Bhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IFwiRW50ZXIgbmV3IHBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIE5ldyBQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcImNvbmZpcm1QYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIsIHZhbHVlOiBjb25maXJtUGFzc3dvcmQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q29uZmlybVBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBuZXcgcGFzc3dvcmRcIiB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBoYW5kbGVTYXZlUHJvZmlsZSwgZGlzYWJsZWQ6IHNhdmluZyB9LCBzYXZpbmcgPyAnVXBkYXRpbmcuLi4nIDogJ1VwZGF0ZSBQYXNzd29yZCcpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwiaW5mb1wiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIsIHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJyNlNmY3ZmYnLCBib3JkZXJDb2xvcjogJyM5MWQ1ZmYnLCBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdTIxMzlcXHVGRTBGIE5vdGVcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiVG8gdXNlIHRoZSBmdWxsIHNob3BwaW5nIGZlYXR1cmVzLCB5b3UgbmVlZCB0byBhdXRoZW50aWNhdGUgdmlhIHRoZSBSRVNUIEFQSSB1c2luZyBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL2F1dGgvbG9naW5cIiksXG4gICAgICAgICAgICAgICAgICAgIFwiIGVuZHBvaW50IGFuZCBzYXZlIHRoZSBKV1QgdG9rZW4uXCIpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyU2V0dGluZ3M7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgQmFkZ2UsIElucHV0LCBMYWJlbCwgRm9ybUdyb3VwLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBVc2VyUHJvZHVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbcHJvZHVjdHMsIHNldFByb2R1Y3RzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbY2F0ZWdvcmllcywgc2V0Q2F0ZWdvcmllc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3NlbGVjdGVkQ2F0ZWdvcnksIHNldFNlbGVjdGVkQ2F0ZWdvcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hDYXRlZ29yaWVzKCk7XG4gICAgICAgIGZldGNoUHJvZHVjdHMoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXRlZ29yaWVzJywge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHNldENhdGVnb3JpZXMocmVzdWx0LmRhdGEgfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhdGVnb3JpZXM6JywgZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZmV0Y2hQcm9kdWN0cyA9IGFzeW5jIChjYXRlZ29yeUlkLCBzZWFyY2gpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSAnL2FwaS9wcm9kdWN0cz8nO1xuICAgICAgICAgICAgaWYgKGNhdGVnb3J5SWQpXG4gICAgICAgICAgICAgICAgdXJsICs9IGBjYXRlZ29yeUlkPSR7Y2F0ZWdvcnlJZH0mYDtcbiAgICAgICAgICAgIGlmIChzZWFyY2gpXG4gICAgICAgICAgICAgICAgdXJsICs9IGBzZWFyY2g9JHtlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoKX0mYDtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBzZXRQcm9kdWN0cyhyZXN1bHQuZGF0YSB8fCBbXSk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwcm9kdWN0czonLCBlcnIpO1xuICAgICAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHByb2R1Y3RzJyk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UgPSAoY2F0ZWdvcnlJZCkgPT4ge1xuICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5KGNhdGVnb3J5SWQpO1xuICAgICAgICBmZXRjaFByb2R1Y3RzKGNhdGVnb3J5SWQsIHNlYXJjaFF1ZXJ5KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNlYXJjaCA9ICgpID0+IHtcbiAgICAgICAgZmV0Y2hQcm9kdWN0cyhzZWxlY3RlZENhdGVnb3J5LCBzZWFyY2hRdWVyeSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVBZGRUb0NhcnQgPSBhc3luYyAocHJvZHVjdElkLCBwcm9kdWN0TmFtZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0L2FkZCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcHJvZHVjdElkLCBxdWFudGl0eTogMSB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBhZGQgdG8gY2FydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0U3VjY2VzcyhgJHtwcm9kdWN0TmFtZX0gYWRkZWQgdG8gY2FydCFgKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gYWRkIHRvIGNhcnQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTm90IGF1dGhlbnRpY2F0ZWRcIikpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJCcm93c2UgUHJvZHVjdHNcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwicm93XCIsIGZsZXhXcmFwOiBcIndyYXBcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyMDBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIFwiQ2F0ZWdvcnlcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyB2YWx1ZTogc2VsZWN0ZWRDYXRlZ29yeSwgb25DaGFuZ2U6IChlKSA9PiBoYW5kbGVDYXRlZ29yeUNoYW5nZShlLnRhcmdldC52YWx1ZSksIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkOWQ5ZDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiIH0sIFwiQWxsIENhdGVnb3JpZXNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzLm1hcCgoY2F0KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IGtleTogY2F0LmlkLCB2YWx1ZTogY2F0LmlkIH0sIGNhdC5uYW1lKSkpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgZmxleDogXCIyXCIsIG1pbldpZHRoOiBcIjMwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJTZWFyY2hcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgdmFsdWU6IHNlYXJjaFF1ZXJ5LCBvbkNoYW5nZTogKGUpID0+IHNldFNlYXJjaFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKSwgb25LZXlQcmVzczogKGUpID0+IGUua2V5ID09PSAnRW50ZXInICYmIGhhbmRsZVNlYXJjaCgpLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggcHJvZHVjdHMuLi5cIiB9KSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiZmxleC1lbmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVTZWFyY2ggfSwgXCJTZWFyY2hcIikpKSksXG4gICAgICAgIGxvYWRpbmcgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgcHJvZHVjdHMuLi5cIikpIDogcHJvZHVjdHMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIsIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiLCBmb250U2l6ZTogXCJsZ1wiIH0sIFwiTm8gcHJvZHVjdHMgZm91bmRcIikpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImdyaWRcIiwgc3R5bGU6IHsgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyODBweCwgMWZyKSknLCBnYXA6ICcyMHB4JyB9IH0sIHByb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGtleTogcHJvZHVjdC5pZCwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMGYwZjAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBwcm9kdWN0LmltYWdlVXJsID8gYHVybCgke3Byb2R1Y3QuaW1hZ2VVcmx9KWAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH0gfSwgIXByb2R1Y3QuaW1hZ2VVcmwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk5vIEltYWdlXCIpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIHByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBwcm9kdWN0LmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0LmNhdGVnb3J5ICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IFwiaW5mb1wiLCBzaXplOiBcInNtXCIsIHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogJzhweCcgfSB9LCBwcm9kdWN0LmNhdGVnb3J5Lm5hbWUpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIocHJvZHVjdC5wcmljZSkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBwcm9kdWN0LnN0b2NrID4gMCA/ICdzdWNjZXNzJyA6ICdlcnJvcicgfSwgcHJvZHVjdC5zdG9jayA+IDAgPyBgJHtwcm9kdWN0LnN0b2NrfSBpbiBzdG9ja2AgOiAnT3V0IG9mIHN0b2NrJykpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUFkZFRvQ2FydChwcm9kdWN0LmlkLCBwcm9kdWN0Lm5hbWUpLCBkaXNhYmxlZDogcHJvZHVjdC5zdG9jayA9PT0gMCwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9IH0sIHByb2R1Y3Quc3RvY2sgPT09IDAgPyAnT3V0IG9mIFN0b2NrJyA6ICdBZGQgdG8gQ2FydCcpKSkpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZHVjdHM7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgVGFibGUsIFRhYmxlSGVhZCwgVGFibGVCb2R5LCBUYWJsZVJvdywgVGFibGVDZWxsLCBJbnB1dCwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgVXNlckNhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbY2FydEl0ZW1zLCBzZXRDYXJ0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmZXRjaENhcnQoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hDYXJ0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0Jywge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBjYXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBzZXRDYXJ0SXRlbXMocmVzdWx0LmRhdGEgfHwgW10pO1xuICAgICAgICAgICAgc2V0VG90YWwocGFyc2VGbG9hdChyZXN1bHQudG90YWwpIHx8IDApO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgY2FydDonLCBlcnIpO1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBjYXJ0Jyk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgdXBkYXRlUXVhbnRpdHkgPSBhc3luYyAoY2FydEl0ZW1JZCwgbmV3UXVhbnRpdHkpID0+IHtcbiAgICAgICAgaWYgKG5ld1F1YW50aXR5IDwgMSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hcGkvY2FydC8ke2NhcnRJdGVtSWR9YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHF1YW50aXR5OiBuZXdRdWFudGl0eSB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byB1cGRhdGUgcXVhbnRpdHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZldGNoQ2FydCgpO1xuICAgICAgICAgICAgc2V0U3VjY2VzcygnUXVhbnRpdHkgdXBkYXRlZCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdWNjZXNzKG51bGwpLCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzZXRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byB1cGRhdGUgcXVhbnRpdHknKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcmVtb3ZlSXRlbSA9IGFzeW5jIChjYXJ0SXRlbUlkKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2NhcnQvJHtjYXJ0SXRlbUlkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZW1vdmUgaXRlbScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmV0Y2hDYXJ0KCk7XG4gICAgICAgICAgICBzZXRTdWNjZXNzKCdJdGVtIHJlbW92ZWQgZnJvbSBjYXJ0Jyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN1Y2Nlc3MobnVsbCksIDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIHJlbW92ZSBpdGVtJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGNsZWFyQ2FydCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCFjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xlYXIgeW91ciBjYXJ0PycpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0Jywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNsZWFyIGNhcnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZldGNoQ2FydCgpO1xuICAgICAgICAgICAgc2V0U3VjY2VzcygnQ2FydCBjbGVhcmVkJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN1Y2Nlc3MobnVsbCksIDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGNsZWFyIGNhcnQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTm90IGF1dGhlbnRpY2F0ZWRcIikpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIG1hcmdpbkJvdHRvbTogXCJ4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEgyLCBudWxsLCBcIlNob3BwaW5nIENhcnRcIiksXG4gICAgICAgICAgICBjYXJ0SXRlbXMubGVuZ3RoID4gMCAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6IGNsZWFyQ2FydCB9LCBcIkNsZWFyIENhcnRcIikpKSxcbiAgICAgICAgZXJyb3IgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZUJveCwgeyBtZXNzYWdlOiBlcnJvciwgdmFyaWFudDogXCJkYW5nZXJcIiwgb25DbG9zZTogKCkgPT4gc2V0RXJyb3IobnVsbCkgfSkpLFxuICAgICAgICBzdWNjZXNzICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogc3VjY2VzcywgdmFyaWFudDogXCJzdWNjZXNzXCIsIG9uQ2xvc2U6ICgpID0+IHNldFN1Y2Nlc3MobnVsbCkgfSkpLFxuICAgICAgICBsb2FkaW5nID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIGNhcnQuLi5cIikpIDogY2FydEl0ZW1zLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiwgZm9udFNpemU6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJZb3VyIGNhcnQgaXMgZW1wdHlcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJTdGFydCBicm93c2luZyBwcm9kdWN0cyB0byBhZGQgaXRlbXMgdG8geW91ciBjYXJ0IVwiKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJ4bFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByb2R1Y3RcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiUHJpY2VcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiUXVhbnRpdHlcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiVG90YWxcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiQWN0aW9uc1wiKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgY2FydEl0ZW1zLm1hcCgoaXRlbSkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIHsga2V5OiBpdGVtLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnNjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnNjBweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2YwZjBmMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogaXRlbS5wcm9kdWN0LmltYWdlVXJsID8gYHVybCgke2l0ZW0ucHJvZHVjdC5pbWFnZVVybH0pYCA6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIGl0ZW0ucHJvZHVjdC5uYW1lKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKGl0ZW0ucHJvZHVjdC5wcmljZSkudG9GaXhlZCgyKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCB2YXJpYW50OiBcInRleHRcIiwgb25DbGljazogKCkgPT4gdXBkYXRlUXVhbnRpdHkoaXRlbS5pZCwgaXRlbS5xdWFudGl0eSAtIDEpLCBkaXNhYmxlZDogaXRlbS5xdWFudGl0eSA8PSAxIH0sIFwiLVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyB2YWx1ZTogaXRlbS5xdWFudGl0eSwgb25DaGFuZ2U6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlUXVhbnRpdHkoaXRlbS5pZCwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHR5cGU6IFwibnVtYmVyXCIsIG1pbjogXCIxXCIsIG1heDogaXRlbS5wcm9kdWN0LnN0b2NrLCBzdHlsZTogeyB3aWR0aDogJzYwcHgnLCBtYXJnaW46ICcwIDhweCcsIHRleHRBbGlnbjogJ2NlbnRlcicgfSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCB2YXJpYW50OiBcInRleHRcIiwgb25DbGljazogKCkgPT4gdXBkYXRlUXVhbnRpdHkoaXRlbS5pZCwgaXRlbS5xdWFudGl0eSArIDEpLCBkaXNhYmxlZDogaXRlbS5xdWFudGl0eSA+PSBpdGVtLnByb2R1Y3Quc3RvY2sgfSwgXCIrXCIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihpdGVtLml0ZW1Ub3RhbCkudG9GaXhlZCgyKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgc2l6ZTogXCJzbVwiLCB2YXJpYW50OiBcInRleHRcIiwgb25DbGljazogKCkgPT4gcmVtb3ZlSXRlbShpdGVtLmlkKSB9LCBcIlJlbW92ZVwiKSkpKSkpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInhsXCIsIHN0eWxlOiB7IG1heFdpZHRoOiAnNDAwcHgnLCBtYXJnaW5MZWZ0OiAnYXV0bycgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJDYXJ0IFN1bW1hcnlcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIlN1YnRvdGFsOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZ1RvcDogXCJsZ1wiLCBzdHlsZTogeyBib3JkZXJUb3A6ICcycHggc29saWQgI2YwZjBmMCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwibGdcIiwgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJUb3RhbDpcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJsZ1wiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyB2YXJpYW50OiBcInByaW1hcnlcIiwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9LCBvbkNsaWNrOiAoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjL2FkbWluL3BhZ2VzL2NoZWNrb3V0JyB9LCBcIlByb2NlZWQgdG8gQ2hlY2tvdXRcIikpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyQ2FydDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlQ3VycmVudEFkbWluIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgeyBCb3gsIEgyLCBINSwgVGV4dCwgQnV0dG9uLCBNZXNzYWdlQm94LCBCYWRnZSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgVXNlckNoZWNrb3V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IFtjdXJyZW50QWRtaW5dID0gdXNlQ3VycmVudEFkbWluKCk7XG4gICAgY29uc3QgW2NhcnRJdGVtcywgc2V0Q2FydEl0ZW1zXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbdG90YWwsIHNldFRvdGFsXSA9IHVzZVN0YXRlKDApO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtwbGFjaW5nLCBzZXRQbGFjaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtzdWNjZXNzLCBzZXRTdWNjZXNzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBbb3JkZXJJZCwgc2V0T3JkZXJJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmZXRjaENhcnQoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hDYXJ0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0Jywge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBjYXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBzZXRDYXJ0SXRlbXMocmVzdWx0LmRhdGEgfHwgW10pO1xuICAgICAgICAgICAgc2V0VG90YWwocGFyc2VGbG9hdChyZXN1bHQudG90YWwpIHx8IDApO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgY2FydDonLCBlcnIpO1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBjYXJ0Jyk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgcGxhY2VPcmRlciA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0UGxhY2luZyh0cnVlKTtcbiAgICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2NoZWNrb3V0Jywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gcGxhY2Ugb3JkZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHNldE9yZGVySWQocmVzdWx0LmRhdGEuaWQpO1xuICAgICAgICAgICAgc2V0U3VjY2Vzcyh0cnVlKTtcbiAgICAgICAgICAgIHNldFBsYWNpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBsYWNpbmcgb3JkZXI6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIHBsYWNlIG9yZGVyJyk7XG4gICAgICAgICAgICBzZXRQbGFjaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTm90IGF1dGhlbnRpY2F0ZWRcIikpKTtcbiAgICB9XG4gICAgaWYgKHN1Y2Nlc3MgJiYgb3JkZXJJZCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicsIG1heFdpZHRoOiAnNjAwcHgnLCBtYXJnaW46ICcwIGF1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIHN0eWxlOiB7IGZvbnRTaXplOiAnNDhweCcgfSB9LCBcIlxcdTI3MTNcIikpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LCBcIk9yZGVyIFBsYWNlZCBTdWNjZXNzZnVsbHkhXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICBcIllvdXIgb3JkZXIgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQmFkZ2UsIHsgdmFyaWFudDogXCJwcmltYXJ5XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJJZCksXG4gICAgICAgICAgICAgICAgICAgIFwiIGhhcyBiZWVuIGNvbmZpcm1lZC5cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiV2hhdCdzIE5leHQ/XCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiXFx1MjAyMiBZb3Ugd2lsbCByZWNlaXZlIGFuIG9yZGVyIGNvbmZpcm1hdGlvbiBlbWFpbCBzaG9ydGx5XCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiXFx1MjAyMiBUcmFjayB5b3VyIG9yZGVyIHN0YXR1cyBpbiB5b3VyIGRhc2hib2FyZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sIFwiXFx1MjAyMiBXZSdsbCBub3RpZnkgeW91IHdoZW4geW91ciBvcmRlciBzaGlwc1wiKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLCBzdHlsZTogeyBnYXA6ICcxMnB4JyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IG9uQ2xpY2s6ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvYWRtaW4nIH0sIFwiR28gdG8gRGFzaGJvYXJkXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyB2YXJpYW50OiBcInRleHRcIiwgb25DbGljazogKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnIy9hZG1pbi9wYWdlcy9wcm9kdWN0cycgfSwgXCJDb250aW51ZSBTaG9wcGluZ1wiKSkpKSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEgyLCB7IG1hcmdpbkJvdHRvbTogXCJ4bFwiIH0sIFwiQ2hlY2tvdXRcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgbG9hZGluZyA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTG9hZGluZyBjaGVja291dC4uLlwiKSkgOiBjYXJ0SXRlbXMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIsIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiLCBmb250U2l6ZTogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIllvdXIgY2FydCBpcyBlbXB0eVwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IG9uQ2xpY2s6ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvYWRtaW4vcGFnZXMvcHJvZHVjdHMnIH0sIFwiQnJvd3NlIFByb2R1Y3RzXCIpKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwicm93XCIsIGZsZXhXcmFwOiBcIndyYXBcIiwgc3R5bGU6IHsgZ2FwOiAnMjRweCcgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjMwMHB4XCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIk9yZGVyIFN1bW1hcnlcIiksXG4gICAgICAgICAgICAgICAgICAgIGNhcnRJdGVtcy5tYXAoKGl0ZW0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBrZXk6IGl0ZW0uaWQsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nQm90dG9tOiBcImxnXCIsIHN0eWxlOiB7IGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCAjZjBmMGYwJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBpdGVtLnByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKGl0ZW0ucHJvZHVjdC5wcmljZSkudG9GaXhlZCgyKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlF1YW50aXR5OiBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5xdWFudGl0eSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoaXRlbS5pdGVtVG90YWwpLnRvRml4ZWQoMikpKSkpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luVG9wOiBcImxnXCIsIHBhZGRpbmdUb3A6IFwibGdcIiwgc3R5bGU6IHsgYm9yZGVyVG9wOiAnMnB4IHNvbGlkICNmMGYwZjAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIlN1YnRvdGFsOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJUYXggKGVzdGltYXRlZCk6XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3RhbCAqIDAuMDgpLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIlNoaXBwaW5nOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiJDkuOTlcIikpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luVG9wOiBcImxnXCIsIHBhZGRpbmdUb3A6IFwibGdcIiwgc3R5bGU6IHsgYm9yZGVyVG9wOiAnMnB4IHNvbGlkICNmMGYwZjAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwibGdcIiwgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJUb3RhbDpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcImxnXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0b3RhbCArIHRvdGFsICogMC4wOCArIDkuOTkpLnRvRml4ZWQoMikpKSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIzMDBweFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiLCBtYXJnaW5Cb3R0b206IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiQ3VzdG9tZXIgSW5mb3JtYXRpb25cIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJtZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJOYW1lOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5ODBcIiB9LCBjdXJyZW50QWRtaW4ubmFtZSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiRW1haWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk4MFwiIH0sIGN1cnJlbnRBZG1pbi5lbWFpbCkpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlBheW1lbnQgTWV0aG9kXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJncmV5MjBcIiwgcGFkZGluZzogXCJsZ1wiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBtYXJnaW5Cb3R0b206IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSwgXCJQYXltZW50IHByb2Nlc3NpbmcgaXMgc2ltdWxhdGVkXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6IHBsYWNlT3JkZXIsIGRpc2FibGVkOiBwbGFjaW5nLCBzdHlsZTogeyB3aWR0aDogJzEwMCUnIH0gfSwgcGxhY2luZyA/ICdQbGFjaW5nIE9yZGVyLi4uJyA6ICdQbGFjZSBPcmRlcicpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpblRvcDogXCJtZFwiLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSwgXCJCeSBwbGFjaW5nIHRoaXMgb3JkZXIsIHlvdSBhZ3JlZSB0byBvdXIgdGVybXMgYW5kIGNvbmRpdGlvbnNcIikpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgVXNlckNoZWNrb3V0O1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQWRtaW5EYXNoYm9hcmQgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL0FkbWluRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5BZG1pbkRhc2hib2FyZCA9IEFkbWluRGFzaGJvYXJkXG5pbXBvcnQgVXNlckRhc2hib2FyZCBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlckRhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXNlckRhc2hib2FyZCA9IFVzZXJEYXNoYm9hcmRcbmltcG9ydCBSb2xlRGFzaGJvYXJkIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Sb2xlRGFzaGJvYXJkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Sb2xlRGFzaGJvYXJkID0gUm9sZURhc2hib2FyZFxuaW1wb3J0IFNldHRpbmdzUGFnZSBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvU2V0dGluZ3NQYWdlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TZXR0aW5nc1BhZ2UgPSBTZXR0aW5nc1BhZ2VcbmltcG9ydCBVc2VyU2V0dGluZ3MgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJTZXR0aW5ncydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXNlclNldHRpbmdzID0gVXNlclNldHRpbmdzXG5pbXBvcnQgVXNlclByb2R1Y3RzIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyUHJvZHVjdHMnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVzZXJQcm9kdWN0cyA9IFVzZXJQcm9kdWN0c1xuaW1wb3J0IFVzZXJDYXJ0IGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyQ2FydCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXNlckNhcnQgPSBVc2VyQ2FydFxuaW1wb3J0IFVzZXJDaGVja291dCBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlckNoZWNrb3V0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Vc2VyQ2hlY2tvdXQgPSBVc2VyQ2hlY2tvdXQiXSwibmFtZXMiOlsiQWRtaW5EYXNoYm9hcmQiLCJzdGF0cyIsInNldFN0YXRzIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVycm9yIiwic2V0RXJyb3IiLCJ1c2VFZmZlY3QiLCJmZXRjaERhc2hib2FyZFN0YXRzIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJjcmVkZW50aWFscyIsIm9rIiwiRXJyb3IiLCJyZXN1bHQiLCJqc29uIiwiZGF0YSIsImVyciIsImNvbnNvbGUiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJCb3giLCJwYWRkaW5nIiwiVGV4dCIsImNvbG9yIiwiSDIiLCJtYXJnaW5Cb3R0b20iLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImZsZXhXcmFwIiwiZmxleCIsIm1pbldpZHRoIiwibWFyZ2luUmlnaHQiLCJiZyIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsInN0eWxlIiwiYm94U2hhZG93IiwiSDUiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJ0b3RhbFVzZXJzIiwidG90YWxPcmRlcnMiLCJOdW1iZXIiLCJ0b3RhbFJldmVudWUiLCJ0b0ZpeGVkIiwicmVjZW50T3JkZXJzIiwibGVuZ3RoIiwiVGFibGUiLCJUYWJsZUhlYWQiLCJUYWJsZVJvdyIsIlRhYmxlQ2VsbCIsIlRhYmxlQm9keSIsIm1hcCIsIm9yZGVyIiwia2V5IiwiaWQiLCJ1c2VySWQiLCJzdGF0dXMiLCJ0b3RhbEFtb3VudCIsIkRhdGUiLCJjcmVhdGVkQXQiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJsb3dTdG9ja1Byb2R1Y3RzIiwicHJvZHVjdCIsIm5hbWUiLCJzdG9jayIsInByaWNlIiwiVXNlckRhc2hib2FyZCIsImN1cnJlbnRBZG1pbiIsInVzZUN1cnJlbnRBZG1pbiIsImZldGNoVXNlclN0YXRzIiwiZ2V0U3RhdHVzQ29sb3IiLCJlbWFpbCIsIkJhZGdlIiwidmFyaWFudCIsInJvbGUiLCJwZW5kaW5nT3JkZXJzIiwiY29tcGxldGVkT3JkZXJzIiwidG90YWxTcGVudCIsInRleHRBbGlnbiIsIm1hcmdpblRvcCIsInRvVXBwZXJDYXNlIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJSb2xlRGFzaGJvYXJkIiwiaXNBZG1pbiIsImZldGNoU3RhdHMiLCJlbmRwb2ludCIsImVycm9yRGF0YSIsImNhdGNoIiwibWVzc2FnZSIsIlNldHRpbmdzUGFnZSIsInNldHRpbmdzIiwic2V0U2V0dGluZ3MiLCJzYXZpbmciLCJzZXRTYXZpbmciLCJzdWNjZXNzIiwic2V0U3VjY2VzcyIsInNldHRpbmdzQ29uZmlnIiwibGFiZWwiLCJkZXNjcmlwdGlvbiIsImZldGNoU2V0dGluZ3MiLCJzZXR0aW5nc01hcCIsImZvckVhY2giLCJzZXR0aW5nIiwidmFsdWUiLCJoYW5kbGVJbnB1dENoYW5nZSIsInByZXYiLCJoYW5kbGVTYXZlIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXRUaW1lb3V0IiwiTWVzc2FnZUJveCIsIm9uQ2xvc2UiLCJtYXhXaWR0aCIsImNvbmZpZyIsIkZvcm1Hcm91cCIsIkxhYmVsIiwiaHRtbEZvciIsIklucHV0Iiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJ0b0xvd2VyQ2FzZSIsImp1c3RpZnlDb250ZW50IiwiQnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIiwiVXNlclNldHRpbmdzIiwic2V0TmFtZSIsInNldEVtYWlsIiwiY3VycmVudFBhc3N3b3JkIiwic2V0Q3VycmVudFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXROZXdQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInNldENvbmZpcm1QYXNzd29yZCIsImhhbmRsZVNhdmVQcm9maWxlIiwidXBkYXRlRGF0YSIsInR5cGUiLCJVc2VyUHJvZHVjdHMiLCJwcm9kdWN0cyIsInNldFByb2R1Y3RzIiwiY2F0ZWdvcmllcyIsInNldENhdGVnb3JpZXMiLCJzZWxlY3RlZENhdGVnb3J5Iiwic2V0U2VsZWN0ZWRDYXRlZ29yeSIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJmZXRjaENhdGVnb3JpZXMiLCJmZXRjaFByb2R1Y3RzIiwiY2F0ZWdvcnlJZCIsInNlYXJjaCIsInVybCIsImVuY29kZVVSSUNvbXBvbmVudCIsImhhbmRsZUNhdGVnb3J5Q2hhbmdlIiwiaGFuZGxlU2VhcmNoIiwiaGFuZGxlQWRkVG9DYXJ0IiwicHJvZHVjdElkIiwicHJvZHVjdE5hbWUiLCJxdWFudGl0eSIsIndpZHRoIiwiY2F0Iiwib25LZXlQcmVzcyIsImFsaWduSXRlbXMiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwiZ2FwIiwiaGVpZ2h0IiwiYmFja2dyb3VuZEltYWdlIiwiaW1hZ2VVcmwiLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRQb3NpdGlvbiIsImNhdGVnb3J5Iiwic2l6ZSIsIlVzZXJDYXJ0IiwiY2FydEl0ZW1zIiwic2V0Q2FydEl0ZW1zIiwidG90YWwiLCJzZXRUb3RhbCIsImZldGNoQ2FydCIsInBhcnNlRmxvYXQiLCJ1cGRhdGVRdWFudGl0eSIsImNhcnRJdGVtSWQiLCJuZXdRdWFudGl0eSIsInJlbW92ZUl0ZW0iLCJjbGVhckNhcnQiLCJjb25maXJtIiwiRnJhZ21lbnQiLCJpdGVtIiwidmFsIiwicGFyc2VJbnQiLCJtaW4iLCJtYXgiLCJtYXJnaW4iLCJpdGVtVG90YWwiLCJtYXJnaW5MZWZ0IiwicGFkZGluZ1RvcCIsImJvcmRlclRvcCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIlVzZXJDaGVja291dCIsInBsYWNpbmciLCJzZXRQbGFjaW5nIiwib3JkZXJJZCIsInNldE9yZGVySWQiLCJwbGFjZU9yZGVyIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlckJvdHRvbSIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztJQUVBLE1BQU1BLGNBQWMsR0FBR0EsTUFBTTtNQUN6QixNQUFNLENBQUNDLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdDLGNBQVEsQ0FBQyxJQUFJLENBQUM7TUFDeEMsTUFBTSxDQUFDQyxPQUFPLEVBQUVDLFVBQVUsQ0FBQyxHQUFHRixjQUFRLENBQUMsSUFBSSxDQUFDO01BQzVDLE1BQU0sQ0FBQ0csS0FBSyxFQUFFQyxRQUFRLENBQUMsR0FBR0osY0FBUSxDQUFDLElBQUksQ0FBQztJQUN4Q0ssRUFBQUEsZUFBUyxDQUFDLE1BQU07SUFDWixJQUFBLE1B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
