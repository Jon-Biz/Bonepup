describe("the zoom module",function(){

	beforeEach(function(){
		
		App.start();
		//		Animation.start();
		
	});
	
	afterEach(function(){
	});
	
	describe("widthorheight",function(){
		
			it("should return true for width, false for height as max zoom for best fit, for test data",function(){
	
				//expect(widthorheight(300,100,500,400,500,300)).toBeTruthy();
	
				//extremes
				expect(App.Animation.widthorheight(0,0,1000,10,100,100)).toBeTruthy();

				expect(App.Animation.widthorheight(0,0,10,1000,100,100)).not.toBeTruthy();
	
				//identical boxes
				expect(App.Animation.widthorheight(0,0,500,300,500,300)).toBeTruthy();
	
				//close up boxes
				expect(App.Animation.widthorheight(0,0,501,300,500,300)).toBeTruthy();
				expect(App.Animation.widthorheight(0,0,500,301,500,300)).not.toBeTruthy();
				expect(App.Animation.widthorheight(0,0,499,300,500,300)).not.toBeTruthy();
				expect(App.Animation.widthorheight(0,0,500,299,500,300)).toBeTruthy();
		});
	});
	
	describe ("zoom factor",function(){
		it('should return the correct zoom ratio for best fit for test data',function(){

				//extremes			
				expect(App.Animation.zoomfactor(0,0,1000,10,100,100).toFixed(5)).toEqual('0.10000');
				expect(App.Animation.zoomfactor(0,0,10,1000,100,100).toFixed(5)).toEqual('0.10000');

				//identical boxes
				expect(App.Animation.zoomfactor(0,0,500,300,500,300).toFixed(5)).toEqual('1.00000');
				
				//close up boxes
				expect(App.Animation.zoomfactor(0,0,501,300,500,300).toFixed(5)).toEqual('0.99800');
				expect(App.Animation.zoomfactor(0,0,500,301,500,300).toFixed(5)).toEqual('0.99668');
				expect(App.Animation.zoomfactor(0,0,499,300,500,300).toFixed(5)).toEqual('1.00000');
				expect(App.Animation.zoomfactor(0,0,500,299,500,300).toFixed(5)).toEqual('1.00000');

		})
	});
		
	describe ("resizer",function(){
		
		it("should return the corrected height and width of an image for a given test case",function(){
			
			var resizer = App.Animation.resizer(10000,10000,0,0,1000,10,100,100)
				, resizew = resizer[0]
				, resizeh = resizer[1]
			
			expect(resizew.toFixed(5)).toEqual('1000.00000');
			expect(resizeh.toFixed(5)).toEqual('1000.00000');

			var resizer = App.Animation.resizer(10000,10000,0,0,10,1000,100,100)
				, resizew = resizer[0]
				, resizeh = resizer[1]
							
			expect(resizew.toFixed(5)).toEqual('1000.00000');
			expect(resizeh.toFixed(5)).toEqual('1000.00000');

			var resizer = App.Animation.resizer(10000,10000,0,0,500,300,500,300)
				, resizew = resizer[0]
				, resizeh = resizer[1]
			
			expect(resizew.toFixed(5)).toEqual('10000.00000');
			expect(resizeh.toFixed(5)).toEqual('10000.00000');
			
		});
	});
})
