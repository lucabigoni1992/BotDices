
const genericClass = require('./functions/dicesFunction');
require('dotenv').config();
console.log("Application start at ... " + Date(Date.now()).toString());
const discord = require('./node_modules/discord.js');
const client = new discord.Client();

client.login(process.env.BOT_TOKEN);

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


client.on('ready', () => {
    console.log("il nostro bot è loggato");
    console.log("si è username: ", client.user.username);
    console.log("si è tag: ", client.user.tag);
})


client.on('message', function (message) {
    if (message.author.bot) return;
    console.log("si è messaggio inviato da: ", message.author.username, " -> messaggio : ", message.content);
    var dices = genericClass.Poweeeerrr(message.content);
    if (dices.length == 0 || !dices.isVaid) return;
    message.channel.send(genericClass.sendMessage(dices, message));
})
