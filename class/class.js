//contengo tutti i vari valori dei dadi e degli addendi

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
//risultato di tutti i lanci dadi
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
//per ogni singolo lancio mi salvo il valore
class valResult {
    val = 0;
    operation = '+';
    constructor(in_val, in_operation) {
        //   console.log("in_nLaunch: ", in_nLaunch,"  in_faces: ",in_faces);
        this.val = in_val ? in_val : 0;
        this.operation = in_operation ? in_operation : '+';
    }
}

//qua ho il set di crit e di fail ergo quando faccio 20 e 1
class failCrit {
    nFail = 0;
    nCrit = 0;
    constructor(in_nFail, in_nCrit) {
        this.nFail = in_nFail ? in_nFail : 0;
        this.nCrit = in_nCrit ? in_nCrit : 0;
    }
    addFail() {
        this.nFail += 1;
    }
    addCrit() {
        this.nCrit += 1;
    }
    hasCrit() {
        return this.nCrit > 0
    }
    hasFial() {
        return this.nFail > 0
    }

}
module.exports.valResult = valResult
module.exports.failCrit = failCrit
module.exports.ContentDices = ContentDices
module.exports.diceResult = diceResult