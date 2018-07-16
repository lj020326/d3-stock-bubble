// custom javascript
var fdata = [
  ["bubble1", [10, 20]],
  ["bubble2", [5, 7]],
  ["bubble3", [6, 6, 10]],
  ["bubble4", [12, 14]],
  ["bubble5", [14, 4]],
  ["bubble6", [15, 5, 10]],
  ["bubble7", [10, 10]],
  ["bubble8", [25, 10]],
  ["bubble9", [10, 25, 10, 10]],
  ["bubble10", [55, 10]],
  ["bubble11", [10, 80, 10, 10]],
  ["bubble12", [50, 50]],
];


$(function() {
  console.log('jquery is working!');

  createGraph(fdata);
});


function createGraph(data) {

    var color = d3.scale.ordinal().range(["#f1eef6","#bdc9e1","#74a9cf","#0570b0"]),
        diameter = 500;

    var bubble = d3.layout.pack()
          .value(function(d) { return d3.sum(d[1]); })
          .sort(null)
          .size([diameter, diameter])
          .padding(1.5),
        arc = d3.svg.arc().innerRadius(0),
        pie = d3.layout.pie();

    var svg = d3.select("body").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var nodes = svg.selectAll("g.node")
        .data(bubble.nodes({children: data}).filter(function(d) { return !d.children; }));
    nodes.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    var arcGs = nodes.selectAll("g.arc")
        .data(function(d) {
          return pie(d[1]).map(function(m) { m.r = d.r; return m; });
        });
    var arcEnter = arcGs.enter().append("g").attr("class", "arc");

    arcEnter.append("path")
        .attr("d", function(d) {
          arc.outerRadius(d.r);
          return arc(d);
        })
        .style("fill", function(d, i) { return color(i); });

    arcEnter.append("text")
        .attr({
          x: function(d) { arc.outerRadius(d.r); return arc.centroid(d)[0]; },
          y: function(d) { arc.outerRadius(d.r); return arc.centroid(d)[1]; },
          dy: "0.35em"
        })
        .style("text-anchor", "middle")
        .text(function(d) { return d.value; });

    var labels = nodes.selectAll("text.label")
        .data(function(d) { console.log(d); return [d[0]]; });
    labels.enter().append("text")
        .attr({
          "class": "label",
          dy: "0.35em"
        })
        .style("text-anchor", "middle")
        .text(String);


}


function createGraph_orig() {
  // Code goes here
    var width = 960; // chart width
    var height = 700; // chart height
    var format = d3.format(",d");  // convert value to integer
    var color = d3.scale.category20();  // create ordinal scale with 20 colors
    var sizeOfRadius = d3.scale.pow().domain([-100,100]).range([-50,50]);  // https://github.com/mbostock/d3/wiki/Quantitative-Scales#pow

    var bubble = d3.layout.pack()
        .sort(null)  // disable sorting, use DOM tree traversal
        .size([width, height])  // chart layout size
        .padding(1)  // padding between circles
        .radius(function(d) { return 20 + (sizeOfRadius(d) * 40); });  // radius for each circle
      //  .radius(function(d) { return 20 + (sizeOfRadius(d) * 30); });  // radius for each circle

    var svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "bubble");

    // tooltip config
    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "rgba(0, 0, 0, 0.75)")
      .style("border-radius", "6px")
      .style("font", "12px sans-serif")
      .text("tooltip");

    // REQUEST THE DATA
    d3.json("/data", function(error, quotes) {
      var node = svg.selectAll('.node')
        .data(bubble.nodes(quotes)
        .filter(function(d) { return !d.children; }))
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

        node.append('circle')
          .attr('r', function(d) { return d.r; })
          .style('fill', function(d) { return color(d.symbol); });

        node.append('text')
          .attr("dy", ".3em")
          .style('text-anchor', 'middle')
          .text(function(d) { return d.symbol; });

        node.append("circle")
          .attr("r", function(d) { return d.r; })
          .style('fill', function(d) { return color(d.symbol); })

          .on("mouseover", function(d) {
            tooltip.text(d.name + ": $" + d.price);
            tooltip.style("visibility", "visible");
          })
          .on("mousemove", function() {
            return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
          })
          .on("mouseout", function(){return tooltip.style("visibility", "hidden");});



    });

}

