(function ($) {
	$(document).ready(function () {

		$('.additions .slider').slick({
			arrows: true,
			dots: false,
			prevArrow: '<button class="arrow arrow-prev"><img src="../img/icons/arrow-left.svg"></button>',
			nextArrow: '<button class="arrow arrow-next"><img src="../img/icons/arrow-right.svg"></button>',
			slidesToShow: 6,
			slidesToScroll: 1,
			infinite: true
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
			vertical: true
		});

		$(".tabs").tabs();

		$('input[type="tel"]').inputmask({
			mask: "+7 (999) 999-99-99",
			greedy: false
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