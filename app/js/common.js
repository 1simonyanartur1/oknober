(function ($) {
	$(document).ready(function () {

		var $scrollPos = 0;
		var $st = $(this).scrollTop();
		$(window).scroll(function () {
			var $st = $(this).scrollTop();
			if ($st > 200) {
				// Down
				$('.header').addClass('scroll');
			}
			if ($st > 650) {
				// Down
				$('.header').addClass('show');
			}
			if ($st < 1000) {
				// Up
				$('.header').removeClass('scroll');
			}
			if ($st < 1050) {
				// Up
				$('.header').removeClass('show');
			}
			$scrollPos = $st;
		});

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

		$('.additions .slider').slick({
			arrows: true,
			dots: false,
			prevArrow: '<button class="arrow arrow-prev"><img src="../img/icons/arrow-left.svg"></button>',
			nextArrow: '<button class="arrow arrow-next"><img src="../img/icons/arrow-right.svg"></button>',
			slidesToShow: 6,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 1000,
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
			infinite: true,
			autoplay: true,
			autoplaySpeed: 1000,
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

		$('.balcony-purpose .slider-for').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: '.balcony-purpose .slider-nav'
		});
		$('.balcony-purpose .slider-nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: '.balcony-purpose .slider-for',
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
			var fixed_offset = 150;
			$('html, body').stop().animate({
				scrollTop: $(this.hash).offset().top - fixed_offset
			}, 500);
			e.preventDefault();
		});

		$(function() {
			$('#myFlipper').flipper('init');
		});

	});
})(jQuery);