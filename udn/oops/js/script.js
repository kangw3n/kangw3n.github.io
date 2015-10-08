$(function() {
  'use strict';

  //random jumbopicture
  var img = ['big-img1', 'big-img2', 'big-img3'];
  if ($('.big-img').length) $('.big-img').addClass(img[Math.floor(Math.random() * 3)]);

  //page url : be-caution if base-url implementation by php, if does, please remove the following code.
  var currentUrl = window.location.href;
  $('meta[property="og:url"]').attr('content', currentUrl);
  $('meta[name="URL"]').attr('content', currentUrl);
  $('link[rel="canonical"]').attr('href', currentUrl);
  $('.fb-comments').attr('data-href', currentUrl);
  $('.fb_comments').find('a').attr('href', currentUrl + '#fb_comments');


  $(window).on('load resize', function(e) {
    var newWindowWidth = $(window).width();

    if (newWindowWidth > 749 && $('#photos_focus').length) {

      $('#carousel').carouFredSel({
        width: '100%',
        items: {
          visible: 3,
          start: -1,
        },
        scroll: {
          items: 1,
          duration: 1000,
          timeoutDuration: 5000,
        },
        swipe: {
          onTouch: true,
          // onMouse: true,
        },
        prev: '#focus_arrow_prev',
        next: '#focus_arrow_next',
        pagination: {
          container: '#photos_focus #pager',
          deviation: 1,
        },
      });

    } else {
      if ($('.caroufredsel_wrapper').length) {
        $('#carousel').off();
        $('#carousel').unwrap();
        $('#carousel, #carousel a, #pager, #focus_arrow_prev, #focus_arrow_next').removeAttr('style');
        $('#pager').empty();
      }
    }
  });

  //countdown init Chinese text
  FlipClock.Lang.Chinese = {
    years: '年',
    months: '月',
    days: '天',
    hours: '時',
    minutes: '分',
    seconds: '秒',

  };
  FlipClock.Lang.zh = FlipClock.Lang.Chinese;

  // Define date accordingly by timestamp
  var currentDate = new Date();
  var currentTime = currentDate.getTime() / 1000;
  var voteDate = Date.UTC(2016,0,16,0,0,0,0) / 1000; //  Jan 16th 0800, (alt: Date.parse('Thu, 16 Jan 2016 08:00:00 GMT+0800') / 1000), Timestamp= 1452902400
  var voteOpen = Date.UTC(2016,0,16,8,0,0,0) / 1000; //  Jan 16th 1600, (alt: Date.parse('Thu, 16 Jan 2016 16:00:00 GMT+0800') / 1000), Timestamp= 1452931200
  var belowhundreds = Date.UTC(2015,9,8,0,0,0,0) / 1000; //  Oct 8th 0800, (alt: Date.parse('Thu, 08 Oct 2015 08:00:00 GMT+0800') / 1000), Timestamp= 1444262400

  // Calculate the difference in seconds between the future and current date
  var countdown = voteDate - currentTime;
  var openCountdown = voteOpen - currentTime;

  if (currentTime > voteOpen) $('.clock, .timer-text').hide();

  if (currentTime > voteDate && currentTime < voteOpen) { //openvote countdown
    $('.count-down').addClass('vote-start');
    $('.timer-text').html('距離開票還有');
    $('.clock').FlipClock(openCountdown, {
      clockFace: 'HourlyCounter',
      countdown: true,
      language: 'zh',
      callbacks: {
        stop: function() {
          $('.clock, .timer-text').hide();
        },
      },
    });
  }

  if (currentTime < voteDate) { // vote countdown
    (currentTime > belowhundreds) ? $('.count-down').addClass('nine-col'): $('.count-down').addClass('ten-col'); //if date countdown below 100 days

    $('.clock').FlipClock(countdown, {
      clockFace: 'DailyCounter',
      showSeconds: false,
      countdown: true,
      language: 'zh',
      callbacks: {
        stop: function() {
          location.reload();
        }, //stop
      }, //callback
    }); //flipclock
  }

  var $clock = $('.count-down');
  var opacity = $clock.css('opacity');
  var scrollStopped;

  var fadeInCallback = function() {
    if (typeof scrollStopped != 'undefined') {
      clearInterval(scrollStopped);
    }

    scrollStopped = setTimeout(function() {
      $clock.animate({
        opacity: 1,
      }, 'slow');
    }, 300);
  };

  // mobile version countdown stick bottom
  $(window).on('load scroll', function() {
    var width = $(document).width();
    var top = $(document).scrollTop();
    if (width < 767) {
      if (!$clock.is(':animated') && opacity == 1) {
        $clock.animate({
          opacity: 0,
        }, 'slow', fadeInCallback);
      } else {
        fadeInCallback.call(this);
      }
    }
  });

  // fb url plugin linked
  $('a.fb-udn').on('click', function() {
    var ogUrl = $('meta[property="og:url"]').attr('content');
    FB.ui({
      method: 'share',
      href: ogUrl,
    }, function(response) {
      console.log(response);
    });
  });

  //smooth scroll to top
  $('.gt-top').on('click', function(e) {
    e.preventDefault(); //prevent direct anchor move
    $('body,html').animate({
      scrollTop: 0,
    }, 700);
  });

  //simple json call for legislator data - demo
  var legislatorData = function(division, value) {
    var cate = value ? value: "";
    var url = './data/' + division + '.json?' + cate;

    $.getJSON(url, function(data) {

      var items = [];
      $.each(data, function(key, val) {
        var value = '<section class="division-state"><h3>第<span class="division-no">' + data[key].divNo + '</span>選區(<span class="division-name">' + data[key].divName + '</span>）</h3><table class="division-list"><thead><tr> <th>號碼</th><th>姓名</th><th>黨籍</th></tr></thead><tbody>';
        $.each(data[key].candidate, function(key2, val2) {
          value += '<tr><td>' + data[key].candidate[key2].no + '</td><td>' + data[key].candidate[key2].name + '</td><td class="table-flag"><span class="thumb ' + data[key].candidate[key2].classname + '"></span><span class="candidate-party">' + data[key].candidate[key2].party + '</span></td></tr>';
        });

        value += '</tbody></table></section>';
        items.push(value);
      });

      $('.legislator-division').append(items);
    }).done(function() {
      $('.spinner-container').hide();
    });

  };

  //event listener on change legislator page
  $('.state-container-mobile select').on('change', function(e) {
    var attr = $(this).val();
    $('.division-state').remove();
    $('.spinner-container').show();

    legislatorData(attr);
  });

  $('.state-container a').on('click', function(e) {
    e.preventDefault();
    if ($('a.state-name').hasClass('active')) $('a.state-name').removeClass('active');
    $(this).addClass('active');

    var attr = $(this).attr('rel');
    $('.division-state').remove();
    $('.spinner-container').show();

    legislatorData(attr);
  });


  //topic page event listener
  $('.showmore a').on('click', function(e) {
    e.preventDefault();
    var cate_id = this.id;
    var container = $(this).parent().prev().find('.max-more');
    //showmore ajax call here
    // showmore(cate_id);
    var item = '<dt><a href="#">藝人特殊特殊日發不發文都被轟 強特殊日發不發文都被轟 強特殊日發不發文都被轟 強日發不發文都被轟 強國人玻璃心好難醫？</a></dt>'; //demo

    container.append(item); //demo
  });

});
