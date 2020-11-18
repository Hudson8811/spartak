$(document).ready(function () {
	$('.select').niceSelect();

	$('.nice-select').each(function () {
		$(this).find('.current').before('<span class="current-ph">' + $(this).prev().data('placeholder') + '</span>');
		$(this).find('.current').text($(this).prev().data('option'));
	});

	/*$('.nice-select .list').niceScroll({
		autohidemode: false,
		horizrailenabled:false
	});*/

	// Table
	var table = $('.table__inner');
	table.niceScroll({
		autohidemode: false,
		horizrailenabled:false,
		cursorcolor: "#E5173E",
		cursorborder: "1px solid #E5173E",
		cursorborderradius: "8px",
		background: "rgba(229, 23, 62, 0.08)",
		//railpadding: { top: 48, right: 0, left: 0, bottom: 0 }
	});

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
});