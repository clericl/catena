// for console testing

// let state, seed;

// d3.json("assets/data/by_etym.json").then(function(data) {
//     state = data;
//     console.log("ready");
//   });

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
            datum.rel === "from"
        ));
    }

    const last = ancestors[ancestors.length - 1];

    ancestors.push({
        word: last.targetWord,
        source: last.targetSource,
        rel: "from",
        targetWord: undefined,
        targetSource: undefined
    })

    return ancestors;
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

const buildHierarchy = branches => {
    try {
        return d3.stratify()
            .id(d => ([d.word, d.source].join("")))
            .parentId(d => ([d.targetWord, d.targetSource].join("")))
            (branches);
    } catch (e) {
        alert("database did an oopsie :( try a different word?");
        return false;
    }
}

const buildTree = (seed, state) => {
    return new Promise((resolve, reject) => {
        const ancestors = buildTrunk(seed, state);
        const root = ancestors[ancestors.length - 1];
        const tree = buildBranches(root, state);
        const rootNode = buildHierarchy(tree);
        rootNode ? resolve(rootNode) : reject(rootNode);
    })
}

export default buildTree;