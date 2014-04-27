/* global define */

define([
    'jquery',
    'knockout',
    'pubsub',
    'util/applyBinding',
    'util/Router',
    'template!view/header.html',
    'template!view/menuItem.html'
], function ($, ko, pubsub, applyBinding, router) {
    'use strict';

	function activateParent (parent) {
		if (parent) {
			parent.isSelected(true);
			console.log('parent', parent.title(), parent.isSelected());
			activateParent(parent.parent());
		}
	}
    var currentRoute = ko.observable(null);
    function MenuItem(conf) {
        var self = this,
			wasSelected = false;

		self.parent = ko.observable(null);
        self.href = ko.observable(conf.href || '');
        self.title = ko.observable(conf.title || '');
        self.sub = ko.observableArray(conf.sub || []);
        self.currentRoot = ko.observable('');
        self.isSelected = ko.observable(false);
        self.isSelectedRoute = ko.computed(function () {
            var res = false,
                path = self.href();
			
            if (router) {
                res = currentRoute() === path || false;
            }
			if (res) {
				activateParent(self.parent());	
			}
			console.log(self.title(), res);
			self.isSelected(res);
        });
/*
        self.isSelected = ko.computed(function () {
            return self.isSelectedParent() || self.isSelectedRoute();
        });
*/
		

		self.isSelected.subscribe(function (oldValue) {
			wasSelected = oldValue;
		}, self, 'beforeChange');

		self.isSelected.subscribe(function (newValue) {
			var parent = self.parent();
			if (parent && newValue && !parent.isSelected()) { 
				
				//console.log('parent2:', parent.title(), parent.isSelected(), newValue);
				
				//parent.isSelected(newValue);
				/*if (parent.isSelected() !== newValue) {
					parent.isSelected(newValue);
				} else  {
					//parent.isSelectedParent();
				}*/
			}
		});

		self.sub().forEach(function (item) {
			item.parent(self);
		});
	}

    pubsub.subscribe('navigation.change', function (msg, href) {
        currentRoute(href);
    });

    return (function () {
        var VM = {
            currentRoute: ko.observable(null),
            menu: ko.observableArray([
                new MenuItem({href: '/contact', title: 'contact', sub: [
                    new MenuItem({href: '/contact/lala', title: 'contact2.1'}),
                    new MenuItem({href: '/contact/lolo', title: 'contact2.2', sub: [	
                    	new MenuItem({href: '/contact/lolo/lili', title: 'contact2.2.1'}),
                    	new MenuItem({href: '/contact/lolo/lili1', title: 'contact2.2.2'}),
                    	new MenuItem({href: '/contact/lolo/lili2', title: 'contact2.2.3'}),
					]}),
                    new MenuItem({href: '/contact/koo', title: 'contact2.3', sub: [	
                    	new MenuItem({href: '/contact/lolo/lili23', title: 'contact2.3.1'}),
                    	new MenuItem({href: '/contact/lolo/lili21', title: 'contact2.3.2'}),
                    	new MenuItem({href: '/contact/lolo/lili22', title: 'contact2.3.3'}),
					]})
                ]}),
                new MenuItem({href: '/contact3', title: 'contact3'}),
                new MenuItem({href: '/contact4', title: 'contact4'})
            ])
        };

        applyBinding('header', 'header', VM);
    });
});
