# wordlejs

A few simple functions to make wordle easier to make.

## Functions

```getWord(isValid)```

This function gets a word from the data.json file. If isValid is true, it will select a word from the list of words used by wordle before the aquisition by NYT.

```checkGuess(guess, answer)```

This function checks the guess of the player with the answer. If there are multiple instances of a letter, the function will work from left to right. It will throw an error if the letters are not 5 letters long.