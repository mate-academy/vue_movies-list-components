/* eslint-disable max-len */
import initialMovies from '../../src/data/movies.json';

/* eslint-disable max-len */
const newMovies = [
  {
    title: 'Inside Out',
    description:
      'After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BOTgxMDQwMDk0OF5BMl5BanBnXkFtZTgwNjU5OTg2NDE@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbId: 'tt2096673',
  },
  {
    title: 'The Dark Knight',
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.',
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg',
    imdbId: 'tt0468569',
  },
  {
    title: 'Forrest Gump',
    description:
      "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
    imgUrl:
      'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_QL75_UY562_CR4,0,380,562_.jpg',
    imdbId: 'tt0109830',
  },
];

const page = {
  movies: () => cy.byDataCy('movie'),
  searchField: () => cy.byDataCy('search__field'),

  assertMovieTitle: (index, title) => {
    page.movies().eq(index).byDataCy('movie__title').should('have.text', title);
  },

  assertMovieAt: (index, movie) => {
    page
      .movies()
      .eq(index)
      .byDataCy('movie__title')
      .should('have.text', movie.title);
    page
      .movies()
      .eq(index)
      .byDataCy('movie__description')
      .should('contain', movie.description);
    page
      .movies()
      .eq(index)
      .byDataCy('movie__link')
      .should(
        'have.attr',
        'href',
        `https://www.imdb.com/title/${movie.imdbId}`,
      );
    page
      .movies()
      .eq(index)
      .byDataCy('movie__image')
      .should('have.attr', 'src', movie.imgUrl);
  },
};

const form = {
  field: name => cy.byDataCy(`movie-form__${name}`),
  error: name => form.field(name).parents('.field').find('.help.is-danger'),
  submit: () => cy.byDataCy(`movie-form__submit-button`).click({ force: true }),

  fill: movie => {
    const empty = '{selectAll}{del}';

    form.field('title').type(movie.title || empty);
    form.field('description').type(movie.description || empty);
    form.field('imgUrl').type(movie.imgUrl || empty);
    form.field('imdbId').type(movie.imdbId || empty);
  },

  assertFieldValue: (name, value) =>
    form.field(name).should('have.value', value),

  assertsValues: movie => {
    form.assertFieldValue('title', movie.title);
    form.assertFieldValue('description', movie.description);
    form.assertFieldValue('imgUrl', movie.imgUrl);
    form.assertFieldValue('imdbId', movie.imdbId);
  },

  assertEmpty() {
    form.field('title').should('be.empty');
    form.field('description').should('be.empty');
    form.field('imgUrl').should('be.empty');
    form.field('imdbId').should('be.empty');
  },

  assertErrorCount(count) {
    cy.get('form .help.is-danger').should('have.length', count);
  },
};

let failed = false;

