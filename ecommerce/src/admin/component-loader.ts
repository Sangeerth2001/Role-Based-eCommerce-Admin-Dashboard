import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

// Register custom components
const componentsDir = path.join(__dirname, 'components');
componentLoader.add('AdminDashboard', path.join(componentsDir, 'AdminDashboard'));
componentLoader.add('UserDashboard', path.join(componentsDir, 'UserDashboard'));
componentLoader.add('RoleDashboard', path.join(componentsDir, 'RoleDashboard'));
componentLoader.add('SettingsPage', path.join(componentsDir, 'SettingsPage'));
componentLoader.add('UserSettings', path.join(componentsDir, 'UserSettings'));
componentLoader.add('UserProducts', path.join(componentsDir, 'UserProducts'));
componentLoader.add('UserCart', path.join(componentsDir, 'UserCart'));
componentLoader.add('UserCheckout', path.join(componentsDir, 'UserCheckout'));

export default componentLoader;
