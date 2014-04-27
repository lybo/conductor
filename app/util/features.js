/* global define */
define([
    /* conductor: features */'controller/footer','controller/header','controller/section'/* /conductor */
], function () {
    'use strict';

    var controllers = Array.prototype.slice.call(arguments, 0);
    return (function () {
			setTimeout(function () {
				controllers.forEach(function (controller) {
					if (controller) {
						controller();
					}
				});
			}, 10);
    });
});
