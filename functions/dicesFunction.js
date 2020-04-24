

const dicesClass = require('../class/class');
const genericClass = require('../functions/generic');
const discord = require('../node_modules/discord.js');
const package = require('../package.json');

module.exports.sendMessage = sendMessage
module.exports.Poweeeerrr = Poweeeerrr

const regx = /((\-|\+?)!([0-9]{1,})([d|D]{1})([0-9]{1,}))|((\-|\+)([0-9]{0,2}))/g;

//gestisco il messaggio che mi arriva e ne prendo i componenti 
function Poweeeerrr(message) {
    message = message.replace(/\s/g, '');//rimuovo spazi
    var array = [...message.matchAll(regx)];
    var SetDiValori = new dicesClass.ContentDices();
    for (var td = 0; td < array.length; td++) {
        var dice = array[td];
        if (dice[6]) {
            SetDiValori.addSingleValue(new dicesClass.valResult(parseInt(dice[8]), dice[7]));
        }
        else {
            var dado = new dicesClass.diceResult(parseInt(dice[3]), parseInt(dice[5]), dice[2]);
            for (var d = 0; d < parseInt(dice[3]); d++)
                dado.addDadi(genericClass.randomInt(parseInt(dice[5])), dice[2]);
            SetDiValori.addDadi(dado);
        }
    };
    return SetDiValori;
}


//creo il messaggio
function sendMessage(dices, message) {
    var mess = new discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Your dices!!! POWERRRRRRRR!')
        //    .setURL('https://discord.js.org/')
        .setAuthor('By Luca Bigoni version')
        .setDescription("Launch of :" + message.author.username)
        //  .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        // .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp();
    var footer = '';
    var footerLog1And20 = new dicesClass.failCrit();
    for (var d = 0; d < dices.contentValuesDices.length; d++) {
        var dice = dices.contentValuesDices[d];
        var lunces = "";
        for (var l = 0; l < dice.dadi.length; l++) {
            lunces += "N°" + l.toString() + " " + 'd' + dice.faces + " : " + dice.dadi[l] + '\n';
            if (dice.faces == 20) {
                if (dice.dadi[l] == 1)
                    footerLog1And20.addFail();
                else if (dice.dadi[l] == 20)
                    footerLog1And20.addCrit();
            }
        }
        footer += '\n' + dice.nLaunch + 'd' + dice.faces + ' sum: ' + dice.operation + dice.sum;
        if (footerLog1And20.hasCrit() || footerLog1And20.hasFial())
            footer += '\n Total Crit:' + footerLog1And20.nCrit + ' Total Fail:' + footerLog1And20.nFail;
        mess.addFields(
            {
                name: 'dice : ' + (dice.nLaunch + 1) + 'd' + dice.faces,
                value: lunces,
                inline: d != dices.contentValuesDices.length - 1
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
    mess.addFields(
        {
            name: 'All Data Dices:',
            value: footer + '\nTotal: ' + dices.sum,
            inline: false
        });

    mess.setFooter('Good game AppVersion ' + package.version);
    return mess;
}
