/*
	Big Picture by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    // skel.breakpoints({
    // 	wide: '(max-width: 1920px)',
    // 	normal: '(max-width: 1680px)',
    // 	narrow: '(max-width: 1280px)',
    // 	narrower: '(max-width: 1000px)',
    // 	mobile: '(max-width: 736px)',
    // 	mobilenarrow: '(max-width: 480px)',
    // });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $all = $body.add($header),
            $animation_elements = $('.animation-element');
        $nav = $('#nav');

        $window.on('beforeunload', function() {
            $window.scrollTop(0);
        });

        var $robynGif = $('#robyn-gif');

        // Wait for window load
        $window.on('load', function() {
            // Animate loader off screen
            $(".preloader").fadeOut("fast");
            $('#header').css('display', 'block');
            if ($('#intro-line-2').html().trim().slice(-1) != ">") {
                typeWriter($('#intro-line-1'), 30);
                setTimeout(function() { typeWriter($('#intro-line-2'), 50) }, 740)
            }
        });

        // smooth scroll to anchor
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    if ($nav.hasClass('open')) {
                        $nav.removeClass('open');
                    }
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

        // open and close mobile nav menu
        $('#menu-icon').on('click', function() {
            if ($nav.hasClass('open')) {
                $nav.removeClass('open');
            } else {
                $nav.addClass('open');
            }
            return false;
        });



        // for block animation
        function check_if_in_view() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);

            $.each($animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                    $element.addClass('in-view');
                } else {
                    $element.removeClass('in-view');
                }
            });
        }


        $window.on('scroll resize', check_if_in_view);
        $window.trigger('scroll');

        //


        var typeWriter = function($el, speed, callback) {
            var txt = $el.html();
            var txtLength = txt.length;

            (function theLoop(i) {
                setTimeout(function() {

                    // if this is the first character, add the span tags
                    if (txt.trim().slice(-1) == ">") {
                        return;
                    }

                    if (txt.split('</span>').length == 1) {
                        var txtArray = txt.split('');
                        txtArray[0] = '<span style="color:#0f0f0f;">' + txtArray[0] + '</span>';
                        txt = txtArray.join('');
                        $el.html(txt);
                    }
                    // else move </span> one character ahead
                    else {
                        var txtHalves = txt.split('</span>');
                        var notAppearedYetArray = txtHalves[1].split('');

                        // if at <br>
                        if (notAppearedYetArray[0] == '<') {
                            i = i + 4;
                            for (x = 0; x < 4; x++) {
                                notAppearedYetArray.shift();
                            }
                            notAppearedYetArray[0] = '<br>' + notAppearedYetArray[0] + '</span>';
                        } else {
                            notAppearedYetArray[0] = notAppearedYetArray[0] + '</span>';
                        }
                        var notAppearedYet = notAppearedYetArray.join('');
                        txt = txtHalves[0] + notAppearedYet;
                        $el.html(txt);
                    }

                    if (i == txtLength - 1) {
                        if (callback) {
                            callback();
                        }
                    }
                    if (++i < txtLength) {
                        theLoop(i); // Call the loop again, and pass it the current value of i
                    }
                }, speed);
            })(0);

        };

        // if ($('#intro-line-1').html().trim().slice(-1) != ">") {
        //     typeWriter($('#intro-line-1'));
        // }


        var iScrollPos = 0;
        var lastOffset = $window.scrollTop();
        var lastDate = new Date().getTime();

        $window.on('scroll', function(e) {

            // find scroll speed and direction
            var delayInMs = e.timeStamp - lastDate;
            var offset = $(this).scrollTop() - lastOffset;
            var speedInpxPerMs = offset / delayInMs;

            lastDate = e.timeStamp;
            lastOffset = $(this).scrollTop();
            var roundedSpeed = Math.round(speedInpxPerMs * 10)
            var gifSpeed = 0;
            if (roundedSpeed < 10) {
                gifSpeed = 0.4;
            } else {
                gifSpeed = 0.6;
            }

            //var gifSpeed = 0.5;

            var currentFrame = getComputedStyle($robynGif[0]).getPropertyValue("background-position");
            // make robynGif walk forward or backward
            if (speedInpxPerMs > 0) {
                $robynGif.css('background', "url('assets/images/robyn-forward.png') left center");
                $robynGif.css('animation', 'walk ' + gifSpeed + 's steps(4) infinite');
            } else {
                $robynGif.css('background', "url('assets/images/robyn-backward.png') left center");
                $robynGif.css('animation', 'walk ' + gifSpeed + 's steps(4) infinite');
            }

            clearTimeout($.data(this, "scrollCheck"));
            $.data(this, "scrollCheck", setTimeout(function() {
                $robynGif.css('animation', '');
            }, 250));



            $("#intro").css("opacity", 1 - $(window).scrollTop() / 30);

            if ($(this).scrollTop() > 80 && $(this).scrollTop() < 500) {
                $('#about-speech-1').fadeIn("fast");
                if ($('#about-speech-1').html().trim().slice(-1) != ">") {
                    typeWriter($('#about-speech-1'), 10);
                }
            } else {
                $('#about-speech-1').fadeOut("fast");
            }

            if ($(this).scrollTop() > 600 && $(this).scrollTop() < 1000) {
                $('#about-speech-2').fadeIn("fast");
                if ($('#about-speech-2').html().trim().slice(-1) != ">") {
                    typeWriter($('#about-speech-2'), 10);
                }
            } else {
                $('#about-speech-2').fadeOut("fast");
            }

            if ($(this).scrollTop() > 1100) {
                $robynGif.css('display', 'none');
                $('#robyn-shadow').css('display', 'none');
                $('#nav-image').css('left', '0');
            } else {
                $robynGif.css('display', 'block');
                $('#robyn-shadow').css('display', 'block');
                $('#nav-image').css('left', '-80px');
            }

            if ($(this).scrollTop() > 6065) {
                $('#nav-image').css('left', '-80px');
            }

            if ($window.outerWidth() > 799) {
                if ($('#chart-vertical').hasClass('in-view')) {
                    animateVerticalChart();
                }
            } else {

                if ($('#chart-horizontal').hasClass('in-view')) {
                    animateHorizontalChart();
                }
            }

        });

        var animateVerticalChart = function() {
            $("#chart-vertical .bars li .bar").each(function(key, bar) {
                var percentage = $(this).data('percentage');

                $(this).animate({
                    'height': percentage + '%'
                }, 1500);
            });
        }

        var animateHorizontalChart = function() {
            $("#chart-horizontal .bars li").each(function(key, bar) {
                var percentage = $(this).data('percentage');

                $(this).animate({
                    'width': percentage + '%'
                }, 1500);
            });
        }

        var designSectionHeight = function() {
            var $designSection = $('#section-design');
            var pixels = ($window.width()) + 500;
            $designSection.css('height', pixels + 'px');
        };

        var designSectionHeightMobile = function() {
            var $designSection = $('#section-design');
            var pixels = ($window.width()) * 4.6;
            $designSection.css('height', pixels + 'px');
        }

        var designSectionHeightMobileMedium = function() {
            var $designSection = $('#section-design');
            var pixels = $window.width() * 4.8;
            $designSection.css('height', pixels + 'px');
        }

        var designSectionHeightMobileSmall = function() {
            var $designSection = $('#section-design');
            var pixels = $window.width() * 5;
            $designSection.css('height', pixels + 'px');
        }

        var designSectionHeightMobileSmaller = function() {
            var $designSection = $('#section-design');
            var pixels = $window.width() * 5.3;
            $designSection.css('height', pixels + 'px');
        }

        $window.on('resize', function(e) {
            if ($('#intro').width() > 2350) {
                $('#intro').css('max-width', '2350px');
                $('#intro').css('margin-left', '-1175px');
            } else if ($('#intro').width() > 680) {
                $('#intro').css('max-width', 'none');
                $('#intro').css('margin-left', '-40%');
            }

            if ($window.outerWidth() < 1000 && $window.outerWidth() > 640) {
                designSectionHeight();
            } else if ($window.outerWidth() > 1000) {
                $('#section-design').css('height', '1500px');
            } else if ($window.outerWidth() < 362) {
                designSectionHeightMobileSmaller();
            } else if ($window.outerWidth() < 414) {
                designSectionHeightMobileSmall();
            } else if ($window.outerWidth() < 515) {
                designSectionHeightMobileMedium();
            } else if ($window.outerWidth() < 530) {
                designSectionHeightMobile();
            } else if ($window.outerWidth() < 640) {
                $('#section-design').css('height', '2350px');
            }

            // skills graph
            if ($window.outerWidth() < 800) {
                $('#chart-vertical').css('display', 'none');
                $('#chart-horizontal').css('display', 'block');
                animateHorizontalChart();
            } else {
                $('#chart-horizontal').css('display', 'none');
                $('#chart-vertical').css('display', 'block');
                animateVerticalChart();
            }

        });

        if ($window.outerWidth() < 1000 && $window.outerWidth() > 640) {
            designSectionHeight();
        } else if ($window.outerWidth() < 362) {
            designSectionHeightMobileSmaller();
        } else if ($window.outerWidth() < 414) {
            designSectionHeightMobileSmall();
        } else if ($window.outerWidth() < 515) {
            designSectionHeightMobileMedium();
        } else if ($window.outerWidth() < 530) {
            designSectionHeightMobile();
        } else if ($window.outerWidth() < 640) {
            $('#section-design').css('height', '2350px');
        }

        if ($('#intro').width() > 2350) {
            $('#intro').css('max-width', '2350px');
            $('#intro').css('margin-left', '-1175px');
        }

        // skills graph
        if ($window.outerWidth() < 800) {
            $('#chart-vertical').css('display', 'none');
            $('#chart-horizontal').css('display', 'block');
        } else {
            $('#chart-vertical').css('display', 'block');
            $('#chart-horizontal').css('display', 'none');
        }

        var robynGoodbye = function() {
            $('#robyn-goodbye').css('display', 'block');
            $('#robyn-happy').css('display', 'none');
        }

        var typeWriterSocialMedia = function() {
            var i = 3;
            $('#linkedin, #github, #facebook').each(function(fadeIn) {
                $(this).delay(fadeIn * 300).css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 }, 'slow');
            });
            setTimeout(function() { robynGoodbye(); }, 1000);
        }

        var typeWriterPhoneEmail = function() {
            $('#email, #phone').each(function(fadeIn) {
                $(this).delay(fadeIn * 200).css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 }, 'fast');
            });
            setTimeout(function() {
                $('#social-media').fadeIn('fast');
                $('#robyn-happy').css('display', 'block');
                $('#robyn-pipe').css('display', 'none');
                typeWriter($('#social-media .text'), 10, typeWriterSocialMedia);
            }, 700);
        };


        $('#robyn-pipe').one('animationend webkitAnimationEnd', function() {
        		$('#robyn-pipe.in-view').css('animation', 'none')
        			.css('-webkit-animation', 'none')
        			.css('top', '240px');
            $('#contact-info').fadeIn('fast');
            typeWriter($('#contact-info .text'), 10, typeWriterPhoneEmail);
        });


        // image overlay
        if (Modernizr.touch) {
            // show the close overlay button
            $(".close-overlay").removeClass("hidden");
            // handle the adding of hover class when clicked
            $(".img").click(function(e) {
                if (!$(this).hasClass("hover")) {
                    $(this).addClass("hover");
                }
            });
            // handle the closing of the overlay
            $(".close-overlay").click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).closest(".img").hasClass("hover")) {
                    $(this).closest(".img").removeClass("hover");
                }
            });
        } else {
            // handle the mouseenter functionality
            $(".img").mouseenter(function() {
                    $(this).addClass("hover");
                })
                // handle the mouseleave functionality
                .mouseleave(function() {
                    $(this).removeClass("hover");
                });
        }


    });

})(jQuery);
