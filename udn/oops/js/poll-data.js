$(document).on('ready', function() {
  'use strict';

  //demo data and layout
  var pollsData = {
    chart: {
      type: 'line',
      style: {
        fontFamily: '微軟正黑體, Microsoft JhengHei, LiHei Pro',
      },
    },
    title: {
      text: 'Demo民調測試',
    },
    subtitle: {
      text: '資料來源: 聯合線上',
    },
    xAxis: {
      categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    yAxis: {
      title: {
        text: '民調百分比',
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: false,
      },
    },
    series: [{}],
  };

  var trendData = {
    chart: {
      type: 'areaspline'
    },
    title: {
      style: {
        'display': 'none'
      }
    },
    xAxis: {
      categories: ["02-02 - 02-08", "02-09 - 02-15", "02-16 - 02-22", "02-23 - 03-01", "03-02 - 03-08", "03-09 - 03-15", "03-16 - 03-22", "03-23 - 03-29", "03-30 - 04-05", "04-06 - 04-12", "04-13 - 04-19", "04-20 - 04-26", "04-27 - 05-03", "05-04 - 05-10", "05-11 - 05-17", "05-18 - 05-24", "05-25 - 05-31", "06-01 - 06-07", "06-08 - 06-14", "06-15 - 06-21", "06-22 - 06-28", "06-29 - 07-05", "07-06 - 07-12", "07-13 - 07-19", "07-20 - 07-26", "07-27 - 08-02", "08-03 - 08-09", "08-10 - 08-16", "08-17 - 08-23", "08-24 - 08-30", "08-31 - 09-06", "09-07 - 09-13", "09-14 - 09-20", "09-21 - 09-27", "09-28 - 10-04", "10-05 - 10-11", "10-12 - 10-18", "10-19 - 10-25", "10-26 - 11-01", "11-02 - 11-08", "11-09 - 11-15", "11-16 - 11-22"],
      allowDecimals: false,
      labels: {
        rotation: -45,
        formatter: function() {
          return this.value;
        }
      }
    },
    yAxis: {
      title: {
        style: {
          'display': 'none'
        }
      }
    },
    tooltip: {
      pointFormat: '{series.name} {point.y}'
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2
      }
    },
    series: [{}],
  };


  var poll = function(value) {
    var no = value ? value : 'taipei'; //initial value

    $.getJSON('./data/poll.json', function(data) {
      $.each(data, function(key, val) {
        if (data[key].section === no) {
          pollsData.series = data[key].options;
          return false;
        }
      });
      $('#highchart-vote .highchart-container').highcharts(pollsData);
    });
  };

  var trend = function(value) {
    var no = value ? value : 'taipei'; //initial value

    $.getJSON('./data/trend.json', function(data) {
      $.each(data, function(key, val) {
        if (data[key].section === no) {
          trendData.series = data[key].options;
          return false;
        }
      });

      $('#highchart-googleTrend .highchart-container').highcharts(trendData);
    });
  };

  trend(); //initial trend
  poll(); //initial poll

  //click event
  $('#highchart-vote .section-choose a').on('click', function(e) {
    e.preventDefault();
    var value = $(this).attr('rel');
    $('#highchart-vote .section-choose a.active').removeClass('active');
    $(this).addClass('active');

    poll(value);
  });

  //click event
  $('#highchart-googleTrend .section-choose a').on('click', function(e) {
    e.preventDefault();
    var value = $(this).attr('rel');
    $('#highchart-googleTrend .section-choose a.active').removeClass('active');
    $(this).addClass('active');

    trend(value);
  });


});
