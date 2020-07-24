var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var flag = true;

var time = 1000;
var t = d3.transition().duration(750);

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
var yLabel = g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenues ($)");


d3.json("data/revenues.json").then( (data) => {

      // Clean data
      data.forEach( (d) => {
          d.revenue = +d.revenue;
          d.profit = +d.profit
      });
      //console.log(data);

      d3.interval( 
        () => {
          update(data);
          flag = !flag;
        }, 
        time);

      update(data);
})

function update(data) {
  console.log("Call Update function");

  var value = flag ? "revenue": "profit";

  x.domain(data.map( (d) => { return d.month; } ))
  y.domain([0, d3.max(data, (d) => { return d[value]; })])

  // X Axis
  var xAxisCall = d3.axisBottom(x);
  xAxisGroup.call(xAxisCall);
  
  // Y Axis
  var yAxisCall = d3.axisLeft(y)
                    .tickFormat((d) => { return "$" + d; });
  yAxisGroup.call(yAxisCall);
  
  // JOIN new data with old element
  var rects = g.selectAll("rect")
               .data(data)
  
  // EXIT old element not present in the new data.
  rects.exit()
          .attr('fill', 'red')
       .transition(t)
          .attr("y", y[0])
          .attr("height", 0)
          .remove();

  // UPDATE old element in the new data
  rects.attr("y", function(d){ return y(d[value]); })
       .attr("x", function(d){ return x(d.month) })
       .attr("height", function(d){ return height - y(d[value]); })
       .attr("width", x.bandwidth)
  

  // ENTER new element present in the new data
  rects.enter()
    .append("rect")
      .attr("x", function(d){ return x(d.month) })
      .attr("width", x.bandwidth)
      .attr("y", y[0])
      .attr("height", 0)
      .attr("fill", "blue")
    .transition(t)
      .attr("y", function(d){ return y(d[value]); })
      .attr("height", function(d){ return height - y(d[value]); })

  var label = flag ? 'Revenue' : 'Profit' ;
  yLabel.text(label);
}
