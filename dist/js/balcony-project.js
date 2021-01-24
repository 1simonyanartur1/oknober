(function ($) {
	$(document).ready(function () {

		$('select').niceSelect();

		$('.balcony-project-variant').on('click', function () {
			$(this).parent('.balcony-project-variants, .balcony-project-tab').find('.balcony-project-variant').removeClass('active');
			$(this).addClass('active');

			var $parent = $(this).parent('.balcony-project-variants, .balcony-project-tab');
			var $img = $(this).data('img');

			if($('.plastik').hasClass('active')) {
				$('.roof1').addClass('disabled');
				$('.roof2').data('img', 'roof/v2-2.png');
			} else {
				$('.roof1').removeClass('disabled');
				$('.roof2').data('img', 'roof/v2-1.png');
			}

			if($('.plastik').hasClass('active') && $('.roof2').hasClass('active')) {
				$('.balcony-project__roof').attr('src','img/balcony-project/roof/v2-2.png');
			} else if(!$('.plastik').hasClass('active') && $('.roof2').hasClass('active')) {
				$('.balcony-project__roof').attr('src','img/balcony-project/roof/v2-1.png');
			}

			if($('.plastik').hasClass('active') && $('.roof1').hasClass('active')) {
				$('.roof1').removeClass('active');
				$('.roof0').addClass('active');
				$('.balcony-project__roof').attr('src','img/balcony-project/cancel-1.png');
			}


			
			if ($parent.hasClass('roof')) {
				$('.balcony-project__roof').attr('src','img/balcony-project/' + $img);
			}
			if ($parent.hasClass('glazing-type')) {
				$('.balcony-project__glazing-type').attr('src','img/balcony-project/' + $img);
			}
			if ($parent.hasClass('external-lining')) {
				$('.balcony-project__external-lining').attr('src','img/balcony-project/' + $img);
			}
			if ($parent.hasClass('masonry')) {
				$('.balcony-project__masonry').attr('src','img/balcony-project/' + $img);
			}
			if ($parent.hasClass('cupboard')) {
				$('.balcony-project__cupboard').attr('src','img/balcony-project/' + $img);
			}
			if ($parent.hasClass('interior')) {
				$('.balcony-project__interior').attr('src','img/balcony-project/' + $img);
			}
			if ($parent.hasClass('floor')) {
				$('.balcony-project__floor').attr('src','img/balcony-project/' + $img);
			}

			
		});

		$('.balcony-project select').on('change', function() {
			$(this).parents('.balcony-project-block').find('.balcony-project-variant').removeClass('active');
			var $id = $(this).val();
			$(this).parents('.balcony-project-block').find('.balcony-project-tab').removeClass('active');
			$(this).parents('.balcony-project-block').find('.balcony-project-tab' + '#' + $id).addClass('active');
		});

	});
})(jQuery);