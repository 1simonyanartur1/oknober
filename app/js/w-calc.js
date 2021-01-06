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
					max_width: 30,
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
				// типо секций из 2-х окон
			},
			three_window: { // три окна
				// типо секций из 3-х окон
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
			}
			// дописать остальные доп. опции
		}

		// ф-я определяет тип окна (по data-атрибуту\id\class у каждого окна)

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
			// понять как связать разметку со значениями выше

		}
		chooseWindow();

		// ф-я изменяющая цену
		function changePrice() {
			
		}
		changePrice();

		// ф-я записывает финальные данные в скрытые инпуты
		function writeVars() {
			
		}
		writeVars();

		// Переменные
		var $windowWidthSlider = $('.w-slider.horizontal'); // слайдер выбора ширины
		var $windowHeightSlider = $('.w-slider.vertical'); // слайдер выбора высоты

		var $windowWidthSliderHandler = $('.w-slider.horizontal .w-slider__handler'); // полузнок ширины
		var $windowHeightSliderHandler = $('.w-slider.vertical .w-slider__handler'); // ползунок высоты

		var $windowWidthSliderInput = $("[name='w-slider-width']");
		var $windowHeightSliderInput = $("[name='w-slider-height']");

		var $maxWindowWidth = 0; // мм зависит от типа окна (краткая запись условий)
		var $maxWindowHeight = 0; // мм зависит от типа окна (краткая запись условий)
		
		// Слайдеры
		$windowHeightSlider.slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			create: function (event, ui) {
				$windowHeightSliderHandler.text($(this).slider("value"));
				$windowHeightSliderInput.val(ui.value);
			},
			slide: function (event, ui) {
				$windowHeightSliderHandler.text(ui.value);
				$windowHeightSliderInput.val(ui.value);
			}
		});
		$windowWidthSlider.slider({
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			create: function (event, ui) {
				$windowWidthSliderHandler.text($(this).slider("value"));
				$windowWidthSliderInput.val(ui.value);
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