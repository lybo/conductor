define([
  // FILE(S) BEING TESTED
  '../util/Router'
], function (router) {
	var assert = chai.assert;
	describe('Router', function () {
		describe('#isValid', function () {
			it('should return true when the route is not valid (doesn\'t exist)', function () {
				router.on('/lala', function () {

				});

				assert.equal(true, router.isValid('/lala'));
				assert.equal(false, router.isValid('/lala2'));

			});
		});

		describe('#convertToParams', function () {
			it('should return true from the parameter lala which is based on the url "?lala=true&lili=false"', function () {

				var params = router.convertToParams('?lala=true&lili=false');

				assert.equal(params.lala, 'true');

			});
		});

		describe('#convertToParams', function () {
			it('should return undefined from the parameter lala which is based on the wrong url "lala=true&lili=false"', function () {

				var params = router.convertToParams('lala=true?lili=false');

				assert.equal(typeof params.lala, 'undefined');
			});
		});

		describe('#sanitise', function () {
			it('should return without ?&_suid=...', function () {


				assert.equal('/test', router.sanitize('/test?&_suid=6564645646'));

				assert.equal('#/test', router.sanitize('/test?&_suid=6564645646', true));

			});
		});



	});
});