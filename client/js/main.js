let charList = document.querySelector('.charList') 
let addPlayerForm = document.getElementById("addPlayerForm")
let currCharacters = []
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
        healthDisplay = document.querySelector(`span[data-index="${this.id}"]`)
        healthDisplay.textContent = `${this.health}`
    }
    this.hpUp = () => {
        this.health += 1
        healthDisplay = document.querySelector(`span[data-index="${this.id}"]`)
        healthDisplay.textContent = `${this.health}`
        sendUpdate()
    }
    this.hpDown = () => {
        this.health -= 1
        healthDisplay = document.querySelector(`span[data-index="${this.id}"]`)
        healthDisplay.textContent = `${this.health}`
        sendUpdate()
    }
    this.setup = () => {
        // Create new character card with styling class
        let heroCard = document.createElement('section')
        heroCard.classList.add('character')
        heroCard.setAttribute('data-index', this.id)

        // Create and add randomly generated portrait to card
        let cardPortrait = document.createElement('img')
        cardPortrait.src = this.portraitSrc
        cardPortrait.alt = this.name
        heroCard.appendChild(cardPortrait)

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
        cardInitiative.textContent = `Initiative: ${this.initiative}`
        heroCard.appendChild(cardInitiative)
        
        // Create and add initiative hero form
        let initiativeForm = document.createElement('form')
        initiativeForm.setAttribute('id','initiativeForm')

        let initiativeInput = document.createElement('input')
        initiativeInput.setAttribute('type', 'number')
        initiativeInput.classList.add('initInput')
        this.initiativeInput = initiativeInput
        initiativeForm.appendChild(initiativeInput)
        heroCard.appendChild(initiativeForm)

        // Submit and input field for new initiative
        let submitInitiativeButton = document.createElement('button')
        submitInitiativeButton.textContent = "Submit"
        heroCard.appendChild(submitInitiativeButton)
        // Create and add delete button to card
        let deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete"
        heroCard.appendChild(deleteButton)
    //         <p>Initiative: ${hero.initiative}</p>
        // console.log(heroCard)
        // charList.insertAdjacentHTML("beforebegin", heroCard)
        charList.appendChild(heroCard)
        currCharacters.push(this)
        
    }
}

function updateRecieved(data){
    if(!data){return}
    data.forEach(charData => {
        const match = currCharacters.find(character => character.id == charData.id)
        if(!match){
            playerFromData(charData)
            UID.add(charData.id)
        } else {
            match.updateAttributes(charData)
            match.updateCard()
        }
    })
}

function fillForm(){
    addPlayerForm.elements[0].value = "Test"
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
    // let heroCard = `
    //     <section class="character">
    //         <img src='${portrait}' alt="${hero.name}"/>
    //         <p class="charName">${hero.name}</p>
    //         <button onclick="currCharacters[${hero.index}].hpUp()" class="hpButton">+</button><p>HP: <span data-index="${hero.index}">${hero.health}</span> / ${hero.maxHealth}</p><button onclick="currCharacters[${hero.index}].hpDown(${hero.index})" class="hpButton">-</button>
    //         <p>AC: ${hero.armorClass}</p>
    //         <p>Initiative: ${hero.initiative}</p>
    //         <input type="number" name="mod" class="mod"/>
    //         <button>Re-roll</button>
    //         <button>Delete</button>
    //     </section>
    // `
    hero.setup()
    addPlayerForm.reset()
    sendUpdate()
}

