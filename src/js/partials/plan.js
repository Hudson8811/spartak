$( function() {
    if ($( ".plan svg" ).length > 0) {
        var dragSvg = $( ".plan svg" )
        dragSvg.draggable();
        dragSvg.draggable( "disable" );

        var zoomLevel = 0,
            zoomScale = 4,
            maxScale = 5;

        var price = {'1': 8000,'2':11000,'3':1000}

        var sectionCoord = {'c214':[-1025,-2802], 'c1':[0,0]};

        $('.js-plusZoom').on('click',function (){
            event.preventDefault();
            if (zoomLevel < maxScale){
                zoomLevel++;
                var scale = zoomLevel*zoomScale;
                dragSvg.css('transform','scale('+scale+')');
                $('.js-minusZoom').prop('disabled',false);
                dragSvg.draggable( "enable" );
                dragSvg.css('top',parseInt(dragSvg.css('top'))*1.5+'px');
                dragSvg.css('left',parseInt(dragSvg.css('left'))*1.5+'px');
                dragSvg.find('path.st24[data-active=true]').hide();
                dragSvg.addClass('zoomed');
                if (zoomLevel === maxScale) {
                    $('.js-plusZoom').prop('disabled',true);
                }
            }
        });

        $('.js-minusZoom').on('click',function (){
            event.preventDefault();
            if (zoomLevel > 0){
                zoomLevel--;
                var scale = zoomLevel*zoomScale;
                if (scale <=0 ) scale = 1;
                dragSvg.css('transform','scale('+scale+')');
                $('.js-plusZoom').prop('disabled',false);
                dragSvg.css('top',parseInt(dragSvg.css('top'))/1.5+'px');
                dragSvg.css('left',parseInt(dragSvg.css('left'))/1.5+'px');
                if (zoomLevel === 0) {
                    $('.js-minusZoom').prop('disabled',true);
                    dragSvg.css({'left':'0','top':'0'})
                    dragSvg.draggable( "disable" );
                    dragSvg.find('path.st24[data-active=true]').show();
                }
            }
        });

        $('.js-fullSize').on('click',function (){
            event.preventDefault();
            $('.plan-block').toggleClass('fullmode');
        });

        $('.plan svg path.st24[data-active=true]').on('click',function (){
            zoomLevel = 2;
            var scale = zoomLevel*zoomScale;
            dragSvg.css('transform','scale('+scale+')');
            $('.js-minusZoom').prop('disabled',false);
            dragSvg.draggable( "enable" );

            dragSvg.find('path.st24[data-active=true]').hide();
            dragSvg.addClass('zoomed');

            var sector = $(this).data('sector');
            dragSvg.css('left',sectionCoord[sector][0] +'px');
            dragSvg.css('top',sectionCoord[sector][1] +'px');
        });

        var selectedPlaces = [];

        $('.plan svg circle.st0[data-active=true]').on('click',function (){

            var nomer = $(this).data('nomer');
            if ($(this).hasClass('selected')){
                $(this).removeClass('selected');
                var position = $.inArray(nomer, selectedPlaces);
                if ( ~position ) selectedPlaces.splice(position, 1);
            } else {
                $(this).addClass('selected');
                selectedPlaces.push(nomer);
            }
            checkPlaces(selectedPlaces,price);
        });


        $('.js-clear-all').on('click',function (){
            event.preventDefault();
            $('.plan svg circle.st0[data-active=true]').removeClass('selected');
            selectedPlaces = [];
            checkPlaces(selectedPlaces,price);
        });
    }
} );


function checkPlaces(places,price) {
    var totalPrice = 0,
        totalPlaces = 0,
        totalSectors = [];
    console.log(price);
    places.forEach(element => {
        var place = $( ".plan svg" ).find('[data-nomer="'+element+'"]');
        var type = place.data('type');
        var sector = place.data('sector');

        var prices = parseInt(price[type]);

        totalPrice += prices;
        totalPlaces++;
        totalSectors.push(sector);
    });

    totalSectors = unique(totalSectors);

    if (totalSectors.length > 1) {
        $('.plan-info__text--sector').html('сектор: неск.');
    } else if (totalSectors.length === 0){
        $('.plan-info__text--sector').html('сектор: ');
    } else {
        $('.plan-info__text--sector').html('сектор: '+totalSectors[0]);
    }

    $('.plan-info__text--count').html('билетов: '+totalPlaces+' шт');
    $('.plan-info__text--summ').html('на сумму: '+totalPrice+' RUB');
    if (totalPlaces > 0){
        $('.plan-info').addClass('active');
    } else {
        $('.plan-info').removeClass('active');
    }
}

function unique(arr) {
    let result = [];
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }
    return result;
}

function anchorScroll(e) {
	e.click(function () {
		link = $(this).attr('id');
		to = $('.purchase-sector.' + link).offset().top;
		$('body, html').animate({
			scrollTop: to
		}, 800);
	});
}

$(window).on('load', function() {
    $('.plan-preloader').remove();
    
    $('.plan svg .place').click(function () {
        anchorScroll($(this));
		});
});
