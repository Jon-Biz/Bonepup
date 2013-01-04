App.module("KateDesign", function(KateDesign){

	App.addInitializer(function(){
		
				App.addRegions({
				MainRegion: "#product-display"
			});
			
		App.vent.bindTo('KD:gallery', KateDesign.Gallery);
	});

////////////////////////////////////////
	
	KateDesign.Gallery = function(Gallery){		
		
		console.log(Gallery.get('slug'));
		var Gallery = Gallery.get('children');

		var GalleryView = new KateDesign.CollectionGalleryView({collection:Gallery});		
	
		KateDesign.Load = function(GalleryView){
			App.MainRegion.show(GalleryView);	
				console.log('gallery loaded');
				$('#wrapper').animate({opacity:1},600, function(){
						
				});
			}

		KateDesign.OnImageLoad.add(function(options){console.log('imageloaded')});	
	
		KateDesign.OnImageLoad.add(function(options){KateDesign.Load(GalleryView);});	
	
	};

////////////////////////////////////
			
	KateDesign.PageGalleryView = Backbone.Marionette.ItemView.extend({
		tagName:"div"
		,className:"image-box"
		,template:"#galleryitem"
		,initialize:function(){
			_(this).bindAll('onclick');
			_(this).bindAll('onmouseover');
			_(this).bindAll('onmouseout');
			_(this).bindAll('onmodelselected');			

			//set up callback for when other views are called			
			this.onclickBind = App.vent.bindTo('KD:modelselected',this.onmodelselected);
		}		
		,templateHelpers:{
			grabthumbnail: function(){
				
				//if the model's attachment array has any contents,return the last one's url'
				if(this.attachments.length){
					url = (this.attachments[this.attachments.length-1].images.full.url);
					return url;		
				}
			}
		}
		,onRender: function(){
			description = this.$('.prod_description').detach();
			description.appendTo('#description-box');
		}
		,events: function(){
			
			events = {};					
			events['click']	=	'onclick';
			events['mouseover']	=	'onmouseover';
			events['mouseout']	=	'onmouseout';
			
			return events;
		}
		,onmouseover: function(){

			//light up pointer, display description

			this.$('.pointer').animate({opacity:1.0},250);
			description = '#description-'+this.model.get('id');
			$(description).animate({opacity:1.0},1250);
			
		}
		,onmouseout: function(view){
			
			console.log('onmouseout',this.model.get('title'));
			//remove pointer
			this.$('.pointer').stop(true).animate({opacity:0.0},250);
			$('#description-'+this.model.get('id')).stop(true).animate({opacity:0.0},250, function() {
    		// Animation complete.
  
  			}
  		);	
			
		}
		,onclick: function(){

			// let peer views know that a click has been called.		
			App.vent.trigger('KD:navigate',this.model);
						
			/* animation 2
			this.$el.stop(true).animate({opacity:1.0},750).animate({left:"0px"},750);
			*/
		}
		,onmodelselected:function(options){
			var model = options[0];
			var left = -options[1];
			console.log('left is'+left);
			
			this.onmouseout();
			
			if(this.model != model){
				KateDesign.vanisher(this);
			}else{
								
				/* animation 1		*/
				//console.log('fsdfsdsds=========='+targetstr);
				this.$el.stop(true).animate({opacity:1.0},750).animate({left:'0px'},750,function(){

					$('.img',this.el).animate({top:'0px',width:'300px'},750, function(){
						console.log('animate done');
						App.vent.trigger("KD:subviewsready",model);
					});
				});
				
				/* animation 2

				this.$el.stop(true).animate({opacity:1.0},750).animate({left:"0px"},750,function(){
						console.log('animate done');
						App.vent.trigger("KD:subviewsready",model);
				});
		
				$('.img',this.el).animate({opacity:1.0},750).animate({top:'0px',width:'300px'},750, function(){});

 */
				
			};
		}
		,onnavigate:function(){}
		,navigate:function(){
			
			parentslug = this.model.get('parent').get('slug');
			Route.navigate("#"+parentslug+"/#"+this.model.get('slug'));
			App.vent.trigger('KD:navigate',this.model);

		}
		,onClose:function(){
			console.log('close called on '+this.cid);
			App.vent.unbindFrom(this.onclickBind);

		}
	});

	KateDesign.CollectionGalleryView = Backbone.Marionette.CompositeView.extend({
		template:"#galleryview"
		,tagName:"div"
		,id:"gallery"
		,itemView:KateDesign.PageGalleryView
  	,appendHtml: function(collectionView, itemView, index){
	    collectionView.$("#carousel").append(itemView.el);
  	}
  	,initialize: function(){	
  		
			this.onnavigateBind = App.vent.bindTo('KD:navigate',this.onnavigate,this);								
			this.onsubviewsready = App.vent.bindTo('KD:subviewsready',this.subviewsready,this);
	
			// create array of callbacks to be called once the images have been prefetched		
			/**/
			this.deferredArr = $.map(this.collection.models, function(model){

				attachments = model.get('attachments');
				
				//TODO this doesn't call back
				if(attachments.length){
					console.log('attachment :'+model.get('slug'));
					console.log('url :'+attachments[attachments.length-1].images.full.url);
					url = (attachments[attachments.length-1].images.full.url);
	
					$.get(url,function(data){
						
//						console.log('data');
//						return data;
					})
				} else {
					return;
				};
				
			});

			// apply the array of callbacks to the when jquery object
			// trigger the OnImageLoad callback once they are have all completed.
			$.when.apply(this, this.deferredArr).then(function(){KateDesign.OnImageLoad.run();});
//			KateDesign.OnImageLoad.run();

/*			this.collection.each(function(model){
				console.log(model.get('custom_fields').description[0]);
				});
			*/	

		}
		,events: function(){
			
			events = {};					
			events['mouseover']	=	'onmouseover';
			events['mouseout']	=	'onmouseout';
			events['click #right'] = 'arrowright';
			events['click #left'] = 'arrowleft';

			return events;
		}
		,arrowright: function(){

			if(this.sumX+this.left-580>0){
	
				this.left = this.left-145;
					
				var stringleft = this.left+'px';
				this.$('#carousel').animate({left:stringleft},500);
				this.$('#left').stop().animate({opacity: 0.5},1500);
	
				if(this.sumX+this.left-580<=0){
					
				this.$('#right').stop().animate({opacity: 0.0},500);
				
				}
			}			
		}
		,arrowleft: function(){
			if(this.left < 0){
	
				this.left = this.left+145;
				console.log('left is '+this.left)
				var stringleft = this.left+'px';
				this.$('#carousel').stop().animate({left:stringleft},500);
				this.$('#right').stop().animate({opacity: 0.5},1500);

				if(this.sumX>=0){	
					this.$('#left').stop().animate({opacity: 0.0},500);
				}
			}
		}
		,onmouseover: function(){

			//light up pointer, display description
			if(this.left < 0){
				console.log('lefth is '+this.left);
				this.$('#left').stop().animate({opacity: 0.5},1500);
				
			}

			if(this.sumX+this.left-580>0){
				
			this.$('#right').stop().animate({opacity: 0.5},1500);
			

			}
			

			
		}
		,onmouseout: function(view){
			
			this.$('.arrow').stop().animate({opacity: 0.0},500);
  	}	
		,onRender: function(){
			
		  this.left = 0;
			/*animation 1 */
			this.$('#carousel').css({left:'750px'});
			var sumX = 0;

			_.each(this.children, function(child){
				//set model's offset in relation to all the models to the left

				child.$el.css({left:(sumX)});
				//determine the offset of models to the right
				attachments = child.model.get('attachments');
				//sumX = sumX + attachments[attachments.length-1].images.large.width;
				sumX = sumX + 145;
			});

//				this.$el.animate({left: 0},1500,'easeOutQuad');
			this.$('#carousel').animate({left: 0},1500);
			this.sumX = sumX;

			/* animation 2

			var sumX = 0;
			_.each(this.children, function(child){
				//set model's offset in relation to all the models to the left
				child.positionX = sumX;
				initposit = sumX+750;
				child.$el.css({left:(sumX+750)});
				//determine the offset of models to the right
				attachments = child.model.get('attachments');
				//sumX = sumX + attachments[attachments.length-1].images.large.width;
				sumX = sumX + 145;
				child.$el.animate({left: child.positionX},1500);
			});
		
			// if all the bottles are wider than the screen
			// display arrow overlay
			console.log('sum X is '+sumX);

			*/
		}

		,onClose:function(){
			console.log('close called on '+this.cid);
			App.vent.unbindFrom(this.onnavigateBind);
			App.vent.unbindFrom(this.onsubviewsready);
			}

		,onnavigate: function(selected_model){
			// ignore if we are already open
			console.log('checking model...');
			if(this.model == selected_model){
			}else{
				var submodel = false;
				this.collection.each(function(model){
					if (model == selected_model){
						submodel = true;
						$('.arrow').animate({opacity: 0},250);
						var options = [model,this.left]
						console.log(this.left);
						App.vent.trigger('KD:modelselected',options);	
					}
				},this);

				if(!submodel){
					this.$el.stop(true).animate({opacity:0.0},750, function(){
					KateDesign.onViewReady(selected_model);
					})
				}
			}
		}
		,subviewsready:function(model){
			console.log('onsubviewsready called');
			parentslug = model.get('parent').get('slug');
			App.vent.trigger('KD:productfromgallery',model);

			Route.navigate("#"+parentslug+"/#"+model.get('slug'));
		}
	
	});	
});
