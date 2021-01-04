(function ($) {
	$(document).ready(function () {

		// Переменные
		var $windowWidthSlider = $('.w-slider.horizontal'); // слайдер выбора ширины
		var $windowHeightSlider = $('.w-slider.vertical'); // слайдер выбора высоты

		var $windowWidthSliderHandler = $('.w-slider.horizontal .w-slider__handler'); // полузнок ширины
		var $windowHeightSliderHandler = $('.w-slider.vertical .w-slider__handler'); // ползунок высоты

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

		// Варианты окон
		$('.window-type').each(function () {
			// Открыть варианты окна
			$(this).find('.window-type-item.curr').on('click', function () {
				$(this).next('.window-type-list').slideToggle();
			});
			// Поменять активный тип окна
			$(this).find('.window-type-list .window-type-item').on('click', function () {
				var $imgSrc = $(this).find('.window-type__img').attr('src'); // сохраняем путь к картинке типа окна
				$(this).parent('.window-type-list').prev('.window-type-item.curr').find('.window-type__img').attr('src', $imgSrc); // заменяем картинку активную в типах окна
				$('.window-type-item.curr').removeClass('active'); // убрать активное выделение у всех
				$(this).parent('.window-type-list').prev('.window-type-item.curr').addClass('active'); // выделяем активный
				$('.window-type-list').slideUp(); // скрываем все списки окон
				$('.w-calc-size__img').attr('src', $imgSrc); // заменяем большую картинку
			});
		});

		// выбор подарка
		$('.w-calc .present-list').hide();
		$('.w-calc .present__curr').on('click', function () {
			$(this).toggleClass('active').next('.present-list').slideToggle();
		});
		$('.w-calc .present-list li').on('click', function () {
			var $text = $(this).text();
			$('.w-calc .present__curr').text($text);
			$(this).parent('.present-list').slideToggle();
			$(this).parent('.present-list').prev('.present__curr').toggleClass('active');
		});

		// селект
		$('.w-calc .select-list').hide();
		$('.w-calc .select__curr').on('click', function () {
			$(this).toggleClass('active').next('.select-list').slideToggle();
		});
		$('.w-calc .select-list li').on('click', function () {
			var $text = $(this).text();
			$('.w-calc .select__curr').text($text);
			$(this).parent('.select-list').slideToggle();
			$(this).parent('.select-list').prev('.select__curr').toggleClass('active');
		});

	});
})(jQuery);