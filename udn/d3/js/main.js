var svg;
var width = '800';
var height = '800';
var force; //dragging force layout
var sumSize = [];
var total = 0;
var color = ['#0092C7', '#9FE0F6', '#F3E59A', '#F3B59B', '#F29C9C', '#7BA3A8', '#F4F3DE', '#BEAD92', '#F35A4A', '#5B4947', '#7CC699', '#F3E4C2', '#F37A5A', '#EF4926']; //color hex for circle

$(document).ready(function() {

  svg = d3.select('#idmap').attr('width', width).attr('height', height);

  force = d3.layout.force()
    .charge(-400)
    .linkDistance(20)
    .size([width, height]);

  ajaxCall(); // data get tru ajax json
});

//get random number incase of size too big
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//click event
$('.sorts').on('click', function() {
  var current = $(this).html();

  $('#idmap').empty();
  sumSize.length = 0; // remove size of nodes
  total = 0; //remove total size of nodes

  ajaxCall(current);

});

//math calculation depends on total size
function roundUp(d) {
  var median = total / sumSize.length;
  var largest = Math.max.apply(Math, sumSize);
  var min = Math.min.apply(null, sumSize);

  // var calculate = d * 100 / total;
  var calculate = Math.floor(d * 50 / median);

  return calculate;
}

function ajaxCall(arg) {
  d3.json('data/newdata.json', function(error, root) {
    var all = data(root, arg);
    if (error) throw error;
    var node = svg.selectAll('.node')
      .data(all)
      .enter().append('a')
      .attr('xlink:href', function(d) {
        return d.link;
      })
      .append('g')
      .attr('class', 'node')
      .call(force.drag);

    node.append('circle')
      .attr('r', function(d) {
        var recalculation = roundUp(d.value);
        return recalculation;
      })
      .style('fill', color[Math.floor(Math.random() * 14) + 1])
      .transition()
      .duration(1000)
      .style('fill-opacity', 0.8)
      .style('fill', color[Math.floor(Math.random() * 14) + 1])
      .style('stroke', color[Math.floor(Math.random() * 14) + 1]);

    node.append('text')
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .text(function(d) {
        return d.className;
      });

    force.nodes(all)
      .on('tick', dragging)
      .start();

    function dragging() {
      node.attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    } // transform location after drag
  });

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function data(root, arg) {
    var item = [];
    if (arg === undefined || arg === 'all') {
      for (var i in root.children) {
        for (var u in root.children[i].children) {
          item.push({
            className: root.children[i].children[u].name,
            value: root.children[i].children[u].size,
            link: root.children[i].children[u].a
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
              link: root.children[j].children[k].a
            });
            sumSize.push(root.children[j].children[k].size);
          }
        }
      }
    }

    $.each(sumSize, function() {
      total += parseFloat(this) || 0;
      return total;
    }); //get total size of the nodes

    return item;
  }

}
