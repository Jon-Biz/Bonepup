!Installation

!!Setup
* install the json plugin (wordpress - install plugin from zip, upload)
* place the bonepup directory in your wp-content/themes/ directory
* log in to wordpress and choose the 'bonepup' theme.

!! Implementation

* Do a global search and replace for App.Data and replace with [your app's name].Data

!! Usage

A request for post items looks like this:

{'type':'pages'		// valid types are 'pages' and 'posts'
,'number':'10' 		// optional. default is 'all'
,'custom_fields':	// optional. "Put,your,comma-delimited,custom fields,here"

Due to limitations in the json plugin that I have yet to resolve, you are required to specify every custom field that you need access to.

Bonepup initially takes an array of requests, along with an optional URL parameter.

{url : "put your wordpress blogs URL here"
,requests:[
	'type':'pages'
	,'number':
	,'custom_fields':"Put,your,comma-delimited,custom fields,here"
	]
}
			
On completion of all the initial requests, BonePup triggers a marrionette callback named Data.Ready. Hook things like the site render and reveal into this, and nothing will appear until it's ready:

Data.Ready.on(function(){

	// do stuff with the data here
	
};

Sits in my controller.

Posts are accessible at Data.Posts

! Pages
Data.Pages is a hierarchical collection of models, with children pages accessible as an array in the parent's 'children' attribute. 
Data.PageIndex is a flat stack of all the pages.

Since custom fields are you can filter the pages by their custom_fields.

//create product collection, menu collection
Menu = new Data.PageCollection(Data.Pages.where({description:'menu'}));
Products = new Data.PageCollection(Data.Pages.where({description: 'gallery'}));


! Posts
* Accessing XXX returns Posts in chronological order.
* Giving a month, day, or date range returns those posts that meet the category.
* Giving a tag returns those that match the tag.

! Custom post types 

are coming.

! Requests after the initial.

When you want to retreive additional content call ---

Will return a collection of the additional posts retrieved. Additionally the posts will be added to it's respective master collection. 