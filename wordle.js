const data = require("./data.json");
var config = {};

var responseTypes = {
    "alphalight": ["w", "y", "g"],
    "alphadark": ["b", "y", "g"],
    "numbers": ["0", "1", "2"],
    "emojilight": ["⬜","🟨","🟩"],
    "emojidark": ["⬛","🟨","🟩"]
}

exports.data = data;

// config so far:
// emojis: boolean, this is deprecated and will be removed in the next major update TODO
exports.config = function (configData) {
    config = configData;
    if(typeof config.emojis !== "undefined") {
        console.warn("Using config.emojis is deprecated, please use config.responseType instead.\nTo preserve backwards compatability, this setting has been automatically fixed for you.");
        switch (config.emojis) {
            case true:
                config.responseType = "emojidark"
                break;
            default:
                config.responseType = "numbers"
                break;
        }
    }
    if(typeof config.responseType === "undefined") {
        console.warn("No responseType given, defaulting to \"numbers\"")
        config.responseType = "numbers"
    }
};


exports.checkGuess = function (guess, answer) {

    if ((guess.length != 5)) {
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
            correctness += responseTypes[config.responseType][0]
            continue;
        }
        if (guess[i] != answer[i]) {
            correctness += responseTypes[config.responseType][1]
            continue;
        }
        if (guess[i] == answer[i]) {
            correctness += responseTypes[config.responseType][2]
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

