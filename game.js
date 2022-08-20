class Game {
    constructor(ctx) {
        this.map = new Map(80, 800, ctx)
        this.trees = []
        this.weapons = []
        this.players = []
        this.currentPlayer
        this.clicked
        this.num
        this.shift
        this.fight
    }
    generateTrees() {
        for (let i = 0; i < 10; i++) {
            this.trees.push(
                new Obstacle(
                    "img/tree_1.png",
                    this.map.coord[i],
                    this.map.pas,
                    this.map.ctx
                )
            )
        }
        /*   console.log(this.trees[0].abs/80, this.trees[0].ord/80, 'premier arbre')  */
    }

    generateWeapons() {
        this.weapons.push(
            new Weapon(
                0,
                10,
                "img/knife.png",
                [null, null],
                this.map.pas,
                this.map.ctx
            )
        )
        this.weapons.push(
            new Weapon(
                1,
                10,
                "img/knife.png",
                [null, null],
                this.map.pas,
                this.map.ctx
            )
        )
        this.weapons.push(
            new Weapon(
                2,
                20,
                "img/sword.png",
                this.map.coord[10],
                this.map.pas,
                this.map.ctx
            )
        )

        this.weapons.push(
            new Weapon(
                3,
                20,
                "img/saber.png",
                this.map.coord[11],
                this.map.pas,
                this.map.ctx
            )
        )
        this.weapons.push(
            new Weapon(
                4,
                40,
                "img/axe.png",
                this.map.coord[12],
                this.map.pas,
                this.map.ctx
            )
        )
        this.weapons.push(
            new Weapon(
                5,
                50,
                "img/magic_sword.png",
                this.map.coord[13],
                this.map.pas,
                this.map.ctx
            )
        )

    }

    generatePlayers() {
        this.players.push(
            new Player(
                1,
                "img/knight.png",
                this.map.coord[14],
                this.map.pas,
                this.map.ctx,
                1
            )
        )
        this.players.push(
            new Player(
                2,
                "img/warrior.png",
                this.map.coord[15],
                this.map.pas,
                this.map.ctx,
                1
            )
        )

        for (let i = 0; i < 2; i++) {
            this.players[i].weapon = this.weapons[i]
        }
        this.hideInventoryWeapons(this.players[0], this.players[1])
        this.refreshMap()

    }

    refreshMap() {
        this.map.generateGrid()
        this.players.forEach((player) => player.draw())
        this.trees.forEach((tree) => tree.draw())
        this.weapons.forEach((weapon) => weapon.draw())
    }

    // génère un chiffre qui determinera le premier joueur qui jouera
    generatePlayerNumber(e) {
        return Math.floor(Math.random() * e)
    }

    // enclenche les zones accessibles avant le premier clic
    generateFirstMoveDisplay() {
        this.num = this.generatePlayerNumber(2)
        this.currentPlayer = this.players[this.num]
        this.currentPlayer.generateBaseMove(this.map.pas)
        this.currentPlayer.generateAccess(this.trees)
        this.currentPlayer.displayAccess(this.trees)
        this.displayPlayer()
    }

    generateFight(player, players) {
        this.fight = new Fight(player, players)
    }


    // Après le clique
    //génère coordonnées au clic 
    moveClicked() {
        document.getElementById("canvas").onclick = function (e) {
            let clicked = [
                Math.floor(e.offsetX / 80) * 80,
                Math.floor(e.offsetY / 80) * 80,
            ]
            this.clicked = clicked
            this.start(this.currentPlayer)
            this.displayPlayer()
            this.generateFight(this.currentPlayer, this.players)
            this.endTurn()



        }.bind(this)
    }


    start(player) {
        this.shift = new Shifting().move(player, this.weapons, this.clicked, this.map.ctx)
        this.hideInventoryWeapons(this.players[0], this.players[1])
        this.hideOldWeapons(this.players[0])
        this.hideOldWeapons(this.players[1])
    }

    // fonction maitresse pour cacher les éléments, doit etre déclaré avant hideOldWeapons
    hideInventoryWeapons(firstPlayer, secondPlayer) {
        this.weapons.forEach((weapon) => {
            // si une arme est dans l'inventaire du joueur = invisible sinon visible
            if (weapon.id === firstPlayer.weapon.id ||
                weapon.id === secondPlayer.weapon.id) {
                weapon.visibility = false

            } else {
                weapon.visibility = true
            }
        })
    }

    // si une arme est sur la même position qu'un joueur  = invisible
    hideOldWeapons(player) {
        if (player.oldWeapon !== null) {
            if (player.oldWeapon.abs === player.abs &&
                player.oldWeapon.ord === player.ord) {
                player.oldWeapon.visibility = false
            }
        }
    }

    endTurn() {
        if (this.shift) {
            /*
            id 1 et 2 et index 0 et 1
            si c'est 1 alors c'est 1 (donc deuxieme joueur pour l'index)
            si c'est 2  alors c'est 0 ( donc premier joueur)
            */
            // condition              sivrai/ sifaux
            let playerIndex = this.currentPlayer.id === 1 ? 1 : 0;
            // si currentPlayer id = 1 alors 1 sinon 0
            this.currentPlayer = this.players[playerIndex]
            this.refreshMap()
            this.currentPlayer.generateBaseMove(this.map.pas)
            this.currentPlayer.generateAccess(this.trees, this.map.pas)
            this.currentPlayer.displayAccess(this.trees)

        }

    }

    displayPlayer() {
        $('#player_1 .currentWeapon img').attr({ src: this.players[0].weapon.img })
        $('#player_2 .currentWeapon img').attr({ src: this.players[1].weapon.img })

        $('#player_1 .currentWeapon h2').text(this.players[0].weapon.hitPoints + " " + "points")
        $('#player_2 .currentWeapon h2').text(this.players[1].weapon.hitPoints + " " + "points")

        $('#player_1 .lifePoint h2').text(this.players[0].life + " " + "points")
        $('#player_2 .lifePoint h2').text(this.players[1].life + " " + "points")

    }

}