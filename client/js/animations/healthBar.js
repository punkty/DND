function animateHealthBar(player) {
    player.healthBarElement.style.height = (100 - ((player.health/player.maxHealth) * 100)) + '%'
}