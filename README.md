# Catena

An interactive tool to visualize English word etymology. [Check it out here.](https://clericl.github.io/catena/)

![tea-screenshot](https://github.com/clericl/catena/raw/master/assets/media/screenshot3.jpg "tea")

## Overview

### Motivations

Language and culture are inextricable from each other. Words carry the weight of time and place, holding within them the emotions, ideas, and other salient parts of life that link every individual person. Etymology is a way to bridge these times and places, and by tracking the etymology of a word, we can see how different peoples across different eras find similarities in the things they need to communicate. Realizing these connections in a data visualization is a fantastic way to reach back in time to see how cultures overlap, evolve, and come together in sharing our lives.

### High-level Overview

Given a word, Catena finds all of its ancestors and then finds all the words derived from each ancestor. Catena then draws out the connections between these words. The largest, innermost nodes are the ancestors furthest back, and each linked node is a word derived from that ancestor, branching out in turn to its own descendants. All information is sourced from a Wiktionary dump provided by Gerard de Melo (http://www1.icsi.berkeley.edu/~demelo/etymwn/).

![library-screenshot](https://github.com/clericl/catena/raw/master/assets/media/screenshot2.jpg "library")

The algorithm used to build the tree for each seed word first finds the seed, scans the database for the seed's parent, looks for the parent's parent, and so on until it finds an ancestor with no parent of its own. Then, it looks for each direct child of each ancestor, and then recursively finds the children for each of those children. When all the nodes have been found, the tree is stratified and fed into D3, which formats and builds the visualization.

```
const buildTrunk = (seed, state) => {
    const ancestors = [seed];
    let currentNode = seed;
    let parentNode = state.find(datum => (
        datum.word === currentNode.targetWord &&
        datum.source === currentNode.targetSource &&
        datum.rel === "from"
    ));

    while (parentNode) {
        ancestors.push(parentNode);
        currentNode = parentNode;
        parentNode = state.find(datum => (
            datum.word === currentNode.targetWord &&
            datum.source === currentNode.targetSource &&
            datum.rel === "from" &&
            !ancestors.includes(datum)
        ));
    };
}

const buildBranches = (seed, state) => {
    let branches = [seed];

    const children = state.filter(datum => (
        datum.targetWord === seed.word &&
        datum.targetSource === seed.source &&
        datum.rel === "from"
    ));

    if (children.length > 0) {
        children.forEach(child => {
            branches = branches.concat(buildBranches(child, state));
        })
    };

    return branches;
}
```

## Functionality

### MVP Features
 
* Users will be able to enter a word and be presented with its etymology and etymological relations
* Nodes representing words will be connected in a tree diagram
* Information will be presented through a minimalistic but intuitive interface

### Future Directions

* Unfortunately, the database of words that Catena currently uses is not particularly robust. Initial changes will include building a parser for Wiktionary to access the latest and most detailed information.
* This will allow the fleshing out of Catena with definitions, translations, and other related information that is currently lacking.

## Technologies

* D3.js
* Wiktionary API

## Timeline

* Day 1: Source the data that will be used.
* Day 2: Parse it into an organized and accessible format.
* Day 3: Review d3.js documentation and begin to lay out code structure.
* Day 4: Implement the data visualization.
* Day 5: Begin styling.
