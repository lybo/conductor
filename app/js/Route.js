/* global define */
define([
	'js/Middlewares'
], function (Middlewares) {
	function Route(path, callback, config) {
		var self = this;

		self.hash = config.hash || '#';
		self.handlers = new Middlewares();
		self.callback = callback || function () {};
		self.params = [];
		self.keys = [];
		self.path = path || '';
		self.regexp = self.pathRegexp(
			path,
			self.keys,
			config.sensitive ? true : false,
			config.strict  ? true : false
		);
		self.handlers = new Middlewares();

	}

	Route.prototype = {

		pathRegexp: function (path, keys, sensitive, strict) {
			if (path instanceof RegExp) {
				return path;
			}
			if (Array.isArray(path)) {
				path = '(' + path.join('|') + ')';
			}
			path = path
				.concat(strict ? '' : '/?')
				.replace(/\/\(/g, '(?:/')
				.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function (_, slash, format, key, capture, optional, star) {
					keys.push({ name: key, optional: !! optional });
					slash = slash || '';
					return ''
						+ (optional ? '' : slash)
						+ '(?:'
						+ (optional ? slash : '')
						+ (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
						+ (optional || '')
						+ (star ? '(/*)?' : '');
				})
				.replace(/([\/.])/g, '\\$1')
				.replace(/\*/g, '(.*)');
			return new RegExp('^' + path + '$', sensitive ? '' : 'i');
		},
		match: function (path) {
			var self = this,
				keys = self.keys,
				params = self.params,
				m = self.regexp.exec(path);

			if (!m) {
				return false;
			}

			for (var i = 1, len = m.length; i < len; ++i) {
				var key = keys[i - 1],
					val = 'string' === typeof m[i] ? decodeURIComponent(m[i]) : m[i];

				if (key) {
					params[key.name] = val;
				} else {
					params.push(val);
				}
			}

			return true;
		},

		handler: function () {
			var self = this;
			self.handlers.run(self.callback, self.params);
		}


	};

	return Route;
});