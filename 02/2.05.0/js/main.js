/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", 500)
  .attr("height", 400)
  .attr("style", "border: 1px solid;");

  
var rectangle = svg
  .append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 110)
  .attr("height", 110)
  .attr("fill", "red");
