(function($){
	// JAVASCRIPT ENABLED
	$('html').addClass('js');

	//ON DOC READY
	$(document).ready(function(e) {

		$('.hierarchical-list>li>span').on('click', function() {
			$(this).siblings('.exp-but').trigger('click');
		});
		$('.hierarchical-list>li>ul>li>span').on('click', function() {
			$(this).siblings('.exp-but').trigger('click');
		});
		
		// CUSTOM FORM ELEMENTS
		$("input.custom, select.custom").CFElements();
		
		// NAV
		if($("#main-nav").length) initNavigation($("#main-nav"));
		if($("#user-nav").length) initNavigation($("#user-nav"));
		
		// SWITCH OPTION
		$(".switch-option").each(function() {
			var sw = $(this),
				opts = sw.children(".options").children("a"),
				input = sw.children("input"),
				selection = sw.children(".selection-box");
				
			opts.on("click", function(e){
				var opt = $(this);
				opts.removeClass("active");
				
				opt.addClass("active");
				selection.css("left", opt.index() * opt.width());
				input.val(opt.data("value"));
				
				e.preventDefault();
			}).filter(".active").trigger("click");
			
			$(window).on("resize", function(){
				opts.filter(".active").trigger("click");
			});
		});
		
		// D-TABS
		initDTabs();
		
		// CUSTOM SCROLL
		initCustomScroll();
		
		// HIERARCHICAL-LIST
		initHierarchicalList();
		
	});
	
	
	// NAV
	function initNavigation(trg){
		var speed = 250;
		var nav = trg,
			lis = nav.children("li"),
			buts = lis.children("a");
			
		lis.not(".expanded").children("ul").slideUp(0);
			
		buts.on("click", function(e){
			var li = $(this).parent(),
				submenu = li.children("ul");
			
			if(li.children("ul").length){
				if(li.hasClass("expanded")){
					submenu.slideUp(speed);
					li.removeClass("expanded");
				}else{
					submenu.slideDown(speed);
					li.addClass("expanded");
				}
				e.preventDefault();
			}
		});
		
	};
	
	
	// D-TABS
	function initDTabs(){
		$("div.d-tabs").each(function(index, element) {
			var wrap = $(this),
				switches = wrap.children(".d-tabs-switches").children("span"),
				contents = wrap.children(".d-tabs-contents").children("section").hide();
				
			switches.on("click", function(e){
				var trg = $(this);
				if(trg.hasClass("active")) return;
				
				switches.removeClass("active");
				trg.addClass("active");
				contents.filter(":visible").hide();
				contents.eq(trg.index()).fadeIn(200);
				initCustomScroll();
			});
			
			if(switches.filter(".active").length){
				contents.eq(switches.filter(".active").index()).show();
			}else{
				switches.eq(0).addClass("active");
				contents.eq(0).show();
			}
						
		});
	};
	
	// CUSTOM SCROLL
	function initCustomScroll(){
		$(".mCustomScrollbar").each(function() {
			$(this).mCustomScrollbar("update");
		});
		$(".custom-scroll:not(.mCustomScrollbar)").mCustomScrollbar({
			scrollInertia:200	
		});
	};

	
	
	// HIERARCHICAL-LIST
	function initHierarchicalList(){
		var fade_speed = 200;
		
		$(".hierarchical-list").each(function(index, element) {
			var list = $(this),
				exp_buts = list.find(".exp-but");
			
			list.children("li").find("ul").fadeOut(0);
			
			exp_buts.on("click", function(e){
				var but = $(this);
				if(but.hasClass("opened")){
					but.removeClass("opened");
					$(this).siblings("ul").fadeOut(0);
				}else{
					but.addClass("opened");
					$(this).siblings("ul").fadeIn(fade_speed);
				}
				
				markRows(list.find("li:visible"));
				e.preventDefault();
			});
			
			markRows(list.find("li:visible"));
		});
		
		function markRows(rows){
			rows.removeClass("alt").filter(":even").addClass("alt");
		}
	};
	
	// $('.hierarchical-list>li>span').hide();

	
	
}(jQuery));