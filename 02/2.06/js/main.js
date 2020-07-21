/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.6 - Selections and data joins
*/

var data = [25, 20, 10, 12, 15];

//var colors = ["red", "green", "blue", "yellow", "orange"];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 500);

var circles = svg.selectAll("circle").data(data);

circles.enter()
    .append("circle")
        .attr("cx", (d, i) => {
            return (i * 50) + 150;
          }
        )
        .attr("cy", 225)
        .attr("r", (d) => {
            return d;
          }
        )
        .attr("fill", "blue");