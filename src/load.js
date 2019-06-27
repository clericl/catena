export const initLoad = () => {

    let pathLength;
    const width = 50;
    const height = 50;
    const radius = 25;
    const numDashes = 2;
    const spacing = .5;
    
    const svg = d3.select("#svg")
        .append("svg")
        .classed("load", true)
        .attr("width", 100)
        .attr("height", 100);
    
    const wheel = svg.append("path")
        .attr("d", `M ${width / 2 + radius}, ${height / 2}
            a ${radius} ${radius} 0 1 1 0 ${radius * 2}
            ${radius} ${radius} 0 1 1 0 ${-radius * 2} z`)
        .attr("fill", "none")
        .attr("stroke-width", 5)
        .attr("stroke-dasharray", function () {
            pathLength = this.getTotalLength();
            return [(pathLength / numDashes) * (1 - spacing), (pathLength / numDashes) * spacing].join(' ');
        })
        .attr("stroke-dashoffset", (pathLength / numDashes) * (1 - spacing) / 2);
    
    const forwardTween = () => {
        return d3.interpolateString(`rotate(0, 50, 50)`, `rotate(360, 50, 50)`);
    };

    const backwardTween = () => {
        return d3.interpolateString(`rotate(360, 50, 50)`, `rotate(0, 50, 50)`);
    };
    
    wheel.attr("stroke", "black")
        .transition()
            .on("start", function repeat() {
                d3.active(this)
                    .transition()
                        .duration(4000)
                        .attr("stroke", "#dcdcdc")
                        .attrTween("transform", forwardTween)
                    .transition()
                        .duration(4000)
                        .attr("stroke", "black")
                        .attrTween("transform", backwardTween)
                    .on("start", repeat);
            });

}

export const drawLoad = seed => {
    const svg = d3.select("#svg")
        .append("svg")
    
    const text = svg.append("text")
        .classed("building", true)
            .text(`Building chain: ${seed.word}`)

    const box = text.node().getBBox();

    svg.attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`)
        .attr("width", `${box.width}`)
        .attr("height", `${box.height}`);
}