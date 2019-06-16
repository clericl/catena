# Catena

An interactive tool to visualize English word etymology.

## Overview

### Motivations

Language and culture are inextricable from each other. Words carry the weight of time and place, holding onto the common emotions, ideas, and the other most salient parts of life that people need to share their experiences. Etymology is a way to explore these ideas and bridge time and place, seeing how different peoples across different eras find similarities in the things they need to express to each other. Realizing these connections in a data visualization is a fantastic way to reach back in time to see how cultures overlap, evolve, and come together into the English language we know today.

### High-level Overview

Users will enter a word and then be presented with its etymology, etymological siblings, and other information such as famous quotes. Nodes will be identified by the language family they belong to and will be sortable by such. Navigation through nodes will present an interactive way to traverse the language tree and move through adjacent etymologies, forming a complete picture of the development of the English language. All information is sourced from a Wiktionary dump provided by Gerard de Melo (http://www1.icsi.berkeley.edu/~demelo/etymwn/).

## Functionality

### MVP Features
 
* Users will be able to enter a word and be presented with its details
* Nodes representing words will be connected in a tree diagram
* Clicking through nodes will allow users to navigate through the tree
* Styling (make it an actual tree!)

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
