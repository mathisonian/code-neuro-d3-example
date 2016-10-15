
var data = require('./data/data.json');
var d3 = require('d3');

data = data.map(function(d) {
  return Object.keys(d).map(function(key) {
      return d[key];
  });
});


console.log(data);


var svg = d3.select('body').append('svg');


var width = 800;
var height = 600;
svg.attr('width', width);
svg.attr('height', height);

var min = Number.POSITIVE_INFINITY;
var max = Number.NEGATIVE_INFINITY;
data.forEach(function(series) {
  series.forEach(function(d) {
    if (d < min && d > 0) {
      min = d;
    }
    if (d > max) {
      max = d;
    }
  })
});

console.log('min: ' + min);
console.log('max: ' + max);

var x = d3.scaleLinear().domain([0, data[0].length]).range([0, width]);
var y = d3.scaleLinear().domain([min, max]).range([height, 0]);

var line = d3.line()
    .x(function(d, i) {
      return x(i);
    })
    .y(function(d) {
      return y(d);
    });

var path = svg.selectAll('path').data(data).enter().append('path');
var colorArray = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];



var circle = svg.selectAll('circle').data(data).enter().append('circle');
var circleIndex = 0;


circle.attr('cx', function(d, i) {
  return x(circleIndex);
}).attr('cy', function(d, i) {
  return y(d[circleIndex]);
}).attr('r', function(d) {
  return 5;
}).attr('fill', function(d, i) {
  return colorArray[i];
})

path.attr('d', function(d) {
    console.log(d);
    console.log(line(d));
    return line(d);
  })
  .attr('fill', 'none')
  .attr('stroke', function(d, i) {
    return colorArray[i];
  })
  .attr('stroke-width', 3);


setInterval(function() {
  circleIndex++;
  circle
  .transition()
  .duration(1000)
  .ease(d3.easeLinear)
  .attr('r', function(d, i) {
    return circleIndex;
  })
  .attr('cx', function(d, i) {
    return x(circleIndex);
  }).attr('cy', function(d, i) {
    return y(d[circleIndex]);
  });
}, 1000);
