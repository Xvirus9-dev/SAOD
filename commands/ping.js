exports.run = (client, message, args) => {
  var Discord = require("discord.js");
    const embed = new Discord.MessageEmbed()
      .setTitle("Bonjour "+message.author.username)
      .setDescription("Mon ping est de : "+client.ws.ping+"ms")
      .setColor("RANDOM")
      .setFooter("Commande ping");
    message.channel.send(embed);
  
};
