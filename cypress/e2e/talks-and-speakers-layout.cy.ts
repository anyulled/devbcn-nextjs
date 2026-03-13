describe("Talks and Speakers Layout", () => {
  it("Talks page has filters at top and 2-column grid", () => {
    cy.visit("/2024/talks");

    cy.get(".talks-filter-bar").should("exist");
    cy.get(".talks-filter-bar input[placeholder='Search talks...']").should("exist");
    cy.get(".talks-filter-bar .tracks-scroll-container").should("exist");

    cy.get(".talks-grouped .track-section .row .col-lg-4").should("have.length.at.least", 2);
  });

  it("Speakers page has search at top and 4-column grid", () => {
    cy.visit("/2024/speakers");

    cy.get(".talks-filter-bar").should("exist");
    cy.get(".talks-filter-bar input[placeholder='Search by name, tagline, or bio...']").should("exist");

    cy.get(".team-sperkers-section-area .row .col-lg-3").should("have.length.at.least", 4);
  });

  it("Talks page search works", () => {
    cy.visit("/2024/talks");

    cy.get(".talks-filter-bar input[placeholder='Search talks...']").type("Java");

    cy.url().should("include", "q=Java");
  });

  it("Speakers page search works", () => {
    cy.visit("/2024/speakers");

    cy.get(".talks-filter-bar input[placeholder='Search by name, tagline, or bio...']").type("Speaker");

    cy.url().should("include", "q=Speaker");
  });
});
