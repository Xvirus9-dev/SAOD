exports.run = async(client, message) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name : "Player"});
    if(player.get(`player_${message.author.id}`, "game") === "start"){
        message.channel.send("Le tutoriel du jeu vous a été envoyé en mp.")
        message.author.send("<a:verif_black:790495100198322177> Bienvenue dans Sword Art Online Discord.\n\nJeune voyageur, voici un texte afin de vous aider à parcourir ce merveilleux monde de Sword Art Online:\n \nVous êtes dans un monde virtuel qui a était conçue par Akihiko Kayaba <:Akihiko:790668714650632212> .\n \nAfin de terminé ce jeu vous allez devoir parcourir les différents étages de ce monde, ce monde est constitué de 100 étages et il est nommé l'Aincrad.\n \nPour passer d'un étage à l'autre vous devrez réussir a éliminer le Boss de l'étage en utilisant la commande Battle. (s!help)\n \nSi vous perdez un combat contre un Boss de palier vous allez redescendre au palier inférieur et vous devrez attendre 10 minutes afin de pouvoir affronté de nouveau un boss.\n \nUne fois que vous aurez fini les 100 paliers de l'Aincrad, vous aurez le choix entre:\n \n- Recommencer avec un bonus.\n- Faire certaines quêtes secondaires.\n \nBon jeux à toi Jeune Voyageur ! ") 
    }else {
        message.channel.send("Aucune partie est lancé, pour en lancer une, faites `s!link-start`")
    }


}