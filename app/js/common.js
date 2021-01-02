(function ($) {
	$(document).ready(function () {

		var $scrollPos = 0;
		var $st = $(this).scrollTop();
		$(window).scroll(function () {
			var $st = $(this).scrollTop();
			if ($st > 500) {
				// Down
				$('.header').addClass('scroll');
			} else {
				// Up
				// $('.header').removeClass('scroll');
				$('.header').removeClass('show');
			}
			if ($st > 1000) {
				// Down
				$('.header').addClass('show');
			}
			if ($st < 500) {
				$('.header').removeClass('scroll');
				$('.header').removeClass('show');
			}
			$scrollPos = $st;
		});
		
		$scrollPos = $st;
		if($scrollPos > 0) {
			$('.header').addClass('scroll');
			$('.header').addClass('show');
		}

		// SmartMenus init
		$(function () {
			$('#main-menu').smartmenus({
				mainMenuSubOffsetX: -1,
				mainMenuSubOffsetY: 4,
				subMenusSubOffsetX: 6,
				subMenusSubOffsetY: -6,
				markCurrentItem: true,
				markCurrentTree: true,
				collapsibleBehavior: 'link'
			});
		});

		// SmartMenus mobile menu toggle button
		$(function () {
			var $mainMenuState = $('#main-menu-state');
			if ($mainMenuState.length) {
				// animate mobile menu
				$mainMenuState.change(function (e) {
					var $menu = $('#main-menu');
					if (this.checked) {
						$menu.hide().slideDown(250, function () {
							$menu.css('display', '');
						});
					} else {
						$menu.show().slideUp(250, function () {
							$menu.css('display', '');
						});
					}
				});
				// hide mobile menu beforeunload
				$(window).bind('beforeunload unload', function () {
					if ($mainMenuState[0].checked) {
						$mainMenuState[0].click();
					}
				});
			}
		});

		$('.fixed-links').on('mouseenter', function () {
			$(this).removeClass('enter');
		});
		$('.fixed-links').on('mouseleave', function () {
			$(this).addClass('enter');
		});

		$('.consult-icon').on('click', function () {
			$('.consult').removeClass('mini');
		});
		$('.consult__close').on('click', function () {
			$('.consult').addClass('mini');
		});

		$('.quiz .slider').slick({
			dots: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			arrows: false,
			infinite: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.quiz .bottom-right'
		});

		$('.quiz .bottom-right').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.quiz .slider',
			dots: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			arrows: false,
			infinite: false,
			speed: 300,
			fade: true,
			focusOnSelect: false,
			vertical: false
		});

		var all = $('.quiz .slider').slick('getSlick').slideCount;
		$('.quiz .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			var cur = $('.quiz .slider').slick('slickCurrentSlide') + 1;
			if (cur == all) {
				$(this).addClass('finish');
				$('.quiz .bottom-right').addClass('finish');
			} else {}
		});

		$('.quiz .next').on('click', function (e) {
			e.preventDefault();
			$('.quiz .slider').slick('slickNext');
		});
		$('.quiz .prev').on('click', function (e) {
			e.preventDefault();
			$('.quiz .slider').slick('slickPrev');
		});


		var handle = $(".window-counter__handler");
		$("#window-counter").slider({
			value: 5,
			orientation: "horizontal",
			range: "min",
			animate: true,
			max: 25,
			create: function () {
				handle.text($(this).slider("value"));
			},
			slide: function (event, ui) {
				handle.text(ui.value);
			}
		});


		var $minInput = $(".money__input[name='min-price']");
		var $maxInput = $(".money__input[name='max-price']");

		var minPrice = 0;
		var maxPrice = 200000;

		var $rangeSlider = $(".money-slider");

		$rangeSlider.slider({
			range: true,
			min: minPrice,
			max: maxPrice,
			values: [minPrice, maxPrice / 2],
			slide: function (event, ui) {
				$minInput.val(ui.values[0]);
				$maxInput.val(ui.values[1]);
			}
		});

		$minInput.val($rangeSlider.slider("values", 0));
		$maxInput.val($rangeSlider.slider("values", 1));

		function changeMin() {
			$(document).on('keyup, change', $minInput, function () {
				$rangeSlider.slider("option", "values", [parseInt($($minInput).val()), parseInt($($maxInput).val())]);
			});
		}
		changeMin();

		function changeMax() {
			$(document).on('keyup, change', $maxInput, function () {
				$rangeSlider.slider("option", "values", [parseInt($($minInput).val()), parseInt($($maxInput).val())]);
			});
		}
		changeMax();

		$('.slide input[type="radio"]').on('change', function () {
			if ($(this).is(':checked')) {
				$(this).parents('.slide').find('.next').removeClass('disabled');
			} else {}
		});

		$('.additions .slider').slick({
			arrows: true,
			dots: false,
			prevArrow: '<button class="arrow arrow-prev"><img src="../img/icons/arrow-left.svg"></button>',
			nextArrow: '<button class="arrow arrow-next"><img src="../img/icons/arrow-right.svg"></button>',
			slidesToShow: 6,
			slidesToScroll: 1,
			infinite: true,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
				}
			}, {
				breakpoint: 800,
				settings: {
					slidesToShow: 3,
				}
			}, {
				breakpoint: 575,
				settings: {
					slidesToShow: 2,
				}
			}]
		});

		$('.certificates .slider').slick({
			arrows: true,
			dots: false,
			prevArrow: '<button class="arrow arrow-prev"><img src="../img/icons/arrow-left.svg"></button>',
			nextArrow: '<button class="arrow arrow-next"><img src="../img/icons/arrow-right.svg"></button>',
			slidesToShow: 2,
			slidesToScroll: 1,
			infinite: true
		});

		$('.reviews .slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.reviews .slider-nav'
		});
		$('.reviews .slider-nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.reviews .slider-for',
			dots: false,
			prevArrow: '<button class="arrow arrow-prev"><img src="../img/icons/arrow-top.svg"></button>',
			nextArrow: '<button class="arrow arrow-next"><img src="../img/icons/arrow-bottom.svg"></button>',
			focusOnSelect: true,
			vertical: true,
			responsive: [{
				breakpoint: 800,
				settings: {
					vertical: false
				}
			}, {
				breakpoint: 575,
				settings: {
					vertical: false,
					slidesToShow: 2
				}
			}]
		});

		$(".tabs").tabs();

		$('input[type="tel"]').inputmask({
			mask: "+7 (999) 999-99-99",
			greedy: false
		});

		$(document).on('click', '.anchor', function (e) {
			var fixed_offset = 50;
			$('html, body').stop().animate({
				scrollTop: $(this.hash).offset().top - fixed_offset
			}, 500);
			e.preventDefault();
		});

		// Initialize and add the map
		function initMap() {
			// The location
			const centerMap = {
				lat: 46.477946,
				lng: 30.745294
			};
			// The map
			const map = new google.maps.Map(document.getElementById("map"), {
				zoom: 18,
				center: centerMap,
			});
			// The marker
			var marker = new google.maps.Marker({
				position: {
					lat: 46.477946,
					lng: 30.745294
				},
				map: map
			});
		}
		if ($('#map').length) {
			initMap();
		}

	});
})(jQuery);