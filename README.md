# node-wordle

A few simple functions to make wordle easier to make.

This is a release candidate of new features, including support for words that do not have 5 letters. See [CHANGELOG.md](./CHANGELOG.md) for new features.

If any issues are found, please open an issue on the [Github](https://github.com/Alpha-Two/node-wordle). If no issues are found in the next week, this release candidate will become the official release.

5 letter words are valid as of wordle commit af610646.

## Functions

```getWord(isValid, length)```

This function gets a word from the disctionary. If length is 5 (or default) and isValid is true, it will select a word from the valid list of words used by wordle. If isValid is false, it will bick from the invalid list. If the length is not five, it will bick a word from a dictionary. These words have not been checked thoroughly and will contain obscure phrases.

```checkGuess(guess, answer)```

This function checks the guess of the player with the answer. If there are multiple instances of a letter, the function will work from left to right. It will throw an error if the length of the two words are not the same.

```getLog()```

Returns the log if it is enabled (see below).

## Settings

pass settings in using the config function.

```logWarnings```

If this is true, any warnings wil be stored in a log file and not displayed on the console. You can use `getLog()` to retrieve the log.

`emojis` (deprecated)

Toggles between emojis and numbers, automatically switches to responseType in this version.

`responseType`

Sets the return type for `checkGuess`. It currently supports these options:

- alphalight:   "w", "y", "g"
- alphadark:    "b", "y", "g"
- numbers:      0, 1, 2
- emojilight:   "⬜", "🟨", "🟩"
- emojidark:    "⬛", "🟨", "🟩"


`forceValidity`

Is an integer between -1 and 1, which decides whether to override the `isValid` input in `getWord()`. If it is -1, it will override to always pick from all words. If it is 0, it will not override. If it is 1 it will override to only pick from the valid word list.