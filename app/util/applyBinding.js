/* global define */
define([
    'jquery',
    'knockout'
], function ($, ko) {
    return function applyBinding(elementId, template, VM, context) {
        var element = $('#component-' + elementId)[0];//document.getElementById(elementId);
        template = template || '';
        VM = VM || {};
        context = context || {};

        if (element) {
            ko.cleanNode(element);
            ko.applyBindingsToNode(element, {
                template: {
                    'if': VM && template,
                    name: template,
                    data: VM
                }
            }, context);
        }

    };
});