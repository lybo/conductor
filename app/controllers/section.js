/* global requirejs */

requirejs([
    'jquery',
    'knockout',
    'pubsub',
    'js/Router'
], function ($, ko, pubsub, router) {
    'use strict';

    var element = document.getElementById('section');
    var app = {
        section: ko.observable(''),
        VM: {}
    };

    router.on('/contact', function (ctx) {
        pubsub.publish('section', {
            template: 'contact',
            data:{
                one: 1,
                two: 2
            }
        });
    });

    router.on('/conductor', function (ctx) {
        console.log('aaaaaaaaaaaaa');
        pubsub.publish('section', {
            template: 'home',
            data:{
                one: 'fsfdfsfs',
                two: 'giorgos'
            }
        });
    });

    pubsub.subscribe('section', function (msg, data) {
        app.section(data.template);
        app.VM = data.data;



        ko.cleanNode(element);
        ko.applyBindings(app, element);


    });



    //data-bind="template: {if: VM, name: section, data: VM}"
});
