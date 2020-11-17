$(document).ready(function () {
	$('.header__burger').click(function () {
		$(this).toggleClass('open');
		$('.header-menu').toggleClass('header-menu--open');

		if ($('.header-menu').hasClass('header-menu--open')) {
			$('.main').addClass('scroll-lock');
		} else {
			$('.main').removeClass('scroll-lock');
		}
	});
});