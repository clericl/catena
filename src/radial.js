import buildTree from './tree';
import * as util from './util';

export const init = () => {
    
    window.svg = d3.select("svg")
        .attr("width", 800)
        .attr("height", 800);

    // const radialGradient = svg.append("defs")
    //     .append("radialGradient")
    //     .attr("id", "radial-gradient");
    
    // radialGradient.append("stop")
    //     .attr("offset", "0%")
    //     .attr("stop-color", "#acd5b1");

    // radialGradient.append("stop")
    //     .attr("offset", "100%")
    //     .attr("stop-color", "#005a0b");

    d3.json("https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/silvadb/by_etym.json").then(data => {
        window.state = data;
        console.log("ready");
        
        const seed = util.find("silva");
            
        rerender(seed);
    });

}

export const update = source => {

    const links = d3.select("svg")
        .selectAll("path")
        .data(source.links())
        .join("path")
            .classed("path", true)
            .attr("d", d3.linkRadial()
                .angle(d => (d.x * Math.PI / 180))
                .radius(d => d.y)
            );

    const nodes = d3.select("svg")
        .selectAll("g")
        .data(source.descendants())
        .join("g")
            .classed("node", true)
            .attr("transform", d => `
                rotate(${d.x - 90})
                translate(${d.y}, 0)
            `);

    nodes.selectAll("circle")
        .transition()
            .duration(2000)
            .attr("transform", "translate(0, 0) scale(0)")
        .remove();

    nodes.selectAll("text")
        .transition()
            .duration(2000)
            .attr("transform", "translate(0, 0) scale(0)")
        .remove();

    const circles = nodes.append("circle")
        .classed("circle", true)
        .attr("r", d => (d.height + 5));

    const words = nodes.append("text")
            .text(d => d.data.word)
            .classed("text", true)
            .attr("font-size", d => (8 + (3 * d.height)))
            .attr("x", d => ((d.x < 180) === !d.children ? (d.height + 8) : -(d.height + 8)))
            .attr("text-anchor", d => ((d.x < 180) === !d.children ? "start" : "end"))
            .attr("transform", d => {
                if (d.children) {
                    return `rotate(${-(d.x - 90)})`
                } else {
                    return (d.x >= 180 ? "rotate(180)" : null)
                }
            })
        .clone(true).lower()
            .classed("text-shadow", true)
            .attr("stroke-width", d => (d.height + 1))
            .attr("font-size", d => (8 + (3 * d.height)));

    const sources = nodes.append("text")
            .text(d => `(${d.data.source})`)
            .classed("text", true)
            .attr("dy", "1em")
            .attr("font-size", d => (5 + (d.height)))
            .attr("x", d => ((d.x < 180) === !d.children ? (d.height + 8) : -(d.height + 8)))
            .attr("text-anchor", d => ((d.x < 180) === !d.children ? "start" : "end"))
            .attr("transform", d => {
                if (d.children) {
                    return `rotate(${-(d.x - 90)})`
                } else {
                    return (d.x >= 180 ? "rotate(180)" : null)
                }
            })
        .clone(true).lower()
            .classed("text-shadow", true)
            .attr("stroke-width", d => (d.height + 1))
            .attr("font-size", d => (5 + (d.height)))

    const box = document.getElementById("svg").getBBox();
    svg.attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);

}

export const rerender = (seed) => {

    const sizeScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, 500]);

    const root = buildTree(seed, state);
    const tree = d3.tree()
        .size([360, sizeScale(root.descendants().length)])
        .separation((a, b) => ((a.parent == b.parent ? 1 : 2) / a.depth))
        (root);

    update(root);

}