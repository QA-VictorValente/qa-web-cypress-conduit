describe('Conduit - Article Management Workflow (@articles)', () => {
  beforeEach(() => {
    cy.fixture('users.json').then((userData) => {
      // Mock authenticated state
      cy.intercept('GET', '**/user*', {
        statusCode: 200,
        body: { user: userData.validUser }
      }).as('getUser');

      cy.intercept('GET', '**/tags*', {
        statusCode: 200,
        body: { tags: ['cypress', 'automation'] }
      }).as('getTags');

      // Set user session in localStorage before visiting app
      cy.loginViaSession(userData.validUser);
    });
  });

  it('TC-ART01: Should create a new article successfully with valid form data', () => {
    cy.fixture('articles.json').then((articlesData) => {
      const article = articlesData.newArticle;
      const slug = 'e2e-testing-best-practices-with-cypress-and-typescript';

      const mockArticle = {
        slug,
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorited: false,
        favoritesCount: 0,
        author: {
          username: 'sdet_victor_qa',
          bio: 'Senior QA SDET',
          image: 'https://api.realworld.io/images/smiley-cy.jpg',
          following: false
        }
      };

      // Mock Article creation API
      cy.intercept('POST', '**/articles*', {
        statusCode: 201,
        body: { article: mockArticle }
      }).as('createArticle');

      // Mock single article fetch on navigation
      cy.intercept('GET', `**/articles/${slug}*`, {
        statusCode: 200,
        body: { article: mockArticle }
      }).as('getCreatedArticle');

      cy.intercept('GET', `**/articles/${slug}/comments*`, {
        statusCode: 200,
        body: { comments: [] }
      }).as('getCreatedComments');

      cy.visit('/editor');

      // Fill in article creation form
      cy.get('input[placeholder="Article Title"]').type(article.title);
      cy.get('input[placeholder="What\'s this article about?"]').type(article.description);
      cy.get('textarea[placeholder="Write your article (in markdown)"]').type(article.body);
      cy.get('input[placeholder="Enter tags"]').type('cypress{enter}sdet{enter}');

      cy.get('button[type="button"], button[type="submit"]').contains('Publish Article').click();

      // Verify request payload and response
      cy.wait('@createArticle').its('request.body.article.title').should('eq', article.title);
      cy.get('h1').should('contain', article.title);
      cy.get('.article-content').should('contain', article.body);
    });
  });

  it('TC-ART02: Should validate article reading and comment section', () => {
    cy.fixture('articles.json').then((articlesData) => {
      const mock = articlesData.mockArticles.articles[0];

      cy.intercept('GET', `**/articles/${mock.slug}*`, {
        statusCode: 200,
        body: { article: mock }
      }).as('getSingleArticle');

      cy.intercept('GET', `**/articles/${mock.slug}/comments*`, {
        statusCode: 200,
        body: { comments: [] }
      }).as('getComments');

      cy.visit(`/article/${mock.slug}`);

      cy.get('h1').should('contain', mock.title);
      cy.get('.article-content').should('contain', mock.body);
      cy.get('.tag-list').should('contain', 'cypress');
      cy.get('textarea[placeholder="Write a comment..."]').should('be.visible');
    });
  });
});
