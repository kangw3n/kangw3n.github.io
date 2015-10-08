$(function() {
  'use strict';
  Parse.initialize("2ZQN4pMiLQyGL0p8A8bdvIeSxfJ7Xi2fbbYct18H", "rgqRUivIUBfvsagS5XIMgJC0VJmciNyGAuBzmQC4");
  var ParseUser = Parse.Object.extend("ParseUser"); // data table
  var query = new Parse.Query(ParseUser); // query var
  var queryLimit = 10; // how many data pass in
  var currentUser = Parse.User.current(); // parse admin user in this case

  var deleteArray = []; //storing user selected for delete array
  var getCurrentQuery = 0; // init current query
  var prev = false; //prev button return false checked;
  var last = false; // last page checked
  var totalCount;  //total record;
  var descending = false; //descending or acending cheked;
  var currentSort = ''; //current sorting method
  
  var fileType; // check user if correcly upload valid file type and name;

  var queryFunction = function(e) {
    $('#insertData').empty();
    if (arguments.length) { // sort type
      if (descending) {
        query.descending(e);
        currentSort = 'query.descending(' + e + ')';
      } else {
        query.ascending(e);
        currentSort = 'query.ascending(' + e + ')';
      }
    } else { // query sort by memory
      var n = currentSort;
    }
    query.limit(queryLimit);
    query.find({
      success: function(results) {
        for (var i = 0; i < results.length; i++) {
          var data = {
            id: results[i].id,
            userName: results[i].get("userName"),
            userInvoice: results[i].get("userInvoice"),
            userEmail: results[i].get("userEmail"),
            userImg: results[i].get("imgUrl"),
            userNumber: results[i].get("userNumber"),
          };
          var checked;

          if (results[i].get("getChecked") === undefined || results[i].get("getChecked") === '' || results[i].get("getChecked") === false) {
            checked = '';
          } else if (results[i].get("getChecked") === true) {
            checked = 'checked';
          }

          var placeholder = '<tr id="' + data.id + '"><td><button id="editableSave" class="btn btn-default">修改存檔</button></td><td class="data-user content-editable" contentEditable="true">' + data.userName + '</td><td class="data-email content-editable" contentEditable="true">' + data.userEmail + '</td><td class="data-invoice content-editable" contentEditable="true">' + data.userInvoice + '</td><td class="data-number content-editable" contentEditable="true">' + data.userNumber + '</td><td><a href="' + data.userImg + '" target="_blank">發票圖片</a></td><td><input type="checkbox" name="checked" class="checked" value="checked" ' + checked + '></td><td><input type="checkbox" class="deleteData" value="delete"></td></tr>';
          // ._url
          $('#insertData').append(placeholder);
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message + " " + "請登入！");
      }
    });
  };

  var queryAll = function() {
    query.count({
      success: function(count) {
        // The count request succeeded. Show the count
        $('.total-size').text(count);
        totalCount = count;
      },
      error: function(error) {
        // The request failed
        console.log(error);
      }
    });
  };


  //check login status
  if (currentUser) {
    // console.log(currentUser);
    $('#login-field').hide();
    queryFunction('createdAt'); //init data fetch
    queryAll();
  } else {
    console.log('no user');
    $('#logout-field').hide();
    $('.main-content').hide();
  }

  // EVENT listener.

  // select querylimit change
  $('.total-count select').on('change', function(e) {
    queryLimit = parseInt($(this).val());
    queryFunction();
  });

  //login
  $('#login-btn').on('click', function(e) {
    e.preventDefault();
    var user = $('#user').val();
    var password = $('#password').val();

    Parse.User.logIn(user, password, {
      success: function(user) {
        // Do stuff after successful login.
        location.reload();
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        alert(user, error);
      }
    });
  });

  //logOut
  $('#logout-btn').on('click', function(e) {
    e.preventDefault();

    Parse.User.logOut();
    location.reload();
  });

  //toggle for Adding records
  $('#toggleAdd').on('click', function(e) {
    e.preventDefault();
    $('.jumbotron').slideToggle();
  });

  // query next 20
  $('#nextT').on('click', function(e) {
    // if (last) return false;
    var currentQuery = getCurrentQuery + queryLimit;
    if (currentQuery >= totalCount) return false;
    // console.log(currentQuery);
    // last = false;
    prev = true;
    getCurrentQuery = getCurrentQuery + queryLimit;
    query.skip(getCurrentQuery);
    queryFunction();
  });

  // query prev 20
  $('#prevT').on('click', function(e) {
    if (prev === false) return false;
    var currentQuery = getCurrentQuery - queryLimit;
    // console.log(currentQuery);
    if (currentQuery >= totalCount) return false;
    // last = false;
    getCurrentQuery = getCurrentQuery - queryLimit;
    if (getCurrentQuery <= 0) {
      prev = false;
      getCurrentQuery = 0;
    }
    query.skip(getCurrentQuery);
    queryFunction();
  });

  //query back 1st data
  $('#firstT').on('click', function(e) {
    prev = false;
    last = false;
    if (prev === false) return false;
    getCurrentQuery = getCurrentQuery + queryLimit;
    query.skip(0);
    queryFunction();
  });

  //query last data
  $('#endT').on('click', function(e) {
    if (last) return false;
    last = true;
    prev = true;

    getCurrentQuery = totalCount - queryLimit;
    query.skip(getCurrentQuery);
    queryFunction();

  });

  // sort item
  $('#tableHead a').on('click', function(e) {
    e.preventDefault();

    descending = descending ? false : true;
    console.log('Descending:' + descending);
    var current = this.id;
    var record;

    switch (current) {
      case 'userSort':
        record = 'userName';
        break;
      case 'phoneSort':
        record = 'userNumber';
        break;
      case 'emailSort':
        record = 'userEmail';
        break;
      case 'invoiceSort':
        record = 'userInvoice';
        break;
      case 'checkMark':
        record = 'getChecked';
        break;
      default:
        record = " ";
    }
    queryFunction(record);
  });


  //save contentEditable event listener!
  $('#insertData').on('click', '#editableSave', function() {
    if ($(this).hasClass('btn-default')) return false;
    var _button = $(this);
    var point = new ParseUser();
    point.id = $(this).closest('tr').attr('id');

    var dataEdited = {
      userName: $('.data-user').html(),
      userEmail: $('.data-email').html(),
      userNumber: parseInt($('.data-number').html()),
      userInvoice: $('.data-invoice').html(),
    };

    var dialog = $('<p>確定存取' + point.id + '資料？</p>').dialog({
      buttons: {
        "Yes": function() {
          point.set(dataEdited, true);
          point.save(null, {
            success: function(point) {
              // Saved successfully.
              console.log(point);
              _button.attr('class', 'btn btn-default');
            },
            error: function(point, error) {
              // The save failed.
              alert("Error: " + error.code + " " + error.message);
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
  $('#insertData').on('keypress keyup', '.content-editable', function() {
    $(this).closest('tr').find('#editableSave').attr('class', 'btn btn-warning');
  });


  // checked event listener!
  $('#insertData').on('change', 'input[name="checked"]', function() {
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
  $('#insertData').on('change', 'input[value="delete"]', function() {
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
  });


  //delete
  $('.data-field').on('click', '#deleteSelected', function() {
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
                delete deletedArray[i];
              }
            });
          }
          $('#deleteSelected').attr('class', 'btn btn-default');
          deleteArray = [];
          dialog.dialog('close');
        },
        "No": function() {
          dialog.dialog('close');
        },
      }
    });
  });


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


  // submit new data listener
  $('#dataForm').submit(function(e) {
    e.preventDefault();

    //return false if filetype is false
    if (!fileType) return false;

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    var parseUser = new ParseUser();
    var fileUploadControl = $("#fileselect")[0];

    if (fileUploadControl.files.length > 0) { // if have files
      var file = fileUploadControl.files[0];
      var name = fileUploadControl.files[0].name;

      var parseFile = new Parse.File(name, file);
      parseFile.save().then(function(e) {
        // The file has been saved to Parse.
        var dataFull = {
          userName: $('#userName').val(),
          userInvoice: $('#userInvoice').val(),
          userNumber: parseInt($('#userNumber').val()),
          userEmail: $('#userEmail').val(),
          isChecked: $('#userRemember').is(':checked'),
          imgUrl: parseFile,
        };

        parseUser.save(dataFull, {
          //if successful
          success: function(parseUser) {
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
});
