const fs = require("fs");
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) console.error(err);
  const lines = data.split("\n");

  //reading in times and distances
  let times = lines[0].split(" ");
  let distances = lines[1].split(" ");
  times = times.filter((el) => !isNaN(el) && !isNaN(parseInt(el)));
  times = times.map((el) => parseInt(el));
  distances = distances.filter((el) => !isNaN(el) && !isNaN(parseInt(el)));
  distances = distances.map((el) => parseInt(el));

  console.log(times);
  console.log(distances);
  let result = 1;

  //looping through races:
  for (let i = 0; i < times.length; i++) {
    let raceTime = times[i];
    let recordDistance = distances[i];
    let counter = 0;
    let speed = 0;
    for (chargeTime = 0; chargeTime < raceTime; chargeTime++) {
      speed = chargeTime;
      let swimTime = raceTime - chargeTime;
      let ownDistance = speed * swimTime;
      if (ownDistance > recordDistance) counter++;
    }
    console.log(`number of ways to beat ${i} race is ${counter}`);
    result *= counter;
  }
  console.log(result);
});
