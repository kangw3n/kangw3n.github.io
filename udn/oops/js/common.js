$(function() {
  'use strict';
  /* wookmark */
  var $window = $(window);
  var $document = $(document);
  var my_menu_mark = $("#menu_mark");
  var my_gotop = $("#gotop");
  var menu_offset_top = $('.menu').offset().top;
  var my_header = $("#header");
  var initStatus = true;

  my_menu_mark.css('width', $(document).width());
  my_menu_mark.css('height', $(document).height());

  $.fn.scrollBottom = function() {
    return $document.height() - this.scrollTop() - this.height() - $("#sitemap").height() - $("#footer").height() - 30;
  };

  /* 居中 */
  $.fn.center = function() {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - this.innerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
  };

  $.fn.show_box = function(url) {
    $("#menu_mark").stop(true, true).fadeIn();
    $('#show_box').stop(true, true).load(url, function() {
      $('#show_box .close').click(function() {
        $('#show_box').stop(true, true).fadeOut();
        $("#menu_mark").stop(true, true).fadeOut();
      });
    });
    $('#show_box').fadeIn();
  };

  var wookmarkWall = function() {
    if ($(window).width() <= 999 && $(window).width() >= 750) {
      $('#sidebar').removeAttr('style');
      $('#sidebar_fix').removeAttr('style');
      $('#sidebar_fix > div').removeAttr('style');

      $('#sidebar_fix > div').wookmark({
        // Prepare layout options.
        // autoResize: true, // This will auto-update the layout when the browser window is resized.
        container: $('#sidebar_fix'), // Optional, used for some extra CSS stydtng
        offset: 10, // Optional, the distance between grid items
        outerOffset: 16,
        itemWidth: 330,
      });
    } else if ($('#sidebar_fix > div').length > 0 && $(window).width() > 999) {
      $('body.index #mainbar #ad_content , body.mag_index #mainbar #ad_content').removeAttr('style');
      $('#sidebar_fix').css('height', 'auto');
      $('#sidebar_fix > div').removeAttr('style');
    }
  };

  $(window).on('resize load', function(e) {
    wookmarkWall();
  }).trigger('load');

  $(window).on("scroll touchmove", function(e) {
    var document_scrollTop = $(document).scrollTop();

    //sidebar-scroll-sticky
    if ($("#sidebar").height() < ($("#mainbar").height() - $("#nav").height()) && $(window).width() > 999) {
      var $el = $('#sidebar_fix');
      var top = $('#sidebar').offset().top;
      var height_gap = $window.height() - top;
      var side_foot = $el.height() - height_gap;
      var visibleFoot = -$window.scrollBottom();
      var scrollTop = $window.scrollTop();
      if (scrollTop > 0 && visibleFoot <= 0 && scrollTop > side_foot) {
        // 中段滑動
        // console.log('sticky now!');
        if (!$el.hasClass('sidebar_fix')) $el.addClass('sidebar_fix');
        if (!$el.hasClass('sidebar_fix-mid-scroll')) $el.addClass('sidebar_fix-mid-scroll');
        if ($el.hasClass('sidebar_fix-bottom-fixed')) $el.removeClass('sidebar_fix-bottom-fixed');


      } else if (visibleFoot >= 0) {
        // 下段固定
        // console.log('i"ve reach bottom!');
        if (!$el.hasClass('sidebar_fix-bottom-fixed')) $el.addClass('sidebar_fix-bottom-fixed');
        if ($el.hasClass('sidebar_fix-mid-scroll')) $el.removeClass('sidebar_fix-mid-scroll');


      } else {
        // 正常捲動
        // console.log('normal scroll');
        if (document.getElementById("sidebar_fix").hasAttribute("class")) $el.removeAttr('class');
      }
    }

    /* 山頭選單智慧浮動置頂 */
    var activeMenu = $('.menu dl dt a.active');
    var scrollToElement = function(ele, ele2) { // menu options visibility in mobile
      ele2.scrollLeft(ele.offset().left - 10);
    };

    if (document_scrollTop >= menu_offset_top) { // when menubar < document view, stick it on top
      if ($(document).width() > 749) { //desktop
        if (document_scrollTop >= 80) {
          my_header.addClass('active');
        }
      } else { //mobile
        if (document_scrollTop >= 40) {
          my_header.addClass('active');
          if (initStatus) { // set menu option to be visible in screen
            scrollToElement(activeMenu, $('.menu'));
            initStatus = false; //only do once on scroll
          }
          if($('.mobile-homepage').css('display') === 'none') $('.mobile-homepage').css('display', 'inline-block'); // display homepage icon
        }
      }
    } else { // original position of menu, remove all style added above
      my_header.removeClass('active');
      if (!initStatus) initStatus = true;
      if ($('.mobile-homepage').css('display') === 'inline-block') $('.mobile-homepage').css('display', 'none');
      $('.menu').removeAttr('style');
    }

    /* gotop */// 当滚动到最底部以上100像素时， 加载新内容
    if ($(document).width() <= 749 && document_scrollTop > 100 && document_scrollTop > ($(document).height() - screen.height * 1.618)) {
      my_gotop.slideDown().fadeIn();
    }
    // web
    else if ($(document).width() > 749 && document_scrollTop > 100) {
      my_gotop.slideDown().fadeIn();
    } else {
      my_gotop.slideUp().fadeOut();
    }

  }).trigger('resize');

  // 閒置頁面
  var timeoutHandle = null;
  if ($(window).width() > 749) {
    var idleState = false;
    var idleWait = 300000; /* 5'm */
    // var idleWait = 2000; /* 10's */
    $('body').bind('mousemove click keydown scroll', function() {
      clearTimeout(timeoutHandle);
      timeoutHandle = setTimeout(function() {
        // Idle Event
        var channel_id = $('meta[name="channel_id"]').attr('content');
        var cate_id = $('meta[name="cate_id"]').attr('content');
        $(this).show_box('/common/threemin/' + channel_id + '/' + cate_id);
        ga('send', 'event', 'Idlepage_' + channel_id, 'popup', {
          'page': '/common/threemin/' + channel_id + '/' + cate_id
        });
      }, idleWait);
    });
    $("body").trigger("mousemove");
  }
});


// global fn from common2.js
window.fbAsyncInit = function() {
  FB.init({
    appId: '803604343037126', //use udn app id for vote2016
    xfbml: true,
    version: 'v2.3',
    cookie: true,
  });
  FB.Event.subscribe('xfbml.render', function() {
    // after fb event called
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = '//connect.facebook.net/zh_TW/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function setCookie(key, value, expire, domain, path) {
  var ck = key + '=' + encodeURIComponent(value);
  if (expire) {
    var epr = new Date();
    epr.setTime(epr.getTime() + expire * 1000);
    ck += ';expires=' + epr.toUTCString();
  }
  if (domain)
    ck += ';domain=' + domain;
  if (path)
    ck += ';path=' + path;
  document.cookie = ck;
}

function getCookie(key) {
  if (document.cookie.length === 0) return false;
  var i = document.cookie.search(key + '=');
  if (i == -1) return false;
  i += key.length + 1;
  var j = document.cookie.indexOf(';', i);
  if (j == -1) j = document.cookie.length;
  return document.cookie.slice(i, j);
}

function GetCkValue(name) {
  var dc = document.cookie;
  var prefix = name + '=';
  var begin = dc.indexOf('; ' + prefix);
  if (begin == -1) begin = dc.indexOf(prefix);
  else begin += 2;
  if (begin == -1) return '';
  var end = document.cookie.indexOf(';', begin);
  if (end == -1) end = dc.length;
  return dc.substring(begin + prefix.length, end);
}
