const settingsPage = {
  component: 'SettingsPage',
  icon: 'Settings',
  handler: async (_request: any, _response: any, context: any) => {
    // Only allow admins to access settings
    if (!context.currentAdmin || context.currentAdmin.role !== 'admin') {
      return {
        text: 'Access Denied',
      };
    }
    return {
      text: 'Settings',
    };
  },
};

export default settingsPage;
