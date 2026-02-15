describe("Talks and Speakers Layout", () => {
  it("Talks page has filters at top and 2-column grid", () => {
    cy.visit("/2024/talks");

    cy.get(".row.mb-5").should("exist");
    cy.get(".row.mb-5").contains("Filter by Track");
    cy.get(".row.mb-5 .blog-details-section").should("have.length", 2);

    cy.get(".talks-grouped .track-section .row .col-lg-6").should("have.length.at.least", 2);
  });

  it("Speakers page has search at top and 4-column grid", () => {
    cy.visit("/2024/speakers");

    cy.get(".row.mb-5").should("exist");
    cy.get(".row.mb-5").contains("Filter Speakers");

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
