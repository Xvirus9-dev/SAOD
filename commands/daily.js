
exports.run = async(client, message) => {
    const Discord = require("discord.js");
    const moment = require('moment');
    const Enmap = require("enmap"); 
    const player = new Enmap({name : "Player"});

    if(player.get(`player_${message.author.id}`, "game") === "start"){
      let oneDay = 24 * 60 * 60 * 1000;
      let prevDaily = player.get(`player_${message.author.id}`,"pdaily")
      let daily = player.get(`player_${message.author.id}`,"daily") 
      let timeDiff = (message.editedTimestamp || message.createdTimestamp) -  prevDaily
      
      let Items = {
        0:"col",
        1:"bois",
        2:"fer",
        3:"loot_box",
      }

      if (daily === false || timeDiff >= oneDay) { 
        let pourcent = parseInt(Math.floor((Math.random() * 99))+1)
        let ItemNumber = parseInt(Math.floor((Math.random() * 3)))
        let Number = parseInt(Math.floor((Math.random() * 3)))
        
        if(ItemNumber === 0 || ItemNumber === 1 || ItemNumber === 2) {
          player.set(`player_${message.author.id}`, player.get(`player_${message.author.id}`, Items[ItemNumber]) + Number, Items[ItemNumber])
          return message.channel.send(`Vous venez de recevoir : ${Number+1 + " " +Items[ItemNumber]} !`);
        } 
        if(ItemNumber === 3) {
          if(pourcent <= 5){
            player.set(`player_${message.author.id}`, player.get(`player_${message.author.id}`, "lootbox_legend") + 1, "lootbox_legend")
            return message.channel.send(`Vous venez de recevoir : 1 Loot Box Légendaire !`);
          }
          if(pourcent >= 90){
            player.set(`player_${message.author.id}`, player.get(`player_${message.author.id}`, "lootbox_speciale") + 1, "lootbox_speciale")
            return message.channel.send(`Vous venez de recevoir : 1 Loot Box Spéciale !`);
          }
          if(pourcent <= 40){
            if(pourcent >= 20){
              player.set(`player_${message.author.id}`, player.get(`player_${message.author.id}`, "lootbox_normale") + 1, "lootbox_normale")
              return message.channel.send(`Vous venez de recevoir : 1 Loot Box Normale !`);
            }
          }
          
        } 
        player.set(`player_${message.author.id}`, message.editedTimestamp || message.createdTimestamp, "pdaily");
        player.set(`player_${message.author.id}`, true, "daily")
        return
      }

      let timeRequired = oneDay - timeDiff;
      return message.channel.send(`Veulliez patienter ${moment.duration(timeRequired, 'ms').format('h[h] [et] m[m] s[s]')} avant votre prochaine récompense journalière.`);
    }else {
      message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
  }
}