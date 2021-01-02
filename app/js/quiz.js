(function ($) {
	$(document).ready(function () {

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

				setTimeout(function(){
					$('.quiz .slider').slick('slickNext');
				}, 200);
			} else {}
		});

	});
})(jQuery);