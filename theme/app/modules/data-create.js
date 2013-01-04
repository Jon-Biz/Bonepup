App.module("Data", function(Data){

	// Data.ready callback signals that the page collection has been retrieved
	App.Data.ready = new Backbone.Marionette.Callbacks();

	// Initializer fetches PageCollection from server, calls Data.ready when done	
	App.addInitializer(function(){
		
		Data.Pages = new Data.PageCollection();
		Data.Pages.url = "/?json=get_page_index&custom_fields=description";
		Data.Pages.fetch({success: function(collection,resp){
			console.log('collection fetched', resp)
			}}).done(function(){
				
				/*
				console.log('DATA output');
				console.log(JSON.stringify(Data.Pages.toJSON()));
				*/

				//create collection of all page models, for search
				Data.PageIndex =  new Data.PageCollection(Data.Pages.returnmodels());
	
				//create product collection, menu collection
				Products = new Data.PageCollection(Data.Pages.where({description: 'gallery'}));
				Menu = new Data.PageCollection(Data.Pages.where({description:'menu'}));
			
				//trigger callback because all data is ready
				App.Data.ready.run();

			});
	});
});
