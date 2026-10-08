import './commands';

// Ignore non-critical uncaught exceptions from demo application scripts
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
