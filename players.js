class Player {
    constructor(id, img, coord, dim, ctx, hitPoints) {
        this.id = id
        this.img = img
        this.abs = coord[0]
        this.ord = coord[1]
        this.dim = dim
        this.ctx = ctx
        this.pas = 80
        this.baseMove = []
        this.moveAccess = []
        this.hitPoints = hitPoints
        this.oldWeapon = null
        this.weapon = null
        this.life = 100
        this.rivalIndex = this.id === 1 ? 1 : 0
        this.shield = false
        this.draw()

    }

    draw() {
        let image = new Image()
        let ref = this

        image.addEventListener("load", function () {
            //  exécute les instructions drawImage ici le listener permet de s'assurer que l'image a d'abord été chargée
            // console.log('Img loaded', image, ref.abs, ref.ord, ref.dim, ref.dim) // Les cordonnées étaient undefined
            ref.ctx.drawImage(image, ref.abs, ref.ord, ref.dim, ref.dim)
        })
        image.src = this.img
    }

    generateBaseMove(pas) {
        this.baseMove = []
        this.baseMove.push(
            [
                //0            1
    /* j=0 */[this.abs, this.ord - pas],
    /* j=1 */[this.abs, this.ord - pas * 2],
    /* j=2 */[this.abs, this.ord - pas * 3],
            ],
            // à droite
            //i = 1
            [
                [this.abs + pas, this.ord],
                [this.abs + pas * 2, this.ord],
                [this.abs + pas * 3, this.ord],
            ],
            // en bas 
            //i = 2
            [
                [this.abs, this.ord + pas],
                [this.abs, this.ord + pas * 2],
                [this.abs, this.ord + pas * 3],
            ],
            // à gauche 
            //i = 3         
            [
                [this.abs - pas, this.ord],
                [this.abs - pas * 2, this.ord],
                [this.abs - pas * 3, this.ord],
            ]
        )
    }

    generateAccess(trees) {
        this.moveAccess = []
        // triage des cases accessible
        // consultation des cases une par une 
        // Si une de ses cases rencontre un arbre 
        // alors passage groupe de case suivante 
        for (let i = 0; i < this.baseMove.length; i++) {
            for (let j = 0; j < this.baseMove[i].length; j++) {
                for (let k = 0; k < trees.length; k++) {
                    /* console.log('case déplacement comparé ',[i],[j],  this.baseMove[i][j][0]/80,this.baseMove[i][j][1]/80)
                    console.log('arbre comparé n° ',[k], trees[k].abs/80, trees[k].ord/80 ) */
                    if (
                        this.baseMove[i][j][0] === trees[k].abs &&
                        this.baseMove[i][j][1] === trees[k].ord

                        ||

                        this.baseMove[i][j][0] === game.players[this.rivalIndex].abs &&
                        this.baseMove[i][j][1] === game.players[this.rivalIndex].ord
                    ) {
                        i++
                        if (i > 3) {
                            i--
                            j = this.baseMove[i].length //
                            break
                            //bloque la boucle à i = 3 et j = 3 grâce à break
                            // evite l'erreur d'un i++ sur un 4eme tableau inexistant
                        }
                        // on passe au tableau suivant, on réinitialise donc j et le tableau des arbres k
                        j = 0
                        k = -1


                    } else if (k === trees.length - 1) {
                        this.moveAccess.push([
                            this.baseMove[i][j][0],
                            this.baseMove[i][j][1],
                        ])
                    }
                }
            }
        }
    }

    displayAccess(trees) {
        for (let i = 0; i < this.baseMove.length; i++) {
            for (let j = 0; j < this.baseMove[i].length; j++) {
                for (let k = 0; k < trees.length; k++) {
                    if (
                        this.baseMove[i][j][0] === trees[k].abs &&
                        this.baseMove[i][j][1] === trees[k].ord

                        ||

                        this.baseMove[i][j][0] === game.players[this.rivalIndex].abs &&
                        this.baseMove[i][j][1] === game.players[this.rivalIndex].ord
                    ) {

                        ctx.fillStyle = "rgb(255, 28, 14, 0.5)" //rouge
                        ctx.fillRect(
                            this.baseMove[i][j][0],
                            this.baseMove[i][j][1],
                            80,
                            80)

                        i++
                        if (i > 3) {
                            i--
                            j = this.baseMove[i].length
                            break
                        }
                        j = 0
                        k = -1

                    } else if (k === trees.length - 1) {
                        ctx.fillStyle = "rgb(0, 255, 0, 0.3)" // vert
                        ctx.fillRect(
                            this.baseMove[i][j][0],
                            this.baseMove[i][j][1],
                            80,
                            80
                        )
                    }
                }
            }
        }
    }
}