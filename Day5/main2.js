const fs = require("fs");
fs.readFile("data.txt", "utf8", (err, data) => {
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

  const maps = [];
  for (let i = 0; i < 7; i++) {
    let map = new Map();
    let mappingData = getMapData(indices[i] + 1, indices[i + 1] - 2);
    for (const mapping of mappingData) {
      map.addMapping(
        parseInt(mapping[0]),
        parseInt(mapping[1]),
        parseInt(mapping[2])
      );
    }
    maps.push(map);
  }

  maps.reverse();

  let lowestLocation = Math.Infinity;

  //Check all seeds:

  for (let i = 0; i <= 1000000000; i++) {
    let seed = i;
    let location = i;
    for (let map of maps) {
      seed = map.getSrcFromDest(seed);
    }

    const valid = seedInSeeds(seed);
    //console.log(`seed: ${seed} location: ${location} valid: ${valid}`);

    //checking if seed was valid
    if (valid) {
      console.log(`seed ${seed} is valid! location: ${location}`);

      break;
    }
  }

  function seedInSeeds(seed) {
    let result = false;
    for (let i = 0; i <= seeds.length; i += 2) {
      if (seed >= seeds[i] && seed <= seeds[i] + seeds[i + 1]) result = true;
    }
    return result;
  }

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

  getSrcFromDest(dst) {
    for (let mapping of this.dic) {
      if (dst >= mapping[0] && dst <= mapping[0] + mapping[2]) {
        let offset = dst - mapping[0];
        return parseInt(mapping[1] + offset);
      }
    }
    return parseInt(dst);
  }
}
