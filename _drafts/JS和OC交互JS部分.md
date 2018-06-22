JS 和 OC交互 JS部分

```
var imgsps;
$(function () {
    $(document.body).append($("<div>").addClass("imgSwiper").addClass("swiper-container").append($("<div>").addClass("swiper-wrapper")));
    $(document.body).append($("<div>").addClass("closeSwiper").html("<img width='' src='/images/close.png'>"));
    var images = [];
    var app = navigator.userAgent.toLowerCase();
    $('.content_mess img').each(function (index, element) {
        images.push($(element).attr("src"))
        $(element).attr("ids", index).click(function (e) {
            if (/iphone|ipad|ipod/.test(app)) {
                console.log('slide', images, $(this).attr('ids'))
                businessJudgment('slide', images, $(this).attr('ids'));
            } else if (/android/.test(app)) {
                window.JSInterface.businessJudgment('slide', images, $(this).attr('ids'));
            }
        });
    });
});

```



