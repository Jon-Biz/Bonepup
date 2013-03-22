BonePup
=======
Bonepup is a front end for wordpress blogs, based on backbone and backbone marrionette. It provieds the framework needed to build a modern single page web app style site, while incorporating an existing wordpress instance. In other words you can update your wordpress blog without exporting all your post (or create a new one, naturally).

Bonepup is installed as a 'theme' in your wordpress instance, so it can be switched on temporarily. All the orginal wordpress php pages are still present. Replace these with your own and older links elsewhere on the web will still be served without redirection. You may want to utilizing the standard wordpress css selectors so that the pages are set up apropriately.

Installation
============
Setup
-----
* install the attached json plugin (wordpress admin console/settings/plugins/install plugin from zip/upload)
* place the bonepup directory in your wp-content/themes/ directory
* select the 'bonepup' theme from the wordpress admin console.

Implementation
--------------

* Do a global search and replace for App.Data and replace with [your app's name].Data

Usage
-----

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

Posts are accessible at [YOUR APP]Data.Posts

Pages
-----
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
