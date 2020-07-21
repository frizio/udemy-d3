/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

document.getElementById("title").innerHTML = "Demo D3.js - Versione: " + d3.version;

var svg = d3.select("#chart-area").append("svg")
            .attr("width", 600)
            .attr("height", 400);

d3.json("data/buildings.json")
  .then( (data) => {
    data.forEach( (d) => {
        d.height = + d.height;
    })
    var x = d3.scaleBand()
              .domain(
                data.map((d) =>{
                  return d.name;
                })
              )
              .range([0, 600])
              .paddingInner(0.5)
              .paddingOuter(0.5);
    var y = d3.scaleLinear()
              .domain( [0, d3.max(data, (d)=>{return d.height}) ] )
              .range ( [0, 400] );
    var rects = svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", 0)
      .attr("x", (d)=>{return x(d.name)})
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
