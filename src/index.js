import * as radial from './radial';
import * as util from './util';
import { initLoad } from './load';

initLoad();
window.state = null;

const input = document.querySelector("#seed-input");
const helpIcon = document.querySelector("#help-icon");
const helpText = document.querySelector(".help-text");
const loading = document.querySelector(".loading");
const info = document.querySelector(".info");
const infoChange = document.querySelector(".info-change");
input.setAttribute("disabled", true);

d3.select("#count")
    .transition()
        .duration(20000)
        .tween("text", function() {
            const that = d3.select(this);
            return t => that.text(d3.format(",d")(d3.interpolateNumber(0, 946866)(t)))
        })

d3.json("https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/catena-db/by_etym.json")
    .then(data => {
        window.state = data;

        const seed = util.find("catena");
        radial.update(seed);

        loading.setAttribute("style", "display: none");
        helpText.classList.add("hidden");
        helpIcon.classList.remove("help-icon-dark");
        helpIcon.classList.add("help-icon");
        info.removeAttribute("style");
    });

input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        const seed = util.find(input.value);
        if (seed) {
            radial.update(seed)
        } else {
            alert("don't have that word in the database :(")
        }   
        input.value = "";
        infoChange.textContent = "Enter your word above."
    }    
});

input.addEventListener("input", e => {
    if (e.currentTarget.value.length > 0) {
        infoChange.textContent = "Press Enter to build your chain."
    } else {
        infoChange.textContent = "Enter your word above."
    }
});

// input.addEventListener("focus", e => {
//     e.currentTarget.placeholder = "";
// });

// input.addEventListener("blur", e => {
//     e.currentTarget.placeholder = "/caˈtē.na/";
// })

helpIcon.addEventListener("mouseenter", e => {
    helpText.classList.remove("hidden");
});

helpIcon.addEventListener("mouseleave", e => {
    helpText.classList.add("hidden");
});