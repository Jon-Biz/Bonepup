App.module("KateDesign", function(KateDesign){
	
	App.addInitializer(function(){

		App.vent.bindTo('KD:navigate', function(model){			
				console.log('navigate called to '+model.get('slug'));
		});
		App.vent.bindTo('KD:gallery', function(model){
			console.log('KD:gallery called');
		})
		
		
	});
	
	KateDesign.onViewReady = function(model){

		if(model.get('description')=='gallery'){

			Route.navigate("#"+model.get('slug'));
			App.vent.trigger('KD:gallery',model);
	
		}else if(model.get('description')=='menu'){
			Route.navigate("#"+model.get('slug'));
			App.vent.trigger('KD:product',model);
		
		}else{
			parentslug = model.get('parent').get('slug');
			Route.navigate("#"+parentslug+"/#"+model.get('slug'));
			App.vent.trigger('KD:product',model);
	
		}
	}
});