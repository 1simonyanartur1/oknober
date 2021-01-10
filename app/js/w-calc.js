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
					min_width: 40 * 2,
					max_width: 130 * 2,
					min_height: 40,
					max_height: 220
				},
				gluhoe_povorotno_otkidnoe: {
					min_width: 40 * 2,
					max_width: 125 * 2,
					min_height: 40,
					max_height: 220
				},
				povorotnoe_povorotnoe: {
					min_width: 45 * 2,
					max_width: 130 * 2,
					min_height: 45,
					max_height: 225
				},
				povorotnoe_povorotno_otkidnoe: {
					min_width: 45 * 2,
					max_width: 125 * 2,
					min_height: 45,
					max_height: 225
				}
			},
			three_window: { // три окна
				// типы секций из 3-х окон
				gluhoe_gluhoe_povorotnoe: {
					min_width: 45 * 3,
					max_width: 300,
					min_height: 45,
					max_height: 220
				},
				povorotnoe_gluhoe_povorotnoe: {
					min_width: 45 * 3,
					max_width: 300,
					min_height: 45,
					max_height: 220
				},
				povorotnoe_gluhoe_povorotno_otkidnoe: {
					min_width: 45 * 3,
					max_width: 300,
					min_height: 50,
					max_height: 220
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
			window_type: 11,
			window_kef: 1, // коэффициент к стоимости окон
			window_discount: 0.1, // скидка
			window_vashaeconomiya: 0.4, // экономия
			podokonnik: 520, // подоконник за м
			otliv: 520, // подоконник за м
			montaz: 1560, // монтажные работы за м2
		}

		// Переменные
		var $windowWidthSlider = $('.w-slider.horizontal'); // слайдер выбора ширины
		var $windowHeightSlider = $('.w-slider.vertical'); // слайдер выбора высоты

		var $windowWidthSliderHandler = $('.w-slider.horizontal .w-slider__handler'); // полузнок ширины
		var $windowHeightSliderHandler = $('.w-slider.vertical .w-slider__handler'); // ползунок высоты

		var $windowWidthSliderInput = $("[name='w-slider-width']");
		var $windowHeightSliderInput = $("[name='w-slider-height']");

		var $podokonnik = $('.extra-checkbox__input[name="podokonnik"]');
		var $montaz = $('.extra-checkbox__input[name="montaz"]');
		var $otliv = $('.extra-checkbox__input[name="otliv"]');

		// первоначальные значения ширины и высоты
		var $minWindowWidth = vars.one_window.gluhoe.min_width;
		var $maxWindowWidth = vars.one_window.gluhoe.max_width;
		var $minWindowHeight = vars.one_window.gluhoe.min_height;
		var $maxWindowHeight = vars.one_window.gluhoe.max_height;

		var $finalPrice = 0; // финальная цена без скидки
		var $discountPrice = 0; // финальная цена со скидкой

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
					// $('.window-type-list .window-type-item').removeClass('active'); // убрать активное выделение у всех в списке
					$(this).parent('.window-type-list').find('.window-type-item').removeClass('active'); // убрать активное выделение у всех в списке
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
				if (vars.window_type == 12) {
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
				$windowWidthSlider.slider("option", "min", $minWindowWidth)
				$windowWidthSlider.slider("option", "max", $maxWindowWidth)
				$windowWidthSlider.slider("option", "value", $maxWindowWidth)
				$windowWidthSliderInput.val($maxWindowWidth);
				$windowWidthSliderHandler.text($maxWindowWidth);

				// меняем исходные данные высоты
				$windowHeightSlider.slider("option", "min", $minWindowHeight)
				$windowHeightSlider.slider("option", "max", $maxWindowHeight)
				$windowHeightSlider.slider("option", "value", $maxWindowHeight)
				$windowHeightSliderInput.val($maxWindowHeight);
				$windowHeightSliderHandler.text($maxWindowHeight);

				changePrice();
				return $minWindowWidth, $maxWindowWidth, $minWindowHeight, $maxWindowHeight;
			});

		}
		chooseWindow();

		// ф-я изменяющая цену
		function changePrice() {

			var currWidth = $windowWidthSliderInput.val(); // получаем текущую ширину
			var currHeight = $windowHeightSliderInput.val(); // получаем текущую высоту

			var $price;
			var $fullprice;

			// определяем тип окна и считаем
			// первая группа
			if (vars.window_type == 11) {
				$finalPrice = currWidth * currHeight * vars.one_window.gluhoe.cost / 10000;
			}
			if (vars.window_type == 12) {
				$finalPrice = currWidth * currHeight * vars.one_window.povorotnoe.cost / 10000;
			}
			if (vars.window_type == 13) {
				$finalPrice = currWidth * currHeight * vars.one_window.povorotno_otkidnoe.cost / 10000;
			}
			// вторая группа
			if (vars.window_type == 21) {
				$finalPrice = (currWidth * currHeight * 0.5 * vars.one_window.povorotnoe.cost / 10000) + (currWidth * currHeight * 0.5 * vars.one_window.gluhoe.cost / 10000);
			}
			if (vars.window_type == 22) {
				$finalPrice = (currWidth * currHeight * 0.5 * vars.one_window.povorotno_otkidnoe.cost / 10000) + (currWidth * currHeight * 0.5 * vars.one_window.gluhoe.cost / 10000);
			}
			if (vars.window_type == 23) {
				$finalPrice = (currWidth * currHeight * 0.5 * vars.one_window.povorotnoe.cost / 10000) + (currWidth * currHeight * 0.5 * vars.one_window.povorotnoe.cost / 10000);
			}
			if (vars.window_type == 24) {
				$finalPrice = (currWidth * currHeight * 0.5 * vars.one_window.povorotno_otkidnoe.cost / 10000) + (currWidth * currHeight * 0.5 * vars.one_window.povorotnoe.cost / 10000);
			}
			// третья группа
			if (vars.window_type == 31) {
				$finalPrice = (currWidth * currHeight * 0.333333 * vars.one_window.gluhoe.cost / 10000) + (currWidth * currHeight * 0.333333 * vars.one_window.povorotnoe.cost / 10000) + (currWidth * currHeight * 0.333333 * vars.one_window.gluhoe.cost / 10000);
			}
			if (vars.window_type == 32) {
				$finalPrice = (currWidth * currHeight * 0.333333 * vars.one_window.povorotnoe.cost / 10000) + (currWidth * currHeight * 0.333333 * vars.one_window.povorotnoe.cost / 10000) + (currWidth * currHeight * 0.333333 * vars.one_window.gluhoe.cost / 10000);
			}
			if (vars.window_type == 33) {
				$finalPrice = (currWidth * currHeight * 0.333333 * vars.one_window.povorotnoe.cost / 10000) + (currWidth * currHeight * 0.333333 * vars.one_window.povorotno_otkidnoe.cost / 10000) + (currWidth * currHeight * 0.333333 * vars.one_window.gluhoe.cost / 10000);
			}
			// четвертая группа - двери
			if (vars.window_type == 41) {
				$finalPrice = currWidth * currHeight * vars.doors.one_door.cost / 10000;
			}
			if (vars.window_type == 42) {
				$finalPrice = currWidth * currHeight * vars.doors.two_door.cost / 10000;
			}

			// финальная цена со всемы скидками
			$discountPrice = $finalPrice * vars.window_kef * vars.window_discount;
			$finalPrice = $finalPrice - $discountPrice;
			
			// проверка дополнительных опций
			if($podokonnik.hasClass('active')) {
				$finalPrice = $finalPrice + vars.podokonnik * currWidth * 0.01;
			}
			if($montaz.hasClass('active')) {
				$finalPrice = $finalPrice + vars.montaz * currWidth * currHeight * 0.0001;
			}
			if($otliv.hasClass('active')) {
				$finalPrice = $finalPrice + vars.otliv * currWidth * 0.01;
			}

			$finalPrice = Math.round($finalPrice);
			$('.window-calc .price.dark .price__text b').text($finalPrice);

			// финальная цена без скидок
			$price = $finalPrice * vars.window_vashaeconomiya;
			$price = Math.round($price);
			$fullPrice = $finalPrice + $price;
			$('.window-calc .price.light .price__text b').text($fullPrice);
		}

		$podokonnik.on('click', function () {
			$(this).toggleClass('active');
			changePrice();
		});
		$montaz.on('click', function () {
			$(this).toggleClass('active');
			changePrice();
		});
		$otliv.on('click', function () {
			$(this).toggleClass('active');
			changePrice();
		});

		// ф-я записывает финальные данные в скрытые инпуты
		function writeVars() {

		}
		writeVars();

		// Начальные значения для слайдеров
		$windowHeightSliderInput.val($maxWindowHeight);
		$windowWidthSliderInput.val($maxWindowWidth);

		// Слайдеры размера
		$windowHeightSlider.slider({
			orientation: "vertical",
			range: "min",
			min: $minWindowHeight,
			max: $maxWindowHeight,
			value: $maxWindowHeight,
			create: function (event, ui) {
				$windowHeightSliderHandler.text($(this).slider("value"));
				changePrice();
			},
			slide: function (event, ui) {
				$windowHeightSliderHandler.text(ui.value);
				$windowHeightSliderInput.val(ui.value);
				changePrice();
			}
		});
		$windowWidthSlider.slider({
			range: "min",
			min: $minWindowWidth,
			max: $maxWindowWidth,
			value: $maxWindowWidth,
			create: function (event, ui) {
				$windowWidthSliderHandler.text($(this).slider("value"));
				changePrice();
			},
			slide: function (event, ui) {
				$windowWidthSliderHandler.text(ui.value);
				$windowWidthSliderInput.val(ui.value);
				changePrice();
			}
		});


		// меняем значения и пересчитываем цены при изменении input
		$('.w-slider-input[name="w-slider-width"]').on('change', function() {
			var min = $windowWidthSlider.slider( "option", "min");
			var max = $windowWidthSlider.slider( "option", "max");
			
			if($(this).val() < min) {
				$(this).val(min);
			} else {}
			if ($(this).val() > max) {
				$(this).val(max)
			} else {}
			
			$windowWidthSliderHandler.text($(this).val());
			$windowWidthSlider.slider( "option", "value", $(this).val() );

			changePrice();
		});
		$('.w-slider-input[name="w-slider-height"]').on('change', function() {
			var min = $windowHeightSlider.slider( "option", "min");
			var max = $windowHeightSlider.slider( "option", "max");
			
			if($(this).val() < min) {
				$(this).val(min);
			} else {}
			if ($(this).val() > max) {
				$(this).val(max)
			} else {}
			
			$windowHeightSliderHandler.text($(this).val());
			$windowHeightSlider.slider( "option", "value", $(this).val() );

			changePrice();
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