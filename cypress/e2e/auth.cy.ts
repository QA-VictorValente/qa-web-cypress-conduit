describe('Conduit - Authentication Tests (@auth)', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('TC-AUTH01: Should display login page with email and password fields', () => {
    cy.get('h1').should('contain', 'Sign in');
    cy.get('input[placeholder="Email"], input[type="email"]').should('be.visible');
    cy.get('input[placeholder="Password"], input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Sign in');
  });

  it('TC-AUTH02: Should display error message on invalid login credentials via network intercept', () => {
    // Intercept backend login call and simulate 422 invalid credentials response
    cy.intercept('POST', '**/users/login*', {
      statusCode: 422,
      body: {
        errors: {
          'email or password': ['is invalid']
        }
      }
    }).as('loginFail');

    cy.get('input[placeholder="Email"], input[type="email"]').type('invalid@test.com');
    cy.get('input[placeholder="Password"], input[type="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');
    cy.get('.error-messages').should('be.visible').and('contain', 'email or password is invalid');
  });

  it('TC-AUTH03: Should log in successfully and redirect to home with user profile in navbar', () => {
    cy.fixture('users.json').then((userData) => {
      // Mock successful login response with JWT
      cy.intercept('POST', '**/users/login*', {
        statusCode: 200,
        body: {
          user: userData.validUser
        }
      }).as('loginSuccess');

      cy.intercept('GET', '**/articles*', {
        statusCode: 200,
        body: { articles: [], articlesCount: 0 }
      }).as('getArticles');

      cy.get('input[placeholder="Email"], input[type="email"]').type(userData.validUser.email);
      cy.get('input[placeholder="Password"], input[type="password"]').type(userData.validUser.password);
      cy.get('button[type="submit"]').click();

      cy.wait('@loginSuccess');
      cy.get('.navbar').should('contain', userData.validUser.username);
    });
  });
});
