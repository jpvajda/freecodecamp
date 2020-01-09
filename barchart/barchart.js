
// example chart 1 
var dataset = [80,100,56,120,180,36,40,120,160];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);

var svg1 = d3.select('#svg1')
  .attr('width', svgWidth)
  .attr('height', svgHeight)

var barChart = svg1.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr("fill", 'blue')
  .attr('y', function(d) { 
    return svgHeight - d;
  })
  .attr('height', function(d){ 
      return d;
  })
  .attr('width', barWidth - barPadding)
  .attr('transform', function (d, i) { 
    var translate = [barWidth * i, 0];
      return 'translate(' + translate +')';
   
  });

  var text = svg1.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .attr("fill", 'red')
    .text(function(d) { 
      return d;
    })
    .attr('y', function(d, i){ 
      return svgHeight - d - 2;
    })
    .attr('x', function(d, i) { 
      return barWidth * i;
    });

    // example chart 2

    var dataset = [1,2,3,4,5];

    var svgWidth = 500, svgHeight = 300, barPadding = 5;
    var barWidth = (svgWidth / dataset.length);

    var svg2 = d3.select('#svg2')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, svgHeight])

    var barChart = svg2.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('y', function(d) { 
        return svgHeight - d - yScale(d)
      })

    .attr('height', function(d){ 
        return yScale(d);
    })
      .attr('width', barWidth - barPadding)
      .attr('transform', function (d, i) { 
          var translate = [barWidth * i, 0];
          return 'translate('+ translate + ')';
      });
