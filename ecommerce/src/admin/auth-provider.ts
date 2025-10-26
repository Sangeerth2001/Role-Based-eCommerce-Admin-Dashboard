import { DefaultAuthProvider } from 'adminjs';

import componentLoader from './component-loader.js';
import { User } from '../db/index.js';

/**
 * Authentication provider that validates against the database
 * Allows all users to login, but resources are restricted by role
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    // Verify password using bcrypt
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return null;
    }

    // Allow all users to login - access is controlled by resource-level permissions
    return {
      email: user.email,
      name: user.name,
      role: user.role,
      id: user.id.toString(),
    };
  },
});

export default provider;
