'use strict';

var EB = EB || {};
EB.util.namespace('application');

EB.application = (function () {

    var handleSectionLink = function ($clicked) {
        var clickedTarget = $clicked.attr('href').replace(/\//g, '').replace('#','');

        console.log('clicked a section link', clickedTarget, Backbone.history.fragment.replace(/\//g, ''));

        if (Backbone.history.fragment.replace(/\//g, '') === clickedTarget) {
            EB.App.Router.scrollToView(clickedTarget);
        } else {
            if (! Modernizr.history) {
                if (clickedTarget === '') {
                    clickedTarget = 'home';
                }
                EB.App.Router.scrollToView(clickedTarget, true);
            } else {
                EB.App.Router.navigate(clickedTarget, true);
            }
        }
    };
    

    var handleLinks = function () {
        $('#banner a').on('click', function (ev) {
            var $clicked = $(this);

            console.log('clicked', $clicked.attr('href'), $clicked);

            if (!$clicked.hasClass('noPush')) {
                ev.preventDefault();
                handleSectionLink($clicked);
            }
        });
    };


    var checkAllContentLoaded = function () {
        var allContentLoaded = true,
                $loader = $('#page_loading');

        console.log('checking if all content is loaded');

        $('.section-page').each(function () {
            var $section = $(this);
            if (!$('.section-inner', $section).length) {
                allContentLoaded = false;
            }
        });
        if (allContentLoaded) {
            $('.box', $loader).fadeOut('fast', function () {
                $loader.fadeOut('fast', function() {
                    EB.App.Router.scrollToView(Backbone.history.fragment.replace(/\//g, ''));
                });
            });
        }
    };
    
    
    var load = function () {
        EB.App.Router = new EB.Router();
        Backbone.history.start({pushState: true});
        EB.util.handleSvgCompatibility($('#banner img'));
        handleLinks();
    };


    return {
        load: load,
        checkAllContentLoaded: checkAllContentLoaded,
        handleSectionLink: handleSectionLink
    };


})();