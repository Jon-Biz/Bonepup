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
			
			// retrieve the latest image to a convenience variable
			
			if(this.attachments){
					var latest = this.attachments.length-1;
					console.log('latest is ',latest);

					this.image = (this.attachments[latest].images.thumbnail.url);
				}

		}		
		,templateHelpers:{
			grabthumbnail: function(){
				if(this.attachments){
					var latest = this.attachments.length-1;
					console.log('latest is ',latest);

					return (this.attachments[latest].images.thumbnail.url);
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
			$(description).animate({opacity:1.0},500);
			
		}
		,onmouseout: function(view){
			
			console.log('onmouseout',this.model.get('title'));
			//remove pointer
			this.$('.pointer').stop(true).animate({opacity:0.0},125);
			$('#description-'+this.model.get('id')).stop(true).animate({opacity:0.0},125, function() {
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
				//this.$el.stop(true).animate({opacity:0.0},750, function(){
				//	this.close();
				//});
				
			}else{
								
				/* animation 1		*/

				$('#item').css('overflow','visible');	
				
				// wait for 750ms, while product views are closed, 
				// then set z-index to front
				// and then slide to left 
				// and then zoom to closeup and call next page
				
				var thisel = this.$el;
				
				// retrieve images to calculate zoom.
				var attachments = this.model.get('attachments');
				var latest = attachments.length-1;
				var image = (attachments[latest].images);


				this.$el.stop(true).animate({opacity:1.0},750,function(){
						thisel.css('zIndex',20);	
						$('#productfadetop').css('opacity',1);
						$('#productfadebot').css('opacity',1);

					}).animate({left:'0px'},750,function(){
						
						//var thetop = '0px';
						var width  = image.medium.width;
						var height = image.medium.height;

						var thetop = "-"+(model.get("custom_fields").zoomx1[0])+"px";

						$('.img',this.el).animate({top:thetop,'height':height,'width':width,left:'-75px'},750, function(){
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


				//iterate through ocllection, 
				
				var item_present = false;

				this.collection.each(function(model){
					if (model == selected_model){
						$('.arrow').stop(true).animate({opacity: 0},250);

						item_present = true;

						var options = [model,this.left];						
						App.vent.trigger('KD:modelselected',options);	
						

					};
				},this);

				// the submodel wasn't present just hide everything.
				if(!item_present){
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
