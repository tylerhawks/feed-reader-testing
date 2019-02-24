/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // tests that feeds are defined and have a length greater than 0
        it('has defined URLs', function() {
          for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });

        // tests that names are defined and have a length greater than 0
         it('has defined names', function() {
           for(let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    // Test Suite for 'The Menu'
    describe('The Menu', function() {

        // tests that the initial state of the menu is hidden
         it('is hidden', function() {
           const body = document.querySelector('body');
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });

          // tests that the menu toggles from hidden to visible, and back
          it('toggles when clicked', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            // checks that a click shows the menu
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            // checks that another click hides the menu
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });
        });

    // Test suite for 'Initial Entries'
    describe('Initial Entries', function() {

         // use 'beforeEach' and 'done' to ensure loadFeed completes before tests are run
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         // tests for entry elements in .feed
         it('feed has 1+ entry within feed', function(done) {
           expect($('.feed')).not.toBeNull();
           expect($('div.feed a.entry-link article.entry')).not.toBeNull();
           expect($('div.feed a.entry-link article.entry')).toBeDefined();
           done();
         });

       });

    // Test Suite for 'New Feed Selection'
    describe('New Feed Selection', function() {
        let firstFeed;
        let secondFeed;

        // assign text from loadFeed to variables
        beforeEach(function(done) {
          loadFeed(0, function() {
            firstFeed = $('h1.header-title')[0].innerText;
            loadFeed(1, function() {
              secondFeed = $('h1.header-title')[0].innerText;
              done();
            });
          });
        });

        // check that the two variables are not equal
        it('changes content', function(done) {
          expect(firstFeed).not.toEqual(secondFeed);
          done();
        });
       });

}());
