const data = require("./data.json");
const otherWords = require("./experimentalwords.json");
var config = {};
var log = "";

var responseTypes = {
    alphalight: ["w", "y", "g"],
    alphadark: ["b", "y", "g"],
    numbers: ["0", "1", "2"],
    emojilight: ["⬜", "🟨", "🟩"],
    emojidark: ["⬛", "🟨", "🟩"]
};

exports.data = data;

// config so far:
// logWarnings: boolean, whether to save warnings in a log variable or not.
// emojis: boolean, whether or not to use emojis. deprecated
// TODO remove this ^
// responseType: string, what response to give based on the responseTypes variable
// TODO add customization
// forceValidity: number, whether to always pick a valid word, despite input. Can be -1 for always all words, 0 for input, 1 for always valid words.
exports.config = function (configData) {
    config = configData;

    //manage .logWarnings
    if (typeof config.logWarnings === "undefined") {
        config.logWarnings = false;
    }

    //manage .emojis
    if (typeof config.emojis !== "undefined") {
        warn(
            "Using config.emojis is deprecated, please use config.responseType instead.\nTo preserve backwards compatability, this setting has been automatically fixed for you.",
            "config"
        );
        switch (config.emojis) {
            case true:
                config.responseType = "emojidark";
                break;
            default:
                config.responseType = "numbers";
                break;
        }
    }

    //manage .responseType
    if (
        typeof config.responseType === "undefined" ||
        typeof responseTypes[config.responseType] === "undefined"
    ) {
        warn('No valid responseType given, defaulting to "numbers"', "config");
        config.responseType = "numbers";
    }

    //manage .forceValidity
    if (typeof config.forceValidity !== "number") {
        warn("No valid forceValidity given, defaulting to 0", "config");
    }
};

function warn(message, source) {
    if (config.logWarnings) {
        log += "[" + source + "] " + message + "\n";
    } else {
        console.warn(
            "[" +
                source +
                "] " +
                message +
                "\nIf you want to disable these messages, set logWarnings to true"
        );
    }
}

exports.getLog = function () {
    return log;
};
exports.checkGuess = function (guess, answer, returnType = config.responseType) {
    console.log(returnType)
    returnType = responseTypes[returnType]
    returnString = ""
    checkGuessPrivate(guess, answer).correctArray.forEach(element => {
        try {
            returnString = returnString.concat(returnType[element])
        } catch (e) {
            throw new Error("Letter type value " + element + "was not valid for return type string " + returnType)
        }
    });

    return returnString
}

checkGuessPrivate = function (guess, answer) {

    if (guess.length != answer.length) {
        throw new Error("guess and answer must be the same length");
    }


    let gFreq = {};
    corrArr = []

    // get frequency of letters in answer
    let aFreq = {};
    for (let i = 0; i < guess.length; i++) {
        if (!aFreq[answer[i]]) aFreq[answer[i]] = 0; //if we haven't encountered this letter yet, set the value to 0
        aFreq[answer[i]]++; // increment the value by 1
    }
    for (let i = 0; i < guess.length; i++) {
        if (!gFreq[guess[i]]) {
            gFreq[guess[i]] = 0;
        } //if we haven't encountered this letter yet, set the value to 0
        gFreq[guess[i]]++; // increment the value by 1
        if (
            gFreq[guess[i]] > aFreq[guess[i]] ||
            typeof aFreq[guess[i]] != "number"
        ) {
            corrArr.push(0)
            continue;
        }
        if (guess[i] != answer[i]) {
            corrArr.push(1)
            continue;
        }
        if (guess[i] == answer[i]) {
            corrArr.push(2)
            continue;
        }
    }
    return {
        correctArray: this.corrArr,
        guess: guess,
        answer: answer
    };
};

exports.getWord = function (isValid, length = 5) {
    if (length == 5) {
        if (isValid + config.forceValidity) {
            return data.possible[
                Math.floor(Math.random() * data.possible.length)
            ];
        } else {
            return data.all[Math.floor(Math.random() * data.all.length)];
        }
    } else {
        return otherWords[length][Math.floor(Math.random() * otherWords[length].length)]
    }
};
