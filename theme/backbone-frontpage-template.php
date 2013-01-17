<?php
/*
Template Name: Backbone Front Page
*/
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>

<head profile="http://gmpg.org/xfn/11">

    <title><?php { bloginfo('name'); print ' | '; bloginfo('description'); get_page_number(); }   ?></title>
 
    <meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />

<!-- FONTS -->

	<link href='http://fonts.googleapis.com/css?family=Bree+Serif|Henny+Penny' rel='stylesheet' type='text/css'>


<!-- LIBRARIES -->
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/jquery.js" ></script>
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/json2.js"></script>
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/underscore.js"></script>
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/backbone.js"></script>
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/backbone.marionette.js"></script>
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/PxLoader.js" ></script>
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/PxLoaderImage.js" ></script>
	<script src="<?php echo get_bloginfo('template_directory');?>/assets/js/libs/gsap/TimelineLite.min.js" ></script>

<!-- Javascript -->

	<!-- Routing-->
		<script src="<?php echo get_bloginfo('template_directory');?>/app/main.js"></script>	


	<!-- Data -->
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/data-define.js"></script>
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/data-create.js"></script>

	<!-- Menus -->
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/kd-views-menu-page.js"></script>
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/kd-views-menu-gallery.js"></script>

	<!-- Pages -->
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/kd-views.js"></script>
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/kd-views-gallery.js"></script>
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/kd-views-product.js"></script>

	<!-- App -->
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/kd-create.js"></script>
		<script src="<?php echo get_bloginfo('template_directory');?>/app/modules/kd-animations.js"></script>
	
<!-- Stylesheet -->


  <link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_directory');?>/style-bb.css" />
  
    <?php wp_head(); ?>
 
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url'); ?>" title="<?php printf( __( '%s latest posts', 'your-theme' ), wp_specialchars( get_bloginfo('name'), 1 ) ); ?>" />
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('comments_rss2_url') ?>" title="<?php printf( __( '%s latest comments', 'your-theme' ), wp_specialchars( get_bloginfo('name'), 1 ) ); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

<script type="text/template" id="page">
	<div id="title-<%= id %>" class="title"><%= title %></div>
	<ul class="children" id='children-<%= id %>'></ul>
</script>

<script type="text/template" id="menu">
	<div id="title-<%= id %>" class="title"><%= title %></div>
</script>

<script type="text/template" id="galleryview">

	<div id="item">
		<div id="carousel">
		</div>
	</div>
	<div id="productfaderight"></div>	

	<div class="arrowbg" id="leftbg"></div>	
	<div class="arrowbg" id="rightbg"></div>	

	<div class="arrow" id="left"></div>	
	<div class="arrow" id="right"></div>	


</script>

<script type="text/template" id="galleryitem">
	<div class="prodimage"><img class="img" src=<%= grabthumbnail() %> /> </div>
		<div class="pointer"></div>
	</div>	
	<div id="description-<%= id %>" class="prod_description"><%= description %></div>
</script>

<script type="text/template" id="productview">
	<img id="productimage" src=<%= grabthumbnail() %> /> 

	<div id="producttext"><%= content %></div>
</script>

</head>

<body>

<!-- background="<?php echo get_bloginfo('template_directory'); ?>/splash_1-01-1280.jpg"-->
<div id = 'wrapper' class='hfeed'>
	<div id='header'>
			<div id='access'></div><!-- access-->		
	</div><!-- header -->

<div id="main">
	<div id="secondary"></div>
	<div id="primary">
		<div class="ruler"></div>
		<div id="content">
			<div id="product-display"></div><!-- #product-display -->		

	<div id="productfadetop"></div>
	<div id="productfadebot"></div>
		</div><!-- #content -->
		<div class="ruler" id="bottom_ruler"></div>
		<div id="description-box">
		</div><!-- description-box-->
	</div><!--primary -->
</div><!-- main -->
<div id="footer"></div>

</div><!-- wrapper -->
<script src="<?php echo get_bloginfo('template_directory'); ?>/app/launch.js"></script>


</body>
</html>