
module.exports = async(client, member) => {

    var Discord = require("discord.js");
    const Canvas = require('canvas');
    const Enmap = require("enmap");
    const srv = new Enmap({name: "serveur"});
    
    if(member.guild.id !== "787059149951205386") return

    let memberCountChannel = member.guild.channels.cache.find(channel => channel.id === "787239152508207124")
    memberCountChannel.setName(` 〚💥〛Membres : ${member.guild.memberCount}`).catch(console.error)
    // Préparation canvas image
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 70;
        do {
            ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);
        return ctx.font;
    };
    
    // Système images de bienvenue
    let channel = member.guild.channels.cache.get("787077564266577932");
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/787070019992682518/787246352941580288/maxresdefault.jpg");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#0552C1';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const name = member.user.username.length > 30 ? member.user.username.substring(0, 11) + '...': member.user.username;
    ctx.font = applyText(canvas, `${member.displayName}`);
    ctx.fillStyle = '#000000';
    ctx.fillText(name, canvas.width / 2.5, canvas.height / 1.8);

    ctx.font = ('30px sans-serif');
    ctx.fillStyle = '#000000';
    ctx.fillText(member.guild.memberCount+' membres', canvas.width / 1.4, canvas.height / 1.15);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg'}));
    ctx.drawImage(avatar, 25, 25, 200, 200);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    const imgwelcome = new Discord.MessageEmbed()
        .setTitle(`**Aurevoir**`)
        .attachFiles(attachment)
        .setImage('attachment://welcome-image.png')
        .setTimestamp();
    channel.send(imgwelcome).catch(console.error)


}