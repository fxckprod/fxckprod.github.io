window.jQuery = window.$ = jQuery;


/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
function calculateScroll() {
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.main_menu').find('.scroll_btn a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	});
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.main_menu li')
			.removeClass('active')
			.eq(i).addClass('active');			
		}
	});
};

jQuery(document).ready(function() {
	//MobileMenu
	if ($(window).width() < 768){
		jQuery('.main_menu').prepend('<a href="javascript:void(0)" class="menu_toggler"><i class="fa fa-bars"></i></a>');
		jQuery('header .main_menu ul').hide();
		jQuery('.menu_toggler, .main_menu ul li a').click(function(){
			jQuery('header .main_menu ul').slideToggle(300);
		});
	}
		
	
	$(window).scroll(function(event) {
		calculateScroll();
	});
	$('.main_menu ul li.scroll_btn a, .mobile_menu ul li a').click(function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 64}, 1000);
		return false;
	});
	
	
	//Fixed Menu
	var fixed_menu = true;

	if (jQuery('header').size() && fixed_menu == true) {
		setInterval(scrolled_menu, 0);
	}
	
});

function scrolled_menu() {
	if (jQuery(window).scrollTop()) {
		jQuery('header').addClass('menu_fixed');
	} else {
		jQuery('header').removeClass('menu_fixed');
	}
};


	

/*-----------------------------------------------------------------------------------*/
/*	FLEXSLIDER
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function(){
	//Top Slider
	$('.flexslider.top_slider').flexslider({
		animation: "fade",
		slideshowSpeed: 4000,
		controlNav: false,
		directionNav: true,
		pauseOnAction: false,
		pauseOnHover: true,
		prevText: "",
		nextText: ""
	});
	
	
	$('.flexslider .flex-direction-nav a.flex-prev').prepend('<i class="fa fa-angle-left"></i>');
	$('.flexslider .flex-direction-nav a.flex-next').prepend('<i class="fa fa-angle-right"></i>');
	
});

jQuery(window).resize(function(){
	homeHeight();
	
});

jQuery(document).ready(function(){
	homeHeight();
});

function homeHeight(){
	var wh = jQuery(window).height();
	jQuery('.top_slider, .top_slider .slides li, .top_slider .slides li .container').css('height', wh);
	
	
}


/*-----------------------------------------------------------------------------------*/
/*	PARRALAX
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function() {
	if (jQuery(window).width() > 1025){
		jQuery('.flexslider.top_slider .slides li').parallax("0", -0.5);
		jQuery('#team').parallax("0", -0.5);
		jQuery('#contacts').parallax("0", -0.5);
	}
	
});



/*-----------------------------------------------------------------------------------*/
/*	PRETTYPHOTO
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	jQuery("a[rel^='prettyPhoto']").prettyPhoto();
});


/*-----------------------------------------------------------------------------------*/
/*	IFRAME TRANSPARENT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
});




/*-----------------------------------------------------------------------------------*/
/*	Fun Facts
/*-----------------------------------------------------------------------------------*/
(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);


/* jQuery.appear */
(function($){$.fn.appear=function(f,o){var s=$.extend({one:true},o);return this.each(function(){var t=$(this);t.appeared=false;if(!f){t.trigger('appear',s.data);return;}var w=$(window);var c=function(){if(!t.is(':visible')){t.appeared=false;return;}var a=w.scrollLeft();var b=w.scrollTop();var o=t.offset();var x=o.left;var y=o.top;if(y+t.height()>=b&&y<=b+w.height()&&x+t.width()>=a&&x<=a+w.width()){if(!t.appeared)t.trigger('appear',s.data);}else{t.appeared=false;}};var m=function(){t.appeared=true;if(s.one){w.unbind('scroll',c);var i=$.inArray(c,$.fn.appear.checks);if(i>=0)$.fn.appear.checks.splice(i,1);}f.apply(this,arguments);};if(s.one)t.one('appear',s.data,m);else t.bind('appear',s.data,m);w.scroll(c);$.fn.appear.checks.push(c);(c)();});};$.extend($.fn.appear,{checks:[],timeout:null,checkAll:function(){var l=$.fn.appear.checks.length;if(l>0)while(l--)($.fn.appear.checks[l])();},run:function(){if($.fn.appear.timeout)clearTimeout($.fn.appear.timeout);$.fn.appear.timeout=setTimeout($.fn.appear.checkAll,20);}});$.each(['append','prepend','after','before','attr','removeAttr','addClass','removeClass','toggleClass','remove','css','show','hide'],function(i,n){var u=$.fn[n];if(u){$.fn[n]=function(){var r=u.apply(this,arguments);$.fn.appear.run();return r;}}});})(jQuery);









