$(document).ready(function() {
  //init text for ch
  FlipClock.Lang.Chinese = {
    years: '年',
    months: '月',
    days: '天',
    hours: '時',
    minutes: '分',
    seconds: '秒',

  };
  FlipClock.Lang['zh'] = FlipClock.Lang.Chinese;

  // Define date accordingly
  var currentDate = new Date();
  var currentTime = currentDate.getTime() / 1000;
  var voteDate = 1452909600;
  //1452909600
  var voteOpen = 1452909800;
  var changeTheme = 1452938400;

  var belowhundreds = 1452355200;

  if (currentTime > changeTheme) { // change themed
    $('body').addClass('theme-changed');
  }

  // Calculate the difference in seconds between the future and current date
  var countdown = voteDate - currentTime;
  var openCountdown = voteOpen - voteDate;

  if (currentTime > voteOpen) $('.clock, .timer-text').hide();

  if (currentTime > voteDate && currentTime < voteOpen) { //openvote countdown
    // $('.flip').show();
    $('.count-down').addClass('vote-start');
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
    if (voteDate < belowhundreds) { //if date countdown below 100 days
      $('.count-down').addClass('nine-col');
    } else {
      $('.count-down').addClass('ten-col');
    }

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
});
