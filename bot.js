require('dotenv').config();
console.log("Application start at ... " + Date(Date.now()).toString());
const discord = require('discord.js');
const test = require('./config/TEST.json');
const client = new discord.Client();
const regx = /([0-9]{1,2})([d|D]{1})([0-9]{1,2})/g;
console.log("Application WITH TOKEN :  ", process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log("il nostro bot è loggato");
    console.log("si è username: ", client.user.username);
    console.log("si è tag: ", client.user.tag);

    console.log("partono NO REGRETIONS");
    Poweeeerrr(test.DICES_Launch_SUCCESS.Launch1);
    Poweeeerrr(test.DICES_Launch_SUCCESS.Launch2);

})


client.on('message', function (message) {
    console.log("il nostro bot è loggato");
    if (message.author.bot) return;
    console.log("si è connesso author: ", message.author.username);
    console.log("si è connesso message: ", message.content);
    message.reply('your dices has this result! powerrrr').catch(err => console.log(err));
})

function Poweeeerrr(message) {
     var sum = 0;
    var array = [...message.matchAll(regx)];

    console.log(array);
    for (var td = 0; td < array.length; td++) {
        var dice = array[td];
        for (var d = 0; d < parseInt(dice[1]); d++) {
            var ris = randomInt(1, parseInt(dice[3]));
            console.log("dado " + dice[2] + dice[3] + " lancio n°" + d + " : " + ris.toString());
            sum += ris;
        }
    };
    console.log("totale : " + sum.toString());
}
function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

function randomFloat(min, max) {
    return min + (max - min) * Math.random();
}