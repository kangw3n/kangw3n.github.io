var auto = true;
var auto_on = true;
var auto_direction = "next";
var effect = true;
total_tab = 0;
current_group = 1;
current_tab = 0;
tab_group_pn = 5;
tab_width = 102;
total_group = 0;
tabs = new Array();
tabs_delay = new Array();
tabs_title = new Array();
tabs_list_html = "";
tabs_jump0 = false;
var auto_speed = 5000;
tab_action = "horizontal";
tab_speed = 0;
cycle = false;
timer = null;
youtubeid = "yV535DLrDYg";
video_on = false;
tabs_already = 0;
$(document).ready(function() {
  ik = 0;
  $("#tabs a").each(function() {
    tabs[ik] = $(this).attr("href");
    tabs_delay[ik] = $(this).attr("delay");
    tabs_title[ik] = $(this).attr("title");
    $(this).attr("id", "tab" + ik);
    var tempid = ik;
    $(this).bind("click", function() {
      chgTab(tempid, "c");
    });
    ik++;
  })
  $("#tabs a").each(function() {
    $(this).attr("href", "javascript: void(0)");
  })
  tabs_list_html = $("#tabs dl").html();
  total_tab = tabs.length;
  total_group = parseInt(total_tab / tab_group_pn);
  if (total_tab % tab_group_pn > 0)
    total_group++;
  current_group = 1;
  $("#tab-content").touchwipe({
    wipeLeft: function() {
      autoNextTab();
    },
    wipeRight: function() {
      autoPrevTab();
    },
    preventDefaultEvents: false
  });
  $("#tabs dl").css("left", "0px");
  $("#tabs dl").css("width", total_group * tab_width * tab_group_pn + "px");
  if (current_tab != 0)
    gotoTab(current_tab);
  else
    chgTab("0", "");
  if (auto)
    timer = setTimeout("autoNextTab();", tabs_delay[current_tab]);
  if (!cycle) setPrevNextEnd();
});
$(window).load(function() {}).bind("pageshow", function() {}).bind("pagehide", function() {});

function nextGroup(user_click) {
  if (user_click == 'c' && parent.location != window.location) {}
  if (!cycle && current_group == total_group) {
    return;
  }
  clearTabOn();
  $("#tabs dl").css("left", "-" + tab_width * tab_group_pn * (current_group - 1) + "px");
  if (total_group == 1) {
    current_tab = 0;
    chgTab(current_tab, "");
    return;
  }
  current_group++;
  if (current_group > total_group) {
    if (cycle) {
      current_group = 1;
      reGroup();
      $("#tabs dl").stop().animate({
        "left": "-=" + tab_width * tab_group_pn + "px"
      }, tab_speed, function() {
        resetGroup();
        current_tab = 0;
        chgTab(current_tab, "");
        if (auto_on) {
          autoAction();
        }
      });
    }
  } else {
    if (!cycle) setPrevNextEnd();
    $("#tabs dl").stop().animate({
      "left": "-=" + tab_width * tab_group_pn + "px"
    }, tab_speed, function() {
      current_tab = (current_group - 1) * tab_group_pn;
      chgTab(current_tab, "");
      if (auto_on) {
        autoAction();
      }
    });
  }
}

function prevGroup(user_click) {
  if (user_click == 'c' && parent.location != window.location) {}
  if (!cycle && current_group == 1) {
    return;
  }
  clearTabOn();
  $("#tabs dl").css("left", "-" + tab_width * tab_group_pn * (current_group - 1) + "px");
  if (cycle && total_group == 1) {
    current_tab = total_tab - 1;
    chgTab(current_tab, "");
    return;
  }
  current_group--;
  if (current_group < 1) {
    if (cycle) {
      current_group = total_group;
      reGroup();
      $("#tabs dl").stop().animate({
        "left": "+=" + tab_width * tab_group_pn + "px"
      }, tab_speed, function() {
        resetGroup();
        current_tab = (current_group - 1) * tab_group_pn;
        chgTab(current_tab, "");
      });
    }
  } else {
    if (!cycle) setPrevNextEnd();
    $("#tabs dl").stop().animate({
      "left": "+=" + tab_width * tab_group_pn + "px"
    }, tab_speed, function() {
      current_tab = (current_group - 1) * tab_group_pn;
      chgTab(current_tab, "");
    });
  }
}

