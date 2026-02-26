const index = new Map();

function initIndex() {
    for(let seed of seeds) {
        index.set(seed.name.toLowerCase(), seed);
        for(let code of seed.codes) {
            index.set(code.toLowerCase(), seed);
        }
    }
}

function search(root) {
    let text = root.find('.search').val().trim().toLowerCase();

    let names = index.keys()
        .filter(e => e.includes(text))
        .map(e => index.get(e).name)
        .toArray();

    root.find('.seed-list').children().each((i, e) => {
        e = $(e);
        e.css({
            'display': names.includes(e.attr('name')) ? 'block' : 'none'
        });
    });
}
