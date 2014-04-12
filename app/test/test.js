/* global requirejs */
require([
  // FILE(S) BEING TESTED
  'test/Router'
], function() {




	// INITIALIZE THE RUN
	if (window.mochaPhantomJS) {
		mochaPhantomJS.run();
	} else {
		mocha.run();

	}



});