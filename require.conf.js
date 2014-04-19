/* global requirejs */


//https://gist.github.com/maicki/7781943
requirejs.config({
    baseUrl: "app",
    shim: {

    },
    paths: {
        es5Shim: 'bower/es5-shim/es5-shim.min',
        jquery: 'bower/jquery/jquery.min',
        pubsub: 'bower/pubsub-js/src/pubsub',
        knockout: 'js/knockout-3.0.0rc.debug',
        template: 'bower/knockout-require-templates/template',
        stringTemplateEngine: 'bower/knockout-require-templates/stringTemplateEngine',
        text: 'bower/text/text'//,
        //history: 'bower/history.js/scripts/bundled/html4+html5/native.history'
    }
});