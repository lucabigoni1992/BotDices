require('dotenv').config();
console.log("Application start at ... " + Date(Date.now()).toString());
const discord = require('discord.js');
const test = require('./config/TEST.json');
const client = new discord.Client();
const regx = /((\-|\+?)!([0-9]{1,})([d|D]{1})([0-9]{1,}))|((\-|\+)([0-9]{0,2}))/g;
console.log("Application WITH TOKEN :  ", process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);


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
    message.reply('your dices has this result! ' + JSON.stringify(dices)).catch(err => console.log(err));
})

function Poweeeerrr(message) {
    message = message.replace(/\s/g, '');//rimuovo spazi
    var array = [...message.matchAll(regx)];
    var SetDiValori = new ContentDices();
    for (var td = 0; td < array.length; td++) {
        var dice = array[td];
        //   console.log(dice);
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
    console.log(SetDiValori);
    return SetDiValori;
}


function randomInt(max) {
    return Math.floor(Math.random() * max) + 1
}


class ContentDices {
    isVaid = false;
    sum = 0;
    contentValuesDices = []//contiene i dadi
    contentValuesSingleSum = []//contiene le somme
    constructor() { }

    addDadi(in_dice, sumOrLess) {
        this.contentValuesDices.push(in_dice);
        console.log("sumOrLess: ", sumOrLess);
        this.sum += (sumOrLess == '-' ? (-1 * in_dice.sum) : in_dice.sum);
        console.log(" this.sum: ", this.sum);
        this.isVaid = true;//diventa valido se ho almeno un dado
    }
    addSingleValue(in_val, sumOrLess) {
        this.contentValuesSingleSum.push(in_val);
        console.log("sumOrLess: ", sumOrLess);
        this.sum += (sumOrLess == '-' ? (-1 * in_val.val) : in_val.val);
        console.log(" this.sum: ", this.sum);
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