$(document).ready(function () {
	$("input[name='phone']").mask("+7-000-000-00-00", {
		placeholder: "+7- _ _ _ - _ _ _ - _ _ - _ _"
	});

	$('.select').niceSelect();

	$('.nice-select').each(function () {
		$(this).find('.current').before('<span class="current-ph">' + $(this).prev().data('placeholder') + '</span>');
		$(this).find('.current').text($(this).prev().data('option'));
	});

	$('.nice-select .list').hide();

	$('.nice-select').click(function () {
		if (!$(this).hasClass('open')) {
			$(this).find('.list').show();
		} else {
			$(this).find('.list').hide();
		}
	});

	var scrollOpt = {
		autohidemode: false,
		horizrailenabled:false,
		cursorcolor: "#E5173E",
		cursorborder: "1px solid #E5173E",
		cursorborderradius: "8px",
		background: "rgba(229, 23, 62, 0.08)"
	};

	$('.nice-select .list').niceScroll(scrollOpt);

	// Table
	var table = $('.table__inner');
	table.niceScroll(scrollOpt);

	if (table.find('table').height() > table.height()) {
		$('.table').append('<div class="limiter"></div>');
	}

	table.scroll(function () {
		if ($(this).prop("scrollHeight") - $(this).scrollTop() <= table.height() + 30) {
			$('.table').find('.limiter').fadeOut(400);
		} else {
			$('.table').find('.limiter').fadeIn(400);
		}
	});

	// Table adaptive
	$.each($('tbody tr'), function () {
		var title = $(this).parent('tbody').siblings('thead').find('th');
		$.each($(this).find('td'), function (index) {
			$(this).attr('aria-label', title.eq(index).text());
		});
	});

	// Date-picker
	$('.input-date input').each(function () {
		let options = {
			dateFormat: "dd/mm/yyyy",
			language: "en",
			toggleSelected: false,
			autoClose: true,
			todayButton: true,
			keyboardNav: false
		};
		if ($(this).attr('data-start-date')) {
			options.startDate = new Date($(this).attr('data-start-date'));
			$(this).removeAttr('data-start-date');
		}
		$(this).datepicker(options);
		$(this).on('keyup paste', function () {
			var val = $(this).val(),
					dateParts = val.split('/'),
					dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]),
					d = new Date(dateObject.toString());
			if (isValidDate(d)) {
				$(this).datepicker().data('datepicker').selectDate(d);
				$(this).datepicker().data('datepicker').date = d;
			}
		});
	});

	// Numeric input
	$('.input-number .input-number__btn--more').click(function(){
		var inp=$(this).siblings('input');
		inp.val(parseInt(inp.val())+1<1000?parseInt(inp.val())+1:999);
	});

	$('.input-number .input-number__btn--less').click(function(){
		var inp=$(this).siblings('input');
		inp.val(parseInt(inp.val())-1>0?parseInt(inp.val())-1:0);
	});

	// Popup options
	$('[href ^= "#popup-"]').fancybox({
		touch: false,
		scrolling: 'no',
		beforeShow: function(){
			$("body").css({'overflow-y':'hidden'});
		},
		afterClose: function(){
			$("body").css({'overflow-y':'visible'});
		},
		btnTpl : {
			smallBtn : '<div data-fancybox-close class="popup-close"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
			'<path opacity="0.8" d="M16 1L1 16" stroke="#232121" stroke-width="2"/>\n' +
			'<path opacity="0.8" d="M1 1L16 16" stroke="#232121" stroke-width="2"/>\n' +
			'</svg></div>'
		}
	});

	// Stadium tabs
	$('.article--stadium .article__tab-item').click(function () {
		$('.article__tab-item').removeClass('article__tab-item--active');
		$(this).addClass('article__tab-item--active');

		$('.article__content-item').hide().eq($(this).index()).show();
	});

	$('.article--stadium .article__tab-select .option').click(function () {
		$('.article__content-item').hide().eq($(this).index()).show();
	});

	// Set temp picture for news
	$('.js-inactive-article img').attr('src', '../img/zagl.jpg');
	$('.js-inactive-article').addClass('article__bg--inactive');
});