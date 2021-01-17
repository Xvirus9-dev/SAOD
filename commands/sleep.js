exports.run = async(client, message) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name : "Player"});

    if(player.get(`player_${message.author.id}`, "game") === "start"){
        var pv = player.get(`player_${message.author.id}`, "pv") 

            if(pv !== 100){ 
                message.channel.send("Vous venez de vous endormir, veuillez patienter 10s")
                setTimeout(function () {
                    if(pv !== 100){
                        player.set(`player_${message.author.id}`, 100, "pv")
                        return message.channel.send("Vous avez récupéré tout vos points de vie. Vous avez actuellement " + player.get(`player_${message.author.id}`, "pv") + " Points de vie")
                    } 
                }, 10000)
            }
            if(pv === 100){
                message.channel.send("Vous avez déjà le maximum de vos points de vie.")
            }
        }else {
            message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
        }
    
}

