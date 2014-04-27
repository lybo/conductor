/* global define */
define([
    'knockout',
    'util/Router',
    'pubsub',
    'template!view/contact.html',
	'template!view/home.html'
], function (ko, router, pubsub) {
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


        router.on('/about/:lala', function (ctx) {
            alert(ctx.params.lala);
        });

        //#!/about/?lala=lolo/dfgdfg/dfgdfg
        router.on('/about/:storyId/:skataIs/:toualetaId',[
            lala,
            function (ctx) {
                alert('moveup');
                router.moveUp();
                //console.log(ctx.params);
                //router.convertToParams(ctx.params.storyId);
                //alert(router.get.lala);
            }
        ]);



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






	}

	return Navigation;
});