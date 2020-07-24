var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var xAxisGroup = g.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height +")")
                  
var yAxisGroup = g.append("g")
                  .attr("class", "y axis")
                  

// X Scale
var x = d3.scaleBand()
.range([0, width])
.padding(0.2);

// Y Scale
var y = d3.scaleLinear()
.range([height, 0]);

// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 60)
    .attr("font-size", "16px")
    .attr("text-anchor", "middle")
    .text("Month");

// Y Label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenues ($)");

d3.json("data/revenues.json").then( (data) => {

      console.log(data);
  
      // Clean data
      data.forEach( (d) => {
          d.revenue = +d.revenue;
      });

      console.log(data);
      
      d3.interval( 
        () => {
          update(data);
        }, 
        1500);
      
      update(data);
})

function update(data) {
  console.log("Call Update function");

  x.domain(data.map( (d) => { return d.month; } ))
  y.domain([0, d3.max(data, (d) => { return d.revenue; })])

  // X Axis
  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);
  
  // Y Axis
  var yAxisCall = d3.axisLeft(y)
                    .tickFormat((d) => { return "$" + d; });
  yAxisGroup.call(yAxisCall);
  

  //Bars
  /*
  var rects = g.selectAll("rect")
  .data(data)
  
  rects.enter()
  .append("rect")
      .attr("y", function(d){ return y(d.revenue); })
      .attr("x", function(d){ return x(d.month) })
      .attr("height", function(d){ return height - y(d.revenue); })
      .attr("width", x.bandwidth)
      .attr("fill", "blue");
  */

}
