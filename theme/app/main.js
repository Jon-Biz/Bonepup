
var App = new Backbone.Marionette.Application();

AppController = {
	index: function() {
		console.log('index triggered');
		//call back if data is already here
		App.Data.ready.add (function(options){

			var default_page = App.Data.Pages.where({'slug':'bottles'})[0];

			App.vent.trigger('KD:navigate',default_page);
			App.KateDesign.onViewReady(default_page);
		})
  }
	,product: function(hash){
		console.log('other triggered');
		console.log(hash);
		App.Data.ready.add (function(options){
			//	App.KateDesign.Gallery(hash);	

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


// Helper fucntions

App.unveil = function(options){
	$('#wrapper').animate({opacity:1},600, function(){
	App.MainRegion.show(options);
	});
} ;


function locationHashChanged() {
                  console.log("location changed: "+window.location.toString()) 
};
window.onhashchange = locationHashChanged;

