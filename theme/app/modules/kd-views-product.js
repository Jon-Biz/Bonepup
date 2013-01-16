App.module("KateDesign", function(KateDesign){
	

/////////////////////////////////////////////////////////	
	// SINGLE PRODUCT VIEW
/////////////////////////////////////////////////////////	

	// View Trigger Function
	
	App.addInitializer(function(){
		App.vent.bindTo('KD:product', KateDesign.Product);
	});
	
	KateDesign.Product = function(Product){
		console.log(Product);
		var ProductView = new KateDesign.ProductView({'model':Product});
		
		KateDesign.ProdLoad = function(ProductView){
			ProductView.$el.css({opacity:0.0});
					ProductView.$el.stop(true).animate({opacity:1.0},500);
	
			App.MainRegion.show(ProductView);	
				console.log('gallery loaded');
				$('#wrapper').animate({opacity:1},600, function(){
								
				});
			}
				
// TODO fix preload
		KateDesign.OnImageLoad.add(function(options){KateDesign.ProdLoad(ProductView);});	
		KateDesign.OnImageLoad.run();
	};

	// ALternative reveal called directly from Gallery

	App.addInitializer(function(){
		App.vent.bindTo('KD:productfromgallery', KateDesign.ProductfromGallery);
	});

	KateDesign.ProductfromGallery = function(Product){
		console.log("product from gallery");
		var ProductView = new KateDesign.ProductView({'model':Product});
		
		KateDesign.ProdLoadGallery = function(ProductView){
			App.MainRegion.on('view:show',function(view){		
					$('#product-display').animate({opacity: 1},1000);
				});
	
			//call the unveil callback to show the app
			App.MainRegion.show(ProductView);

			
		};

// TODO what is this?
		KateDesign.OnImageLoad.add(function(options){KateDesign.ProdLoadGallery(ProductView);});	
		KateDesign.OnImageLoad.run();

/*		$('#product-display').css({left: 0,opacity:1});		
			KateDesign.OnImageLoad.run();
			
		App.MainRegion.on('view:show',function(view){
				
				//$('#product-display').animate({opacity: 1},1000);
			});

		//call the unveil callback to show the app
		App.MainRegion.show(ProductView);

*/

};

	
	KateDesign.ProductView = Backbone.Marionette.ItemView.extend({
		tagName:"div"
		,className:"product"
		,template:"#productview"
		,initialize:function(){
			
			this.onnavigateBind = App.vent.bindTo('KD:navigate',this.navigate,this);							
			console.log('navigate bound');
		
		}
		,navigate: function(model){
			console.log('navigating from view');

			// remove	the view if this isn't it	
			if(this.model != model){
				// vanish the model.
				this.$el.stop(true).animate({opacity:0.0},500, function(){
					KateDesign.onViewReady(model);
				});
				
			};
		}
		,templateHelpers:{
			grabthumbnail: function(){
				//console.log('product this '+JSON.stringify(this));			
			//	return('http://192.168.0.35/wp-content/uploads/2012/05/bottle11.jpg');
				//default url is the last image uploaded


				//if the model's attachment array has any contents,return the last one's url'
				if(this.attachments){
							console.log('lenght '+this.attachments.length);	

					if(this.attachments.length){
						//TODO - make this the featured image instead
						
						 //url = (this.attachments[this.attachments.length-1].images.large.url);

						 _.each(this.attachments, function(attachment){
								url = attachment.images.large.url;
	
						});
						
					return url
				
					}
				}	
			}
		}
		,events: function(){
			
			events = {};					
			events['click']	=	'onclick';
			events['mouseover']	=	'onmouseover';
			events['mouseout']	=	'onmouseout';
			
			return events;
		}
		,onmouseover: function(){	
			console.log('onmouseover',this.model.get('title'));		
			
		}
		,onmouseout: function(view){
			console.log('onmouseout',this.model.get('title'));
			
		}
		,onclick: function(){
//			console.log('onclick',this.model.get('title'));
//			Route.navigate(this.model.get('title'));
//
//			KateDesign.Product(this.model.get('title'));
		}
		,onClose:function(){
			App.vent.unbindFrom(this.onnavigateBind);
			console.log('vanished view closed');

		}
	});
});