function setPrevNextEnd() {
  if (current_group == 1) {
    $("#prev_id").attr('class', 'prev_end');
  } else {
    $("#prev_id").attr('class', 'prev');
  }
  if (current_group == total_group) {
    $("#next_id").attr('class', 'next_end');
  } else {
    $("#next_id").attr('class', 'next');
  }
}

function reGroup() {
  $("#tabs dl").html(tabs_list_html);
  new_tabs_group = new Array();
  ik = 0;
  $("#tabs dt").each(function() {
    new_tabs_group[ik] = "<dt>" + $(this).html() + "</dt>";
    new_tabs_group[ik];
    ik++;
  })
  tempi = total_tab % tab_group_pn;
  if (tempi != 0) {
    for (var i = 0; i < (tab_group_pn - tempi); i++) {
      new_tabs_group[ik] = "<dt><a href=''>&nbsp;</a></dt>";
      ik++;
    }
  }
  if (current_group == total_group) {
    liststr = "";
    for (var i = ik - tab_group_pn; i < ik; i++) {
      liststr = liststr + new_tabs_group[i];
    }
    liststr = liststr + tabs_list_html;
    $("#tabs dl").html(liststr);
    $("#tabs dl").css("left", "-" + tab_width * tab_group_pn + "px");
  }
  if (current_group == 1) {
    liststr = tabs_list_html;
    tempi = total_tab % tab_group_pn;
    if (tempi != 0) {
      for (var i = 0; i < (tab_group_pn - tempi); i++) {
        liststr = liststr + "<dt><a href=''>&nbsp;</a></dt>";
        ik++;
      }
    }
    $("#tabs dl").css("width", (total_group + 1) * tab_width * tab_group_pn + "px");
    for (var i = 0; i < tab_group_pn; i++) {
      liststr = liststr + new_tabs_group[i];
    }
    $("#tabs dl").html(liststr);
  }
}

function resetGroup() {
  $("#tabs dl").css("width", total_group * tab_width * tab_group_pn + "px");
  $("#tabs dl").html(tabs_list_html);
  $("#tabs dl").css("left", "-" + tab_width * tab_group_pn * (current_group - 1) + "px");
  ik = 0;
}

function gotoTab(ctab) {
  if (ctab < total_tab) {
    current_group = parseInt((ctab + 1) / tab_group_pn);
    if (((ctab + 1) % tab_group_pn) > 0)
      current_group++;
    $("#tabs dl").css("left", "-" + tab_width * tab_group_pn * (current_group - 1) + "px");
    chgTab(ctab, "");
  }
}

function chgTab(tabid, user_click) {
  old_tab_on = clearTabOn();
  if (user_click == 'c' && parent.location != window.location) {
    current_tab = tabid;
  }
  if (user_click == 'c') {}
  $("#tab" + tabid).attr('class', 'on');
  if (user_click == "c") {
    var today = new Date();
    var anotherDate = new Date(2013, 08, 27, 23, 59, 59);
    if (today > anotherDate) reloadAd();
  }
  closeVideo();
  $("div.focus div").load(tabs[tabid] + "?" + Math.random(), function(response, status, xhr) {
    if (tabs[tabid].indexOf("2448") > 0 || tabs[tabid].indexOf("udntv") > 0) {
      if (jQuery("#vwindow").length > 0 && !video_on) {
        $.getScript('/static/js/tube-script.js');
      }
      video_on = true;
    } else {
      video_on = false;
    }
  });
}

