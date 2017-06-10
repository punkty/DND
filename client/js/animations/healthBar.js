function animateHealthBar(player) {
    const percentage = 100 - (Math.floor((player.health/player.maxHealth) * 100))
    player.healthBarElement.style.height = `${percentage}%`
}