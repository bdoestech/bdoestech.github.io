$('.content').hide();
$(".collapsible").click(function () {

    $header = $(this);
    $content = $header.next();
    $content.slideToggle(500, function () {});

});

$(".cv-head").click(function () {

    $header = $(this);
    $content = $header.next();
    $content.slideToggle(300, function () {});

});

$('.main').hide();
$(window).on('load', function(){

    $('.main').slideToggle(800, function () {});

});