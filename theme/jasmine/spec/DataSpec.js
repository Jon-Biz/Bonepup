describe("The Data Module",function(){


	describe("when it is initialized",function(){
		
		beforeEach(function(){
			
			this.Data = App.module("Data");
			this.Data.start();
			
		});
	
		afterEach(function(){
			 this.Data.stop();
		});
		
		it("should create a callback called App.Data.Ready",function(){

			var callbackwatcher = sinon.spy();
			this.Data.ready.add(function(){
				callbackwatcher();
			})
			 this.Data.ready.run()
			
			expect(callbackwatcher).toHaveBeenCalled();

		});

	it("should use the default options since none are stated",function(){
		var options = {
			'url':'localhost'
		}

		expect (this.Data.options).toEqual(options);

	})

		xit("should make an ajax request based on the options sent to it",function(){
			
		});
		
		xit("should trigger the callback when the ajax call returns",function(){
		});
		
	});
		xdescribe("when App.Data.Ready  is triggered",function(){
			
			beforeEach(function(){
			
			});
	
			afterEach(function(){
			
			});
			
			describe("App.Data.Pages",function(){
				
				it("should be a collection ",function(){
				});

				it("should contain the Pages data returned by the pages Ajax call ",function(){
				});
			
			});

			describe("App.Data.Posts",function(){
				
				it("should be a collection ",function(){
				});

				it("should contain the Posts data returned by the pages Ajax call ",function(){
				});
			
			});			

		});

});

xdescribe("when it is initialzied with an options parameter",function(){
			
		beforeEach(function(){

			options = {
				url:"test"
			}
			this.Data = App.module("Data");
			this.Data.on("start", function(options){
				this.options = options;
			})
			
			this.Data.start(options);

		});
	
			afterEach(function(){
				 this.Data.stop();
			});	
	
	});
		
		

xdescribe("",function(){

	beforeEach(function(){
		
	});

	afterEach(function(){
		
	});

	xit("",function(){
		
	});
	
});

