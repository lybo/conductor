define([
  // FILE(S) BEING TESTED
  '../js/Router'
], function (router) {
	describe('Router', function () {
		describe('#isValid', function () {
			it('should return true when the route is not valid (doesn\'t exist)', function () {
				router.on('/lala', function () {

				});

				chai.assert.equal(true, router.isValid('/lala'));
				chai.assert.equal(false, router.isValid('/lala2'));

			});
		});

		describe('#convertToParams', function () {
			it('should return true from the parameter lala which is based on the url "?lala=true&lili=false"', function () {

				var params = router.convertToParams('?lala=true&lili=false');

				chai.assert.equal(params.lala, 'true');

			});
		});

		describe('#convertToParams', function () {
			it('should return undefined from the parameter lala which is based on the wrong url "lala=true&lili=false"', function () {

				var params = router.convertToParams('lala=true?lili=false');

				chai.assert.equal(typeof params.lala, 'undefined');
			});
		});

		describe('#sanitise', function () {
			it('should return without ?&_suid=...', function () {


				chai.assert.equal('/test', router.sanitize('/test?&_suid=6564645646'));

				chai.assert.equal('#/test', router.sanitize('/test?&_suid=6564645646', false));

			});
		});



	});
});