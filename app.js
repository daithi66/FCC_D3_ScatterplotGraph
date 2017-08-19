//Width and height
var w = 700;
var h = 500;
var padding = 50;
var titleColor = "#A0522D";
var subtitleColor = "#DFA520";

//Create scale functions
var xScale = d3.scale.linear()
	.range([padding, w - padding * 2]);

var yScale = d3.scale.linear()  
	.range([padding, h - padding]);

var xAxisFormat = function(d) {
  var min = Math.floor(d / 60);
  var sec = d % 60;
  return (min + ":" + sec);
};

//Define X axis
var xAxis = d3.svg.axis()
  .scale(xScale)
	.orient("bottom")
	.ticks(5)
  .tickFormat(xAxisFormat);

//Define Y axis
var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(10);

//Create SVG element
var svg = d3.select("#graph")
		.attr("width", w)
		.attr("height", h);

function fetchJSON() {
  var gdpData = [];
  fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(function(response) {
       return response.json();
     })
    .then(function(json) {
       var data = json;
       var fastestTime = data[0].Seconds;

       //Create the xScale and yScale's domains
       xScale.domain([data[data.length-1].Seconds - fastestTime + 10, 0]);
       yScale.domain([1, d3.max(data, function(d) {return d.Place;}) + 1]);
    
			 //Create circles based on data
			 svg.selectAll("circle")
			   .data(data)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d.Seconds - fastestTime);
			    })
			   .attr("cy", function(d) {
			   		return yScale(d.Place);
			   })
			   .attr("r", function(d) {
			   		return 5;
			   })
			   .attr("fill", function(d) {
			   		return d.Doping ? 'red' : 'green';
			   })
		     .on('mouseover', function (data)  {
            document.getElementById("Name").innerHTML = data.Name;
            document.getElementById("Nationality").innerHTML = " (" + data.Nationality + ")";
            document.getElementById("Rank").innerHTML = "Rank: " + data.Place;
            document.getElementById("Year").innerHTML = ", Year: " + data.Year;
            document.getElementById("Time").innerHTML = ", Time: " + data.Time;
            document.getElementById("Doping").innerHTML = data.Doping;
            tooltip.style.display = "block";
		      })
		     .on('mouseout', function (data)  {
            tooltip.style.display = "none";
		      });
    
			 //Create labels for circle's based on data
			 svg.selectAll("text")
			   .data(data)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d.Name;
			   })
			   .attr("x", function(d) {
			   		return xScale(d.Seconds - fastestTime - 4);
			   })
			   .attr("y", function(d) {
			   		return yScale(d.Place + .5);
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "#999")
		     .on('mouseover', function (data)  {
            document.getElementById("Name").innerHTML = data.Name;
            document.getElementById("Nationality").innerHTML = " (" + data.Nationality + ")";
            document.getElementById("Rank").innerHTML = "Rank: " + data.Place;
            document.getElementById("Year").innerHTML = ", Year: " + data.Year;
            document.getElementById("Time").innerHTML = ", Time: " + data.Time;
            document.getElementById("Doping").innerHTML = data.Doping;
            tooltip.style.display = "block";
		      })
		     .on('mouseout', function (data)  {
            tooltip.style.display = "none";
		      });

			 //Create X axis
			 svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);
			
			 //Create Y axis
			 svg.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);
    
      //Create chart and Axis labels/text
      svg.append("text")
        .attr("x", (w / 2))
        .attr("y", "1.5em")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif") 
        .attr("font-size", "1.5em")
        .attr("fill", titleColor)
        .text("Doping in Professional Bicycle Racing");
      svg.append("text")
        .attr("x", (w / 2))
        .attr("y", "3.5em")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif") 
        .attr("font-size", "1em")
        .attr("fill", subtitleColor)
        .text("35 Fastest times up Alpe d'Huez");
      svg.append("text")
        .attr("x", (w / 2))
        .attr("y", "5.6em")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif") 
        .attr("font-size", ".8em")
        .attr("fill", subtitleColor)
        .text("Normalized to 13.8km distance");
      svg.append("text")
        .attr("x", -50)
        .attr("y", 30)
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif") 
        .attr("font-size", ".7em")
        .attr("fill", "black")
        .attr("transform", "rotate(-90)")
        .text("Ranking");
      svg.append("text")
        .attr("x", w / 2)
        .attr("y", 480)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif") 
        .attr("font-size", ".7em")
        .attr("fill", "black")
        .text("Minutes Behind Fastest Time");

      //Create legend
      svg.append("rect")
        .attr("x", 375)
        .attr("y", 300)
        .attr("width", 200)
        .attr("height", 50)
        .attr("stroke", "#333")
        .attr("fill", "#FFF");
      svg.append("circle")
        .attr("cx", 390)
        .attr("cy", 315)
        .attr("r", 5)
        .attr("fill", "red");
      svg.append("circle")
        .attr("cx", 390)
        .attr("cy", 335)
        .attr("r", 5)
        .attr("fill", "green");
      svg.append("text")
        .attr("x", 398)
        .attr("y", 319)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif") 
        .attr("font-size", ".7em")
        .attr("fill", "black")
        .text("Rider With Doping Allegations");
      svg.append("text")
        .attr("x", 398)
        .attr("y", 339)
        .attr("text-anchor", "left")
        .attr("font-family", "sans-serif") 
        .attr("font-size", ".7em")
        .attr("fill", "black")
        .text("Rider With No Doping Allegations");
    
    });
}

fetchJSON();