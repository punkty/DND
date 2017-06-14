const socket = io.connect()

socket.on('update', updateRecieved)
socket.on('createTC', tcRecieved)
socket.on('turnUpdate', turnUpdateRecieved)

function sendUpdate(){
    const updatePkg = {}
    updatePkg.charValues = []
    currCharacters.forEach(character => {
        const charData = {}
        charData.id = character.id
        charData.portraitSrc = character.portraitSrc
        charData.name = character.name
        charData.health = character.health
        charData.maxHealth = character.maxHealth
        charData.armorClass = character.armorClass
        charData.initiative = character.initiative
        charData.turnCard = character.turnCard
        updatePkg.charValues.push(charData)
    })
    socket.emit('update', updatePkg)

}

function sendTurnCards(){
    turnCardPkg = {}
    turnCardPkg.cards = []
    currCharacters.forEach(character => {
        turnCardPkg.cards.push(character.name)
    })
    socket.emit('createTC')
}

function sendTurnUpdate(){
    socket.emit('turnUpdate')
}