(function ($) {
	$(document).ready(function () {

		$('select').niceSelect();

		$('.balcony-project-variant').on('click', function () {
			$(this).parent('.balcony-project-variants, .balcony-project-tab').find('.balcony-project-variant').removeClass('active');
			$(this).addClass('active');

			var $parent = $(this).parent('.balcony-project-variants, .balcony-project-tab');
			var $img = $(this).data('img');
			
			if ($parent.hasClass('roof')) {
				$('.balcony-project__roof').attr('src','img/balcony-project/' + $img)
			}
			if ($parent.hasClass('glazing-type')) {
				$('.balcony-project__glazing-type').attr('src','img/balcony-project/' + $img)
			}
			if ($parent.hasClass('external-lining')) {
				$('.balcony-project__external-lining').attr('src','img/balcony-project/' + $img)
			}
			if ($parent.hasClass('masonry')) {
				$('.balcony-project__masonry').attr('src','img/balcony-project/' + $img)
			}
			if ($parent.hasClass('cupboard')) {
				$('.balcony-project__cupboard').attr('src','img/balcony-project/' + $img)
			}
			if ($parent.hasClass('interior')) {
				$('.balcony-project__interior').attr('src','img/balcony-project/' + $img)
			}
			if ($parent.hasClass('floor')) {
				$('.balcony-project__floor').attr('src','img/balcony-project/' + $img)
			}
		});

		$('.balcony-project select').on('change', function() {
			$(this).parents('.balcony-project-block').find('.balcony-project-variant').removeClass('active');
			var $id = $(this).val();
			$('.balcony-project-tab').removeClass('active');
			$('.balcony-project-variants').find('.balcony-project-tab' + '#' + $id).addClass('active');
		});

	});
})(jQuery);