/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.4 - Adding SVGs with D3
*/

var svg = d3.select("#chart-area")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 512);

var circle = svg
  .append("circle")
  .attr("cx", 512)
  .attr("cy", 256)
  .attr("r",  128)
  .attr("fill", "green");