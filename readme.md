The Lab: Front-End Frameworks: Ember.js
===========

This repository contains the sample code for the [Front-End Frameworks: Ember.js](http://www.letscodejavascript.com/v3/episodes/lab/16) episodes ([Part I](http://www.letscodejavascript.com/v3/episodes/lab/16); [Part II](http://www.letscodejavascript.com/v3/episodes/lab/17); Part III forthcoming) of James Shore's screencast. Let's Code: Test-Driven JavaScript is a screencast series focused on rigorous, professional JavaScript development.

These episodes are an exploration and review of the [Ember.js](https://emberjs.com/) framework for building web applications. This repository contains an example application written in AngularJS. It demonstrates several concepts:

1. **Sample application.** The sample application code can be found in `src/client`. The main page is `index.html` and the top-level application template is `application.hbs`. The application is launched from `application.js`. The UI is implemented via components in `src/client/ui`.

  The application also includes a domain layer, value objects, and a (simulated) persistence layer. Those layers are in subdirectories of `src/client`. This architecture was an experiment to see how well Ember.js handled an approach outside of its comfort zone, not a pattern to follow in your own application.

  See the screencasts for more information about the sample app.

2. **Unit Tests.** All the code is unit tested. You can find tests of the Ember.js components in `src/client/ui/_*_test.js`. The code uses Mocha, rather than Ember's default assumption of QUnit, which led to some challenges—see "Mocha and Karma," below.

3. **Custom build and app structure.** Ember.js is meant to be used with the [ember-cli](http://www.ember-cli.com/) tool. The example application demonstrates doing it your own way. The hardest part was integrating Ember's HTMLBars templates. There are two aspects to making the templates work: first, the HTMLBars templates are compiled into a `templates.js` JavaScript file (see `build/util/htmlbars_compiler.js` and the `compileTemplates` task in `build/scripts/build.jakefile.js` for the code); second, Ember is told where the compiled templates are via the CommonJsResolver in `src/client/application.js`. You can use `htmlbars_compiler.js` in your own build scripts.

4. **CommonJS modules.** The ember-cli tool assumes that you use ES6 modules. The example application uses CommonJS modules instead. To do this, each component needs to be loaded into the application namespace. You can see this in `src/client/application.js`.

5. **Mocha and Karma.** The ember-cli tool assumes that you use QUnit and Test'em Scripts. The example application uses Mocha and Karma instead. This was a particular challenge due to lack of support and poor documentation, but the final code is fairly straightforward. First, be sure to include the [ember-mocha](https://github.com/switchfly/ember-mocha) adapter in your Karma configuration (see `build/config/karma.conf.js`). Second, run some global setup code (see `src/client/__ui_test_setup.js`). Third, use ember-mocha's `describeComponent` adapter and `this.xxx` magic functions in each test (for example, see `src/client/ui/_stock_market_row_test.js`).

Deviating from Ember's tool assumptions was an experiment to see how well Ember worked outside its comfort zone. Although the final code is fairly clean, it was a frustrating experience and not necessarily something to do in your own projects.

For further details about how this code works, watch [the screencasts](http://www.letscodejavascript.com/v3/episodes/lab/16).


Setup
-----

To try this code on your own computer:

1. Install [Node.js](http://nodejs.org/download/).
2. Download and unzip the source code into a convenient directory.
3. All commands must run from the root of the source tree: `cd <directory>`.


Running the Sample Application
------------------------------

1. Run `./jake.sh run` (Unix/Mac) or `jake run` (Windows)
2. Open `http://localhost:8080` in a browser.


Running the Tests
-----------------

1. Run `./jake.sh karma` (Unix/Mac) or `jake karma` (Windows) to start the Karma server.
2. Start the browsers you want to test and point each one at `http://localhost:9876`.
3. Run `./jake.sh loose=true` (Unix/Mac) or `jake loose=true` (Windows) every time you want to build and test.


License
-------

MIT License. See `LICENSE.TXT`.
