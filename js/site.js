var Void = {
	menu: {
		home:		"Home",
		features:	"Features",
		source:		"Source",
		download:	"Download",
		contact:	"Contact/Help"
	},
	pages: {
		default: "home",
		rootdir: "pages",
		view_element: "#page_view",
		ext: "html"
	},
	nav: {
		load_page: function(page) {
			$(Void.pages.view_element).load(
				Void.pages.rootdir+"/"+page+"."+Void.pages.ext
			);
		}
	},
	nav_callback: function() {
		Void.nav.load_page($(this).attr("name"));
		return false;
	}
};

$(function() {
	$.ajaxSetup({ cache: false });
	_.each(Void.menu, function(val, key) {
		var a = $("<a></a>");
		a.attr("href", "#"+key).attr("name", key);
		a.html(val);
		a.click(Void.nav_callback);
		$("#navigation").append("[").append(a).append("] ");
	
	});
	Void.nav.load_page(Void.pages.default);
});

