App.module("Data",function(Data){
		// Data.ready callback signals that the page collection has been retrieved
		Data.ready = new Backbone.Marionette.Callbacks();
		
		Data.on("before:start", function(options){ 

			options = options || {};
			options.url = options.url || "localhost";
			options.requests = options.requests || [{'command':'get_page_index','custom_fields':''}];
			Data.options = options;

		});


});
