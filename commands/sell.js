exports.run = async(client, message) => {
    const Discord = require("discord.js");
    const Enmap = require("enmap"); 
    const player = new Enmap({name : "Player"});
    const args = message.content.slice(client.config.prefix.length).split(/ +/);
    if(!args[1]) return message.channel.send("Veuillez précisez l'id d'un item se trouvant dans le shop, Exemple : `s!sell 1`")
        let item;
    if(args[1] === "1") {
        item = {
            id: "1",
            prix: 2,
            name: "bois"
        }
    }else if(args[1] === "2") {
        item = {
            id: "2",
            prix: 1,
            name: "pierre"
        }
    }else if(args[1] === "3") {
        item = {
            id: "3",
            prix: 6,
            name: "fer"
        }
    }else {
        return message.channel.send("Veuillez précisez l'id d'un item se trouvant dans le shop, Exemple : `s!sell 1`")
    }
        let embed = new Discord.MessageEmbed()
            .setTitle("Achat Item | "+message.author.tag)
            .setDescription(`[${item.id}] <:double_arrow:790495080761917440> ${item.name} ─ Prix de vente: ${item.prix.toString()}<:coins:790495120549085234>`)
            .setTimestamp()
        message.channel.send(embed).then(data => {
            data.react("✅")
            const msgreact = data.createReactionCollector((reaction, user) => user.id === message.author.id);
                    msgreact.on("collect", reaction => {
                               if (reaction.emoji.name === "✅") {
                               reaction.remove(message.author.id);
                               try{
                                    data.delete()
                                }catch(error) {console.log(error)}
                               if(player.get(`player_${message.author.id}`, item.name) >= 1){
                                    player.set(`player_${message.author.id}`, player.get(`player_${message.author.id}`, "col")+item.prix, "col")
                                    player.set(`player_${message.author.id}`, player.get(`player_${message.author.id}`, item.name)-1, item.name)
                                    message.channel.send("<:double_arrow:790495080761917440> Vente réussit avec succès !")
                               }else{
                                message.channel.send("<:uncheck_simple:790495087209349181> Vous n'avez assez de "+item.name+" !")
                               }
                            
                    }
                })
        })
}


