/* global requirejs */

requirejs([
    'jquery',
    'knockout',
    'js/Navigation',
    'js/Router',
    'js/Application',
    'pubsub',
    'controllers/section',
    'js/ko.bindingHandlers',
    'es5Shim'
], function ($, ko, Navigation, router, Application, pubsub) {
    'use strict';

    $(document).ready(function () {


        $('a[href]').click(function (e) {
            var $el = $(this),
                href = $el.attr('href');

            e.stopPropagation();
            e.preventDefault();
            if (!href) {
                return false;
            }

            if (href.indexOf('#') !== 0) {
               href = '#' + href;
            }

            router.navigate(href);

            return false;
        });

        router.start();

    });

});
