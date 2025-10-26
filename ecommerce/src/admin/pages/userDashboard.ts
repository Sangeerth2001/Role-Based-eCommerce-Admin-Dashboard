const userDashboard = {
  component: 'UserDashboard',
  icon: 'Home',
  handler: async (_request: any, _response: any, context: any) => {
    // Only allow regular users to access this dashboard
    if (!context.currentAdmin || context.currentAdmin.role !== 'user') {
      return {
        text: 'Access Denied',
      };
    }
    return {
      text: 'User Dashboard',
    };
  },
};

export default userDashboard;
