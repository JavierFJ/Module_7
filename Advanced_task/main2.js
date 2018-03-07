    var w = window.innerWidth,
          h = window.innerHeight,
          margin = { top: 40, right: 80, bottom: 200, left: 100 },
          radius = 8;

      var svg = d3.select("body").append("svg").attr({
        width: w,
        height: h
      });

      // We're passing in a function in d3.max to tell it what we're maxing (x value)
      var xScale = d3.scale.linear()                
          .domain([1997, d3.max(malaga, function (d) { return d.Year; })])
          .range([margin.left, w - margin.right]);  // Set margins for x specific

      // We're passing in a function in d3.max to tell it what we're maxing (y value)
      var yScale = d3.scale.linear()               //return d.Value
          .domain([d3.max(malaga, function (d) { return d.Value + 10; }),528000])
          .range([margin.top, h - margin.bottom]);  // Set margins for y specific

      // Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
      var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(d3.format(''));               
      var yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(d3.format(''));
    
        // Adds X-Axis as a 'g' element
      
      svg.append("g").attr({
        "class": "axis",  // Give class so we can style it
        transform: "translate(" + [0, margin.bottom+213] + ")"  // Translate just moves it down into position (or will be on top)
      }).call(xAxis)  // Call the xAxis function on the group
      .append("text")
      .attr("transform", "translate(" + 1170 + " ," + 
                     25 + ")")
      .attr("x", 100)
      .attr("dx", "-0.51em")
      .attr("text-anchor", "middle")
      .text("Year");

    
      // Adds Y-Axis as a 'g' element
      svg.append("g").attr({
        "class": "axis",
        transform: "translate(" + [margin.left, 0] + ")"
      }).call(yAxis)  // Call the yAxis function on the group
      .append("text")
       .attr("transform", "rotate(-45)")
       .attr("y", 40)
       .attr("dy", "-1.51em")
       .attr("text-anchor", "end")
       .text("Population");
    
       var circleAttrs = {              //d.Year y d.Value
        cx: function(d) { return xScale(d.Year); },
        cy: function(d) { return yScale(d.Value); },
        r: radius
    };   
       svg.selectAll("circle")
          .data(malaga)
          .enter()
          .append("circle")
          .attr(circleAttrs)  // Get attributes from circleAttrs var
          .on("mouseover", MouseOver)
          .on("mouseout", MouseOut)
          .on("click", function(d,i) { alert(["Hello, you selected:\nYear: "+d.Year+"\nPopulation: "+d.Value]); })
     
      // Create Event Handlers for mouse
      function MouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr({
              fill: "green",
              r: radius * 4
            });

            // Specify where to put label of text
            svg.append("text").attr({
               id: "t" + d.Year + "-" + d.Value + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
                x: function() { return xScale(d.Year) - 30; }, //d.Value
                y: function() { return yScale(d.Value) - 15; }
            })
            .text(function() {
              return ["Year: "+d.Year+" Population: "+d.Value];  // Value of the text
            });
          }

      function MouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "black",
              r: radius
            });

            // Select text by id and then remove
            d3.select("#t" + d.Year + "-" + d.Value + "-" + i).remove();  // Remove the text location
          }


