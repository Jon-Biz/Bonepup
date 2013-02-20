
var App = new Backbone.Marionette.Application();

AppController = {
	index: function() {
		})
	}  
};

Router = Backbone.Marionette.AppRouter.extend({
  appRoutes: {
    "": "index"
  },
  controller: AppController
});


App.addInitializer(function(){


});
			
App.bind('initialize:before',function(options){
	
});

// Trigger the initial route and enable HTML5 History API support

App.bind("initialize:after", function(options){
			console.log('initializer called');	
  Route = new Router();  

});  
