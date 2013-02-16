App.module("KateDesign", function(KateDesign){

	// Image pre-load callback
	KateDesign.OnImageLoad = new Backbone.Marionette.Callbacks();

	// Item selection callback
	KateDesign.OnClick = new Backbone.Marionette.Callbacks();

	// Menu routes have been created from the data callback
	KateDesign.ready = new Backbone.Marionette.Callbacks();

	

	App.Data.ready.add (function(options){
		
		KateController = {
				fruit:function(hash){
					console.log('fruit '+hash);
					var model = App.Data.PageIndex.where({'slug':hash})[0];

					App.KateDesign.Gallery(model);
				}
				,nuts:function(hash){
					var model = App.Data.PageIndex.where({'slug':hash})[0];
					console.log('nuts '+hash);

					App.KateDesign.Product(model);
				}
				
			};
	
		KateRoutes = function(){
			var routes = {};
			bar = ':gallery'
			
			routes[bar]= 'fruit';
			Products.each(function(product){
				console.log('product page is ',product.get('slug'));
				foo = product.get('slug')+"/#:product";
				routes[foo]= 'nuts';

			})
	
			return routes;
		}
		
		KateRouter = Backbone.Marionette.AppRouter.extend({
			appRoutes: KateRoutes()
			,controller: KateController
		});	
			
	  kateroute = new KateRouter();  
	  KateDesign.ready.run();
	});  

	App.KateDesign.ready.add(function(options){
		if (Backbone.history){
			Backbone.history.start();
		}
	});

		/*var Router = Backbone.Marionette.AppRouter.extend({
		  appRoutes: function(){
		  	routes = {};
		  	function addpage(pagename,pagefunction){
		  		childrenpages = pagename+"/:hash";
		  		routes[pagename]=pagefunction;
		  		routes[pagename]
		  	}
		  	Products.each(function(product){
					pagename = product.get('slug');
					pagefunction = (function(){
						if (product.get('description') == 'gallery'){ 
							
					} else {return 'not gallery'
					});
		  		addpage(pagename,pagefunction);
		  	});

				return routes				
		  },
		  controller: Controller
		});	
		
	};
	
	*/

});	