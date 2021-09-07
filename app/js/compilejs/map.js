(function ($) {
	$(document).ready(function () {

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