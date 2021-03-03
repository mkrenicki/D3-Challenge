// @TODO: YOUR CODE HERE!
// Modeled most of the structuring of my code based on excercise 16.3.9 we did in class
var svgWidth = 900;
var svgHeight = 500;
​
var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper and append an SVG group that will hold our chart.
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
​
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(data)