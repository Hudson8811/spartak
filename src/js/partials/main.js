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

	$(document).click(function (e) {
		var tar = $('.nice-select');
		if (!tar.is(e.target) && tar.has(e.target).length === 0 || !tar.hasClass('open')) {
			tar.find('.list').hide();
		} else {
			tar.find('.list').show();
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

	// Pagination
	if ($('.pagination__link').first().hasClass('active')) {
		$('.pagination__btn--first').hide();
		$('.pagination__btn--prev').hide();
	}

	if ($('.pagination__link').last().hasClass('active')) {
		$('.pagination__btn--next').hide();
		$('.pagination__btn--last').hide();
	}

	// Upload pdf
	$('#up-file').change(function () {
		var splittedFakePath = this.value.split('\\');

		var ext = this.value.match(/\.([^\.]+)$/)[1];

		switch (ext) {
			case 'pdf':
				$('.file__loaded').css('display', 'flex');
				$('.file__loaded a').text(splittedFakePath[splittedFakePath.length - 1]);
				break;
		}
	});

	$('.file__loaded svg').click(function () {
		$('.file__loaded a').text('').parent().hide();
	});

	// Sector tooltip
	new jBox('Tooltip', {
		attach: '.place.available, .place.selected ',
		onOpen: function() {
			var row = this.source.attr('data-row');
			var place = this.source.attr('data-place');
			var price = this.source.attr('data-price');
			this.setContent('<div class="place_info">Ряд: <span class="param">'+row+'</span><p>Место: <span class="param">'+place+'</span></p>Цена: <span class="param">'+price+' руб.</span></div>');
		},
	});
	new jBox('Tooltip', {
		attach: '.place.booked',
		content: '<div class="place_info"><p>Место занято</p></div>'
	});
});