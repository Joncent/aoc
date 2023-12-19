const fs = require("fs");
fs.readFile("test.txt", "utf8", (error, data) => {
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

  //logic of winning new Cards
  for (card of cards) {
    let instances = card.instances;
    let corrects = card.getCorrects();
    for (let i = card.index + 1; i <= card.index + corrects; i++) {
      cards[i].CreateCopies(instances);
    }
  }
});

function isNotEmpty(e) {
  return !(e === " " || e === "");
}

class Card {
  constructor(id, winNums, haveNums) {
    this.id = id;
    this.winNums = winNums;
    this.haveNums = haveNums;
    this.instances = 1;
  }

  CreateCopies(amount) {
    this.instances += amount;
  }

  getCorrects() {
    let correctNums = 0;
    for (let num of this.haveNums) {
      if (this.winNums.includes(num)) correctNums++;
    }
    return correctNums;
  }
}
