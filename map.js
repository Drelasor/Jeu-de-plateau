//centralisation des tableaux
class Map {
    constructor(pas, pasMax, ctx) {
        this.pas = pas
        this.pasMax = pasMax
        this.ctx = ctx
        this.coord = []
        this.total = 16
        this.x
        this.y
        this.result
        this.result_2
        this.duplicate = false
        this.adjacent = []
        this.generateElements()
        this.generateGrid()
    }

    // Supprime les éléments précédemment 
    generateGrid() {
        ctx.clearRect(0, 0, 800, 800)
        for (let i = 1; i < 50; i++) {
            ctx.beginPath()
            ctx.moveTo(i * this.pas, 0)
            ctx.lineTo(i * this.pas, this.pasMax)
            ctx.moveTo(0, this.pas * i)
            ctx.lineTo(this.pasMax, this.pas * i)
            ctx.stroke()
            ctx.fill()
        }
    }

    // génère l'ensemble des coordonnées
    generateElements() {
        for (let i = 0; i < this.total; i++) {
            do {
                // genere x y
                this.x = Math.floor(Math.random() * 10) * this.pas
                this.y = Math.floor(Math.random() * 10) * this.pas
                // Compare x y aux anciens x y
                this.result = this.coord.filter(
                    (p) => p[0] === this.x && p[1] === this.y
                )

                if (this.result.length > 0) {
                    this.duplicate = true
                }
                // Si filter retourne coordonnées = duplication présente, on relance la generation
                else {
                    // Sinon
                    // Si filter ne retourne pas de coordonnées alors aucune duplication...
                    this.duplicate = false
                    // ... lors du 14 ème tour de boucle : on insère les cases adjacentes de x et y dans un tableau
                    if (i === this.total - 2) {
                        this.adjacent.push(
                            [this.x - this.pas, this.y - this.pas],
                            [this.x - this.pas, this.y],
                            [this.x - this.pas, this.y + this.pas],
                            [this.x, this.y - this.pas],
                            [this.x, this.y + this.pas],
                            [this.x + this.pas, this.y - this.pas],
                            [this.x + this.pas, this.y],
                            [this.x + this.pas, this.y + this.pas]
                        ) 
                    }
                    // Lors du 15 ème tour de boucle : on compare x et y avec les entrées du tableau adjacent du premier joueur
                    if (i === this.total - 1) {
                        this.result_2 = this.adjacent.filter(
                            (p) => p[0] === this.x && p[1] === this.y
                        )
                        //console.log(result_2)
                        // si x y identiques au tableau adjacent duplication = true, le programme se relance
                        if (this.result_2.length > 0) {
                            this.duplicate = true
                        }
                    }
                }
            } while (this.duplicate)
            {
                this.coord.push([this.x, this.y])
            }
        }
    }
}
