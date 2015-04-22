$(document).ready(function() {
    /************************************************************************************
     Modall
     *************************************************************************************/
    var blocked = false;

    //закриття модального вікна при кліку на modal_bg
    $('.modal_bg').click(function (event) {
        if (!blocked) {
            e = event || window.event;
            if (e.target == this) {
                $(this)
                    .find('.modal_window')
                    .removeClass('visible')
                    .css('position', 'absolute')
                    .parent()
                    .removeClass('visible');
                $('body').css({
                    'overflow': 'auto',
                    'margin-right': 0
                });
            }
        }
    });

    //закриття модального вікна кл. "ESC"
    $('body').keydown(function (e) {
        if ((e.which == 27) || (e.keyCode == 27)) {
            $('.modal_window')
                .removeClass('visible')
                .css('position', 'absolute');
            $('.modal_bg').removeClass('visible');
        }
    });

    $('.modal_window .ok').click(function () {
        var _this = $(this);
        blocked = false;
        closeModalOk(_this);
    });

    $('.modal_window .js-mod_close').click(function () {
        var _this = $(this);
        closeModal(_this);
    });

    //центруємо вікна при завантаженні сторінки
    //$('.modal_window').each(function (i, elem) {
    //	fn_modal_center(elem);
    //});

    //виклик модального вікна
    $('.js-mod').click(function (e) {
        e.preventDefault();

        var _this = $(this);
        fn_openModal(_this);
    });
    /************************************************************************************
     *************************************************************************************/
    $('.js-anchor').click(function (event) {
        event.preventDefault();

        var id = $(this).attr('href');
        var elem = $(id).offset().top;

        $('.js-anchor').removeClass('is-active');
        $(this).addClass('is-active');

        $('html,body').animate({scrollTop: elem - 74}, 600);

        return false;
    });



    var owl = $(".js-slider");

    owl.owlCarousel({
        autoPlay: 4000,
        slideSpeed: 300,
        items: 4,
        itemsDesktop : [1210,3],
        autoHeight: true,
        transitionStyle: "fade"
    });


    $(".js-next").click(function () {
        owl.trigger('owl.next');
    });

    $(".js-prev").click(function () {
        owl.trigger('owl.prev');
    });


    //
    //$('.js-sendOrder').submit(function(e){
    //    e.preventDefault();
    //    var _this = $(this);
    //
    //    $.ajax({
    //        type: 'POST',
    //        url: 'sendmessage.php',
    //        data: $(this).serialize(),
    //        success: function(data) {
    //            if(data == "true") {
    //                _this.find('input').val('');
    //                _this.find('textarea').val('');
    //                _this.find('input[type=submit]').val('Заявка отправлена​​!');
    //                //fn_btn_val(_this);
    //            }
    //        }
    //    });
    //
    //});

    var tedxArticle = $('.js-tedxArticle');
    var lastArticle = 0;

    $('.js-tedx').click(function(){
        var i = $(this).index();

        if ( !$(this).hasClass('is-active') ) {
            $('.js-tedx').removeClass('is-active');
            $(this).addClass('is-active');

            tedxArticle.eq(lastArticle).slideUp(300, function() {
                tedxArticle.eq(i).slideDown(300);
                lastArticle = i;
            });
        }
    });


    //$(document.body).on('appear', '.benefits__list__item', function (e, $affected) {
    //    $(this).addClass("is-visible");
    //});
    //$('.benefits__list__item').appear({force_process: true});

    var programList = $('.js-programList');

    $('.js-prevProgram').click(function(){
        programList.animate({scrollTop: '-=180px'}, 300);
    });

    $('.js-nextProgram').click(function(){
        programList.animate({scrollTop: '+=180px'}, 300);
    });


    var   speakerInfo = $('.js-speakerInfo')
        , speakerName = $('.js-speakerName')
        , speakerText = $('.js-speakerText')
        , speakerVideo = $('.js-speakerVideo')
        , speakerSocFb = $('.js-speakerSocFb')
        , speakerSocVk = $('.js-speakerSocVk')
        , speakerSocTw = $('.js-speakerSocTw')
        ;

    $('.js-speaker').first().click();

    $('.js-speaker').click(function () {
        var data = $(this).find('img');

        var   name  = data.data('name')
            , vk    = data.data('vk')
            , fb    = data.data('fb')
            , tw    = data.data('tw')
            , text  = data.data('text')
            , video = data.data('video')
            ;


        speakerInfo.addClass('is-hide');

        setTimeout(function() {
            speakerName.text( name );
            speakerText.html( text );

            if (video) {
                speakerVideo.attr('href', video);
                speakerVideo.removeClass('is-none');
            }
            else {
                speakerVideo.addClass('is-none');
            }

            if (vk) {
                speakerVideo.attr('href', vk);
                speakerVideo.removeClass('is-none');
            }
            else {
                speakerVideo.addClass('is-none');
            }

            if (fb) {
                speakerSocFb.attr('href', fb);
                speakerSocFb.removeClass('is-none');
            }
            else {
                speakerSocFb.addClass('is-none');
            }

            if (tw) {
                speakerSocTw.attr('href', tw);
                speakerSocTw.removeClass('is-none');
            }
            else {
                speakerSocTw.addClass('is-none');
            }

            speakerInfo.removeClass('is-hide');
        },500);

    })

});


//вирівнювання модального вікна по вертикалі
function fn_modal_center(elem) {
    var win_h = $('.modal_bg').height();
    var elem_h = $(elem).height();

    if (win_h < elem_h) {
        $(elem).css('position','relative');
    }
}

function fn_openModal(elem) {
    var class_list =$(elem).attr('class').split(/\s+/);

    for (var i = 0; i < class_list.length; i++) {
        var reg_search = class_list[i].search(/js-mod_\w+/),
            reg_match = class_list[i].match(/js-mod_\w+/);
        if ( !reg_search ) {
            var name_window = String(reg_match).split('_');
            var el = 'mod_' + name_window[1];

            fn_openModalId(el);
        }
    }
}

function fn_openModalId(name_modalId) {
    var el = '#' + name_modalId;

    fn_modal_center(el);
    //$('body').css({
    //    'overflow': 'hidden',
    //    'margin-right' : '17px'
    //});

    $(el).parent().addClass('visible');
    $(el).addClass('visible');

    if ( $(el).hasClass('is-blocked') ) {
        blocked = true;
    }
}

function fn_closeModalId(name_modalId) {
    var el = '#' + name_modalId;

    $(el)
        .removeClass('visible')
        .css('position','absolute');

    $(el).parent().removeClass('visible');

    $('body').css({
        'overflow': 'auto',
        'margin-right': 0
    });
}

function closeModal(_this) {
    _this.parent().removeClass('visible');
    _this.parent().parent().removeClass('visible');
    _this.parent().css('position','absolute');

    $('body').css({
        'overflow': 'auto',
        'margin-right': 0
    });

}

function closeModalOk(_this) {
    _this.parent().parent().removeClass('visible');
    _this.parent().parent().parent().removeClass('visible');
    _this.parent().parent().css('position', 'absolute');
    $('body').css({
        'overflow': 'auto',
        'margin-right': 0
    });
}
