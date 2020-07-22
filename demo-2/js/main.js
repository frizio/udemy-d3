var margin = { left:80, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

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

       // X Scale
      var x = d3.scaleBand()
                  .domain(data.map( (d) => { return d.month; } ))
                  .range([0, width])
                  .padding(0.2);

      // Y Scale
      var y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => { return d.revenue; })])
      .range([height, 0]);

      // X Axis
      var xAxisCall = d3.axisBottom(x);
      g.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height +")")
          .call(xAxisCall);

      // Y Axis
      var yAxisCall = d3.axisLeft(y)
          .tickFormat((d) => { return "$" + d; });
      g.append("g")
          .attr("class", "y axis")
          .call(yAxisCall);

      var rects = g.selectAll("rect")
        .data(data)
          
      rects.enter()
          .append("rect")
              //.attr("y", function(d){ return y(d.revenue); })
              //.attr("x", function(d){ return x(d.month) })
              //.attr("height", function(d){ return height - y(d.revenue); })
              //.attr("width", x.bandwidth)
              //.attr("fill", "blue");
  })