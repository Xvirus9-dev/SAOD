module.exports = (client, message) => {
  const Discord = require("discord.js")
  const Enmap = require("enmap");
    // Ignorer les messages du bot
    if (message.author.bot) return;

          if(!message.member.hasPermission("MANAGE_MESSAGES")){
              if(message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) {
                message.delete();
                const droit = new Discord.MessageEmbed()
                    .setDescription(`**La pub est interdite ${message.author.username}**`);
                return message.channel.send(droit);
              }
          }

    // User/Guild
    const utg = new Enmap({name: "userperguild"});
    utg.ensure(`utg_${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        msgcount: 0,
        ticket: false,
        mute: false,
        coldownslots: "none",
        colorank: "none",
    });
  
    let thenewnumberofmsg = utg.get(`utg_${message.author.id}`, "msgcount") + 1;
    utg.set(`utg_${message.author.id}`, thenewnumberofmsg, "msgcount");

      // Warns
    const wrn = new Enmap({name: "warns"}); 
    wrn.ensure(`warn_${message.author.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        warns: 0,
        reasons: [],
    });

    const player = new Enmap({name : "Player"});
    player.ensure(`player_${message.author.id}`, {
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
      bronze_sword : 0,
      lootbox_normale: 0,
      lootbox_speciale: 0,
      lootbox_legend: 0,
      heal_potion: 0,
      daily: false,
      pdaily: 1000//"86 400 000"
    })

    const curLvl = Math.floor(0.1 * Math.sqrt(player.get(`player_${message.author.id}`, "xp")));

        if (player.get(`player_${message.author.id}`, "level") < curLvl) {
          player.set(`player_${message.author.id}`, curLvl, "level");
            message
            .reply("Vous venez de passer niveau `"+curLvl+"` !")
            .then(msg => {
                msg.delete({ timeout: 15000});
            });
        }
    


  // Ignorer les messages n'ayant pas le préfixe
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Définir args et les commandes
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // chercher la commande
  const cmd = client.commands.get(command);

  // Si la commande n'existe pas, abandonner 
  if (!cmd) return;

  // Si elle existe, lancer la commande
  try {
    cmd.run(client, message, args);
  } catch (error) {
    console.log(error);
  }

}