
// Migros 
// Single Product Page
// Remove Sidebar Product Labels
if (document.getElementsByClassName('sidebar-product-information sidebar-brandlabel-item').length!=0) 
document.getElementsByClassName("sidebar-product-information sidebar-brandlabel-item")[0].remove();

if (document.getElementsByClassName('sidebar-brandlabel-text-container').length!=0) 
document.getElementsByClassName("sidebar-brandlabel-text-container")[0].remove();

if (document.getElementsByClassName('sidebar-brandlabel-image-container').length!=0) 
document.getElementsByClassName("sidebar-brandlabel-image-container")[0].remove();

if (document.getElementsByClassName('sidebar-product-information sidebar-retailer').length!=0) 
document.getElementsByClassName("sidebar-product-information sidebar-retailer")[0].remove();


// Remove Availability Information
if (document.getElementsByClassName('sidebar-availability-store-information').length!=0) 
document.getElementsByClassName("sidebar-availability-store-information")[0].remove();
if (document.getElementsByClassName('sidebar-product-availability').length!=0) 
document.getElementsByClassName("sidebar-product-availability")[0].remove();
// Remove Add to Favorite 
if (document.getElementsByClassName('sidebar-favorite-button-container').length!=0) 
document.getElementsByClassName("sidebar-favorite-button-container")[0].remove();




// Category Overview Page

if (document.getElementsByClassName('mui-lazyload ls-is-cached lazyloaded').length!=0) 
document.getElementsByClassName("mui-lazyload ls-is-cached lazyloaded")[0].remove();

if (document.getElementsByClassName('widget-ratings clearfix').length!=0) 
document.getElementsByClassName("widget-ratings clearfix")[0].remove();

if (document.getElementsByClassName("clearfix mui-list-unstyled").length != 0)
document.getElementsByClassName("clearfix mui-list-unstyled")[0].remove();

if (document.getElementsByClassName("mui-panel panel-border-top").length != 0)
document.getElementsByClassName("mui-panel panel-border-top")[0].remove();

if (document.getElementsByClassName('section-bottom-md-padding').length!=0) 
document.getElementsByClassName("section-bottom-md-padding")[0].remove();
if (document.getElementsByClassName('section-bottom-padding').length!=0) 

document.getElementsByClassName("section-bottom-padding")[0].remove();
if (document.getElementsByClassName("section-bottom-padding").length != 0)
document.getElementsByClassName("section-bottom-padding")[0].remove();
if (document.getElementsByClassName('container section-bottom-padding').length!=0)
document.getElementsByClassName("container section-bottom-padding")[0].remove();
if (document.getElementsByClassName('mui-share-buttons mui-js-share-buttons share-buttons').length!=0)
document.getElementsByClassName("mui-share-buttons mui-js-share-buttons share-buttons")[0].remove();
if (document.getElementsByClassName('community-tabs-container').length!=0)
document.getElementsByClassName("community-tabs-container")[0].remove();
if (document.getElementsByClassName('mui-js-community-reviews js-community-loaded').length!=0)
document.getElementsByClassName("mui-js-community-reviews js-community-loaded")[0].remove();
if (document.getElementsByClassName("section-bottom-padding bg-light js-related-products").length != 0)
document.getElementsByClassName("section-bottom-padding bg-light js-related-products")[0].remove();
if (document.getElementsByClassName('section-bottom-padding bg-white related-container container').length !=0) 
document.getElementsByClassName('section-bottom-padding bg-white related-container container')[0].remove();
if (document.getElementsByClassName('mui-button mui-message-list-load-all mui-js-message-list-load-all-trigger mui-js-load-all-reviews').length!=0)
document.getElementsByClassName('mui-button mui-message-list-load-all mui-js-message-list-load-all-trigger mui-js-load-all-reviews')[0].remove();
if(document.getElementsByClassName('section-bottom-padding last-seen-products js-last-seen-products').length!=0)
document.getElementsByClassName("section-bottom-padding last-seen-products js-last-seen-products")[0].remove();

if (document.getElementsByClassName('mui-rating is-small').length!=0)
document.getElementsByClassName("mui-rating is-small")[0].remove();
if (document.getElementsByClassName('mui-js-rating mui-product-tile-rating mui-js-rating-loaded').length!=0)
document.getElementsByClassName("mui-js-rating mui-product-tile-rating mui-js-rating-loaded")[0].remove();
if (document.getElementsByClassName('mui-ratings-rating-star star-on-png').length!=0)
document.getElementsByClassName("mui-ratings-rating-star star-on-png")[0].remove();
if (document.getElementsByClassName('mui-product-tile-discount-image-container').length!=0)
document.getElementsByClassName("mui-product-tile-discount-image-container")[0].remove();
if (document.getElementsByClassName('mui-product-tile-footer').length!=0)
document.getElementsByClassName("mui-product-tile-footer")[0].remove();
if (document.getElementsByClassName('retailer-tab retailer-tab-melectronics').length!=0)
document.getElementsByClassName("retailer-tab retailer-tab-melectronics")[0].remove();
if (document.getElementsByClassName('retailer-tab retailer-tab-sportxx').length!=0)
document.getElementsByClassName("retailer-tab retailer-tab-sportxx")[0].remove();
if (document.getElementsByClassName('retailer-tab retailer-tab-micasa').length!=0)
document.getElementsByClassName("retailer-tab retailer-tab-micasa")[0].remove();
if (document.getElementsByClassName('retailer-tab retailer-tab-doitgarden').length!=0)
document.getElementsByClassName("retailer-tab retailer-tab-doitgarden")[0].remove();
if (document.getElementsByClassName('retailer-tab retailer-tab-interio').length!=0)
document.getElementsByClassName("retailer-tab retailer-tab-interio")[0].remove();

if (document.getElementsByClassName('retailer-tabs tab-navigation').length!=0)
document.getElementsByClassName("retailer-tabs tab-navigation")[0].remove();

if (document.getElementsByClassName('listing-switcher-link selected').length!=0)
document.getElementsByClassName("listing-switcher-link selected")[0].remove();

if (document.getElementsByClassName('listing-switcher-link').length!=0)
document.getElementsByClassName("listing-switcher-link")[0].remove();

if (document.getElementsByClassName('sidebar-teaser').length!=0)
document.getElementsByClassName("sidebar-teaser")[0].remove();

if (document.getElementsByClassName('listing-switcher').length!=0)
document.getElementsByClassName("listing-switcher")[0].remove();

if (document.getElementsByClassName('sidebar-discount-badge').length!=0)
document.getElementsByClassName("sidebar-discount-badge")[0].remove();

if (document.getElementsByClassName('section-bottom-padding').length!=0)
document.getElementsByClassName("section-bottom-padding")[0].remove();

if (document.getElementsByClassName('section-bottom-padding').length!=0)
document.getElementsByClassName("section-bottom-padding")[0].remove();

if (document.getElementsByClassName('section-bottom-padding').length!=0)
document.getElementsByClassName("section-bottom-padding")[0].remove();

if (document.getElementsByClassName('row mui-footer-list-container').length!=0)
document.getElementsByClassName("row mui-footer-list-container")[0].remove();

if (document.getElementsByClassName('row mui-footer-link-area').length!=0)
document.getElementsByClassName("row mui-footer-link-area")[0].remove();


var top_button = document.getElementsByClassName('mui-list-unstyled retailer-tabs clearfix retailer-tabs-6')[0];
if (top_button) {
	for (var i = 2; i < top_button.childNodes.length; i++) {
		top_button.childNodes[i].remove()
			if (top_button.childNodes.length<2)
				break;
		 }
}
