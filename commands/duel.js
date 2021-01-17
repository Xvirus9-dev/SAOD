

exports.run = (client, message ) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name: "player"});
    const ms = require("ms");
    const delay = require('delay');
    const { randomInt } = require('crypto');

    const Number = parseInt(Math.floor((Math.random() * 3)))

    const Item = {
        0:"col",
        1:"bois",
        2:"fer",
        3:"loot_box",
      }

    let player2 = message.mentions.users.first()
    let player1 = message.author.id
    if(!player2) return message.channel.send("Veuillez préciser un membre pour commencer le duel.")
    if(player1 == player2) return message.channel.send("Vous ne pouvez pas vous défier vous même.")
    if(player.get(`player_${player2.id}`, "game") !== "start"){
        return message.channel.send('L\'adversaire n\'est pas enregistrer dans la base de donnée.')
    } else if (player.get(`player_${player1}`, "game") !== "start"){
            return message.reply("Vous n'êtes pas inscrit dans la base de donnée")
    }   
        let duel1 = new Discord.MessageEmbed()
            .setTitle(`Duel | ${message.author.username} vs ${player2.username}`)
            .setColor("BLUE")
            .setDescription(message.author.username+" vous demande en duel. Pour accepter, veuillez réagir à la réaction.")
        message.channel.send(duel1).then( data => {
            function wait(message) {
                    const filter = (reaction, user) => {
                        if(!reaction.emoji.name === '✅' && user.id === player2){
                            message.channel.send("Temps d'attente écoulé.")
                        }
                    }
            }
            setTimeout(() => {
                wait()
            }, 10000)
            data.react("✅")
            data.react("❌")
            const msgreact = data.createReactionCollector((reaction, user) => user.id === player1 || user.id === player2.id);                   
                        msgreact.on("collect", async(reaction, user) => {     
                            if(reaction.emoji.name === "✅") {
                                data.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                                delay(2000)
                                data.delete() 
                                var armes ={
                                    petite_epee: 10,
                                    epee_bronze: 12,
                                    anneal_blade: 18,
                                    queens_knight_sword: 21,
                                    elucidator: 35,
                                    dark_repulser: 38,
                                    tyrant_dragon: 32,
                                    kurakurenai: 23 
                                } 
                                var p1Life = 100
                                var p2Life = 100
                                    var combat = await new Discord.MessageEmbed()
                                        .setTitle("Duel : " +message.author.username+" contre "+ player2.username)
                                        .setDescription("Le match va commencer... Préparez-vous !")
                                        .setFooter(message.author.username+": "+p1Life+"pv | "+player2.username+": "+p2Life+"pv")
                                    var rdm_damage;
                                    message.channel.send(combat).then( async(data2) => {
                                            data2.react("⏩").catch(console.log)
                                            await delay(2000);
                                            var speed = 2000;
                                            const msgreact2 = data2.createReactionCollector((reaction, user) => user.id === player1 || user.id === player2.id);          
                                            msgreact2.on("collect", (reaction, user) => {  
                                                console.log("2")   
                                                    if(reaction.emoji.name === "⏩") {
                                                        speed = 500;
                                                        console.log("1")
                                                    }
                                            });
                                            while(p1Life>=0 && p2Life>=0) {
                                                
                                                    rdm_damage = randomInt(1,armes[player.get(`player_${message.author.id}`, "arme")])
                                                    p2Life = p2Life-rdm_damage
                                                    var embed1 = await new Discord.MessageEmbed()
                                                        .setTitle("Duel : " +message.author.username+" contre "+ player2.username)
                                                        .setDescription(player2.username+" prend "+rdm_damage+" dégats")
                                                        .setFooter(message.author.username+": "+p1Life+"pv | "+player2.username+": "+p2Life+"pv")
                                                    data2.edit(embed1)
                                                    await delay(speed);
                                                    if(p2Life <= 0) {
                                                        p2Life = 0
                                                        var embed1 = await new Discord.MessageEmbed()
                                                            .setTitle("Duel : " +message.author.username+" contre "+ player2.username)
                                                            .setDescription(message.author.username+", vous avez gagné ! :trophy:")
                                                            .setFooter(message.author.username+": "+p1Life+"pv | "+player2.username+": "+p2Life+"pv")
                                                        data2.edit(embed1)
                                                        return data2.edit(`Récompense : ${Item[Number]}`,embed2)

                                                    }
                                                    rdm_damage = randomInt(1,armes[player.get(`player_${message.author.id}`, "arme")])
                                                    p1Life = p1Life-rdm_damage
                                                    var embed2 = await new Discord.MessageEmbed()
                                                        .setTitle("Duel : " +message.author.username+" contre "+ player2.username)
                                                        .setDescription(message.author.username+" prend "+rdm_damage+" dégats")
                                                        .setFooter(message.author.username+": "+p1Life+"pv | "+player2.username+": "+p2Life+"pv")
                                                    data2.edit(embed2)
                                                    await delay(2000);
                                                    if(p1Life <= 0){
                                                        p1Life = 0
                                                        var embed1 = await new Discord.MessageEmbed()
                                                            .setTitle("Duel : " +message.author.username+" contre "+ player2.username)
                                                            .setDescription(player2.username+", vous avez gagné ! :trophy:")
                                                            .setFooter(message.author.username+": "+p1Life+"pv | "+player2.username+": "+p2Life+"pv")
                                                        data2.edit(embed1)
                                                            return data2.edit(`Récompense : ${Item[Number]}`, embed1)
                                                    }
                                            }
                                                    
                                    })
                                        
                                  
                            }

                            if(reaction.emoji.name === "❌"){
                                if(user.id !== player2.id) return
                                data.delete({ "timeout" : 500})
                            }    
                        })
              
        })
}
            
            

