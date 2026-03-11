describe("Talks and Speakers Layout", () => {
  it("Talks page has filters at top and 2-column grid", () => {
    cy.visit("/2024/talks");

    cy.get(".talks-filter-bar").should("exist");
    cy.get(".talks-filter-bar").contains("All Tracks");

    cy.get(".talks-grouped").should("exist");
  });

  it("Speakers page has search at top and 4-column grid", () => {
    cy.visit("/2024/speakers");

    cy.get(".talks-filter-bar").should("exist");

    cy.get(".team-sperkers-section-area .row .col-lg-3").should("have.length.at.least", 4);
  });

  it("Talks page search works", () => {
    cy.visit("/2024/talks");

    cy.get('input[name="q"]').type("Java");

    cy.url().should("include", "q=Java");
  });

  it("Speakers page search works", () => {
    cy.visit("/2024/speakers");

    cy.get('input[name="q"]').type("Speaker");

    cy.url().should("include", "q=Speaker");
  });
});
