# node-wordle

A few simple functions to make wordle easier to make.

This is an alpha release of new features, including support for words that do not have 5 letters. For now, this update only includes more options for return types. Expect more soon.

Valid as of wordle commit af610646.

## Functions

```getWord(isValid)```

This function gets a word from the data.json file. If isValid is true, it will select a word from the list of words used by wordle before the aquisition by NYT.

```checkGuess(guess, answer)```

This function checks the guess of the player with the answer. If there are multiple instances of a letter, the function will work from left to right. It will throw an error if the letters are not 5 letters long.