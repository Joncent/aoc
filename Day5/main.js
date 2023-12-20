const fs = require("fs");
fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) console.error(err);

  const lines = data.split("\n");
  const sToS = lines.indexOf("seed-to-soil map:");
  const sToF = lines.indexOf("soil-to-fertilizer map:");
  console.log(sToF);
});

class Map {
  constructor() {
    this.dic = {};
  }

  addMapping(destStart, srcStart, range) {
    for (let i = 0; i < range; i++) {
      this.dic[srcStart + i] = destStart + i;
    }
    console.log("new Mapping: " + this.dic);
  }

  getDestFromSrc(src) {
    if (src in this.dic) {
      return this.dic[src];
    }
    return src;
  }
}
