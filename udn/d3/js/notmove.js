var svgCanvas = $('#idmap');
var aspect = svgCanvas.width() / svgCanvas.height();
var container = svgCanvas.parent();

//resize for responsive svg
$(window).on('resize load', function() {
  var targetWidth = container.width();
  svgCanvas.attr('width', targetWidth);
  svgCanvas.attr('height', Math.round(targetWidth / aspect));
}).trigger('resize');

$(document).ready(function() {
  draw();
});

$('.sorts').on('click', function() {
  $('#idmap').empty();
  var current = $(this).html();
  draw(current);
});

function draw(arg) {
  var diameter = 800;
  var color = d3.scale.category20c();
  var color2 = ['#0092C7', '#9FE0F6', '#F3E59A', '#F3B59B', '#F29C9C', '#7BA3A8', '#F4F3DE', '#BEAD92', '#F35A4A', '#6abf9c', '#7CC699', '#F3E4C2', '#F37A5A', '#EF4926']; //color hex for circle

  var bubble = d3.layout.pack()
    .size([diameter, diameter])
    .padding(1.5);

  var svg = d3.select('#idmap')
    .attr('width', diameter)
    .attr('height', diameter)
    .attr('class', 'bubble');

  d3.json('data/newdata.json', function(error, root) {
    if (error) throw error;
    var node = svg.selectAll('.node')
      .data(bubble.nodes(data(root, arg))
        .filter(function(d) {
          return !d.children;
        }))
      .enter().append('a')
      .attr('xlink:href', function(d) {
        return d.link;
      })
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    node.append('circle')
      .attr('r', function(d) {
        return d.r;
      })
      .style('fill', color2[Math.floor(Math.random() * 14)])
      .transition()
      .duration(500)
      .style('fill', function(d) {
        console.log(d);
        return color(d.className);
      })
      .style('stroke', 'rgba(255, 255, 255, .9)')
      .style('stoke-width', '5');

    node.append('text')
      .attr('dy', '.3em')
      .style('font-size', function(d) {
        return Math.floor(d.r / 2) + 'px';
      })
      .style('text-anchor', 'middle')
      .text(function(d) {
        return d.className;
      });
  });

  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function data(root, arg) {
    var classes = [];

    if (arg === undefined || arg === 'ALL') {
      for (var i in root.children) {
        for (var u in root.children[i].children) {
          classes.push({
            className: root.children[i].children[u].name,
            value: root.children[i].children[u].size,
            link: root.children[i].children[u].a
          });
        }
      }

    } else {
      for (var j in root.children) {
        if (root.children[j].name === arg) {
          for (var k in root.children[j].children) {
            classes.push({
              className: root.children[j].children[k].name,
              value: root.children[j].children[k].size,
              link: root.children[j].children[k].a
            });
          } //for loops
        } //check if the passing arg is same as data
      }
    }

    return {
      children: classes
    };
  }

  d3.select(self.frameElement).style('height', diameter + 'px');
}
