import * as d3 from "d3";
import "./index.css";
import "./index.scss";

d3.select("body")
	.selectAll("p")
	.data([123123123123, 8, 15, 123, 2333, 123])
	.enter().append("p")
	.text(function(d) { return "I’m number " + d + "!"; });
