$(document).ready(function () {
	var menu = $('.header-menu');
	$('.header__burger').click(function () {
		$(this).toggleClass('open');
		menu.toggleClass('header-menu--open');

		if (menu.hasClass('header-menu--open')) {
			$('.main').addClass('scroll-lock');
			$('body').getNiceScroll().hide();
		} else {
			$('.main').removeClass('scroll-lock');
			$('body').getNiceScroll().show();
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