$(function() {
  'use strict';
  //chatbox script
  $('.chat-box').TrackpadScrollEmulator(); //scrollbar script

  var getName = false; //check localstorage value
  var chatBoxContent = document.querySelector('.tse-scroll-content');
  var colorHex = ['#0c0077', '#ff4e00', '#128d01', '#E91FA9']; //colorhex for name style
  var msgScrollBottom = function() { // helperfn for control overflow content to be always at bottom, this must be call after dynamic content loaded;
    if ((chatBoxContent.offsetHeight < chatBoxContent.scrollHeight) || (chatBoxContent.offsetWidth < chatBoxContent.scrollWidth)) {
      chatBoxContent.scrollTop = chatBoxContent.scrollHeight;
    }
  };

  if (localStorage.getItem('chatbox-name') !== null) { //auto set the name of user if localStorage have value
    getName = true;
    var name = localStorage.getItem('chatbox-name');
    $('.nickname-name').html(name);
    $('.nickname-placeholer').show();
    $('.nickname-box input').hide();
    $('.nickname-name').css('color', localStorage.getItem('chatbox-color'));
  }

  $('.not-name').on('click', function() { //user name change handler
    getName = false;
    localStorage.removeItem('chatbox-name');
    localStorage.removeItem('chatbox-color');
    $('.nickname-name').html('');
    $('.nickname-placeholer').hide();
    $('.nickname-box input').show();
  });

  $('.nickname-box input, .chat-textbox textarea').on('keydown', function(e) { //'enter' key as sent handler
    if ($(this).hasClass('error')) $(this).removeClass('error');
    if (e.keyCode == 13) $('.chat-send').click();
  });

  $('.chat-send').on('click', function() { //sent chat msg
    var getNickName;
    var getMsg = $('.chat-textbox textarea').val();
    var newDate = new Date();
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    var color;
    var timeStamp = hours;
    timeStamp += ((minutes < 10) ? ':0' : ':') + minutes;

    if (!getName) { //if there's no name store in localstorage
      if ($('.nickname-box input').val().trim() === null || $('.nickname-box input').val().trim() === '' || $('.nickname-box input').val() === ' ') {
        $('.nickname-box input').addClass('error');
        return; //if user clicked submit while input is empty, return false;
      }

      color = colorHex[Math.floor(Math.random() * 4)];
      $('.nickname-name').css('color', color);
      getNickName = $('.nickname-box input').val();
      $('.nickname-box input').val('');
      $('.nickname-name').html(getNickName);
      $('.nickname-placeholer').show();
      $('.nickname-box input').hide();
      getName = true;
      if (typeof(Storage) !== 'undefined') { //set the name of user to localstorage
        localStorage.setItem('chatbox-name', getNickName);
        localStorage.setItem('chatbox-color', color);
      }
    } else {
      getNickName = localStorage.getItem('chatbox-name');
      color = localStorage.getItem('chatbox-color');
    }

    if ($('.chat-textbox textarea').val().trim() === null || $('.chat-textbox textarea').val().trim() === '' || $('.chat-textbox textarea').val() === ' ') {
      $('.chat-textbox textarea').addClass('error');
      return; //return false if textarea is empty
    }

    $('.chat-textbox textarea').val('');

    var toWebSocket = {
      sendName: getNickName,
      sendColor: color,
      sendMsg: getMsg,
      sendTime: timeStamp,
    }; //bunch of current users info waited to backend

    /* --------------- CODE Stated BELOW SHOULD BE PRODUCE by BACKEND after chatbox websocket has been SET, For now just a static string demo ---------------- */
    $.ajax({
      type: 'POST',
      url: '/path/to/processWebsocket.php',
      data: toWebSocket,
      success: function(output) {
        console.log(output);
      },
    });

    //template for list item chat, assume that below lines of code should be produce by backend, for now just a static demonstration purpose
    var list = '<li class="message-line chat-line"><span class="from" style="color:' + color + ';">' + getNickName + '</span><span class="chatbox-timeStamp">(' + timeStamp + ')</span><span class="colon">:</span><span class="message">' + getMsg + '</span></li>';

    $('.chat-box .tse-content').append(list);
    msgScrollBottom(); //make last input to be visible at bottom of chatbox
  });

  //expect to receive websocket data here to be write into chatbox

  // chatbox end

});
