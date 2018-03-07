let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales

setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();
AppendLegend()

// 1. Definition of the canvas and its dimensions
function setupCanvasSize() {
  margin = {top: 30, left: 100, bottom: 60, right: 130};
  width = 600 - margin.left - margin.right;
  height = 550 - margin.top - margin.bottom;
}

function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
              ;
}

// 2. Configuration of the axis
function setupXScale()
{
  x = d3.scaleBand()
    .range([0, width])
    .domain(totalun.map(function(d, i) {
      return d.Town;
    }));

}

function setupYScale()
{
  var maxun = d3.max(totalun, function(d, i) {
    return d.Population;
  });

  y = d3.scaleLinear()
    .rangeRound([height,0])
    .domain([0, maxun]);    
}

// 3. Insertion of the axis
function appendXAxis() {
  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
}

function appendYAxis() {
  //   
  // Add the Y Axis
  svg.append("g")   

  .call(d3.axisLeft(y));
}

function appendChartBars()
{
  // 4. Now let's select all the rectangles inside that svg
  
  var rects = svg.selectAll('rect')
    .data(totalun);

    // Now it's time to append to the list of Rectangles we already have
    var newRects = rects.enter();

barColor = d3.scaleOrdinal()
    .range (["#000000","#200138","#48077E","#782EB5","#9255C5","#B89AD1"]);
    
newRects.append('rect')
      .attr('x', function(d, i) {
        return x(d.Town);
      })
      .attr('y', function(d) {
        return y(d.Population);
      })     
      .attr('height', function(d, i) {
        return height - y(d.Population);
      // This subtraction is due to the inserse scale of the y axis.
      })
      .attr('width', x.bandwidth() - 20)     
      .attr('fill', function(d) {
      return barColor(d.Town);
      })

}
svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 5) + ")")
      .style("text-anchor", "middle")
      .text("Town")
  
svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y",-60)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Unemployed Population");

function AppendLegend() {
  // building a legend is as simple as binding
  // more elements to the same data. in this case,
  // <text> tags
  svg.append('g')
    .attr('class', 'legend')
      .selectAll('text')
      .data(totalun)
        .enter()
          .append('text')
            .text(function(d) { return '* ' + d.Town; })
            .attr('fill', function(d) { return barColor(d.Town); })
            .attr('y', function(d, i) { return 20 * (i + 1); })  
            .attr('x', function(d, i) { return 7 * (i + 35); })         
          }

