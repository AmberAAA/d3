import alphabet from "@observablehq/alphabet";
import * as d3 from "d3";

/* Demo5 start */
const demo5 = {
    char_width:540,
    char_height:480,
    margin: 30,
    data: alphabet.map(d => d.letter)
};

const svg = d3.select(".svg-update-1")
    .attr("width", demo5.char_width + demo5.margin * 2)
    .attr("height", demo5.char_height + demo5.margin * 2);

const g = svg.append("g")
    .attr("transform", `translate(32, ${demo5.char_height / 2})`);

function update (data) {
    const text = g.selectAll("text")
        .data(data);

    text.attr("class", "update");

    text.enter().append("text")
        .attr("class", "enter")
        .attr("x", (d, i) => i * 32)
        .attr("dy", ".35em")
        .merge(text)
        .text(d => d);

    text.exit().remove();
}

setInterval(() => {
    update(d3.shuffle(demo5.data).slice(0, Math.floor(Math.random() * 26)).sort());
}, 1000);

window.demo = demo5;
