(function ($) {
	$(document).ready(function () {

		var $windowWidthSlider = $('.w-slider.horizontal');
		var $windowHeightSlider = $('.w-slider.vertical');

		var $windowWidthSliderHandler = $('.w-slider.horizontal .w-slider__handler');;
		var $windowHeightSliderHandler = $('.w-slider.vertical .w-slider__handler');

		var $maxWindowWidth = 0; // мм зависит от типа окна (краткая запись условий)
		var $maxWindowHeight = 0; // мм зависит от типа окна (краткая запись условий)

		$windowHeightSlider.slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			create: function () {
				$windowHeightSliderHandler.text($(this).slider("value"));
			},
			slide: function (event, ui) {
				$windowHeightSliderHandler.text(ui.value);
			}
		});
		$windowWidthSlider.slider({
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			create: function () {
				$windowWidthSliderHandler.text($(this).slider("value"));
			},
			slide: function (event, ui) {
				$windowWidthSliderHandler.text(ui.value);
			}
		});

	});
})(jQuery);