(function ($) {
	$(document).ready(function () {

		// Расшифровки старого кода
		// tipokna - номер окна выбранного
		// costfin - финальная цена = costfin * koeffits - узнать что такое коэф к стоимости окон * skidka - процент скидки;
		// Пример рассчета одинарной двери if (tipokna == 41) {costfin = $('#Costhor').val() * $('#Costver').val() * stoim1 / 10000;}
		// stoim1-stoim4 - стоимость секции окна(временная переменная, для рассчета в функции)

		// полная схема рассчета -> costfin = $('#Costhor').val() * $('#Costver').val() * stoim1 / 10000; -> costfin= costfin *koeffits*skidka; 
		// -> https://prnt.sc/whv21z

		// Обект всех данных для рассчета
		var vars = {
			one_window: { // одно окно
				gluhoe: { // глухое окно
					min_width: 40,
					max_width: 130,
					min_height: 40,
					max_height: 220,
					cost: 3510
				},
				povorotnoe: { // поворотное
					min_width: 45,
					max_width: 130,
					min_height: 45,
					max_height: 225,
					cost: 7800
				},
				povorotno_otkidnoe: { // поворотно-откидное 
					min_width: 45,
					max_width: 125,
					min_height: 50,
					max_height: 230,
					cost: 8450
				}
			},
			two_window: { // два окна
				// типы секций из 2-х окон
				gluhoe_povorotnoe: {
					min_width: 40*2,
					max_width: 130*2,
					min_height: 40,
					max_height: 220,
					// cost: 3510
				},
				gluhoe_povorotno_otkidnoe: {
					min_width: 40*2,
					max_width: 125*2,
					min_height: 40,
					max_height: 220,
					// cost: 3510
				},
				povorotnoe_povorotnoe: {
					min_width: 45*2,
					max_width: 130*2,
					min_height: 45,
					max_height: 225,
					// cost: 3510
				},
				povorotnoe_povorotno_otkidnoe: {
					min_width: 45*2,
					max_width: 125*2,
					min_height: 45,
					max_height: 225,
					// cost: 3510
				}
			},
			three_window: { // три окна
				// типы секций из 3-х окон
				gluhoe_gluhoe_povorotnoe: {
					min_width: 45*3,
					max_width: 130*3,
					min_height: 45,
					max_height: 220,
					// cost: 3510
				},
				povorotnoe_gluhoe_povorotnoe: {
					min_width: 45*3,
					max_width: 130*3,
					min_height: 45,
					max_height: 220,
					// cost: 3510
				},
				povorotnoe_gluhoe_povorotno_otkidnoe: {
					min_width: 45*3,
					max_width: 125*3,
					min_height: 50,
					max_height: 220,
					// cost: 3510
				}
			},
			doors: { // двери
				one_door: { // одна дверь
					min_width: 50,
					max_width: 110,
					min_height: 170,
					max_height: 230,
					cost: 7800
				},
				two_door: { // двойная дверь
					min_width: 100,
					max_width: 220,
					min_height: 170,
					max_height: 230,
					cost: 7800
				}
			},
			window_type: 0
			// дописать остальные доп. опции
		}

		// Переменные
		var $windowWidthSlider = $('.w-slider.horizontal'); // слайдер выбора ширины
		var $windowHeightSlider = $('.w-slider.vertical'); // слайдер выбора высоты

		var $windowWidthSliderHandler = $('.w-slider.horizontal .w-slider__handler'); // полузнок ширины
		var $windowHeightSliderHandler = $('.w-slider.vertical .w-slider__handler'); // ползунок высоты

		var $windowWidthSliderInput = $("[name='w-slider-width']");
		var $windowHeightSliderInput = $("[name='w-slider-height']");

		// первоначальные значения ширины и высоты
		var $minWindowWidth = vars.one_window.gluhoe.min_width;
		var $maxWindowWidth = vars.one_window.gluhoe.max_width;
		var $minWindowHeight = vars.one_window.gluhoe.min_height;
		var $maxWindowHeight = vars.one_window.gluhoe.max_height;

		// ф-я выбора окна и подстановки его значений в калькулятор
		function chooseWindow() {
			// Открыть\скрыть варианты окон
			$('.window-type').each(function () {
				// Открыть варианты окна
				$(this).find('.window-type-item.curr').on('click', function () {
					$(this).next('.window-type-list').slideToggle();
				});
				// Поменять активный тип окна
				$(this).find('.window-type-list .window-type-item').on('click', function () {
					var $imgSrc = $(this).find('.window-type__img').attr('src'); // сохраняем путь к картинке типа окна
					$(this).parent('.window-type-list').prev('.window-type-item.curr').find('.window-type__img').attr('src', $imgSrc); // заменяем картинку активную в типах окна
					$('.window-type-list .window-type-item').removeClass('active'); // убрать активное выделение у всех в списке
					$(this).addClass('active'); // выделяем активный в списке
					$('.window-type-item.curr').removeClass('active'); // убрать активное выделение у всех
					$(this).parent('.window-type-list').prev('.window-type-item.curr').addClass('active'); // выделяем активный
					$('.window-type-list').slideUp(); // скрываем все списки окон
					$('.w-calc-size__img').attr('src', $imgSrc); // заменяем большую картинку
				});
			});

			// определить текущий тип окна
			$('.window-type-list .window-type-item').on('click', function () {
				vars.window_type = $(this).data('type'); // номер окна

				// получаем исходные данные в зависимости от типа окна
				// первая группа
				if (vars.window_type == 11) {
					$minWindowWidth = vars.one_window.gluhoe.min_width;
					$maxWindowWidth = vars.one_window.gluhoe.max_width;
					
					$minWindowHeight = vars.one_window.gluhoe.min_height;
					$maxWindowHeight = vars.one_window.gluhoe.max_height;
				}
				if (vars.window_type == 21) {
					$minWindowWidth = vars.one_window.povorotnoe.min_width;
					$maxWindowWidth = vars.one_window.povorotnoe.max_width;
					
					$minWindowHeight = vars.one_window.povorotnoe.min_height;
					$maxWindowHeight = vars.one_window.povorotnoe.max_height;
				}
				if (vars.window_type == 13) {
					$minWindowWidth = vars.one_window.povorotno_otkidnoe.min_width;
					$maxWindowWidth = vars.one_window.povorotno_otkidnoe.max_width;
					
					$minWindowHeight = vars.one_window.povorotno_otkidnoe.min_height;
					$maxWindowHeight = vars.one_window.povorotno_otkidnoe.max_height;
				}
				// вторая группа
				if (vars.window_type == 21) {
					$minWindowWidth = vars.two_window.gluhoe_povorotnoe.min_width;
					$maxWindowWidth = vars.two_window.gluhoe_povorotnoe.max_width;
					
					$minWindowHeight = vars.two_window.gluhoe_povorotnoe.min_height;
					$maxWindowHeight = vars.two_window.gluhoe_povorotnoe.max_height;
				}
				if (vars.window_type == 22) {
					$minWindowWidth = vars.two_window.gluhoe_povorotno_otkidnoe.min_width;
					$maxWindowWidth = vars.two_window.gluhoe_povorotno_otkidnoe.max_width;
					
					$minWindowHeight = vars.two_window.gluhoe_povorotno_otkidnoe.min_height;
					$maxWindowHeight = vars.two_window.gluhoe_povorotno_otkidnoe.max_height;
				}
				if (vars.window_type == 23) {
					$minWindowWidth = vars.two_window.povorotnoe_povorotnoe.min_width;
					$maxWindowWidth = vars.two_window.povorotnoe_povorotnoe.max_width;
					
					$minWindowHeight = vars.two_window.povorotnoe_povorotnoe.min_height;
					$maxWindowHeight = vars.two_window.povorotnoe_povorotnoe.max_height;
				}
				if (vars.window_type == 24) {
					$minWindowWidth = vars.two_window.povorotnoe_povorotno_otkidnoe.min_width;
					$maxWindowWidth = vars.two_window.povorotnoe_povorotno_otkidnoe.max_width;
					
					$minWindowHeight = vars.two_window.povorotnoe_povorotno_otkidnoe.min_height;
					$maxWindowHeight = vars.two_window.povorotnoe_povorotno_otkidnoe.max_height;
				}
				// третья группа
				if (vars.window_type == 31) {
					$minWindowWidth = vars.three_window.gluhoe_gluhoe_povorotnoe.min_width;
					$maxWindowWidth = vars.three_window.gluhoe_gluhoe_povorotnoe.max_width;
					
					$minWindowHeight = vars.three_window.gluhoe_gluhoe_povorotnoe.min_height;
					$maxWindowHeight = vars.three_window.gluhoe_gluhoe_povorotnoe.max_height;
				}
				if (vars.window_type == 32) {
					$minWindowWidth = vars.three_window.povorotnoe_gluhoe_povorotnoe.min_width;
					$maxWindowWidth = vars.three_window.gluhoe_gluhoe_povorotnoe.max_width;
					
					$minWindowHeight = vars.three_window.povorotnoe_gluhoe_povorotnoe.min_height;
					$maxWindowHeight = vars.three_window.povorotnoe_gluhoe_povorotnoe.max_height;
				}
				if (vars.window_type == 33) {
					$minWindowWidth = vars.three_window.povorotnoe_gluhoe_povorotno_otkidnoe.min_width;
					$maxWindowWidth = vars.three_window.povorotnoe_gluhoe_povorotno_otkidnoe.max_width;
					
					$minWindowHeight = vars.three_window.povorotnoe_gluhoe_povorotno_otkidnoe.min_height;
					$maxWindowHeight = vars.three_window.povorotnoe_gluhoe_povorotno_otkidnoe.max_height;
				}
				// четвертая группа - двери
				if (vars.window_type == 41) {
					$minWindowWidth = vars.doors.one_door.min_width;
					$maxWindowWidth = vars.doors.one_door.max_width;
					
					$minWindowHeight = vars.doors.one_door.min_height;
					$maxWindowHeight = vars.doors.one_door.max_height;
				}
				if (vars.window_type == 42) {
					$minWindowWidth = vars.doors.two_door.min_width;
					$maxWindowWidth = vars.doors.two_door.max_width;
					
					$minWindowHeight = vars.doors.two_door.min_height;
					$maxWindowHeight = vars.doors.two_door.max_height;
				}

				// меняем исходные данные ширины
				$windowWidthSlider.slider( "option", "min", $minWindowWidth )
				$windowWidthSlider.slider( "option", "max", $maxWindowWidth )
				$windowWidthSlider.slider( "option", "value", $minWindowWidth)
				$windowWidthSliderInput.val($maxWindowWidth);
				$windowWidthSliderHandler.text($minWindowWidth);
				
				// меняем исходные данные высоты
				$windowHeightSlider.slider( "option", "min", $minWindowHeight )
				$windowHeightSlider.slider( "option", "max", $maxWindowHeight )
				$windowHeightSlider.slider( "option", "value", $minWindowHeight)
				$windowHeightSliderInput.val($maxWindowHeight);
				$windowHeightSliderHandler.text($minWindowHeight);

				return $minWindowWidth, $maxWindowWidth, $minWindowHeight, $maxWindowHeight;
			});

			$('.block-title').on('click', function () {
				console.log('min-w:' + $minWindowWidth + ' max-w:' + $maxWindowWidth + ' min-h:' + $minWindowHeight + ' max-h:' + $maxWindowHeight);
			});
		}
		chooseWindow();

		// ф-я изменяющая цену
		function changePrice() {
			// получаем текущую ширину
			// получаем текущую высоту
			// определяем тип окна и считаем
		}
		changePrice();

		// ф-я записывает финальные данные в скрытые инпуты
		function writeVars() {

		}
		writeVars();

		

		$windowHeightSliderInput.val($maxWindowHeight);
		$windowWidthSliderInput.val($maxWindowWidth);


		// Слайдеры
		$windowHeightSlider.slider({
			orientation: "vertical",
			range: "min",
			min: $minWindowHeight,
			max: $maxWindowHeight,
			value: $minWindowHeight,
			create: function (event, ui) {
				$windowHeightSliderHandler.text($(this).slider("value"));
			},
			slide: function (event, ui) {
				$windowHeightSliderHandler.text(ui.value);
				$windowHeightSliderInput.val(ui.value);
			}
		});
		$windowWidthSlider.slider({
			range: "min",
			min: $minWindowWidth,
			max: $maxWindowWidth,
			value: $minWindowWidth,
			create: function (event, ui) {
				$windowWidthSliderHandler.text($(this).slider("value"));
			},
			slide: function (event, ui) {
				$windowWidthSliderHandler.text(ui.value);
				$windowWidthSliderInput.val(ui.value);
			}
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