/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to perform UI login
       */
      login(email?: string, password?: string): Chainable<void>;

      /**
       * Custom command to authenticate user via mock/localStorage directly (App Action)
       */
      loginViaSession(user?: any): Chainable<void>;

      /**
       * Intercept helper for Conduit API endpoints
       */
      interceptConduitApis(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email = 'sdet.victor.qa@example.com', password = 'Password123!') => {
  cy.visit('/login');
  cy.get('input[placeholder="Email"], input[type="email"]').type(email);
  cy.get('input[placeholder="Password"], input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('loginViaSession', (user) => {
  cy.fixture('users.json').then((usersData) => {
    const targetUser = user || usersData.validUser;
    window.localStorage.setItem('loggedUser', JSON.stringify(targetUser));
    window.localStorage.setItem('jwtToken', targetUser.token);
  });
});

Cypress.Commands.add('interceptConduitApis', () => {
  cy.intercept('GET', '**/tags*').as('getTags');
  cy.intercept('GET', '**/articles*').as('getArticles');
});

export {};
