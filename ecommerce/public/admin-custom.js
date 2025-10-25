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
