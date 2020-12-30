exports.run = (client, message ) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name: "player"});
    const list = require("./data_buy.json")
    const args = message.content.slice(client.config.prefix.length).split(/ +/);
    let item;
if(!args[1]) return message.channel.send("Veuillez précisez l'id d'un item se trouvant dans le shop, Exemple : `s!buy 1`")

if(!list[args[1]]){ // c juste une vérif si ça existe ou pas
    return message.channel.send("Veuillez précisez l'id d'un item se trouvant dans le shop, Exemple : `s!buy 1`")
} else {
        item = require("./data_buy.json")[args[1]]

        let embed = new Discord.MessageEmbed()
            .setTitle("Achat Item | "+message.author.tag)
            .setDescription(`[${item.id}] <:double_arrow:790495080761917440> ${item.name} ─ Prix : ${item.prix.toString()}<:coins:790495120549085234>`)
            .setTimestamp()
        message.channel.send(embed).then( async(data) => {
            data.react("✅")
            const msgreact = data.createReactionCollector((reaction, user) => user.id === message.author.id);
                    msgreact.on("collect", async(reaction) => {
                               if (reaction.emoji.name === "✅") {
                                reaction.remove(message.author.id);
                                try{
                                    data.delete()
                                }catch(error) {console.log(error)}
                                
                                    if(player.get(`player_${message.author.id}`, "col") >= item.prix){
                                        player.set(`player_${message.author.id}`, player.get(`player_${message.author.id}`, "col")-item.prix, "col")
                                        player.set(`player_${message.author.id}`, parseInt(player.get(`player_${message.author.id}`, item.name))+1, item.name)
                                        message.channel.send("<:double_arrow:790495080761917440> Achat réussit avec succès !")     
                                    }else{
                                        message.channel.send("<:uncheck_simple:790495087209349181> Vous n'avez assez d'argent !")
                                    }     
                               }      
                    })
            
        })
    }
}