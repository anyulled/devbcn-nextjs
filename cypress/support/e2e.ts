// Import commands.ts using ES2015 syntax:
import "./commands";

// Ignore uncaught exceptions from the application
// This is used to bypass non-critical dev server errors like "negative time stamp"
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
