import buildTree from './tree';
import { drawLoad } from './load';

export const draw = source => {

    const svg = d3.select("#svg")
        .append("svg")
            .attr("width", 800)
            .attr("height", 800);

    const windowScale = d3.scaleLinear()
        .domain([0, 2000])
        .range([500, 2000]);

    const box = getBoxMeasure(svg, source);
    svg.attr("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`)
        .attr("width", `${windowScale(box.width)}`)
        .attr("height", `${windowScale(box.height)}`);

    const t = svg.transition()
        .duration(300);

    let pathLength;
    const pathTween = () => d3.interpolateNumber(pathLength, 0);

    svg.selectAll("path")
        .data(source.links(), d => d.source.id)
        .enter()
        .append("path")
            .classed("path", true)
            .attr("stroke", "none")
            .attr("d", d3.linkRadial()
                .angle(d => (d.x * Math.PI / 180))
                .radius(d => d.y))
            .attr("stroke-dasharray", function () {
                return pathLength = this.getTotalLength();
            })
            .attr("stroke-dashoffset", 0)
            .transition(t)
                .ease(d3.easeLinear)
                .attr("stroke", "black")
                .attrTween("stroke-dashoffset", pathTween);

    const nodes = svg.selectAll("g")
        .data(source.descendants(), d => d.id)
        .enter()
        .append("g")
            .classed("node", true)
            .attr("opacity", 0)
            .attr("transform", d => `
                    rotate(${d.x - 90})
                    translate(${d.y}, 0)
                `)
        .call(
            select => select.transition(t)
                .transition(t)
                    .delay((d, i) => i * 20)
                    .ease(d3.easeLinear)
                    .attr("opacity", 1)
        );
    
    drawNodes(nodes);

}

export const getBoxMeasure = (svg, source) => {

    const nodes = svg.selectAll("g")
        .data(source.descendants(), d => d.id)
        .enter().append("g")
            .attr("opacity", 0)
            .attr("fill", "none")
            .attr("transform", d => `
                    rotate(${d.x - 90})
                    translate(${d.y}, 0)
                `);
    
    drawNodes(nodes);

    const box = svg.node().getBBox(); 
    nodes.remove();
    return box;

}

export const drawNodes = nodes => {

    nodes.call(
        select => select.append("circle")
                .classed("circle", true)
                .attr("r", d => (d.height + 5))
        )
    .call(
        select => select.append("text")
                .text(d => d.data.word)
                .classed("text", true)
                .attr("font-size", d => (10 + (3 * d.height)))
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
                .attr("font-size", d => (10 + (3 * d.height)))
        )
    .call(
        select => select.append("text")
                .text(d => `(${d.data.source})`)
                .classed("text", true)
                .attr("dy", "1em")
                .attr("font-size", d => (7 + (d.height)))
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
                .attr("font-size", d => (7 + (d.height)))
        );

}

export const discard = svg => {
    if (!svg.empty()) {
        return svg.transition()
                .duration(300)
                .attrTween("opacity", d => d3.interpolateNumber(1, 0.0001))
            .end();
    } else {
        return Promise.resolve(true);
    }
}

export const update = seed => {
    
    const svg = d3.select("svg");
    const input = document.querySelector("#seed-input");
    input.setAttribute("disabled", true);

    discard(svg).then(
        res => {
            svg.remove();
            drawLoad(seed);
            const sizeScale = d3.scaleLinear()
                .domain([0, 100])
                .range([50, 800]);
        
            buildTree(seed, state).then(
                root => {
                    const tree = d3.tree()
                        .size([360, sizeScale(root.descendants().length)])
                        .separation((a, b) => ((a.parent == b.parent ? 1 : 2) / a.depth))
                        (root);
                
                    root.descendants().forEach(d => (d.y = d.depth * 65));
    
                    discard(d3.select("svg")).then(res => {
                        d3.select("svg").remove();
                        draw(root);
                        input.removeAttribute("disabled");
                        setTimeout(() => input.focus(), 10);
                    })
                },
                rej => {
                    input.removeAttribute("disabled");
                    d3.select("svg").remove();
                    setTimeout(() => input.focus(), 10);
                }
            );
        }
    )
}