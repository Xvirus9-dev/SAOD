exports.run = async(client, message) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name : "Player"});
    if(player.get(`player_${message.author.id}`, "game") === "start"){
        const embed = new Discord.MessageEmbed()
        .setTitle("Help RPG | "+message.author.tag)
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription('<a:black_flame:790495086286864385> Voici la liste des commandes RPG')
        .setTimestamp()
        .addField("<a:arrow_rainbow:790495097766674442> Commandes RPG:","`daily`, `heal`, `sleep`, `link-start`, `link-stop`, `profile`, `shop`, `buy`, `sell`")
      message.channel.send(embed)
    }else {
        message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
    }
}