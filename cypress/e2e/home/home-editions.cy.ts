describe("Home Pages (2023-2026)", () => {
  const editions = [
    { year: "2023", path: "/2023", venue: "La Farga", date: "3-5 July 2023" },
    { year: "2024", path: "/2024", venue: "La Farga", date: "13-14 June 2024" },
    { year: "2025", path: "/2025", venue: "La Farga", date: "8-10 July 2025" },
    { year: "2026", path: "/", venue: "World Trade Center", date: "16-17 June 2026" },
  ];

  editions.forEach((edition) => {
    it(`should load the homepage for ${edition.year} with correct venue and dates`, () => {
      cy.visit(edition.path, { timeout: 120000 });

      // The hero section contains the date and venue in h5 elements
      cy.get(".hero8-header", { timeout: 30000 }).within(() => {
        cy.get("h5").should("have.length.at.least", 2);
        cy.contains(edition.venue, { matchCase: false }).should("be.visible");
        cy.contains(edition.date, { matchCase: false }).should("be.visible");
      });
    });
  });
});
