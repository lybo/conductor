/* global requirejs */
// ATTENTION
// DO NOT REMOVE THE COMMENTS /*files*/
// from the following line.
// It's the location where is replaced
// from files of test folder by gruntjs
require([
	/*files*/'test/Router'/*files*/
], function() {
	// INITIALIZE THE RUN
	if (window.mochaPhantomJS) {
		mochaPhantomJS.run();
	} else {
		mocha.run();
	}
});