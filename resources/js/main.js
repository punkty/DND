let charList = document.querySelector('.charList') 
let form = document.getElementById("addPlayerForm")
let currCharacters = []
let uniqueIndex = 0

function Player(){
    this.name
    this.health
    this.maxHealth
    this.armorClass
    this.initiative
    this.hpUp = () => {
        this.health += 1
        healthDisplay = document.querySelector(`span[data-index="${this.index}"]`)
        healthDisplay.textContent = `${this.health}`
    }
    this.hpDown = () => {
        this.health -= 1
        healthDisplay = document.querySelector(`span[data-index="${this.index}"]`)
        healthDisplay.textContent = `${this.health}`
    }
}

function fillForm(){
    form.elements[0].value = "Test"
    form.elements[1].value = 20
    form.elements[2].value = 15
    form.elements[3].value = randomInt(1,20)
}

function addPlayer(){
    let hero = new Player()
    if(!form.elements[0].value ||!form.elements[1].value || !form.elements[2].value || !form.elements[3].value){ return }
    let portrait
    if(form.elements[0].value == "MONSTERS"){
        portrait = "resources/img/1.bmp"
    } else {
        portrait =  `resources/img/${randomInt(2,40)}.bmp`
    }
    hero.name = form.elements[0].value
    hero.health = Number(form.elements[1].value)
    hero.maxHealth = Number(form.elements[1].value)
    hero.armorClass = Number(form.elements[2].value)
    hero.initiative = Number(form.elements[3].value)
    hero.index = uniqueIndex
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


    // Create new character card with styling class
    let heroCard = document.createElement('section')
    heroCard.classList.add('character')
    heroCard.setAttribute('data-index', hero.index)

    // Create and add randomly generated portrait to card
    let cardPortrait = document.createElement('img')
    cardPortrait.src = portrait
    cardPortrait.alt = hero.name
    heroCard.appendChild(cardPortrait)

    // Create and add hero name to card
    let cardName = document.createElement('p')
    cardName.classList.add('charName')
    cardName.textContent = hero.name
    heroCard.appendChild(cardName)

    let cardHealth = document.createElement('span')
    cardHealth.setAttribute('data-index', hero.index)

    hero.healthElement = cardHealth 
    cardHealth.textContent= hero.health
    
    let healthContainer = document.createElement('p')
    healthContainer.appendChild(cardHealth)
    // healthContainer.textContent +=  " / " + hero.maxHealth
    

    // Create and add HP buttons to card
    let hpUpButton = document.createElement('button')
    hpUpButton.textContent = "+"
    hpUpButton.classList.add('hpButton')
    hpUpButton.addEventListener('click', hero.hpUp.bind(hero))
    heroCard.appendChild(hpUpButton);
    heroCard.appendChild(healthContainer)
    let hpDownButton = document.createElement('button')
    hpDownButton.classList.add('hpButton')
    

    // console.log(heroCard)
    // charList.insertAdjacentHTML("beforebegin", heroCard)
    charList.appendChild(heroCard)
    currCharacters.push(hero)
    form.reset()
    uniqueIndex += 1
    // console.log(currCharacters)
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
