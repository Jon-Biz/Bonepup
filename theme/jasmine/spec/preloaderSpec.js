describe("the preload function ",function(){


 // Usage: $(['img1.jpg','img2.jpg','img3.jpg']).preload();
	
		
	
		it('should call a chained spy',function(){
			
			var image = $(document.createElement('img'));
			App.Animation.preload(image,'test.jpg');

//		_preloader.preload('test.jpg').chainedfunction();
			
			//chainedfunction2 = sinon.spy();			
			
				
				//chainedfunction();
			
				expect(chainedfunction).toHaveBeenCalled();
				
				
			})

})
