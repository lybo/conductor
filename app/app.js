/* global requirejs */

requirejs([
    'jquery',
    'knockout',
    'js/Navigation',
    'js/Router',
    'js/Application',
    'js/ko.bindingHandlers',
    'es5Shim',
    //'less!../antoniaskaraki.com/css/style.less',

], function ($, ko, Navigation, router, Application) {
    'use strict';


    $(document).ready(function () {


        var viewModel = new Application();

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


        var navigation = new Navigation({
            hash: '#',
            viewModel: viewModel
        });

        $.extend(viewModel, navigation);


        ko.applyBindings(viewModel);

        $('#content').fadeIn(500);

    });

});
