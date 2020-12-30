exports.run = (client, message, droit) => {
    const args1 = message.content.split(" ").slice(1).join(" ");
    var Discord = require("discord.js");
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("**Vous n'avez pas la permission de faire cette commande**");
    }
    if (!args1[0]) {
        return message.channel.send("**Veuillez préciser le contenu de l'embed**");
    }
    message.delete();
    const embed = new Discord.MessageEmbed()
        .setColor("#8A0808")
        .setDescription(args1);
    message.channel.send(embed);
};