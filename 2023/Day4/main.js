const fs = require("fs");
fs.readFile("data.txt", "utf8", (error, data) => {
  if (error) console.error(error);

  const lines = data.split("\n");

  let cards = [];

  for (let line of lines) {
    let splitLine = line.split(": ");
    let id = splitLine[0].split(" ")[1];
    let nums = splitLine[1].split(" | ");
    let winNums = nums[0].split(" ");
    winNums = winNums.filter(isNotEmpty); //Filter out blanks
    let haveNums = nums[1].split(" ");
    haveNums = haveNums.filter(isNotEmpty); // filter out blanks
    let card = new Card(id, winNums, haveNums);
    cards.push(card);
  }
  let result = 0;
  for (let card of cards) {
    result += card.getPoints();
  }
  console.log(result);
});

function isNotEmpty(e) {
  return !(e === " " || e === "");
}

class Card {
  constructor(id, winNums, haveNums) {
    this.id = id;
    this.winNums = winNums;
    this.haveNums = haveNums;
  }

  getPoints() {
    console.log(this);
    let correctNums = 0;
    for (let num of this.haveNums) {
      if (this.winNums.includes(num)) correctNums++;
    }
    console.log("Card " + this.id + " has " + correctNums);
    if (correctNums === 0) return 0;
    return Math.pow(2, correctNums - 1);
  }
}
