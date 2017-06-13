let dupesIndex = [], firstSort = true

function battleQueue() {
    // Sort characters from start to end
    if (firstSort) {
        dupesIndex = [[0,currCharacters.length-1]]
    }
    firstSort = false
    // sort the subsets
    for (let i = 0; i < dupesIndex.length; i++) {
        sortInitiative(dupesIndex[i][0],dupesIndex[i][1])
        updateCharacterOrder()
        console.log(i)
    }
    // if there are no duplicates in currCharacters return
    if (!containsDupes()) {
        firstSort = true
        console.log('no dupes here ;)', dupesIndex)
        dupesIndex = []
        currCharacters.forEach(char => char.tempInitiative = char.initiative)
        updateCharacterOrder()
        return
    }
    let tempdupes = []
    // Find new duplicates in currCharacters
    for (let i = 0; i < dupesIndex.length; i++) {
        // When found, store the idxs
        tempdupes.push(...getDupes(dupesIndex[i][0],dupesIndex[i][1]))
    }
    updateCharacterOrder()
    // reset dupes
    dupesIndex = tempdupes
    console.log('end', dupesIndex)
}

function sortInitiative(start, end) {
    const subset = currCharacters.slice(start,end+1)
    subset.sort((a,b) => {
        if (a.tempInitiative < b.tempInitiative) return 1
        if (a.tempInitiative > b.tempInitiative) return -1
        if (a.tempInitiative === b.tempInitiative) return 0
    })
    let i = start, j = 0
    while (j < subset.length) {
        currCharacters[i] = subset[j]
        j++
        i++
    }
}

function containsDupes() {
    for (let i = 0; i < dupesIndex.length; i++) {
        const start = dupesIndex[i][0], 
            end = dupesIndex[i][1],
            dupes = {}
        for (let i = start; i <= end; i++) {
            const character = currCharacters[i]
            if (dupes[character.tempInitiative]) {
                return true
            }
            dupes[character.tempInitiative] = true
        }
    }
    return false
}

function getDupes(start,end) {
    const dupes = {}
    for (let i = start; i <= end; i++) {
        if (dupes[currCharacters[i].tempInitiative]) {
            dupes[currCharacters[i].tempInitiative].push(i)
            currCharacters[i].isDupe = true
            const index = dupes[currCharacters[i].tempInitiative][0]
            currCharacters[index].isDupe = true
        } else {
            dupes[currCharacters[i].tempInitiative] = [i]
            currCharacters[i].isDupe = false
        }
    }
    const dupesarr = []
    for (let i in dupes) {
        const dupe = dupes[i]
        if (dupe.length > 1) {
            dupesarr.push([ dupe[0], dupe[dupe.length-1] ])
        }
    }
    console.log(dupesarr)
    return dupesarr
}
