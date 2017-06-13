const socket = io.connect()

socket.on('update', updateRecieved)

function sendUpdate(){
    const charValues = []
    currCharacters.forEach(character =>{
        const charData = {}
        charData.id = character.id
        charData.portraitSrc = character.portraitSrc
        charData.name = character.name
        charData.health = character.health
        charData.maxHealth = character.maxHealth
        charData.armorClass = character.armorClass
        charData.initiative = character.initiative
        charData.tempInitiative = character.tempInitiative
        charData.isDupe = character.isDupe
        charValues.push(charData)
    })
    socket.emit('update', charValues)
}