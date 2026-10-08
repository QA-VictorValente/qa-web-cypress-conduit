describe('Conduit - Network Interception & API Mocking (@mock @intercept)', () => {
  it('TC-MCK01: Mock popular tags and assert custom tags rendered in sidebar', () => {
    const customTags = ['playwright', 'cypress', 'k6', 'sdet-lead', 'automation-testing'];

    cy.intercept('GET', '**/tags*', {
      statusCode: 200,
      body: { tags: customTags }
    }).as('mockedTags');

    cy.visit('/');
    cy.wait('@mockedTags');

    // Assert that each mocked tag is displayed in the UI sidebar
    customTags.forEach((tag) => {
      cy.get('.sidebar .tag-list').should('contain', tag);
    });
  });

  it('TC-MCK02: Mock Global Feed articles using fixture data', () => {
    cy.fixture('articles.json').then((articlesData) => {
      cy.intercept('GET', '**/articles*', {
        statusCode: 200,
        body: articlesData.mockArticles
      }).as('mockedFeed');

      cy.visit('/');
      cy.wait('@mockedFeed');

      const expectedArticle = articlesData.mockArticles.articles[0];
      cy.get('.article-preview').should('have.length', 1);
      cy.get('.article-preview h1').should('contain', expectedArticle.title);
      cy.get('.article-preview p').should('contain', expectedArticle.description);
      cy.get('.article-preview .author').should('contain', expectedArticle.author.username);
    });
  });

  it('TC-MCK03: Simulate backend 500 Internal Server Error on articles feed', () => {
    // Intercept articles feed and return HTTP 500 error
    cy.intercept('GET', '**/articles*', {
      statusCode: 500,
      body: { message: 'Internal Server Error - Database connection failed' }
    }).as('serverErrorFeed');

    cy.visit('/');
    cy.wait('@serverErrorFeed');

    // Verify page continues to render navbar, banner and layout without white screen crash
    cy.get('.navbar').should('be.visible');
    cy.get('.banner').should('be.visible').and('contain', 'conduit');
    cy.get('body').should('not.contain.text', 'Crash');
  });

  it('TC-MCK04: Mock empty articles state', () => {
    cy.intercept('GET', '**/articles*', {
      statusCode: 200,
      body: {
        articles: [],
        articlesCount: 0
      }
    }).as('emptyArticles');

    cy.visit('/');
    cy.wait('@emptyArticles');

    cy.get('.article-preview, .feed-toggle, app-article-list').should('contain', 'No articles are here... yet.');
  });
});
