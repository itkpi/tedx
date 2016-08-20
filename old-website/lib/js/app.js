$(document).ready(function() {

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
        itemsDesktopSmall : [900,3],
        itemsTablet: [600,3],
        itemsMobile : [600,3],
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

