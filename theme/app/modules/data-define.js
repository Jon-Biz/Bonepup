
App.module("Data", function(Data){

	// Page Model converts array of child pages to a collection on initialization, recursively creating data tree
	
	Data.PageModel = Backbone.Model.extend({
		defaults: {
			"title": "undefined"
			,"description": "undefined"
			,"xoffset":"0px"
			,"zoom":"300px"
		}
		,initialize: function(){			
			
			//if passed an array of children (rather than a collection), convert from json to a collection
			if (Array.isArray(this.get('children'))) {	
				var childrenmodels = new Data.PageCollection();
				      
	      _.each(this.get('children'), function(child){
	      	var childModel = new Data.PageModel();
	      	childModel.set(childModel.parse(child));
	      	console.log('adding child to collection '+this.get('title'));
	      	childrenmodels.add(childModel);
	      },this);   
	      
	      this.set({'children':childrenmodels});
			}			

		}
		,parse:function(resp, xhr){
			
			var page;
			
			//remove any status response
			//TODO - catch negative responses
			if (resp.status == 'ok'){
				var page = resp.page;
				console.log(page);
				this.parse(page, xhr);
			} else {
	
				//check for custom fields 'description', convert to attribute
				
				if(resp.custom_fields){
					if (resp.custom_fields.description){
						resp.description = resp.custom_fields.description[0];		 
					}
				}	
					
			}			
			
			return resp;
		}
	});
	
	

	// PageCollection contains the root models of the data tree (the galleries)
	
	Data.PageCollection = Backbone.Collection.extend({ 
		model: Data.PageModel
		,intialize:function(){
		}
		,returnmodels:function(){
			//returns all models, recursively
			var models = [];

			this.each(function(child){
				
				// add the child to the return array
				models.push(child);

				// if the child has children, add them too.
				var children = child.get('children');
				
				if(children&&children.length){
					models = models.concat(children.returnmodels());
				}

			});

			return models;
			
		}
		,parse:function(resp, xhr){
			
			var pages;
			
			//remove any status response
			//TODO - catch negative server responses
			if (resp.status == 'ok'){
				var pages = resp.pages;
				this.parse(pages, xhr);
			}
						
			return pages;
		}
		,url: "invalid url"
	});
	
});
