exports.run = async (client, message) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name : "Player"});

    if(player.get(`player_${message.author.id}`, "game") === "start"){
        let heal = player.get(`player_${message.author.id}`, "potion_heal");
        if(player.get(`player_${message.author.id}`, "potion_heal") !== 0){
            player.set(`player_${message.author.id}`, 100, "pv")
            return message.channel.send("Vous venez d'utilisé une potion de heal, vous avez récupérer tout vos points de vies.")
        }
        if(player.get(`player_${message.author.id}`, "potion_heal") === 0){
            return message.channel.send("Vous n'avez pas de potion de heal.")
        }
    }else {
        message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
    }

}