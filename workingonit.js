const fs = require("fs");

words = fs.readFileSync("./workingonit.txt").toString();
words = words.split("\r\n");
var data = [];
words.forEach((word) => {
    if (typeof data[word.length] === "undefined") data[word.length] = [];
    data[word.length].push(word);
});
console.log(data);

fs.writeFileSync("./workingonit.json", JSON.stringify(data));