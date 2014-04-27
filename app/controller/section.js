/* global define */

define([
    'jquery',
    'knockout',
    'pubsub',
    'util/applyBinding',
    'util/Router',
    'template!view/contact.html'
], function ($, ko, pubsub, applyBinding, router) {
    'use strict';

    return (function () {
        var VM = {
            one: ko.observable('contact'),
            two: ko.observable('header')
        };

        router.on('/contact', function (ctx) {

            //VM.one('1');
            //VM.two('2');
            pubsub.publish('section', VM);
        });

        router.on('/contact/:lala', function (ctx) {

            VM.one(ctx.params.lala);
            VM.two('2');

            pubsub.publish('section', VM);
        });

		router.on('/contact/:lala/:lolo', function (ctx) {

            VM.one(ctx.params.lala);
            VM.two(ctx.params.lolo);

            pubsub.publish('section', VM);
        });
        router.on('/', function (ctx) {
            console.log('aaaaaaaaaaaaa');

            VM.one('aaaaaaaaa');
            VM.two('2');

            pubsub.publish('section', VM);
        });

        pubsub.subscribe('navigation:error', function (msg, data) {
            VM.one(data);
        });


        applyBinding('section', 'contact', VM);
    });
});
