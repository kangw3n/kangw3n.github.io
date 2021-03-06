var svg;
var width = '800';
var height = '800';
var force; //dragging force layout
var svgCanvas = $('#idmap');
var aspect = svgCanvas.width() / svgCanvas.height();
var container = svgCanvas.parent();

//resize for responsive svg
$(window).on('resize load', function() {
  var target = container.width();
  svgCanvas.attr('width', target - 100);
  svgCanvas.attr('height', target - 100);
}).trigger('resize');

$(document).ready(function() {
  svg = d3.select('#idmap').attr('width', width).attr('height', height);

  var calculate = {
    charge: function(d) {
      if (d >= 400) return -(d / 2);
      else return -(d / 4);
    },

    gravity: function(d) {
      if (d >= 600) return 0.1;
      else return 0.15;
    }
  }; //seperate different size of svg

  force = d3.layout.force()
    .charge(calculate.charge(width))
    .chargeDistance(width)
    .gravity(calculate.gravity(width))
    .size([width, height]);

  _dataCall.ajaxCall(); // get init data tru ajax json
});

//click event
$('.control li').on('click touch', function() {
  $('.control li').removeClass('on');
  $(this).addClass('on');
  svgCanvas.empty();
  var current = $(this).html(); // get the query value
  _dataCall.ajaxCall(current); //get data by a specified query

});

// avoid global in iif
_dataCall = (function() {

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-40, 0])
    .html(function(d) {
      return '<strong>點閱 ： <span class="tooltip-text">' + d.value + '</span></strong> <br>' +
        '<strong>熱門 ： <span class="tooltip-text">' + d.count + '</span></strong>';
    }); //tooltips attr

  var d3color = d3.scale.category20c();
  var color = ['#0092C7', '#9FE0F6', '#F3E59A', '#F3B59B', '#F29C9C', '#7BA3A8', '#F4F3DE', '#BEAD92', '#F35A4A', '#6abf9c', '#7CC699', '#F3E4C2', '#F37A5A', '#EF4926']; //color hex for circle

  function draw(arg) {
    d3.json('data/newdata.json', function(error, root) {
      var all = data(root, arg);

      //dynamic set the size of circle's radius
      var rScale = d3.scale.linear()
        .domain([d3.min(all.sumSize, function(d) {
          if (width <= 200) {
            return d / 1.5;
          } else {
            return d;
          }
        }), d3.max(all.sumSize, function(d) {
          if (width <= 200) {
            return d / 1.5;
          } else {
            return d;
          }
        })])
        .range([width / 40, width / 10]); //set the sizeRange base of the size of svg

      if (error) throw error;
      var node = svg.selectAll('.node')
        .data(all.item)
        .enter().append('a')
        .attr('xlink:href', function(d) {
          return d.link;
        })
        .append('g')
        .classed('node', true)
        .call(force.drag)
        .call(tip);

      node.append('circle')
        .attr('r', function(d) {
          return rScale(d.value);
        })
        .style('fill', color[Math.floor(Math.random() * 14)])
        .transition()
        .duration(1000)
        .style({
          'fill-opacity': 0.9,
          stroke: 'rgba(255, 255, 255, .9)',
          'stroke-width': 5,

          fill: function(d) {
            if (rScale(d.value) >= 70) return color[1];
            else if (rScale(d.value) >= 45 && rScale(d.value) < 70) return color[2];
            else if (rScale(d.value) >= 25 && rScale(d.value) < 45) return color[3];
            else return color[4];
          }
        });

      node.append('text')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .style({
          'text-anchor': 'middle',
          fill: 'black',
          'font-size': function(d) {
            return Math.floor(rScale(d.value) / 2) + 'px';
          }
        })
        .attr('dy', '.35em')
        .text(function(d) {
          return d.className;
        });

      force.nodes(all.item)
        .on('tick', dragging)
        .start();

      function dragging() {
        node.attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      } // transform location after drag
    });
  }

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function data(root, arg) {
    var item = [];
    var sumSize = [];
    if (arg === undefined || arg === 'ALL') {
      for (var i in root.children) {
        for (var u in root.children[i].children) {
          item.push({
            className: root.children[i].children[u].name,
            value: root.children[i].children[u].size,
            link: root.children[i].children[u].link,
            count: root.children[i].children[u].count
          });
          sumSize.push(root.children[i].children[u].size);
        }
      }

    } else {
      for (var j in root.children) {
        if (root.children[j].name === arg) {
          for (var k in root.children[j].children) {
            item.push({
              className: root.children[j].children[k].name,
              value: root.children[j].children[k].size,
              link: root.children[j].children[k].link,
              count: root.children[j].children[k].count
            });
            sumSize.push(root.children[j].children[k].size);
          } //for loops
        } //check if the passing arg is same as data
      }
    }

    return {
      item: item,
      sumSize: sumSize
    };
  }

  return {
    ajaxCall: draw
  };

}());
