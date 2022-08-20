$('#fight').hide()
$('#action').hide()
$('#end').hide()


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let game = new Game(ctx)

game.generateTrees()
game.generateWeapons()
game.generatePlayers()
game.generateFirstMoveDisplay()
game.moveClicked()



