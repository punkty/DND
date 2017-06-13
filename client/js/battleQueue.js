let charList = document.querySelector('.charList')
let turnCards = document.querySelector('.turnCards')
function battleQueue(){
    createTurnCards()
    sendUpdate()
}

function createTurnCards(){
    if(turnCards.children.length > 1){
        turnCards.innerHTML = ""
    }
    currCharacters.forEach(character => {
        turnCardSetup(character)
    })
}

function turnCardSetup(character){
        let turnCard = document.createElement('section')
        turnCard.classList.add('turnCard')
        turnCard.addEventListener('click', function(){
            turnCards.appendChild(this)
        })
        let turnCardName = document.createElement('h4')
        turnCardName.textContent = character.name
        turnCard.appendChild(turnCardName)
        character.turnCard = turnCard
        turnCards.appendChild(turnCard)
}

function orderCards(){
    currCharacters.sort(function(a,b){
        return a.initiative == b.initiative
        ? 0 :(a.initiative < b.initiative ? 1 : -1)
    })
    for(i = 0; i < currCharacters.length; i++){
        charList.appendChild(currCharacters[i].cardElement)
    }
}