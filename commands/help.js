exports.run = (client, message) => {
    var Discord = require("discord.js");
    const embed = new Discord.MessageEmbed()
            .setTitle("Help | "+message.author.tag)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription('<a:black_flame:790495086286864385> Voici la liste des commandes')
            .setTimestamp()
            .addField("<a:arrow_rainbow:790495097766674442> Moderation:","`ban`, `kick`, `mute`, `unmute`, `unban`, `clear`, `warn`, `listwarn`, `purgewarn`")
            .addField("<a:arrow_rainbow:790495097766674442> Utiles:", "`help`, `rank`, `leaderboard`, `buy`, `serverinfo`, `userinfo`, `avatar`, `ping`, `ticket`, `close`, `embed`, `say`, `giveaways`")
            .addField("<a:arrow_rainbow:790495097766674442> Sword Art Online Discord:", "`Comming Soon`")
          message.channel.send(embed)
}