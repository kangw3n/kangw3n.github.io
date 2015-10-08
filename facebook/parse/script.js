(function() {
  'use strict';
  Parse.initialize("2ZQN4pMiLQyGL0p8A8bdvIeSxfJ7Xi2fbbYct18H", "rgqRUivIUBfvsagS5XIMgJC0VJmciNyGAuBzmQC4");

  var currentSort = 'createdAt'; //current sorting method;
  var descending = false; //descending or acending cheked;
  var queryLimit = 10; // how many data pass in
  var templates = {}; // Precompile each template and collects them all in an object.
  var deleteArray = []; //storing user selected for delete array
  var selectAll = false;

  var gameCurrentSort = 'createdAt';
  var gameDescending = false;
  var gameQueryLimit = 10;


  ['loginTemplate', 'addItemTemplate', 'allDataTemplate', 'paginationTemplate', 'paginationGameTemplate', 'gameDataTemplate'].forEach(function(e) {
    var tpl = document.getElementById(e).text;
    templates[e] = doT.template(tpl);
  });


  //check login status for redirection
  var checkstatus = {
    checkLogin: function(redirect) {
      var currentUser = Parse.User.current(); // parse admin user in this case
      return function() {
        if (currentUser) {
          redirect();
        } else {
          window.location.hash = "login/" + window.location.hash;
        }
      };
    },
    loginDone: function() {
      document.getElementById('logout-btn').style.display = 'block';
      document.getElementById('allDataButton').style.display = 'block';
      document.getElementById('gameDataButton').style.display = 'block';
      document.getElementById('addButton').style.display = 'block';
      document.getElementById('loginButton').style.display = 'none';
    },
    logoutDone: function() {
      document.getElementById('logout-btn').style.display = 'none';
      document.getElementById('allDataButton').style.display = 'none';
      document.getElementById('addButton').style.display = 'none';
      document.getElementById('gameDataButton').style.display = 'none';
      document.getElementById('loginButton').style.display = 'block';
    },
  };

  // views handlers
  var handlers = {
    navbar: function() {
      var currentUser = Parse.User.current(); // parse admin user in this case
      if (currentUser) {
        checkstatus.loginDone();
      } else {
        checkstatus.logoutDone();
      }

      //add logout event at page load
      document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        Parse.User.logOut();
        checkstatus.logoutDone();
        $.notify('Logout!', 'info');
        window.location.hash = 'login/';
      });

    },
    login: function(redirect) {
      console.log('login');
      var currentUser = Parse.User.current(); // parse admin user in this case

      var postAction = function() {
        window.location.hash = (redirect) ? redirect : '';
        $.notify('Login success!', 'success');
      };

      if (currentUser) {
        window.location.hash = '';
      } else {
        console.log('no login');
        document.getElementById('content').innerHTML = templates.loginTemplate();
        $('#login-btn').on('click', function(e) {
          e.preventDefault();
          var user = $('#user').val();
          var password = $('#password').val();

          Parse.User.logIn(user, password, {
            success: function(user) {
              // Do stuff after successful login.
              postAction();
              checkstatus.loginDone();
            },
            error: function(user, error) {
              // The login failed. Check error to see why.
              $.notify("Error: " + error.code + " " + error.message, 'error');
            }
          });
        });
      }

    },
    add: checkstatus.checkLogin(function() {
      console.log('add');
      document.getElementById('content').innerHTML = templates.addItemTemplate();

      var ParseUser = Parse.Object.extend("ParseUser"); // data table
      var fileType;
      var invoiceCheck = false;

      $('#userAge').prop('selectedIndex', -1);
      $('#purchaseChain').prop('selectedIndex', -1);
      $('#purchaseArea').prop('selectedIndex', -1);

      // Set an event listener on the Choose File field for reg test
      $('#fileselect').bind("change", function(e) {
        var files = e.target.files || e.dataTransfer.files;
        var fileName = files[0].name;

        if (!(/\w\.(gif|jpg|jpeg|tiff|png)$/i).test(fileName)) {
          fileType = false;
          $('.error-msg').html('檔案格式/命名錯誤，請確認圖檔為GIF，JPG，或PNG檔，且為英文命名之檔名');
        } else {
          fileType = true;
          $('.error-msg').html('');
        }
      });

      //check invoice button LOGIC RETHINK!
      $('#invoiceCheck').on('click', function() {
        if ($('#userInvoice').val() === null || $('#userInvoice').val() === undefined || $('#userInvoice').val() === '' ) {
          $('#userInvoice').focus();
          return false;
        } else {
          if ((/^[A-Za-z]{2}[0-9]{8}$/).test($('#userInvoice').val())) {
            var ParseUser = Parse.Object.extend("ParseUser"); // data table
            var query = new Parse.Query(ParseUser); // query var
            query.equalTo('userInvoice', $('#userInvoice').val());
            query.first({
              success: function(results) {
                if (results !== undefined) {
                  $('.error-msg').text('此發票號已重覆登錄，請確認是否正確輸入！');
                } else {
                  invoiceCheck = true;
                  $('.error-msg').text('');
                  // give ok status
                  $('#userInvoice').prop('disabled', true);
                  $('#invoiceCheck').hide();
                }
              },
              error: function(error) {
                alert('Error: ' + error.code + ' ' + error.message);
              }
            });
          } else {
            $('.error-msg').text('發票格式錯誤！');
          }

        }
      });

      // submit button for add data
      $('#dataForm').submit(function(e) {
        e.preventDefault();

        //return false if filetype is false
        if (!fileType || !invoiceCheck) return false;

        // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
        var parseUser = new ParseUser();
        var fileUploadControl = $("#fileselect")[0];

        if (fileUploadControl.files.length > 0) { // if have files
          var file = fileUploadControl.files[0];
          var name = fileUploadControl.files[0].name;

          $('.spinner-container').show();

          var parseFile = new Parse.File(name, file);
          parseFile.save().then(function(e) {
            // The file has been saved to Parse.
            var dataFull = {
              userName: $('#userName').val(),
              userInvoice: $('#userInvoice').val(),
              userNumber: parseInt($('#userNumber').val()),
              userEmail: $('#userEmail').val(),
              isChecked: $('#userRemember').is(':checked'),
              userAge: $('#userAge option:selected').val(),
              purchaseChain: $('#purchaseChain option:selected').val(),
              purchaseArea: $('#purchaseArea option:selected').val(),
              imgUrl: parseFile,
            };

            parseUser.save(dataFull, {
              //if successful
              success: function(parseUser) {
                $('.spinner-container').hide();
                alert(parseUser.get('userName') + " saved to Parse.");
                location.reload();
              },
              error: function(parseUser, error) {
                console.log(parseUser);
                console.log(error);
              }
            });
          }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log(error);
            console.log(error.response);
            $('.error-msg').html(error.response + '<br> 檔案格式錯誤，請確認圖像檔名非中文命名！');

          });

        } else {
          $('.error-msg').html('請選擇檔案！'); // perhaps wont happend
          return false;
        }

      });

    }),
    database: function(e) {
      var currentUser = Parse.User.current(); // parse admin user in this case
      if (!currentUser) {
        $.notify('Please Login!', 'info');
        window.location.hash = 'login/';
        return false;
      }

      console.log('database');
      // document.getElementById('content').innerHTML = templates.allDataTemplate();

      var ParseUser = Parse.Object.extend("ParseUser"); // data table
      var query = new Parse.Query(ParseUser); // query var

      var totalCount; //total record;

      var queryAll = function(page) {
        var skip = (page - 1) * queryLimit;
        query.limit(queryLimit);
        query.skip(skip);
        $('.spinner-container').show();

        if (descending) {
          query.descending(currentSort);
        } else {
          query.ascending(currentSort);
        }

        query.find({
          success: function(results) {
            var objList = results.map(function(e) {
              return e.toJSON();
            });
            document.getElementById('content').innerHTML = templates.allDataTemplate(objList);
            $('.total-count option[value=' + queryLimit + ']').attr('selected', 'selected');
            query.limit(0);
            query.skip(0);
            var option = {};
            // To support pagination.
            query.count({
              success: function(count) {
                var totalPage = Math.ceil(count / queryLimit);
                var currentPage = parseInt(page);
                $('.total-size').text(count);
                totalCount = count;
                $('.spinner-container').hide();
                option = {
                  // Watch out the limit.
                  'previous': (currentPage === 1) ? 1 : currentPage - 1,
                  'next': (currentPage === totalPage) ? currentPage : currentPage + 1,
                  'current': currentPage,
                  'last': totalPage,
                };
                // console.log(option);
                document.getElementById('pagination').innerHTML = templates.paginationTemplate(option);
              },
              error: function(err) {
                $.notify(err, 'error');
              }
            });
          }
        });
      };

      // query by page or init 1
      queryAll(e);

      // select querylimit change
      $('#content').on('change', '.total-count select', function(e) {
        queryLimit = parseInt($(this).val());
        queryAll(1); //reset to 1
      });

      //sort by update and create time
      $('#content').on('click', '.sorting', function(e) {
        e.preventDefault();
        var id = this.id;
        console.log(id);

        switch (id) {
          case 'sortUpdate':
            currentSort = 'updatedAt';
            break;
          case 'sortCreate':
            currentSort = 'createdAt';
            break;
          default:
            currentSort = 'createdAt';
        }
        descending = true;
        queryAll(1);
      });

      // sort item
      $('#content').on('click', '#tableHead a', function(e) {
        e.preventDefault();
        descending = descending ? false : true;
        // console.log('Descending:' + descending);
        var current = this.id;

        switch (current) {
          case 'userSort':
            currentSort = 'userName';
            break;
          case 'phoneSort':
            currentSort = 'userNumber';
            break;
          case 'emailSort':
            currentSort = 'userEmail';
            break;
          case 'invoiceSort':
            currentSort = 'userInvoice';
            break;
          case 'checkMark':
            currentSort = 'getChecked';
            break;
          default:
            currentSort = "createdAt";
        }

        queryAll(1);
      });

      //save contentEditable event listener!
      $('#content').on('click', '#editableSave', function() {
        if ($(this).hasClass('btn-default')) return false;
        var _button = $(this);
        var point = new ParseUser();
        point.id = $(this).closest('tr').attr('id');

        var dataEdited = {
          userName: $(this).closest('tr').find('.data-user').html(),
          userEmail: $(this).closest('tr').find('.data-email').html(),
          userNumber: parseInt($(this).closest('tr').find('.data-number').html()),
          userInvoice: $(this).closest('tr').find('.data-invoice').html(),
        };

        var dialog = $('<p>確定存取' + point.id + '資料？</p>').dialog({
          buttons: {
            "Yes": function() {
              point.save(dataEdited, {
                success: function(point) {
                  // Saved successfully.
                  console.log(point);
                  $.notify('修改成功', 'success');
                  _button.attr('class', 'btn btn-default');
                },
                error: function(point, error) {
                  // The save failed.
                  $.notify("Error: " + error.code + " " + error.message, 'error');
                  // error is a Parse.Error with an error code and description.
                }
              });
              dialog.dialog('close');
            },
            "No": function() {
              dialog.dialog('close');
            },
          }
        });
      });

      // contentedittable changing
      $('#content').on('keypress keyup', '.content-editable', function() {
        $(this).closest('tr').find('#editableSave').attr('class', 'btn btn-warning');
      });

      // checked event listener!
      $('#content').on('change', 'input[name="checked"]', function() {
        var point = new ParseUser();
        point.id = $(this).closest('tr').attr('id');

        if ($(this).is(':checked')) {
          point.set('getChecked', true);
          point.save(null, {
            success: function(point) {
              // Saved successfully.
              $.notify("已存取！", 'success');
              console.log(point);
            },
            error: function(point, error) {
              // The save failed.
              $.notify(error, 'error');
              // error is a Parse.Error with an error code and description.
            }
          });
          // Checkbox is checked.
        } else {
          point.set('getChecked', false);
          point.save(null, {
            success: function(point) {
              // Saved successfully.
              console.log(point);
              $.notify("unchecked!", 'success');
            },
            error: function(point, error) {
              // The save failed.
              $.notify(error, 'error');
              // error is a Parse.Error with an error code and description.
            }
          });
          // Checkbox is not checked.
        }
      });

      //check delete checkbox has checked or not
      $('#content').on('change', 'input[value="delete"]', function() {
        var id = $(this).closest('tr').attr('id');
        var index = deleteArray.indexOf(id);

        if ($(this).is(':checked')) {
          deleteArray.push(id);
        } else {
          deleteArray.splice(index, 1);
        }

        if (deleteArray.length > 0) {
          $('#deleteSelected').attr('class', 'btn btn-danger');
        } else {
          $('#deleteSelected').attr('class', 'btn btn-default');
        }
        console.log(deleteArray);
      });

      //selecte all
      $('#content').on('click', '#selectAll', function() {
        deleteArray = [];
        var checkboxes = $('[name="deleteMe"]');
        if (selectAll === false) {
          selectAll = true;
          for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = this.checked;
            deleteArray.push(checkboxes[i].parentNode.parentNode.id);
          }
          $('#deleteSelected').attr('class', 'btn btn-danger');
        } else {
          selectAll = false;
          deleteArray = [];
          $('#deleteSelected').attr('class', 'btn btn-default');
        }
        console.log(deleteArray);
      });


      //delete
      $('#content').on('click', '#deleteSelected', function() {
        if ($('#deleteSelected').hasClass('btn-default')) return false;

        var dialog = $('<p>Are you sure wanna Delete selected data??</p>').dialog({
          buttons: {
            "Yes": function() {
              var point = new ParseUser();

              for (var i = 0; i < deleteArray.length; i++) {
                point.id = deleteArray[i];
                $('#' + deleteArray[i]).remove();
                point.destroy({
                  success: function() {
                    $.notify('已刪除!', 'info');
                    delete deleteArray[i];
                  }
                });
              }
              $('#deleteSelected').attr('class', 'btn btn-default');
              deleteArray = [];
              dialog.dialog('close');
              // location.reload();
            },
            "No": function() {
              dialog.dialog('close');
            },
          }
        });
      });
    },
    game: function(e) {
      var currentUser = Parse.User.current(); // parse admin user in this case
      if (!currentUser) {
        $.notify('Please Login!', 'info');
        window.location.hash = 'login/';
        return false;
      }

      console.log('game');

      var PassedGame = Parse.Object.extend('passedGame'); // data table
      var queryGame = new Parse.Query(PassedGame); // query var

      var gameTotalCount;

      var gameQueryAll = function(page) {
        page = (page === undefined) ? 1 : page;
        var skip = (page - 1) * gameQueryLimit;
        queryGame.limit(gameQueryLimit);
        queryGame.skip(skip);
        $('.spinner-container').show();

        if (gameDescending) {
          queryGame.descending(gameCurrentSort);
        } else {
          queryGame.ascending(gameCurrentSort);
        }

        queryGame.find({
          success: function(results) {
            var objList = results.map(function(e) {
              return e.toJSON();
            });
            document.getElementById('content').innerHTML = templates.gameDataTemplate(objList);
            $('.total-count option[value=' + gameQueryLimit + ']').attr('selected', 'selected');
            queryGame.limit(0);
            queryGame.skip(0);
            var option = {};
            // To support pagination.
            queryGame.count({
              success: function(count) {
                var totalPage = Math.ceil(count / gameQueryLimit);
                var currentPage = parseInt(page);
                $('.total-size').text(count);
                gameTotalCount = count;
                $('.spinner-container').hide();
                option = {
                  // Watch out the limit.
                  'previous': (currentPage === 1) ? 1 : currentPage - 1,
                  'next': (currentPage === totalPage) ? currentPage : currentPage + 1,
                  'current': currentPage,
                  'last': totalPage,
                };
                document.getElementById('gamePagination').innerHTML = templates.paginationGameTemplate(option);
              },
              error: function(err) {
                $.notify(err, 'error');
              }
            });
          }
        });
      };

      gameQueryAll(e);

      // select querylimit change
      $('#content').on('change', '.total-count select', function(e) {
        gameQueryLimit = parseInt($(this).val());
        gameQueryAll(1); //reset to 1
      });

      // sort item
      $('#content').on('click', '#gameTableHead a', function(e) {
        e.preventDefault();
        gameDescending = gameDescending ? false : true;
        // console.log('Descending:' + descending);
        var current = this.id;

        switch (current) {
          case 'playerSort':
            gameCurrentSort = 'playerName';
            break;
          case 'playerEmailSort':
            gameCurrentSort = 'playerEmail';
            break;
          case 'playerTimeSort':
            gameCurrentSort = 'timeUsed';
            break;
          default:
            gameCurrentSort = "updatedAt";
        }
        gameQueryAll(1);
      });

    },
  };


  /* Router */
  var App = Parse.Router.extend({
    routes: {
      '': 'index',
      'addItem/': 'add',
      'page/:page/': 'database',
      'gameData/': 'gameData',
      'userpage/:page/': 'gameData',
      'login/*redirect': 'login',
    },
    index: function() {
      return handlers.database(1);
    },
    add: handlers.add,
    gameData: handlers.game,
    database: handlers.database,
    login: handlers.login,
  });

  // Initialize the App
  var Router = new App();
  Parse.history.start();
  handlers.navbar();
})();
