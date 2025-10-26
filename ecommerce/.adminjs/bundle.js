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
          backgroundImage: product.image ? `url(${product.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }, !product.image && (/*#__PURE__*/React__default.default.createElement(designSystem.Text, {
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
          backgroundImage: item.product.image ? `url(${item.product.image})` : 'none',
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
    AdminJS.UserComponents.RoleDashboard = RoleDashboard;
    AdminJS.UserComponents.SettingsPage = SettingsPage;
    AdminJS.UserComponents.UserSettings = UserSettings;
    AdminJS.UserComponents.UserProducts = UserProducts;
    AdminJS.UserComponents.UserCart = UserCart;
    AdminJS.UserComponents.UserCheckout = UserCheckout;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvQWRtaW5EYXNoYm9hcmQuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvUm9sZURhc2hib2FyZC5qcyIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9TZXR0aW5nc1BhZ2UuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlclNldHRpbmdzLmpzIiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJQcm9kdWN0cy5qcyIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyQ2FydC5qcyIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyQ2hlY2tvdXQuanMiLCJlbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBUYWJsZSwgVGFibGVIZWFkLCBUYWJsZUJvZHksIFRhYmxlUm93LCBUYWJsZUNlbGwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IEFkbWluRGFzaGJvYXJkID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzdGF0cywgc2V0U3RhdHNdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaERhc2hib2FyZFN0YXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2Rhc2hib2FyZC9zdGF0cycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIGRhc2hib2FyZCBzdGF0cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhc2hib2FyZCBzdGF0czonLCBlcnIpO1xuICAgICAgICAgICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBkYXNoYm9hcmQgc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmZXRjaERhc2hib2FyZFN0YXRzKCk7XG4gICAgfSwgW10pO1xuICAgIGlmIChsb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgZGFzaGJvYXJkLi4uXCIpKSk7XG4gICAgfVxuICAgIGlmIChlcnJvciB8fCAhc3RhdHMpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZXJyb3JcIiB9LCBlcnJvciB8fCAnRmFpbGVkIHRvIGxvYWQgZGFzaGJvYXJkJykpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJBZG1pbiBEYXNoYm9hcmRcIiksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLCBtYXJnaW5Cb3R0b206IFwieHhsXCIsIGZsZXhXcmFwOiBcIndyYXBcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjI1MHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFVzZXJzXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LCBzdGF0cy50b3RhbFVzZXJzKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LCBzdGF0cy50b3RhbE9yZGVycykpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjI1MHB4XCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFJldmVudWVcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwic3VjY2Vzc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIoc3RhdHMudG90YWxSZXZlbnVlKS50b0ZpeGVkKDIpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJSZWNlbnQgT3JkZXJzXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLnJlY2VudE9yZGVycy5sZW5ndGggPT09IDAgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiTm8gcmVjZW50IG9yZGVyc1wiKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlSGVhZCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIk9yZGVyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiVXNlciBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkFtb3VudFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkRhdGVcIikpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMucmVjZW50T3JkZXJzLm1hcCgob3JkZXIpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogb3JkZXIuaWQgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIG9yZGVyLmlkKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIG9yZGVyLnVzZXJJZCksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogb3JkZXIuc3RhdHVzID09PSAnZGVsaXZlcmVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdzdWNjZXNzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9yZGVyLnN0YXR1cyA9PT0gJ2NhbmNlbGxlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2Vycm9yJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAncHJpbWFyeTEwMCcgfSwgb3JkZXIuc3RhdHVzKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIob3JkZXIudG90YWxBbW91bnQpLnRvRml4ZWQoMikpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgbmV3IERhdGUob3JkZXIuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKSkpKSkpKSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiTG93IFN0b2NrIFByb2R1Y3RzIChTdG9jayA8IDEwKVwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiB9LCBzdGF0cy5sb3dTdG9ja1Byb2R1Y3RzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJBbGwgcHJvZHVjdHMgYXJlIHdlbGwgc3RvY2tlZFwiKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlSGVhZCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByb2R1Y3QgSURcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJOYW1lXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiU3RvY2tcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJQcmljZVwiKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVCb2R5LCBudWxsLCBzdGF0cy5sb3dTdG9ja1Byb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIHsga2V5OiBwcm9kdWN0LmlkIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBwcm9kdWN0LmlkKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJlcnJvclwiIH0sIHByb2R1Y3Quc3RvY2spKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihwcm9kdWN0LnByaWNlKS50b0ZpeGVkKDIpKSkpKSkpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQWRtaW5EYXNoYm9hcmQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlQm9keSwgVGFibGVSb3csIFRhYmxlQ2VsbCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFJvbGVEYXNoYm9hcmQgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgaXNBZG1pbiA9IGN1cnJlbnRBZG1pbj8ucm9sZSA9PT0gJ2FkbWluJztcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBmZXRjaFN0YXRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgZW5kcG9pbnQgPSBpc0FkbWluID8gJy9hcGkvZGFzaGJvYXJkL3N0YXRzJyA6ICcvYXBpL2Rhc2hib2FyZC91c2VyLXN0YXRzJztcbiAgICAgICAgICAgICAgICBpZiAoIWlzQWRtaW4gJiYgY3VycmVudEFkbWluPy5pZCkge1xuICAgICAgICAgICAgICAgICAgICBlbmRwb2ludCA9IGAke2VuZHBvaW50fT91c2VySWQ9JHtjdXJyZW50QWRtaW4uaWR9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZmV0Y2ggc3RhdGlzdGljcycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHN0YXRzOicsIGVycik7XG4gICAgICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gbG9hZCBzdGF0aXN0aWNzJyk7XG4gICAgICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgICAgIGZldGNoU3RhdHMoKTtcbiAgICAgICAgfVxuICAgIH0sIFtpc0FkbWluLCBjdXJyZW50QWRtaW5dKTtcbiAgICBpZiAoIWN1cnJlbnRBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJOb3QgYXV0aGVudGljYXRlZFwiKSkpO1xuICAgIH1cbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIGRhc2hib2FyZC4uLlwiKSkpO1xuICAgIH1cbiAgICBpZiAoZXJyb3IgfHwgIXN0YXRzKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImVycm9yXCIgfSwgZXJyb3IgfHwgJ0ZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCcpKSk7XG4gICAgfVxuICAgIGNvbnN0IGdldFN0YXR1c0NvbG9yID0gKHN0YXR1cykgPT4ge1xuICAgICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgY2FzZSAnZGVsaXZlcmVkJzogcmV0dXJuICdzdWNjZXNzJztcbiAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGxlZCc6IHJldHVybiAnZGFuZ2VyJztcbiAgICAgICAgICAgIGNhc2UgJ3Byb2Nlc3NpbmcnOiByZXR1cm4gJ2luZm8nO1xuICAgICAgICAgICAgY2FzZSAnc2hpcHBlZCc6IHJldHVybiAncHJpbWFyeSc7XG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoaXNBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJBZG1pbiBEYXNoYm9hcmRcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJyb3dcIiwgbWFyZ2luQm90dG9tOiBcInh4bFwiLCBmbGV4V3JhcDogXCJ3cmFwXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFVzZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxVc2VycykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyNTBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiVG90YWwgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjUwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIFJldmVudWVcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoc3RhdHMudG90YWxSZXZlbnVlKS50b0ZpeGVkKDIpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInh4bFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiIH0sIHN0YXRzLnJlY2VudE9yZGVycz8ubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk5vIHJlY2VudCBvcmRlcnNcIikpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJPcmRlciBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJVc2VyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlN0YXR1c1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJBbW91bnRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMucmVjZW50T3JkZXJzPy5tYXAoKG9yZGVyKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgeyBrZXk6IG9yZGVyLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgb3JkZXIuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIG9yZGVyLnVzZXJJZCksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IGdldFN0YXR1c0NvbG9yKG9yZGVyLnN0YXR1cykgfSwgb3JkZXIuc3RhdHVzLnRvVXBwZXJDYXNlKCkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihvcmRlci50b3RhbEFtb3VudCkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgbmV3IERhdGUob3JkZXIuY3JlYXRlZEF0KS50b0xvY2FsZURhdGVTdHJpbmcoKSkpKSkpKSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJMb3cgU3RvY2sgUHJvZHVjdHMgKFN0b2NrIDwgMTApXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiB9LCAhc3RhdHMubG93U3RvY2tQcm9kdWN0cyB8fCBzdGF0cy5sb3dTdG9ja1Byb2R1Y3RzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJBbGwgcHJvZHVjdHMgYXJlIHdlbGwgc3RvY2tlZFwiKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByb2R1Y3QgSURcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiTmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJTdG9ja1wiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJQcmljZVwiKSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMubG93U3RvY2tQcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogcHJvZHVjdC5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QuaWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIHByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcImVycm9yXCIgfSwgcHJvZHVjdC5zdG9jaykpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSkpKSkpKSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgIFwiV2VsY29tZSwgXCIsXG4gICAgICAgICAgICBjdXJyZW50QWRtaW4ubmFtZSxcbiAgICAgICAgICAgIFwiIVwiKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiWW91ciBJbmZvcm1hdGlvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJtZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBcIk5hbWU6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk4MFwiIH0sIGN1cnJlbnRBZG1pbi5uYW1lKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiRW1haWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk4MFwiIH0sIGN1cnJlbnRBZG1pbi5lbWFpbCkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgXCJBY2NvdW50IFR5cGU6XCIpLFxuICAgICAgICAgICAgICAgICAgICBcIiBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBcInByaW1hcnlcIiB9LCBjdXJyZW50QWRtaW4ucm9sZSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpbkJvdHRvbTogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIllvdXIgT3JkZXIgU3RhdGlzdGljc1wiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLCBmbGV4V3JhcDogXCJ3cmFwXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiVG90YWwgT3JkZXJzXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luUmlnaHQ6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiUGVuZGluZyBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcIndhcm5pbmdcIiB9LCBzdGF0cy5wZW5kaW5nT3JkZXJzKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjIwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIkNvbXBsZXRlZCBPcmRlcnNcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LCBzdGF0cy5jb21wbGV0ZWRPcmRlcnMpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMjAwcHhcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmc6IFwieGxcIiwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgc3R5bGU6IHsgYm94U2hhZG93OiAnMCAycHggNHB4IHJnYmEoMCwwLDAsMC4xKScgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIsIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIFwiVG90YWwgU3BlbnRcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoc3RhdHMudG90YWxTcGVudCkudG9GaXhlZCgyKSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIlJlY2VudCBPcmRlcnMgKExhc3QgNSlcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc3RhdHMucmVjZW50T3JkZXJzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInhsXCIsIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiwgZm9udFNpemU6IFwibGdcIiB9LCBcIllvdSBoYXZlbid0IHBsYWNlZCBhbnkgb3JkZXJzIHlldFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIsIGZvbnRTaXplOiBcInNtXCIsIG1hcmdpblRvcDogXCJzbVwiIH0sIFwiU3RhcnQgc2hvcHBpbmcgdG8gc2VlIHlvdXIgb3JkZXJzIGhlcmUhXCIpKSkgOiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZSwgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlSGVhZCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIk9yZGVyIElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiU3RhdHVzXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiQW1vdW50XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiRGF0ZVwiKSkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVCb2R5LCBudWxsLCBzdGF0cy5yZWNlbnRPcmRlcnMubWFwKChvcmRlcikgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIHsga2V5OiBvcmRlci5pZCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiI1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLmlkKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCYWRnZSwgeyB2YXJpYW50OiBnZXRTdGF0dXNDb2xvcihvcmRlci5zdGF0dXMpIH0sIG9yZGVyLnN0YXR1cy50b1VwcGVyQ2FzZSgpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKG9yZGVyLnRvdGFsQW1vdW50KS50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBuZXcgRGF0ZShvcmRlci5jcmVhdGVkQXQpLnRvTG9jYWxlRGF0ZVN0cmluZygpKSkpKSkpKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcImluZm9cIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBzdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6ICcjZTZmN2ZmJywgYm9yZGVyQ29sb3I6ICcjOTFkNWZmJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdUQ4M0RcXHVEQ0ExIFF1aWNrIFRpcHNcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiXFx1MjAyMiBVc2UgdGhlIFJFU1QgQVBJIGF0IFwiLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBcIi9hcGkvcHJvZHVjdHNcIiksXG4gICAgICAgICAgICAgICAgICAgIFwiIHRvIGJyb3dzZSBwcm9kdWN0c1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIE1hbmFnZSB5b3VyIGNhcnQgYXQgXCIsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiL2FwaS9jYXJ0XCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIFBsYWNlIG9yZGVycyBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL2NoZWNrb3V0XCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTgwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJcXHUyMDIyIFZpZXcgb3JkZXIgaGlzdG9yeSBhdCBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL3VzZXIvb3JkZXJzXCIpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgUm9sZURhc2hib2FyZDtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIElucHV0LCBCdXR0b24sIEZvcm1Hcm91cCwgTGFiZWwsIE1lc3NhZ2VCb3ggfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFNldHRpbmdzUGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCBbc2V0dGluZ3MsIHNldFNldHRpbmdzXSA9IHVzZVN0YXRlKHt9KTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbc2F2aW5nLCBzZXRTYXZpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgc2V0dGluZ3NDb25maWcgPSBbXG4gICAgICAgIHsga2V5OiAnc2l0ZV9uYW1lJywgbGFiZWw6ICdTaXRlIE5hbWUnLCBkZXNjcmlwdGlvbjogJ1RoZSBuYW1lIG9mIHlvdXIgZUNvbW1lcmNlIHN0b3JlJyB9LFxuICAgICAgICB7IGtleTogJ2N1cnJlbmN5JywgbGFiZWw6ICdDdXJyZW5jeScsIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBjdXJyZW5jeSAoZS5nLiwgVVNELCBFVVIsIEdCUCknIH0sXG4gICAgICAgIHsga2V5OiAndGF4X3JhdGUnLCBsYWJlbDogJ1RheCBSYXRlICglKScsIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCB0YXggcmF0ZSBwZXJjZW50YWdlJyB9LFxuICAgICAgICB7IGtleTogJ3NoaXBwaW5nX2Nvc3QnLCBsYWJlbDogJ1NoaXBwaW5nIENvc3QnLCBkZXNjcmlwdGlvbjogJ0RlZmF1bHQgc2hpcHBpbmcgY29zdCcgfSxcbiAgICAgICAgeyBrZXk6ICdjb250YWN0X2VtYWlsJywgbGFiZWw6ICdDb250YWN0IEVtYWlsJywgZGVzY3JpcHRpb246ICdDdXN0b21lciBzdXBwb3J0IGVtYWlsIGFkZHJlc3MnIH0sXG4gICAgICAgIHsga2V5OiAnbWluX29yZGVyX2Ftb3VudCcsIGxhYmVsOiAnTWluaW11bSBPcmRlciBBbW91bnQnLCBkZXNjcmlwdGlvbjogJ01pbmltdW0gb3JkZXIgYW1vdW50IGZvciBjaGVja291dCcgfSxcbiAgICBdO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGZldGNoU2V0dGluZ3MoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hTZXR0aW5ncyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvc2V0dGluZ3MnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc2V0dGluZ3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzTWFwID0ge307XG4gICAgICAgICAgICByZXN1bHQuZGF0YS5mb3JFYWNoKChzZXR0aW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3NNYXBbc2V0dGluZy5rZXldID0gc2V0dGluZy52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0U2V0dGluZ3Moc2V0dGluZ3NNYXApO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgc2V0dGluZ3M6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gbG9hZCBzZXR0aW5ncycpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZUlucHV0Q2hhbmdlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgc2V0U2V0dGluZ3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgW2tleV06IHZhbHVlLFxuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVTYXZlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRTYXZpbmcodHJ1ZSk7XG4gICAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgICBzZXRTdWNjZXNzKG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9zZXR0aW5ncycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzZXR0aW5ncyB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHNhdmUgc2V0dGluZ3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNldFN1Y2Nlc3MoJ1NldHRpbmdzIHNhdmVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHNldHRpbmdzOicsIGVycik7XG4gICAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIHNhdmUgc2V0dGluZ3MnKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChsb2FkaW5nKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgc2V0dGluZ3MuLi5cIikpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJTZXR0aW5nc1wiKSxcbiAgICAgICAgZXJyb3IgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZUJveCwgeyBtZXNzYWdlOiBlcnJvciwgdmFyaWFudDogXCJkYW5nZXJcIiwgb25DbG9zZTogKCkgPT4gc2V0RXJyb3IobnVsbCkgfSkpLFxuICAgICAgICBzdWNjZXNzICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogc3VjY2VzcywgdmFyaWFudDogXCJzdWNjZXNzXCIsIG9uQ2xvc2U6ICgpID0+IHNldFN1Y2Nlc3MobnVsbCkgfSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzgwMHB4JyB9IH0sXG4gICAgICAgICAgICBzZXR0aW5nc0NvbmZpZy5tYXAoKGNvbmZpZykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IGtleTogY29uZmlnLmtleSwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IGNvbmZpZy5rZXkgfSwgY29uZmlnLmxhYmVsKSxcbiAgICAgICAgICAgICAgICBjb25maWcuZGVzY3JpcHRpb24gJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSwgY29uZmlnLmRlc2NyaXB0aW9uKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBpZDogY29uZmlnLmtleSwgdmFsdWU6IHNldHRpbmdzW2NvbmZpZy5rZXldIHx8ICcnLCBvbkNoYW5nZTogKGUpID0+IGhhbmRsZUlucHV0Q2hhbmdlKGNvbmZpZy5rZXksIGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IGBFbnRlciAke2NvbmZpZy5sYWJlbC50b0xvd2VyQ2FzZSgpfWAgfSkpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieHhsXCIsIGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6IGhhbmRsZVNhdmUsIGRpc2FibGVkOiBzYXZpbmcgfSwgc2F2aW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSBTZXR0aW5ncycpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkN1cnJlbnQgU2V0dGluZ3MgU3VtbWFyeVwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcImdyZXkyMFwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc2V0dGluZ3NDb25maWcubWFwKChjb25maWcpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBrZXk6IGNvbmZpZy5rZXksIG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgXCI6XCIpLFxuICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTgwXCIgfSwgc2V0dGluZ3NbY29uZmlnLmtleV0gfHwgJ05vdCBzZXQnKSkpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NQYWdlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VDdXJyZW50QWRtaW4gfSBmcm9tICdhZG1pbmpzJztcbmltcG9ydCB7IEJveCwgSDIsIEg1LCBUZXh0LCBJbnB1dCwgQnV0dG9uLCBGb3JtR3JvdXAsIExhYmVsLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBVc2VyU2V0dGluZ3MgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbbmFtZSwgc2V0TmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW2N1cnJlbnRQYXNzd29yZCwgc2V0Q3VycmVudFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBbbmV3UGFzc3dvcmQsIHNldE5ld1Bhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcbiAgICBjb25zdCBbY29uZmlybVBhc3N3b3JkLCBzZXRDb25maXJtUGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoY3VycmVudEFkbWluKSB7XG4gICAgICAgICAgICBzZXROYW1lKGN1cnJlbnRBZG1pbi5uYW1lIHx8ICcnKTtcbiAgICAgICAgICAgIHNldEVtYWlsKGN1cnJlbnRBZG1pbi5lbWFpbCB8fCAnJyk7XG4gICAgICAgIH1cbiAgICB9LCBbY3VycmVudEFkbWluXSk7XG4gICAgY29uc3QgaGFuZGxlU2F2ZVByb2ZpbGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICAgIHNldFN1Y2Nlc3MobnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVEYXRhID0geyBuYW1lLCBlbWFpbCB9O1xuICAgICAgICAgICAgaWYgKG5ld1Bhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1Bhc3N3b3JkICE9PSBjb25maXJtUGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ05ldyBwYXNzd29yZHMgZG8gbm90IG1hdGNoJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50UGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RXJyb3IoJ0N1cnJlbnQgcGFzc3dvcmQgaXMgcmVxdWlyZWQgdG8gc2V0IGEgbmV3IHBhc3N3b3JkJyk7XG4gICAgICAgICAgICAgICAgICAgIHNldFNhdmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5jdXJyZW50UGFzc3dvcmQgPSBjdXJyZW50UGFzc3dvcmQ7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGF0YS5uZXdQYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS91c2VyL3Byb2ZpbGUnLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVwZGF0ZURhdGEpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRTdWNjZXNzKCdQcm9maWxlIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICAgICAgc2V0Q3VycmVudFBhc3N3b3JkKCcnKTtcbiAgICAgICAgICAgIHNldE5ld1Bhc3N3b3JkKCcnKTtcbiAgICAgICAgICAgIHNldENvbmZpcm1QYXNzd29yZCgnJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHNldFN1Y2Nlc3MobnVsbCksIDMwMDApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHVwZGF0aW5nIHByb2ZpbGU6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIHVwZGF0ZSBwcm9maWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBzZXRTYXZpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAoIWN1cnJlbnRBZG1pbikge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJOb3QgYXV0aGVudGljYXRlZFwiKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIkFjY291bnQgU2V0dGluZ3NcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4eGxcIiwgbWFyZ2luQm90dG9tOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiUHJvZmlsZSBJbmZvcm1hdGlvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgeyBodG1sRm9yOiBcIm5hbWVcIiB9LCBcIkZ1bGwgTmFtZVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcIm5hbWVcIiwgdmFsdWU6IG5hbWUsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0TmFtZShlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgZnVsbCBuYW1lXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiZW1haWxcIiB9LCBcIkVtYWlsIEFkZHJlc3NcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChJbnB1dCwgeyBpZDogXCJlbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIsIHZhbHVlOiBlbWFpbCwgb25DaGFuZ2U6IChlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSksIHBsYWNlaG9sZGVyOiBcIkVudGVyIHlvdXIgZW1haWxcIiB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBoYW5kbGVTYXZlUHJvZmlsZSwgZGlzYWJsZWQ6IHNhdmluZyB9LCBzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIFByb2ZpbGUnKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiQ2hhbmdlIFBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkxlYXZlIGJsYW5rIGlmIHlvdSBkb24ndCB3YW50IHRvIGNoYW5nZSB5b3VyIHBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiY3VycmVudFBhc3N3b3JkXCIgfSwgXCJDdXJyZW50IFBhc3N3b3JkXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgaWQ6IFwiY3VycmVudFBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IGN1cnJlbnRQYXNzd29yZCwgb25DaGFuZ2U6IChlKSA9PiBzZXRDdXJyZW50UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpLCBwbGFjZWhvbGRlcjogXCJFbnRlciBjdXJyZW50IHBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwibmV3UGFzc3dvcmRcIiB9LCBcIk5ldyBQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcIm5ld1Bhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiwgdmFsdWU6IG5ld1Bhc3N3b3JkLCBvbkNoYW5nZTogKGUpID0+IHNldE5ld1Bhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IFwiRW50ZXIgbmV3IHBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KExhYmVsLCB7IGh0bWxGb3I6IFwiY29uZmlybVBhc3N3b3JkXCIgfSwgXCJDb25maXJtIE5ldyBQYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBcImNvbmZpcm1QYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIsIHZhbHVlOiBjb25maXJtUGFzc3dvcmQsIG9uQ2hhbmdlOiAoZSkgPT4gc2V0Q29uZmlybVBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKSwgcGxhY2Vob2xkZXI6IFwiQ29uZmlybSBuZXcgcGFzc3dvcmRcIiB9KSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Ub3A6IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBoYW5kbGVTYXZlUHJvZmlsZSwgZGlzYWJsZWQ6IHNhdmluZyB9LCBzYXZpbmcgPyAnVXBkYXRpbmcuLi4nIDogJ1VwZGF0ZSBQYXNzd29yZCcpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwiaW5mb1wiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIsIHN0eWxlOiB7IGJhY2tncm91bmRDb2xvcjogJyNlNmY3ZmYnLCBib3JkZXJDb2xvcjogJyM5MWQ1ZmYnLCBtYXhXaWR0aDogJzYwMHB4JyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdTIxMzlcXHVGRTBGIE5vdGVcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiVG8gdXNlIHRoZSBmdWxsIHNob3BwaW5nIGZlYXR1cmVzLCB5b3UgbmVlZCB0byBhdXRoZW50aWNhdGUgdmlhIHRoZSBSRVNUIEFQSSB1c2luZyBcIixcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImNvZGVcIiwgbnVsbCwgXCIvYXBpL2F1dGgvbG9naW5cIiksXG4gICAgICAgICAgICAgICAgICAgIFwiIGVuZHBvaW50IGFuZCBzYXZlIHRoZSBKV1QgdG9rZW4uXCIpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyU2V0dGluZ3M7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgQmFkZ2UsIElucHV0LCBMYWJlbCwgRm9ybUdyb3VwLCBNZXNzYWdlQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBVc2VyUHJvZHVjdHMgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbcHJvZHVjdHMsIHNldFByb2R1Y3RzXSA9IHVzZVN0YXRlKFtdKTtcbiAgICBjb25zdCBbY2F0ZWdvcmllcywgc2V0Q2F0ZWdvcmllc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3NlbGVjdGVkQ2F0ZWdvcnksIHNldFNlbGVjdGVkQ2F0ZWdvcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3QgW3N1Y2Nlc3MsIHNldFN1Y2Nlc3NdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hDYXRlZ29yaWVzKCk7XG4gICAgICAgIGZldGNoUHJvZHVjdHMoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hDYXRlZ29yaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXRlZ29yaWVzJywge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHNldENhdGVnb3JpZXMocmVzdWx0LmRhdGEgfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhdGVnb3JpZXM6JywgZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgZmV0Y2hQcm9kdWN0cyA9IGFzeW5jIChjYXRlZ29yeUlkLCBzZWFyY2gpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSAnL2FwaS9wcm9kdWN0cz8nO1xuICAgICAgICAgICAgaWYgKGNhdGVnb3J5SWQpXG4gICAgICAgICAgICAgICAgdXJsICs9IGBjYXRlZ29yeUlkPSR7Y2F0ZWdvcnlJZH0mYDtcbiAgICAgICAgICAgIGlmIChzZWFyY2gpXG4gICAgICAgICAgICAgICAgdXJsICs9IGBzZWFyY2g9JHtlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoKX0mYDtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBzZXRQcm9kdWN0cyhyZXN1bHQuZGF0YSB8fCBbXSk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBwcm9kdWN0czonLCBlcnIpO1xuICAgICAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHByb2R1Y3RzJyk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UgPSAoY2F0ZWdvcnlJZCkgPT4ge1xuICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5KGNhdGVnb3J5SWQpO1xuICAgICAgICBmZXRjaFByb2R1Y3RzKGNhdGVnb3J5SWQsIHNlYXJjaFF1ZXJ5KTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNlYXJjaCA9ICgpID0+IHtcbiAgICAgICAgZmV0Y2hQcm9kdWN0cyhzZWxlY3RlZENhdGVnb3J5LCBzZWFyY2hRdWVyeSk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVBZGRUb0NhcnQgPSBhc3luYyAocHJvZHVjdElkLCBwcm9kdWN0TmFtZSkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0L2FkZCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcHJvZHVjdElkLCBxdWFudGl0eTogMSB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLm1lc3NhZ2UgfHwgJ0ZhaWxlZCB0byBhZGQgdG8gY2FydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0U3VjY2VzcyhgJHtwcm9kdWN0TmFtZX0gYWRkZWQgdG8gY2FydCFgKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gYWRkIHRvIGNhcnQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFjdXJyZW50QWRtaW4pIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTm90IGF1dGhlbnRpY2F0ZWRcIikpKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDIsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSwgXCJCcm93c2UgUHJvZHVjdHNcIiksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwicm93XCIsIGZsZXhXcmFwOiBcIndyYXBcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRm9ybUdyb3VwLCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyMDBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIFwiQ2F0ZWdvcnlcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIiwgeyB2YWx1ZTogc2VsZWN0ZWRDYXRlZ29yeSwgb25DaGFuZ2U6IChlKSA9PiBoYW5kbGVDYXRlZ29yeUNoYW5nZShlLnRhcmdldC52YWx1ZSksIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNkOWQ5ZDknLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IHZhbHVlOiBcIlwiIH0sIFwiQWxsIENhdGVnb3JpZXNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzLm1hcCgoY2F0KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiLCB7IGtleTogY2F0LmlkLCB2YWx1ZTogY2F0LmlkIH0sIGNhdC5uYW1lKSkpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsgZmxleDogXCIyXCIsIG1pbldpZHRoOiBcIjMwMHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgXCJTZWFyY2hcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgdmFsdWU6IHNlYXJjaFF1ZXJ5LCBvbkNoYW5nZTogKGUpID0+IHNldFNlYXJjaFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKSwgb25LZXlQcmVzczogKGUpID0+IGUua2V5ID09PSAnRW50ZXInICYmIGhhbmRsZVNlYXJjaCgpLCBwbGFjZWhvbGRlcjogXCJTZWFyY2ggcHJvZHVjdHMuLi5cIiB9KSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiZmxleC1lbmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiBoYW5kbGVTZWFyY2ggfSwgXCJTZWFyY2hcIikpKSksXG4gICAgICAgIGxvYWRpbmcgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgcHJvZHVjdHMuLi5cIikpIDogcHJvZHVjdHMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIsIHN0eWxlOiB7IHRleHRBbGlnbjogJ2NlbnRlcicgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiLCBmb250U2l6ZTogXCJsZ1wiIH0sIFwiTm8gcHJvZHVjdHMgZm91bmRcIikpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImdyaWRcIiwgc3R5bGU6IHsgZ3JpZFRlbXBsYXRlQ29sdW1uczogJ3JlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyODBweCwgMWZyKSknLCBnYXA6ICcyMHB4JyB9IH0sIHByb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGtleTogcHJvZHVjdC5pZCwgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBzdHlsZToge1xuICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzIwMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMGYwZjAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlOiBwcm9kdWN0LmltYWdlID8gYHVybCgke3Byb2R1Y3QuaW1hZ2V9KWAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIH0gfSwgIXByb2R1Y3QuaW1hZ2UgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk5vIEltYWdlXCIpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiIH0sIHByb2R1Y3QubmFtZSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBwcm9kdWN0LmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0LmNhdGVnb3J5ICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IFwiaW5mb1wiLCBzaXplOiBcInNtXCIsIHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogJzhweCcgfSB9LCBwcm9kdWN0LmNhdGVnb3J5Lm5hbWUpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4bFwiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICBOdW1iZXIocHJvZHVjdC5wcmljZSkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBwcm9kdWN0LnN0b2NrID4gMCA/ICdzdWNjZXNzJyA6ICdlcnJvcicgfSwgcHJvZHVjdC5zdG9jayA+IDAgPyBgJHtwcm9kdWN0LnN0b2NrfSBpbiBzdG9ja2AgOiAnT3V0IG9mIHN0b2NrJykpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIG9uQ2xpY2s6ICgpID0+IGhhbmRsZUFkZFRvQ2FydChwcm9kdWN0LmlkLCBwcm9kdWN0Lm5hbWUpLCBkaXNhYmxlZDogcHJvZHVjdC5zdG9jayA9PT0gMCwgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9IH0sIHByb2R1Y3Quc3RvY2sgPT09IDAgPyAnT3V0IG9mIFN0b2NrJyA6ICdBZGQgdG8gQ2FydCcpKSkpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZHVjdHM7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgVGFibGUsIFRhYmxlSGVhZCwgVGFibGVCb2R5LCBUYWJsZVJvdywgVGFibGVDZWxsLCBJbnB1dCwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgVXNlckNhcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgW2N1cnJlbnRBZG1pbl0gPSB1c2VDdXJyZW50QWRtaW4oKTtcbiAgICBjb25zdCBbY2FydEl0ZW1zLCBzZXRDYXJ0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xuICAgIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBmZXRjaENhcnQoKTtcbiAgICB9LCBbXSk7XG4gICAgY29uc3QgZmV0Y2hDYXJ0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIGNhcnQgd2l0aCBjcmVkZW50aWFscy4uLicpO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jYXJ0Jywge1xuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYXJ0IHJlc3BvbnNlIHN0YXR1czonLCByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoeyBtZXNzYWdlOiAnRmFpbGVkIHRvIGZldGNoIGNhcnQnIH0pKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDYXJ0IGZldGNoIGVycm9yOicsIGVycm9yRGF0YSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8IGBGYWlsZWQgdG8gZmV0Y2ggY2FydCAoJHtyZXNwb25zZS5zdGF0dXN9KWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhcnQgZGF0YSByZWNlaXZlZDonLCByZXN1bHQpO1xuICAgICAgICAgICAgc2V0Q2FydEl0ZW1zKHJlc3VsdC5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgIHNldFRvdGFsKHBhcnNlRmxvYXQocmVzdWx0LnRvdGFsKSB8fCAwKTtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhcnQ6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGxvYWQgY2FydCcpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHVwZGF0ZVF1YW50aXR5ID0gYXN5bmMgKGNhcnRJdGVtSWQsIG5ld1F1YW50aXR5KSA9PiB7XG4gICAgICAgIGlmIChuZXdRdWFudGl0eSA8IDEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2NhcnQvJHtjYXJ0SXRlbUlkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBxdWFudGl0eTogbmV3UXVhbnRpdHkgfSksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yRGF0YS5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gdXBkYXRlIHF1YW50aXR5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmZXRjaENhcnQoKTtcbiAgICAgICAgICAgIHNldFN1Y2Nlc3MoJ1F1YW50aXR5IHVwZGF0ZWQnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U3VjY2VzcyhudWxsKSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgc2V0RXJyb3IoZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdGYWlsZWQgdG8gdXBkYXRlIHF1YW50aXR5Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlbW92ZUl0ZW0gPSBhc3luYyAoY2FydEl0ZW1JZCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9jYXJ0LyR7Y2FydEl0ZW1JZH1gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gcmVtb3ZlIGl0ZW0nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZldGNoQ2FydCgpO1xuICAgICAgICAgICAgc2V0U3VjY2VzcygnSXRlbSByZW1vdmVkIGZyb20gY2FydCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdWNjZXNzKG51bGwpLCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzZXRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byByZW1vdmUgaXRlbScpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBjbGVhckNhcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIHlvdXIgY2FydD8nKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvY2FydCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBjbGVhciBjYXJ0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmZXRjaENhcnQoKTtcbiAgICAgICAgICAgIHNldFN1Y2Nlc3MoJ0NhcnQgY2xlYXJlZCcpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdWNjZXNzKG51bGwpLCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzZXRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBjbGVhciBjYXJ0Jyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmICghY3VycmVudEFkbWluKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIk5vdCBhdXRoZW50aWNhdGVkXCIpKSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgbnVsbCwgXCJTaG9wcGluZyBDYXJ0XCIpLFxuICAgICAgICAgICAgY2FydEl0ZW1zLmxlbmd0aCA+IDAgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwidGV4dFwiLCBvbkNsaWNrOiBjbGVhckNhcnQgfSwgXCJDbGVhciBDYXJ0XCIpKSksXG4gICAgICAgIGVycm9yICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KE1lc3NhZ2VCb3gsIHsgbWVzc2FnZTogZXJyb3IsIHZhcmlhbnQ6IFwiZGFuZ2VyXCIsIG9uQ2xvc2U6ICgpID0+IHNldEVycm9yKG51bGwpIH0pKSxcbiAgICAgICAgc3VjY2VzcyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IHN1Y2Nlc3MsIHZhcmlhbnQ6IFwic3VjY2Vzc1wiLCBvbkNsb3NlOiAoKSA9PiBzZXRTdWNjZXNzKG51bGwpIH0pKSxcbiAgICAgICAgbG9hZGluZyA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTG9hZGluZyBjYXJ0Li4uXCIpKSA6IGNhcnRJdGVtcy5sZW5ndGggPT09IDAgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiwgc3R5bGU6IHsgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTYwXCIsIGZvbnRTaXplOiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiWW91ciBjYXJ0IGlzIGVtcHR5XCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiU3RhcnQgYnJvd3NpbmcgcHJvZHVjdHMgdG8gYWRkIGl0ZW1zIHRvIHlvdXIgY2FydCFcIikpKSA6IChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwieGxcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVIZWFkLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJQcm9kdWN0XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlByaWNlXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlF1YW50aXR5XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlRvdGFsXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIkFjdGlvbnNcIikpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHksIG51bGwsIGNhcnRJdGVtcy5tYXAoKGl0ZW0pID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogaXRlbS5pZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzYwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmMGYwZjAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGl0ZW0ucHJvZHVjdC5pbWFnZSA/IGB1cmwoJHtpdGVtLnByb2R1Y3QuaW1hZ2V9KWAgOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBpdGVtLnByb2R1Y3QubmFtZSkpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihpdGVtLnByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBhbGlnbkl0ZW1zOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHVwZGF0ZVF1YW50aXR5KGl0ZW0uaWQsIGl0ZW0ucXVhbnRpdHkgLSAxKSwgZGlzYWJsZWQ6IGl0ZW0ucXVhbnRpdHkgPD0gMSB9LCBcIi1cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXQsIHsgdmFsdWU6IGl0ZW0ucXVhbnRpdHksIG9uQ2hhbmdlOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVF1YW50aXR5KGl0ZW0uaWQsIHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0eXBlOiBcIm51bWJlclwiLCBtaW46IFwiMVwiLCBtYXg6IGl0ZW0ucHJvZHVjdC5zdG9jaywgc3R5bGU6IHsgd2lkdGg6ICc2MHB4JywgbWFyZ2luOiAnMCA4cHgnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHVwZGF0ZVF1YW50aXR5KGl0ZW0uaWQsIGl0ZW0ucXVhbnRpdHkgKyAxKSwgZGlzYWJsZWQ6IGl0ZW0ucXVhbnRpdHkgPj0gaXRlbS5wcm9kdWN0LnN0b2NrIH0sIFwiK1wiKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIoaXRlbS5pdGVtVG90YWwpLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHNpemU6IFwic21cIiwgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHJlbW92ZUl0ZW0oaXRlbS5pZCkgfSwgXCJSZW1vdmVcIikpKSkpKSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiLCBzdHlsZTogeyBtYXhXaWR0aDogJzQwMHB4JywgbWFyZ2luTGVmdDogJ2F1dG8nIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiQ2FydCBTdW1tYXJ5XCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIG1hcmdpbkJvdHRvbTogXCJtZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJTdWJ0b3RhbDpcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luQm90dG9tOiBcImxnXCIsIHBhZGRpbmdUb3A6IFwibGdcIiwgc3R5bGU6IHsgYm9yZGVyVG9wOiAnMnB4IHNvbGlkICNmMGYwZjAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcImxnXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiVG90YWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwibGdcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInByaW1hcnkxMDBcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJwcmltYXJ5XCIsIHN0eWxlOiB7IHdpZHRoOiAnMTAwJScgfSwgb25DbGljazogKCkgPT4gd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnIy9hZG1pbi9wYWdlcy9jaGVja291dCcgfSwgXCJQcm9jZWVkIHRvIENoZWNrb3V0XCIpKSkpKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgVXNlckNhcnQ7XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZUN1cnJlbnRBZG1pbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IHsgQm94LCBIMiwgSDUsIFRleHQsIEJ1dHRvbiwgTWVzc2FnZUJveCwgQmFkZ2UgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmNvbnN0IFVzZXJDaGVja291dCA9ICgpID0+IHtcbiAgICBjb25zdCBbY3VycmVudEFkbWluXSA9IHVzZUN1cnJlbnRBZG1pbigpO1xuICAgIGNvbnN0IFtjYXJ0SXRlbXMsIHNldENhcnRJdGVtc10gPSB1c2VTdGF0ZShbXSk7XG4gICAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgICBjb25zdCBbcGxhY2luZywgc2V0UGxhY2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW29yZGVySWQsIHNldE9yZGVySWRdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hDYXJ0KCk7XG4gICAgfSwgW10pO1xuICAgIGNvbnN0IGZldGNoQ2FydCA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2V0TG9hZGluZyh0cnVlKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvY2FydCcsIHtcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggY2FydCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgc2V0Q2FydEl0ZW1zKHJlc3VsdC5kYXRhIHx8IFtdKTtcbiAgICAgICAgICAgIHNldFRvdGFsKHBhcnNlRmxvYXQocmVzdWx0LnRvdGFsKSB8fCAwKTtcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGNhcnQ6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGxvYWQgY2FydCcpO1xuICAgICAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHBsYWNlT3JkZXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldFBsYWNpbmcodHJ1ZSk7XG4gICAgICAgIHNldEVycm9yKG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9jaGVja291dCcsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckRhdGEubWVzc2FnZSB8fCAnRmFpbGVkIHRvIHBsYWNlIG9yZGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICBzZXRPcmRlcklkKHJlc3VsdC5kYXRhLmlkKTtcbiAgICAgICAgICAgIHNldFN1Y2Nlc3ModHJ1ZSk7XG4gICAgICAgICAgICBzZXRQbGFjaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwbGFjaW5nIG9yZGVyOicsIGVycik7XG4gICAgICAgICAgICBzZXRFcnJvcihlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0ZhaWxlZCB0byBwbGFjZSBvcmRlcicpO1xuICAgICAgICAgICAgc2V0UGxhY2luZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmICghY3VycmVudEFkbWluKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIk5vdCBhdXRoZW50aWNhdGVkXCIpKSk7XG4gICAgfVxuICAgIGlmIChzdWNjZXNzICYmIG9yZGVySWQpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInLCBtYXhXaWR0aDogJzYwMHB4JywgbWFyZ2luOiAnMCBhdXRvJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInh4bFwiLCBzdHlsZTogeyBmb250U2l6ZTogJzQ4cHgnIH0gfSwgXCJcXHUyNzEzXCIpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEgyLCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBjb2xvcjogXCJzdWNjZXNzXCIgfSwgXCJPcmRlciBQbGFjZWQgU3VjY2Vzc2Z1bGx5IVwiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJZb3VyIG9yZGVyIFwiLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJhZGdlLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBcIiNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVySWQpLFxuICAgICAgICAgICAgICAgICAgICBcIiBoYXMgYmVlbiBjb25maXJtZWQuXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieGxcIiwgbWFyZ2luQm90dG9tOiBcInhsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIldoYXQncyBOZXh0P1wiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdTIwMjIgWW91IHdpbGwgcmVjZWl2ZSBhbiBvcmRlciBjb25maXJtYXRpb24gZW1haWwgc2hvcnRseVwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk4MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBcIlxcdTIwMjIgVHJhY2sgeW91ciBvcmRlciBzdGF0dXMgaW4geW91ciBkYXNoYm9hcmRcIiksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5ODBcIiB9LCBcIlxcdTIwMjIgV2UnbGwgbm90aWZ5IHlvdSB3aGVuIHlvdXIgb3JkZXIgc2hpcHNcIikpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJjZW50ZXJcIiwgc3R5bGU6IHsgZ2FwOiAnMTJweCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjL2FkbWluJyB9LCBcIkdvIHRvIERhc2hib2FyZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgdmFyaWFudDogXCJ0ZXh0XCIsIG9uQ2xpY2s6ICgpID0+IHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyMvYWRtaW4vcGFnZXMvcHJvZHVjdHMnIH0sIFwiQ29udGludWUgU2hvcHBpbmdcIikpKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIkNoZWNrb3V0XCIpLFxuICAgICAgICBlcnJvciAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IGVycm9yLCB2YXJpYW50OiBcImRhbmdlclwiLCBvbkNsb3NlOiAoKSA9PiBzZXRFcnJvcihudWxsKSB9KSksXG4gICAgICAgIGxvYWRpbmcgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIkxvYWRpbmcgY2hlY2tvdXQuLi5cIikpIDogY2FydEl0ZW1zLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiLCBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiwgZm9udFNpemU6IFwibGdcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJZb3VyIGNhcnQgaXMgZW1wdHlcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjL2FkbWluL3BhZ2VzL3Byb2R1Y3RzJyB9LCBcIkJyb3dzZSBQcm9kdWN0c1wiKSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLCBmbGV4V3JhcDogXCJ3cmFwXCIsIHN0eWxlOiB7IGdhcDogJzI0cHgnIH0gfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIzMDBweFwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJPcmRlciBTdW1tYXJ5XCIpLFxuICAgICAgICAgICAgICAgICAgICBjYXJ0SXRlbXMubWFwKChpdGVtKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsga2V5OiBpdGVtLmlkLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZ0JvdHRvbTogXCJsZ1wiLCBzdHlsZTogeyBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2YwZjBmMCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgaXRlbS5wcm9kdWN0Lm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlcihpdGVtLnByb2R1Y3QucHJpY2UpLnRvRml4ZWQoMikpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJRdWFudGl0eTogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucXVhbnRpdHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKGl0ZW0uaXRlbVRvdGFsKS50b0ZpeGVkKDIpKSkpKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJsZ1wiLCBwYWRkaW5nVG9wOiBcImxnXCIsIHN0eWxlOiB7IGJvcmRlclRvcDogJzJweCBzb2xpZCAjZjBmMGYwJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJTdWJ0b3RhbDpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwudG9GaXhlZCgyKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIiwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiVGF4IChlc3RpbWF0ZWQpOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG90YWwgKiAwLjA4KS50b0ZpeGVkKDIpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYmV0d2VlblwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJTaGlwcGluZzpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCBudWxsLCBcIiQ5Ljk5XCIpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGRpc3BsYXk6IFwiZmxleFwiLCBqdXN0aWZ5Q29udGVudDogXCJzcGFjZS1iZXR3ZWVuXCIsIG1hcmdpblRvcDogXCJsZ1wiLCBwYWRkaW5nVG9wOiBcImxnXCIsIHN0eWxlOiB7IGJvcmRlclRvcDogJzJweCBzb2xpZCAjZjBmMGYwJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcImxnXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiVG90YWw6XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJsZ1wiLCBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwicHJpbWFyeTEwMFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodG90YWwgKyB0b3RhbCAqIDAuMDggKyA5Ljk5KS50b0ZpeGVkKDIpKSkpKSksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBmbGV4OiBcIjFcIiwgbWluV2lkdGg6IFwiMzAwcHhcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieGxcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkN1c3RvbWVyIEluZm9ybWF0aW9uXCIpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBtYXJnaW5Cb3R0b206IFwibWRcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIFwiTmFtZTpcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgY29sb3I6IFwiZ3JleTgwXCIgfSwgY3VycmVudEFkbWluLm5hbWUpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcIm1kXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiB9LCBcIkVtYWlsOlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5ODBcIiB9LCBjdXJyZW50QWRtaW4uZW1haWwpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwid2hpdGVcIiwgYm9yZGVyOiBcImRlZmF1bHRcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgcGFkZGluZzogXCJ4bFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSDUsIHsgbWFyZ2luQm90dG9tOiBcImxnXCIgfSwgXCJQYXltZW50IE1ldGhvZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwiZ3JleTIwXCIsIHBhZGRpbmc6IFwibGdcIiwgYm9yZGVyUmFkaXVzOiBcImRlZmF1bHRcIiwgbWFyZ2luQm90dG9tOiBcImxnXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiwgc3R5bGU6IHsgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sIFwiUGF5bWVudCBwcm9jZXNzaW5nIGlzIHNpbXVsYXRlZFwiKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IHZhcmlhbnQ6IFwicHJpbWFyeVwiLCBvbkNsaWNrOiBwbGFjZU9yZGVyLCBkaXNhYmxlZDogcGxhY2luZywgc3R5bGU6IHsgd2lkdGg6ICcxMDAlJyB9IH0sIHBsYWNpbmcgPyAnUGxhY2luZyBPcmRlci4uLicgOiAnUGxhY2UgT3JkZXInKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Ub3A6IFwibWRcIiwgc3R5bGU6IHsgdGV4dEFsaWduOiAnY2VudGVyJyB9IH0sIFwiQnkgcGxhY2luZyB0aGlzIG9yZGVyLCB5b3UgYWdyZWUgdG8gb3VyIHRlcm1zIGFuZCBjb25kaXRpb25zXCIpKSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IFVzZXJDaGVja291dDtcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEFkbWluRGFzaGJvYXJkIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9BZG1pbkRhc2hib2FyZCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQWRtaW5EYXNoYm9hcmQgPSBBZG1pbkRhc2hib2FyZFxuaW1wb3J0IFJvbGVEYXNoYm9hcmQgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1JvbGVEYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlJvbGVEYXNoYm9hcmQgPSBSb2xlRGFzaGJvYXJkXG5pbXBvcnQgU2V0dGluZ3NQYWdlIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9TZXR0aW5nc1BhZ2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlNldHRpbmdzUGFnZSA9IFNldHRpbmdzUGFnZVxuaW1wb3J0IFVzZXJTZXR0aW5ncyBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvVXNlclNldHRpbmdzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Vc2VyU2V0dGluZ3MgPSBVc2VyU2V0dGluZ3NcbmltcG9ydCBVc2VyUHJvZHVjdHMgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJQcm9kdWN0cydcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXNlclByb2R1Y3RzID0gVXNlclByb2R1Y3RzXG5pbXBvcnQgVXNlckNhcnQgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1VzZXJDYXJ0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Vc2VyQ2FydCA9IFVzZXJDYXJ0XG5pbXBvcnQgVXNlckNoZWNrb3V0IGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9Vc2VyQ2hlY2tvdXQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVzZXJDaGVja291dCA9IFVzZXJDaGVja291dCJdLCJuYW1lcyI6WyJBZG1pbkRhc2hib2FyZCIsInN0YXRzIiwic2V0U3RhdHMiLCJ1c2VTdGF0ZSIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsInVzZUVmZmVjdCIsImZldGNoRGFzaGJvYXJkU3RhdHMiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImNyZWRlbnRpYWxzIiwib2siLCJFcnJvciIsInJlc3VsdCIsImpzb24iLCJkYXRhIiwiZXJyIiwiY29uc29sZSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsIkJveCIsInBhZGRpbmciLCJUZXh0IiwiY29sb3IiLCJIMiIsIm1hcmdpbkJvdHRvbSIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiZmxleFdyYXAiLCJmbGV4IiwibWluV2lkdGgiLCJtYXJnaW5SaWdodCIsImJnIiwiYm9yZGVyIiwiYm9yZGVyUmFkaXVzIiwic3R5bGUiLCJib3hTaGFkb3ciLCJINSIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsInRvdGFsVXNlcnMiLCJ0b3RhbE9yZGVycyIsIk51bWJlciIsInRvdGFsUmV2ZW51ZSIsInRvRml4ZWQiLCJyZWNlbnRPcmRlcnMiLCJsZW5ndGgiLCJUYWJsZSIsIlRhYmxlSGVhZCIsIlRhYmxlUm93IiwiVGFibGVDZWxsIiwiVGFibGVCb2R5IiwibWFwIiwib3JkZXIiLCJrZXkiLCJpZCIsInVzZXJJZCIsInN0YXR1cyIsInRvdGFsQW1vdW50IiwiRGF0ZSIsImNyZWF0ZWRBdCIsInRvTG9jYWxlRGF0ZVN0cmluZyIsImxvd1N0b2NrUHJvZHVjdHMiLCJwcm9kdWN0IiwibmFtZSIsInN0b2NrIiwicHJpY2UiLCJSb2xlRGFzaGJvYXJkIiwiY3VycmVudEFkbWluIiwidXNlQ3VycmVudEFkbWluIiwiaXNBZG1pbiIsInJvbGUiLCJmZXRjaFN0YXRzIiwiZW5kcG9pbnQiLCJlcnJvckRhdGEiLCJjYXRjaCIsIm1lc3NhZ2UiLCJnZXRTdGF0dXNDb2xvciIsIkJhZGdlIiwidmFyaWFudCIsInRvVXBwZXJDYXNlIiwiZW1haWwiLCJwZW5kaW5nT3JkZXJzIiwiY29tcGxldGVkT3JkZXJzIiwidG90YWxTcGVudCIsInRleHRBbGlnbiIsIm1hcmdpblRvcCIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwiU2V0dGluZ3NQYWdlIiwic2V0dGluZ3MiLCJzZXRTZXR0aW5ncyIsInNhdmluZyIsInNldFNhdmluZyIsInN1Y2Nlc3MiLCJzZXRTdWNjZXNzIiwic2V0dGluZ3NDb25maWciLCJsYWJlbCIsImRlc2NyaXB0aW9uIiwiZmV0Y2hTZXR0aW5ncyIsInNldHRpbmdzTWFwIiwiZm9yRWFjaCIsInNldHRpbmciLCJ2YWx1ZSIsImhhbmRsZUlucHV0Q2hhbmdlIiwicHJldiIsImhhbmRsZVNhdmUiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInNldFRpbWVvdXQiLCJNZXNzYWdlQm94Iiwib25DbG9zZSIsIm1heFdpZHRoIiwiY29uZmlnIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJodG1sRm9yIiwiSW5wdXQiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsInRvTG93ZXJDYXNlIiwianVzdGlmeUNvbnRlbnQiLCJCdXR0b24iLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJVc2VyU2V0dGluZ3MiLCJzZXROYW1lIiwic2V0RW1haWwiLCJjdXJyZW50UGFzc3dvcmQiLCJzZXRDdXJyZW50UGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsInNldE5ld1Bhc3N3b3JkIiwiY29uZmlybVBhc3N3b3JkIiwic2V0Q29uZmlybVBhc3N3b3JkIiwiaGFuZGxlU2F2ZVByb2ZpbGUiLCJ1cGRhdGVEYXRhIiwidHlwZSIsIlVzZXJQcm9kdWN0cyIsInByb2R1Y3RzIiwic2V0UHJvZHVjdHMiLCJjYXRlZ29yaWVzIiwic2V0Q2F0ZWdvcmllcyIsInNlbGVjdGVkQ2F0ZWdvcnkiLCJzZXRTZWxlY3RlZENhdGVnb3J5Iiwic2VhcmNoUXVlcnkiLCJzZXRTZWFyY2hRdWVyeSIsImZldGNoQ2F0ZWdvcmllcyIsImZldGNoUHJvZHVjdHMiLCJjYXRlZ29yeUlkIiwic2VhcmNoIiwidXJsIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiaGFuZGxlQ2F0ZWdvcnlDaGFuZ2UiLCJoYW5kbGVTZWFyY2giLCJoYW5kbGVBZGRUb0NhcnQiLCJwcm9kdWN0SWQiLCJwcm9kdWN0TmFtZSIsInF1YW50aXR5Iiwid2lkdGgiLCJjYXQiLCJvbktleVByZXNzIiwiYWxpZ25JdGVtcyIsImdyaWRUZW1wbGF0ZUNvbHVtbnMiLCJnYXAiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZSIsImJhY2tncm91bmRTaXplIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiY2F0ZWdvcnkiLCJzaXplIiwiVXNlckNhcnQiLCJjYXJ0SXRlbXMiLCJzZXRDYXJ0SXRlbXMiLCJ0b3RhbCIsInNldFRvdGFsIiwiZmV0Y2hDYXJ0IiwibG9nIiwicGFyc2VGbG9hdCIsInVwZGF0ZVF1YW50aXR5IiwiY2FydEl0ZW1JZCIsIm5ld1F1YW50aXR5IiwicmVtb3ZlSXRlbSIsImNsZWFyQ2FydCIsImNvbmZpcm0iLCJGcmFnbWVudCIsIml0ZW0iLCJ2YWwiLCJwYXJzZUludCIsIm1pbiIsIm1heCIsIm1hcmdpbiIsIml0ZW1Ub3RhbCIsIm1hcmdpbkxlZnQiLCJwYWRkaW5nVG9wIiwiYm9yZGVyVG9wIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiVXNlckNoZWNrb3V0IiwicGxhY2luZyIsInNldFBsYWNpbmciLCJvcmRlcklkIiwic2V0T3JkZXJJZCIsInBsYWNlT3JkZXIiLCJwYWRkaW5nQm90dG9tIiwiYm9yZGVyQm90dG9tIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0lBRUEsTUFBTUEsY0FBYyxHQUFHQSxNQUFNO01BQ3pCLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFQyxRQUFRLENBQUMsR0FBR0Ms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
