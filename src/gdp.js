/*
    DEMO8 Nested Selections
 */

import * as d3 from "d3";
import { deflateRaw } from "zlib";

const config = {
    width: 420,
    barHeight: 30,
    margin: 20
}

let Countries = [];

function findOneYear (data, year) {
    return data.filter(d => d.Year == year);
}

function sort (data, key) {
    return data.sort((a, b) =>  b[key] - a[key]).filter((d, i) => i < 10);
}

d3.csv("/static/country.csv", d => d.Countries)
    .then(data => {
        Countries = data;
        return d3.csv("/static/data.csv");
    })
    .then(d => {
        let gdps = d.filter(d => Countries.indexOf(d["Country Name"]) > -1);
        let gdps_top10 = sort(findOneYear(gdps, 2017), "Value");
        draw(gdps_top10)
    })

function draw (data) {
    const svg = d3.select("#demo-8 svg")
        .attr("width", config.width)
        .attr("height", config.heigh)
}



