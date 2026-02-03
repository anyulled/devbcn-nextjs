describe("Talks and Speakers Layout", () => {
  it("Talks page has filters at top and 2-column grid", () => {
    // Visit the talks page for 2024
    cy.visit("/2024/talks");

    // Check for "Filter by Track" and "Search Talks" at the top
    // The filter section is wrapped in .blog-details-section within the first row
    cy.get(".row.mb-5").should("exist");
    cy.get(".row.mb-5").contains("Filter by Track");
    cy.get(".row.mb-5 .blog-details-section").should("have.length", 2); // Track filter + Search filter

    // Check grid layout
    // We expect .col-lg-6 for talk cards
    cy.get(".talks-grouped .track-section .row .col-lg-6").should("have.length.at.least", 2);
  });

  it("Speakers page has search at top and 4-column grid", () => {
    // Visit the speakers page for 2024
    cy.visit("/2024/speakers");

    // Check for "Filter Speakers" at the top
    // The search filter is in the top row
    cy.get(".row.mb-5").should("exist");
    cy.get(".row.mb-5").contains("Filter Speakers");

    // Check grid layout
    // We expect .col-lg-3 for speaker cards
    cy.get(".team-sperkers-section-area .row .col-lg-3").should("have.length.at.least", 4);
  });

  it("Talks page search works", () => {
    cy.visit("/2024/talks");

    // Type in search box
    cy.get('input[name="q"]').type("Java");

    // URL should update
    cy.url().should("include", "q=Java");

    // Filtering logic happens on server/client, wait for potential update
    // Just checking interaction flow here
  });

  it("Speakers page search works", () => {
    cy.visit("/2024/speakers");

    // Type in search box
    cy.get('input[name="q"]').type("Speaker");

    // URL should update
    cy.url().should("include", "q=Speaker");
  });
});
