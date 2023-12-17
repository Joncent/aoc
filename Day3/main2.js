const notASymbol = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let plan = [];
let gearPlan = [];

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
  let gears = [];

  for (let y = 0; y < plan.length; y++) {
    for (let x = 0; x < plan[y].length; x++) {
      //Init Gear Counter
      if (plan[y][x] === "*") {
        let gear = new Gear(x, y);
        gears.push(gear);
      }

      //Init Numbers
      if (isANumber(x, y) && !isANumber(x - 1, y)) {
        let num = new Number(x, y);
        validNumbers.push(num);
      }
    }
  }
  for (let num of validNumbers) {
    num.isAdjacentToSymbol();
    for (let gear of gears) {
      if (gear.xLoc === num.symbolX && gear.yLoc === num.symbolY) {
        gear.AddNumber(num);
      }
    }
  }

  let result = 0;
  for (gear of gears) {
    console.log(gear);
    if (gear.isValidGear()) {
      result += gear.getRatio();
    }
    console.log(result);
  }
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

class Gear {
  constructor(xLoc, yLoc) {
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    this.numbers = [];
  }

  AddNumber(num) {
    this.numbers.push(num);
  }

  isValidGear() {
    return this.numbers.length === 2;
  }

  getRatio() {
    return this.numbers[0].getValue() * this.numbers[1].getValue();
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

    this.symbol;
    this.symbolX;
    this.symbolY;
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
      if (isASymbol(x, this.yLoc - 1)) {
        this.symbolX = x;
        this.symbolY = this.yLoc - 1;
        this.symbol = plan[this.symbolY][this.symbolX];
        return true;
      }
    }

    //check Sides
    if (isASymbol(this.xLoc - 1, this.yLoc)) {
      this.symbolX = this.xLoc - 1;
      this.symbolY = this.yLoc;
      this.symbol = plan[this.symbolY][this.symbolX];
      return true;
    }
    if (isASymbol(this.xLoc + this.len, this.yLoc)) {
      this.symbolX = this.xLoc + this.len;
      this.symbolY = this.yLoc;
      this.symbol = plan[this.symbolY][this.symbolX];
      return true;
    }

    //checkLower
    for (let x = this.xLoc - 1; x <= this.xLoc + this.len; x++) {
      if (isASymbol(x, this.yLoc + 1)) {
        this.symbolX = x;
        this.symbolY = this.yLoc + 1;
        this.symbol = plan[this.symbolY][this.symbolX];
        return true;
      }
    }

    return false;
  }

  getGearAdjacentCoords() {
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
