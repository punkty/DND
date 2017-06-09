let charList = document.querySelector('.charList') 
let form = document.getElementById("addPlayerForm");
let currCharacters = []
function Player(){
    this.name;
    this.armorClass;
    this.initiative;
}

function addPlayer(){
    let hero = new Player()
    if(!form.elements[0].value ||!form.elements[1].value || !form.elements[2].value){ return }
    let portrait;
    if(form.elements[0].value == "MONSTERS"){
        portrait = "resources/img/1.bmp"
    } else {
        portrait =  `resources/img/${randomInt(2,40)}.bmp`
    }
    hero.name = form.elements[0].value;
    hero.armorClass = form.elements[1].value;
    hero.initiative = form.elements[2].value;
    let heroCard = `
        <section class="character">
            <img src='${portrait}' alt="${hero.name}"/>
            <p class="charName">${hero.name}</p>
            <p>AC: ${hero.armorClass}</p>
            <p>Initiative: ${hero.initiative}</p>
            <input type="number" name="mod" class="mod"/>
            <button>Re-roll</button>
            <button>Delete</button>
        </section>
    `
    charList.insertAdjacentHTML("beforebegin", heroCard);
    currCharacters.push(hero)
    for (let i = 0; i < form.length; i++){
        form.elements[i].value = "";
    }
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
