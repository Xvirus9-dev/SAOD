module.exports = (client) => {
  console.log(`Bot SAOD pret`);
  client.user.setPresence({ activity: { name: 'Sword Art Online Discord | s!help' }, status: 'dnd' })
  .catch(console.error);
   
}
