(function (React, designSystem) {
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

    AdminJS.UserComponents = {};
    AdminJS.UserComponents.AdminDashboard = AdminDashboard;
    AdminJS.UserComponents.SettingsPage = SettingsPage;

})(React, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvQWRtaW5EYXNoYm9hcmQuanMiLCIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvU2V0dGluZ3NQYWdlLmpzIiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEgyLCBINSwgVGV4dCwgVGFibGUsIFRhYmxlSGVhZCwgVGFibGVCb2R5LCBUYWJsZVJvdywgVGFibGVDZWxsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5jb25zdCBBZG1pbkRhc2hib2FyZCA9ICgpID0+IHtcbiAgICBjb25zdCBbc3RhdHMsIHNldFN0YXRzXSA9IHVzZVN0YXRlKG51bGwpO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUobnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgZmV0Y2hEYXNoYm9hcmRTdGF0cyA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9kYXNoYm9hcmQvc3RhdHMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBkYXNoYm9hcmQgc3RhdHMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIHNldFN0YXRzKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBkYXNoYm9hcmQgc3RhdHM6JywgZXJyKTtcbiAgICAgICAgICAgICAgICBzZXRFcnJvcignRmFpbGVkIHRvIGxvYWQgZGFzaGJvYXJkIHN0YXRpc3RpY3MnKTtcbiAgICAgICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZmV0Y2hEYXNoYm9hcmRTdGF0cygpO1xuICAgIH0sIFtdKTtcbiAgICBpZiAobG9hZGluZykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgbnVsbCwgXCJMb2FkaW5nIGRhc2hib2FyZC4uLlwiKSkpO1xuICAgIH1cbiAgICBpZiAoZXJyb3IgfHwgIXN0YXRzKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImVycm9yXCIgfSwgZXJyb3IgfHwgJ0ZhaWxlZCB0byBsb2FkIGRhc2hib2FyZCcpKSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgcGFkZGluZzogXCJ4eGxcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEgyLCB7IG1hcmdpbkJvdHRvbTogXCJ4bFwiIH0sIFwiQWRtaW4gRGFzaGJvYXJkXCIpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJyb3dcIiwgbWFyZ2luQm90dG9tOiBcInh4bFwiLCBmbGV4V3JhcDogXCJ3cmFwXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyNTBweFwiLCBtYXJnaW5SaWdodDogXCJsZ1wiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJUb3RhbCBVc2Vyc1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxVc2VycykpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgZmxleDogXCIxXCIsIG1pbldpZHRoOiBcIjI1MHB4XCIsIG1hcmdpblJpZ2h0OiBcImxnXCIsIG1hcmdpbkJvdHRvbTogXCJsZ1wiLCBwYWRkaW5nOiBcInhsXCIsIGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHN0eWxlOiB7IGJveFNoYWRvdzogJzAgMnB4IDRweCByZ2JhKDAsMCwwLDAuMSknIH0gfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJzbVwiLCBjb2xvcjogXCJncmV5NjBcIiB9LCBcIlRvdGFsIE9yZGVyc1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFNpemU6IFwieHhsXCIsIGZvbnRXZWlnaHQ6IFwiYm9sZFwiLCBjb2xvcjogXCJwcmltYXJ5MTAwXCIgfSwgc3RhdHMudG90YWxPcmRlcnMpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGZsZXg6IFwiMVwiLCBtaW5XaWR0aDogXCIyNTBweFwiLCBtYXJnaW5Cb3R0b206IFwibGdcIiwgcGFkZGluZzogXCJ4bFwiLCBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBzdHlsZTogeyBib3hTaGFkb3c6ICcwIDJweCA0cHggcmdiYSgwLDAsMCwwLjEpJyB9IH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwic21cIiwgY29sb3I6IFwiZ3JleTYwXCIgfSwgXCJUb3RhbCBSZXZlbnVlXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250U2l6ZTogXCJ4eGxcIiwgZm9udFdlaWdodDogXCJib2xkXCIsIGNvbG9yOiBcInN1Y2Nlc3NcIiB9LFxuICAgICAgICAgICAgICAgICAgICBcIiRcIixcbiAgICAgICAgICAgICAgICAgICAgTnVtYmVyKHN0YXRzLnRvdGFsUmV2ZW51ZSkudG9GaXhlZCgyKSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luQm90dG9tOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiUmVjZW50IE9yZGVyc1wiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiB9LCBzdGF0cy5yZWNlbnRPcmRlcnMubGVuZ3RoID09PSAwID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5NjBcIiB9LCBcIk5vIHJlY2VudCBvcmRlcnNcIikpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJPcmRlciBJRFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlVzZXIgSURcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJTdGF0dXNcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJBbW91bnRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJEYXRlXCIpKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUJvZHksIG51bGwsIHN0YXRzLnJlY2VudE9yZGVycy5tYXAoKG9yZGVyKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZVJvdywgeyBrZXk6IG9yZGVyLmlkIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBvcmRlci5pZCksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBvcmRlci51c2VySWQpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IG9yZGVyLnN0YXR1cyA9PT0gJ2RlbGl2ZXJlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnc3VjY2VzcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBvcmRlci5zdGF0dXMgPT09ICdjYW5jZWxsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdlcnJvcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3ByaW1hcnkxMDAnIH0sIG9yZGVyLnN0YXR1cykpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyKG9yZGVyLnRvdGFsQW1vdW50KS50b0ZpeGVkKDIpKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIG5ldyBEYXRlKG9yZGVyLmNyZWF0ZWRBdCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkpKSkpKSkpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChINSwgeyBtYXJnaW5Cb3R0b206IFwibGdcIiB9LCBcIkxvdyBTdG9jayBQcm9kdWN0cyAoU3RvY2sgPCAxMClcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBiZzogXCJ3aGl0ZVwiLCBib3JkZXI6IFwiZGVmYXVsdFwiLCBib3JkZXJSYWRpdXM6IFwiZGVmYXVsdFwiLCBwYWRkaW5nOiBcImxnXCIgfSwgc3RhdHMubG93U3RvY2tQcm9kdWN0cy5sZW5ndGggPT09IDAgPyAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGNvbG9yOiBcImdyZXk2MFwiIH0sIFwiQWxsIHByb2R1Y3RzIGFyZSB3ZWxsIHN0b2NrZWRcIikpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGUsIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUhlYWQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVSb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgXCJQcm9kdWN0IElEXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiTmFtZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBcIlN0b2NrXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUYWJsZUNlbGwsIG51bGwsIFwiUHJpY2VcIikpKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQm9keSwgbnVsbCwgc3RhdHMubG93U3RvY2tQcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlUm93LCB7IGtleTogcHJvZHVjdC5pZCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCwgcHJvZHVjdC5pZCksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLCBwcm9kdWN0Lm5hbWUpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRhYmxlQ2VsbCwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBmb250V2VpZ2h0OiBcImJvbGRcIiwgY29sb3I6IFwiZXJyb3JcIiB9LCBwcm9kdWN0LnN0b2NrKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGFibGVDZWxsLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIocHJvZHVjdC5wcmljZSkudG9GaXhlZCgyKSkpKSkpKSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEFkbWluRGFzaGJvYXJkO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb3gsIEgyLCBINSwgVGV4dCwgSW5wdXQsIEJ1dHRvbiwgRm9ybUdyb3VwLCBMYWJlbCwgTWVzc2FnZUJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nO1xuY29uc3QgU2V0dGluZ3NQYWdlID0gKCkgPT4ge1xuICAgIGNvbnN0IFtzZXR0aW5ncywgc2V0U2V0dGluZ3NdID0gdXNlU3RhdGUoe30pO1xuICAgIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICAgIGNvbnN0IFtzYXZpbmcsIHNldFNhdmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Vycm9yLCBzZXRFcnJvcl0gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBbc3VjY2Vzcywgc2V0U3VjY2Vzc10gPSB1c2VTdGF0ZShudWxsKTtcbiAgICBjb25zdCBzZXR0aW5nc0NvbmZpZyA9IFtcbiAgICAgICAgeyBrZXk6ICdzaXRlX25hbWUnLCBsYWJlbDogJ1NpdGUgTmFtZScsIGRlc2NyaXB0aW9uOiAnVGhlIG5hbWUgb2YgeW91ciBlQ29tbWVyY2Ugc3RvcmUnIH0sXG4gICAgICAgIHsga2V5OiAnY3VycmVuY3knLCBsYWJlbDogJ0N1cnJlbmN5JywgZGVzY3JpcHRpb246ICdEZWZhdWx0IGN1cnJlbmN5IChlLmcuLCBVU0QsIEVVUiwgR0JQKScgfSxcbiAgICAgICAgeyBrZXk6ICd0YXhfcmF0ZScsIGxhYmVsOiAnVGF4IFJhdGUgKCUpJywgZGVzY3JpcHRpb246ICdEZWZhdWx0IHRheCByYXRlIHBlcmNlbnRhZ2UnIH0sXG4gICAgICAgIHsga2V5OiAnc2hpcHBpbmdfY29zdCcsIGxhYmVsOiAnU2hpcHBpbmcgQ29zdCcsIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBzaGlwcGluZyBjb3N0JyB9LFxuICAgICAgICB7IGtleTogJ2NvbnRhY3RfZW1haWwnLCBsYWJlbDogJ0NvbnRhY3QgRW1haWwnLCBkZXNjcmlwdGlvbjogJ0N1c3RvbWVyIHN1cHBvcnQgZW1haWwgYWRkcmVzcycgfSxcbiAgICAgICAgeyBrZXk6ICdtaW5fb3JkZXJfYW1vdW50JywgbGFiZWw6ICdNaW5pbXVtIE9yZGVyIEFtb3VudCcsIGRlc2NyaXB0aW9uOiAnTWluaW11bSBvcmRlciBhbW91bnQgZm9yIGNoZWNrb3V0JyB9LFxuICAgIF07XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgZmV0Y2hTZXR0aW5ncygpO1xuICAgIH0sIFtdKTtcbiAgICBjb25zdCBmZXRjaFNldHRpbmdzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9zZXR0aW5ncycsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBzZXR0aW5ncycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3NNYXAgPSB7fTtcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhLmZvckVhY2goKHNldHRpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBzZXR0aW5nc01hcFtzZXR0aW5nLmtleV0gPSBzZXR0aW5nLnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRTZXR0aW5ncyhzZXR0aW5nc01hcCk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBzZXR0aW5nczonLCBlcnIpO1xuICAgICAgICAgICAgc2V0RXJyb3IoJ0ZhaWxlZCB0byBsb2FkIHNldHRpbmdzJyk7XG4gICAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaGFuZGxlSW5wdXRDaGFuZ2UgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBzZXRTZXR0aW5ncygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBba2V5XTogdmFsdWUsXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVNhdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldFNhdmluZyh0cnVlKTtcbiAgICAgICAgc2V0RXJyb3IobnVsbCk7XG4gICAgICAgIHNldFN1Y2Nlc3MobnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL3NldHRpbmdzJywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHNldHRpbmdzIH0pLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gc2F2ZSBzZXR0aW5ncycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0U3VjY2VzcygnU2V0dGluZ3Mgc2F2ZWQgc3VjY2Vzc2Z1bGx5IScpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRTdWNjZXNzKG51bGwpLCAzMDAwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgc2V0dGluZ3M6JywgZXJyKTtcbiAgICAgICAgICAgIHNldEVycm9yKCdGYWlsZWQgdG8gc2F2ZSBzZXR0aW5ncycpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgc2V0U2F2aW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgeyBwYWRkaW5nOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIG51bGwsIFwiTG9hZGluZyBzZXR0aW5ncy4uLlwiKSkpO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IHBhZGRpbmc6IFwieHhsXCIgfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIMiwgeyBtYXJnaW5Cb3R0b206IFwieGxcIiB9LCBcIlNldHRpbmdzXCIpLFxuICAgICAgICBlcnJvciAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChNZXNzYWdlQm94LCB7IG1lc3NhZ2U6IGVycm9yLCB2YXJpYW50OiBcImRhbmdlclwiLCBvbkNsb3NlOiAoKSA9PiBzZXRFcnJvcihudWxsKSB9KSksXG4gICAgICAgIHN1Y2Nlc3MgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTWVzc2FnZUJveCwgeyBtZXNzYWdlOiBzdWNjZXNzLCB2YXJpYW50OiBcInN1Y2Nlc3NcIiwgb25DbG9zZTogKCkgPT4gc2V0U3VjY2VzcyhudWxsKSB9KSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGJnOiBcIndoaXRlXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwieHhsXCIsIHN0eWxlOiB7IG1heFdpZHRoOiAnODAwcHgnIH0gfSxcbiAgICAgICAgICAgIHNldHRpbmdzQ29uZmlnLm1hcCgoY29uZmlnKSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIHsga2V5OiBjb25maWcua2V5LCBtYXJnaW5Cb3R0b206IFwibGdcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIHsgaHRtbEZvcjogY29uZmlnLmtleSB9LCBjb25maWcubGFiZWwpLFxuICAgICAgICAgICAgICAgIGNvbmZpZy5kZXNjcmlwdGlvbiAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0LCB7IGZvbnRTaXplOiBcInNtXCIsIGNvbG9yOiBcImdyZXk2MFwiLCBtYXJnaW5Cb3R0b206IFwic21cIiB9LCBjb25maWcuZGVzY3JpcHRpb24pKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KElucHV0LCB7IGlkOiBjb25maWcua2V5LCB2YWx1ZTogc2V0dGluZ3NbY29uZmlnLmtleV0gfHwgJycsIG9uQ2hhbmdlOiAoZSkgPT4gaGFuZGxlSW5wdXRDaGFuZ2UoY29uZmlnLmtleSwgZS50YXJnZXQudmFsdWUpLCBwbGFjZWhvbGRlcjogYEVudGVyICR7Y29uZmlnLmxhYmVsLnRvTG93ZXJDYXNlKCl9YCB9KSkpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IG1hcmdpblRvcDogXCJ4eGxcIiwgZGlzcGxheTogXCJmbGV4XCIsIGp1c3RpZnlDb250ZW50OiBcImZsZXgtZW5kXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyB2YXJpYW50OiBcInByaW1hcnlcIiwgb25DbGljazogaGFuZGxlU2F2ZSwgZGlzYWJsZWQ6IHNhdmluZyB9LCBzYXZpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlIFNldHRpbmdzJykpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgbWFyZ2luVG9wOiBcInh4bFwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEg1LCB7IG1hcmdpbkJvdHRvbTogXCJsZ1wiIH0sIFwiQ3VycmVudCBTZXR0aW5ncyBTdW1tYXJ5XCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCb3gsIHsgYmc6IFwiZ3JleTIwXCIsIGJvcmRlcjogXCJkZWZhdWx0XCIsIGJvcmRlclJhZGl1czogXCJkZWZhdWx0XCIsIHBhZGRpbmc6IFwibGdcIiB9LCBzZXR0aW5nc0NvbmZpZy5tYXAoKGNvbmZpZykgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQm94LCB7IGtleTogY29uZmlnLmtleSwgbWFyZ2luQm90dG9tOiBcInNtXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHQsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICBcIjpcIiksXG4gICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVGV4dCwgeyBjb2xvcjogXCJncmV5ODBcIiB9LCBzZXR0aW5nc1tjb25maWcua2V5XSB8fCAnTm90IHNldCcpKSkpKSkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nc1BhZ2U7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBBZG1pbkRhc2hib2FyZCBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvQWRtaW5EYXNoYm9hcmQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkFkbWluRGFzaGJvYXJkID0gQWRtaW5EYXNoYm9hcmRcbmltcG9ydCBTZXR0aW5nc1BhZ2UgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL1NldHRpbmdzUGFnZSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2V0dGluZ3NQYWdlID0gU2V0dGluZ3NQYWdlIl0sIm5hbWVzIjpbIkFkbWluRGFzaGJvYXJkIiwic3RhdHMiLCJzZXRTdGF0cyIsInVzZVN0YXRlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJlcnJvciIsInNldEVycm9yIiwidXNlRWZmZWN0IiwiZmV0Y2hEYXNoYm9hcmRTdGF0cyIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiY3JlZGVudGlhbHMiLCJvayIsIkVycm9yIiwicmVzdWx0IiwianNvbiIsImRhdGEiLCJlcnIiLCJjb25zb2xlIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiQm94IiwicGFkZGluZyIsIlRleHQiLCJjb2xvciIsIkgyIiwibWFyZ2luQm90dG9tIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJmbGV4V3JhcCIsImZsZXgiLCJtaW5XaWR0aCIsIm1hcmdpblJpZ2h0IiwiYmciLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJzdHlsZSIsImJveFNoYWRvdyIsIkg1IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwidG90YWxVc2VycyIsInRvdGFsT3JkZXJzIiwiTnVtYmVyIiwidG90YWxSZXZlbnVlIiwidG9GaXhlZCIsInJlY2VudE9yZGVycyIsImxlbmd0aCIsIlRhYmxlIiwiVGFibGVIZWFkIiwiVGFibGVSb3ciLCJUYWJsZUNlbGwiLCJUYWJsZUJvZHkiLCJtYXAiLCJvcmRlciIsImtleSIsImlkIiwidXNlcklkIiwic3RhdHVzIiwidG90YWxBbW91bnQiLCJEYXRlIiwiY3JlYXRlZEF0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwibG93U3RvY2tQcm9kdWN0cyIsInByb2R1Y3QiLCJuYW1lIiwic3RvY2siLCJwcmljZSIsIlNldHRpbmdzUGFnZSIsInNldHRpbmdzIiwic2V0U2V0dGluZ3MiLCJzYXZpbmciLCJzZXRTYXZpbmciLCJzdWNjZXNzIiwic2V0U3VjY2VzcyIsInNldHRpbmdzQ29uZmlnIiwibGFiZWwiLCJkZXNjcmlwdGlvbiIsImZldGNoU2V0dGluZ3MiLCJzZXR0aW5nc01hcCIsImZvckVhY2giLCJzZXR0aW5nIiwidmFsdWUiLCJoYW5kbGVJbnB1dENoYW5nZSIsInByZXYiLCJoYW5kbGVTYXZlIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzZXRUaW1lb3V0IiwiTWVzc2FnZUJveCIsIm1lc3NhZ2UiLCJ2YXJpYW50Iiwib25DbG9zZSIsIm1heFdpZHRoIiwiY29uZmlnIiwiRm9ybUdyb3VwIiwiTGFiZWwiLCJodG1sRm9yIiwiSW5wdXQiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsInRvTG93ZXJDYXNlIiwibWFyZ2luVG9wIiwianVzdGlmeUNvbnRlbnQiLCJCdXR0b24iLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7SUFFQSxNQUFNQSxjQUFjLEdBQUdBLE1BQU07TUFDekIsTUFBTSxDQUFDQyxLQUFLLEVBQUVDLFFBQVEsQ0FBQyxHQUFHQyxjQUFRLENBQUMsSUFBSSxDQUFDO01BQ3hDLE1BQU0sQ0FBQ0MsT0FBTyxFQUFFQyxVQUFVLENBQUMsR0FBR0YsY0FBUSxDQUFDLElBQUksQ0FBQztNQUM1QyxNQUFNLENBQUNHLEtBQUssRUFBRUMsUUFBUSxDQUFDLEdBQUdKLGNBQVEsQ0FBQyxJQUFJLENBQUM7SUFDeENLLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0lBQ1osSUFBQSxNQUFNQyxtQkFBbUIsR0FBRyxZQUFZO1VBQ3BDLElBQUk7SUFDQSxRQUFBLE1BQU1DLFFBQVEsR0FBRyxNQUFNQyxLQUFLLENBQUMsc0JBQXNCLEVBQUU7SUFDakRDLFVBQUFBLE1BQU0sRUFBRSxLQUFLO0lBQ2JDLFVBQUFBLE9BQU8sRUFBRTtJQUNMLFlBQUEsY0FBYyxFQUFFO2VBQ25CO0lBQ0RDLFVBQUFBLFdBQVcsRUFBRTtJQUNqQixTQUFDLENBQUM7SUFDRixRQUFBLElBQUksQ0FBQ0osUUFBUSxDQUFDSyxFQUFFLEVBQUU7SUFDZCxVQUFBLE1BQU0sSUFBSUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDO0lBQ3RELFFBQUE7SUFDQSxRQUFBLE1BQU1DLE1BQU0sR0FBRyxNQUFNUCxRQUFRLENBQUNRLElBQUksRUFBRTtJQUNwQ2hCLFFBQUFBLFFBQVEsQ0FBQ2Us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
