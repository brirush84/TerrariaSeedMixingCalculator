const seeds = [];

const combinationEffects = [];

function addSeed(name, codes, special, description) {
    const theSeed = {
        'kind': 'SEED',
        'name': name,
        'codes': codes,
        'realCodes': codes.map(c => c.toLowerCase().replaceAll('[^0-9a-z]', '')),
        'description': description,
        'special': special,
        'exist': true,
        'not': function() {
            return {
                'kind': this.kind,
                'name': this.name,
                'codes': this.codes,
                'realCodes': this.realCodes,
                'description': this.description,
                'special': this.special,
                'exist': !this.exist,
                'not': this.not
            };
        }
    }
    seeds.push(theSeed);
    return theSeed;
}

function addCombo(seeds, effects) {
    combinationEffects.push({
        'seeds': seeds,
        'effects': effects
    })
}

function secretSeedsCount(min, max) {
    return {
        'kind': 'COUNT',
        'min': min,
        'max': max
    }
}

function seedOr(seeds) {
    if(seeds.some(s => s.kind != 'SEED')) throw 'Can\'t have an union with non seeds';
    return {
        'kind': 'OR',
        'seeds': seeds
    }
}

