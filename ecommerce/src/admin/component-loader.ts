import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

// Register custom components
const componentsDir = path.join(__dirname, 'components');
componentLoader.add('AdminDashboard', path.join(componentsDir, 'AdminDashboard'));

export default componentLoader;
