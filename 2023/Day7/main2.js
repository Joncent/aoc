const fs = require("fs");
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) console.error(err);
  const lines = data.split("\r\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].split(" ");
  }

  let hands = [];

  for (let i = 0; i < lines.length; i++) {
    let hand = new Hand(lines[i][0], lines[i][1]);
    hands.push(hand);
  }
  console.log(hands);
  console.log("sorting...");
  hands.sort((a, b) => {
    return a.isBetterThanHand(b);
  });
  console.log(hands);

  let reward = 0;
  for (let i = 1; i <= hands.length; i++) {
    reward += hands[i - 1].bet * i;
  }
  console.log("total reward is:");
  console.log(reward);
});

class Hand {
  constructor(labels, bet) {
    this.bet = parseInt(bet);
    this.labels = [];
    for (let label of labels) {
      label = LabelDictionary[label];
      this.labels.push(label);
    }
    //7: Five of a Kind, 6: Four of a kind, 5: FullHouse, 4: Three of a kind, 3: TwoPair, 2: OnePair, 1: HighCard
    this.type = this.calculateType();
  }

  calculateType() {
    let countObject = {};
    for (let key in LabelDictionary) {
      countObject[LabelDictionary[key]] = 0;
    }
    for (let label of this.labels) {
      if (label == 1) {
        for (let key in LabelDictionary) {
          countObject[LabelDictionary[key]] += 1;
        }
      } else countObject[label]++;
    }
    let values = Object.values(countObject);
    //Check if Five of a kind:
    if (values.includes(5)) return 7;
    //Check if Four of a kind:
    if (values.includes(4)) return 6;
    //Check for fullHouse:
    if (values.includes(3) && values.includes(2)) {
      if (!this.labels.includes(1)) return 5;
      //doublechecking Problem, if the J is counted twice:
      let tempCounter = 0;
      for (let j = 0; j < values.length; j++) {
        if (values[j] == 2) tempCounter++;
      }
      if (!(tempCounter >= 2)) {
        console.log("classified as Full House: " + this.labels);
        return 5;
      }
    }
    //Check for 3 of a kind:
    if (values.includes(3)) {
      //FH still possible, if twoPair before Joker+1:
      let tempCounter2 = 0;
      for (let j = 0; j < values.length; j++) {
        if (values[j] == 3) tempCounter2++;
      }
      if (tempCounter2 >= 2) return 5;
      return 4;
    }
    //Check for TwoPair:
    let pairCounter = 0;
    for (let value of values) {
      if (value == 2) pairCounter++;
      if (pairCounter == 2) {
        //TwoPair not possible when there is a Joker:
        if (!(countObject[LabelDictionary["J"]] > 0)) return 3;
      }
    }
    //Check for OnePair:
    if (values.includes(2)) return 2;
    //Else: HighCard:
    return 1;
  }

  isBetterThanHand(hand) {
    if (this.type == hand.type) {
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i] > hand.labels[i]) return 1;
        if (this.labels[i] < hand.labels[i]) return -1;
      }
      console.log("ERROR! Hands are equal?!?");
      return 0;
    }
    if (this.type > hand.type) return 1;
    else return -1;
  }
}

const LabelDictionary = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
  J: 1,
};
