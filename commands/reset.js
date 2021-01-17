exports.run = async(client, message) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name : "Player"});
    if(player.get(`player_${message.author.id}`, "game") === "start"){
            player.set(`player_${message.author.id}`, {
                user: message.author.id,
                username: "none",
                game: "none",
                nom: "none",
                age: "none",
                niveau: 0,
                xp: 0,
                lvl: 0,
                col: 10,
                bois: 0,
                fer: 0, 
                pierre: 0,
                pv: 100, 
                arme: "petite_epee",
                lootbox_normale: 0,
                lootbox_speciale: 0,
                lootbox_legend: 0,
                potion_heal: 0,
                daily: false,
                pdaily: 1000//"86 400 000"
              })
            message.channel.send("<a:black_flame:790495086286864385> **"+ message.author.username +"**, votre aventure a prit fin.")
    }else {
        message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
    }


}