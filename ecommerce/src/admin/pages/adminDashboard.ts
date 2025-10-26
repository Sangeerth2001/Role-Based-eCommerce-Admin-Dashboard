const adminDashboard = {
  component: 'AdminDashboard',
  icon: 'Dashboard',
  handler: async (_request: any, _response: any, context: any) => {
    // Only allow admins to access the dashboard
    if (!context.currentAdmin || context.currentAdmin.role !== 'admin') {
      return {
        text: 'Access Denied',
      };
    }
    return {
      text: 'Admin Dashboard',
    };
  },
};

export default adminDashboard;
