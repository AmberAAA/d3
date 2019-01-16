import * as d3 from "d3";

/* eslint-disable-next-line */
console.log(d3.version);

d3.selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .style("font-size", (d) => `${d}px`)
    .enter()
    .append("p")
    .text(d => d)
    .style("font-size", (d) => `${d}px`);
