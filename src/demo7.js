/*
    DEMO7 Nested Selections
    https://bost.ocks.org/mike/nest/
 */

import * as d3 from "d3";

const data = [
    [ 0,  1,  2,  3],
    [ 4,  5,  6,  7],
    [ 8,  9, 10, 11],
    [12, 13, 14, 15],
];

const table = d3.select("#demo-7")
    .append("table");

const tr = table.selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

const td = tr.selectAll("td")
    .data(d => d)
    .enter()
    .append("td")
    .text(d => d);
