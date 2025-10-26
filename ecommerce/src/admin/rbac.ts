import { CurrentAdmin } from 'adminjs';

/**
 * Role-Based Access Control (RBAC) Configuration
 * Defines permissions for different user roles
 */

export type UserRole = 'admin' | 'user';

export type Action =
  | 'list'
  | 'show'
  | 'new'
  | 'create'
  | 'edit'
  | 'update'
  | 'delete'
  | 'bulkDelete'
  | 'search';

export type Resource =
  | 'User'
  | 'Category'
  | 'Product'
  | 'Order'
  | 'OrderItem'
  | 'Setting';

export type Page =
  | 'settings'
  | 'products'
  | 'cart'
  | 'checkout'
  | 'user-settings';

/**
 * Resource permissions configuration
 * Defines which roles can perform which actions on which resources
 */
export const RESOURCE_PERMISSIONS: Record<Resource, Record<Action, UserRole[]>> = {
  User: {
    list: ['admin'],
    show: ['admin'],
    new: ['admin'],
    create: ['admin'],
    edit: ['admin'],
    update: ['admin'],
    delete: ['admin'],
    bulkDelete: ['admin'],
    search: ['admin'],
  },
  Category: {
    list: ['admin', 'user'], // Users can view categories
    show: ['admin', 'user'], // Users can view category details
    new: ['admin'],
    create: ['admin'],
    edit: ['admin'],
    update: ['admin'],
    delete: ['admin'],
    bulkDelete: ['admin'],
    search: ['admin', 'user'], // Users can search categories
  },
  Product: {
    list: ['admin', 'user'], // Users can view products
    show: ['admin', 'user'], // Users can view product details
    new: ['admin'],
    create: ['admin'],
    edit: ['admin'],
    update: ['admin'],
    delete: ['admin'],
    bulkDelete: ['admin'],
    search: ['admin', 'user'], // Users can search products
  },
  Order: {
    list: ['admin', 'user'], // Users can view their own orders (filtered)
    show: ['admin', 'user'], // Users can view their own order details (filtered)
    new: ['admin'],
    create: ['admin'],
    edit: ['admin'],
    update: ['admin'],
    delete: ['admin'],
    bulkDelete: ['admin'],
    search: ['admin', 'user'], // Users can search their own orders
  },
  OrderItem: {
    list: ['admin'],
    show: ['admin'],
    new: ['admin'],
    create: ['admin'],
    edit: ['admin'],
    update: ['admin'],
    delete: ['admin'],
    bulkDelete: ['admin'],
    search: ['admin'],
  },
  Setting: {
    list: ['admin'],
    show: ['admin'],
    new: ['admin'],
    create: ['admin'],
    edit: ['admin'],
    update: ['admin'],
    delete: ['admin'],
    bulkDelete: ['admin'],
    search: ['admin'],
  },
};

/**
 * Page access permissions
 * Defines which roles can access which custom pages
 */
export const PAGE_PERMISSIONS: Record<Page, UserRole[]> = {
  settings: ['admin'],
  products: ['user', 'admin'],
  cart: ['user', 'admin'],
  checkout: ['user', 'admin'],
  'user-settings': ['user', 'admin'],
};

/**
 * Check if a user has permission to perform an action on a resource
 */
export const canPerformAction = (
  currentAdmin: CurrentAdmin | null,
  resource: Resource,
  action: Action
): boolean => {
  if (!currentAdmin || !currentAdmin.role) {
    return false;
  }

  const role = currentAdmin.role as UserRole;
  const allowedRoles = RESOURCE_PERMISSIONS[resource]?.[action];

  if (!allowedRoles) {
    return false;
  }

  return allowedRoles.includes(role);
};

/**
 * Check if a user can access a specific page
 */
export const canAccessPage = (
  currentAdmin: CurrentAdmin | null,
  page: Page
): boolean => {
  if (!currentAdmin || !currentAdmin.role) {
    return false;
  }

  const role = currentAdmin.role as UserRole;
  const allowedRoles = PAGE_PERMISSIONS[page];

  if (!allowedRoles) {
    return false;
  }

  return allowedRoles.includes(role);
};

/**
 * Check if a user is an admin
 */
export const isAdmin = (currentAdmin: CurrentAdmin | null): boolean => {
  return currentAdmin?.role === 'admin';
};

/**
 * Check if a user is a regular user
 */
export const isUser = (currentAdmin: CurrentAdmin | null): boolean => {
  return currentAdmin?.role === 'user';
};

/**
 * Check if resource should be visible in navigation
 */
export const isResourceVisible = (
  currentAdmin: CurrentAdmin | null,
  resource: Resource
): boolean => {
  // A resource is visible if the user can at least list it
  return canPerformAction(currentAdmin, resource, 'list');
};

/**
 * Check if resource is accessible at all
 */
export const isResourceAccessible = (
  currentAdmin: CurrentAdmin | null,
  resource: Resource
): boolean => {
  if (!currentAdmin || !currentAdmin.role) {
    return false;
  }

  // A resource is accessible if the user can perform at least one action on it
  const actions: Action[] = ['list', 'show', 'new', 'create', 'edit', 'update', 'delete', 'bulkDelete', 'search'];
  return actions.some((action) => canPerformAction(currentAdmin, resource, action));
};

/**
 * Get actions configuration for a resource
 * Returns object with action names as keys and boolean values
 */
export const getActionsConfig = (
  currentAdmin: CurrentAdmin | null,
  resource: Resource
) => {
  return {
    list: canPerformAction(currentAdmin, resource, 'list'),
    show: canPerformAction(currentAdmin, resource, 'show'),
    new: canPerformAction(currentAdmin, resource, 'new'),
    create: canPerformAction(currentAdmin, resource, 'create'),
    edit: canPerformAction(currentAdmin, resource, 'edit'),
    update: canPerformAction(currentAdmin, resource, 'update'),
    delete: canPerformAction(currentAdmin, resource, 'delete'),
    bulkDelete: canPerformAction(currentAdmin, resource, 'bulkDelete'),
    search: canPerformAction(currentAdmin, resource, 'search'),
  };
};
