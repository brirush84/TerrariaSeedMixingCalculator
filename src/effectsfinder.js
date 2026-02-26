function findEffects(seedsText) {
    let effects = [];
    for(let combi of combinationEffects) {
        if(seedsCorrespond(seedsText, combi)) {
            effects.push(...combi.effects);
        }
    }
    return effects;
}
function seedsCorrespond(seedsText, conditions) {
    for(let condition of conditions.seeds) {
        switch (condition.kind) {
            case 'SEED':
                if(condition.exist) {
                    if(!seedsText.includes(condition.name)) return false;
                } else {
                    if(seedsText.includes(condition.name)) return false;
                }
                break;
            case 'OR':
                let match = false;
                for(let seed of condition.seeds) {
                    if(seed.exist) {
                        if(seedsText.includes(seed.name)) {
                            match = true;
                            break;
                        }
                    } else {
                        if(!seedsText.includes(seed.name)) {
                            match = true;
                            break;
                        }
                    }
                }
                if(!match) return false;
                break;
            case 'COUNT':
                let l = seedsText.length;
                if(l < condition.min || (condition.max != -1 && l > condition.max)) return false;
                break;
            default:
                throw 'Invalid kind: ' + condition.kind;
        }
    }
    return true;
}