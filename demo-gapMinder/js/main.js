/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

var margin = { left:80, right:20, top:50, bottom:100 };
var height = 600 - margin.top  W- margin.bottom, 
var width  = 800 - margin.left - margin.right;

d3.json("data/data.json").then(function(data){
	console.log(data);
})