function reloadAd() {
  $("#ad_300x60_iframe", window.parent.document).attr("src", $("#ad_300x60_iframe", window.parent.document).attr("src"));
  $("#ad_300x250_iframe", window.parent.document).attr("src", $("#ad_300x250_iframe", window.parent.document).attr("src"));
}

function autoNextTab() {
  tabs_already++;
  if (!auto) return;
  if (current_tab != 0 && tabs_jump0) {
    tabs_jump0 = false;
    current_tab = 0;
    gotoTab(current_tab);
  } else {
    if ((current_tab + 1 != total_tab) && ((current_tab + 1) > (current_group * tab_group_pn - 1) || current_tab > total_tab - 1)) {
      nextGroup();
    } else {
      current_tab++;
      if (current_tab == total_tab) {
        current_tab = 0;
        current_group = 1;
        setPrevNextEnd();
        gotoTab(0);
      } else
        chgTab(current_tab, "");
      if (auto_on)
        autoAction();
    }
  }
  if (current_tab == 0 && tabs_already > 0) {
    cycle = true;
    auto = false;
  }
}

function autoPrevTab() {
  if (!auto) return;
  if ((current_tab - 1) < ((current_group - 1) * tab_group_pn - 1) || current_tab < 1) {
    prevGroup();
  } else {
    current_tab--;
    chgTab(current_tab, "");
    if (auto_on)
      autoAction();
  }
  return;
}

function clearTabOn() {
  var old_tab_on = 0;
  for (var i = 0; i < total_tab; i++) {
    var temp = $('#tab' + i).attr('class');
    if (temp == "on")
      old_tab_on = i;
    $("#tab" + i).attr("class", "");
  }
  return old_tab_on;
}

function autoStop() {
  if (auto) {
    if (timer != null)
      clearTimeout(timer);
    auto_on = false;
  }
  return;
}

function autoStart() {
  if (auto) {
    autoAction();
    if (!auto_on) {
      auto_on = true;
      autoAction();
    }
  }
  return;
}

function autoplay() {
  window.intval = setInterval('nextTab()', auto_speed);
}

function stopautoplay() {
  if (typeof window.intval != 'undefined')
    clearInterval(window.intval);
}

function autoAction() {
  if (auto) {
    if (timer != null)
      clearTimeout(timer);
    if (auto_direction == "next") {
      timer = setTimeout("autoNextTab();", tabs_delay[current_tab]);
    } else {
      timer = setTimeout("autoPrevTab();", tabs_delay[current_tab]);
    }
  }
}

function showVideo(mute) {
  console.log('mute:' + mute);
  if (!youtubeid.length)
    youtubeid = "SwrKzkRUlaw";
  if (mute) {
    jQuery("#vwindow").tubeplayer({
      width: 361,
      height: 250,
      volume: 0,
      mute: 0,
      autoPlay: true,
      allowFullScreen: false,
      initialVideo: youtubeid,
      preferredQuality: "default",
      onPlayerPlaying: function(id) {
        console.log('onPlay');
        jQuery("#vwindow").tubeplayer("mute");
      },
      onPause: function() {},
      onStop: function() {},
      onSeek: function(time) {},
      onMute: function() {},
      onUnMute: function() {}
    });
    $.tubeplayer.defaults.afterReady = function($player) {
      jQuery("#vwindow").tubeplayer('mute');
    }
  } else {
    jQuery("#vwindow").tubeplayer({
      width: 361,
      height: 250,
      volume: 0,
      mute: 0,
      autoPlay: true,
      allowFullScreen: false,
      initialVideo: youtubeid,
      preferredQuality: "default",
      onPlay: function(id) {},
      onPause: function() {},
      onStop: function() {},
      onSeek: function(time) {},
      onMute: function() {},
      onUnMute: function() {}
    });
    $.tubeplayer.defaults.afterReady = function($player) {
      jQuery("#vwindow").tubeplayer('unmute');
    }
  }
}

function closeVideo() {
  if (jQuery("#udntv").length) {
    jQuery("#udntv").contents().remove();
  }
}
