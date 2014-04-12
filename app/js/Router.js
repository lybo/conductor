/* global define */
define([
	'js/Route',
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

			if (currentRoute) {
				currentRoute.handler();
			}
		},
		start: function () {
			var self = this;

			History.Adapter.bind(window, 'statechange', function () {
				self.listen(self);
			});

			self.listen(self);

		},
		listen: function (self) {
			var State,
				hash = '',
				hashEndString = 0;

			State = History.getState();
			self.currentPath = self.sanitize(State.hash);

			console.info(self.currentPath, ' || ' ,State.hash, State);
			self.evaluateCurrentLocation();
		},
		sanitize: function (hash) {
			var self = this,
				hashEndString = 0;


			hashEndString = hash.indexOf('?&_suid=');
			hashEndString = hashEndString !== -1 ? hashEndString - 1 : hash.length;

			hash = hash.substr(0, hashEndString);
			hash = hash.replace(/\/$/, "");
			hash = hash ? hash : '/';

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

			if (!self.isValid(newPath)) {
				self.moveUp(newPath);
			} else {
				console.info('navigate: ', '/' + newPath);
				self.navigate('/' + newPath, 'redirect');
			}
		},
		back: function (path) {
			History.back();
		},
		navigate: function (path, title, data) {
			var self = this,
				sanitizedPath = self.sanitize(path);
			data = data || null;
			title = title || null;

			if ('#' + self.currentPath !== sanitizedPath) {
				History.pushState(data, title, path);
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