describe('Zenpay auth journey', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://127.0.0.1:8000';

  function uniqueEmail(prefix) {
    return `${prefix}+${Date.now()}@example.com`;
  }

  it('signup and login from UI', () => {
    const email = uniqueEmail('zenpay-cypress');
    const password = 'Test@12345';

    cy.visit('/signup');

    cy.intercept('POST', `${apiUrl}/api/auth/signup`).as('signupApi');
    cy.get('input[name="name"]').type('Cypress User');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button', 'Signup').click();

    cy.wait('@signupApi').its('response.statusCode').should('eq', 201);
    cy.url().should('include', '/profile');

    cy.visit('/login');
    cy.intercept('POST', `${apiUrl}/api/auth/login`).as('loginApi');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button', 'Login Now').click();

    cy.wait('@loginApi').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.not.be.null;
    });
  });
});
