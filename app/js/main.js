"use strict";



(function() {
	$(function() {





		/* SELECT2 */
		if ( $(".js-select").length )
			$(".js-select").select2({
				placeholder: "Выберите...",
				// ajax: {
				//   url: 'https://api.github.com/search/repositories',
				//   dataType: 'json'
				//   // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
				// },
				allowClear: false
			});
		
		if ( $(".js-select").length )
		$(".js-select.search-hide").select2({
			minimumResultsForSearch: Infinity
		});








		/*FANCYboxWidth*/
		if ($("[data-fancyboxWidth]").length != 0)
			$("[data-fancyboxWidth]").fancyboxWidth({
				afterShow: function(instance, current) {},
				animationEffect : "zoom",
				animationDuration : 800,
				thumbs : {
					autoStart   : true
				},
				touch : false,
				transitionDuration : 366,
				transitionEffect: "zoom-in-out"
			});
		// SMOTHSCROLL-LINK
		if( "smoothScroll" in window )
			smoothScroll.init({
				easing: 'easeInOutCubic',
				offset: 85
			});






		function onLoaded() {
			$(window).trigger("resize");
		}

		//Лимит текста
		$("[data-text-limit]").map(function( i, el ){
			el = $(el);
			var text = el.text();
			var textLimit = el.attr("data-text-limit");

			if( text.length > textLimit*1 ){
				text = text.substring(0, textLimit )
				el.text( text+ " ..." );
			}
		})


		$(".parallax-scene").map(function(i, el){
			var parallaxInstance = new Parallax(el);
		})

		//SCROLL
		$(window).on("scroll", function(e) {
			//body...
		});
		$(window).trigger("scroll");





		window.pageAdaptive = function(widthClass, heightClass){

			var winWidth = window.innerWidth;
			var winHeight = window.innerHeight;

			var widthClass = $(widthClass) || null;
			var heightClass = $(heightClass) || null;

			var boxWidth = $(widthClass).width();
			var boxHeight = $(heightClass).height();

			var scale;
			var scaleH = winWidth / boxWidth;
			var scaleV; 

		 	var boxHeightOrigin = boxHeight * scaleH;

			if( boxHeightOrigin > winHeight){
				scaleV = winHeight / boxHeightOrigin;	
				scaleH = scaleH - (1 - scaleV);
				console.log(scaleH, scaleV);
			}
			// console.log(
			// 	"winWidth: "+winWidth+"\n", 
			// 	"winHeight: "+winHeight+"\n", 
			// 	"boxHeightOrigin: "+boxHeightOrigin+"\n", 
			// 	"boxWidth: "+boxWidth+"\n", 
			// 	"boxHeight: "+boxHeight+"\n", 
			// 	"scaleH: "+scaleH+"\n", 
			// 	"scaleV: "+scaleV+"\n", 
			// 	"scale: "+scale+"\n" 
			// 	);
			$(widthClass).css({
				transform: "scale(" + scaleH + ")"
			});

		
		}
		pageAdaptive(".page-content-size", ".page-wedding .page-wrapper");


		$(window).on("resize", function(){
			pageAdaptive(".page-content-size", ".page-wedding .page-wrapper");
		})

	});
})(jQuery);

var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMac = /Mac/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent),
		isEdge = /Edge/i.test(navigator.userAgent);


// COMMON FUNCTION

function checkSm() {
	return $(document).width() <= 991;
}

function checkMd() {
	return $(document).width() < 1199 && !checkSm();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function onResized(f) {
	if (typeof f === "function") f();
	$(window).on("resize", function(e) {
		if (typeof f === "function") f();
	});
	return this;
}

function scrolledDiv(el) {
	try {
		var docViewTop = $(window).scrollTop(),
			docViewBottom = docViewTop + $(window).height(),
			elTop = $(el).offset().top,
			elBottom = elTop + $(el).height() / 1.8;
	} catch (err) {
		console.error();
	}

	return elBottom <= docViewBottom && elTop >= docViewTop;
}

function roundFix( num, cnt ){
	num = num+""
	cnt = cnt + (/./.test(num) || null ? 1 : 0);
	return num.substring( 0,  cnt)*1
}

function intSpace( int, replaceType ){
		var cnt = 0;
		var newInt = "";
		int = int*1;
		replaceType = replaceType || " ";
		if( typeof int === NaN )
			return;
		var arrInt = (int+"").match(/([0-9])/gim).reverse();
		for (var i = 0; i < arrInt.length; i++) {
			cnt++;
			newInt = arrInt[i]+newInt
			if(cnt === 3){
				newInt = replaceType+newInt;
				cnt = 0;
			}
		}
		return newInt;
}










/* СЛАЙДЕР */
var slideIndex = 0;
showSlides();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slider-item");
    if (slides.length == 0) {
        setTimeout(function() {
            location.reload();
        }, 3000);
    }
    //var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    //for (i = 0; i < dots.length; i++) {
    //  dots[i].className = dots[i].className.replace(" active", "");
    //}
    slides[slideIndex - 1].style.display = "block";

    // Меняем showed через аякс
/*    
    $.post(
        "/vendor/raiym/instagram-php-scraper/examples/changeShowed.php", {
            mediaId: $(slides[slideIndex - 1]).attr("id-data")
        },
        onAjaxSuccess
    );
*/
    function onAjaxSuccess(data) {
        // Здесь мы получаем данные, отправленные сервером и выводим их на экран.
        //alert(data);
    }

    //dots[slideIndex-1].className += " active";
    if (slideIndex == slides.length) {
        setTimeout(function() {
            //location.reload();
        }, 200000);
    } else {
        setTimeout(showSlides, 200000); // Change image every 2 seconds
    }
}
