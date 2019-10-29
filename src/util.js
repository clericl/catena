export const find = word => {
    return state.find(datum =>
        datum.word === word &&
        datum.rel === "from" &&
        datum.targetWord.slice(0, 1) !== "-"
    );
}

export const fetchTree = async (seed) => {
    const url = `https://catena-exp.herokuapp.com/chains/${seed.word + seed.source}`
    try {
        const res = await fetch(url, { mode: 'cors' });
        const data = await res.json();
        if (data.rows.length) {
            return data.rows[0].tree;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(error);
    };
}

export const postTree = async (seed, tree) => {
    const url = 'https://catena-exp.herokuapp.com/chains/';
    const body = JSON.stringify({
        ancestor: seed.word + seed.source,
        tree: { tree }
    });
    try {
        const res = await fetch(url,
            {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body
            }
        );
        const data = await res.json();
        if (data.rows.length) {
            return data.rows[0].tree;
        } else {
            return false;
        };
    } catch (error) {
        throw new Error(error);
    };
}
