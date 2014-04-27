/* global define */
define([
	'util/Route',
], function (Route) {

	function Router(config) {
		var self = this;
		self.hash = config.hash || '#';
		self.routes = [];
		self.get = {};
		self.currentRoute = null;
		self.currentPath = '';

	}

	Router.prototype = {
		setPreMiddleware: function (preMiddleware) {
			var self = this;
			self.preMiddleware = preMiddleware || null;
		},
		setNoRouteHandler: function (noRouteHandler) {
			var self = this;
			self.noRouteHandler = noRouteHandler || null;
		},
		clearPath: function (path) {
			return path.replace(this.hash, '');
		},
		evaluateCurrentLocation: function () {
			var self = this,
				path = self.currentPath,
				params = [],
				currentRoute;

			self.currentRoute = null;
			self.routes.forEach(function (route) {
				if (route.match(path)) {
					currentRoute = self.currentRoute = route;
					return;
				}
			});

			if (self.preMiddleware) {
				self.preMiddleware(self);
			}

			if (currentRoute) {
				currentRoute.handler();
			} else if (self.noRouteHandler) {
				self.noRouteHandler();
			}
		},
		start: function (timeout) {
			var self = this;

			timeout = timeout || 0;
			History.Adapter.bind(window, 'statechange', function () {
				self.listen(self);
			});

			setTimeout(function () {
				self.listen(self);
			}, timeout);

		},
		listen: function (self) {
			var State,
				hash = '',
				hashEndString = 0;

			State = History.getState();
			self.currentPath = self.sanitize(State.hash);
			self.currentRoute = null;

			//console.info(self.currentPath, ' || ' ,State.hash, State);
			self.evaluateCurrentLocation();
		},
		sanitize: function (hash, addHash) {
			var self = this,
				hashEndString = 0,
				hasHash = false;


			hashEndString = hash.indexOf('?&_suid=');
			hashEndString = hashEndString !== -1 ? hashEndString : hash.length;

			hash = hash.substr(0, hashEndString);
			hash = hash.replace(/\/$/, "");
			hash = hash ? hash : '/';


			hasHash  = hash.indexOf('#/') === 0;
			if (addHash) {
				hash = hasHash ? hash : '#' + hash;
			}

			return hash;
		},
		on: function (path, callback) {
			var self = this;
			path = self.clearPath(path);
			self.routes.push(new Route(
				path,
				callback,
				{
					hash: self.hash
				}
			));
		},
		moveUp: function (hardcodedPath) {
			var self = this,
				path = hardcodedPath || self.currentPath || '',
				pathDivided = path.indexOf('/') >= 0 ? path.split('/') : [],
				newPath = '';

			if (pathDivided.length) {
				newPath = pathDivided.slice(0, pathDivided.length - 1);
				newPath = newPath.join('/');
			}

			//

			if (!self.isValid(newPath)) {
				console.log(newPath);
				self.currentPath = newPath;
				self.moveUp(newPath);
			} else {
				console.log(newPath);
				self.navigate(newPath, 'redirect');
			}
		},
		back: function (path) {
			History.back();
		},
		navigate: function (path, title, data) {
			var self = this,
				sanitizedPath = self.sanitize(path, true);
			data = data || null;
			title = title || null;



			//console.log('#' + self.currentPath, sanitizedPath);
			if ('#' + self.currentPath !== sanitizedPath) {
				History.pushState(data, title, sanitizedPath);
			}

		},
		isValid: function (path) {
			var self = this,
				isValid = false;

			path = self.clearPath(path);
			self.routes.forEach(function (route) {
				if (route.match(path)) {
					isValid = true;
					return;
				}
			});

			return isValid;
		},
		getRoute: function (path) {
			var self = this,
				currentRoute = null;

			path = self.clearPath(path);
			self.routes.forEach(function (route) {
				if (route.match(path)) {
					currentRoute = route;
					return;
				}
			});

			return currentRoute;
		},
		convertToParams: function (params) {

			var self = this,
				paramsAssoc = [],
				paramsArray = params.split('?')[1].split('&'),
				itemArray;

			paramsArray.forEach(function (item) {
				itemArray = item.split('=');
				paramsAssoc[itemArray[0]] = itemArray[1];
			});

			self.get = paramsAssoc;

			return paramsAssoc;
		},
		map: function (a, route) {
			var self = this,
				currentRoute = '';
			route = route || '';
			for (var key in a) {
				switch (typeof a[key]) {
					// { '/path': { ... }}
					case 'object':

						if (Array.isArray(a[key])) {
							currentRoute = key === 'on' ? '' : key;

							self.on(route + currentRoute, a[key]);
						} else {


							if (key === 'on') {

								self.on(route, a[key]);
							} else {

								self.map(a[key], route + key);
							}

						}
						break;
					// '/path': function(ctx){ ... }
					case 'function':
						currentRoute = key === 'on' ? '' : key;
						console.info(route + currentRoute, a[key]);

						self.on(route + currentRoute, a[key]);
						break;
				}
			}
		}


	};

	return new Router({
        hash: self.hash
    });
});
