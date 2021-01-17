exports.run = async(client, message) => {
    const Discord = require("discord.js");
    const Enmap = require("enmap"); 
    const player = new Enmap({name : "Player"});
    if(player.get(`player_${message.author.id}`, "game") === "start"){
        let user = message.guild.members.cache.get(message.author.id)
        let embed = new Discord.MessageEmbed()
            .setTitle('Votre profile | '+ message.author.tag)
            .setDescription("__**Stats :**__\n\n**Nom :** "+message.author.username+" | "+"**Age :** "+player.get(`player_${message.author.id}`, "age")+"\nNiveau : "+player.get(`player_${message.author.id}`, "niveau")+" | "+"Pv : "+player.get(`player_${message.author.id}`, "pv")+"\n<:coins:790495120549085234> Col : "+player.get(`player_${message.author.id}`, "col")+" | "+"Fer : " +player.get(`player_${message.author.id}`, "fer")+"\nPierre : "+player.get(`player_${message.author.id}`, "pierre")+ " | "+"Bois : "+player.get(`player_${message.author.id}`, "bois"))
        message.channel.send(embed).catch(console.log)
    }else {
        message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
    }

}