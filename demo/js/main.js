/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

document.getElementById("title").innerHTML = "Demo D3.js - Versione: " + d3.version;

var svg = d3.select("#chart-area").append("svg")
            .attr("width", 400)
            .attr("height", 400);

d3.json("data/buildings.json")
  .then( (data) => {
    data.forEach( (d) => {
        d.height = + d.height;
    })
    var y = d3.scaleLinear()
              .domain([0,1000])
              .range([0,400]);
    var rects = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", 20)
      .attr("x", (d, i) => {
        return ((i+1) * 60);
      })
      .attr("width", 40)
      .attr("height", (d) => {
        return y(d.height);
      })
      .attr("fill", (d) => {
        return "blue";
      });
  })
  .catch((error) => {
    alert(error);
  })