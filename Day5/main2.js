const fs = require("fs");
fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) console.error(err);

  const lines = data.split("\n");
  //seeds:
  let seeds = lines[0].split(": ")[1];
  seeds = seeds.split(" ");
  seeds = seeds.map((el) => parseInt(el));

  //maps:
  const indices = [];
  indices[0] = lines.indexOf("seed-to-soil map:");
  indices[1] = lines.indexOf("soil-to-fertilizer map:");
  indices[2] = lines.indexOf("fertilizer-to-water map:");
  indices[3] = lines.indexOf("water-to-light map:");
  indices[4] = lines.indexOf("light-to-temperature map:");
  indices[5] = lines.indexOf("temperature-to-humidity map:");
  indices[6] = lines.indexOf("humidity-to-location map:");
  indices[7] = lines.length + 1;

  console.log(indices);

  const maps = [];
  for (let i = 0; i < 7; i++) {
    let map = new Map();
    let mappingData = getMapData(indices[i] + 1, indices[i + 1] - 2);
    //console.log(lines[indices[i]]);
    //console.log(mappingData);
    for (const mapping of mappingData) {
      console.log(mapping);
      map.addMapping(
        parseInt(mapping[0]),
        parseInt(mapping[1]),
        parseInt(mapping[2])
      );
    }
    maps.push(map);
  }

  const seedLocationPairs = {};

  //Check all seeds:
  for (let seed of seeds) {
    let oldSeed = seed;
    for (let map of maps) {
      seed = map.getDestFromSrc(seed);
    }
    console.log(`final location of seed ${oldSeed} is ${seed}`);
    seedLocationPairs[oldSeed] = seed;
  }

  //Find lowest location number:
  let minLoc = Infinity;
  for (let seed in seedLocationPairs) {
    seed = parseInt(seed);
    minLoc = Math.min(minLoc, seedLocationPairs[seed]);
  }

  console.log(`lowest location number is: ${minLoc}`);

  function getMapData(startIndex, endIndex) {
    let arr = [];
    for (let i = startIndex; i <= endIndex; i++) {
      arr.push(lines[i].split(" "));
    }
    return arr;
  }
});

class Map {
  constructor() {
    this.dic = [];
  }

  addMapping(destStart, srcStart, range) {
    let mapping = [destStart, srcStart, range];
    this.dic.push(mapping);
  }

  getDestFromSrc(src) {
    for (let mapping of this.dic) {
      if (src >= mapping[1] && src <= mapping[1] + mapping[2]) {
        let offset = src - mapping[1];
        return parseInt(mapping[0] + offset);
      }
    }
    return parseInt(src);
  }
}
