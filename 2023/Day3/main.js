const notASymbol = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let plan = [];

const fs = require("fs");
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\n");

  for (let line of lines) {
    const row = [];
    for (let char of line) {
      row.push(char);
    }
    plan.push(row);
  }

  let validNumbers = [];

  for (let y = 0; y < plan.length; y++) {
    for (let x = 0; x < plan[y].length; x++) {
      if (isANumber(x, y) && !isANumber(x - 1, y)) {
        let num = new Number(x, y);
        validNumbers.push(num);
      }
    }
  }
  let result = 0;

  for (let num of validNumbers) {
    if (num.isAdjacentToSymbol()) result += num.getValue();
  }
  console.log(result);
});

function isANumber(x, y) {
  if (x < 0 || y < 0 || x >= plan[0].length || y >= plan.length) return false;
  else {
    return numbers.includes(plan[y][x]);
  }
}

function isASymbol(x, y) {
  if (x < 0 || y < 0 || x >= plan[0].length || y >= plan.length) return false;
  else {
    return !notASymbol.includes(plan[y][x]);
  }
}

class Number {
  constructor(xLoc, yLoc) {
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    let isNum = true;
    let len = 1;
    while (isNum) {
      xLoc++;
      if (!isANumber(xLoc, yLoc)) {
        isNum = false;
      } else {
        len++;
      }
    }
    this.len = len;
  }

  getValue() {
    let val = "";
    for (let x = this.xLoc; x < this.xLoc + this.len; x++) {
      val += plan[this.yLoc][x];
    }
    val = parseInt(val);
    return val;
  }

  isAdjacentToSymbol() {
    //checkUpper
    for (let x = this.xLoc - 1; x <= this.xLoc + this.len; x++) {
      if (isASymbol(x, this.yLoc - 1)) return true;
    }

    //check Sides
    if (
      isASymbol(this.xLoc - 1, this.yLoc) ||
      isASymbol(this.xLoc + this.len, this.yLoc)
    )
      return true;

    //checkLower
    for (let x = this.xLoc - 1; x <= this.xLoc + this.len; x++) {
      if (isASymbol(x, this.yLoc + 1)) return true;
    }

    return false;
  }
}
