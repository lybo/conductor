/* global define */
define([
	'jquery'
], function ($) {
	function Middlewares() {
		var self = this;
		self.init();
	}

	Middlewares.prototype.init = function(pattern, params) {
		var self = this;
		self.pattern = {};
		self.pointer = 0;
		self.ctx = {};
	};

	Middlewares.prototype.run = function(pattern, params) {
		var self = this,
			i = 0;

		self.pattern = pattern || function (ctx) { alert('empty middleware'); };
		self.ctx = {
			params: params
		};

		if (Array.isArray(self.pattern)) {
			self.handler();
		} else if (self.pattern) {
			self.pattern.call(self, self.ctx);
		}
	};

	Middlewares.prototype.handler = function() {
		var self = this,
			nextPointer = self.pointer + 1,
			middleware = self.pattern[self.pointer],
			ctx = self.ctx;

		if ('function' === typeof middleware) {
			if (self.pattern[nextPointer]) {
				try {
					middleware.call(self, ctx, function () {
						self.pointer++;
						self.handler();
					});
				} catch (err) {
					console.debug('middleware error: ', err.message);
				}

			} else {
				try {
					middleware.call(self, ctx);
					self.init();
				} catch (err) {
					console.debug('middleware error: ', err.message);
				}
			}
		} else {
			console.debug('middleware is not a function');
		}
	};

	return Middlewares;
});