var tiles = []; // all created tiles constructor

$(function() {
  'use strict';
  // Initialize Parse
  Parse.initialize('2ZQN4pMiLQyGL0p8A8bdvIeSxfJ7Xi2fbbYct18H', 'rgqRUivIUBfvsagS5XIMgJC0VJmciNyGAuBzmQC4');
  var loginTrue = false;
  var userID;
  var userName;
  var userPic;
  var email;
  var queryRes = false; // check if user has pass the game or not

  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId: '905566212864343',
      cookie: true, // enable cookies to allow Parse to access the session
      xfbml: true,
      version: 'v2.5'
    });

    //do login check at first
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        $('#facebookLogout').show();
        $('#facebookLogin').hide();
        loginTrue = true;
        FB.api('/me?fields=picture{url}, id, name, email', function(response) {
          userID = response.id;
          userName = response.name;
          userPic = response.picture.data.url;
          email = response.email;
          $('.user').text('Welcome! ' + response.name);
          $('#facebookPic').attr('src', response.picture.data.url);
          parseCheck(response.id);
        });

      } else if (response.status === 'not_authorized') {
        $('.user').text('請連接Facebook帳號！');
      } else {
        $('.user').text('請先登入並連接Facebook帳號！');
      }
    });

    parseCount();
    //parseCount
    function parseCount() {
      var PassedGame = Parse.Object.extend('passedGame'); // data table
      var query = new Parse.Query(PassedGame); // query var
      query.count({
        success: function(count) {
          $('.count').text(count);
        },
        error: function(err) {}
      });
    }

    //logout
    function parseLogout() {
      console.log('obj');
      FB.logout(function(response) {
        location.reload();
      });
    }

    $('#facebookLogout').on('click', function(e) {
      e.preventDefault();
      parseLogout();
    });

    // playerCheck
    function parseCheck(id) {
      var PassedGame = Parse.Object.extend('passedGame'); // data table
      var query = new Parse.Query(PassedGame); // query var
      query.equalTo('playerId', id);
      query.first({
        success: function(results) {
          if (results !== undefined) {
            $('.status-text').text('你已經過關了，請把機會留給其他人！');
            queryRes = true;
          } else {
            $('#startGameButton').show();
          }
        },
        error: function(error) {
          alert('Error: ' + error.code + ' ' + error.message);
        }
      });
    }

    // gameEnd push
    function pushWinId() {
      if (queryRes) return false;
      var PassedGame = Parse.Object.extend('passedGame'); // data table
      var passedGame = new PassedGame();
      passedGame.set('playerId', userID);
      passedGame.set('playerName', userName);
      passedGame.set('playerPic', userPic);
      passedGame.set('timeUsed', (15 - count));
      passedGame.set('playerEmail', email);
      passedGame.save(null, {
        success: function(passedGame) {
          // Execute any logic that should take place after the object is saved.
          console.log('New object created with objectId: ' + passedGame.id);
          $('.display-msg').append(' 資料已存取，請按下一步！');
        },
        error: function(passedGame, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    }

    //login handler
    function parseLogin() {
      Parse.FacebookUtils.logIn("public_profile, user_friends, email", {
        success: function(user) {
          if (!user.existed()) {
            alert('User signed up and logged in through Facebook!');
          } else {
            alert('User logged in through Facebook!');
          }
          location.reload();
        },
        error: function(user, error) {
          alert('User cancelled the Facebook login or did not fully authorize.');
        }
      });
    }

    // Run code after the Facebook SDK is loaded.
    var flips = ['tb', 'bt', 'lr', 'rl']; //flip type
    var iInterval = 500; // init flip timer
    var iPeekTime = 2000;
    var iFlippedTile = null; // check if the flipped tile was the 1st clicked
    var iTileBeingFlippedId = null; // which tilebeing flipped now
    var fullArrayAllocation = []; // array to store all 20 items and to push for random arrangement
    var randomArrayIndex = []; // which array did the card randomize
    var counter; // timer counter
    var rules = [
      [1, 2, 3],
      [1, 3, 2],
      [3, 2, 1]
    ]; // rules for flipped order, order by name of image, which in number format
    var currentRules = []; // randomize rules container
    var correctStep = 0; // clicked corrected flip count
    var count = 15; //countdown timer seconds

    // create an array prototype fn for checking contains
    Array.prototype.contains = function(k) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === k) {
          return true;
        }
      }
      return false;
    };

    function createTile(iCounter) {
      var curTile = new Tile('tile' + iCounter); // tile constructor create
      curTile.setFrontColor('tileColor' + Math.floor((Math.random() * 5) + 1)); // set different class for differ color
      curTile.setStartAt(500 * Math.floor((Math.random() * 5) + 1));
      curTile.setFlipMethod(flips[Math.floor((Math.random() * 3) + 1)]); // flip method
      curTile.setBackContentImage('images/' + fullArrayAllocation[iCounter] + '.jpg');

      return curTile; //return each made tile constructor to loop
    }


    function initTiles() {
      $('.overlay').hide();
      var iCounter = 0;
      var curTile = null;
      $('#timer').html('準備...');
      $('.count-down').attr('value', 15);

      // Randomly create twenty tiles and render to board
      for (iCounter = 0; iCounter < 20; iCounter++) {
        curTile = createTile(iCounter); // create tile element
        $('#board').append(curTile.getHTML());
        tiles.push(curTile); // push all tile object to an array for match checking
      }
    }

    function hideTiles() {
      var iCounter = 0;
      for (iCounter = 0; iCounter < tiles.length; iCounter++) {
        tiles[iCounter].revertFlip();
      }
      onPeekComplete();
    }

    function revealTiles() { // reveal 1st time
      var iCounter = 0;
      for (iCounter = 0; iCounter < tiles.length; iCounter++) {
        tiles[iCounter].flip();
      }
      setTimeout(hideTiles, iPeekTime);
    }

    //click handler
    function checkMatch() {
      if (iFlippedTile === null) { // 1st click
        if (tiles[iTileBeingFlippedId].getBackContentImage() === 'images/0.jpg') { // 1st click is logo then return false
          setTimeout('tiles[' + iTileBeingFlippedId + '].revertFlip()', 2000); // revertflip
          return false;
        }
        if (tiles[iTileBeingFlippedId].getBackContentImage() === 'images/' + currentRules[correctStep] + '.jpg') {
          correctStep++; // correct ans for the 1st time, take not for the step count, in this case added 1.
          $('#timer').text('請繼續..');
          iFlippedTile = true; // var determ tile ady been flipped
        } else { // click wrong order in the 1st click
          finished('reset');
        } // next click is not true
      } else { // 2nd click and above
        if (tiles[iTileBeingFlippedId].getBackContentImage() !== 'images/' + currentRules[correctStep] + '.jpg') { // not the correct order
          $('#timer').text('錯了錯了！！再找找！');
          setTimeout('tiles[' + iTileBeingFlippedId + '].revertFlip()', 2000); // revertflip

        } else { // correct order
          correctStep++;
          if (correctStep === 3) {
            finished('win');
            pushWinId();
          } else {
            $('#timer').text('還差一張！！');
          }
        }
      }
    }

    function finished(e) {
      clearInterval(counter);
      $('.count-down').attr('value', 0);
      $('#board').fadeTo('slow', 0.7);
      $('div.tile').off(); //
      setTimeout(showBoard(e), iPeekTime);
    }

    function onPeekComplete() {

      $('#timer').text('開始！');
      $('div.tile').on('click', function() { // click event handler
        iTileBeingFlippedId = this.id.substring('tile'.length); //tile id
        if (tiles[iTileBeingFlippedId].getFlipped() === false) { // if not flipped
          tiles[iTileBeingFlippedId].addFlipCompleteCallback(function() {
            checkMatch();
          });
          tiles[iTileBeingFlippedId].flip();
        } else {
          console.log($(this));
        }
      });

      var timer = function() {
        count = count - 1;
        if (count < 0) {
          //counter ended, do something here
          finished('timeEnd');
          return;
        }
        $('.count-down').attr('value', count);
        $('#timer').html(count);
        //Do code for showing the number of seconds here
      };

      counter = setInterval(timer, 1000); //1000 will run it every 1 second
    }

    function onPeekStart() { // after all tile been created!
      setTimeout(hideTiles(), iPeekTime);
    }

    function doRandomRules() { // random rules, random array index, and reset rules
      /* Reset the tile allocation count array.This
        is used to ensure each image is only
        allocated twice.
      */
      currentRules = []; // re-set rules
      fullArrayAllocation = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // re-set array
      iFlippedTile = null;
      count = 15;
      randomArrayIndex = [];
      iTileBeingFlippedId = null;
      while (tiles.length > 0) {
        tiles.pop();
      }


      var temp = Math.floor(Math.random() * 3); // random for rules selection
      var randomIndex; // random index for 20 array
      currentRules = rules[temp]; // get a random rule in all rules

      for (var iCounter = 0; iCounter < 3; iCounter++) {
        randomIndex = Math.floor(Math.random() * 19) + 1; //random place in array
        do {
          randomIndex = Math.floor(Math.random() * 19) + 1; //random place in array
        } while (randomArrayIndex.contains(randomIndex)); // redo if randomArrayIndex have the same random value

        randomArrayIndex.push(randomIndex);
        fullArrayAllocation[randomIndex] = iCounter + 1;
      }
      console.log(randomArrayIndex);
      // do rules intro;
      setTimeout(showBoard('start'), iPeekTime);
    }

    function showBoard(e) {
      var status;
      var timerBar;
      var startButton = false;
      switch (e) {
        case 'reset':
          status = '順序錯了！請重新開始吧！';
          timerBar = '第一張錯了！';
          startButton = true;
          break;
        case 'timeEnd':
          status = '時間結束了！ 請重新開始吧';
          timerBar = 'END!';
          startButton = true;
          break;
        case 'start':
          status = '你目前的玩法是！' + currentRules + '<br><button id="sureGame">START</button>';
          timerBar = '';
          break;
        case 'win':
          status = '你贏了！！';
          timerBar = 'Win! 你用了' + (15 - count) + '秒完成！！';
          break;
        default:
          status = 'reset';
          timerBar = '不明錯誤';
      }
      $('.overlay').show(600);
      $('.display-msg').html(status);
      $('#timer').html(timerBar);
      if (startButton) $('#startGameButton').show();
    }

    $('.overlay').on('click', '#sureGame', function() { // flip game start
      initTiles();
      revealTiles();
    });

    $('#startGameButton').on('click', function() { // start instruction for game rules
      if (!loginTrue || queryRes) return false;
      doRandomRules(); // rule randomize
      var attr = $('#board').attr('style');
      if (typeof attr !== typeof undefined && attr !== false) { // fadeout if board have used before
        $('#board').fadeOut(600, function() {
          $(this).empty().removeAttr('style');
        }).fadeIn(600);
      }
      $(this).hide();
    });

    $('#facebookLogin').on('click', function() {
      if (loginTrue) return false;
      parseLogin();
    });
  };
});


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
