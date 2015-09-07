var clock;

$(document).ready(function() {
  //init text for ch
  FlipClock.Lang.Chinese = {
    years: '年',
    months: '月',
    days: '天',
    hours: '时',
    minutes: '分',
    seconds: '秒',

  };
  FlipClock.Lang['zh'] = FlipClock.Lang.Chinese;

  // Define date accordingly
  var currentDate = new Date();
  var currentTime = currentDate.getTime() / 1000;
  var voteDate = 1452938400;
  var voteOpen = 1452938440;
  var changeTheme = 1452938400;

  if (currentTime > changeTheme) {
    var css = 'body {background: transparent url("css/pattern.png") left top;}';
    var linkChild = document.getElementsByTagName('link');
    var lastNodes = linkChild[linkChild.length - 1]; //get last node of the link
    var style = document.createElement('style');
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    lastNodes.parentNode.insertBefore(style, lastNodes.nextSibling);
  }

  // Calculate the difference in seconds between the future and current date
  var countdown = voteDate - currentTime;
  var openCountdown = voteOpen - voteDate;

  if (currentTime > voteOpen) {
    $('.clock, .timer-text').hide();
  } else {
    clock = $('.clock').FlipClock(countdown, {
      clockFace: 'DailyCounter',
      showSeconds: false,
      countdown: true,
      language: 'zh',
      callbacks: {
        stop: function() {
          $('.timer-text').html('距離開票還有：');
          $('.flip').show();
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
        }, //stop
      }, //callback
    }); //flipclock
  }
});
