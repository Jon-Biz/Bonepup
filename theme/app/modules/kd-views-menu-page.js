App.module("KateDesign", function(KateDesign){

/////////////////////////////////////////////////////////	
	// TOP OF SCREEN MENU VIEW
/////////////////////////////////////////////////////////	

	//On data ready callback, create and show the view
	App.Data.ready.add (function(options){
	
			var MenuView = new Backbone.Marionette.CollectionView({
				itemView:KateDesign.PageMenuView
				,tagName:"ul"
				,className:'menu'
				,collection:Menu
				});
		
			App.addRegions({
				MenuRegion: "#access"
				});
			
			
			App.MenuRegion.show(MenuView);
	
		});
	//  VIEWS /////////////////////////////////////////////////	

	KateDesign.PageMenuView = Backbone.Marionette.CompositeView.extend({
		tagName:"li"
		,className:"page"
		,initialize:function(){
			_(this).bindAll('onclick');
			
			this.collection = this.model.get('children');
			
		}
		,template: "#menu"
		,events: function(){
		
			id = this.model.get('id');
			events = {};					
			events['click #title-'+id]	=	'onclick';
			return events;
		}
		,onclick: function(){
			App.vent.trigger('KD:navigate',this.model);
			
		}
		,appendHtml: function(collectionView, itemView){
        // ensure we nest the child list inside of
        // the current list item
        collectionView.$("ul:first").append(itemView.el);
    }

	});
	
});
