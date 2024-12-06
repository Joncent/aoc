const fs = require("fs");
fs.readFile("data.txt", "utf8", (error, data) => {
  if (error) console.error(error);

  const lines = data.split("\n");

  let cards = [];

  for (let line of lines) {
    let splitLine = line.split(": ");
    let id = splitLine[0].replace("Card", "");
    console.log(id);
    let nums = splitLine[1].split(" | ");
    let winNums = nums[0].split(" ");
    winNums = winNums.filter(isNotEmpty); //Filter out blanks
    let haveNums = nums[1].split(" ");
    haveNums = haveNums.filter(isNotEmpty); // filter out blanks
    let card = new Card(id, winNums, haveNums);
    cards.push(card);
  }

  //logic of winning new Cards
  for (let card of cards) {
    console.log(`Card: ${card.id} with ${card.getCorrects()}`);
    let instances = card.instances;
    let corrects = card.getCorrects();
    if (corrects === 0) continue;
    for (let i = card.id; i < card.id + corrects; i++) {
      if (i < cards.length) {
        cards[i].createCopies(instances);
        console.log(`creating ${instances} copies of ${cards[i].id}`);
      }
    }
  }
  //count all instances:
  let count = 0;
  for (card of cards) {
    count += card.instances;
    //console.log(card);
  }
  console.log(count);
});

function isNotEmpty(e) {
  return !(e === " " || e === "");
}

class Card {
  constructor(id, winNums, haveNums) {
    this.id = parseInt(id);
    this.winNums = winNums;
    this.haveNums = haveNums;
    this.instances = 1;
  }

  createCopies(amount) {
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
