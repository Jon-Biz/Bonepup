App.module("KateDesign", function(KateDesign){

/////////////////////////////////////////////////////////	
	//This section Contains the view that shows the navigation menu
/////////////////////////////////////////////////////////	


//On data ready callback, create and show the menu view
	
	App.Data.ready.add (function(options){

		KateDesign.MenuCallback = new Backbone.Marionette.Callbacks();
		var ListView = new Backbone.Marionette.CollectionView({
			tagName:"ul"
			,itemView:KateDesign.PageListView
			,className:'Products'
			,collection:Products
			});
	
		App.addRegions({
			SideBarRegion: "#secondary"
			});
		
		App.SideBarRegion.show(ListView);

	});

//  VIEWS /////////////////////////////////////////////////	

	KateDesign.PageListView = Backbone.Marionette.CompositeView.extend({
		tagName:"li"		
		,className:"page"
		,initialize:function(){
	
			_(this).bindAll('onclick');
			
			var children = this.model.get('children')
			
			if(children.length){
				this.collection = children;
				this.collection.each(function(item){
					// give each child view's model a reference to this view's model					
					item.set({parent:this.model});
				},this);
			}

			//bind navigation event to view and vent 

			App.vent.bindTo('KD:navigate', this.onnavigate,this);
		}
		,onnavigate:function(model){
	
			if(this.collection){
				id = this.model.get('id');
				var open = false;
				
				// if this has just been navigated to, flag true
				if (this.model == model){
					open = true;
				};
				
				// check if any children were navigated to, and flag true 
				this.collection.each(function(child){
					if (child == model){
						open = true;				
					}
				});				
				
				// if anything in this tree has been flagged, animate open
				// else animate closed
				if(open){
					children = this.$("#children-"+id);
					children.stop().animate({'height':(children.children().length*1.7)+'em'},250);			
					
				}else{
					children = $("#children-"+id);
					children.animate({'height':'0em'},250);						
				};

			};
			
		}
		,template: "#page"
		,events: function(){		
				id = this.model.get('id');
				events = {};					
				events['click #title-'+id]	=	'onclick';
				return events;
		}
		,onclick: function(){
			console.log('navigate');
			App.vent.trigger('KD:navigate',this.model);

		}
		,appendHtml: function(collectionView, itemView){
        // ensure we nest the child list inside of
        // the current list item
        collectionView.$("ul:first").append(itemView.el);
    }

	});
	
});
