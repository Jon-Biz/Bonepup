
describe("the zoom module",function(){

	var	aligner = function(zoomfactor,resize_w,resize_h,x1,y1){
			
			var aligned_x0 = resize_w * zoomfactor
				, aligned_y0 = resize_h * zoomfactor
				, aligned_x1 = -x1 * zoomfactor
				, aligned_y1 = -y1 * zoomfactor
				, returnitem = [aligned_x0,aligned_y0,aligned_x1,aligned_y1];

				return returnitem;
			};

	beforeEach(function(){
		
		App.start();
		//		Animation.start();
		
	});
	
	afterEach(function(){
	});
	
	xdescribe("widthorheight",function(){
		
			it("should return true for width, false for height as max zoom for best fit, for test data",function(){
				
				var x1 = 0
					, y1 = 0
					, x2 = 1000
					, y2 = 10
					,	draw_width = 100
					, draw_height = 100;
	
				//expect(widthorheight(300,100,500,400,500,300)).toBeTruthy();
	
				//extremes
				expect(App.Animation.widthorheight(x1,y1,x2,y2,draw_width,draw_height)).toBeTruthy();

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
	
	xdescribe ("zoom factor",function(){
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
		
	xdescribe ("resizer",function(){
		

		it("should return the corrected height and width of an image for a given test case",function(){
			
				var orig_width = 10000 
					orig_height = 10000
					, x1 = 0
					, y1 = 0
					, x2 = 10
					, y2 = 1000
					,	draw_width = 100
					, draw_height = 100;
				
			var resizer = App.Animation.resizer(orig_width,orig_height,x1,y1,x2,y2,draw_width,draw_height)
				, resizew = resizer[0]
				, resizeh = resizer[1]
			
			expect(resizew.toFixed(5)).toEqual('1000.00000');
			expect(resizeh.toFixed(5)).toEqual('1000.00000');

		});

		it("should return the corrected height and width of an image for a given test case",function(){
			
				var orig_width = 10000 
					orig_height = 10000
					, x1 = 0
					, y1 = 0
					, x2 = 1000
					, y2 = 10
					,	draw_width = 100
					, draw_height = 100;
				
			var resizer = App.Animation.resizer(orig_width,orig_height,x1,y1,x2,y2,draw_width,draw_height)
				, resizew = resizer[0]
				, resizeh = resizer[1]
			
			expect(resizew.toFixed(5)).toEqual('1000.00000');
			expect(resizeh.toFixed(5)).toEqual('1000.00000');

		});
							
		it("should return the corrected height and width of an image for a given test case",function(){
			
				var orig_width = 10000 
					orig_height = 10000
					, x1 = 0
					, y1 = 0
					, x2 = 500
					, y2 = 300
					,	draw_width = 500
					, draw_height = 300;
				
			var resizer = App.Animation.resizer(orig_width,orig_height,x1,y1,x2,y2,draw_width,draw_height)
				, resizew = resizer[0]
				, resizeh = resizer[1]

			expect(resizew.toFixed(5)).toEqual('10000.00000');
			expect(resizeh.toFixed(5)).toEqual('10000.00000');


		});
			
	});
	
	xdescribe("aligner",function(){
		
		it("should return the correct x and y values for a give test case",function(){
			
			var zoomfactor = 1
			, resize_w = 1000
			, resize_h = 1000
			, x1 = 100
			, y1 = 100;		

			var aligned = aligner(zoomfactor,resize_w,resize_h,x1,y1);
			
			aligned_x0 = aligned[0];
			aligned_y0 = aligned[1];
			aligned_x1 = aligned[2];
			aligned_y1 = aligned[3];
			
			expect(aligned_x0).toEqual(1000);
			expect(aligned_y0).toEqual(1000);
			expect(aligned_x1).toEqual(-100);
			expect(aligned_y1).toEqual(-100);
			
		});

		it("should return the correct x and y values for a give test case",function(){
			
			var zoomfactor = 2
			, resize_w = 1000
			, resize_h = 1000
			, x1 = 100
			, y1 = 100;
		
			var aligned = aligner(zoomfactor,resize_w,resize_h,x1,y1);
			
			aligned_x0 = aligned[0];
			aligned_y0 = aligned[1];
			aligned_x1 = aligned[2];
			aligned_y1 = aligned[3];
			
			expect(aligned_x0).toEqual(2000);
			expect(aligned_y0).toEqual(2000);
			expect(aligned_x1).toEqual(-200);
			expect(aligned_y1).toEqual(-200);
			
		});		
	})

	it("should return the aligned coordinates for image")
})
