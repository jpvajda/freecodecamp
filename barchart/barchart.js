
// // example chart 1 
// var dataset = [80,100,56,120,180,36,40,120,160];

// var svgWidth = 500, svgHeight = 300, barPadding = 5;
// var barWidth = (svgWidth / dataset.length);

// var svg1 = d3.select('#svg1')
//   .attr('width', svgWidth)
//   .attr('height', svgHeight)

// var barChart = svg1.selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append('rect')
//   .attr('class', 'bar')
//   .attr("fill", 'blue')
//   .attr('y', function(d) { 
//     return svgHeight - d;
//   })
//   .attr('height', function(d){ 
//       return d;
//   })
//   .attr('width', barWidth - barPadding)
//   .attr('transform', function (d, i) { 
//     var translate = [barWidth * i, 0];
//       return 'translate(' + translate +')';
   
//   });

//   var text = svg1.selectAll('text')
//     .data(dataset)
//     .enter()
//     .append('text')
//     .attr("fill", 'red')
//     .text(function(d) { 
//       return d;
//     })
//     .attr('y', function(d, i){ 
//       return svgHeight - d - 2;
//     })
//     .attr('x', function(d, i) { 
//       return barWidth * i;
//     });

//     // example chart 2

//   var dataset = [1,2,3,4,5];

//   var svgWidth = 500, svgHeight = 300, barPadding = 5;
//   var barWidth = (svgWidth / dataset.length);

//   var svg2 = d3.select('#svg2')
//     .attr('width', svgWidth)
//     .attr('height', svgHeight);

//   var yScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([0, svgHeight])

//   var barChart = svg2.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr('y', function(d) { 
//       return svgHeight - d - yScale(d)
//     })

//   .attr('height', function(d){ 
//       return yScale(d);
//   })
//     .attr('width', barWidth - barPadding)
//     .attr('transform', function (d, i) { 
//         var translate = [barWidth * i, 0];
//         return 'translate('+ translate + ')';
//     });

// example 3 

var data = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300;

var svg3 = d3.select('#svg3')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

var xScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgWidth]);
 
var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([svgHeight, 0]);

var x_axis = d3.axisBottom().scale(xScale);

var y_axis = d3.axisLeft().scale(yScale);

svg3.append('g')
    .attr('transform', 'translate(50,10)')
    .call(y_axis);

 // example 4    

var xAxisTranslate = svgHeight - 20;

svg3.append('g')
    .attr('transform', 'translate(50,' + xAxisTranslate +')')
    .call(x_axis);

    var width = 400,
        height = 100;

    var data = [10, 15, 20, 25, 30];
    
    // Append SVG 
    var svg = d3.select('#x-axis')
                .append("svg")
                .attr("width", width)
                .attr("height", height);

    // Create scale
    var scale = d3.scaleLinear()
                  .domain([d3.min(data), d3.max(data)])
                  .range([0, width - 100]);

    // Add scales to axis
    var x_axis = d3.axisBottom()
                   .scale(scale);

    //Append group and insert axis
    svg.append("g")
       .call(x_axis)
       .attr("id", "x-axis");
   
   // Sets Y-Axis
   
   var width = 400, height = 400;

   var data = [10, 15, 20, 25, 30];
   var svg = d3.select("#y-axis")
               .append("svg")
               .attr("width", width)
               .attr("height", height);

   var scale = d3.scaleLinear()
                 .domain([d3.min(data), d3.max(data)])
                 .range([height/2, 0]);

   var y_axis = d3.axisLeft()
                 .scale(scale);

   svg.append("g")
      .attr("transform", "translate(50, 10)")
      .call(y_axis)
      .attr("id", "y-axis");