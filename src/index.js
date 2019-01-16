import * as d3 from "d3";
import "./index.scss";


/*
  DEMO2 start
*/

const demo2 = {
    width: 420,
    barHeight: 20,
    data: [4, 8, 15, 16, 23, 42],
};

const demo2_chart = d3.select(".chart-svg")
    .attr("width", demo2.width)
    .attr("height", demo2.barHeight * demo2.data.length);

const demo2_x = d3.scaleLinear().domain([0, d3.max(demo2.data)]).range([0, demo2.width]);

const demo2_bar = demo2_chart
    .selectAll("g")
    .data(demo2.data)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * demo2.barHeight})`);

demo2_bar
    .append("rect")
    .attr("width", demo2_x)
    .attr("height", demo2.barHeight - 1);

demo2_bar
    .append("text")
    .attr("x", d => demo2_x(d) -3 )
    .attr("y", demo2.barHeight / 2)
    .attr("dy", ".3em")
    .text(d => d);


/*
  DEMO 1 Start

*/

const chart_data = [30, 86, 168, 281, 303, 365];

d3.select(".chart")
    .selectAll("dev")
    .data(chart_data)
    .enter()
    .append("div")
    .style("width", d => `${d}px`)
    .text(d => d);
