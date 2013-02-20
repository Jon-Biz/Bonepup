describe("The Data Module",function(){


	describe("when it is started",function(){
		
		beforeEach(function(){
			
			this.Data = App.module("Data");
			
		});
	
		afterEach(function(){
			 this.Data.stop();
		});
		
		it("should create a callback called App.Data.Ready",function(){

			var callbackwatcher = sinon.spy();
			this.Data.ready.add(function(){
				callbackwatcher();
			})

			this.Data.start();
			 this.Data.ready.run()
			
			expect(callbackwatcher).toHaveBeenCalled();

		});

	it("should use the default options since none are stated",function(){
		
		var options = {
			'url':'localhost'
			,'requests':[
				{'command':'get_page_index'
				,'custom_fields':''}
				]
		}

		this.Data.start();
		
		expect (this.Data.options).toEqual(options);

	})

});

describe("when it is initialzied with an options parameter",function(){
			
		beforeEach(function(){

			this.options = {
				url:"test"
				,requests: [{'command':'get_posts','custom_fields':'test_field'}]
			}
			
			this.Data = App.module("Data");

		});
	
		afterEach(function(){
			 this.Data.stop();
		});	
	
	it("should set  its options variable to those received",function(){

			this.Data.start(this.options);
		
		expect(this.Data.options).toEqual(this.options);
		
	});
	
		it("should create a collection for each request in the options list",function(){

			this.Data.start(this.options);
			expect(this.Data.Page_collections.length).toEqual(this.options.requests.length);
	});
	
	
	describe("an ajax call",function(){

	beforeEach(function(){
		spy = sinon.spy($, "ajax");
		
	});

	afterEach(function(){
		$.ajax.restore();
	});

	it("should have been made",function(){

		this.Data.start(this.options);
		expect(spy).toHaveBeenCalled();
	});

	it("should be called once when given one request ",function(){

		this.Data.start({url:"test"
																					,requests: [{
																						'command':'get_posts'
																						,'custom_fields':'test_field'
																						}]
																				})
																				;
		expect(spy).toHaveBeenCalledOnce();
		
	});

	it("should be called twice when given two requests",function(){

		this.Data.start({url:"test"
																					,requests: [{
																						'command':'get_posts'
																						,'custom_fields':'test_field'
																						}
																						,{
																						'command':'get_posts'
																						,'custom_fields':'test_field'
																						}]
																				})
																				;
		expect(spy).toHaveBeenCalledTwice();
		
	});
		
	it("the ajax should requests based on the options sent to it",function(){
			
	});

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

		
		

xdescribe("",function(){

	beforeEach(function(){
		
	});

	afterEach(function(){
		
	});

	xit("",function(){
		
	});
	
});

