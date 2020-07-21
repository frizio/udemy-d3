/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

var svg = d3.select("#chart-area").append("svg")
            .attr("width", 512)
            .attr("height", 512);

d3.json("data/buildings.json")
  .then( (data) => {
    data.forEach( (d) => {
        d.height = + d.height;
    })
    var rects = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", 80)
      .attr("x", (d, i) => {
        return ((i+1) * 60);
      })
      .attr("width", 40)
      .attr("height", (d) => {
        return d.height;
      })
      .attr("fill", (d) => {
        return "blue";
      });
  })
  .catch((error) => {
    alert(error);
  })