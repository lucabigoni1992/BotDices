require('dotenv').config();
console.log("Application start at ... " + Date(Date.now()).toString());
const discord = require('./node_modules/discord.js');
const test = require('./config/TEST.json');
const client = new discord.Client();
const regx = /((\-|\+?)!([0-9]{1,})([d|D]{1})([0-9]{1,}))|((\-|\+)([0-9]{0,2}))/g;

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
    var dices = Poweeeerrr(message.content);
    if (dices.length == 0 || !dices.isVaid) return;
    message.channel.send(sendMessage(dices, message));
})

function Poweeeerrr(message) {
    message = message.replace(/\s/g, '');//rimuovo spazi
    var array = [...message.matchAll(regx)];
    var SetDiValori = new ContentDices();
    for (var td = 0; td < array.length; td++) {
        var dice = array[td];
        if (dice[6]) {
            SetDiValori.addSingleValue(new valResult(parseInt(dice[8]), dice[7]));
        }
        else {
            var dado = new diceResult(parseInt(dice[3]), parseInt(dice[5]), dice[2]);
            for (var d = 0; d < parseInt(dice[3]); d++)
                dado.addDadi(randomInt(parseInt(dice[5])), dice[2]);
            SetDiValori.addDadi(dado);
        }
    };
    return SetDiValori;
}


function randomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function sendMessage(dices, message) {
    var mess = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Your dices!!! POWERRRRRRRR!')
        //    .setURL('https://discord.js.org/')
        .setAuthor('By Luca Bigoni')
        .setDescription("Launch of :" + message.author.username)
        //  .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        // .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp();
    var footer = '';
    for (var d = 0; d < dices.contentValuesDices.length; d++) {
        var dice = dices.contentValuesDices[d];
        var lunces = "";
        for (var l = 0; l < dice.dadi.length; l++) {
            lunces += "N°" + l.toString() + " " + 'd' + dice.faces + " : " + dice.dadi[l] + '\n';
        }
        footer += '\n' + dice.nLaunch + 'd' + dice.faces + ' sum: ' + dice.operation + dice.sum;
        mess.addFields(
            {
                name: 'dice : ' + (dice.nLaunch + 1) + 'd' + dice.faces,
                value: lunces,
                inline: true
            }
        );
    }

    for (var d = 0; d < dices.contentValuesSingleSum.length; d++) {
        var in_val = dices.contentValuesSingleSum[d];
        footer += '\n' + 'Val: ' + in_val.operation + in_val.val;
        mess.addFields(
            {
                name: 'Val: ' + in_val.operation + in_val.val,
                value: in_val.val,
                inline: true
            }
        );
    }
    footer += '\n' + 'Total: ' + dices.sum;
    mess.addFields(
        {
            name: 'All Data Dices:',
            value: footer,
            inline: true
        });

    mess.setFooter('Good game');
    return mess;
}
class ContentDices {
    isVaid = false;
    sum = 0;
    contentValuesDices = []//contiene i dadi
    contentValuesSingleSum = []//contiene le somme
    constructor() { }

    addDadi(in_dice, sumOrLess) {
        this.contentValuesDices.push(in_dice);
        this.sum += (in_dice.operation == '-' ? (-1 * in_dice.sum) : in_dice.sum);
        this.isVaid = true;//diventa valido se ho almeno un dado
    }
    addSingleValue(in_val) {
        this.contentValuesSingleSum.push(in_val);
        this.sum += (in_val.operation == '-' ? (-1 * in_val.val) : in_val.val);
    }
}

class diceResult {

    nLaunch = 0;
    dadi = [];
    faces = 0;
    sum = 0;
    operation = '+';
    constructor(in_nLaunch, in_faces, in_operation) {
        //   console.log("in_nLaunch: ", in_nLaunch,"  in_faces: ",in_faces);
        this.nLaunch = in_nLaunch ? in_nLaunch : 0;
        this.faces = in_faces ? in_faces : 0;
        this.operation = in_operation ? in_operation : '+';
    }
    addDadi(valore) {
        this.dadi.push(valore);
        this.sum += valore;
    }

}
class valResult {
    val = 0;
    operation = '+';
    constructor(in_val, in_operation) {
        //   console.log("in_nLaunch: ", in_nLaunch,"  in_faces: ",in_faces);
        this.val = in_val ? in_val : 0;
        this.operation = in_operation ? in_operation : '+';
    }
}