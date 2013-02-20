App.module("Data",function(Data){
		// Data.ready callback signals that the page collection has been retrieved
	Data.ready = new Backbone.Marionette.Callbacks();
	
	Data.on("before:start", function(options){ 

		// make options available, or use default
		options = options || {};
		options.url = options.url || "http://localhost";
		options.requests = options.requests || [{'command':'get_page_index','custom_fields':''}];
		Data.options = options;

	});

	Data.addInitializer(function(){
		
		Data.Page_collections = [];
		
		_.each(Data.options.requests,function(request){
			var WP_Item = new Backbone.Collection();
			var Options = Data.options;
			
			WP_Item.url = Options.url + "/?json="+request.command+"&custom_fields="+request.custom_fields;
			WP_Item.fetch({success: function(collection,resp){
			console.log('collection fetched', resp)
			}}).done(function(){
				
				Data.Page_collections.push(WP_Item);
			
				//trigger callback because all data is ready

				Data.ready.run();

			});
			
			
	
		});
	});
});
