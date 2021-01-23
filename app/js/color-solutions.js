(function ($) {
	$(document).ready(function () {

		$('.color-solutions .slider').slick({
			arrows: true,
			dots: false,
			prevArrow: '<button class="arrow arrow-prev"><img src="../img/icons/arrow-left.svg"></button>',
			nextArrow: '<button class="arrow arrow-next"><img src="../img/icons/arrow-right.svg"></button>',
			slidesToShow: 5,
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
			}, {
				breakpoint: 400,
				settings: {
					slidesToShow: 1,
				}
			}]
		});

		var $windowLamination = $('.color-solutions .window__frame');
		var $windowHandle = $('.color-solutions .window__handle');

		// добавить прелоадер пока не прилетит картинка с бека

		$('.slider.handle .slide').on('click', function() {
			var $handle = $(this).find('.slide__img').data('name');
			$('.slider.handle .slide').removeClass('active');
			$(this).addClass('active');
			$windowHandle.attr('src', 'img/color-solutions/handle/' + $handle);
		});
		$('.slider.lamination .slide').on('click', function() {
			var $lamination = $(this).find('.slide__img').data('name');
			$('.slider.lamination .slide').removeClass('active');
			$(this).addClass('active');
			$windowLamination.attr('src', 'img/color-solutions/lamination/' + $lamination);
		});

	});
})(jQuery);