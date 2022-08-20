class Shifting {
    constructor(){
        this.pas = 80
        this.oldposition
    }

    move(player, weapons, clicked, ctx) {
        const cellClicked = this.getAuthorizedCoords(clicked, player)

        if (null === cellClicked) {
            return false
    
        } else {
            console.log("JOUEUR ", player.id)

            // si une case parcourue par le joueur rencontre une arme
            this.checkMetWeapons(player, cellClicked, weapons, ctx)

            // si le clique est = à l'emplacement d'une arme
            this.meeting(cellClicked.abs, cellClicked.ord, weapons, player) 
            /* console.log('hey', player.weapon) */
            player.abs = cellClicked.abs
            player.ord = cellClicked.ord
            return true
        }
    
    }

    //verifie si le clic correspond à une case accessible genéré dans la class players
    getAuthorizedCoords(click, player) {
     
        let cell = player.moveAccess.filter(
            (p) => p[0] === click[0] && p[1] === click[1]
        )
        if (cell.length > 0) {
            return {
                abs: cell[0][0],
                ord: cell[0][1],
            }
        } else {
            return null
        }
    }

    checkMetWeapons(player, cellClicked, weapons){

 //consultation du chemin parcouru par le joueur
        let startAheadX  = player.abs + this.pas
        let startBehindX = player.abs - this.pas
        let startAheadY  = player.ord + this.pas
        let startBehindY = player.ord - this.pas

    // déplacement à droite ++
        if (startAheadX < cellClicked.abs){
            for( let i = startAheadX; i < cellClicked.abs; i+= this.pas ){
                let coord = [i, player.ord]
                this.meeting(coord[0], coord[1], weapons, player) 
            }
        }
    // déplacement à gauche --
        if (startBehindX > cellClicked.abs){ 
            for( let i = startBehindX; i > cellClicked.abs; i-= this.pas ){
                let coord = [i, player.ord]
                this.meeting(coord[0], coord[1], weapons, player) 
            }
        }
    // déplacement en haut --
        if (startBehindY > cellClicked.ord){
            for( let i = startBehindY; i > cellClicked.ord; i-= this.pas ){
                let coord = [player.abs, i]
                this.meeting(coord[0], coord[1], weapons, player) 
            }
        }
    // déplacement en bas ++
        if (startAheadY < cellClicked.ord){
            for( let i = startAheadY; i < cellClicked.ord; i+= this.pas ){
                let coord = [player.abs, i]
                this.meeting(coord[0], coord[1], weapons, player) 
            }
        }
    }    

    // rencontre 
        meeting(meetX, meetY, weapons, player){
            const weaponsLength = weapons.length 
          
            for (let i = 0; i < weaponsLength; i++) {   
                if (
                    meetX === weapons[i].abs &&
                    meetY === weapons[i].ord
                ){
                    this.weaponSwap(player, weapons, weapons[i],meetX, meetY)
                    break
                }     
            }  
        }

    // echange entre 2 armes
        weaponSwap(player, weapons, newWeapon, meetX, meetY){  

            player.oldWeapon = player.weapon
            player.weapon = newWeapon
            
            weapons.forEach((weapon) => {
                if (weapon.id === player.oldWeapon.id) {
                    weapon.abs = meetX
                    weapon.ord = meetY
                }
            })
            player.weapon.abs = null
            player.weapon.ord = null
            
        }

      
} 
    
            
