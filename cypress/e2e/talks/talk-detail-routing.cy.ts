describe("Talk detail routing", () => {
  it("opens a talk in a modal from the talks list and renders the same talk on direct navigation", () => {
    cy.visit("/2026/talks");

    cy.get('.talk-card .talk-title a[href^="/2026/talks/"]')
      .first()
      .should("be.visible")
      .then(($link) => {
        const talkHref = $link.attr("href");
        const talkTitle = $link.text().trim();

        expect(talkHref, "talk href").to.be.a("string");
        expect(talkHref, "talk href").to.not.equal("");
        expect(talkTitle, "talk title").to.not.equal("");

        cy.wrap(talkHref).as("talkHref");
        cy.wrap(talkTitle).as("talkTitle");
      });

    cy.get<string>("@talkHref").then((talkHref) => {
      cy.get<string>("@talkTitle").then((talkTitle) => {
        cy.contains('.talk-card .talk-title a[href="' + talkHref + '"]', talkTitle).click();

        cy.url().should("include", talkHref);
        cy.get('button[aria-label="Close modal"]').should("be.visible");
        cy.get("h1").should("contain.text", talkTitle);

        cy.visit(talkHref);

        cy.url().should("include", talkHref);
        cy.get("h1").should("contain.text", talkTitle);
        cy.get('button[aria-label="Close modal"]').should("not.exist");
        cy.contains("h4", "Session Details").should("be.visible");
        cy.contains("h4", "Session Speakers").should("be.visible");
      });
    });
  });
});
