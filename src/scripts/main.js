window.HNMScript = (function () {
        var _this = {};

        _this.init = function () {
            _this.fixIE();
            _this.initWOW();
            _this.initEvent();
            _this.initUI();
            _this.initAlbum();
            _this.initNavigation();
            _this.initMapVN();
        };
        _this.initMapVN = () => {
            $.ajax({
                url: 'https://gw.vnexpress.net/cr/?name=tracker_coronavirus',
                type: 'GET',
            }).done(function (result) {
                if (result.code === 200 && result.data && result.data.data[0] && result.data.data[0].tracker_by_province) {
                    const dataProvince = result.data.data[0].tracker_by_province;
                    const province_mapping = [
                        {
                            "name": "Đà Nẵng",
                            "position": {"left": "40.2%", "top": "48.5%"}
                        }, {
                            "name": "Hà Nội",
                            "position": {"left": "26%", "top": "17.3%"}
                        }, {
                            "name": "TP Hồ Chí Minh",
                            "position": {"left": "31%", "top": "83%"}
                        }, {
                            "name": "Quảng Nam",
                            "position": {"left": "40%", "top": "53%"}
                        }, {
                            "name": "Bà Rịa - Vũng Tàu",
                            "position": {"left": "35%", "top": "84.5%"}
                        }, {
                            "name": "Thái Bình",
                            "position": {"left": "30%", "top": "20%"}
                        }, {
                            "name": "Bạc Liêu",
                            "position": {"left": "23.5%", "top": "92.5%"}
                        }, {
                            "name": "Ninh Bình",
                            "position": {"left": "26.7%", "top": "21.5%"}
                        }, {
                            "name": "Vĩnh Phúc",
                            "position": {"left": "25%", "top": "14.5%"}
                        }, {
                            "name": "Thanh Hóa",
                            "position": {"left": "24%", "top": "24%"}
                        }, {
                            "name": "Quảng Ninh",
                            "position": {"left": "35%", "top": "15.5%"}
                        }, {
                            "name": "Bình Thuận",
                            "position": {"left": "39%", "top": "82.3%"}
                        }, {
                            "name": "Nam Định",
                            "position": {"left": "29.5%", "top": "22%"}
                        }, {
                            "name": "Đồng Tháp",
                            "position": {"left": "25%", "top": "85%"}
                        }, {
                            "name": "Hưng Yên",
                            "position": {"left": "28%", "top": "18%"}
                        }, {
                            "name": "Hải Dương",
                            "position": {"left": "30%", "top": "17.5%"}
                        }, {
                            "name": "Hà Tĩnh",
                            "position": {"left": "25%", "top": "34%"}
                        }, {
                            "name": "Hà Nam",
                            "position": {"left": "27.5%", "top": "19.6%"}
                        }, {
                            "name": "Tây Ninh",
                            "position": {"left": "28%", "top": "79%"}
                        }, {
                            "name": "Bắc Giang",
                            "position": {"left": "32%", "top": "14.5%"}
                        }, {
                            "name": "Hòa Bình",
                            "position": {"left": "24%", "top": "19%"}
                        }, {
                            "name": "Trà Vinh",
                            "position": {"left": "29%", "top": "89.5%"}
                        }, {
                            "name": "Thừa Thiên   Huế",
                            "position": {"left": "37%", "top": "47.5%"}
                        }, {
                            "name": "Lào Cai",
                            "position": {"left": "17%", "top": "7%"}
                        }, {
                            "name": "Ninh Thuận",
                            "position": {"left": "46%", "top": "77%"}
                        }, {
                            "name": "Cần Thơ",
                            "position": {"left": "24%", "top": "87.5%"}
                        }, {
                            "name": "Quảng Ngãi",
                            "position": {"left": "44%", "top": "56%"}
                        }, {
                            "name": "Khánh Hòa",
                            "position": {"left": "46%", "top": "73%"}
                        }, {
                            "name": "Bắc Ninh",
                            "position": {"left": "28%", "top": "16%"}
                        }, {
                            "name": "Bến Tre",
                            "position": {"left": "30%", "top": "87.5%"}
                        }, {
                            "name": "Lai Châu",
                            "position": {"left": "9%", "top": "8%"}
                        }, {
                            "name": "Đồng Nai",
                            "position": {"left": "34.5%", "top": "81%"}
                        }, {
                            "name": "Hà Giang",
                            "position": {"left": "22%", "top": "4%"}
                        }, {
                            "name": "Thái Nguyên",
                            "position": {"left": "26.5%", "top": "13%"}
                        }, {
                            "name": "Cà Mau",
                            "position": {"left": "21%", "top": "95%"}
                        }, {
                            "name": "Đắk Lắk",
                            "position": {"left": "42%", "top": "71%"}
                        }, {
                            "name": "Kiên Giang",
                            "position": {"left": "21.5%", "top": "89.5%"}
                        }
                    ];
                    let html = [];
                    dataProvince.forEach(function (item) {
                        const position = province_mapping.find(x => x.name === item.name).position;
                        let htmlOriginal = '<div class="icon-scale" style="left: ' + position.left + '; top: ' + position.top + '" title="<span>' + item.name + "</span> <br/>Ca nhiễm: <b>" + item.cases + "</b> <br/>Ca chết: <b>" + item.deaths + "</b> <br/>Ca hồi phục: <b>" + item.recovered + '</b>"><span class="hwgwbwwm-pin active"></span> </div>';
                        html.push(htmlOriginal)
                    });

                    $('.hnmwl-map').append(html.join(" "));

                    tippy('.icon-scale', {
                        duration: [0, 200],
                        placement: 'auto',
                        arrow: true,
                        offset: '0,20',
                        animateFill: true,
                        trigger: 'mouseenter focus',
                    });

                }
            });
        };

        _this.initUI = () => {
            if (_this.isMobile()) {
                document.documentElement.className = document.documentElement.className + " mobile";
            }
            const watched = [];
            d3.behavior.watch = function () {
                const event = d3.dispatch("statechange", "scroll");

                function watch(selection) {
                    selection.each(function (i) {
                        watched.push({
                            element: this,
                            state: 0,
                            index: i,
                            event: event
                        });
                    });
                }

                return d3.rebind(watch, event, "on");
            };

            if (_this.isMobile()) {
                d3.select(window).on("resize.watch", watch_scrolledStatic).on("DOMContentLoaded.watch", watch_scrolledStatic);
            } else {
                d3.select(window)
                    .on("resize.watch", watch_scrolled)
                    .on("scroll.watch", watch_scrolled)
                    .on("DOMContentLoaded.watch", watch_scrolled);
            }

            function watch_scrolled() {
                watched.forEach(function (watch) {
                    const rect = watch.element.getBoundingClientRect();
                    if (rect.top + rect.height < 0 || rect.bottom - rect.height - innerHeight > 0) {
                        watch_state(watch, 0);
                    } else {
                        const t = rect.top / (innerHeight - rect.height);
                        watch_state(watch, t < 0 || t > 1 ? 1 : 2);
                        watch_dispatch(watch, {type: "scroll", offset: t, rect: rect});
                    }
                });
            }

            function watch_scrolledStatic() {
                console.log('watched', watched);
                watched.forEach(function (watch) {
                    watch_state(watch, 1);
                    watch_dispatch(watch, {type: "scroll", offset: .5, rect: {top: 0}}); // XXX rect
                });
            }

            function watch_state(watch, state1) {
                var state0 = watch.state;
                if (state0 !== state1) watch_dispatch(watch, {
                    type: "statechange",
                    state: watch.state = state1,
                    previousState: state0
                });
            }

            function watch_dispatch(watch, event) {
                const element = watch.element,
                    sourceEvent = event.sourceEvent = d3.event;
                try {
                    d3.event = event;
                    watch.event[event.type].call(element, element.__data__, watch.index);
                } finally {
                    d3.event = sourceEvent;
                }
            }

            _this.initWeb();
            _this.initMobile();
        };

        _this.initEvent = () => {


            $(".magz-img-zoom").fancybox({
                padding: 0,
                locked: false,
                hideScrollbar: false,
                hash: false,
                buttons: [
                    'close'
                ],
                beforeShow: function () {
                    $(".fancybox-overlay").addClass("fancybox-opening");
                },
                onUpdate: function () {
                    $(window).scroll(function () {
                        try {
                            $.fancybox.close().transitions();
                        } catch (e) {
                        }
                    });
                    $(".fancybox-image").on('click', function () {
                        $.fancybox.close().transitions();
                    });
                },
                beforeClose: function () {
                    $(".fancybox-overlay").addClass("fancybox-closing");
                },
                nextEffect: 'none',
                prevEffect: 'none'
            });

            new Swiper('.magzwbw-content', {
                slidesPerView: 'auto',
                slidesPerGroup: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        };

        _this.initWOW = () => {
            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: true, // trigger animations on mobile devices (default is true)
            });
            wow.init();
        };

        _this.utils = {
            isMobile: function (agent) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent || window.navigator.userAgent);
            }
        };

        _this.fixIE = function () {
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style')
                msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'))
                document.querySelector('head').appendChild(msViewportStyle)
            }
        };

        _this.isMobile = function () {
            return /iPad|iPod|iPhone|Android/.test(navigator.userAgent) || document.location.hash === "#ipad";
        };

        _this.isPhone = function () {
            return _this.isMobile() && window.innerWidth < 768;
        };

        _this.initNavigation = function () {
            let anchor = d3.selectAll(".navigation-section").on("click", clicked),
                marker = d3.selectAll(".navigation-marker"),
                markerOffsets;
            d3.select(".navigation-headline")
                .on("click", clicked);
            d3.select(window)
                .on("resize.navigation", resized)
                .on("load.navigation", resized)
                .on("scroll.navigation", scrolled);

            resized();

            function resized() {
                markerOffsets = marker.datum(function (d, i) {
                    return this.offsetTop + 10;
                }).data();
                scrolled();
            }

            function scrolled() {
                let j = Math.max(0, Math.min(markerOffsets.length - 1, d3.bisectLeft(markerOffsets, pageYOffset + 80) - 1));
                anchor.classed("navigation-section--active", function (d, i) {
                    return i === j;
                });
            }

            function clicked(d, i) {
                d3.event.preventDefault();
                console.log('i', i)
                d3.transition().duration(750).tween("scroll", function () {
                    var offset = d3.interpolateNumber(pageYOffset, markerOffsets[i]);
                    console.log(offset);
                    return function (t) {
                        scrollTo(0, offset(t));
                    };
                });
            }
        };

        _this.initAlbum = function () {
            if (_this.isMobile()) return false;
            const wbody = $(window).width();
            const height = $(window).height();
            if (wbody < 1020) {
                if (wbody > height) {
                    $('.magza-content.w660').css('width', 980).css('marginLeft', 0);
                } else {
                    $('.magza-content').css('width', wbody - 80);
                    $('.magza-content').css('marginLeft', 0);

                }
            } else {
                $('.magza-content.w660').css('width', 980).css('marginLeft', 0);
            }

            $('.magz-album-row').each(function () {
                let $pi = $('.magz-album-row-item', $(this)), cWidth = $(this).parents('.magza-content').width();
                //Tạo 1 mảng chứa toàn bộ ratio của ảnh
                let ratios = $pi.map(function () {
                    return $(this).find('img').attr('w') / $(this).find('img').attr('h');
                }).get();
                //Lấy tổng width
                let sumRatios = 0, sumMargins = 0,
                    minRatio = Math.min.apply(Math, ratios);
                for (var i = 0; i < $pi.length; i++) {
                    sumRatios += ratios[i] / minRatio;
                }
                $pi.each(function () {
                    sumMargins += parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right'));
                });
                //Tính toán width/ height cần thiết
                let widthRemain = cWidth;
                $pi.each(function (i) {
                    let minWidth = (cWidth - sumMargins) / sumRatios;
                    let h = Math.floor(minWidth / minRatio);
                    let w = Math.floor(minWidth / minRatio) * ratios[i];
                    widthRemain = widthRemain - w;
                    $('img', $(this)).height(h).width(w);
                    $('img', $(this)).css({
                        width: w,
                        height: h
                    });
                });
            })
        };

        _this.mobileReorient = function () {
            let height = window.innerHeight - 40;
            if (height > (720 * .59) && window.innerWidth < 768) height = (720 * .59);
            // document.querySelectorAll(".magz-video-wrapper:first-child .video:first-of-type .video-container")[0]
            //     .style.height = height + "px";
            //
            // document.querySelectorAll(".magz-video-wrapper:first-child .video:first-of-type .video-caption--head")[0]
            //     .style.height = height + "px";
        };

        _this.initMobile = function () {
            if (!_this.isMobile()) return false;
            d3.select(window).on("resize", _this.mobileReorient()).on("scroll", function () {
                d3.select(".navigation").classed("navigation-solid", window.scrollY > 350)
            });
            d3.select(".headline").html(d3.select(".headline").html().replace("<br>", " <br>"))
            d3.select(".magz-video-wrapper:first-of-type").classed("mobile-loaded", true);
            d3.select(".section:nth-child(7)").classed("map-sequence", true);


        };

        _this.initWeb = function () {
            if (_this.isMobile()) return false;


            // const _audio_assets = "http://graphics8.nytimes.com/newsgraphics/2013/10/24/south-china-sea-videos/assets/" + "audio/";
            let mute = false,
                muteVolume = "volume",
                fixRatio = 16 / 9,
                fixHeight = innerWidth / fixRatio,
                fixTop = Math.round((innerHeight - fixHeight) / 2),
                fadeTop = Math.max(200, fixTop),
                fadeBottom = Math.min(innerHeight - 200, fixTop + fixHeight),
                fade = d3.interpolateRgb("#3ae", "#fff");

            let headline = d3.select(".navigation-headline");

            let sequence = d3.selectAll(".magz-video-wrapper").datum(function () {
                return {
                    first: !this.previousElementSibling,
                    audio: this.getAttribute("data-audio"),
                    length: this.querySelectorAll(".video").length
                };
            }).call(d3.behavior.watch()
                .on("scroll", sequenceScrolled)
                .on("statechange", sequenceStateChanged));

            // sequence.filter(function (d) {
            //     return d.audio;
            // }).append("audio").attr("src", function (d) {
            //     return _audio_assets + d.audio + ".mp3";
            // }).property("loop", true);

            let section = d3.selectAll(".video").datum(function () {
                const previous = this.previousElementSibling,
                    next = this.nextElementSibling;
                return {
                    video: this.getAttribute("data-video"),
                    animation: this.hasAttribute("data-animation"),
                    first: !previous || !d3.select(previous).classed("video"),
                    last: !next || !d3.select(next).classed("video")
                };
            });

            const sectionFixed = sequence.selectAll(".video").each(function (d) {
                d.sequence = this.parentNode.__data__;
            }).call(d3.behavior.watch().on("scroll", fixScrolled).on("statechange", fixStateChanged));

            const container = section.select(".video-container");

            const video = container.filter(function (d) {
                return d.video;
            });

            if (!supportsViewportUnits()) sectionFixed.append("div")
                .style("height", fixHeight + "px");

            const containerFixed = sectionFixed.select(".video-container").style("z-index", function (d) {
                return d.first || d.last ? 1 : 2;
            }).style("position", function (d) {
                return d.first || d.last ? "absolute" : "fixed";
            }).style("top", function (d) {
                return d.first || d.last ? null : fixTop + "px";
            }).style("display", function (d) {
                return d.first || d.last ? null : "none";
            });

            containerFixed.append("div").attr("class", "magz-video-wrapper-indicator").style("margin-top", function (d) {
                return -d.sequence.length * 1.4 / 2 + "em";
            }).text(function (d, i) {
                return d3.range(d.sequence.length).map(function (j) {
                    return i === j ? "●" : "○";
                }).join("\n");
            });

            const muteButton = d3.select(".navigation-volume").on("click", muted);

            d3.select(window).on("load.video", loaded).on("resize.video", resized);

            resized();

            function loaded() {
                video.attr("preload", function (d) {
                    return d.first ? "auto" : "none";
                });
            }

            function muted() {
                mute = !mute;
                muteVolume = mute ? "_volume" : "volume";
                muteButton.classed("navigation-volume--muted", mute);
                d3.event.preventDefault();
                d3.selectAll("audio,video").interrupt().property("volume", mute ? function () {
                    this._volume = this.volume;
                    return 0;
                } : function () {
                    return this._volume;
                });
            }

            function resized() {
                fixHeight = innerWidth / fixRatio;
                fixTop = Math.round((innerHeight - fixHeight) / 2);
                fadeTop = Math.max(200, fixTop);
                fadeBottom = Math.min(innerHeight - 200, fixTop + fixHeight);
                // d3.select(".magz-video-wrapper:first-child").style("margin-top", fixTop + "px");
                containerFixed.style("height", fixHeight + "px").filter(function (d) {
                    const rect = this.parentNode.getBoundingClientRect();
                    return d.first ? rect.top < fixTop : d.last ? rect.bottom >= fixTop + fixHeight : true;
                }).style("top", fixTop + "px");
            }

            function fixScrolled(d) {
                if (d.first || d.last) {
                    const fixed = (d.first && d3.event.rect.top < fixTop)
                        || (d.last && d3.event.rect.bottom >= fixTop + fixHeight);
                    d3.select(this.querySelector(".video-container"))
                        .style("z-index", fixed ? 2 : 1)
                        .style("position", fixed ? "fixed" : "absolute")
                        .style("top", fixed ? fixTop + "px" : null);
                }

                let section = d3.select(this),
                    container = section.select(".video-container"),
                    videoNode = this.querySelector(".video-container video"),
                    volume = 1;

                let opacityTop = d3.event.rect.top - fixHeight / 4,
                    opacity = opacityTop > fixTop + fixHeight * 4 / 5 ? 0 // previous video fully opaque
                        : !d.last && opacityTop < fixTop - fixHeight ? 0 // next video fully covers this video
                            : opacityTop < fixTop ? 1 // this video is fully opaque, but may be covered by next video
                                : Math.max(0, Math.min(1, 1 - (opacityTop - fixTop) / (fixHeight / 5))); // this video is partially opaque

                if (d.first) {
                    if (videoNode) {
                        volume = d3.event.rect.top < fixTop + fadeTop ? Math.max(0, Math.min(1, 1 - (d3.event.rect.top - fixTop) / fadeTop)) : 0;
                        let play = d3.event.rect.top <= fixTop + fadeTop;
                        if (videoNode.paused) {
                            if (play && (!d.animation || (videoNode.currentTime < videoNode.duration && volume > .8))) {
                                videoNode.muted = false;
                                videoNode.play();
                            }
                        } else if (!play) {
                            videoNode.pause();
                        }
                    }
                    container.style("opacity", opacityTop >= fixTop - fixHeight ? 1 : 0);
                } else {
                    container.style("opacity", opacity);
                    if (videoNode) {
                        if (videoNode.paused) {
                            if (opacity) {
                                if (!d.animation || (videoNode.currentTime < videoNode.duration && opacity > .8)) {
                                    videoNode.muted = false;
                                    videoNode.play();
                                }
                            } else if (videoNode.currentTime) {
                                videoNode.currentTime = 0;
                            }
                        } else if (!opacity) {
                            videoNode.pause();
                            if (videoNode.currentTime) videoNode.currentTime = 0;
                        }
                    }
                }

                if (d.last) {
                    if (videoNode) {
                        volume = d3.event.rect.bottom < fadeBottom ? Math.max(0, Math.min(1, 1 - (fadeBottom - d3.event.rect.bottom) / fadeTop)) : 1;
                        let play = d3.event.rect.bottom >= fadeBottom - fadeTop;
                        if (videoNode.paused) {
                            if (play && (!d.animation || (videoNode.currentTime < videoNode.duration && volume > .8))) {
                                videoNode.muted = false;
                                videoNode.play();
                            }
                        } else if (!play) {
                            videoNode.pause();
                        }
                    }
                }

                section.select(".video-caption").style("opacity", opacityTop > fixTop ? (d.first ? 1 : Math.max(0, 1 - (opacityTop - fixTop) / (fixHeight / 5))) // fade in from bottom
                    : opacityTop > fixTop - fixHeight * 4 / 5 ? 1 // this video is fully opaque and not covered
                        : d.last ? 1 : Math.max(0, (opacityTop - fixTop + fixHeight * 4 / 5) / (fixHeight / 5) + 1)); // fade out to top

                if (videoNode) {
                    videoNode[muteVolume] = volume = volume !== 1 ? volume // special-case volume for first and last fade
                        : opacityTop < fixTop - fixHeight ? 0 // video is fully covered by next video
                            : opacityTop < fixTop - fixHeight / 2 ? Math.max(0, Math.min(1, (opacityTop - fixTop + fixHeight) / (fixHeight / 2)))
                                : opacity;

                    if (d.first && d.sequence.first) headline.style("opacity", 1 - volume);
                }
            }

            function fixStateChanged(d) {
                d3.select(this.querySelector(".video-container"))
                    .style("display", d3.event.state ? null : "none")
                    .select("video")
                    .each(function () {
                        if (!d3.event.state) {
                            if (!this.paused) this.pause();
                            if (this.currentTime) this.currentTime = 0;
                        }
                    });

                if (d.first && d.sequence.first && !d3.event.state) headline.style("opacity", null);
            }

            function sequenceScrolled() {
                const opacity = Math.max(0, Math.min(1, d3.event.rect.bottom < fadeBottom ? (fadeBottom - d3.event.rect.bottom) / fadeTop
                    : d3.event.rect.top < fixTop + fadeTop ? (d3.event.rect.top - fixTop) / fadeTop
                        : 1));
                d3.select("body").style("background", fade(opacity));
                d3.select(this).select("audio").property(muteVolume, 1 - opacity);
            }

            function sequenceStateChanged() {
                const sequence = d3.select(this),
                    audio = sequence.select("audio");
                if (d3.event.state) {
                    sequence.selectAll("video").each(function () {
                        this.preload = "auto";
                    });
                    audio.each(function () {
                        this.play();
                    });
                } else {
                    d3.select("body").style("background", null);
                    audio.each(function () {
                        this.pause();
                    });
                }
            }



            function supportsViewportUnits() {
                var element = d3.select("body").append("div").style("width", "50vw"),
                    expected = innerWidth / 2,
                    actual = parseFloat(element.style("width"));
                element.remove();
                return Math.abs(expected - actual) <= 1;
            }

        };

        return _this;
    }
)();


$('document').ready(function () {
    window.HNMScript.init();
});
