function GetCkValue(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) begin = dc.indexOf(prefix);
  else begin += 2;
  if (begin == -1) return "";
  var end = document.cookie.indexOf(";", begin);
  if (end == -1) end = dc.length;
  return dc.substring(begin + prefix.length, end);
}

$(function() {

  if ($(window).width() >= 766 && $(window).width() <= 1016) {
    $("#menu > dl > dt").each(function(index) {
      if (index > 1) {
        $(this).find('a').removeAttr('href');
        //alert($(this).html());
      }
    });
  }

  var ogUrl = $('meta[property="og:url"]').attr('content');
  $(".fb-comments").attr('data-href', ogUrl);
  $(".fb_comments").find("a").attr("href", ogUrl + "#fb_comments");
});

// function resizeFacebookComments(f){
//         var srcStr = $('.fb-comments iframe').attr('src')+"";
//         var src = srcStr.split('width=');
//
//         if ($(document).width() > 749) {
//                 var width = parseInt($('.fb-comments').parent().parent().width()) - parseInt(65);
//         }
//         else {
//                 var width = parseInt($('.fb-comments').parent().parent().width()) - parseInt(25);
//         }
//
//         $('.fb-comments iframe').attr('src', src[0] + 'width=' + width);
//         $('.fb-comments iframe').css({width: width});
//         $('.fb-comments span').css({width: width});
//
//         //console.log('f: '+f+' width: '+width);
//
//         $('div.fb-comments').css({left: '0px'});
//         //if ($(document).width() > 749) $('div.fb-comments').css({left: '0px'});
//         //else $('div.fb-comments').css({left: '0px'});
// }

// function fbCommentsWorkaround() {
//
//         //FB.Event.subscribe('xfbml.render', resizeFacebookComments);
//
// 	if ($(window).width() < 1016) {
//                 $(window).on('load', function(){
//                         resizeFacebookComments();
//                 });
//         }
//         else {
//                 $(window).on('load resize', function(){
//                         resizeFacebookComments();
//                 });
//         }
//
// /*
//         $('.fb-comments iframe').on('load', function() {
//             resizeFacebookComments();
//             $('.fb-comments iframe').unbind('load');
//         });
// */
//
//     }
window.fbAsyncInit = function() {
  FB.init({
    appId: "803604343037126",
    xfbml: true,
    version: 'v2.3',
		cookie: true,
  });
  // fbCommentsWorkaround();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
	console.log(d, s, id, js, fjs);
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$(function() {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  $(".fb-share-button").attr("data-href", ogUrl);
  $(".like > .fb-like").attr("data-href", ogUrl);

  var comments_count = 0;
  $.ajax({
    url: 'https://graph.facebook.com/?ids=' + ogUrl,
    dataType: 'jsonp',
    success: function(data) {
      if (typeof(data[ogUrl].comments) !== 'undefined') {
        comments_count = data[ogUrl].comments;
        $(".dialog_number").html('<b>' + comments_count + '</b>');
      }
    }
  }).done(function(data) {
		console.log(data);
  });
});

addTwitter = function(type, img) {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  img = encodeURIComponent(img);

  if (type == "img") {
    var desc = encodeURIComponent(getImgDesc(img));
    window.open("https://twitter.com/intent/tweet?text=" + desc + "&url=" + ogUrl, 'Twitter Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
  } else {
    window.open("https://twitter.com/intent/tweet?text=" + ogTitle + "&url=" + ogUrl);
  }
}

addPlurk = function(type, img) {
  var ogUrl = $('meta[property="og:url"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  img = encodeURIComponent(img);

  if (type == "img") {
    var desc = encodeURIComponent(getImgDesc(img));
    window.open("http://www.plurk.com/?status=" + ogUrl + "&nbsp;(&nbsp;" + desc + "&nbsp;", 'Plurk Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');
  } else {
    window.open("http://www.plurk.com/?status=" + ogUrl + "&nbsp;(&nbsp;" + ogTitle + "&nbsp;");
  }
}

addPinterest = function(type, img) {

  var ogUrl = $('meta[property="og:url"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  var desc = encodeURIComponent(getImgDesc(img));
  img = encodeURIComponent(img);
  window.open("http://pinterest.com/pin/create/button/?url=" + ogUrl + "&media=" + img + "&description=" + desc, 'Pinterest Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');

}


addFacebook = function(type, img) {

  var clUrl = encodeURIComponent("http://oops.udn.com/share_close.html");
  var ogUrl = $('meta[property="og:url"]').attr('content');
  var appid = $('meta[property="fb:app_id"]').attr('content');
  var ogTitle = encodeURIComponent($('meta[property="og:title"]').attr('content'));
  var desc = encodeURIComponent(getImgDesc(img));
  img = encodeURIComponent(img);
  window.open("https://www.facebook.com/dialog/feed?app_id=" + appid + "&display=popup&link=" + ogUrl + "&picture=" + img + "&name=" + ogTitle + "&caption=" + ogUrl + "&description=" + desc + "&redirect_uri=" + clUrl, 'Facebook Share Picture', 'toolbar=no,width=1024,height=480,directories=no,status=no,scrollbars=no,resize=no,menubar=no');

}

getImgDesc = function(img) {

  var desc = '';

  $("div.photo_center > a > img").each(function() {
    var imgSrc = $(this).attr("src");
    if (imgSrc == img) {
      desc = $(this).parent().next("h4").html();
    }
  });

  $("div.photo_left > a > img").each(function() {
    var imgSrc = $(this).attr("src");
    if (imgSrc == img) {
      desc = $(this).parent().next("h4").html();
    }
  });

  $("div.photo_right > a > img").each(function() {
    var imgSrc = $(this).attr("src");
    if (imgSrc == img) {
      desc = $(this).parent().next("h4").html();
    }
  });

  return desc;
}




chgFontSize = function(type, fs) {

  console.log(fs);
  if (fs.length == 0) {
    var fs = $("#story_body_content").css("font-size");
    fs = fs.replace("px", "");
    if (type == '+') {
      if (fs < 23) {
        fs = parseInt(fs) + parseInt(2);
        $("#story_body_content").css("font-size", fs + "px");
      }
    }
    if (type == "-") {
      if (fs > 11) {
        fs = parseInt(fs) - parseInt(2);
        $("#story_body_content").css("font-size", fs + "px");
      }
    }
  } else {
    $("#story_body_content").css("font-size", fs + "px");
  }

  $.cookie('fontsize', fs, {
    path: '/'
  });
}

$(function() {
  if ($.cookie('fontsize') != '' && !isNaN($.cookie('fontsize'))) {
    var fs = $.cookie('fontsize');
    chgFontSize('', fs);
  }
});

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
  if (document.cookie.length == 0) return false;
  var i = document.cookie.search(key + '=');
  if (i == -1) return false;
  i += key.length + 1;
  var j = document.cookie.indexOf(';', i);
  if (j == -1) j = document.cookie.length;
  return document.cookie.slice(i, j);
}
