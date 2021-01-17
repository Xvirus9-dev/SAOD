exports.run = (client, message, droit) => {
    const args1 = message.content.split(" ").slice(1).join(" ");
    var Discord = require("discord.js");
    let oh = message.content.slice(client.config.prefix.length).split(/ +/);
    if (!args1) {
        return message.channel.send("**Veuillez préciser un message**");
    }
    if(oh[1].startsWith(client.config.prefix)){
        return message.channel.send("**Vous ne pouvez pas faire de commandes avec la commande say**");
    }
    message.delete();
    message.channel.send(args1);
};