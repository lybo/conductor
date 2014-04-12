define([
  // FILE(S) BEING TESTED
  '../js/Router'
], function(router) {
	describe('Router', function(){
		describe('#isValid', function(){
			it('should return true when the route is not valid (doesn\'t exist)', function(){
				router.on('/lala', function () {

				});

				chai.assert.equal(true, router.isValid('/lala'));
				chai.assert.equal(false, router.isValid('/lala2'));

			});
		});
	});

});