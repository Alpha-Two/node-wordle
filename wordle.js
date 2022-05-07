const data = require("./data.json");
var config = {};


exports.data = data;

exports.config = function (configData) {
    config = configData;
};


exports.checkGuess = function (guess, answer) {

    if (guess.length != 5) {
        throw new Error("variable guess.length was not 5")
    }

    if(answer.length != 5) {throw new Error("variable answer.length was not 5")}

    let gFreq = {};
    let correctness = "";

    // get frequency of letters in answer
    let aFreq = {};
    for (let i = 0; i < 5; i++) {
        if (!aFreq[answer[i]]) aFreq[answer[i]] = 0; //if we haven't encountered this letter yet, set the value to 0
        aFreq[answer[i]]++; // increment the value by 1
    }
    for (let i = 0; i < 5; i++) {
        if (!gFreq[guess[i]]) {
            gFreq[guess[i]] = 0;
        } //if we haven't encountered this letter yet, set the value to 0
        gFreq[guess[i]]++; // increment the value by 1
        if (
            gFreq[guess[i]] > aFreq[guess[i]] ||
            typeof aFreq[guess[i]] != "number"
        ) {
            if (config.emojis) {
                correctness += "⬛";
            } else {
                correctness += "0";
            }
            continue;
        }
        if (guess[i] != answer[i]) {
            if (config.emojis) {
                correctness += "🟨";
            } else {
                correctness += "1";
            }
            continue;
        }
        if (guess[i] == answer[i]) {
            if (config.emojis) {
                correctness += "🟩";
            } else {
                correctness += "2";
            }
            continue;
        }
    }
    return correctness;
};

exports.getWord = function (isValid) {
    if (
        (isValid || config.forceValidity == "valid") &&
        config.forceValidity != "invalid"
    ) {
        return data.possible[Math.floor(Math.random() * data.possible.length)];
    } else {
        return data.all[Math.floor(Math.random() * data.all.length)];
    }
};
