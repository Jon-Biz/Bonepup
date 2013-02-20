describe("The Data Module",function(){

	describe("when it is initialized",function(){
				
		xit("should create a callback called App.Data.Ready",function(){

		});

	xit("should set up the default options",function(){
	})

		xit("should make an ajax request based on the options sent to it",function(){
			
		});
		
		xit("should trigger the callback when the ajax call returns",function(){
		});
		
	});
	
	xdescribe("when App.Data.Ready  is triggered",function(){
				
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

