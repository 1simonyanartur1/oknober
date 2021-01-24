(function ($) {
	$(document).ready(function () {

		$('.warm-cold select').niceSelect();

		$('.warm-cold-variant').on('click', function () {
			$(this).parent('.warm-cold-variants, .warm-cold-tab').find('.warm-cold-variant').removeClass('active');
			$(this).addClass('active');

			var $parent = $(this).parent('.warm-cold-variants, .warm-cold-tab');
			var $img = $(this).data('img');

			if ($parent.hasClass('outside')) {
				$('.warm-cold__outside').attr('src', 'img/warm-cold/' + $img);
			}
			if ($parent.hasClass('glazing')) {
				$('.warm-cold__balcony').attr('src', 'img/warm-cold/' + $img);
			}

		});

		$('.warm-cold select').on('change', function () {
			$(this).parents('.warm-cold-block').find('.warm-cold-variant').removeClass('active');
			var $id = $(this).val();
			$(this).parents('.warm-cold-block').find('.warm-cold-tab').removeClass('active');
			$(this).parents('.warm-cold-block').find('.warm-cold-tab' + '#' + $id).addClass('active');
		});

	});
})(jQuery);