import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  format
} from 'd3';

// requests data from source 
req=new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
req.send();
req.onload=function(){
  json=JSON.parse(req.responseText);
  var dataset = json.data;


  // sets canvas dimensions 
  const svg = select('svg');
  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = data => { 

    //sets title
    const title = 'FCC: Scatterplot Graph';

    //set x-axis
    const xValue = d => d.year;
    const xAxisLabel = 'Year';

    //set y-axis
    const yValue = d => d.time;
    const circleRadius = 4;
    const yAxisLabel = 'Time in Minutes';

    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


  };

  // gets data from csv
  csv('data.csv')
  .then(data => {
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;  
    });
    render(data);
  });
}