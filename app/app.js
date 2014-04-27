/* global requirejs */

requirejs([
    'jquery',
    'knockout',
    'util/Router',
    'util/features',
    'pubsub',
    'es5Shim',
    /* conductor: features */'controller/footer','controller/header','controller/section'/* /conductor */
], function ($, ko, router, features, pubsub) {
    'use strict';

    $(document).ready(function () {


        $('body').on('click', 'a[href]', function (e) {
            var $el = $(this),
                href = $el.attr('href'),
                currentRoot = [];

            e.stopPropagation();
            e.preventDefault();
            if (!href) {
                return false;
            }

            if (href.indexOf('#') !== 0) {
               href = '#' + href;
            }

            if (href) {
                currentRoot = href.split('/');
                currentRoot = currentRoot[1] ? '/' + currentRoot[1] : '';
            }

			//pubsub.publish('navigation.change', href.substr(1));
            router.navigate(href);
			
            return false;
        });

        router.setPreMiddleware(function (router) {
			
			pubsub.publish('navigation.change', router.currentPath);
            //console.info(router, router.currentPath, router.currentRoute.path);
        });
		
		router.setNoRouteHandler(function () {
			//alert('no page');
			pubsub.publish('navigation:error', 'no content');
		});

        features();
        //runFeatures();
        router.start(10);


    });

});
