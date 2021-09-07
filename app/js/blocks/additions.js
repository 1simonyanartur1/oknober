export function additions() {
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
}
