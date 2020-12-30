const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require("./config.json");
client.config = config;
client.queue = new Map();
client.vote = new Map();

const { GiveawaysManager } = require("discord-giveaways");
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "ADMINISTRATOR" ],
        embedColor: "#d6117e",
        reaction: "🎉"
    }
});
client.giveawaysManager = manager;
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);


fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
})

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});


client.on('messageReactionAdd', async (reaction, user) => {
  var userR = reaction.message.guild.members.cache.get(user.id)
  if(reaction.message.id === "788836740836098119"){
    if(reaction.emoji.name === "✅"){
      userR.roles.add("787069551019556904").catch(e => console.log(e.message))
    }
  }
});

client.on('ready', () => {
  //client.user.setStatus('dnd')
})



client.login(config.token);