Cypress.on('fail', e => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();
    cy.visit('/');
  });

  describe('Form', () => {
    describe('by default', () => {
      it('list has no movies', () => {
        page.movies().should('have.length', initialMovies.length);
      });

      it('form is empty', () => {
        form.assertEmpty();
      });

      it('form has no errors', () => {
        form.assertErrorCount(0);
      });

      it('title can be entered', () => {
        form.field('title').type('The Umbrella Academy');
        form.assertFieldValue('title', 'The Umbrella Academy');
      });

      it('description can be entered', () => {
        form.field('description').type('Some description');
        form.assertFieldValue('description', 'Some description');
      });

      it('imgUrl can be entered', () => {
        const URL = 'https://www.example.com/image.jpg';

        form.field('imgUrl').type(URL);
        form.assertFieldValue('imgUrl', URL);
      });

      it('imdbId can be entered', () => {
        form.field('imdbId').type('tt1312171');
        form.assertFieldValue('imdbId', 'tt1312171');
      });

      it('empty title error appears only on blur', () => {
        form.field('title').focus();
        form.error('title').should('not.exist');

        form.field('title').type('1{backspace}');
        form.error('title').should('not.exist');

        form.field('title').blur();
        form.error('title').should('exist');
      });

      it('empty description error never appears', () => {
        form.field('description').focus();
        form.field('description').type('1{backspace}');
        form.field('description').blur();

        form.error('description').should('not.exist');
      });

      it('empty imgUrl error appears only on blur', () => {
        form.field('imgUrl').focus();
        form.error('imgUrl').should('not.exist');

        form.field('imgUrl').type('1{backspace}');
        form.error('imgUrl').should('not.exist');

        form.field('imgUrl').blur();
        form.error('imgUrl').should('exist');
      });

      it('empty imdbId error appears only on blur', () => {
        form.field('imdbId').focus();
        form.error('imdbId').should('not.exist');

        form.field('imdbId').type('1{backspace}');
        form.error('imdbId').should('not.exist');

        form.field('imdbId').blur();
        form.error('imdbId').should('exist');
      });
    });

    describe('on submit with correct values', () => {
      beforeEach(() => {
        form.fill({ ...newMovies[0] });
      });

      it('movie is added', () => {
        form.submit();

        page.movies().should('have.length', initialMovies.length + 1);
        page.assertMovieAt(initialMovies.length, newMovies[0]);
      });

      it('form is cleared', () => {
        form.submit();

        form.assertEmpty();
        form.assertErrorCount(0);
      });

      it('page is not reloaded', () => {
        // eslint-disable-next-line no-param-reassign
        cy.window().then(w => (w.beforeReload = true));
        form.submit();

        cy.window().should('have.prop', 'beforeReload', true);
      });

      it('can add more movies', () => {
        form.fill({ ...newMovies[0] });
        form.submit();

        form.fill({ ...newMovies[1] });
        form.submit();

        form.fill({ ...newMovies[2] });
        form.submit();

        page.movies().should('have.length', initialMovies.length + 3);
      });
    });

    describe('on submit with missing values', () => {
      it('errors are shown for all empty required fields', () => {
        form.fill({ title: '', description: '', imgUrl: '', imdbId: '' });
        form.submit();

        form.assertErrorCount(3);
        form.error('title').should('exist');
        form.error('imgUrl').should('exist');
        form.error('imdbId').should('exist');
      });

      it('movie is not added', () => {
        form.fill({ ...newMovies[0], title: '' });
        form.submit();

        page.movies().should('have.length', initialMovies.length);
      });

      it('page is not reloaded', () => {
        // eslint-disable-next-line no-param-reassign
        cy.window().then(w => (w.beforeReload = true));

        form.fill({ ...newMovies[0], title: '' });
        form.submit();

        cy.window().should('have.prop', 'beforeReload', true);
      });

      it('form is not cleared', () => {
        const values = { ...newMovies[0], title: '' };

        form.fill(values);
        form.submit();

        form.assertsValues(values);

        form.assertErrorCount(1);
        form.error('title').should('exist');
      });

      it('empty imgUrl is handled correctly', () => {
        const values = { ...newMovies[0], imgUrl: '' };

        form.fill(values);
        form.submit();

        form.assertsValues(values);

        form.assertErrorCount(1);
        form.error('imgUrl').should('exist');
      });

      it('empty imdbId is handled correctly', () => {
        const values = { ...newMovies[0], imdbId: '' };

        form.fill(values);
        form.submit();

        form.assertsValues(values);

        form.assertErrorCount(1);
        form.error('imdbId').should('exist');
      });
    });
  });

  describe('Filter', () => {
    beforeEach(() => {
      if (failed) Cypress.runner.stop();

      cy.visit('/');
    });

    it('should have an empty search field', () => {
      page.searchField().should('have.value', '');
    });

    it('should show all the movies by default', () => {
      page.movies().should('have.length', 5);

      page.assertMovieTitle(0, 'Inception');
      page.assertMovieTitle(4, 'The Holiday');
    });

    it('should allow to enter some text', () => {
      page.searchField().type('Hello').should('have.value', 'Hello');
    });

    it('should allow to remove entered text', () => {
      page
        .searchField()
        .type('Hello')
        .type('{selectAll}{backspace}')
        .should('have.value', '');
    });

    it('should search by exact title', () => {
      page.searchField().type('Love Actually');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'Love Actually');
    });

    it('should search by a start of a title', () => {
      page.searchField().type('Rogue');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'Rogue One');
    });

    it('should search by a part of a title', () => {
      page.searchField().type('Day After');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'The Day After Tomorrow');
    });

    it('should search by a lower case part of a title', () => {
      page.searchField().type('day after');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'The Day After Tomorrow');
    });

    it('should search by an upper case part of a title', () => {
      page.searchField().type('DAY AFTER');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'The Day After Tomorrow');
    });

    it('should search by a mixed case part of a title', () => {
      page.searchField().type('DaY aFTer');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'The Day After Tomorrow');
    });

    it('should search by a part of a description', () => {
      page.searchField().type('interrelated tales');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'Inception');
    });

    it('should search by a mixed case part of a description', () => {
      page.searchField().type('interRELATED taLES');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'Inception');
    });

    it('should show all the matched movies', () => {
      page.searchField().type('love');

      page.movies().should('have.length', 3);

      page.assertMovieTitle(0, 'Inception');
      page.assertMovieTitle(1, 'Love Actually');
      page.assertMovieTitle(2, 'The Holiday');
    });

    it('should update search results on type', () => {
      page.searchField().type('l');
      page.movies().should('have.length', 5);

      page.searchField().type('o');
      page.movies().should('have.length', 4);

      page.searchField().type('ve');
      page.movies().should('have.length', 3);
    });

    it('should work if user types extra spaces before or after the query', () => {
      page.searchField().type('   love     ');
      page.movies().should('have.length', 3);
    });

    it('should show no movies if query does not match any title or description', () => {
      page.searchField().type('loves');
      page.movies().should('not.exist');
    });

    it('should restore movies if the query starts matching', () => {
      page.searchField().type('loves');
      page.movies().should('not.exist');

      page.searchField().type('{backspace}');
      page.movies().should('have.length', 3);
    });

    it('should restore all movies after clearing the query', () => {
      page.searchField().type('love');
      page.searchField().type('{selectAll}{backspace}');

      page.movies().should('have.length', 5);
    });

    it('should filter added movies', () => {
      form.fill({ ...newMovies[1] });
      form.submit();

      page.searchField().type('dark');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'The Dark Knight');
    });

    it('should filter added movies by a part of a description', () => {
      form.fill({ ...newMovies[2] });
      form.submit();

      page.searchField().type('history of the united states');

      page.movies().should('have.length', 1);
      page.assertMovieTitle(0, 'Forrest Gump');
    });
  });
});
