req=new XMLHttpRequest();
req.open("GET",'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',true);
req.send();
req.onload=function(){
  json=JSON.parse(req.responseText);
  var dataset = json.data;
  
  const w = 1000;
  const h = 500;
  const padding = h*0.1;
  
  const svg = d3.select("body")
                .append("svg")
                .attr("id", "title")
                .attr("width", w)
                .attr("height", h)
                .style("padding", "50px");
  
  var datesMap = dataset.map(function(each) {
    return new Date(each[0]);
  });
  
  var dateMax = new Date(d3.max(datesMap));
  dateMax.setMonth(dateMax.getMonth() + 3);
  
  var GDP = dataset.map(function(each) {
    return each[1];
  });
  
  var parsedGDP = [];
  
  var linearScale = d3.scaleLinear()
                      .domain([0, d3.max(GDP)])
                      .range([0, h - padding - 50]);
  
  parsedGDP = GDP.map(function(each) {
    return linearScale(each);
  });
  
  const xScale = d3.scaleTime()
                   .domain([d3.min(datesMap), dateMax])
                   .range([padding, w - padding]);
  
  const xAxis = d3.axisBottom().scale(xScale);
  
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, " + (h - padding) + ")")
    .call(xAxis);
  
  const yScale = d3.scaleLinear()
                   .domain([d3.max(GDP), 0])
                   .range([padding, h - padding]);
  
  const yAxis = d3.axisLeft(yScale);
  
  svg.append("g") 
     .attr("id", "y-axis")
     .attr("transform", "translate(" + (padding) + ", 0)")
     .call(yAxis);
  
  var tooltip = d3.select("body")
	                .append("div")
	                .style("position", "absolute")
	                .style("z-index", "10")
	                .style("visibility", "visible");
                  
  svg.selectAll("rect")
     .data(parsedGDP)
     .enter()
     .append("rect")
   
     .attr('x', (d, i) => xScale(datesMap[i]))
     .attr('y', (d) => h - padding - d)
   
     .attr("width", 4)
     .attr("height", (d) => d)
     .attr("class", "bar")
   
     .attr('data-date', (d, i) => dataset[i][0])
     .attr('data-gdp', (d, i) => dataset[i][1])
   
  	 .on("mouseover", function(d, i){
     return tooltip.attr("class", "tooltip")
                   .style("visibility", "visible")
                   .attr("id", "tooltip")
                   .attr('data-date', dataset[i][0])
                   .html(dataset[i][0] + "\n" + dataset[i][1] + "$");
})
     .on("mousemove", function(){
     return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
})
     .on("mouseout", function(){
     return tooltip.attr("class", "")
                  .style("visibility", "hidden");
})
};