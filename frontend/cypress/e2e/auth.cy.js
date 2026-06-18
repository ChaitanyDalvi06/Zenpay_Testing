describe('Zenpay E2E Test Suite', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:8000';
  let email;
  let password = 'Test@12345';
  let name;

  before(() => {
    email = `qa+${Date.now()}@example.com`;
    name = `cypress-tester-${Math.random().toString(36).substring(2, 8)}`;
  });

  it('1. performs signup flow', () => {
    cy.visit('/signup');
    cy.wait(1000);
    cy.intercept('POST', `${apiUrl}/api/auth/signup`).as('signupApi');

    cy.get('input[name="name"]').type(name, { delay: 80 });
    cy.wait(600);
    cy.get('input[name="email"]').type(email, { delay: 80 });
    cy.wait(600);
    cy.get('input[name="password"]').type(password, { delay: 80 });
    cy.wait(800);
    cy.get('.auth-button').click();

    cy.wait('@signupApi').its('response.statusCode').should('eq', 201);
    cy.wait(1000);
    cy.url().should('include', '/profile');
  });

  it('2. completes financial identity profile form', () => {
    cy.wait(1000);
    // Fill profile fields
    cy.get('input[name="firstName"]').clear().type('Jane', { delay: 80 });
    cy.wait(600);
    cy.get('input[name="lastName"]').clear().type('Doe', { delay: 80 });
    cy.wait(600);
    cy.get('input[name="age"]').clear().type('26', { delay: 80 });
    cy.wait(600);
    cy.get('input[name="mobileNumber"]').clear().type('9876543210999abc', { delay: 80 }).should('have.value', '9876543210');
    cy.wait(600);
    cy.get('select[name="occupation"]').select('Job holder');
    cy.wait(600);
    cy.get('input[name="monthlyIncome"]').clear().type('30000', { delay: 80 });
    cy.wait(600);
    cy.get('input[name="monthlyExpenses"]').clear().type('10000', { delay: 80 });
    cy.wait(600);

    // Fill 12 digit Aadhar digits
    cy.get('.aadhar-input-group input').each(($el) => {
      cy.wrap($el).clear().type('1', { delay: 80 });
      cy.wait(150);
    });
    cy.wait(1000);

    cy.intercept('POST', `${apiUrl}/api/profile`).as('profileApi');
    cy.contains('button', 'Save Changes').click();

    cy.wait('@profileApi').its('response.statusCode').should('eq', 201);
    cy.wait(1000);
    cy.url().should('include', '/dashboard');
  });

  it('3. performs login flow', () => {
    cy.visit('/login');
    cy.wait(1000);
    cy.intercept('POST', `${apiUrl}/api/auth/login`).as('loginApi');

    // Clear state
    cy.window().then((win) => {
      win.localStorage.removeItem('token');
    });
    cy.reload();
    cy.wait(1000);

    cy.get('input[name="email"]').type(email, { delay: 80 });
    cy.wait(600);
    cy.get('input[name="password"]').type(password, { delay: 80 });
    cy.wait(600);
    cy.get('.auth-button').click();

    cy.wait('@loginApi').its('response.statusCode').should('eq', 200);
    cy.wait(1000);
    cy.url().should('include', '/dashboard');

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token');
      expect(token).to.not.be.null;
    });
  });

  it('4. interacts with AI Advisor and checks output', () => {
    cy.visit('/advisor');
    cy.wait(1000);

    // Wait for the simulated loading screen to finish
    cy.get('.ai-loading-screen', { timeout: 15000 }).should('not.exist');
    cy.wait(1000);
    cy.get('.ai-chat-container').should('be.visible');

    // Type message and send
    cy.get('.ai-input').type('Best investments for my income?', { delay: 80 });
    cy.wait(1000);
    cy.get('.ai-send-btn').click();

    // Wait for response and check content
    cy.get('.ai-typing', { timeout: 15000 }).should('not.exist');
    cy.get('.ai-message-assistant').should('be.visible');
    cy.get('.ai-messages').should('contain', 'investment');
    cy.wait(2000);
  });

  it('5. performs mockup payment flow', () => {
    cy.visit('/payment');
    cy.wait(1000);

    // Billing step 1
    cy.get('#payeeName').clear().type('Merchant Cypress', { delay: 80 });
    cy.wait(600);
    cy.get('#mobileNumber').clear().type('9876543210999abc', { delay: 80 }).should('have.value', '9876543210');
    cy.wait(600);
    cy.get('#amount').clear().type('500', { delay: 80 });
    cy.wait(600);
    cy.contains('button', 'Continue to Payment Method').click();
    cy.wait(1500);

    // Payment step 2 (card inputs)
    cy.get('input[placeholder="4111 2222 3333 4444"]').clear().type('4111222233334444', { delay: 80 });
    cy.wait(600);
    cy.get('input[placeholder="MM/YY"]').clear().type('1228', { delay: 80 });
    cy.wait(600);
    cy.get('input[placeholder="123"]').clear().type('123', { delay: 80 });
    cy.wait(1000);

    cy.intercept('POST', `${apiUrl}/api/payment/payment`).as('payApi');
    cy.get('.pay-submit-btn').click();

    // Processing step 3 & success step 4
    cy.wait('@payApi', { timeout: 10000 }).its('response.statusCode').should('eq', 201);
    cy.get('.checkout-success-panel', { timeout: 10000 }).should('be.visible');
    cy.contains('Payment Successful!').should('be.visible');
    cy.wait(2000);

    cy.get('.return-dashboard-btn').click();
    cy.wait(1500);
    cy.url().should('include', '/dashboard');
  });

  it('6. plays roulette wheel on rewards page', () => {
    cy.visit('/rewards');
    cy.wait(1500);

    // Check available coin balance is displayed
    cy.get('.rewards-hero-banner').should('contain', 'Coins');

    // Spin the wheel
    cy.get('.spin-action-btn').should('not.be.disabled').click();

    // Wait for the 5-second wheel spin to complete + margin
    cy.get('.game-outcome-alert', { timeout: 10000 }).should('be.visible');
    cy.wait(2000);
  });
});
