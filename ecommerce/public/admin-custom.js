// Add signup link to AdminJS login page - below the login button
(function() {
  // Wait for the DOM to be fully loaded
  function addSignupLink() {
    // Don't add if already exists
    if (document.getElementById('custom-signup-link')) {
      return;
    }

    // Try multiple selectors to find the form
    const form = document.querySelector('form[action*="login"]') ||
                document.querySelector('form');

    if (form) {
      // Create signup link container
      const signupContainer = document.createElement('div');
      signupContainer.id = 'custom-signup-link';
      signupContainer.style.cssText = `
        text-align: center;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #f0f0f0;
        font-size: 14px;
        color: #666;
        width: 100%;
      `;

      signupContainer.innerHTML = `
        Don't have an account?
        <a href="/signup" style="
          color: #1890ff;
          text-decoration: none;
          font-weight: 500;
          margin-left: 5px;
        ">Sign up here</a>
      `;

      // Try to append inside the form (after all elements)
      form.appendChild(signupContainer);

      console.log('Signup link added successfully');
    } else {
      console.log('Form not found, retrying...');
    }
  }

  // Try to add the link immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSignupLink);
  } else {
    addSignupLink();
  }

  // Also try after short delays (for React apps that render dynamically)
  setTimeout(addSignupLink, 100);
  setTimeout(addSignupLink, 300);
  setTimeout(addSignupLink, 500);
  setTimeout(addSignupLink, 1000);
  setTimeout(addSignupLink, 2000);
  setTimeout(addSignupLink, 3000);
})();

// Hide admin navigation for regular users
(function() {
  function hideAdminNavigation() {
    // Check if user is logged in and get their role from session
    fetch('/admin/api/getCurrentUser', {
      credentials: 'include'
    })
    .then(res => {
      if (res.status === 401) {
        // Not logged in - this is normal, don't show error
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (!data) return; // Not logged in

      const currentUser = data.currentAdmin || data.user;
      if (!currentUser) return;

      console.log('Current user role:', currentUser.role);

      // If user is not admin, hide admin navigation sections
      if (currentUser.role !== 'admin') {
        // Hide resource navigation sections (User Management, Catalog, Orders, Settings)
        const navigationSections = [
          'User Management',
          'Catalog',
          'Orders',
          'Settings'
        ];

        // Hide by text content - find all navigation links
        const allLinks = document.querySelectorAll('nav a, aside a, [class*="navigation"] a, [class*="sidebar"] a');
        allLinks.forEach(link => {
          const text = link.textContent.trim();
          if (navigationSections.includes(text)) {
            // Hide the parent list item or the link itself
            const parent = link.closest('li') || link.closest('div') || link;
            if (parent) {
              parent.style.display = 'none';
              console.log('Hid navigation item:', text);
            }
          }
        });

        // Hide "Settings" page link for users
        const allPageLinks = document.querySelectorAll('a[href*="/admin/pages/settings"]');
        allPageLinks.forEach(link => {
          const parent = link.closest('li') || link.closest('div') || link;
          if (parent) {
            parent.style.display = 'none';
            console.log('Hid settings page link');
          }
        });
      }

      // If user is admin, hide user-specific pages
      if (currentUser.role === 'admin') {
        const userPages = ['products', 'cart', 'checkout', 'user-settings'];

        userPages.forEach(pageName => {
          const pageLinks = document.querySelectorAll(`a[href*="/admin/pages/${pageName}"]`);
          pageLinks.forEach(link => {
            const parent = link.closest('li') || link.closest('div') || link;
            if (parent) {
              parent.style.display = 'none';
              console.log('Hid user page link:', pageName);
            }
          });
        });
      }
    })
    .catch(err => {
      // Silently ignore errors (usually means not logged in)
    });
  }

  // Run after page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideAdminNavigation);
  } else {
    hideAdminNavigation();
  }

  // Also retry after delays (AdminJS renders navigation dynamically)
  setTimeout(hideAdminNavigation, 500);
  setTimeout(hideAdminNavigation, 1000);
  setTimeout(hideAdminNavigation, 2000);
  setTimeout(hideAdminNavigation, 3000);

  // Watch for navigation changes (when user navigates)
  const observer = new MutationObserver(() => {
    hideAdminNavigation();
  });

  setTimeout(() => {
    const sidebar = document.querySelector('nav, aside, [class*="sidebar"], [class*="navigation"]');
    if (sidebar) {
      observer.observe(sidebar, { childList: true, subtree: true });
    }
  }, 1000);
})();
