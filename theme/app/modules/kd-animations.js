App.module("Animation", function(Animation){


Animation.vanisher = function(view){
					console.log('vanish triggered');

				view.$el.stop(true).animate({opacity:0.0},750, function(){
					view.close();
					console.log('vanished view closed');
					//App.vent.trigger('KD:viewready',model);

				});
				
}
	
Animation.widthorheight = function(x1,y1,x2,y2,dw,dh){
			
			/*
			 *  determine whether to use height or width
			 * 
			 *  zw zoomed width
			 *  zh zoomed height
			 */
	
			var zw = x2-x1
				, zh = y2-y1
				, dhw = dh/dw
				, zhw = zh/zw;
	
	
			if(dhw<zhw){
				//use height
				return false;
			}else{
				//use width
				return true;
			};
		};
	
Animation.zoomfactor = function(x1,y1,x2,y2,dw,dh){
			
		/*
		 *  determine zoom
		 * 
		 *  zw zoomed width
		 *  zh zoomed height
		 */
	
			var zw = x2-x1
				, zh = y2-y1
				, dhw = dh/dw
				, zhw = zh/zw;
			
			console.log('ZOOM width : ',zw);
			
			console.log('ZOOM height : ',zh);
			
			console.log('ZOOM height over width : ',zhw);
	
			console.log('DRAW height over width : ',dhw);
		
			woh = Animation.widthorheight(x1,y1,x2,y2,dw,dh);
		
			
			if(woh){
				return (dw/zw);
				
				
			}else{
				return (dh/zh);
	
			}
			
		}

Animation.resizer = function(w,h,x1,y1,x2,y2,dw,dh){

		var zoomfactor = Animation.zoomfactor(x1,y1,x2,y2,dw,dh)
		
		console.log('zoomfactor ',zoomfactor);
		var resizew = w * zoomfactor
		var resizeh = h * zoomfactor;
		

		return([resizew,resizeh]);
		
	};