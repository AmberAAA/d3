import * as d3 from "d3";

d3.select("body")
	.selectAll("p")
	.data([1,2,3,4,5])
	.enter().append("p")
	.text(function(d) { return "I’m number " + d + "!"; });
