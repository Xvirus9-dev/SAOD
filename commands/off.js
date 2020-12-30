exports.run = (client, message, droit) => {
    var Discord = require("discord.js");
    const authorize = ["614052096857341952","550997709083901996"];
    if (!authorize.includes(message.author.id)) {
        return message.channel.send("**Vous n'avez pas la permission de faire cette commande**");
    }
    client.destroy();
};