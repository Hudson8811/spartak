$(document).ready(function () {
	var menu = $('.header-menu');
	$('.header__burger').click(function () {
		$(this).toggleClass('open');
		menu.toggleClass('header-menu--open');

		if (menu.hasClass('header-menu--open')) {
			$('.main').addClass('main-hidden');
			$('body').addClass('body-scroll-lock');
		} else {
			$('.main').removeClass('main-hidden');
			$('body').removeClass('body-scroll-lock');
		}
	});

	// Adaptive mobile menu height
	setMenuSize();

	$(window).resize(function () {
		setMenuSize();
	});

	function setMenuSize() {
		menu.css('height', 'calc(100vh - ' + $('.footer').innerHeight() + 'px)');
		menu.css('paddingTop', $('.header').height());
	}
});