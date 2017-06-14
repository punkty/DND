
function orderCards(){
    currCharacters.sort(function(a,b){
        return a.initiative == b.initiative
        ? 0 :(a.initiative < b.initiative ? 1 : -1)
    })
    for(i = 0; i < currCharacters.length; i++){
        charList.appendChild(currCharacters[i].cardElement)
    }
}