/* global define, jwplayer */
define([
    'jquery',
    'knockout',
], function ($, ko) {
    'use strict';



	function Application() {
		var self = this;
		self.section = ko.observable('');
		self.sectionData = {};

	}

	Application.prototype = {



    };


    return Application;

});