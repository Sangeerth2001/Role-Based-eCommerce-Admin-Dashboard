import { DefaultAuthProvider } from 'adminjs';

import componentLoader from './component-loader.js';
import { User } from '../db/index.js';

/**
 * Authentication provider that validates against the database
 * Allows both admin and regular users to access the admin panel
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

    // Allow both admin and regular users to access admin panel
    // Return user data for session
    return {
      email: user.email,
      name: user.name,
      role: user.role,
      id: user.id.toString(),
    };
  },
});

export default provider;
