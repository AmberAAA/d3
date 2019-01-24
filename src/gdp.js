/*
    DEMO8 Nested Selections
 */

import * as d3 from "d3";

const config = {
    width: 640,
    barHeight: 30,
    margin: 60,
    maxSize: 10
};

let Countries = [];

function findOneYear (data, year) {
    return data.filter(d => d.Year == year);
}

function sort (data, key) {
    return data.sort((a, b) =>  b[key] - a[key]).filter((d, i) => i < config.maxSize);
}

d3.csv("/static/country.csv", d => d.Countries)
    .then(data => {
        Countries = data;
        return d3.csv("/static/data.csv", data => {
            data.Value = data.Value / 1e8;
            return data;
        });
    })
    .then(d => {
        let gdps = d.filter(d => Countries.indexOf(d["Country Name"]) > -1);
        let gdps_top10 = sort(findOneYear(gdps, 2015), "Value");
        draw(gdps_top10);
    });

function draw (data) {

    const x = d3.scaleLinear().range([config.margin, config.width + config.margin]).domain([0, d3.max(data, d => d.Value)]);
    const y = d3.scaleBand().domain(data.map( d => d["Country Code"])).range([config.margin, config.margin + config.maxSize * config.barHeight]).padding(0.1);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).tickSizeOuter(0);
    // d3.scaleBand().domain(demo4.data.map(item => item.letter)).range([demo4.margin, demo4.margin + demo4.chart_width]).padding(0.1)
    // const y = d3.scaleBand().domain(data.map(item => item["Country Code"])).range([config.margin, config.margin + config.width]).padding(0.1);


    window.x =x;

    // const yAxis = d3.axisLeft(y).tickSizeOuter(0);

    const svg = d3.select("#demo-8 svg")
        .attr("width", config.width + config.margin * 2)
        .attr("height", config.barHeight * config.maxSize + config.margin * 2);

    const g = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(0, ${config.barHeight * i + config.margin})`);

    g.append("rect")
        .attr("width", d => x(d.Value) - config.margin)
        .attr("x", config.margin)
        .attr("height", config.barHeight - 2)
        .attr("fill", "steelblue");

    g.append("text")
        .attr("x", d => x(d.Value))
        .attr("y",  12)
        .attr("dx", "-.3em")
        .text(d => d["Country Code"]);

    svg.append("g")
        .attr("class", "x-axis")
        // .attr("transform", `translate(${demo4.margin}, 0)`)
        .call(xAxis);
    // .call(g => g.select(".domain").remove());


    svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${config.margin}, 0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove());

}



