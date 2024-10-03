/* main js */
(function ($) {
    "use strict";

    /* Loader */
    $(window).on("load", function () {
        $(".bt-loader").fadeOut("slow");
    });

    /* Aos animation on scroll */
    AOS.init({
        once: true,
    });

    /* Header fixed */
    $(function () {
        var header = $(".bt-static");
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 10) {
                header.removeClass('bt-static').addClass("bt-fixed");
            } else {
                header.removeClass("bt-fixed").addClass('bt-static');
            }
        });
    });

    /* Mobile menu slider */
    $('.navbar-toggler').on("click", function () {
        $('.bt-sidebar-overlay').fadeIn();
        $('.bt-mobile-menu').addClass("bt-menu-open");
    });

    $('.bt-sidebar-overlay, .bt-close').on("click", function () {
        $('.bt-sidebar-overlay').fadeOut();
        $('.bt-mobile-menu').removeClass("bt-menu-open");
    });

    function ResponsiveMobilemsMenu() {
        var $msNav = $(".bt-menu-content, .overlay-menu"),
            $msNavSubMenu = $msNav.find(".sub-menu");
        $msNavSubMenu.parent().prepend('<span class="menu-toggle"></span>');

        $msNav.on("click", "li a, .menu-toggle", function (e) {
            var $this = $(this);
            if ($this.attr("href") === "#" || $this.hasClass("menu-toggle")) {
                e.preventDefault();
                if ($this.siblings("ul:visible").length) {
                    $this.parent("li").removeClass("active");
                    $this.siblings("ul").slideUp();
                    $this.parent("li").find("li").removeClass("active");
                    $this.parent("li").find("ul:visible").slideUp();
                } else {
                    $this.parent("li").addClass("active");
                    $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                    $this.closest("li").siblings("li").find("ul:visible").slideUp();
                    $this.siblings("ul").slideDown();
                }
            }
        });
    }

    ResponsiveMobilemsMenu();

    $('.mobile-menu li a').on("click", function () {
        $('.bt-sidebar-overlay').fadeOut();
        $('.bt-mobile-menu').removeClass("bt-menu-open");
    });

    /*--------------------- On click menu scroll section to section -------------------------------- */
    // Cache selectors
    var lastId,
        topMenu = $(".bt-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    menuItems.on("click", function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });

    /* Hero parallax mouse */
    if (matchMedia('only screen and (min-width: 991px)').matches) {
        $(window).on('mousemove', function (e) {
            var w = $(window).width();
            var h = $(window).height();
            var offsetX = 0.5 - e.pageX / w;
            var offsetY = 0.5 - e.pageY / h;

            $(".hero-parallax").each(function (i, el) {
                var offset = parseInt($(el).data('offset'));
                var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0px)";

                $(el).css({
                    '-webkit-transform': translate,
                    'transform': translate,
                    'moz-transform': translate
                });
            });
        });
    }
    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };

    /* Portfolio */
    $(function () {
        var filterList = {
            init: function () {
                $('.item-grid').mixItUp({
                    selectors: {
                        target: '.item',
                        filter: '.filter'
                    },
                    load: {
                        filter: 'all'
                    }
                });
            }
        };
        filterList.init();
    });

    /* Testimonials */
    $('.testimonials-slider').owlCarousel({
        loop: true,
        margin: 24,
        responsiveClass: true,
        dots: false,
        nav: false,
        pagination: false,
        autoplay: true,
        autoplaySpeed: 2000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1,
            }
        }
    });

    /* Blog */
    $('.bt-blog-wrap').owlCarousel({
        loop: true,
        margin: 24,
        responsiveClass: true,
        dots: false,
        nav: false,
        pagination: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            }
        }
    });

    /* Tab to top */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }
    });

    var btprogressPath = document.querySelector('.back-to-top-wrap path');
    var pathLength = btprogressPath.getTotalLength();
    btprogressPath.style.transition = btprogressPath.style.WebkitTransition = 'none';
    btprogressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    btprogressPath.style.strokeDashoffset = pathLength;
    btprogressPath.getBoundingClientRect();
    btprogressPath.style.transition = btprogressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        btprogressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top-wrap').addClass('active-progress');
        } else {
            jQuery('.back-to-top-wrap').removeClass('active-progress');
        }
    });
    jQuery('.back-to-top-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })

    /* Footer Date */
    var date = new Date().getFullYear();
    document.getElementById("copyright_year").innerHTML = date;

    /* Skill Progress */
    var progress = $('#progress');
    $(window).scroll(function () {
        var a = 0;
        var b = 0;
        var oTop = 0;
        if (progress.length) {
            var oTop = progress.offset().top - window.innerHeight;
            if (b == 0 && $(window).scrollTop() > oTop) {

                var max = -219.99078369140625;
                forEach(document.querySelectorAll('.progress'), function (index, value) {
                    var percent = value.getAttribute('data-progress');
                    value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                    value.querySelector('.value').innerHTML = percent + '%';
                });

                b = 1;
            }
        }
    });

     /* Tools Sidebar */
     $('.bt-tools-sidebar-toggle').on("click", function () {
        $('.bt-tools-sidebar').addClass("open-tools");
        $('.bt-tools-sidebar-overlay').fadeIn();
        $('.bt-tools-sidebar-toggle').hide();
    });
    $('.bt-tools-sidebar-overlay, .close-tools').on("click", function () {
        $('.bt-tools-sidebar').removeClass("open-tools");
        $('.bt-tools-sidebar-overlay').fadeOut();
        $('.bt-tools-sidebar-toggle').fadeIn();
    });

    /* color show */
    $(".bt-color li").on("click", function () {
        $("li").removeClass("active-variant");
        $(this).addClass("active-variant");
    });

    $(".color-primary").on("click", function () {
        $("#add_class").remove();
    });

    $(".color-1").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-1.css" id="add_class">'
        );
    });
    $(".color-2").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-2.css" id="add_class">'
        );
    });
    $(".color-3").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-3.css" id="add_class">'
        );
    });
    $(".color-4").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-4.css" id="add_class">'
        );
    });
    $(".color-5").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-5.css" id="add_class">'
        );
    });
    $(".color-6").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-6.css" id="add_class">'
        );
    });
    $(".color-7").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-7.css" id="add_class">'
        );
    });
    $(".color-8").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-8.css" id="add_class">'
        );
    });
    $(".color-9").on("click", function () {
        $("#add_class").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/color-9.css" id="add_class">'
        );
    });

    /* RTL-LTR Modes */
    $(".bt-tools-rtl .bt-tools-item").on("click", function () {
        $(".active-mode").removeClass("active-mode");
        $(this).addClass("active-mode");
    });
    $(".ltr").on("click", function () {
        $("#add_rtl").remove();
    });
    $(".rtl").on("click", function () {
        $("#add_rtl").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/rtl.css" id="add_rtl">'
        );
    });

    /*Dark Light Modes */
    $(".bt-tools-dark .bt-tools-item").on("click", function () {
        $(".active-dark-mode").removeClass("active-dark-mode");
        $(this).addClass("active-dark-mode");
    });
    $(".light").on("click", function () {
        $("#add_dark").remove();
    });
    $(".dark").on("click", function () {
        $("#add_dark").remove();
        $("head").append(
            '<link rel="stylesheet" href="assets/css/dark.css" id="add_dark">'
        );
    });

    var forEach = function (array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    };

})(jQuery);