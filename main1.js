<!DOCTYPE html>
<!-- How to create Mouse Events for D3 -->
<html>
 <head>
      <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

    <!-- CSS (Styling) -->
    

  </head>

  <body>
    <!-- Begin Javascript -->
    <link rel="stylesheet" href="./styles.css" />
    <script src="./data.js"></script>
    <script src="./main.js"></script>
    <script type="text/javascript">
      var w = window.innerWidth,
          h = window.innerHeight,
          margin = { top: 40, right: 80, bottom: 60, left: 100 },
          radius = 8;

      var svg = d3.select("body").append("svg").attr({
        width: w,
        height: h
      });

   

var malaga =  [ 
    {"Year":1998,"Value":528079}, 
    {"Year":1999,"Value":530553}, 
    {"Year":2002,"Value":535686}, 
    {"Year":2003,"Value":547105}, 
    {"Year":2004,"Value":547731}, 
    {"Year":2005,"Value":558287}, 
    {"Year":2006,"Value":560631}, 
    {"Year":2007,"Value":561250}, 
    {"Year":2008,"Value":566447}, 
    {"Year":2009,"Value":568305}, 
    {"Year":2010,"Value":568507}, 
    {"Year":2011,"Value":568030}, 
    {"Year":2012,"Value":567433}, 
    {"Year":2013,"Value":568479}, 
    {"Year":2014,"Value":566913}, 
    {"Year":2015,"Value":569130} 
    ];


      // We're passing in a function in d3.max to tell it what we're maxing (x value)
      var xScale = d3.scale.linear()                //return d.Year
          .domain([1997, d3.max(malaga, function (d) { return d.Year; })])
          .range([margin.left, w - margin.right]);  // Set margins for x specific

      // We're passing in a function in d3.max to tell it what we're maxing (y value)
      var yScale = d3.scale.linear()               //return d.Value
          .domain([d3.max(malaga, function (d) { return d.Value + 10; }),528000])
          .range([margin.top, h - margin.bottom]);  // Set margins for y specific

      // Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
      var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(d3.format(''));
               
      var yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(d3.format(''));

      var circleAttrs = {              //d.Year y d.Value
          cx: function(d) { return xScale(d.Year); },
          cy: function(d) { return yScale(d.Value); },
          r: radius
      };
      // Adds X-Axis as a 'g' element
      svg.append("g").attr({
        "class": "axis",  // Give class so we can style it
        transform: "translate(" + [0, margin.bottom+492] + ")"  // Translate just moves it down into position (or will be on top)
      }).call(xAxis);  // Call the xAxis function on the group

      // Adds Y-Axis as a 'g' element
      svg.append("g").attr({
        "class": "axis",
        transform: "translate(" + [margin.left, 0] + ")"
      }).call(yAxis);  // Call the yAxis function on the group

      svg.selectAll("circle")
          .data(malaga)
          .enter()
          .append("circle")
          .attr(circleAttrs)  // Get attributes from circleAttrs var
          .on("mouseover", MouseOver)
          .on("mouseout", MouseOut);

      // On Click, we want to add data to the array and chart
      svg.on("click", function() {
          var coords = d3.mouse(this);

          // Normally we go from data to pixels, but here we're doing pixels to data
          var newData= {
            x: Math.round( xScale.invert(coords[0])),  // Takes the pixel number to convert to number
            y: Math.round( yScale.invert(coords[1]))
          };
        
          malaga.push(newData);   // Push data to our array
          
          svg.selectAll("circle")  // For new circle, go through the update process
            .data(malaga)
            .enter()
            .append("circle")
            .attr(circleAttrs)  // Get attributes from circleAttrs var
            .on("mouseover", MouseOver)
            .on("mouseout", MouseOut);
        })

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
              return [d.Year, d.Value];  // Value of the text
            });
          }

      function MouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).attr({
              fill: "black",
              r: radius
            });

            // Select text by id and then remove
            d3.select("#t" + d.Year + "-" + d.Value + "-" + i).remove();  // Remove text location
          }

    </script>
  </body>
</html>
