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










		//Основной Слайдер
		window.slidermain = $(".slidermain-items").flickity({
			imagesLoaded: true,
			autoPlay: 1000,
			pauseAutoPlayOnHover: true,
			//arrowShape: arrowStyle,
			initialIndex: 0,
			prevNextButtons: false,
			draggable: false,
			wrapAround: true,
			friction: 1,
			selectedAttraction: 1,
			pageDots: false,
			contain: false,
			percentPosition: true,
			cellSelector: 'figure',
			cellAlign: "center"
		});
		slidermain.data("flickity");



		var startParseInterval = setInterval(function(){
			if ( typeof bob == "undefined" ) window.bob = true;
			if (bob){
				if($(Pic.slideItemClass).length <= 0){
					bob = false;
					console.log
					Pic.parser(function(){
						bob = true;
					})
				}
				else
					clearInterval(startParseInterval);
			}
		}, 1000);

		function stepSlide(currentSlide){

			console.log("stepSlide");

			var slides = $(Pic.slideItemClass);
			var currentIndex = Pic.currentSlide.index();
			var lastIndex = slides.eq( $(Pic.slideItemClass).length-1 ).index() ;
			var slidesLength = $(Pic.slideItemClass).length;

			//if( lastIndex == currentIndex){
			//	slidermain.flickity('stopPlayer'); // Остановка слайдера
			//	Pic.parser(); // Запрос на картинки
			//}
			Pic.parser(); // Запрос на картинки
			if( Pic.maxLenght <= slidesLength ){
				slidermain.flickity('remove', slides.eq(0)); // Удаление элементов слейдера
			}
		}
		

		// События смены слайды
		

		// Случайное число
		function IntRandom(){
			return Math.round((Math.random() * 1e12))
		}

		slidermain.on( 'select.flickity', function( event ) {
			if( typeof figurePrevId == "undefined" )
				window.figurePrevId = 0;

			var currentSlide = $(Pic.slideItemClass).filter(".is-selected");
			Pic.currentSlide = currentSlide;
			var rand = IntRandom();
			var selectId = currentSlide.attr( Pic.attrFigureId );
			
			if ( selectId && selectId == figurePrevId )
				return;

			currentSlide.attr(Pic.attrFigureId, rand);
			figurePrevId = currentSlide.attr(Pic.attrFigureId);
			stepSlide(currentSlide);

		});


		window.Pic = {

			slideItemClass: ".slider-item", // Класс для элементов слайдера
			url: "http://192.168.0.117/modules/getMedias.php", // Адрес запроса
			maxLenght:  5, // Максимальное кол-во элементов в слайдере
			inc: 0,
			currentSlide: undefined,
			attrFigureId: "figure-id",

			appendTemplate:  function ( id, img ) {

				var newTemp = this.template	.replace(/{id-data}/gim, id)
																		.replace(/{img}/gim, img);

			  slidermain.flickity( 'append', $(newTemp) );

			},

			parser: function(callbackFunction){

				var that = this;

				$.ajax({
					type: "POST",
					url: that.url,
					data: {
						inc: that.inc
					},
					success: function(data){
						try{
							data = JSON.parse(data);
						}catch(err){
							slidermain.flickity('playPlayer'); // Запуск слайдера при отсутствии JSON данных
							return;
						}
						$(data).map(function( i, el ){
							that.appendTemplate( el.mediaId, el.mediaUrl); // Вставка в слайдер
						});

						slidermain.flickity('playPlayer'); // Запуск слайдера
						that.inc++;

						//callback
						if( typeof callbackFunction == "function" ) callbackFunction();

					},
					statusCode: {
						404: function(){ alert( "По адресу: " + Pic.url + " Страницы не найдена" ); }
					},
					complete: function(response){
						//callback
						if( typeof callbackFunction == "function" ) callbackFunction();
					}
				});
			},
			selectId: function ( id ) {
				var index = slidermain.find( "[id-data=" + id + "]" ).eq(0).index();
				slidermain.flickity( 'select', index );
			}	
		}
		Pic.template = 						
									'<figure class="slider-item" id-data="{id-data}" ' + Pic.attrFigureId + '="' + IntRandom() + '" >'+
										'<div class="img-content">'+
											'<div class="img-wrapper">'+
												'<div class="img" style="background-image: url(\'{img}\');"></div>'+
												'<div class="img mirror" style="background-image: url(\'{img}\');"></div>'+
											'</div>'+
										'</div>'+
									'</figure>';






		///appendTemplate( 14, "img/slider/wedding-3.jpg" );











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
			var scaleV = winHeight / boxHeight;	

		 	var boxHeightOrigin = boxHeight * scaleH;

			if( boxHeightOrigin < winHeight)
				scale = scaleH;
			else
				scale = scaleV;
				
			widthClass.css({
				transform: "scale(" + scale + ")"
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
//showSlides();

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
        }, 2000);
    } else {
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
}
//http://192.168.1.60/modules/changeShowed.php


