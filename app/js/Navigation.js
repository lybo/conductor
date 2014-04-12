/* global define */
define([
	'js/Router'
], function (router) {
	function Navigation(config) {
		var self = this;

		self.hash = '#';
		self.viewModel = config.viewModel || {};



        /*var router = new Router({
            hash: pager.Href.hash,
            mv: viewModel
        });*/


        var initPortfolio = function (ctx) {
            if (!self.viewModel.projects().length) {
                console.log('INIT PORTFOLIO');
                self.viewModel.getData();
            }
        };

        var lala = function (ctx, next) {
            alert('1');
            //console.log(ctx);
            ctx.giorgos = true;
            next();
        };

        router.on('/', function () {
            alert('/Home');
        });
        router.on('', function () {
            alert('Home');
        });
        router.on('/portfolio', initPortfolio);
        router.on('/portfolio/:portfolioId', initPortfolio);
        router.on('/portfolio/:portfolioId/:params', function (ctx) {
            initPortfolio(ctx);
            router.convertToParams(ctx.params.params);
            alert(router.get.order);
            console.log(portfolioId, router.get.order);
        });
        router.on('/contact', [
            lala,
            function (ctx) {
                console.log(ctx);
                alert('2');
                router.navigate("/about/1/2/3", "State 1", {state:1});
            }
        ]);



        //#!/about/?lala=lolo/dfgdfg/dfgdfg
        router.on('/about/:storyId/:skataIs/:toualetaId',[
            lala,
            function (ctx) {
                router.moveUp();
                //console.log(ctx.params);
                //router.convertToParams(ctx.params.storyId);
                //alert(router.get.lala);
            }
        ]);



        router.on('/about/:lala', function (ctx) {
            alert(ctx.params.lala);
        });

        router.on('/conductor', function (ctx) {
            //router.navigate("/", "home", {state:1});
        });

//https://github.com/visionmedia/express/blob/master/examples/route-map/index.js
        router.map({
            '/test': {
                '/lala': [
                        lala,
                        initPortfolio
                ],
                '/lala2': {
                    '/lolo': function () {
                        alert('lolo');
                    },
                    on: [
                        lala,
                        function (ctx) {
                            alert('lala2');
                        }
                    ]
                }
            },
            '/test2': {
                '/lala': initPortfolio
            }
        });

        router.start();


	}

	return Navigation;
});