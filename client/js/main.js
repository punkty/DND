let addPlayerForm = document.getElementById("addPlayerForm")
let currCharacters = []
let TurnCards = []
let UID = new ABCid()

function Player(){
    this.name
    this.health
    this.maxHealth
    this.armorClass
    this.initiative
    this.updateAttributes = charData => {
        this.portraitSrc = charData.portraitSrc
        this.name = charData.name
        this.health = charData.health
        this.maxHealth = charData.maxHealth
        this.armorClass = charData.armorClass
        this.initiative = charData.initiative
    }
    this.updateCard = () => {
        animateHealthBar(this)
        healthDisplay = document.querySelector(`span[data-index="${this.id}"]`)
        healthDisplay.textContent = `${this.health}`
        this.initiativeElement.textContent = `Initiative: ${this.initiative}`
    }
    this.hpUp = () => {
        this.health += 1
        this.updateCard()
        sendUpdate()
    }
    this.hpDown = () => {
        this.health -= 1
        this.updateCard()
        sendUpdate()
    }
    this.delete = () => {
        currCharacters.splice(currCharacters.indexOf(this),1)
        this.cardElement.parentNode.removeChild(this.cardElement)
        sendUpdate()
    }
    this.setup = () => {
        // Create new character card with styling class
        let heroCard = document.createElement('section')
        heroCard.classList.add('character')
        heroCard.setAttribute('data-index', this.id)
        this.cardElement = heroCard

        let portraitContainer = document.createElement('div')
        portraitContainer.classList.add('portrait-container')
        heroCard.appendChild(portraitContainer)

        // Create and add randomly generated portrait to card
        let cardPortrait = document.createElement('img')
        cardPortrait.src = this.portraitSrc
        cardPortrait.alt = this.name
        portraitContainer.appendChild(cardPortrait)

        // Create health bar
        let healthBar = document.createElement('div')
        healthBar.classList.add('health-bar')
        this.healthBarElement = healthBar
        portraitContainer.appendChild(healthBar)
        animateHealthBar(this)

        // Create and add hero name to card
        let cardName = document.createElement('p')
        cardName.classList.add('charName')
        cardName.textContent = this.name
        heroCard.appendChild(cardName)

        let cardHealth = document.createElement('span')
        cardHealth.setAttribute('data-index', this.id)

        let cardMaxHealth = document.createElement('span')
        cardHealth.setAttribute('data-index', this.id)

        this.healthElement = cardHealth
        this.maxHealthElement = cardMaxHealth

        cardHealth.textContent = this.health
        cardMaxHealth.textContent = ` / ${this.maxHealth}`
        
        let healthContainer = document.createElement('p')
        healthContainer.appendChild(cardHealth)
        // healthContainer.textContent +=  " / " + hero.maxHealth
        healthContainer.appendChild(cardMaxHealth)

        // Create and add HP buttons to card
        let hpUpButton = document.createElement('button')
        hpUpButton.textContent = "+"
        hpUpButton.classList.add('hpButton')
        hpUpButton.addEventListener('click', this.hpUp.bind(this))
        heroCard.appendChild(hpUpButton);
        heroCard.appendChild(healthContainer)

        let hpDownButton = document.createElement('button')
        hpDownButton.classList.add('hpButton')
        hpDownButton.textContent = "-"
        hpDownButton.classList.add('hpButton')
        hpDownButton.addEventListener('click', this.hpDown.bind(this))
        heroCard.appendChild(hpDownButton)

        let cardAC = document.createElement('p')
        cardAC.textContent = `AC: ${this.armorClass}`
        heroCard.appendChild(cardAC)

        // Armor Class
        let cardInitiative = document.createElement('p')
        this.initiativeElement = cardInitiative
        cardInitiative.textContent = `Initiative: ${this.initiative}`
        heroCard.appendChild(cardInitiative)
        
        // Create and add initiative hero form
        let initiativeForm = document.createElement('form')
        initiativeForm.classList.add('initiativeForm')

        let initiativeInput = document.createElement('input')
        initiativeInput.setAttribute('type', 'number')
        initiativeInput.classList.add('initInput')
        this.initiativeInput = initiativeInput
        initiativeForm.appendChild(initiativeInput)
        heroCard.appendChild(initiativeForm)

        // Submit and input field for new initiative
        let submitInitiativeButton = document.createElement('button')
        submitInitiativeButton.textContent = "Submit"

        submitInitiativeButton.addEventListener('click', function(){
            this.initiative = Number(this.initiativeInput.value)
            this.initiativeInput.value = ""
            orderCards()
            sendUpdate()
            this.updateCard()
        }.bind(this))
        heroCard.appendChild(submitInitiativeButton)
        // Create and add delete button to card
        let deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete"
        deleteButton.addEventListener('click', this.delete.bind(this))
        heroCard.appendChild(deleteButton)
        charList.appendChild(heroCard)
        currCharacters.push(this)
        
    }
}

