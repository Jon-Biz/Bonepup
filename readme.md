BonePup
=======
Bonepup is a front end for wordpress blogs, based on backbone.js It provides the framework needed to build a modern single page web app site, while incorporating an existing wordpress instance. In other words you can update your wordpress blog without exporting all your posts to something else, or abandoning them altogether.

**Bonepup is now a standalone backbone extension: the Boilerplate Marionette.js webapp incarnation has been moved to [Bonepup-Boilerplate](https://github.com/Jon-Biz/Bonepup-Boilerplate).**

This repo is intended for developers familiar with backbone who aren't using marionette, or otherwise want a drop in replacement file in order to access a wordpress back end, and who don't need php fallback pages. Bonepup-boilerplate is intended for wordpress developers who are just coming to backbone, legacy blogs that need to maintain an existing URL framework in the case of incoming links, etc, and as a functioning example ready to play around with on your wordpress blog.

Currently, bonepup supports the retrieval of wordpress posts, pages and custom post types. Search is not yet implemented.

Installation
------------
------------

JSON access
-----------
Access to wordpress is facilitated by a modified version of XXX's json-plugin. You will need to install this plugin before you can access the wordpress data. 

* install the attached json plugin (wordpress admin console/settings/plugins/install plugin from zip/upload)
* activate the plugin, (from wp-admin/plugins.php) if necessary

Usage
-----

Initialize a backbone.boneup.collection to create a collection for each type of content.

  My_posts = Backbone.Bonepup.Collection.extend({
  	url: 'yourwordpresssites.url.here'
	'post_type':'pages'
	,'fetch_amount':'10'
	,'custom_fields':"Put,your,comma-delimited,custom fields,here"
});

post_type denotes the post type, such as page or post

fetch_amount, which is optional, is the amount of posts to pull for each subsequent fetch request. So, on each fetch an additional fetch_amount of posts will be retreived and added to the collection. The default is all.

custom_fields contains a list of the custom fields your model needs access to, in a comma delimited format.
};

Pages
-----
If ```post_type 'pages' is specficied, a hierarchical collection of models is retreived, with children pages accessible as an array in the parents' ```children attributes, facilitating recursive display and bread crumbing.

The function PageIndex() returns a flat collection of all the pages currently below the one in question, suitable for searching and selecting from currently held posts.

Custom fields are accessible via the model's getter, you can filter the pages into by their custom_fields.

//create product collection, menu collection
Menu = new Data.PageCollection(Data.Pages.where({description:'menu'}));
Products = new Data.PageCollection(Data.Pages.where({description: 'gallery'}));
