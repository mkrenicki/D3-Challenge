// @TODO: YOUR CODE HERE!
// Modeled mostly off excercise 16.3.9 we did in class. Much of the code should look similar to that class excercise. 
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper and append an SVG group that will hold our chart.
var svg = d3.select("body").append("svg").attr("width", svgWidth).attr("height", svgHeight);

var chartGroup = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("data.csv").then(function(csvData) {
    // Step 1: Parse Data/Cast as numbers- age vs. smokers
    // ==============================
    csvData.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear().domain([20, d3.max(csvData, d => d.age)]).range([0, width]);
    var yLinearScale = d3.scaleLinear().domain([0, d3.max(csvData, d => d.smokes)]).range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "10")
    .attr("fill", "green")
    .attr("opacity", ".4");

    // Step 6: Add state abbreviations
    var stateLabels = chartGroup.selectAll(null)
    .data(csvData)
    .enter()
    .append("text");
    stateLabels.text(function(d) {
      return d.abbr;})
      .attr("fill", "green")
      .attr("opacity", ".4")
      .attr("stroke", "black");

    // Step 7: Create axes labels
    // ==============================
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smoking Rate (%)");
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age (yrs)");
  }).catch(function(error) {
    console.log(error);
});