function updateRecieved(updatePkg){
    if(!updatePkg){return}
    const found = []
    updatePkg.charValues.forEach(charData => {
        const match = currCharacters.find(character => character.id == charData.id)
        if(!match){
            playerFromData(charData)
            UID.add(charData.id)
        } else {
            match.updateAttributes(charData)
            match.updateCard()
        }
        found.push(charData.id)
    })
    for (let i = currCharacters.length-1; i >= 0; i--) {
        const character = currCharacters[i]
        if (character && !found.includes(character.id)) {
            character.delete()
        }
    }
    orderCards()
}

// Turn Card functions

function turnCardsRecieved(){
    console.log('recieved turnCard signal')
    createTurnCards()
}

function turnUpdateRecieved(data){
    if(!data){return}
    currTurnCard = document.querySelector('turnCard')
    turnCards.appendChild(currTurnCard)
}

let charList = document.querySelector('.charList')
let turnCards = document.querySelector('.turnCards')

function battleQueue(){
    createTurnCards()
    sendTurnCards()
}

function takeTurn(){
    currTurnCard = document.querySelector('.turnCard')
    turnCards.appendChild(currTurnCard)
}
function createTurnCards(){
    if(turnCards.children.length > 0){
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
            takeTurn()
            sendTurnUpdate()
        })

        let turnCardName = document.createElement('h4')
        turnCardName.textContent = character.name
        turnCard.appendChild(turnCardName)
        character.turnCard = turnCard
        TurnCards.push(turnCard)
        turnCards.appendChild(turnCard)
}

function tcRecieved(charNameArr){
    createTurnCards()
}

function turnUpdateRecieved(charNameArr){
    takeTurn()
}

// End of Turn Card functions

function fillForm(){
    addPlayerForm.elements[0].value = randomName()
    addPlayerForm.elements[1].value = 20
    addPlayerForm.elements[2].value = 20
    addPlayerForm.elements[3].value = 15
    addPlayerForm.elements[4].value = randomInt(1,20)
}

function playerFromData(charData){
    let hero = new Player()
    hero.id = charData.id
    hero.updateAttributes(charData)
    hero.setup()
}
function randomName(){
    let firstNames = ["Jill","Bill","Phil","Stranky","Mooper","Bryit","Andu","Vulf","Victor","Timmy","Wilthas","Ophelia","Pappy","Pamela","Vicki","Coni","Amber","Sara","Leah","Dan","Benjamin","Michelle","Nasim","Luca","Algore","Maloc","Brandon","Doj","Porkle","Pem","Fiaz","Django","Nancy","Sparkle","Grampy","Jack","Glenn","Lars","Berry","Magic","Spider","Taco","Hawaiian","Magnus","Frothgar","Gorlok","The","Ty","Beanbag","Plebby","Mad","Andy","Larry","Karl","Margie","Miguel","Madame","Buzz","Alex","Yung","Bud","Greg","Kukrim","PJ","Alycia","David","Java","Giffy","Ray","Michael","Devon","Json","Liz","Roshawn","Charlie","Leo","Kathleen","Nick","Kai","TJ","Quinten","Sloop","Frobe"]
    let lastNames = ["People","Buckets","Dustkeeper","Hawkarrow","LoneMane","Boulderbreaker","Ashridge","Bryit","Deathseeker","Mandu","Snowmane","Kingslayer","Swiftfoot","Mountainscream","Moonshadow","Voidstrider","Moonthorn","Grandcrest","Stinkz","Rhythms","Pem","Ponies","Darksider","Saltshaker","Riverchaser","Wyvernbeard","Treegazer","Fogbinder","Dragonblood","Dawncrest","WildShard","Bronzefist","Shieldbearer","Gangletoes","FizzBuzz","Donglegoblin","Cloudstriker","Goodbrancher","Bluejeans","Coffee","Brian","Ben","the Pleb","Bingo","the Squillzord","the Forgotten","Choi","MacArver","Getsit","Button","Mongod","Swapi","John B","the Warrior","the Mage","the Thief","Bryant"]
    
    const num1 = randomInt(0, firstNames.length - 1)
    const num2 = randomInt(0, lastNames.length - 1)
    return `${firstNames[num1]} ${lastNames[num2]}`
}

function addPlayer(){
    let hero = new Player()
    if(!addPlayerForm.elements[0].value ||!addPlayerForm.elements[1].value || !addPlayerForm.elements[2].value || !addPlayerForm.elements[3].value){ return }
    if(addPlayerForm.elements[0].value == "MONSTERS"){
        hero.portraitSrc = "img/1.bmp"
    } else {
        hero.portraitSrc =  `img/${randomInt(2,40)}.bmp`
    }
    hero.id = UID.generate()
    hero.name = addPlayerForm.elements[0].value
    hero.health = Number(addPlayerForm.elements[1].value)
    hero.maxHealth = Number(addPlayerForm.elements[2].value)
    hero.armorClass = Number(addPlayerForm.elements[3].value)
    hero.initiative = Number(addPlayerForm.elements[4].value)
    hero.setup()
    addPlayerForm.reset()
    orderCards()
    sendUpdate()
}

