class Fight {
    constructor(activePlayer, players) {
        this.activePlayer = activePlayer;
        this.players = players
        this.index = this.activePlayer.id === 1 ? 1 : 0;
        this.target = this.players[this.index]
        this.display()
        this.currentFighter()
    }

    display() {
        this.target.generateBaseMove(game.map.pas)
        // affichage des boutons et de l'arène
        for (let i = 0; i < 4; i++) {
            if (this.activePlayer.abs === this.target.baseMove[i][0][0] &&
                this.activePlayer.ord === this.target.baseMove[i][0][1]) {
                $('#fight').fadeIn(800)
                $('#action').fadeIn(800)
                this.fight()
                break
            }
        }
    }

    currentFighter() {
        $('.currentplayer_1 ').css('visibility', 'hidden')
        $('.currentplayer_2 ').css('visibility', 'hidden')

        // fleche au dessus du joueur qui attaque
        if (this.activePlayer.id === this.players[0].id) {
            $('.currentplayer_1 ').css('visibility', 'visible')

        } else if (this.activePlayer.id === this.players[1].id) {
            $('.currentplayer_2 ').css('visibility', 'visible')

        }
    }

    fight() {

        // attaquer
        $('.attack').on('click', function () {
            this.playerAttack()
            this.lifePoint()
            this.lifeBar()
            this.lifeProtect()
            this.changeTurn()
            this.currentFighter()

        }.bind(this));

        //defendre
        $('.defend').on('click', function () {
            this.playerDefense()
            this.lifePoint()
            this.lifeBar()
            this.lifeProtect()
            this.changeTurn()
            this.currentFighter()
        }.bind(this));

    }


    playerAttack() {
        if (this.target.shield) {
            //dégats divisé par deux
            this.target.life = this.target.life - (this.activePlayer.weapon.hitPoints / 2)
            this.target.shield = false

        } else {
            this.target.life = this.target.life - this.activePlayer.weapon.hitPoints

        }
        if (this.target.life <= 0) {
            console.log('hey')
            $('#action').hide()
            $('#end').fadeIn(900)
            $('#victory img').attr({ src: this.activePlayer.img })
            $('#victory h2').text("le joueur" + ' ' + this.activePlayer.id + ' ' + "remporte la partie !!")
        }

    }

    playerDefense() {
        this.activePlayer.shield = true
        this.target.shield = false
    }

    changeTurn() {
        let oldActivePlayer = this.activePlayer
        this.activePlayer = this.target
        this.target = oldActivePlayer

    }

    lifePoint() {
        //points de vie dynamiques
        $('#player_1 .lifePoint h2').text(this.players[0].life + " " + "points")
        $('#player_2 .lifePoint h2').text(this.players[1].life + " " + "points")

    }
    lifeBar() {
        if (this.target.id === this.players[0].id) {
            $('#player_1 .color ').css('width', this.target.life + 'px')

        } else if (this.target.id === this.players[1].id) {
            $('#player_2 .color ').css('width', this.target.life + 'px')

        }
    }

    lifeProtect() {
        if (this.activePlayer.shield) {
            if (this.activePlayer.id === this.players[0].id) {
                $('#player_1 .color ').css('background-color', 'rgb(64, 54, 207)')
            }
            if (this.activePlayer.id === this.players[1].id) {
                $('#player_2 .color ').css('background-color', 'rgb(64, 54, 207)')
            }
        } else {
            if (this.activePlayer.id === this.players[0].id) {
                $('#player_1 .color ').css('background-color', 'rgb(206, 82, 78)')
            }
            if (this.activePlayer.id === this.players[1].id) {
                $('#player_2 .color ').css('background-color', 'rgb(206, 82, 78)')
            }

        }
    }
}