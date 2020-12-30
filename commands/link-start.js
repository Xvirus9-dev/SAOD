exports.run = async(client, message) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name : "Player"});
    if(player.get(`player_${message.author.id}`, "game") === "none"){
        message.channel.send("<a:load:790495102048141313> Chargement du jeu...").then(msg => {
            setTimeout(function () {
                let min = 14
                let max = 30
                let age = Math.floor(Math.random() * (max - min + 10)) + min
                player.set(`player_${message.author.id}`, age, "age")
                player.set(`player_${message.author.id}`, "start", "game")
                player.set(`player_${message.author.id}`, message.author.username, "username")
                msg.edit("<a:black_flame:790495086286864385> **"+ message.author.username +"**, une nouvelle partie vient d'être lancer. Pour plus d'infos faites `s!tuto` ou `s!rpg-help`")
            }, 3000)
        });
    }else {
        message.channel.send("Une partie a déjà était lancé, pour l'interrompre faites `s!reset`")
    }


}