function anchorScroll(e) {
	e.click(function () {
		link = $(this).attr('id');
		to = $('.purchase-sector').offset().top;
		$('body, html').animate({
			scrollTop: to
		}, 800);
	});
}

$(window).on('load', function() {
    $('.plan-preloader').remove();

		anchorScroll($('.plan svg .place.active'));
});
