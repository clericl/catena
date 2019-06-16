import * as radial from './radial';
import * as util from './util';
import drawLoad from './load';

window.state = null;
drawLoad();

const input = document.getElementById("seed-input");
input.setAttribute("disabled", true);

d3.json("https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/silvadb/by_etym.json")
    .then(data => {
        window.state = data;
        console.log("ready");

        const seed = util.find("catena");
        radial.update(seed);
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
    }    
});