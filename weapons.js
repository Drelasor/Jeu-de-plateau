class Weapon {
    constructor(id,hitPoints, img, coord, dim, ctx) {
        this.id = id
        this.hitPoints = hitPoints
        this.img = img
        this.abs = coord[0]
        this.ord = coord[1]
        this.dim = dim
        this.ctx = ctx
        this.visibility = false
        this.draw()
    }

    draw() {
        if (this.visibility) {
            let image = new Image()
            let ref = this

            image.addEventListener("load", function () {
                //  exécute les instructions drawImage ici le listener permet de s'assurer que l'image a d'abord été chargée
                // console.log('Img loaded', image, ref.abs, ref.ord, ref.dim, ref.dim) // Les cordonnées étaient undefined
                ref.ctx.drawImage(image, ref.abs, ref.ord, ref.dim, ref.dim)
            })
            image.src = this.img
        }
    }
}
