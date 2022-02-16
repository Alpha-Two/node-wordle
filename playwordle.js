var fs = require("fs");
var readlineSync = require("readline-sync")
var wordle = require("./wordle.js")



let numGuesses = 0;
let correctWord = wordle.getWord(true)


while(numGuesses < 6) {
    let guess = readlineSync.question("Guess: ")
    if (wordle.data.all.includes(guess)) {
        let value = wordle.checkGuess(guess, correctWord)
        console.log(value)
        if (value == "🟩🟩🟩🟩🟩") {
            console.log("Correct")
            process.exit();
        } else {
            numGuesses++;
        }
        
        console.log("Guesses Used: " + numGuesses + "/6")
    } else {
        console.log("NOT A VALID WORD")
    }
}
while(true) {
console.log("HAHA LOSER IT WAS " + correctWord)}
