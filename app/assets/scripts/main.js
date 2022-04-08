'use strict';

window.WeddingScript = function () {
    var _this = {};

    _this.init = function () {
        _this.fixIE();
        _this.initWOW();
        _this.initEvent();
        _this.initUI();
    };

    _this.initUI = function () {
        $(function () {
            $('#countdown').countdown({
                year: 2022, // YYYY Format
                month: 4, // 1-12
                day: 16, // 1-31
                hour: 11, // 24 hour format 0-23
                minute: 0, // 0-59
                second: 0, // 0-59,
                timezone: +7,
                onFinish: function () {
                    $('.text-done').removeClass('hidden');
                }

            });
        });
    };

    _this.initEvent = function () {

        new Swiper('.slider-content', {
            slidesPerView: 1.2,
            spaceBetween: 22,
            centeredSlides: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });

        $('.btn-share-fb').on('click', function (e) {
            e.preventDefault();
            _this.shareFB();
        })

        $('.btn-share-twitter').on('click', function (e) {
            e.preventDefault();
            _this.shareTwitter();
        })
    };

    _this.initWOW = function () {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true
        });
        wow.init();
    };

    _this.utils = {
        isMobile: function isMobile(agent) {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent || window.navigator.userAgent)
            );
        }
    };

    _this.fixIE = function () {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var msViewportStyle = document.createElement('style');
            msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
            document.querySelector('head').appendChild(msViewportStyle);
        }
    };

    _this.isMobile = function () {
        return (/iPad|iPod|iPhone|Android/.test(navigator.userAgent) || document.location.hash === "#ipad"
        );
    };

    _this.isPhone = function () {
        return _this.isMobile() && window.innerWidth < 768;
    };

    _this.shareFB = function (w = 700, h = 485) {
        const link = "https://wedding.microvn.net";
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        const newWindow = window.open("https://www.facebook.com/sharer.php?u=" + link, "Share Facebook", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=700, height=485,width=${w / systemZoom},height=${h / systemZoom},top=${top},left=${left}`)

        if (window.focus) newWindow.focus();
        return false;
    };

    _this.shareTwitter = function (w = 700, h = 485) {
        const link = "https://wedding.microvn.net";
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft
        const top = (height - h) / 2 / systemZoom + dualScreenTop
        const newWindow = window.open("https://twitter.com/intent/tweet?url=" + link, "Share Facebook", `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=700, height=485,width=${w / systemZoom},height=${h / systemZoom},top=${top},left=${left}`)

        if (window.focus) newWindow.focus();
        return false;
    };

    return _this;
}();

$('document').ready(function () {
    window.WeddingScript.init();
});