exports.run = (client, message ) => {
    const Discord = require("discord.js")
    const Enmap = require("enmap")
    const player = new Enmap({name: "player"});
    const args = message.content.slice(client.config.prefix.length).split(/ +/);
    const lootbox = require("./lootbox.json").lootbox
    const { randomInt } = require('crypto');

//if(!lootbox[args[1]]) return message.channel.send("Veuillez précisez un argument valide. (lootbox_normale/lootbox_speciale/lootbox_legend)")
if(player.get(`player_${message.author.id}`, args[1]) <= 0) return message.channel.send("Vous n'avez pas assez de lootbox.\nRemarque : les lootbox se gagnent lors de combat ou dans le daily.")
let rdm1 = randomInt(1,100)
let rdm2 = randomInt(1,100)
let rdm3 = randomInt(1,100)
let rdm4 = randomInt(5,10)
console.log(rdm1,rdm2,rdm3)
let lootOBJ1,lootOBJ2,lootNB1,lootNB2,lootSay1,lootSay2
let NBofLoot = 1
let NB
if(rdm1 >= 70) lootOBJ1 = lootbox[0],lootNB1 = randomInt(4,8),lootSay1 = "bois"
if(rdm1 >= 45 && rdm1 <= 69) lootOBJ1 = lootbox[1],lootNB1 = randomInt(3,6),lootSay1 = "pierre"
if(rdm1 >= 25 && rdm1 <= 44) lootOBJ1 = lootbox[2],lootNB1 = randomInt(1,3),lootSay1 = "fer"
if(rdm1 >= 10 && rdm1 <= 24) lootOBJ1 = lootbox[3],lootNB1 = 1,lootSay1 = "Epée en bronze"
if(rdm1 >= 1 && rdm1 <= 100) lootOBJ1 = lootbox[4],lootNB1 = randomInt(1,2),lootSay1 = "Potion de heal"
if(rdm2 >= 70) return message.channel.send("Vous avez gagnez "+lootSay1+" "+lootOBJ1+" ."),NBofLoot = 2
if(rdm3 >= 70) lootOBJ2 = lootbox[0],lootNB2 = randomInt(3,7),lootSay2 = "bois"
if(rdm3 >= 50 && rdm3 <= 69) lootOBJ2 = lootbox[1],lootNB2 = randomInt(2,5),lootSay2 = "pierre"
if(rdm3 >= 25 && rdm3 <= 49) lootOBJ2 = lootbox[2],lootNB2 = randomInt(1,2),lootSay2 = "fer"
if(rdm3 >= 10 && rdm3 <= 24) lootOBJ2 = lootbox[3],lootNB2 = 1 ,lootSay1 = "Epée en bronze"
if(rdm3 >= 1 && rdm3 <= 9) lootOBJ2 = lootbox[4],lootNB2 = 1 ,lootSay1 = "Potion de heal"
if(lootOBJ1 == lootOBJ2) lootOBJ2 = "col",lootNB2 = "3"
message.channel.send("Vous avez gagner "+lootSay1+" "+lootOBJ1+" , "+lootSay2+" "+lootOBJ2)
if(rdm2 >= 1 && rdm2 <= 10) message.channel.send("Bonus ! Vous gagner "+rdm4+" col !"),NBofLoot = 3
if(NBofLoot == 1){
NB = player.get(`player_${message.author.id}`,lootOBJ1)
player.set(`player_${message.author.id}`, NB+lootNB1,lootOBJ1)}
if(NBofLoot == 2 || NBofLoot == 3){
NB = player.get(`player_${message.author.id}`,lootOBJ1)
player.set(`player_${message.author.id}`, NB+lootNB1,lootOBJ1)
NB = player.get(`player_${message.author.id}`,lootOBJ2)
player.set(`player_${message.author.id}`, NB+lootNB2,lootOBJ2)
NB = player.get(`player_${message.author.id}`,"coins")
player.set(`player_${message.author.id}`,rdm4,"coins")
}
}

