
const genericClass = require('./functions/dicesFunction');
require('dotenv').config();
console.log("Application start at ... " + Date(Date.now()).toString());
const discord = require('./node_modules/discord.js');
const client = new discord.Client();

client.login(process.env.BOT_TOKEN);

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
})
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });


client.on('ready', () => {
    console.log("il nostro bot è loggato");
    try {
        console.log("si è username: ", client.user.username);
        console.log("si è tag: ", client.user.tag);
    } catch (err) {
        next(err);
    }
})


client.on('message', function (message) {
    try {
        if (message.author.bot) return;
        console.log("si è messaggio inviato da: ", message.author.username, " -> messaggio : ", message.content);
        var multiLunches = message.content.toString().split(';;');
        for (var SplitDices = 0; SplitDices < multiLunches.length; SplitDices++) {
            var dices = genericClass.Poweeeerrr(multiLunches[SplitDices]);
            if (dices.length == 0 || !dices.isVaid) continue;
            message.channel.send(genericClass.sendMessage(dices, message));
        }
    } catch (err) {
        next(err);
    }
})
