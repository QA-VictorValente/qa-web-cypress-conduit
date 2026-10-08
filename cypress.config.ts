import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Conduit RealWorld public live target
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://conduit.bondaracademy.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 15000,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0
    }
  }
});
