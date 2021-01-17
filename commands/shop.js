exports.run = async(client, message) => {
    let count = 0
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name: "player"});
    if(player.get(`player_${message.author.id}`, "game") === "start"){
        let page = 1
        let embed_1 = new Discord.MessageEmbed()
            .setTitle("Boutique")
            .setColor("#25329F")
            .setDescription("`Catégorie Ressources :`")
            .addField("[1] `Bois`", "Achat : 4 cols/U | Vente : 2 cols/U", false)
            .addField("[2] `Pierre`", "Achat : 3 cols/U | Vente : 1 cols/U", false)
            .addField("[3] `Fer`", "Achat : 6 cols/U | Vente : 3 cols/U", false)
            .addField("[4] `Pain Noir`", "Achat : 1 cols/U", false)
            .addField("[5] `Viande Ragout Rabbit`", "Achat : 50 cols/U | Vente : 25 cols/U", false)
            .setFooter("Page 1/3 | Vos Cols : "+player.get(`player_${message.author.id}`, "coins"))
        let embed_2 = new Discord.MessageEmbed()
            .setTitle("Boutique")
            .setColor("#25329F")
            .setDescription("`Catégorie Objets :`")
            .addField("[6] `Cristal de soin`", "Achat: 10 cols/U | Vente : 5 cols/U", false)
            .addField("[7] `Cristal de Téléportation`", "Achat: 15 cols/U | Vente : 7 cols/U", false)
            .addField("[8] `LootBox Normale`", "Achat : 100 cols | Vente : 50 cols", false)
            .addField("[9] `LootBox Spéciale`", "Achat : 150 cols | Vente : 75 cols", false)
            .addField("[10] `LootBox Légendaire`", "Achat : 200 cols | Vente : 100 cols", false)
            .setFooter("Page 2/3 | Vos Cols : "+player.get(`player_${message.author.id}`, "coins"))
        let embed_3 = new Discord.MessageEmbed()
            .setTitle("Boutique")
            .setColor("#25329F")
            .setDescription("`Catégorie Armes :`")
            .addField("[11] `Petite Epée`", "Achat : 8 cols | Vente : 4 cols", false)
            .addField("[12] `Epée en bronze`", "Achat : 16 cols | Vente : 8 cols", false)
            .setFooter("Page 3/3 | Vos Cols : "+player.get(`player_${message.author.id}`, "coins"))
        /*let embed_4 = new Discord.MessageEmbed()
            .setTitle("Boutique")
            .setColor("#25329F")
            .setFooter("Page 4/4 | "+ player.get(`player_${message.author.id}`, "coins"))*/
        message.channel.send(embed_1).then(data => {
            data.react("⏪")
            data.react("⏩")
                .then(ok => {
            const msgreact = data.createReactionCollector((reaction, user) => user.id === message.author.id);
            msgreact.on("collect", (reaction, user) => {
                    if (reaction.emoji.name === "⏩") {
                        reaction.users.remove(user.id);
                        if(page === 1){
                            page = 2
                            data.edit(embed_2)
                    } else {
                        if(page === 2){
                            page = 3
                            data.edit(embed_3)
                    } else {
                        if(page === 3){
                            return
                            /*page = 4
                            data.edit(embed_4)*/
                        }
                        /*else {
                            if(page === 3){
                                return
                            }
                        }*/
                    }
                    }
                    }
                    if (reaction.emoji.name === "⏪") {
                        reaction.users.remove(user.id);
                        /*if(page === 4){
                                page = 3
                                data.edit(embed_3)
                        } else {*/
                            if(page === 3){
                                page = 2
                                data.edit(embed_2)
                        } else {
                            if(page === 2){
                                page = 1
                                data.edit(embed_1)
                            }
                            else {
                                if(page === 1){
                                    return
                                }
                            }
                        }
                        }
                        
                    
            })
        })
    })
    }else {
        message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
    }


}


