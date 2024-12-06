const fs = require("fs");
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) console.error(err);
  const lines = data.split("\n");

  //reading in times and distances
  let times = lines[0].split(" ");
  let distances = lines[1].split(" ");
  times = times.filter((el) => !isNaN(el) && !isNaN(parseInt(el)));
  times = times.reduce((prev, next) => prev + next);
  times = parseInt(times);
  distances = distances.filter((el) => !isNaN(el) && !isNaN(parseInt(el)));
  distances = distances.reduce((prev, next) => prev + next);
  distances = parseInt(distances);

  console.log(times);
  console.log(distances);

  let raceTime = times;
  let recordDistance = distances;
  let counter = 0;
  let speed = 0;
  for (chargeTime = 0; chargeTime < raceTime; chargeTime++) {
    speed = chargeTime;
    let swimTime = raceTime - chargeTime;
    let ownDistance = speed * swimTime;
    if (ownDistance > recordDistance) counter++;
  }
  console.log(counter);
});
