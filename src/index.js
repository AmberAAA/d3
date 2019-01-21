import * as d3 from "d3";
import "./index.scss";
import data_set from "@observablehq/alphabet";
import "./demo5";
import "./demo6";

window.d3 = d3;
/*
    DEMO4 start
 */

const demo4 = {
    chart_width: 640,
    chart_height: 480,
    margin: 30,
    data: data_set.sort((a, b) => b.frequency - a.frequency)
};

demo4.bar_width = (demo4.chart_width - demo4.margin * 2) / demo4.data.length;

demo4.y = d3.scaleLinear().range([demo4.chart_height + demo4.margin, demo4.margin]).domain([0, d3.max(demo4.data, d => d.frequency)]).nice();

demo4.x = d3.scaleBand().domain(demo4.data.map(item => item.letter)).range([demo4.margin, demo4.margin + demo4.chart_width]).padding(0.1);

const demo4_chart = d3
    .select(".chart-svg-3")
    .attr("height", demo4.chart_height + demo4.margin * 2)
    .attr("width", demo4.chart_width + demo4.margin * 2);

const demo4_bar = demo4_chart
    .selectAll("g")
    .data(demo4.data)
    .enter()
    .append("g")
    // .attr("transform", (d, i) => `translate(${+i * +demo4.bar_width},0)`)
    .attr("transform", (d) => `translate(${demo4.x(d.letter)},0)`);

demo4_bar.append("rect")
    .attr("y", d => demo4.y(d.frequency))
    .attr("height", d => demo4.chart_height + demo4.margin - demo4.y(d.frequency))
    .attr("width", demo4.bar_width -1);

const xAxis = d3.axisBottom(demo4.x).tickSizeOuter(0);

const yAxis = d3.axisLeft(demo4.y);

demo4_chart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${demo4.chart_height + demo4.margin})`)
    .call(xAxis);

demo4_chart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(${demo4.margin}, 0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove());


/*
  DEMO3 start
*/

const demo3 = {
    width: 420,
    barHeight: 20
};

const demo3_x = d3.scaleLinear().range([0, demo3.width]);

const demo3_chart = d3.select(".chart-svg-2")
    .attr("width", demo3.width);

const demo3_type = (d) => {
    d.value = +d.value;
    return d;
};

d3.tsv("/static/data.tsv")
    .then(data => {

        data.every(demo3_type);

        demo3_x.domain([0, d3.max(data, (d) => d.value)]);

        demo3_chart.attr("height", data.length * demo3.barHeight);

        const demo3_bar = demo3_chart
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => `translate(0, ${i * demo3.barHeight})`);

        demo3_bar
            .append("rect")
            .attr("width", d => demo3_x(d.value))
            .attr("height", demo3.barHeight - 1);

        demo3_bar
            .append("text")
            .attr("x", d => demo3_x(d.value) -3 )
            .attr("y", demo3.barHeight / 2)
            .attr("dy", ".3em")
            .text(d => d.name);
    })
    .catch(err => {throw err;});

/*
  DEMO2 start
*/

const demo2 = {
    width: 420,
    barHeight: 20,
    data: [4, 8, 15, 16, 23, 42],
};

const demo2_chart = d3.select(".chart-svg-1")
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
